// Tangentbord + mus (pekarlås) på dator, virtuella spakar och knappar på iPhone/iPad.
import { clamp } from './util.js';

export const input = {
  isTouch: false,
  mx: 0, my: 0,          // rörelse: x höger, y framåt (-1..1)
  lookX: 0, lookY: 0,    // ackumulerad blickrörelse i pixlar sedan senaste frame
  fire: false, sprint: false,
  jump: false, reload: false, swapDir: 0, select: -1, pause: false,
  locked: false,
};

const keys = new Set();
let canvasEl = null, touchRoot = null;
let onPauseCb = null;

export function isTouchDevice() {
  return (window.matchMedia && matchMedia('(pointer: coarse)').matches) || navigator.maxTouchPoints > 1 || 'ontouchstart' in window;
}

export function initInput(canvas, touchLayer, onPause) {
  canvasEl = canvas; touchRoot = touchLayer; onPauseCb = onPause;
  input.isTouch = isTouchDevice();

  window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const k = e.code;
    keys.add(k);
    if (k === 'Space') { input.jump = true; e.preventDefault(); }
    else if (k === 'KeyR') input.reload = true;
    else if (k === 'KeyQ') input.swapDir = -1;
    else if (k === 'KeyE') input.swapDir = 1;
    else if (k === 'Digit1') input.select = 0;
    else if (k === 'Digit2') input.select = 1;
    else if (k === 'Digit3') input.select = 2;
    else if (k === 'KeyP') onPauseCb && onPauseCb();
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(k)) e.preventDefault();
  });
  window.addEventListener('keyup', (e) => keys.delete(e.code));
  window.addEventListener('blur', () => { keys.clear(); input.fire = false; });

  document.addEventListener('mousemove', (e) => {
    if (!input.locked) return;
    input.lookX += clamp(e.movementX || 0, -120, 120); // Chrome kan ge ett jättehopp när pekarlåset slås på
    input.lookY += clamp(e.movementY || 0, -120, 120);
  });
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 && input.locked) { input.fire = true; e.preventDefault(); }
  });
  document.addEventListener('mouseup', (e) => { if (e.button === 0) input.fire = false; });
  document.addEventListener('wheel', (e) => {
    if (input.locked) input.swapDir = e.deltaY > 0 ? 1 : -1;
  }, { passive: true });
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('pointerlockchange', () => {
    input.locked = document.pointerLockElement === canvasEl;
    if (!input.locked) { input.fire = false; onPauseCb && onPauseCb(true); }
  });
  ['gesturestart', 'gesturechange', 'gestureend'].forEach((n) => document.addEventListener(n, (e) => e.preventDefault()));

  initTouch();
}

export function requestLock() {
  if (input.isTouch) return;
  try {
    const p = canvasEl.requestPointerLock && canvasEl.requestPointerLock();
    if (p && p.catch) p.catch(() => {});
  } catch (e) { /* ignoreras */ }
}
export function releaseLock() {
  if (document.pointerLockElement) document.exitPointerLock();
}

/** Läs in tangentbordsstate till rörelsevektorn (touch skriver direkt i mx/my). */
export function pollKeyboard() {
  let x = 0, y = 0;
  if (keys.has('KeyW') || keys.has('ArrowUp')) y += 1;
  if (keys.has('KeyS') || keys.has('ArrowDown')) y -= 1;
  if (keys.has('KeyD') || keys.has('ArrowRight')) x += 1;
  if (keys.has('KeyA') || keys.has('ArrowLeft')) x -= 1;
  if (x || y) { const l = Math.hypot(x, y); input.mx = x / l; input.my = y / l; }
  else if (touch.stickId === null) { input.mx = 0; input.my = 0; }
  input.sprint = keys.has('ShiftLeft') || keys.has('ShiftRight') || touch.autoSprint;
}

export function consumeLook() {
  const r = { x: input.lookX, y: input.lookY };
  input.lookX = 0; input.lookY = 0;
  return r;
}
export function consumeEdges() {
  const e = { jump: input.jump, reload: input.reload, swapDir: input.swapDir, select: input.select };
  input.jump = false; input.reload = false; input.swapDir = 0; input.select = -1;
  return e;
}
export function resetInput() {
  keys.clear();
  input.fire = false; input.mx = 0; input.my = 0; input.lookX = 0; input.lookY = 0;
  input.jump = input.reload = false; input.swapDir = 0; input.select = -1;
  touch.stickId = null; touch.lookId = null; touch.fireId = null; touch.autoSprint = false;
  if (stickBase) stickBase.classList.remove('active');
  if (stickKnob) stickKnob.style.transform = '';
  document.querySelectorAll('#touch .tbtn.down').forEach((b) => b.classList.remove('down'));
}

// --- Touch ---------------------------------------------------------------
const touch = { stickId: null, lookId: null, fireId: null, ox: 0, oy: 0, lx: 0, ly: 0, autoSprint: false };
let stickBase, stickKnob;
const STICK_R = 62;

function initTouch() {
  stickBase = document.getElementById('stickBase');
  stickKnob = document.getElementById('stickKnob');
  const root = touchRoot;
  const opts = { passive: false };

  root.addEventListener('touchstart', (e) => {
    e.preventDefault();
    for (const t of e.changedTouches) {
      const btn = t.target.closest ? t.target.closest('[data-btn]') : null;
      if (btn) {
        const kind = btn.dataset.btn;
        btn.classList.add('down');
        if (kind === 'fire') { input.fire = true; touch.fireId = t.identifier; touch.lx = t.clientX; touch.ly = t.clientY; }
        else if (kind === 'jump') input.jump = true;
        else if (kind === 'reload') input.reload = true;
        else if (kind === 'swap') input.swapDir = 1;
        else if (kind === 'pause') { onPauseCb && onPauseCb(); btn.classList.remove('down'); }
        continue;
      }
      if (t.clientX < window.innerWidth * 0.46 && touch.stickId === null) {
        touch.stickId = t.identifier; touch.ox = t.clientX; touch.oy = t.clientY;
        stickBase.style.left = t.clientX + 'px'; stickBase.style.top = t.clientY + 'px';
        stickBase.classList.add('active');
        stickKnob.style.transform = 'translate(-50%,-50%)';
      } else if (touch.lookId === null) {
        touch.lookId = t.identifier; touch.lx = t.clientX; touch.ly = t.clientY;
      }
    }
  }, opts);

  root.addEventListener('touchmove', (e) => {
    e.preventDefault();
    for (const t of e.changedTouches) {
      if (t.identifier === touch.stickId) {
        let dx = t.clientX - touch.ox, dy = t.clientY - touch.oy;
        const l = Math.hypot(dx, dy);
        if (l > STICK_R) { // flytande bas följer tummen
          const k = (l - STICK_R) / l; touch.ox += dx * k; touch.oy += dy * k;
          stickBase.style.left = touch.ox + 'px'; stickBase.style.top = touch.oy + 'px';
          dx = t.clientX - touch.ox; dy = t.clientY - touch.oy;
        }
        const nx = dx / STICK_R, ny = dy / STICK_R;
        const dead = 0.12;
        const m = Math.hypot(nx, ny);
        if (m < dead) { input.mx = 0; input.my = 0; touch.autoSprint = false; }
        else {
          const s = (m - dead) / (1 - dead);
          input.mx = (nx / m) * clamp(s, 0, 1);
          input.my = (-ny / m) * clamp(s, 0, 1);
          touch.autoSprint = -ny / m > 0.55 && s > 0.97;
        }
        stickKnob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      } else if (t.identifier === touch.lookId || t.identifier === touch.fireId) {
        input.lookX += t.clientX - touch.lx;
        input.lookY += t.clientY - touch.ly;
        touch.lx = t.clientX; touch.ly = t.clientY;
      }
    }
  }, opts);

  const end = (e) => {
    e.preventDefault();
    for (const t of e.changedTouches) {
      if (t.identifier === touch.stickId) {
        touch.stickId = null; input.mx = 0; input.my = 0; touch.autoSprint = false; input.sprint = false;
        stickBase.classList.remove('active'); stickKnob.style.transform = '';
      }
      if (t.identifier === touch.lookId) touch.lookId = null;
      if (t.identifier === touch.fireId) { touch.fireId = null; input.fire = false; }
    }
    // släck knappars "down"-läge när inga fingrar ligger kvar på dem
    const active = new Set();
    for (const t of e.touches) { const b = t.target.closest && t.target.closest('[data-btn]'); if (b) active.add(b); }
    root.querySelectorAll('.tbtn.down').forEach((b) => { if (!active.has(b)) b.classList.remove('down'); });
  };
  root.addEventListener('touchend', end, opts);
  root.addEventListener('touchcancel', end, opts);
}
