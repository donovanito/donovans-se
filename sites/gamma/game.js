(()=>{var Gc="170";var of=0,Dh=1,lf=2;var zu=1,Hr=2,gi=3,ki=0,Ye=1,Mn=2,He=0,Oi=1,Ze=2,Lh=3,Uh=4,Wc=5,On=100,cf=101,hf=102,uf=103,df=104,sr=200,ff=201,pf=202,mf=203,wl=204,Al=205,co=206,gf=207,ho=208,xf=209,vf=210,_f=211,yf=212,Mf=213,Sf=214,Rl=0,Cl=1,Pl=2,Ys=3,Il=4,Dl=5,Ll=6,Ul=7,Bu=0,bf=1,Ef=2,zi=0,Xc=1,qc=2,Yc=3,Vr=4,Tf=5,Zc=6,$c=7;var ku=300,Zs=301,$s=302,Fr=303,Nl=304,uo=306,Dn=1e3,us=1001,Fl=1002,nn=1003,wf=1004;var ua=1005;var jn=1006,Yo=1007;var ds=1008;var qn=1009,Hu=1010,Vu=1011,Or=1012,Jc=1013,fs=1014,vi=1015,rn=1016,Kc=1017,Qc=1018,Hi=1020,Gu=35902,Wu=1021,Xu=1022,In=1023,qu=1024,Yu=1025,Ws=1026,Vi=1027,Zu=1028,jc=1029,$u=1030,th=1031;var eh=1033,za=33776,Ba=33777,ka=33778,Ha=33779,Ol=35840,zl=35841,Bl=35842,kl=35843,Hl=36196,Vl=37492,Gl=37496,Wl=37808,Xl=37809,ql=37810,Yl=37811,Zl=37812,$l=37813,Jl=37814,Kl=37815,Ql=37816,jl=37817,tc=37818,ec=37819,nc=37820,ic=37821,Va=36492,sc=36494,rc=36495,Ju=36283,ac=36284,oc=36285,lc=36286;var Ga=2300,cc=2301,Zo=2302,Nh=2400,Fh=2401,Oh=2402;var Af=3200,Rf=3201;var nh=0,Cf=1,Ni="",ke="srgb",rr="srgb-linear",fo="linear",oe="srgb";var Ts=7680;var zh=519,Pf=512,If=513,Df=514,Ku=515,Lf=516,Uf=517,Nf=518,Ff=519,hc=35044,po=35048;var Bh="300 es",_i=2e3,Wa=2001,Gi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var $o=Math.PI/180,uc=180/Math.PI;function Bi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[e&63|128]+tn[e>>8&255]+"-"+tn[e>>16&255]+tn[e>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function yn(i,t,e){return Math.max(t,Math.min(e,i))}function Of(i,t){return(i%t+t)%t}function Jo(i,t,e){return(1-e)*i+e*t}function Qn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function me(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Et=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(yn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Xt=class i{constructor(t,e,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],x=s[0],m=s[3],f=s[6],M=s[1],S=s[4],y=s[7],C=s[2],w=s[5],R=s[8];return r[0]=a*x+o*M+l*C,r[3]=a*m+o*S+l*w,r[6]=a*f+o*y+l*R,r[1]=c*x+h*M+u*C,r[4]=c*m+h*S+u*w,r[7]=c*f+h*y+u*R,r[2]=d*x+p*M+g*C,r[5]=d*m+p*S+g*w,r[8]=d*f+p*y+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,p=c*r-a*l,g=e*u+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(s*c-h*n)*x,t[2]=(o*n-s*a)*x,t[3]=d*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-o*e)*x,t[6]=p*x,t[7]=(n*l-c*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ko.makeScale(t,e)),this}rotate(t){return this.premultiply(Ko.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ko.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Ko=new Xt;function Qu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Xa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zf(){let i=Xa("canvas");return i.style.display="block",i}var kh={};function Lr(i){i in kh||(kh[i]=!0,console.warn(i))}function Bf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function kf(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Hf(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Kt={enabled:!0,workingColorSpace:rr,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(i.r=yi(i.r),i.g=yi(i.g),i.b=yi(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(i.r=Xs(i.r),i.g=Xs(i.g),i.b=Xs(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ni?fo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function yi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Hh=[.64,.33,.3,.6,.15,.06],Vh=[.2126,.7152,.0722],Gh=[.3127,.329],Wh=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xh=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Kt.define({[rr]:{primaries:Hh,whitePoint:Gh,transfer:fo,toXYZ:Wh,fromXYZ:Xh,luminanceCoefficients:Vh,workingColorSpaceConfig:{unpackColorSpace:ke},outputColorSpaceConfig:{drawingBufferColorSpace:ke}},[ke]:{primaries:Hh,whitePoint:Gh,transfer:oe,toXYZ:Wh,fromXYZ:Xh,luminanceCoefficients:Vh,outputColorSpaceConfig:{drawingBufferColorSpace:ke}}});var ws,dc=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ws===void 0&&(ws=Xa("canvas")),ws.width=t.width,ws.height=t.height;let n=ws.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ws}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Xa("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=yi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(yi(e[n]/255)*255):e[n]=yi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Vf=0,qa=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Bi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Qo(s[a].image)):r.push(Qo(s[a]))}else r=Qo(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Qo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?dc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Gf=0,Sn=class i extends Gi{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=us,s=us,r=jn,a=ds,o=In,l=qn,c=i.DEFAULT_ANISOTROPY,h=Ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=Bi(),this.name="",this.source=new qa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ku)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Dn:t.x=t.x-Math.floor(t.x);break;case us:t.x=t.x<0?0:1;break;case Fl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Dn:t.y=t.y-Math.floor(t.y);break;case us:t.y=t.y<0?0:1;break;case Fl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=ku;Sn.DEFAULT_ANISOTROPY=1;var ge=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(c+1)/2,y=(p+1)/2,C=(f+1)/2,w=(h+d)/4,R=(u+x)/4,I=(g+m)/4;return S>y&&S>C?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=w/n,r=R/n):y>C?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=w/s,r=I/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=R/r,s=I/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-x)/M,this.z=(d-h)/M,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},fc=class extends Gi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Sn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new qa(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Be=class extends fc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ya=class extends Sn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=us,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var pc=class extends Sn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=us,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Wi=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],p=r[a+1],g=r[a+2],x=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(u!==x||l!==d||c!==p||h!==g){let m=1-o,f=l*d+c*p+h*g+u*x,M=f>=0?1:-1,S=1-f*f;if(S>Number.EPSILON){let C=Math.sqrt(S),w=Math.atan2(C,f*M);m=Math.sin(m*w)/C,o=Math.sin(o*w)/C}let y=o*M;if(l=l*m+d*y,c=c*m+p*y,h=h*m+g*y,u=u*m+x*y,m===1-o){let C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-o*p,t[e+2]=c*g+h*p+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>u){let p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>u){let p=2*Math.sqrt(1+o-n-u);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(yn(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return jo.copy(this).projectOnVector(t),this.sub(jo)}reflect(t){return this.sub(jo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(yn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},jo=new P,qh=new Wi,ps=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Gn):Gn.fromBufferAttribute(r,a),Gn.applyMatrix4(t.matrixWorld),this.expandByPoint(Gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),da.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),da.copy(n.boundingBox)),da.applyMatrix4(t.matrixWorld),this.union(da)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Gn),Gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Tr),fa.subVectors(this.max,Tr),As.subVectors(t.a,Tr),Rs.subVectors(t.b,Tr),Cs.subVectors(t.c,Tr),Ci.subVectors(Rs,As),Pi.subVectors(Cs,Rs),is.subVectors(As,Cs);let e=[0,-Ci.z,Ci.y,0,-Pi.z,Pi.y,0,-is.z,is.y,Ci.z,0,-Ci.x,Pi.z,0,-Pi.x,is.z,0,-is.x,-Ci.y,Ci.x,0,-Pi.y,Pi.x,0,-is.y,is.x,0];return!tl(e,As,Rs,Cs,fa)||(e=[1,0,0,0,1,0,0,0,1],!tl(e,As,Rs,Cs,fa))?!1:(pa.crossVectors(Ci,Pi),e=[pa.x,pa.y,pa.z],tl(e,As,Rs,Cs,fa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ui),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},ui=[new P,new P,new P,new P,new P,new P,new P,new P],Gn=new P,da=new ps,As=new P,Rs=new P,Cs=new P,Ci=new P,Pi=new P,is=new P,Tr=new P,fa=new P,pa=new P,ss=new P;function tl(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ss.fromArray(i,r);let o=s.x*Math.abs(ss.x)+s.y*Math.abs(ss.y)+s.z*Math.abs(ss.z),l=t.dot(ss),c=e.dot(ss),h=n.dot(ss);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Wf=new ps,wr=new P,el=new P,Js=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Wf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;wr.subVectors(t,this.center);let e=wr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(wr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(el.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(wr.copy(t.center).add(el)),this.expandByPoint(wr.copy(t.center).sub(el))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},di=new P,nl=new P,ma=new P,Ii=new P,il=new P,ga=new P,sl=new P,Za=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,di)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=di.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(di.copy(this.origin).addScaledVector(this.direction,e),di.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){nl.copy(t).add(e).multiplyScalar(.5),ma.copy(e).sub(t).normalize(),Ii.copy(this.origin).sub(nl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ma),o=Ii.dot(this.direction),l=-Ii.dot(ma),c=Ii.lengthSq(),h=Math.abs(1-a*a),u,d,p,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(nl).addScaledVector(ma,d),p}intersectSphere(t,e){di.subVectors(t.center,this.origin);let n=di.dot(this.direction),s=di.dot(di)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,di)!==null}intersectTriangle(t,e,n,s,r){il.subVectors(e,t),ga.subVectors(n,t),sl.crossVectors(il,ga);let a=this.direction.dot(sl),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ii.subVectors(this.origin,t);let l=o*this.direction.dot(ga.crossVectors(Ii,ga));if(l<0)return null;let c=o*this.direction.dot(il.cross(Ii));if(c<0||l+c>a)return null;let h=-o*Ii.dot(sl);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},le=class i{constructor(t,e,n,s,r,a,o,l,c,h,u,d,p,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,d,p,g,x,m)}set(t,e,n,s,r,a,o,l,c,h,u,d,p,g,x,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Ps.setFromMatrixColumn(t,0).length(),r=1/Ps.setFromMatrixColumn(t,1).length(),a=1/Ps.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=a*h,p=a*u,g=o*h,x=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-x*c,e[9]=-o*l,e[2]=x-d*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d+x*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=x+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d-x*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=x-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,p=a*u,g=o*h,x=o*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,p=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=x-d*u,e[8]=g*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=a*l,p=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=a*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xf,t,qf)}lookAt(t,e,n){let s=this.elements;return Cn.subVectors(t,e),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),Di.crossVectors(n,Cn),Di.lengthSq()===0&&(Math.abs(n.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),Di.crossVectors(n,Cn)),Di.normalize(),xa.crossVectors(Cn,Di),s[0]=Di.x,s[4]=xa.x,s[8]=Cn.x,s[1]=Di.y,s[5]=xa.y,s[9]=Cn.y,s[2]=Di.z,s[6]=xa.z,s[10]=Cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],x=n[6],m=n[10],f=n[14],M=n[3],S=n[7],y=n[11],C=n[15],w=s[0],R=s[4],I=s[8],E=s[12],v=s[1],A=s[5],D=s[9],L=s[13],V=s[2],$=s[6],k=s[10],j=s[14],q=s[3],it=s[7],ot=s[11],mt=s[15];return r[0]=a*w+o*v+l*V+c*q,r[4]=a*R+o*A+l*$+c*it,r[8]=a*I+o*D+l*k+c*ot,r[12]=a*E+o*L+l*j+c*mt,r[1]=h*w+u*v+d*V+p*q,r[5]=h*R+u*A+d*$+p*it,r[9]=h*I+u*D+d*k+p*ot,r[13]=h*E+u*L+d*j+p*mt,r[2]=g*w+x*v+m*V+f*q,r[6]=g*R+x*A+m*$+f*it,r[10]=g*I+x*D+m*k+f*ot,r[14]=g*E+x*L+m*j+f*mt,r[3]=M*w+S*v+y*V+C*q,r[7]=M*R+S*A+y*$+C*it,r[11]=M*I+S*D+y*k+C*ot,r[15]=M*E+S*L+y*j+C*mt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],x=t[7],m=t[11],f=t[15];return g*(+r*l*u-s*c*u-r*o*d+n*c*d+s*o*p-n*l*p)+x*(+e*l*p-e*c*d+r*a*d-s*a*p+s*c*h-r*l*h)+m*(+e*c*u-e*o*p-r*a*u+n*a*p+r*o*h-n*c*h)+f*(-s*o*h-e*l*u+e*o*d+s*a*u-n*a*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],x=t[13],m=t[14],f=t[15],M=u*m*c-x*d*c+x*l*p-o*m*p-u*l*f+o*d*f,S=g*d*c-h*m*c-g*l*p+a*m*p+h*l*f-a*d*f,y=h*x*c-g*u*c+g*o*p-a*x*p-h*o*f+a*u*f,C=g*u*l-h*x*l-g*o*d+a*x*d+h*o*m-a*u*m,w=e*M+n*S+s*y+r*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/w;return t[0]=M*R,t[1]=(x*d*r-u*m*r-x*s*p+n*m*p+u*s*f-n*d*f)*R,t[2]=(o*m*r-x*l*r+x*s*c-n*m*c-o*s*f+n*l*f)*R,t[3]=(u*l*r-o*d*r-u*s*c+n*d*c+o*s*p-n*l*p)*R,t[4]=S*R,t[5]=(h*m*r-g*d*r+g*s*p-e*m*p-h*s*f+e*d*f)*R,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*f-e*l*f)*R,t[7]=(a*d*r-h*l*r+h*s*c-e*d*c-a*s*p+e*l*p)*R,t[8]=y*R,t[9]=(g*u*r-h*x*r-g*n*p+e*x*p+h*n*f-e*u*f)*R,t[10]=(a*x*r-g*o*r+g*n*c-e*x*c-a*n*f+e*o*f)*R,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*p-e*o*p)*R,t[12]=C*R,t[13]=(h*x*s-g*u*s+g*n*d-e*x*d-h*n*m+e*u*m)*R,t[14]=(g*o*s-a*x*s-g*n*l+e*x*l+a*n*m-e*o*m)*R,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*d+e*o*d)*R,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,p=r*h,g=r*u,x=a*h,m=a*u,f=o*u,M=l*c,S=l*h,y=l*u,C=n.x,w=n.y,R=n.z;return s[0]=(1-(x+f))*C,s[1]=(p+y)*C,s[2]=(g-S)*C,s[3]=0,s[4]=(p-y)*w,s[5]=(1-(d+f))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(g+S)*R,s[9]=(m-M)*R,s[10]=(1-(d+x))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Ps.set(s[0],s[1],s[2]).length(),a=Ps.set(s[4],s[5],s[6]).length(),o=Ps.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Wn.copy(this);let c=1/r,h=1/a,u=1/o;return Wn.elements[0]*=c,Wn.elements[1]*=c,Wn.elements[2]*=c,Wn.elements[4]*=h,Wn.elements[5]*=h,Wn.elements[6]*=h,Wn.elements[8]*=u,Wn.elements[9]*=u,Wn.elements[10]*=u,e.setFromRotationMatrix(Wn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=_i){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s),p,g;if(o===_i)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Wa)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=_i){let l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(a-r),d=(e+t)*c,p=(n+s)*h,g,x;if(o===_i)g=(a+r)*u,x=-2*u;else if(o===Wa)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Ps=new P,Wn=new le,Xf=new P(0,0,0),qf=new P(1,1,1),Di=new P,xa=new P,Cn=new P,Yh=new le,Zh=new Wi,ti=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(yn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-yn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(yn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-yn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(yn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-yn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Yh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Zh.setFromEuler(this),this.setFromQuaternion(Zh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ti.DEFAULT_ORDER="XYZ";var $a=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Yf=0,$h=new P,Is=new Wi,fi=new le,va=new P,Ar=new P,Zf=new P,$f=new Wi,Jh=new P(1,0,0),Kh=new P(0,1,0),Qh=new P(0,0,1),jh={type:"added"},Jf={type:"removed"},Ds={type:"childadded",child:null},rl={type:"childremoved",child:null},Ie=class i extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yf++}),this.uuid=Bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new P,e=new ti,n=new Wi,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new le},normalMatrix:{value:new Xt}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $a,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Is.setFromAxisAngle(t,e),this.quaternion.multiply(Is),this}rotateOnWorldAxis(t,e){return Is.setFromAxisAngle(t,e),this.quaternion.premultiply(Is),this}rotateX(t){return this.rotateOnAxis(Jh,t)}rotateY(t){return this.rotateOnAxis(Kh,t)}rotateZ(t){return this.rotateOnAxis(Qh,t)}translateOnAxis(t,e){return $h.copy(t).applyQuaternion(this.quaternion),this.position.add($h.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Jh,t)}translateY(t){return this.translateOnAxis(Kh,t)}translateZ(t){return this.translateOnAxis(Qh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(fi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?va.copy(t):va.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fi.lookAt(Ar,va,this.up):fi.lookAt(va,Ar,this.up),this.quaternion.setFromRotationMatrix(fi),s&&(fi.extractRotation(s.matrixWorld),Is.setFromRotationMatrix(fi),this.quaternion.premultiply(Is.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(jh),Ds.child=t,this.dispatchEvent(Ds),Ds.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Jf),rl.child=t,this.dispatchEvent(rl),rl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),fi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),fi.multiply(t.parent.matrixWorld)),t.applyMatrix4(fi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(jh),Ds.child=t,this.dispatchEvent(Ds),Ds.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,t,Zf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,$f,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ie.DEFAULT_UP=new P(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xn=new P,pi=new P,al=new P,mi=new P,Ls=new P,Us=new P,tu=new P,ol=new P,ll=new P,cl=new P,hl=new ge,ul=new ge,dl=new ge,Fi=class i{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Xn.subVectors(t,e),s.cross(Xn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Xn.subVectors(s,e),pi.subVectors(n,e),al.subVectors(t,e);let a=Xn.dot(Xn),o=Xn.dot(pi),l=Xn.dot(al),c=pi.dot(pi),h=pi.dot(al),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,mi.x),l.addScaledVector(a,mi.y),l.addScaledVector(o,mi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return hl.setScalar(0),ul.setScalar(0),dl.setScalar(0),hl.fromBufferAttribute(t,e),ul.fromBufferAttribute(t,n),dl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(hl,r.x),a.addScaledVector(ul,r.y),a.addScaledVector(dl,r.z),a}static isFrontFacing(t,e,n,s){return Xn.subVectors(n,e),pi.subVectors(t,e),Xn.cross(pi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),Xn.cross(pi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Ls.subVectors(s,n),Us.subVectors(r,n),ol.subVectors(t,n);let l=Ls.dot(ol),c=Us.dot(ol);if(l<=0&&c<=0)return e.copy(n);ll.subVectors(t,s);let h=Ls.dot(ll),u=Us.dot(ll);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Ls,a);cl.subVectors(t,r);let p=Ls.dot(cl),g=Us.dot(cl);if(g>=0&&p<=g)return e.copy(r);let x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Us,o);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return tu.subVectors(r,s),o=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(tu,o);let f=1/(m+x+d);return a=x*f,o=d*f,e.copy(n).addScaledVector(Ls,a).addScaledVector(Us,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ju={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},_a={h:0,s:0,l:0};function fl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Mt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Kt.workingColorSpace){if(t=Of(t,1),e=yn(e,0,1),n=yn(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=fl(a,r,t+1/3),this.g=fl(a,r,t),this.b=fl(a,r,t-1/3)}return Kt.toWorkingColorSpace(this,s),this}setStyle(t,e=ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){let n=ju[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=yi(t.r),this.g=yi(t.g),this.b=yi(t.b),this}copyLinearToSRGB(t){return this.r=Xs(t.r),this.g=Xs(t.g),this.b=Xs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return Kt.fromWorkingColorSpace(en.copy(this),t),Math.round(yn(en.r*255,0,255))*65536+Math.round(yn(en.g*255,0,255))*256+Math.round(yn(en.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(en.copy(this),e);let n=en.r,s=en.g,r=en.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(en.copy(this),e),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=ke){Kt.fromWorkingColorSpace(en.copy(this),t);let e=en.r,n=en.g,s=en.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Li),this.setHSL(Li.h+t,Li.s+e,Li.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Li),t.getHSL(_a);let n=Jo(Li.h,_a.h,e),s=Jo(Li.s,_a.s,e),r=Jo(Li.l,_a.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new Mt;Mt.NAMES=ju;var Kf=0,ei=class extends Gi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Bi(),this.name="",this.blending=Oi,this.side=ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wl,this.blendDst=Al,this.blendEquation=On,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ts,this.stencilZFail=Ts,this.stencilZPass=Ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(n.blending=this.blending),this.side!==ki&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wl&&(n.blendSrc=this.blendSrc),this.blendDst!==Al&&(n.blendDst=this.blendDst),this.blendEquation!==On&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ys&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ts&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ts&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ts&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},xe=class extends ei{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.combine=Bu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Oe=new P,ya=new Et,Qe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=hc,this.updateRanges=[],this.gpuType=vi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ya.fromBufferAttribute(this,e),ya.applyMatrix3(t),this.setXY(e,ya.x,ya.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Qn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Qn(e,this.array)),e}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Qn(e,this.array)),e}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Qn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Qn(e,this.array)),e}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array),r=me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==hc&&(t.usage=this.usage),t}};var Ja=class extends Qe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ka=class extends Qe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ye=class extends Qe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Qf=0,Fn=new le,pl=new Ie,Ns=new P,Pn=new ps,Rr=new ps,qe=new P,$e=class i extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=Bi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Qu(t)?Ka:Ja)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Fn.makeRotationFromQuaternion(t),this.applyMatrix4(Fn),this}rotateX(t){return Fn.makeRotationX(t),this.applyMatrix4(Fn),this}rotateY(t){return Fn.makeRotationY(t),this.applyMatrix4(Fn),this}rotateZ(t){return Fn.makeRotationZ(t),this.applyMatrix4(Fn),this}translate(t,e,n){return Fn.makeTranslation(t,e,n),this.applyMatrix4(Fn),this}scale(t,e,n){return Fn.makeScale(t,e,n),this.applyMatrix4(Fn),this}lookAt(t){return pl.lookAt(t),pl.updateMatrix(),this.applyMatrix4(pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ye(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ps);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Pn.setFromBufferAttribute(r),this.morphTargetsRelative?(qe.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint(qe),qe.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint(qe)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Js);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(Pn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Rr.setFromBufferAttribute(o),this.morphTargetsRelative?(qe.addVectors(Pn.min,Rr.min),Pn.expandByPoint(qe),qe.addVectors(Pn.max,Rr.max),Pn.expandByPoint(qe)):(Pn.expandByPoint(Rr.min),Pn.expandByPoint(Rr.max))}Pn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)qe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(qe));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)qe.fromBufferAttribute(o,c),l&&(Ns.fromBufferAttribute(t,c),qe.add(Ns)),s=Math.max(s,n.distanceToSquared(qe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qe(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new P,l[I]=new P;let c=new P,h=new P,u=new P,d=new Et,p=new Et,g=new Et,x=new P,m=new P;function f(I,E,v){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,v),d.fromBufferAttribute(r,I),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,v),h.sub(c),u.sub(c),p.sub(d),g.sub(d);let A=1/(p.x*g.y-g.x*p.y);isFinite(A)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(A),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(A),o[I].add(x),o[E].add(x),o[v].add(x),l[I].add(m),l[E].add(m),l[v].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let I=0,E=M.length;I<E;++I){let v=M[I],A=v.start,D=v.count;for(let L=A,V=A+D;L<V;L+=3)f(t.getX(L+0),t.getX(L+1),t.getX(L+2))}let S=new P,y=new P,C=new P,w=new P;function R(I){C.fromBufferAttribute(s,I),w.copy(C);let E=o[I];S.copy(E),S.sub(C.multiplyScalar(C.dot(E))).normalize(),y.crossVectors(w,E);let A=y.dot(l[I])<0?-1:1;a.setXYZW(I,S.x,S.y,S.z,A)}for(let I=0,E=M.length;I<E;++I){let v=M[I],A=v.start,D=v.count;for(let L=A,V=A+D;L<V;L+=3)R(t.getX(L+0)),R(t.getX(L+1)),R(t.getX(L+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Qe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,u=new P;if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)qe.fromBufferAttribute(t,e),qe.normalize(),t.setXYZ(e,qe.x,qe.y,qe.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new Qe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],p=t(d,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},eu=new le,rs=new Za,Ma=new Js,nu=new P,Sa=new P,ba=new P,Ea=new P,ml=new P,Ta=new P,iu=new P,wa=new P,pt=class extends Ie{constructor(t=new $e,e=new xe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Ta.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(ml.fromBufferAttribute(u,t),a?Ta.addScaledVector(ml,h):Ta.addScaledVector(ml.sub(e),h))}e.add(Ta)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ma.copy(n.boundingSphere),Ma.applyMatrix4(r),rs.copy(t.ray).recast(t.near),!(Ma.containsPoint(rs.origin)===!1&&(rs.intersectSphere(Ma,nu)===null||rs.origin.distanceToSquared(nu)>(t.far-t.near)**2))&&(eu.copy(r).invert(),rs.copy(t.ray).applyMatrix4(eu),!(n.boundingBox!==null&&rs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,rs)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,C=S;y<C;y+=3){let w=o.getX(y),R=o.getX(y+1),I=o.getX(y+2);s=Aa(this,f,t,n,c,h,u,w,R,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let M=o.getX(m),S=o.getX(m+1),y=o.getX(m+2);s=Aa(this,a,t,n,c,h,u,M,S,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,C=S;y<C;y+=3){let w=y,R=y+1,I=y+2;s=Aa(this,f,t,n,c,h,u,w,R,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let M=m,S=m+1,y=m+2;s=Aa(this,a,t,n,c,h,u,M,S,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function jf(i,t,e,n,s,r,a,o){let l;if(t.side===Ye?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ki,o),l===null)return null;wa.copy(o),wa.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(wa);return c<e.near||c>e.far?null:{distance:c,point:wa.clone(),object:i}}function Aa(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Sa),i.getVertexPosition(l,ba),i.getVertexPosition(c,Ea);let h=jf(i,t,e,n,Sa,ba,Ea,iu);if(h){let u=new P;Fi.getBarycoord(iu,Sa,ba,Ea,u),s&&(h.uv=Fi.getInterpolatedAttribute(s,o,l,c,u,new Et)),r&&(h.uv1=Fi.getInterpolatedAttribute(r,o,l,c,u,new Et)),a&&(h.normal=Fi.getInterpolatedAttribute(a,o,l,c,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new P,materialIndex:0};Fi.getNormal(Sa,ba,Ea,d.normal),h.face=d,h.barycoord=u}return h}var ve=class i extends $e{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ye(c,3)),this.setAttribute("normal",new ye(h,3)),this.setAttribute("uv",new ye(u,2));function g(x,m,f,M,S,y,C,w,R,I,E){let v=y/R,A=C/I,D=y/2,L=C/2,V=w/2,$=R+1,k=I+1,j=0,q=0,it=new P;for(let ot=0;ot<k;ot++){let mt=ot*A-L;for(let Ut=0;Ut<$;Ut++){let Jt=Ut*v-D;it[x]=Jt*M,it[m]=mt*S,it[f]=V,c.push(it.x,it.y,it.z),it[x]=0,it[m]=0,it[f]=w>0?1:-1,h.push(it.x,it.y,it.z),u.push(Ut/R),u.push(1-ot/I),j+=1}}for(let ot=0;ot<I;ot++)for(let mt=0;mt<R;mt++){let Ut=d+mt+$*ot,Jt=d+mt+$*(ot+1),J=d+(mt+1)+$*(ot+1),st=d+(mt+1)+$*ot;l.push(Ut,Jt,st),l.push(Jt,J,st),q+=6}o.addGroup(p,q,E),p+=q,d+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ks(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function fn(i){let t={};for(let e=0;e<i.length;e++){let n=Ks(i[e]);for(let s in n)t[s]=n[s]}return t}function tp(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function td(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}var bn={clone:Ks,merge:fn},ep=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,np=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,de=class extends ei{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ep,this.fragmentShader=np,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ks(t.uniforms),this.uniformsGroups=tp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Qa=class extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=_i}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ui=new P,su=new Et,ru=new Et,ze=class extends Qa{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=uc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan($o*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return uc*2*Math.atan(Math.tan($o*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ui.x,Ui.y).multiplyScalar(-t/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ui.x,Ui.y).multiplyScalar(-t/Ui.z)}getViewSize(t,e){return this.getViewBounds(t,su,ru),e.subVectors(ru,su)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan($o*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Fs=-90,Os=1,mc=class extends Ie{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ze(Fs,Os,t,e);s.layers=this.layers,this.add(s);let r=new ze(Fs,Os,t,e);r.layers=this.layers,this.add(r);let a=new ze(Fs,Os,t,e);a.layers=this.layers,this.add(a);let o=new ze(Fs,Os,t,e);o.layers=this.layers,this.add(o);let l=new ze(Fs,Os,t,e);l.layers=this.layers,this.add(l);let c=new ze(Fs,Os,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===_i)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Wa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},ja=class extends Sn{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Zs,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},gc=class extends Be{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ja(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:jn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ve(5,5,5),r=new de({name:"CubemapFromEquirect",uniforms:Ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:He});r.uniforms.tEquirect.value=e;let a=new pt(s,r),o=e.minFilter;return e.minFilter===ds&&(e.minFilter=jn),new mc(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},gl=new P,ip=new P,sp=new Xt,xi=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=gl.subVectors(n,e).cross(ip.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(gl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||sp.getNormalMatrix(t),s=this.coplanarPoint(gl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},as=new Js,Ra=new P,zr=class{constructor(t=new xi,e=new xi,n=new xi,s=new xi,r=new xi,a=new xi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=_i){let n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],x=s[10],m=s[11],f=s[12],M=s[13],S=s[14],y=s[15];if(n[0].setComponents(l-r,d-c,m-p,y-f).normalize(),n[1].setComponents(l+r,d+c,m+p,y+f).normalize(),n[2].setComponents(l+a,d+h,m+g,y+M).normalize(),n[3].setComponents(l-a,d-h,m-g,y-M).normalize(),n[4].setComponents(l-o,d-u,m-x,y-S).normalize(),e===_i)n[5].setComponents(l+o,d+u,m+x,y+S).normalize();else if(e===Wa)n[5].setComponents(o,u,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),as.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),as.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(as)}intersectsSprite(t){return as.center.set(0,0,0),as.radius=.7071067811865476,as.applyMatrix4(t.matrixWorld),this.intersectsSphere(as)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ra.x=s.normal.x>0?t.max.x:t.min.x,Ra.y=s.normal.y>0?t.max.y:t.min.y,Ra.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ra)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function ed(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function rp(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let x=u[p];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Mi=class i extends $e{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,d=e/l,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){let M=f*d-a;for(let S=0;S<c;S++){let y=S*u-r;g.push(y,-M,0),x.push(0,0,1),m.push(S/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<o;M++){let S=M+c*f,y=M+c*(f+1),C=M+1+c*(f+1),w=M+1+c*f;p.push(S,y,w),p.push(y,C,w)}this.setIndex(p),this.setAttribute("position",new ye(g,3)),this.setAttribute("normal",new ye(x,3)),this.setAttribute("uv",new ye(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},ap=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,op=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,lp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,up=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,fp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,mp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_p=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,yp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,wp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ap=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Rp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Cp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Pp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ip=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Dp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Np=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Op=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Bp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Gp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Zp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$p=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Qp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,jp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,em=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,im=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,rm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,am=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,om=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,um=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,mm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_m=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ym=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Sm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Em=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Am=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Rm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Cm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Pm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Im=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Um=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Nm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Om=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,km=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Vm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Gm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Wm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Xm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ym=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$m=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Km=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,t0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,e0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,n0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,i0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,s0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,r0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,a0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,l0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,d0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,f0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,p0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,m0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,g0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,v0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,y0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,E0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,w0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,A0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,R0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,P0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,D0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,U0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,N0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,F0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,O0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,z0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zt={alphahash_fragment:ap,alphahash_pars_fragment:op,alphamap_fragment:lp,alphamap_pars_fragment:cp,alphatest_fragment:hp,alphatest_pars_fragment:up,aomap_fragment:dp,aomap_pars_fragment:fp,batching_pars_vertex:pp,batching_vertex:mp,begin_vertex:gp,beginnormal_vertex:xp,bsdfs:vp,iridescence_fragment:_p,bumpmap_pars_fragment:yp,clipping_planes_fragment:Mp,clipping_planes_pars_fragment:Sp,clipping_planes_pars_vertex:bp,clipping_planes_vertex:Ep,color_fragment:Tp,color_pars_fragment:wp,color_pars_vertex:Ap,color_vertex:Rp,common:Cp,cube_uv_reflection_fragment:Pp,defaultnormal_vertex:Ip,displacementmap_pars_vertex:Dp,displacementmap_vertex:Lp,emissivemap_fragment:Up,emissivemap_pars_fragment:Np,colorspace_fragment:Fp,colorspace_pars_fragment:Op,envmap_fragment:zp,envmap_common_pars_fragment:Bp,envmap_pars_fragment:kp,envmap_pars_vertex:Hp,envmap_physical_pars_fragment:Qp,envmap_vertex:Vp,fog_vertex:Gp,fog_pars_vertex:Wp,fog_fragment:Xp,fog_pars_fragment:qp,gradientmap_pars_fragment:Yp,lightmap_pars_fragment:Zp,lights_lambert_fragment:$p,lights_lambert_pars_fragment:Jp,lights_pars_begin:Kp,lights_toon_fragment:jp,lights_toon_pars_fragment:tm,lights_phong_fragment:em,lights_phong_pars_fragment:nm,lights_physical_fragment:im,lights_physical_pars_fragment:sm,lights_fragment_begin:rm,lights_fragment_maps:am,lights_fragment_end:om,logdepthbuf_fragment:lm,logdepthbuf_pars_fragment:cm,logdepthbuf_pars_vertex:hm,logdepthbuf_vertex:um,map_fragment:dm,map_pars_fragment:fm,map_particle_fragment:pm,map_particle_pars_fragment:mm,metalnessmap_fragment:gm,metalnessmap_pars_fragment:xm,morphinstance_vertex:vm,morphcolor_vertex:_m,morphnormal_vertex:ym,morphtarget_pars_vertex:Mm,morphtarget_vertex:Sm,normal_fragment_begin:bm,normal_fragment_maps:Em,normal_pars_fragment:Tm,normal_pars_vertex:wm,normal_vertex:Am,normalmap_pars_fragment:Rm,clearcoat_normal_fragment_begin:Cm,clearcoat_normal_fragment_maps:Pm,clearcoat_pars_fragment:Im,iridescence_pars_fragment:Dm,opaque_fragment:Lm,packing:Um,premultiplied_alpha_fragment:Nm,project_vertex:Fm,dithering_fragment:Om,dithering_pars_fragment:zm,roughnessmap_fragment:Bm,roughnessmap_pars_fragment:km,shadowmap_pars_fragment:Hm,shadowmap_pars_vertex:Vm,shadowmap_vertex:Gm,shadowmask_pars_fragment:Wm,skinbase_vertex:Xm,skinning_pars_vertex:qm,skinning_vertex:Ym,skinnormal_vertex:Zm,specularmap_fragment:$m,specularmap_pars_fragment:Jm,tonemapping_fragment:Km,tonemapping_pars_fragment:Qm,transmission_fragment:jm,transmission_pars_fragment:t0,uv_pars_fragment:e0,uv_pars_vertex:n0,uv_vertex:i0,worldpos_vertex:s0,background_vert:r0,background_frag:a0,backgroundCube_vert:o0,backgroundCube_frag:l0,cube_vert:c0,cube_frag:h0,depth_vert:u0,depth_frag:d0,distanceRGBA_vert:f0,distanceRGBA_frag:p0,equirect_vert:m0,equirect_frag:g0,linedashed_vert:x0,linedashed_frag:v0,meshbasic_vert:_0,meshbasic_frag:y0,meshlambert_vert:M0,meshlambert_frag:S0,meshmatcap_vert:b0,meshmatcap_frag:E0,meshnormal_vert:T0,meshnormal_frag:w0,meshphong_vert:A0,meshphong_frag:R0,meshphysical_vert:C0,meshphysical_frag:P0,meshtoon_vert:I0,meshtoon_frag:D0,points_vert:L0,points_frag:U0,shadow_vert:N0,shadow_frag:F0,sprite_vert:O0,sprite_frag:z0},ht={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},Kn={basic:{uniforms:fn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:fn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Mt(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:fn([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:fn([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:fn([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Mt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:fn([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:fn([ht.points,ht.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:fn([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:fn([ht.common,ht.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:fn([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:fn([ht.sprite,ht.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:fn([ht.common,ht.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:fn([ht.lights,ht.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};Kn.physical={uniforms:fn([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};var Ca={r:0,b:0,g:0},os=new ti,B0=new le;function k0(i,t,e,n,s,r,a){let o=new Mt(0),l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(M){let S=M.isScene===!0?M.background:null;return S&&S.isTexture&&(S=(M.backgroundBlurriness>0?e:t).get(S)),S}function x(M){let S=!1,y=g(M);y===null?f(o,l):y&&y.isColor&&(f(y,1),S=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,S){let y=g(S);y&&(y.isCubeTexture||y.mapping===uo)?(h===void 0&&(h=new pt(new ve(1,1,1),new de({name:"BackgroundCubeMaterial",uniforms:Ks(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),os.copy(S.backgroundRotation),os.x*=-1,os.y*=-1,os.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(B0.makeRotationFromEuler(os)),h.material.toneMapped=Kt.getTransfer(y.colorSpace)!==oe,(u!==y||d!==y.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,p=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new pt(new Mi(2,2),new de({name:"BackgroundMaterial",uniforms:Ks(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:ki,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(y.colorSpace)!==oe,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,p=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function f(M,S){M.getRGB(Ca,td(i)),n.buffers.color.setClear(Ca.r,Ca.g,Ca.b,S,a)}return{getClearColor:function(){return o},setClearColor:function(M,S=1){o.set(M),l=S,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,f(o,l)},render:x,addToRenderList:m}}function H0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(v,A,D,L,V){let $=!1,k=u(L,D,A);r!==k&&(r=k,c(r.object)),$=p(v,L,D,V),$&&g(v,L,D,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,y(v,A,D,L),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return i.createVertexArray()}function c(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function u(v,A,D){let L=D.wireframe===!0,V=n[v.id];V===void 0&&(V={},n[v.id]=V);let $=V[A.id];$===void 0&&($={},V[A.id]=$);let k=$[L];return k===void 0&&(k=d(l()),$[L]=k),k}function d(v){let A=[],D=[],L=[];for(let V=0;V<e;V++)A[V]=0,D[V]=0,L[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:D,attributeDivisors:L,object:v,attributes:{},index:null}}function p(v,A,D,L){let V=r.attributes,$=A.attributes,k=0,j=D.getAttributes();for(let q in j)if(j[q].location>=0){let ot=V[q],mt=$[q];if(mt===void 0&&(q==="instanceMatrix"&&v.instanceMatrix&&(mt=v.instanceMatrix),q==="instanceColor"&&v.instanceColor&&(mt=v.instanceColor)),ot===void 0||ot.attribute!==mt||mt&&ot.data!==mt.data)return!0;k++}return r.attributesNum!==k||r.index!==L}function g(v,A,D,L){let V={},$=A.attributes,k=0,j=D.getAttributes();for(let q in j)if(j[q].location>=0){let ot=$[q];ot===void 0&&(q==="instanceMatrix"&&v.instanceMatrix&&(ot=v.instanceMatrix),q==="instanceColor"&&v.instanceColor&&(ot=v.instanceColor));let mt={};mt.attribute=ot,ot&&ot.data&&(mt.data=ot.data),V[q]=mt,k++}r.attributes=V,r.attributesNum=k,r.index=L}function x(){let v=r.newAttributes;for(let A=0,D=v.length;A<D;A++)v[A]=0}function m(v){f(v,0)}function f(v,A){let D=r.newAttributes,L=r.enabledAttributes,V=r.attributeDivisors;D[v]=1,L[v]===0&&(i.enableVertexAttribArray(v),L[v]=1),V[v]!==A&&(i.vertexAttribDivisor(v,A),V[v]=A)}function M(){let v=r.newAttributes,A=r.enabledAttributes;for(let D=0,L=A.length;D<L;D++)A[D]!==v[D]&&(i.disableVertexAttribArray(D),A[D]=0)}function S(v,A,D,L,V,$,k){k===!0?i.vertexAttribIPointer(v,A,D,V,$):i.vertexAttribPointer(v,A,D,L,V,$)}function y(v,A,D,L){x();let V=L.attributes,$=D.getAttributes(),k=A.defaultAttributeValues;for(let j in $){let q=$[j];if(q.location>=0){let it=V[j];if(it===void 0&&(j==="instanceMatrix"&&v.instanceMatrix&&(it=v.instanceMatrix),j==="instanceColor"&&v.instanceColor&&(it=v.instanceColor)),it!==void 0){let ot=it.normalized,mt=it.itemSize,Ut=t.get(it);if(Ut===void 0)continue;let Jt=Ut.buffer,J=Ut.type,st=Ut.bytesPerElement,yt=J===i.INT||J===i.UNSIGNED_INT||it.gpuType===Jc;if(it.isInterleavedBufferAttribute){let at=it.data,St=at.stride,It=it.offset;if(at.isInstancedInterleavedBuffer){for(let Ot=0;Ot<q.locationSize;Ot++)f(q.location+Ot,at.meshPerAttribute);v.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Ot=0;Ot<q.locationSize;Ot++)m(q.location+Ot);i.bindBuffer(i.ARRAY_BUFFER,Jt);for(let Ot=0;Ot<q.locationSize;Ot++)S(q.location+Ot,mt/q.locationSize,J,ot,St*st,(It+mt/q.locationSize*Ot)*st,yt)}else{if(it.isInstancedBufferAttribute){for(let at=0;at<q.locationSize;at++)f(q.location+at,it.meshPerAttribute);v.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let at=0;at<q.locationSize;at++)m(q.location+at);i.bindBuffer(i.ARRAY_BUFFER,Jt);for(let at=0;at<q.locationSize;at++)S(q.location+at,mt/q.locationSize,J,ot,mt*st,mt/q.locationSize*at*st,yt)}}else if(k!==void 0){let ot=k[j];if(ot!==void 0)switch(ot.length){case 2:i.vertexAttrib2fv(q.location,ot);break;case 3:i.vertexAttrib3fv(q.location,ot);break;case 4:i.vertexAttrib4fv(q.location,ot);break;default:i.vertexAttrib1fv(q.location,ot)}}}}M()}function C(){I();for(let v in n){let A=n[v];for(let D in A){let L=A[D];for(let V in L)h(L[V].object),delete L[V];delete A[D]}delete n[v]}}function w(v){if(n[v.id]===void 0)return;let A=n[v.id];for(let D in A){let L=A[D];for(let V in L)h(L[V].object),delete L[V];delete A[D]}delete n[v.id]}function R(v){for(let A in n){let D=n[A];if(D[v.id]===void 0)continue;let L=D[v.id];for(let V in L)h(L[V].object),delete L[V];delete D[v.id]}}function I(){E(),a=!0,r!==s&&(r=s,c(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function V0(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,d){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function G0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==In&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let I=R===rn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==qn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==vi&&!I)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:y,vertexTextures:C,maxSamples:w}}function W0(i){let t=this,e=null,n=0,s=!1,r=!1,a=new xi,o=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||n!==0||s;return s=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:n,S=M*4,y=f.clippingState||null;l.value=y,y=h(g,d,S,p);for(let C=0;C!==S;++C)y[C]=e[C];f.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let f=p+x*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,y=p;S!==x;++S,y+=4)a.copy(u[S]).applyMatrix4(M,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function X0(i){let t=new WeakMap;function e(a,o){return o===Fr?a.mapping=Zs:o===Nl&&(a.mapping=$s),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Fr||o===Nl)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new gc(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Qs=class extends Qa{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Gs=4,au=[.125,.215,.35,.446,.526,.582],hs=20,xl=new Qs,ou=new Mt,vl=null,_l=0,yl=0,Ml=!1,cs=(1+Math.sqrt(5))/2,zs=1/cs,lu=[new P(-cs,zs,0),new P(cs,zs,0),new P(-zs,0,cs),new P(zs,0,cs),new P(0,cs,-zs),new P(0,cs,zs),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],js=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){vl=this._renderer.getRenderTarget(),_l=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),Ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=uu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(vl,_l,yl),this._renderer.xr.enabled=Ml,t.scissorTest=!1,Pa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Zs||t.mapping===$s?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),vl=this._renderer.getRenderTarget(),_l=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),Ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:jn,minFilter:jn,generateMipmaps:!1,type:rn,format:In,colorSpace:rr,depthBuffer:!1},s=cu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cu(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=q0(r)),this._blurMaterial=Y0(r,t,e)}return s}_compileMaterial(t){let e=new pt(this._lodPlanes[0],t);this._renderer.compile(e,xl)}_sceneToCubeUV(t,e,n,s){let o=new ze(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(ou),h.toneMapping=zi,h.autoClear=!1;let p=new xe({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),g=new pt(new ve,p),x=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,x=!0):(p.color.copy(ou),x=!0);for(let f=0;f<6;f++){let M=f%3;M===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):M===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));let S=this._cubeSize;Pa(s,M*S,f>2?S:0,S,S),h.setRenderTarget(s),x&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Zs||t.mapping===$s;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=uu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new pt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Pa(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,xl)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=lu[(s-r-1)%lu.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new pt(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*hs-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):hs;m>hs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${hs}`);let f=[],M=0;for(let R=0;R<hs;++R){let I=R/x,E=Math.exp(-I*I/2);f.push(E),R===0?M+=E:R<m&&(M+=2*E)}for(let R=0;R<f.length;R++)f[R]=f[R]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;let y=this._sizeLods[s],C=3*y*(s>S-Gs?s-S+Gs:0),w=4*(this._cubeSize-y);Pa(e,C,w,3*y,2*y),l.setRenderTarget(e),l.render(u,xl)}};function q0(i){let t=[],e=[],n=[],s=i,r=i-Gs+1+au.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Gs?l=au[a-i+Gs-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,x=3,m=2,f=1,M=new Float32Array(x*g*p),S=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let w=0;w<p;w++){let R=w%3*2/3-1,I=w>2?0:-1,E=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];M.set(E,x*g*w),S.set(d,m*g*w);let v=[w,w,w,w,w,w];y.set(v,f*g*w)}let C=new $e;C.setAttribute("position",new Qe(M,x)),C.setAttribute("uv",new Qe(S,m)),C.setAttribute("faceIndex",new Qe(y,f)),t.push(C),s>Gs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function cu(i,t,e){let n=new Be(i,t,e);return n.texture.mapping=uo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Pa(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Y0(i,t,e){let n=new Float32Array(hs),s=new P(0,1,0);return new de({name:"SphericalGaussianBlur",defines:{n:hs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ih(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:He,depthTest:!1,depthWrite:!1})}function hu(){return new de({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ih(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:He,depthTest:!1,depthWrite:!1})}function uu(){return new de({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ih(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:He,depthTest:!1,depthWrite:!1})}function ih(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Z0(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Fr||l===Nl,h=l===Zs||l===$s;if(c||h){let u=t.get(o),d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new js(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{let p=o.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new js(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function $0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Lr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function J0(i,t,e,n){let s={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,f=x.length;m<f;m++)t.remove(x[m])}d.removeEventListener("dispose",a),delete s[d.id];let p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let g in d)t.update(d[g],i.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let x=p[g];for(let m=0,f=x.length;m<f;m++)t.update(x[m],i.ARRAY_BUFFER)}}function c(u){let d=[],p=u.index,g=u.attributes.position,x=0;if(p!==null){let M=p.array;x=p.version;for(let S=0,y=M.length;S<y;S+=3){let C=M[S+0],w=M[S+1],R=M[S+2];d.push(C,w,w,R,R,C)}}else if(g!==void 0){let M=g.array;x=g.version;for(let S=0,y=M.length/3-1;S<y;S+=3){let C=S+0,w=S+1,R=S+2;d.push(C,w,w,R,R,C)}}else return;let m=new(Qu(d)?Ka:Ja)(d,1);m.version=x;let f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function K0(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,p){i.drawElements(n,p,r,d*a),e.update(p,n,1)}function c(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,d*a,g),e.update(p,n,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function u(d,p,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/a,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,x,0,g);let f=0;for(let M=0;M<g;M++)f+=p[M]*x[M];e.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Q0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function j0(i,t,e){let n=new WeakMap,s=new ge;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let E=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],S=0;p===!0&&(S=1),g===!0&&(S=2),x===!0&&(S=3);let y=o.attributes.position.count*S,C=1;y>t.maxTextureSize&&(C=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let w=new Float32Array(y*C*4*u),R=new Ya(w,y,C,u);R.type=vi,R.needsUpdate=!0;let I=S*4;for(let v=0;v<u;v++){let A=m[v],D=f[v],L=M[v],V=y*C*4*v;for(let $=0;$<A.count;$++){let k=$*I;p===!0&&(s.fromBufferAttribute(A,$),w[V+k+0]=s.x,w[V+k+1]=s.y,w[V+k+2]=s.z,w[V+k+3]=0),g===!0&&(s.fromBufferAttribute(D,$),w[V+k+4]=s.x,w[V+k+5]=s.y,w[V+k+6]=s.z,w[V+k+7]=0),x===!0&&(s.fromBufferAttribute(L,$),w[V+k+8]=s.x,w[V+k+9]=s.y,w[V+k+10]=s.z,w[V+k+11]=L.itemSize===4?s.w:1)}}d={count:u,texture:R,size:new Et(y,C)},n.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function tg(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var tr=class extends Sn{constructor(t,e,n,s,r,a,o,l,c,h=Ws){if(h!==Ws&&h!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ws&&(n=fs),n===void 0&&h===Vi&&(n=Hi),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:nn,this.minFilter=l!==void 0?l:nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},nd=new Sn,du=new tr(1,1),id=new Ya,sd=new pc,rd=new ja,fu=[],pu=[],mu=new Float32Array(16),gu=new Float32Array(9),xu=new Float32Array(4);function ar(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=fu[s];if(r===void 0&&(r=new Float32Array(s),fu[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ve(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ge(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function mo(i,t){let e=pu[t];e===void 0&&(e=new Int32Array(t),pu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function eg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ng(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2fv(this.addr,t),Ge(e,t)}}function ig(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ve(e,t))return;i.uniform3fv(this.addr,t),Ge(e,t)}}function sg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4fv(this.addr,t),Ge(e,t)}}function rg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ge(e,t)}else{if(Ve(e,n))return;xu.set(n),i.uniformMatrix2fv(this.addr,!1,xu),Ge(e,n)}}function ag(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ge(e,t)}else{if(Ve(e,n))return;gu.set(n),i.uniformMatrix3fv(this.addr,!1,gu),Ge(e,n)}}function og(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ge(e,t)}else{if(Ve(e,n))return;mu.set(n),i.uniformMatrix4fv(this.addr,!1,mu),Ge(e,n)}}function lg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function cg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2iv(this.addr,t),Ge(e,t)}}function hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;i.uniform3iv(this.addr,t),Ge(e,t)}}function ug(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4iv(this.addr,t),Ge(e,t)}}function dg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function fg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2uiv(this.addr,t),Ge(e,t)}}function pg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;i.uniform3uiv(this.addr,t),Ge(e,t)}}function mg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4uiv(this.addr,t),Ge(e,t)}}function gg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(du.compareFunction=Ku,r=du):r=nd,e.setTexture2D(t||r,s)}function xg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||sd,s)}function vg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||rd,s)}function _g(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||id,s)}function yg(i){switch(i){case 5126:return eg;case 35664:return ng;case 35665:return ig;case 35666:return sg;case 35674:return rg;case 35675:return ag;case 35676:return og;case 5124:case 35670:return lg;case 35667:case 35671:return cg;case 35668:case 35672:return hg;case 35669:case 35673:return ug;case 5125:return dg;case 36294:return fg;case 36295:return pg;case 36296:return mg;case 35678:case 36198:case 36298:case 36306:case 35682:return gg;case 35679:case 36299:case 36307:return xg;case 35680:case 36300:case 36308:case 36293:return vg;case 36289:case 36303:case 36311:case 36292:return _g}}function Mg(i,t){i.uniform1fv(this.addr,t)}function Sg(i,t){let e=ar(t,this.size,2);i.uniform2fv(this.addr,e)}function bg(i,t){let e=ar(t,this.size,3);i.uniform3fv(this.addr,e)}function Eg(i,t){let e=ar(t,this.size,4);i.uniform4fv(this.addr,e)}function Tg(i,t){let e=ar(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function wg(i,t){let e=ar(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Ag(i,t){let e=ar(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Rg(i,t){i.uniform1iv(this.addr,t)}function Cg(i,t){i.uniform2iv(this.addr,t)}function Pg(i,t){i.uniform3iv(this.addr,t)}function Ig(i,t){i.uniform4iv(this.addr,t)}function Dg(i,t){i.uniform1uiv(this.addr,t)}function Lg(i,t){i.uniform2uiv(this.addr,t)}function Ug(i,t){i.uniform3uiv(this.addr,t)}function Ng(i,t){i.uniform4uiv(this.addr,t)}function Fg(i,t,e){let n=this.cache,s=t.length,r=mo(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),Ge(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||nd,r[a])}function Og(i,t,e){let n=this.cache,s=t.length,r=mo(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),Ge(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||sd,r[a])}function zg(i,t,e){let n=this.cache,s=t.length,r=mo(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),Ge(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||rd,r[a])}function Bg(i,t,e){let n=this.cache,s=t.length,r=mo(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),Ge(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||id,r[a])}function kg(i){switch(i){case 5126:return Mg;case 35664:return Sg;case 35665:return bg;case 35666:return Eg;case 35674:return Tg;case 35675:return wg;case 35676:return Ag;case 5124:case 35670:return Rg;case 35667:case 35671:return Cg;case 35668:case 35672:return Pg;case 35669:case 35673:return Ig;case 5125:return Dg;case 36294:return Lg;case 36295:return Ug;case 36296:return Ng;case 35678:case 36198:case 36298:case 36306:case 35682:return Fg;case 35679:case 36299:case 36307:return Og;case 35680:case 36300:case 36308:case 36293:return zg;case 36289:case 36303:case 36311:case 36292:return Bg}}var xc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=yg(e.type)}},vc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=kg(e.type)}},_c=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Sl=/(\w+)(\])?(\[|\.)?/g;function vu(i,t){i.seq.push(t),i.map[t.id]=t}function Hg(i,t,e){let n=i.name,s=n.length;for(Sl.lastIndex=0;;){let r=Sl.exec(n),a=Sl.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){vu(e,c===void 0?new xc(o,i,t):new vc(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new _c(o),vu(e,u)),e=u}}}var qs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Hg(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function _u(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Vg=37297,Gg=0;function Wg(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var yu=new Xt;function Xg(i){Kt._getMatrix(yu,Kt.workingColorSpace,i);let t=`mat3( ${yu.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(i)){case fo:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Mu(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Wg(i.getShaderSource(t),a)}else return s}function qg(i,t){let e=Xg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Yg(i,t){let e;switch(t){case Xc:e="Linear";break;case qc:e="Reinhard";break;case Yc:e="Cineon";break;case Vr:e="ACESFilmic";break;case Zc:e="AgX";break;case $c:e="Neutral";break;case Tf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ia=new P;function Zg(){Kt.getLuminanceCoefficients(Ia);let i=Ia.x.toFixed(4),t=Ia.y.toFixed(4),e=Ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $g(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ur).join(`
`)}function Jg(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Kg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ur(i){return i!==""}function Su(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Qg=/^[ \t]*#include +<([\w\d./]+)>/gm;function yc(i){return i.replace(Qg,tx)}var jg=new Map;function tx(i,t){let e=Zt[t];if(e===void 0){let n=jg.get(t);if(n!==void 0)e=Zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return yc(e)}var ex=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eu(i){return i.replace(ex,nx)}function nx(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Tu(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function ix(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===zu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Hr?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===gi&&(t="SHADOWMAP_TYPE_VSM"),t}function sx(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Zs:case $s:t="ENVMAP_TYPE_CUBE";break;case uo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function rx(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case $s:t="ENVMAP_MODE_REFRACTION";break}return t}function ax(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Bu:t="ENVMAP_BLENDING_MULTIPLY";break;case bf:t="ENVMAP_BLENDING_MIX";break;case Ef:t="ENVMAP_BLENDING_ADD";break}return t}function ox(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function lx(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=ix(e),c=sx(e),h=rx(e),u=ax(e),d=ox(e),p=$g(e),g=Jg(r),x=s.createProgram(),m,f,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ur).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ur).join(`
`),f.length>0&&(f+=`
`)):(m=[Tu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ur).join(`
`),f=[Tu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zi?"#define TONE_MAPPING":"",e.toneMapping!==zi?Zt.tonemapping_pars_fragment:"",e.toneMapping!==zi?Yg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,qg("linearToOutputTexel",e.outputColorSpace),Zg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ur).join(`
`)),a=yc(a),a=Su(a,e),a=bu(a,e),o=yc(o),o=Su(o,e),o=bu(o,e),a=Eu(a),o=Eu(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Bh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Bh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let S=M+m+a,y=M+f+o,C=_u(s,s.VERTEX_SHADER,S),w=_u(s,s.FRAGMENT_SHADER,y);s.attachShader(x,C),s.attachShader(x,w),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(A){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(x).trim(),L=s.getShaderInfoLog(C).trim(),V=s.getShaderInfoLog(w).trim(),$=!0,k=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,C,w);else{let j=Mu(s,C,"vertex"),q=Mu(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+D+`
`+j+`
`+q)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(L===""||V==="")&&(k=!1);k&&(A.diagnostics={runnable:$,programLog:D,vertexShader:{log:L,prefix:m},fragmentShader:{log:V,prefix:f}})}s.deleteShader(C),s.deleteShader(w),I=new qs(s,x),E=Kg(s,x)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(x,Vg)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Gg++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=w,this}var cx=0,Mc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Sc(t),e.set(t,n)),n}},Sc=class{constructor(t){this.id=cx++,this.code=t,this.usedTimes=0}};function hx(i,t,e,n,s,r,a){let o=new $a,l=new Mc,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,v,A,D,L){let V=D.fog,$=L.geometry,k=E.isMeshStandardMaterial?D.environment:null,j=(E.isMeshStandardMaterial?e:t).get(E.envMap||k),q=j&&j.mapping===uo?j.image.height:null,it=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));let ot=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,mt=ot!==void 0?ot.length:0,Ut=0;$.morphAttributes.position!==void 0&&(Ut=1),$.morphAttributes.normal!==void 0&&(Ut=2),$.morphAttributes.color!==void 0&&(Ut=3);let Jt,J,st,yt;if(it){let ue=Kn[it];Jt=ue.vertexShader,J=ue.fragmentShader}else Jt=E.vertexShader,J=E.fragmentShader,l.update(E),st=l.getVertexShaderID(E),yt=l.getFragmentShaderID(E);let at=i.getRenderTarget(),St=i.state.buffers.depth.getReversed(),It=L.isInstancedMesh===!0,Ot=L.isBatchedMesh===!0,he=!!E.map,Yt=!!E.matcap,pe=!!j,F=!!E.aoMap,Xe=!!E.lightMap,Ht=!!E.bumpMap,kt=!!E.normalMap,Pt=!!E.displacementMap,jt=!!E.emissiveMap,Tt=!!E.metalnessMap,T=!!E.roughnessMap,_=E.anisotropy>0,G=E.clearcoat>0,Q=E.dispersion>0,B=E.iridescence>0,N=E.sheen>0,Z=E.transmission>0,tt=_&&!!E.anisotropyMap,nt=G&&!!E.clearcoatMap,bt=G&&!!E.clearcoatNormalMap,K=G&&!!E.clearcoatRoughnessMap,lt=B&&!!E.iridescenceMap,Lt=B&&!!E.iridescenceThicknessMap,Nt=N&&!!E.sheenColorMap,_t=N&&!!E.sheenRoughnessMap,Vt=!!E.specularMap,zt=!!E.specularColorMap,ee=!!E.specularIntensityMap,U=Z&&!!E.transmissionMap,ct=Z&&!!E.thicknessMap,Y=!!E.gradientMap,et=!!E.alphaMap,vt=E.alphaTest>0,gt=!!E.alphaHash,Gt=!!E.extensions,Pe=zi;E.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(Pe=i.toneMapping);let je={shaderID:it,shaderType:E.type,shaderName:E.name,vertexShader:Jt,fragmentShader:J,defines:E.defines,customVertexShaderID:st,customFragmentShaderID:yt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Ot,batchingColor:Ot&&L._colorsTexture!==null,instancing:It,instancingColor:It&&L.instanceColor!==null,instancingMorph:It&&L.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:rr,alphaToCoverage:!!E.alphaToCoverage,map:he,matcap:Yt,envMap:pe,envMapMode:pe&&j.mapping,envMapCubeUVHeight:q,aoMap:F,lightMap:Xe,bumpMap:Ht,normalMap:kt,displacementMap:d&&Pt,emissiveMap:jt,normalMapObjectSpace:kt&&E.normalMapType===Cf,normalMapTangentSpace:kt&&E.normalMapType===nh,metalnessMap:Tt,roughnessMap:T,anisotropy:_,anisotropyMap:tt,clearcoat:G,clearcoatMap:nt,clearcoatNormalMap:bt,clearcoatRoughnessMap:K,dispersion:Q,iridescence:B,iridescenceMap:lt,iridescenceThicknessMap:Lt,sheen:N,sheenColorMap:Nt,sheenRoughnessMap:_t,specularMap:Vt,specularColorMap:zt,specularIntensityMap:ee,transmission:Z,transmissionMap:U,thicknessMap:ct,gradientMap:Y,opaque:E.transparent===!1&&E.blending===Oi&&E.alphaToCoverage===!1,alphaMap:et,alphaTest:vt,alphaHash:gt,combine:E.combine,mapUv:he&&x(E.map.channel),aoMapUv:F&&x(E.aoMap.channel),lightMapUv:Xe&&x(E.lightMap.channel),bumpMapUv:Ht&&x(E.bumpMap.channel),normalMapUv:kt&&x(E.normalMap.channel),displacementMapUv:Pt&&x(E.displacementMap.channel),emissiveMapUv:jt&&x(E.emissiveMap.channel),metalnessMapUv:Tt&&x(E.metalnessMap.channel),roughnessMapUv:T&&x(E.roughnessMap.channel),anisotropyMapUv:tt&&x(E.anisotropyMap.channel),clearcoatMapUv:nt&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:bt&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:lt&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:Lt&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:_t&&x(E.sheenRoughnessMap.channel),specularMapUv:Vt&&x(E.specularMap.channel),specularColorMapUv:zt&&x(E.specularColorMap.channel),specularIntensityMapUv:ee&&x(E.specularIntensityMap.channel),transmissionMapUv:U&&x(E.transmissionMap.channel),thicknessMapUv:ct&&x(E.thicknessMap.channel),alphaMapUv:et&&x(E.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(kt||_),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!$.attributes.uv&&(he||et),fog:!!V,useFog:E.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:St,skinning:L.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:mt,morphTextureStride:Ut,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:Pe,decodeVideoTexture:he&&E.map.isVideoTexture===!0&&Kt.getTransfer(E.map.colorSpace)===oe,decodeVideoTextureEmissive:jt&&E.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(E.emissiveMap.colorSpace)===oe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Mn,flipSided:E.side===Ye,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Gt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&E.extensions.multiDraw===!0||Ot)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return je.vertexUv1s=c.has(1),je.vertexUv2s=c.has(2),je.vertexUv3s=c.has(3),c.clear(),je}function f(E){let v=[];if(E.shaderID?v.push(E.shaderID):(v.push(E.customVertexShaderID),v.push(E.customFragmentShaderID)),E.defines!==void 0)for(let A in E.defines)v.push(A),v.push(E.defines[A]);return E.isRawShaderMaterial===!1&&(M(v,E),S(v,E),v.push(i.outputColorSpace)),v.push(E.customProgramCacheKey),v.join()}function M(E,v){E.push(v.precision),E.push(v.outputColorSpace),E.push(v.envMapMode),E.push(v.envMapCubeUVHeight),E.push(v.mapUv),E.push(v.alphaMapUv),E.push(v.lightMapUv),E.push(v.aoMapUv),E.push(v.bumpMapUv),E.push(v.normalMapUv),E.push(v.displacementMapUv),E.push(v.emissiveMapUv),E.push(v.metalnessMapUv),E.push(v.roughnessMapUv),E.push(v.anisotropyMapUv),E.push(v.clearcoatMapUv),E.push(v.clearcoatNormalMapUv),E.push(v.clearcoatRoughnessMapUv),E.push(v.iridescenceMapUv),E.push(v.iridescenceThicknessMapUv),E.push(v.sheenColorMapUv),E.push(v.sheenRoughnessMapUv),E.push(v.specularMapUv),E.push(v.specularColorMapUv),E.push(v.specularIntensityMapUv),E.push(v.transmissionMapUv),E.push(v.thicknessMapUv),E.push(v.combine),E.push(v.fogExp2),E.push(v.sizeAttenuation),E.push(v.morphTargetsCount),E.push(v.morphAttributeCount),E.push(v.numDirLights),E.push(v.numPointLights),E.push(v.numSpotLights),E.push(v.numSpotLightMaps),E.push(v.numHemiLights),E.push(v.numRectAreaLights),E.push(v.numDirLightShadows),E.push(v.numPointLightShadows),E.push(v.numSpotLightShadows),E.push(v.numSpotLightShadowsWithMaps),E.push(v.numLightProbes),E.push(v.shadowMapType),E.push(v.toneMapping),E.push(v.numClippingPlanes),E.push(v.numClipIntersection),E.push(v.depthPacking)}function S(E,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reverseDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),E.push(o.mask)}function y(E){let v=g[E.type],A;if(v){let D=Kn[v];A=bn.clone(D.uniforms)}else A=E.uniforms;return A}function C(E,v){let A;for(let D=0,L=h.length;D<L;D++){let V=h[D];if(V.cacheKey===v){A=V,++A.usedTimes;break}}return A===void 0&&(A=new lx(i,v,E,r),h.push(A)),A}function w(E){if(--E.usedTimes===0){let v=h.indexOf(E);h[v]=h[h.length-1],h.pop(),E.destroy()}}function R(E){l.remove(E)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:C,releaseProgram:w,releaseShaderCache:R,programs:h,dispose:I}}function ux(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function dx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function wu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Au(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,d,p,g,x,m){let f=i[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=x,f.group=m),t++,f}function o(u,d,p,g,x,m){let f=a(u,d,p,g,x,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):e.push(f)}function l(u,d,p,g,x,m){let f=a(u,d,p,g,x,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||dx),n.length>1&&n.sort(d||wu),s.length>1&&s.sort(d||wu)}function h(){for(let u=t,d=i.length;u<d;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function fx(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Au,i.set(n,[a])):s>=r.length?(a=new Au,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function px(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Mt};break;case"SpotLight":e={position:new P,direction:new P,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":e={color:new Mt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function mx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var gx=0;function xx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function vx(i){let t=new px,e=mx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let s=new P,r=new le,a=new le;function o(c){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,M=0,S=0,y=0,C=0,w=0,R=0;c.sort(xx);for(let E=0,v=c.length;E<v;E++){let A=c[E],D=A.color,L=A.intensity,V=A.distance,$=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=D.r*L,u+=D.g*L,d+=D.b*L;else if(A.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(A.sh.coefficients[k],L);R++}else if(A.isDirectionalLight){let k=t.get(A);if(k.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let j=A.shadow,q=e.get(A);q.shadowIntensity=j.intensity,q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize=j.mapSize,n.directionalShadow[p]=q,n.directionalShadowMap[p]=$,n.directionalShadowMatrix[p]=A.shadow.matrix,M++}n.directional[p]=k,p++}else if(A.isSpotLight){let k=t.get(A);k.position.setFromMatrixPosition(A.matrixWorld),k.color.copy(D).multiplyScalar(L),k.distance=V,k.coneCos=Math.cos(A.angle),k.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),k.decay=A.decay,n.spot[x]=k;let j=A.shadow;if(A.map&&(n.spotLightMap[C]=A.map,C++,j.updateMatrices(A),A.castShadow&&w++),n.spotLightMatrix[x]=j.matrix,A.castShadow){let q=e.get(A);q.shadowIntensity=j.intensity,q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize=j.mapSize,n.spotShadow[x]=q,n.spotShadowMap[x]=$,y++}x++}else if(A.isRectAreaLight){let k=t.get(A);k.color.copy(D).multiplyScalar(L),k.halfWidth.set(A.width*.5,0,0),k.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=k,m++}else if(A.isPointLight){let k=t.get(A);if(k.color.copy(A.color).multiplyScalar(A.intensity),k.distance=A.distance,k.decay=A.decay,A.castShadow){let j=A.shadow,q=e.get(A);q.shadowIntensity=j.intensity,q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize=j.mapSize,q.shadowCameraNear=j.camera.near,q.shadowCameraFar=j.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=A.shadow.matrix,S++}n.point[g]=k,g++}else if(A.isHemisphereLight){let k=t.get(A);k.skyColor.copy(A.color).multiplyScalar(L),k.groundColor.copy(A.groundColor).multiplyScalar(L),n.hemi[f]=k,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let I=n.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==x||I.rectAreaLength!==m||I.hemiLength!==f||I.numDirectionalShadows!==M||I.numPointShadows!==S||I.numSpotShadows!==y||I.numSpotMaps!==C||I.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=y+C-w,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,I.directionalLength=p,I.pointLength=g,I.spotLength=x,I.rectAreaLength=m,I.hemiLength=f,I.numDirectionalShadows=M,I.numPointShadows=S,I.numSpotShadows=y,I.numSpotMaps=C,I.numLightProbes=R,n.version=gx++)}function l(c,h){let u=0,d=0,p=0,g=0,x=0,m=h.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){let S=c[f];if(S.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(S.isSpotLight){let y=n.spot[p];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(S.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){let y=n.hemi[x];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:n}}function Ru(i){let t=new vx(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function _x(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Ru(i),t.set(s,[o])):r>=a.length?(o=new Ru(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var bc=class extends ei{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Af,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ec=class extends ei{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},yx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Sx(i,t,e){let n=new zr,s=new Et,r=new Et,a=new ge,o=new bc({depthPacking:Rf}),l=new Ec,c={},h=e.maxTextureSize,u={[ki]:Ye,[Ye]:ki,[Mn]:Mn},d=new de({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:yx,fragmentShader:Mx}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new $e;g.setAttribute("position",new Qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new pt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zu;let f=this.type;this.render=function(w,R,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let E=i.getRenderTarget(),v=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),D=i.state;D.setBlending(He),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let L=f!==gi&&this.type===gi,V=f===gi&&this.type!==gi;for(let $=0,k=w.length;$<k;$++){let j=w[$],q=j.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let it=q.getFrameExtents();if(s.multiply(it),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/it.x),s.x=r.x*it.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/it.y),s.y=r.y*it.y,q.mapSize.y=r.y)),q.map===null||L===!0||V===!0){let mt=this.type!==gi?{minFilter:nn,magFilter:nn}:{};q.map!==null&&q.map.dispose(),q.map=new Be(s.x,s.y,mt),q.map.texture.name=j.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();let ot=q.getViewportCount();for(let mt=0;mt<ot;mt++){let Ut=q.getViewport(mt);a.set(r.x*Ut.x,r.y*Ut.y,r.x*Ut.z,r.y*Ut.w),D.viewport(a),q.updateMatrices(j,mt),n=q.getFrustum(),y(R,I,q.camera,j,this.type)}q.isPointLightShadow!==!0&&this.type===gi&&M(q,I),q.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(E,v,A)};function M(w,R){let I=t.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Be(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,I,d,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,I,p,x,null)}function S(w,R,I,E){let v=null,A=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(A!==void 0)v=A;else if(v=I.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let D=v.uuid,L=R.uuid,V=c[D];V===void 0&&(V={},c[D]=V);let $=V[L];$===void 0&&($=v.clone(),V[L]=$,R.addEventListener("dispose",C)),v=$}if(v.visible=R.visible,v.wireframe=R.wireframe,E===gi?v.side=R.shadowSide!==null?R.shadowSide:R.side:v.side=R.shadowSide!==null?R.shadowSide:u[R.side],v.alphaMap=R.alphaMap,v.alphaTest=R.alphaTest,v.map=R.map,v.clipShadows=R.clipShadows,v.clippingPlanes=R.clippingPlanes,v.clipIntersection=R.clipIntersection,v.displacementMap=R.displacementMap,v.displacementScale=R.displacementScale,v.displacementBias=R.displacementBias,v.wireframeLinewidth=R.wireframeLinewidth,v.linewidth=R.linewidth,I.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let D=i.properties.get(v);D.light=I}return v}function y(w,R,I,E,v){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&v===gi)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);let L=t.update(w),V=w.material;if(Array.isArray(V)){let $=L.groups;for(let k=0,j=$.length;k<j;k++){let q=$[k],it=V[q.materialIndex];if(it&&it.visible){let ot=S(w,it,E,v);w.onBeforeShadow(i,w,R,I,L,ot,q),i.renderBufferDirect(I,null,L,ot,w,q),w.onAfterShadow(i,w,R,I,L,ot,q)}}}else if(V.visible){let $=S(w,V,E,v);w.onBeforeShadow(i,w,R,I,L,$,null),i.renderBufferDirect(I,null,L,$,w,null),w.onAfterShadow(i,w,R,I,L,$,null)}}let D=w.children;for(let L=0,V=D.length;L<V;L++)y(D[L],R,I,E,v)}function C(w){w.target.removeEventListener("dispose",C);for(let I in c){let E=c[I],v=w.target.uuid;v in E&&(E[v].dispose(),delete E[v])}}}var bx={[Rl]:Cl,[Pl]:Ll,[Il]:Ul,[Ys]:Dl,[Cl]:Rl,[Ll]:Pl,[Ul]:Il,[Dl]:Ys};function Ex(i,t){function e(){let U=!1,ct=new ge,Y=null,et=new ge(0,0,0,0);return{setMask:function(vt){Y!==vt&&!U&&(i.colorMask(vt,vt,vt,vt),Y=vt)},setLocked:function(vt){U=vt},setClear:function(vt,gt,Gt,Pe,je){je===!0&&(vt*=Pe,gt*=Pe,Gt*=Pe),ct.set(vt,gt,Gt,Pe),et.equals(ct)===!1&&(i.clearColor(vt,gt,Gt,Pe),et.copy(ct))},reset:function(){U=!1,Y=null,et.set(-1,0,0,0)}}}function n(){let U=!1,ct=!1,Y=null,et=null,vt=null;return{setReversed:function(gt){if(ct!==gt){let Gt=t.get("EXT_clip_control");ct?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);let Pe=vt;vt=null,this.setClear(Pe)}ct=gt},getReversed:function(){return ct},setTest:function(gt){gt?at(i.DEPTH_TEST):St(i.DEPTH_TEST)},setMask:function(gt){Y!==gt&&!U&&(i.depthMask(gt),Y=gt)},setFunc:function(gt){if(ct&&(gt=bx[gt]),et!==gt){switch(gt){case Rl:i.depthFunc(i.NEVER);break;case Cl:i.depthFunc(i.ALWAYS);break;case Pl:i.depthFunc(i.LESS);break;case Ys:i.depthFunc(i.LEQUAL);break;case Il:i.depthFunc(i.EQUAL);break;case Dl:i.depthFunc(i.GEQUAL);break;case Ll:i.depthFunc(i.GREATER);break;case Ul:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}et=gt}},setLocked:function(gt){U=gt},setClear:function(gt){vt!==gt&&(ct&&(gt=1-gt),i.clearDepth(gt),vt=gt)},reset:function(){U=!1,Y=null,et=null,vt=null,ct=!1}}}function s(){let U=!1,ct=null,Y=null,et=null,vt=null,gt=null,Gt=null,Pe=null,je=null;return{setTest:function(ue){U||(ue?at(i.STENCIL_TEST):St(i.STENCIL_TEST))},setMask:function(ue){ct!==ue&&!U&&(i.stencilMask(ue),ct=ue)},setFunc:function(ue,Hn,ci){(Y!==ue||et!==Hn||vt!==ci)&&(i.stencilFunc(ue,Hn,ci),Y=ue,et=Hn,vt=ci)},setOp:function(ue,Hn,ci){(gt!==ue||Gt!==Hn||Pe!==ci)&&(i.stencilOp(ue,Hn,ci),gt=ue,Gt=Hn,Pe=ci)},setLocked:function(ue){U=ue},setClear:function(ue){je!==ue&&(i.clearStencil(ue),je=ue)},reset:function(){U=!1,ct=null,Y=null,et=null,vt=null,gt=null,Gt=null,Pe=null,je=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,M=null,S=null,y=null,C=null,w=null,R=new Mt(0,0,0),I=0,E=!1,v=null,A=null,D=null,L=null,V=null,$=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,j=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(q)[1]),k=j>=1):q.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),k=j>=2);let it=null,ot={},mt=i.getParameter(i.SCISSOR_BOX),Ut=i.getParameter(i.VIEWPORT),Jt=new ge().fromArray(mt),J=new ge().fromArray(Ut);function st(U,ct,Y,et){let vt=new Uint8Array(4),gt=i.createTexture();i.bindTexture(U,gt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<Y;Gt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ct,0,i.RGBA,1,1,et,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ct+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return gt}let yt={};yt[i.TEXTURE_2D]=st(i.TEXTURE_2D,i.TEXTURE_2D,1),yt[i.TEXTURE_CUBE_MAP]=st(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),yt[i.TEXTURE_2D_ARRAY]=st(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),yt[i.TEXTURE_3D]=st(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),at(i.DEPTH_TEST),a.setFunc(Ys),Ht(!1),kt(Dh),at(i.CULL_FACE),F(He);function at(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function St(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function It(U,ct){return u[U]!==ct?(i.bindFramebuffer(U,ct),u[U]=ct,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ct),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ct),!0):!1}function Ot(U,ct){let Y=p,et=!1;if(U){Y=d.get(ct),Y===void 0&&(Y=[],d.set(ct,Y));let vt=U.textures;if(Y.length!==vt.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let gt=0,Gt=vt.length;gt<Gt;gt++)Y[gt]=i.COLOR_ATTACHMENT0+gt;Y.length=vt.length,et=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,et=!0);et&&i.drawBuffers(Y)}function he(U){return g!==U?(i.useProgram(U),g=U,!0):!1}let Yt={[On]:i.FUNC_ADD,[cf]:i.FUNC_SUBTRACT,[hf]:i.FUNC_REVERSE_SUBTRACT};Yt[uf]=i.MIN,Yt[df]=i.MAX;let pe={[sr]:i.ZERO,[ff]:i.ONE,[pf]:i.SRC_COLOR,[wl]:i.SRC_ALPHA,[vf]:i.SRC_ALPHA_SATURATE,[ho]:i.DST_COLOR,[co]:i.DST_ALPHA,[mf]:i.ONE_MINUS_SRC_COLOR,[Al]:i.ONE_MINUS_SRC_ALPHA,[xf]:i.ONE_MINUS_DST_COLOR,[gf]:i.ONE_MINUS_DST_ALPHA,[_f]:i.CONSTANT_COLOR,[yf]:i.ONE_MINUS_CONSTANT_COLOR,[Mf]:i.CONSTANT_ALPHA,[Sf]:i.ONE_MINUS_CONSTANT_ALPHA};function F(U,ct,Y,et,vt,gt,Gt,Pe,je,ue){if(U===He){x===!0&&(St(i.BLEND),x=!1);return}if(x===!1&&(at(i.BLEND),x=!0),U!==Wc){if(U!==m||ue!==E){if((f!==On||y!==On)&&(i.blendEquation(i.FUNC_ADD),f=On,y=On),ue)switch(U){case Oi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ze:i.blendFunc(i.ONE,i.ONE);break;case Lh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Oi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ze:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Lh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,S=null,C=null,w=null,R.set(0,0,0),I=0,m=U,E=ue}return}vt=vt||ct,gt=gt||Y,Gt=Gt||et,(ct!==f||vt!==y)&&(i.blendEquationSeparate(Yt[ct],Yt[vt]),f=ct,y=vt),(Y!==M||et!==S||gt!==C||Gt!==w)&&(i.blendFuncSeparate(pe[Y],pe[et],pe[gt],pe[Gt]),M=Y,S=et,C=gt,w=Gt),(Pe.equals(R)===!1||je!==I)&&(i.blendColor(Pe.r,Pe.g,Pe.b,je),R.copy(Pe),I=je),m=U,E=!1}function Xe(U,ct){U.side===Mn?St(i.CULL_FACE):at(i.CULL_FACE);let Y=U.side===Ye;ct&&(Y=!Y),Ht(Y),U.blending===Oi&&U.transparent===!1?F(He):F(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let et=U.stencilWrite;o.setTest(et),et&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),jt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?at(i.SAMPLE_ALPHA_TO_COVERAGE):St(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(U){v!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),v=U)}function kt(U){U!==of?(at(i.CULL_FACE),U!==A&&(U===Dh?i.cullFace(i.BACK):U===lf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):St(i.CULL_FACE),A=U}function Pt(U){U!==D&&(k&&i.lineWidth(U),D=U)}function jt(U,ct,Y){U?(at(i.POLYGON_OFFSET_FILL),(L!==ct||V!==Y)&&(i.polygonOffset(ct,Y),L=ct,V=Y)):St(i.POLYGON_OFFSET_FILL)}function Tt(U){U?at(i.SCISSOR_TEST):St(i.SCISSOR_TEST)}function T(U){U===void 0&&(U=i.TEXTURE0+$-1),it!==U&&(i.activeTexture(U),it=U)}function _(U,ct,Y){Y===void 0&&(it===null?Y=i.TEXTURE0+$-1:Y=it);let et=ot[Y];et===void 0&&(et={type:void 0,texture:void 0},ot[Y]=et),(et.type!==U||et.texture!==ct)&&(it!==Y&&(i.activeTexture(Y),it=Y),i.bindTexture(U,ct||yt[U]),et.type=U,et.texture=ct)}function G(){let U=ot[it];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function B(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function N(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function nt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function lt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Lt(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Nt(U){Jt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Jt.copy(U))}function _t(U){J.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),J.copy(U))}function Vt(U,ct){let Y=c.get(ct);Y===void 0&&(Y=new WeakMap,c.set(ct,Y));let et=Y.get(U);et===void 0&&(et=i.getUniformBlockIndex(ct,U.name),Y.set(U,et))}function zt(U,ct){let et=c.get(ct).get(U);l.get(ct)!==et&&(i.uniformBlockBinding(ct,et,U.__bindingPointIndex),l.set(ct,et))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},it=null,ot={},u={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,M=null,S=null,y=null,C=null,w=null,R=new Mt(0,0,0),I=0,E=!1,v=null,A=null,D=null,L=null,V=null,Jt.set(0,0,i.canvas.width,i.canvas.height),J.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:at,disable:St,bindFramebuffer:It,drawBuffers:Ot,useProgram:he,setBlending:F,setMaterial:Xe,setFlipSided:Ht,setCullFace:kt,setLineWidth:Pt,setPolygonOffset:jt,setScissorTest:Tt,activeTexture:T,bindTexture:_,unbindTexture:G,compressedTexImage2D:Q,compressedTexImage3D:B,texImage2D:lt,texImage3D:Lt,updateUBOMapping:Vt,uniformBlockBinding:zt,texStorage2D:bt,texStorage3D:K,texSubImage2D:N,texSubImage3D:Z,compressedTexSubImage2D:tt,compressedTexSubImage3D:nt,scissor:Nt,viewport:_t,reset:ee}}function Cu(i,t,e,n){let s=Tx(n);switch(e){case Wu:return i*t;case qu:return i*t;case Yu:return i*t*2;case Zu:return i*t/s.components*s.byteLength;case jc:return i*t/s.components*s.byteLength;case $u:return i*t*2/s.components*s.byteLength;case th:return i*t*2/s.components*s.byteLength;case Xu:return i*t*3/s.components*s.byteLength;case In:return i*t*4/s.components*s.byteLength;case eh:return i*t*4/s.components*s.byteLength;case za:case Ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ka:case Ha:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case zl:case kl:return Math.max(i,16)*Math.max(t,8)/4;case Ol:case Bl:return Math.max(i,8)*Math.max(t,8)/2;case Hl:case Vl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Gl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Wl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Xl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ql:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Yl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Zl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case $l:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Jl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Kl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ql:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case jl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case tc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ec:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case nc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ic:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Va:case sc:case rc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ju:case ac:return Math.ceil(i/4)*Math.ceil(t/4)*8;case oc:case lc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Tx(i){switch(i){case qn:case Hu:return{byteLength:1,components:1};case Or:case Vu:case rn:return{byteLength:2,components:1};case Kc:case Qc:return{byteLength:2,components:4};case fs:case Jc:case vi:return{byteLength:4,components:1};case Gu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function wx(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Et,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,_){return p?new OffscreenCanvas(T,_):Xa("canvas")}function x(T,_,G){let Q=1,B=Tt(T);if((B.width>G||B.height>G)&&(Q=G/Math.max(B.width,B.height)),Q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let N=Math.floor(Q*B.width),Z=Math.floor(Q*B.height);u===void 0&&(u=g(N,Z));let tt=_?g(N,Z):u;return tt.width=N,tt.height=Z,tt.getContext("2d").drawImage(T,0,0,N,Z),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+B.width+"x"+B.height+") to ("+N+"x"+Z+")."),tt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+B.width+"x"+B.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){i.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(T,_,G,Q,B=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let N=_;if(_===i.RED&&(G===i.FLOAT&&(N=i.R32F),G===i.HALF_FLOAT&&(N=i.R16F),G===i.UNSIGNED_BYTE&&(N=i.R8)),_===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(N=i.R8UI),G===i.UNSIGNED_SHORT&&(N=i.R16UI),G===i.UNSIGNED_INT&&(N=i.R32UI),G===i.BYTE&&(N=i.R8I),G===i.SHORT&&(N=i.R16I),G===i.INT&&(N=i.R32I)),_===i.RG&&(G===i.FLOAT&&(N=i.RG32F),G===i.HALF_FLOAT&&(N=i.RG16F),G===i.UNSIGNED_BYTE&&(N=i.RG8)),_===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(N=i.RG8UI),G===i.UNSIGNED_SHORT&&(N=i.RG16UI),G===i.UNSIGNED_INT&&(N=i.RG32UI),G===i.BYTE&&(N=i.RG8I),G===i.SHORT&&(N=i.RG16I),G===i.INT&&(N=i.RG32I)),_===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(N=i.RGB8UI),G===i.UNSIGNED_SHORT&&(N=i.RGB16UI),G===i.UNSIGNED_INT&&(N=i.RGB32UI),G===i.BYTE&&(N=i.RGB8I),G===i.SHORT&&(N=i.RGB16I),G===i.INT&&(N=i.RGB32I)),_===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(N=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(N=i.RGBA16UI),G===i.UNSIGNED_INT&&(N=i.RGBA32UI),G===i.BYTE&&(N=i.RGBA8I),G===i.SHORT&&(N=i.RGBA16I),G===i.INT&&(N=i.RGBA32I)),_===i.RGB&&G===i.UNSIGNED_INT_5_9_9_9_REV&&(N=i.RGB9_E5),_===i.RGBA){let Z=B?fo:Kt.getTransfer(Q);G===i.FLOAT&&(N=i.RGBA32F),G===i.HALF_FLOAT&&(N=i.RGBA16F),G===i.UNSIGNED_BYTE&&(N=Z===oe?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(N=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(N=i.RGB5_A1)}return(N===i.R16F||N===i.R32F||N===i.RG16F||N===i.RG32F||N===i.RGBA16F||N===i.RGBA32F)&&t.get("EXT_color_buffer_float"),N}function y(T,_){let G;return T?_===null||_===fs||_===Hi?G=i.DEPTH24_STENCIL8:_===vi?G=i.DEPTH32F_STENCIL8:_===Or&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===fs||_===Hi?G=i.DEPTH_COMPONENT24:_===vi?G=i.DEPTH_COMPONENT32F:_===Or&&(G=i.DEPTH_COMPONENT16),G}function C(T,_){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==nn&&T.minFilter!==jn?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function w(T){let _=T.target;_.removeEventListener("dispose",w),I(_),_.isVideoTexture&&h.delete(_)}function R(T){let _=T.target;_.removeEventListener("dispose",R),v(_)}function I(T){let _=n.get(T);if(_.__webglInit===void 0)return;let G=T.source,Q=d.get(G);if(Q){let B=Q[_.__cacheKey];B.usedTimes--,B.usedTimes===0&&E(T),Object.keys(Q).length===0&&d.delete(G)}n.remove(T)}function E(T){let _=n.get(T);i.deleteTexture(_.__webglTexture);let G=T.source,Q=d.get(G);delete Q[_.__cacheKey],a.memory.textures--}function v(T){let _=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(_.__webglFramebuffer[Q]))for(let B=0;B<_.__webglFramebuffer[Q].length;B++)i.deleteFramebuffer(_.__webglFramebuffer[Q][B]);else i.deleteFramebuffer(_.__webglFramebuffer[Q]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Q])}else{if(Array.isArray(_.__webglFramebuffer))for(let Q=0;Q<_.__webglFramebuffer.length;Q++)i.deleteFramebuffer(_.__webglFramebuffer[Q]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Q=0;Q<_.__webglColorRenderbuffer.length;Q++)_.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Q]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let G=T.textures;for(let Q=0,B=G.length;Q<B;Q++){let N=n.get(G[Q]);N.__webglTexture&&(i.deleteTexture(N.__webglTexture),a.memory.textures--),n.remove(G[Q])}n.remove(T)}let A=0;function D(){A=0}function L(){let T=A;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),A+=1,T}function V(T){let _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function $(T,_){let G=n.get(T);if(T.isVideoTexture&&Pt(T),T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){let Q=T.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(G,T,_);return}}e.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+_)}function k(T,_){let G=n.get(T);if(T.version>0&&G.__version!==T.version){J(G,T,_);return}e.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+_)}function j(T,_){let G=n.get(T);if(T.version>0&&G.__version!==T.version){J(G,T,_);return}e.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+_)}function q(T,_){let G=n.get(T);if(T.version>0&&G.__version!==T.version){st(G,T,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+_)}let it={[Dn]:i.REPEAT,[us]:i.CLAMP_TO_EDGE,[Fl]:i.MIRRORED_REPEAT},ot={[nn]:i.NEAREST,[wf]:i.NEAREST_MIPMAP_NEAREST,[ua]:i.NEAREST_MIPMAP_LINEAR,[jn]:i.LINEAR,[Yo]:i.LINEAR_MIPMAP_NEAREST,[ds]:i.LINEAR_MIPMAP_LINEAR},mt={[Pf]:i.NEVER,[Ff]:i.ALWAYS,[If]:i.LESS,[Ku]:i.LEQUAL,[Df]:i.EQUAL,[Nf]:i.GEQUAL,[Lf]:i.GREATER,[Uf]:i.NOTEQUAL};function Ut(T,_){if(_.type===vi&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===jn||_.magFilter===Yo||_.magFilter===ua||_.magFilter===ds||_.minFilter===jn||_.minFilter===Yo||_.minFilter===ua||_.minFilter===ds)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,it[_.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,it[_.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,it[_.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ot[_.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ot[_.minFilter]),_.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,mt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===nn||_.minFilter!==ua&&_.minFilter!==ds||_.type===vi&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let G=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Jt(T,_){let G=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",w));let Q=_.source,B=d.get(Q);B===void 0&&(B={},d.set(Q,B));let N=V(_);if(N!==T.__cacheKey){B[N]===void 0&&(B[N]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),B[N].usedTimes++;let Z=B[T.__cacheKey];Z!==void 0&&(B[T.__cacheKey].usedTimes--,Z.usedTimes===0&&E(_)),T.__cacheKey=N,T.__webglTexture=B[N].texture}return G}function J(T,_,G){let Q=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Q=i.TEXTURE_3D);let B=Jt(T,_),N=_.source;e.bindTexture(Q,T.__webglTexture,i.TEXTURE0+G);let Z=n.get(N);if(N.version!==Z.__version||B===!0){e.activeTexture(i.TEXTURE0+G);let tt=Kt.getPrimaries(Kt.workingColorSpace),nt=_.colorSpace===Ni?null:Kt.getPrimaries(_.colorSpace),bt=_.colorSpace===Ni||tt===nt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);let K=x(_.image,!1,s.maxTextureSize);K=jt(_,K);let lt=r.convert(_.format,_.colorSpace),Lt=r.convert(_.type),Nt=S(_.internalFormat,lt,Lt,_.colorSpace,_.isVideoTexture);Ut(Q,_);let _t,Vt=_.mipmaps,zt=_.isVideoTexture!==!0,ee=Z.__version===void 0||B===!0,U=N.dataReady,ct=C(_,K);if(_.isDepthTexture)Nt=y(_.format===Vi,_.type),ee&&(zt?e.texStorage2D(i.TEXTURE_2D,1,Nt,K.width,K.height):e.texImage2D(i.TEXTURE_2D,0,Nt,K.width,K.height,0,lt,Lt,null));else if(_.isDataTexture)if(Vt.length>0){zt&&ee&&e.texStorage2D(i.TEXTURE_2D,ct,Nt,Vt[0].width,Vt[0].height);for(let Y=0,et=Vt.length;Y<et;Y++)_t=Vt[Y],zt?U&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,_t.width,_t.height,lt,Lt,_t.data):e.texImage2D(i.TEXTURE_2D,Y,Nt,_t.width,_t.height,0,lt,Lt,_t.data);_.generateMipmaps=!1}else zt?(ee&&e.texStorage2D(i.TEXTURE_2D,ct,Nt,K.width,K.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,K.width,K.height,lt,Lt,K.data)):e.texImage2D(i.TEXTURE_2D,0,Nt,K.width,K.height,0,lt,Lt,K.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){zt&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,Nt,Vt[0].width,Vt[0].height,K.depth);for(let Y=0,et=Vt.length;Y<et;Y++)if(_t=Vt[Y],_.format!==In)if(lt!==null)if(zt){if(U)if(_.layerUpdates.size>0){let vt=Cu(_t.width,_t.height,_.format,_.type);for(let gt of _.layerUpdates){let Gt=_t.data.subarray(gt*vt/_t.data.BYTES_PER_ELEMENT,(gt+1)*vt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,gt,_t.width,_t.height,1,lt,Gt)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,_t.width,_t.height,K.depth,lt,_t.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Nt,_t.width,_t.height,K.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,_t.width,_t.height,K.depth,lt,Lt,_t.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Y,Nt,_t.width,_t.height,K.depth,0,lt,Lt,_t.data)}else{zt&&ee&&e.texStorage2D(i.TEXTURE_2D,ct,Nt,Vt[0].width,Vt[0].height);for(let Y=0,et=Vt.length;Y<et;Y++)_t=Vt[Y],_.format!==In?lt!==null?zt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,_t.width,_t.height,lt,_t.data):e.compressedTexImage2D(i.TEXTURE_2D,Y,Nt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?U&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,_t.width,_t.height,lt,Lt,_t.data):e.texImage2D(i.TEXTURE_2D,Y,Nt,_t.width,_t.height,0,lt,Lt,_t.data)}else if(_.isDataArrayTexture)if(zt){if(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,Nt,K.width,K.height,K.depth),U)if(_.layerUpdates.size>0){let Y=Cu(K.width,K.height,_.format,_.type);for(let et of _.layerUpdates){let vt=K.data.subarray(et*Y/K.data.BYTES_PER_ELEMENT,(et+1)*Y/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,et,K.width,K.height,1,lt,Lt,vt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,lt,Lt,K.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Nt,K.width,K.height,K.depth,0,lt,Lt,K.data);else if(_.isData3DTexture)zt?(ee&&e.texStorage3D(i.TEXTURE_3D,ct,Nt,K.width,K.height,K.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,lt,Lt,K.data)):e.texImage3D(i.TEXTURE_3D,0,Nt,K.width,K.height,K.depth,0,lt,Lt,K.data);else if(_.isFramebufferTexture){if(ee)if(zt)e.texStorage2D(i.TEXTURE_2D,ct,Nt,K.width,K.height);else{let Y=K.width,et=K.height;for(let vt=0;vt<ct;vt++)e.texImage2D(i.TEXTURE_2D,vt,Nt,Y,et,0,lt,Lt,null),Y>>=1,et>>=1}}else if(Vt.length>0){if(zt&&ee){let Y=Tt(Vt[0]);e.texStorage2D(i.TEXTURE_2D,ct,Nt,Y.width,Y.height)}for(let Y=0,et=Vt.length;Y<et;Y++)_t=Vt[Y],zt?U&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,lt,Lt,_t):e.texImage2D(i.TEXTURE_2D,Y,Nt,lt,Lt,_t);_.generateMipmaps=!1}else if(zt){if(ee){let Y=Tt(K);e.texStorage2D(i.TEXTURE_2D,ct,Nt,Y.width,Y.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,Lt,K)}else e.texImage2D(i.TEXTURE_2D,0,Nt,lt,Lt,K);m(_)&&f(Q),Z.__version=N.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function st(T,_,G){if(_.image.length!==6)return;let Q=Jt(T,_),B=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+G);let N=n.get(B);if(B.version!==N.__version||Q===!0){e.activeTexture(i.TEXTURE0+G);let Z=Kt.getPrimaries(Kt.workingColorSpace),tt=_.colorSpace===Ni?null:Kt.getPrimaries(_.colorSpace),nt=_.colorSpace===Ni||Z===tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let bt=_.isCompressedTexture||_.image[0].isCompressedTexture,K=_.image[0]&&_.image[0].isDataTexture,lt=[];for(let et=0;et<6;et++)!bt&&!K?lt[et]=x(_.image[et],!0,s.maxCubemapSize):lt[et]=K?_.image[et].image:_.image[et],lt[et]=jt(_,lt[et]);let Lt=lt[0],Nt=r.convert(_.format,_.colorSpace),_t=r.convert(_.type),Vt=S(_.internalFormat,Nt,_t,_.colorSpace),zt=_.isVideoTexture!==!0,ee=N.__version===void 0||Q===!0,U=B.dataReady,ct=C(_,Lt);Ut(i.TEXTURE_CUBE_MAP,_);let Y;if(bt){zt&&ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ct,Vt,Lt.width,Lt.height);for(let et=0;et<6;et++){Y=lt[et].mipmaps;for(let vt=0;vt<Y.length;vt++){let gt=Y[vt];_.format!==In?Nt!==null?zt?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt,0,0,gt.width,gt.height,Nt,gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt,Vt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt,0,0,gt.width,gt.height,Nt,_t,gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt,Vt,gt.width,gt.height,0,Nt,_t,gt.data)}}}else{if(Y=_.mipmaps,zt&&ee){Y.length>0&&ct++;let et=Tt(lt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ct,Vt,et.width,et.height)}for(let et=0;et<6;et++)if(K){zt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,lt[et].width,lt[et].height,Nt,_t,lt[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Vt,lt[et].width,lt[et].height,0,Nt,_t,lt[et].data);for(let vt=0;vt<Y.length;vt++){let Gt=Y[vt].image[et].image;zt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt+1,0,0,Gt.width,Gt.height,Nt,_t,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt+1,Vt,Gt.width,Gt.height,0,Nt,_t,Gt.data)}}else{zt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Nt,_t,lt[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Vt,Nt,_t,lt[et]);for(let vt=0;vt<Y.length;vt++){let gt=Y[vt];zt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt+1,0,0,Nt,_t,gt.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt+1,Vt,Nt,_t,gt.image[et])}}}m(_)&&f(i.TEXTURE_CUBE_MAP),N.__version=B.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function yt(T,_,G,Q,B,N){let Z=r.convert(G.format,G.colorSpace),tt=r.convert(G.type),nt=S(G.internalFormat,Z,tt,G.colorSpace),bt=n.get(_),K=n.get(G);if(K.__renderTarget=_,!bt.__hasExternalTextures){let lt=Math.max(1,_.width>>N),Lt=Math.max(1,_.height>>N);B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?e.texImage3D(B,N,nt,lt,Lt,_.depth,0,Z,tt,null):e.texImage2D(B,N,nt,lt,Lt,0,Z,tt,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),kt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,B,K.__webglTexture,0,Ht(_)):(B===i.TEXTURE_2D||B>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&B<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,B,K.__webglTexture,N),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(T,_,G){if(i.bindRenderbuffer(i.RENDERBUFFER,T),_.depthBuffer){let Q=_.depthTexture,B=Q&&Q.isDepthTexture?Q.type:null,N=y(_.stencilBuffer,B),Z=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,tt=Ht(_);kt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,tt,N,_.width,_.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,tt,N,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,N,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,T)}else{let Q=_.textures;for(let B=0;B<Q.length;B++){let N=Q[B],Z=r.convert(N.format,N.colorSpace),tt=r.convert(N.type),nt=S(N.internalFormat,Z,tt,N.colorSpace),bt=Ht(_);G&&kt(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,bt,nt,_.width,_.height):kt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,bt,nt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,nt,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function St(T,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=n.get(_.depthTexture);Q.__renderTarget=_,(!Q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),$(_.depthTexture,0);let B=Q.__webglTexture,N=Ht(_);if(_.depthTexture.format===Ws)kt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,B,0,N):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,B,0);else if(_.depthTexture.format===Vi)kt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,B,0,N):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,B,0);else throw new Error("Unknown depthTexture format")}function It(T){let _=n.get(T),G=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){let Q=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Q){let B=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Q.removeEventListener("dispose",B)};Q.addEventListener("dispose",B),_.__depthDisposeCallback=B}_.__boundDepthTexture=Q}if(T.depthTexture&&!_.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");St(_.__webglFramebuffer,T)}else if(G){_.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Q]),_.__webglDepthbuffer[Q]===void 0)_.__webglDepthbuffer[Q]=i.createRenderbuffer(),at(_.__webglDepthbuffer[Q],T,!1);else{let B=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,N=_.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,N),i.framebufferRenderbuffer(i.FRAMEBUFFER,B,i.RENDERBUFFER,N)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),at(_.__webglDepthbuffer,T,!1);else{let Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,B)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ot(T,_,G){let Q=n.get(T);_!==void 0&&yt(Q.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&It(T)}function he(T){let _=T.texture,G=n.get(T),Q=n.get(_);T.addEventListener("dispose",R);let B=T.textures,N=T.isWebGLCubeRenderTarget===!0,Z=B.length>1;if(Z||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=_.version,a.memory.textures++),N){G.__webglFramebuffer=[];for(let tt=0;tt<6;tt++)if(_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer[tt]=[];for(let nt=0;nt<_.mipmaps.length;nt++)G.__webglFramebuffer[tt][nt]=i.createFramebuffer()}else G.__webglFramebuffer[tt]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer=[];for(let tt=0;tt<_.mipmaps.length;tt++)G.__webglFramebuffer[tt]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(Z)for(let tt=0,nt=B.length;tt<nt;tt++){let bt=n.get(B[tt]);bt.__webglTexture===void 0&&(bt.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&kt(T)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let tt=0;tt<B.length;tt++){let nt=B[tt];G.__webglColorRenderbuffer[tt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[tt]);let bt=r.convert(nt.format,nt.colorSpace),K=r.convert(nt.type),lt=S(nt.internalFormat,bt,K,nt.colorSpace,T.isXRRenderTarget===!0),Lt=Ht(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Lt,lt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+tt,i.RENDERBUFFER,G.__webglColorRenderbuffer[tt])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),at(G.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(N){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Ut(i.TEXTURE_CUBE_MAP,_);for(let tt=0;tt<6;tt++)if(_.mipmaps&&_.mipmaps.length>0)for(let nt=0;nt<_.mipmaps.length;nt++)yt(G.__webglFramebuffer[tt][nt],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,nt);else yt(G.__webglFramebuffer[tt],T,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0);m(_)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Z){for(let tt=0,nt=B.length;tt<nt;tt++){let bt=B[tt],K=n.get(bt);e.bindTexture(i.TEXTURE_2D,K.__webglTexture),Ut(i.TEXTURE_2D,bt),yt(G.__webglFramebuffer,T,bt,i.COLOR_ATTACHMENT0+tt,i.TEXTURE_2D,0),m(bt)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let tt=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(tt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(tt,Q.__webglTexture),Ut(tt,_),_.mipmaps&&_.mipmaps.length>0)for(let nt=0;nt<_.mipmaps.length;nt++)yt(G.__webglFramebuffer[nt],T,_,i.COLOR_ATTACHMENT0,tt,nt);else yt(G.__webglFramebuffer,T,_,i.COLOR_ATTACHMENT0,tt,0);m(_)&&f(tt),e.unbindTexture()}T.depthBuffer&&It(T)}function Yt(T){let _=T.textures;for(let G=0,Q=_.length;G<Q;G++){let B=_[G];if(m(B)){let N=M(T),Z=n.get(B).__webglTexture;e.bindTexture(N,Z),f(N),e.unbindTexture()}}}let pe=[],F=[];function Xe(T){if(T.samples>0){if(kt(T)===!1){let _=T.textures,G=T.width,Q=T.height,B=i.COLOR_BUFFER_BIT,N=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=n.get(T),tt=_.length>1;if(tt)for(let nt=0;nt<_.length;nt++)e.bindFramebuffer(i.FRAMEBUFFER,Z.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+nt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Z.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+nt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Z.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Z.__webglFramebuffer);for(let nt=0;nt<_.length;nt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(B|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(B|=i.STENCIL_BUFFER_BIT)),tt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Z.__webglColorRenderbuffer[nt]);let bt=n.get(_[nt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,bt,0)}i.blitFramebuffer(0,0,G,Q,0,0,G,Q,B,i.NEAREST),l===!0&&(pe.length=0,F.length=0,pe.push(i.COLOR_ATTACHMENT0+nt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(pe.push(N),F.push(N),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pe))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),tt)for(let nt=0;nt<_.length;nt++){e.bindFramebuffer(i.FRAMEBUFFER,Z.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+nt,i.RENDERBUFFER,Z.__webglColorRenderbuffer[nt]);let bt=n.get(_[nt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Z.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+nt,i.TEXTURE_2D,bt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Z.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let _=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Ht(T){return Math.min(s.maxSamples,T.samples)}function kt(T){let _=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Pt(T){let _=a.render.frame;h.get(T)!==_&&(h.set(T,_),T.update())}function jt(T,_){let G=T.colorSpace,Q=T.format,B=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||G!==rr&&G!==Ni&&(Kt.getTransfer(G)===oe?(Q!==In||B!==qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),_}function Tt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=D,this.setTexture2D=$,this.setTexture2DArray=k,this.setTexture3D=j,this.setTextureCube=q,this.rebindTextures=Ot,this.setupRenderTarget=he,this.updateRenderTargetMipmap=Yt,this.updateMultisampleRenderTarget=Xe,this.setupDepthRenderbuffer=It,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=kt}function Ax(i,t){function e(n,s=Ni){let r,a=Kt.getTransfer(s);if(n===qn)return i.UNSIGNED_BYTE;if(n===Kc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Qc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Gu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Hu)return i.BYTE;if(n===Vu)return i.SHORT;if(n===Or)return i.UNSIGNED_SHORT;if(n===Jc)return i.INT;if(n===fs)return i.UNSIGNED_INT;if(n===vi)return i.FLOAT;if(n===rn)return i.HALF_FLOAT;if(n===Wu)return i.ALPHA;if(n===Xu)return i.RGB;if(n===In)return i.RGBA;if(n===qu)return i.LUMINANCE;if(n===Yu)return i.LUMINANCE_ALPHA;if(n===Ws)return i.DEPTH_COMPONENT;if(n===Vi)return i.DEPTH_STENCIL;if(n===Zu)return i.RED;if(n===jc)return i.RED_INTEGER;if(n===$u)return i.RG;if(n===th)return i.RG_INTEGER;if(n===eh)return i.RGBA_INTEGER;if(n===za||n===Ba||n===ka||n===Ha)if(a===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===za)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ka)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===za)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ba)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ka)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ha)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ol||n===zl||n===Bl||n===kl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ol)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===zl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Bl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===kl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Hl||n===Vl||n===Gl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Hl||n===Vl)return a===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Gl)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Wl||n===Xl||n===ql||n===Yl||n===Zl||n===$l||n===Jl||n===Kl||n===Ql||n===jl||n===tc||n===ec||n===nc||n===ic)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Wl)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Xl)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ql)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Yl)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Zl)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$l)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Jl)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Kl)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ql)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===jl)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===tc)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ec)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===nc)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ic)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Va||n===sc||n===rc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Va)return a===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===sc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===rc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ju||n===ac||n===oc||n===lc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Va)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ac)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===oc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===lc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Tc=class extends ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},se=class extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}},Rx={type:"move"},Nr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new se,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new se,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new se,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Rx)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new se;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Cx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Px=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,wc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new Sn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new de({vertexShader:Cx,fragmentShader:Px,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new pt(new Mi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ac=class extends Gi{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null,x=new wc,m=e.getContextAttributes(),f=null,M=null,S=[],y=[],C=new Et,w=null,R=new ze;R.viewport=new ge;let I=new ze;I.viewport=new ge;let E=[R,I],v=new Tc,A=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let st=S[J];return st===void 0&&(st=new Nr,S[J]=st),st.getTargetRaySpace()},this.getControllerGrip=function(J){let st=S[J];return st===void 0&&(st=new Nr,S[J]=st),st.getGripSpace()},this.getHand=function(J){let st=S[J];return st===void 0&&(st=new Nr,S[J]=st),st.getHandSpace()};function L(J){let st=y.indexOf(J.inputSource);if(st===-1)return;let yt=S[st];yt!==void 0&&(yt.update(J.inputSource,J.frame,c||a),yt.dispatchEvent({type:J.type,data:J.inputSource}))}function V(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",$);for(let J=0;J<S.length;J++){let st=y[J];st!==null&&(y[J]=null,S[J].disconnect(st))}A=null,D=null,x.reset(),t.setRenderTarget(f),p=null,d=null,u=null,s=null,M=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",V),s.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(C),s.renderState.layers===void 0){let st={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Be(p.framebufferWidth,p.framebufferHeight,{format:In,type:qn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let st=null,yt=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=m.stencil?Vi:Ws,yt=m.stencil?Hi:fs);let St={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(St),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new Be(d.textureWidth,d.textureHeight,{format:In,type:qn,depthTexture:new tr(d.textureWidth,d.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Jt.setContext(s),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function $(J){for(let st=0;st<J.removed.length;st++){let yt=J.removed[st],at=y.indexOf(yt);at>=0&&(y[at]=null,S[at].disconnect(yt))}for(let st=0;st<J.added.length;st++){let yt=J.added[st],at=y.indexOf(yt);if(at===-1){for(let It=0;It<S.length;It++)if(It>=y.length){y.push(yt),at=It;break}else if(y[It]===null){y[It]=yt,at=It;break}if(at===-1)break}let St=S[at];St&&St.connect(yt)}}let k=new P,j=new P;function q(J,st,yt){k.setFromMatrixPosition(st.matrixWorld),j.setFromMatrixPosition(yt.matrixWorld);let at=k.distanceTo(j),St=st.projectionMatrix.elements,It=yt.projectionMatrix.elements,Ot=St[14]/(St[10]-1),he=St[14]/(St[10]+1),Yt=(St[9]+1)/St[5],pe=(St[9]-1)/St[5],F=(St[8]-1)/St[0],Xe=(It[8]+1)/It[0],Ht=Ot*F,kt=Ot*Xe,Pt=at/(-F+Xe),jt=Pt*-F;if(st.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(jt),J.translateZ(Pt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),St[10]===-1)J.projectionMatrix.copy(st.projectionMatrix),J.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{let Tt=Ot+Pt,T=he+Pt,_=Ht-jt,G=kt+(at-jt),Q=Yt*he/T*Tt,B=pe*he/T*Tt;J.projectionMatrix.makePerspective(_,G,Q,B,Tt,T),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function it(J,st){st===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(st.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let st=J.near,yt=J.far;x.texture!==null&&(x.depthNear>0&&(st=x.depthNear),x.depthFar>0&&(yt=x.depthFar)),v.near=I.near=R.near=st,v.far=I.far=R.far=yt,(A!==v.near||D!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),A=v.near,D=v.far),R.layers.mask=J.layers.mask|2,I.layers.mask=J.layers.mask|4,v.layers.mask=R.layers.mask|I.layers.mask;let at=J.parent,St=v.cameras;it(v,at);for(let It=0;It<St.length;It++)it(St[It],at);St.length===2?q(v,R,I):v.projectionMatrix.copy(R.projectionMatrix),ot(J,v,at)};function ot(J,st,yt){yt===null?J.matrix.copy(st.matrixWorld):(J.matrix.copy(yt.matrixWorld),J.matrix.invert(),J.matrix.multiply(st.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(st.projectionMatrix),J.projectionMatrixInverse.copy(st.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=uc*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(v)};let mt=null;function Ut(J,st){if(h=st.getViewerPose(c||a),g=st,h!==null){let yt=h.views;p!==null&&(t.setRenderTargetFramebuffer(M,p.framebuffer),t.setRenderTarget(M));let at=!1;yt.length!==v.cameras.length&&(v.cameras.length=0,at=!0);for(let It=0;It<yt.length;It++){let Ot=yt[It],he=null;if(p!==null)he=p.getViewport(Ot);else{let pe=u.getViewSubImage(d,Ot);he=pe.viewport,It===0&&(t.setRenderTargetTextures(M,pe.colorTexture,d.ignoreDepthValues?void 0:pe.depthStencilTexture),t.setRenderTarget(M))}let Yt=E[It];Yt===void 0&&(Yt=new ze,Yt.layers.enable(It),Yt.viewport=new ge,E[It]=Yt),Yt.matrix.fromArray(Ot.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(Ot.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(he.x,he.y,he.width,he.height),It===0&&(v.matrix.copy(Yt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),at===!0&&v.cameras.push(Yt)}let St=s.enabledFeatures;if(St&&St.includes("depth-sensing")){let It=u.getDepthInformation(yt[0]);It&&It.isValid&&It.texture&&x.init(t,It,s.renderState)}}for(let yt=0;yt<S.length;yt++){let at=y[yt],St=S[yt];at!==null&&St!==void 0&&St.update(at,st,c||a)}mt&&mt(J,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),g=null}let Jt=new ed;Jt.setAnimationLoop(Ut),this.setAnimationLoop=function(J){mt=J},this.dispose=function(){}}},ls=new ti,Ix=new le;function Dx(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,td(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,S,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,M,S):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ye&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ye&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let M=t.get(f),S=M.envMap,y=M.envMapRotation;S&&(m.envMap.value=S,ls.copy(y),ls.x*=-1,ls.y*=-1,ls.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ls.y*=-1,ls.z*=-1),m.envMapRotation.value.setFromMatrix4(Ix.makeRotationFromEuler(ls)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=S*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ye&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let M=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Lx(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,S){let y=S.program;n.uniformBlockBinding(M,y)}function c(M,S){let y=s[M.id];y===void 0&&(g(M),y=h(M),s[M.id]=y,M.addEventListener("dispose",m));let C=S.program;n.updateUBOMapping(M,C);let w=t.render.frame;r[M.id]!==w&&(d(M),r[M.id]=w)}function h(M){let S=u();M.__bindingPointIndex=S;let y=i.createBuffer(),C=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,y),y}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let S=s[M.id],y=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let w=0,R=y.length;w<R;w++){let I=Array.isArray(y[w])?y[w]:[y[w]];for(let E=0,v=I.length;E<v;E++){let A=I[E];if(p(A,w,E,C)===!0){let D=A.__offset,L=Array.isArray(A.value)?A.value:[A.value],V=0;for(let $=0;$<L.length;$++){let k=L[$],j=x(k);typeof k=="number"||typeof k=="boolean"?(A.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,D+V,A.__data)):k.isMatrix3?(A.__data[0]=k.elements[0],A.__data[1]=k.elements[1],A.__data[2]=k.elements[2],A.__data[3]=0,A.__data[4]=k.elements[3],A.__data[5]=k.elements[4],A.__data[6]=k.elements[5],A.__data[7]=0,A.__data[8]=k.elements[6],A.__data[9]=k.elements[7],A.__data[10]=k.elements[8],A.__data[11]=0):(k.toArray(A.__data,V),V+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,S,y,C){let w=M.value,R=S+"_"+y;if(C[R]===void 0)return typeof w=="number"||typeof w=="boolean"?C[R]=w:C[R]=w.clone(),!0;{let I=C[R];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return C[R]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function g(M){let S=M.uniforms,y=0,C=16;for(let R=0,I=S.length;R<I;R++){let E=Array.isArray(S[R])?S[R]:[S[R]];for(let v=0,A=E.length;v<A;v++){let D=E[v],L=Array.isArray(D.value)?D.value:[D.value];for(let V=0,$=L.length;V<$;V++){let k=L[V],j=x(k),q=y%C,it=q%j.boundary,ot=q+it;y+=it,ot!==0&&C-ot<j.storage&&(y+=C-ot),D.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=y,y+=j.storage}}}let w=y%C;return w>0&&(y+=C-w),M.__size=y,M.__cache={},this}function x(M){let S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=48,S.storage=48):M.isMatrix4?(S.boundary=64,S.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),S}function m(M){let S=M.target;S.removeEventListener("dispose",m);let y=a.indexOf(S.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function f(){for(let M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}var to=class{constructor(t={}){let{canvas:e=zf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let g=new Uint32Array(4),x=new Int32Array(4),m=null,f=null,M=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ke,this.toneMapping=zi,this.toneMappingExposure=1;let y=this,C=!1,w=0,R=0,I=null,E=-1,v=null,A=new ge,D=new ge,L=null,V=new Mt(0),$=0,k=e.width,j=e.height,q=1,it=null,ot=null,mt=new ge(0,0,k,j),Ut=new ge(0,0,k,j),Jt=!1,J=new zr,st=!1,yt=!1,at=new le,St=new le,It=new P,Ot=new ge,he={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Yt=!1;function pe(){return I===null?q:1}let F=n;function Xe(b,O){return e.getContext(b,O)}try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Gc}`),e.addEventListener("webglcontextlost",et,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),F===null){let O="webgl2";if(F=Xe(O,b),F===null)throw Xe(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ht,kt,Pt,jt,Tt,T,_,G,Q,B,N,Z,tt,nt,bt,K,lt,Lt,Nt,_t,Vt,zt,ee,U;function ct(){Ht=new $0(F),Ht.init(),zt=new Ax(F,Ht),kt=new G0(F,Ht,t,zt),Pt=new Ex(F,Ht),kt.reverseDepthBuffer&&d&&Pt.buffers.depth.setReversed(!0),jt=new Q0(F),Tt=new ux,T=new wx(F,Ht,Pt,Tt,kt,zt,jt),_=new X0(y),G=new Z0(y),Q=new rp(F),ee=new H0(F,Q),B=new J0(F,Q,jt,ee),N=new tg(F,B,Q,jt),Nt=new j0(F,kt,T),K=new W0(Tt),Z=new hx(y,_,G,Ht,kt,ee,K),tt=new Dx(y,Tt),nt=new fx,bt=new _x(Ht),Lt=new k0(y,_,G,Pt,N,p,l),lt=new Sx(y,N,kt),U=new Lx(F,jt,kt,Pt),_t=new V0(F,Ht,jt),Vt=new K0(F,Ht,jt),jt.programs=Z.programs,y.capabilities=kt,y.extensions=Ht,y.properties=Tt,y.renderLists=nt,y.shadowMap=lt,y.state=Pt,y.info=jt}ct();let Y=new Ac(y,F);this.xr=Y,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let b=Ht.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Ht.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(b){b!==void 0&&(q=b,this.setSize(k,j,!1))},this.getSize=function(b){return b.set(k,j)},this.setSize=function(b,O,W=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=b,j=O,e.width=Math.floor(b*q),e.height=Math.floor(O*q),W===!0&&(e.style.width=b+"px",e.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(k*q,j*q).floor()},this.setDrawingBufferSize=function(b,O,W){k=b,j=O,q=W,e.width=Math.floor(b*W),e.height=Math.floor(O*W),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(A)},this.getViewport=function(b){return b.copy(mt)},this.setViewport=function(b,O,W,X){b.isVector4?mt.set(b.x,b.y,b.z,b.w):mt.set(b,O,W,X),Pt.viewport(A.copy(mt).multiplyScalar(q).round())},this.getScissor=function(b){return b.copy(Ut)},this.setScissor=function(b,O,W,X){b.isVector4?Ut.set(b.x,b.y,b.z,b.w):Ut.set(b,O,W,X),Pt.scissor(D.copy(Ut).multiplyScalar(q).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(b){Pt.setScissorTest(Jt=b)},this.setOpaqueSort=function(b){it=b},this.setTransparentSort=function(b){ot=b},this.getClearColor=function(b){return b.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(b=!0,O=!0,W=!0){let X=0;if(b){let z=!1;if(I!==null){let rt=I.texture.format;z=rt===eh||rt===th||rt===jc}if(z){let rt=I.texture.type,xt=rt===qn||rt===fs||rt===Or||rt===Hi||rt===Kc||rt===Qc,wt=Lt.getClearColor(),At=Lt.getClearAlpha(),Bt=wt.r,Wt=wt.g,Rt=wt.b;xt?(g[0]=Bt,g[1]=Wt,g[2]=Rt,g[3]=At,F.clearBufferuiv(F.COLOR,0,g)):(x[0]=Bt,x[1]=Wt,x[2]=Rt,x[3]=At,F.clearBufferiv(F.COLOR,0,x))}else X|=F.COLOR_BUFFER_BIT}O&&(X|=F.DEPTH_BUFFER_BIT),W&&(X|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",et,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),nt.dispose(),bt.dispose(),Tt.dispose(),_.dispose(),G.dispose(),N.dispose(),ee.dispose(),U.dispose(),Z.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Eh),Y.removeEventListener("sessionend",Th),ns.stop()};function et(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let b=jt.autoReset,O=lt.enabled,W=lt.autoUpdate,X=lt.needsUpdate,z=lt.type;ct(),jt.autoReset=b,lt.enabled=O,lt.autoUpdate=W,lt.needsUpdate=X,lt.type=z}function gt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Gt(b){let O=b.target;O.removeEventListener("dispose",Gt),Pe(O)}function Pe(b){je(b),Tt.remove(b)}function je(b){let O=Tt.get(b).programs;O!==void 0&&(O.forEach(function(W){Z.releaseProgram(W)}),b.isShaderMaterial&&Z.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,W,X,z,rt){O===null&&(O=he);let xt=z.isMesh&&z.matrixWorld.determinant()<0,wt=sf(b,O,W,X,z);Pt.setMaterial(X,xt);let At=W.index,Bt=1;if(X.wireframe===!0){if(At=B.getWireframeAttribute(W),At===void 0)return;Bt=2}let Wt=W.drawRange,Rt=W.attributes.position,ne=Wt.start*Bt,Se=(Wt.start+Wt.count)*Bt;rt!==null&&(ne=Math.max(ne,rt.start*Bt),Se=Math.min(Se,(rt.start+rt.count)*Bt)),At!==null?(ne=Math.max(ne,0),Se=Math.min(Se,At.count)):Rt!=null&&(ne=Math.max(ne,0),Se=Math.min(Se,Rt.count));let Ee=Se-ne;if(Ee<0||Ee===1/0)return;ee.setup(z,X,wt,W,At);let _n,re=_t;if(At!==null&&(_n=Q.get(At),re=Vt,re.setIndex(_n)),z.isMesh)X.wireframe===!0?(Pt.setLineWidth(X.wireframeLinewidth*pe()),re.setMode(F.LINES)):re.setMode(F.TRIANGLES);else if(z.isLine){let Ct=X.linewidth;Ct===void 0&&(Ct=1),Pt.setLineWidth(Ct*pe()),z.isLineSegments?re.setMode(F.LINES):z.isLineLoop?re.setMode(F.LINE_LOOP):re.setMode(F.LINE_STRIP)}else z.isPoints?re.setMode(F.POINTS):z.isSprite&&re.setMode(F.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)re.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Ht.get("WEBGL_multi_draw"))re.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let Ct=z._multiDrawStarts,hi=z._multiDrawCounts,ae=z._multiDrawCount,Vn=At?Q.get(At).bytesPerElement:1,Es=Tt.get(X).currentProgram.getUniforms();for(let Rn=0;Rn<ae;Rn++)Es.setValue(F,"_gl_DrawID",Rn),re.render(Ct[Rn]/Vn,hi[Rn])}else if(z.isInstancedMesh)re.renderInstances(ne,Ee,z.count);else if(W.isInstancedBufferGeometry){let Ct=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,hi=Math.min(W.instanceCount,Ct);re.renderInstances(ne,Ee,hi)}else re.render(ne,Ee)};function ue(b,O,W){b.transparent===!0&&b.side===Mn&&b.forceSinglePass===!1?(b.side=Ye,b.needsUpdate=!0,ha(b,O,W),b.side=ki,b.needsUpdate=!0,ha(b,O,W),b.side=Mn):ha(b,O,W)}this.compile=function(b,O,W=null){W===null&&(W=b),f=bt.get(W),f.init(O),S.push(f),W.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(f.pushLight(z),z.castShadow&&f.pushShadow(z))}),b!==W&&b.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(f.pushLight(z),z.castShadow&&f.pushShadow(z))}),f.setupLights();let X=new Set;return b.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let rt=z.material;if(rt)if(Array.isArray(rt))for(let xt=0;xt<rt.length;xt++){let wt=rt[xt];ue(wt,W,z),X.add(wt)}else ue(rt,W,z),X.add(rt)}),S.pop(),f=null,X},this.compileAsync=function(b,O,W=null){let X=this.compile(b,O,W);return new Promise(z=>{function rt(){if(X.forEach(function(xt){Tt.get(xt).currentProgram.isReady()&&X.delete(xt)}),X.size===0){z(b);return}setTimeout(rt,10)}Ht.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let Hn=null;function ci(b){Hn&&Hn(b)}function Eh(){ns.stop()}function Th(){ns.start()}let ns=new ed;ns.setAnimationLoop(ci),typeof self<"u"&&ns.setContext(self),this.setAnimationLoop=function(b){Hn=b,Y.setAnimationLoop(b),b===null?ns.stop():ns.start()},Y.addEventListener("sessionstart",Eh),Y.addEventListener("sessionend",Th),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(O),O=Y.getCamera()),b.isScene===!0&&b.onBeforeRender(y,b,O,I),f=bt.get(b,S.length),f.init(O),S.push(f),St.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),J.setFromProjectionMatrix(St),yt=this.localClippingEnabled,st=K.init(this.clippingPlanes,yt),m=nt.get(b,M.length),m.init(),M.push(m),Y.enabled===!0&&Y.isPresenting===!0){let rt=y.xr.getDepthSensingMesh();rt!==null&&qo(rt,O,-1/0,y.sortObjects)}qo(b,O,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(it,ot),Yt=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Yt&&Lt.addToRenderList(m,b),this.info.render.frame++,st===!0&&K.beginShadows();let W=f.state.shadowsArray;lt.render(W,b,O),st===!0&&K.endShadows(),this.info.autoReset===!0&&this.info.reset();let X=m.opaque,z=m.transmissive;if(f.setupLights(),O.isArrayCamera){let rt=O.cameras;if(z.length>0)for(let xt=0,wt=rt.length;xt<wt;xt++){let At=rt[xt];Ah(X,z,b,At)}Yt&&Lt.render(b);for(let xt=0,wt=rt.length;xt<wt;xt++){let At=rt[xt];wh(m,b,At,At.viewport)}}else z.length>0&&Ah(X,z,b,O),Yt&&Lt.render(b),wh(m,b,O);I!==null&&(T.updateMultisampleRenderTarget(I),T.updateRenderTargetMipmap(I)),b.isScene===!0&&b.onAfterRender(y,b,O),ee.resetDefaultState(),E=-1,v=null,S.pop(),S.length>0?(f=S[S.length-1],st===!0&&K.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function qo(b,O,W,X){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)W=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||J.intersectsSprite(b)){X&&Ot.setFromMatrixPosition(b.matrixWorld).applyMatrix4(St);let xt=N.update(b),wt=b.material;wt.visible&&m.push(b,xt,wt,W,Ot.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||J.intersectsObject(b))){let xt=N.update(b),wt=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ot.copy(b.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),Ot.copy(xt.boundingSphere.center)),Ot.applyMatrix4(b.matrixWorld).applyMatrix4(St)),Array.isArray(wt)){let At=xt.groups;for(let Bt=0,Wt=At.length;Bt<Wt;Bt++){let Rt=At[Bt],ne=wt[Rt.materialIndex];ne&&ne.visible&&m.push(b,xt,ne,W,Ot.z,Rt)}}else wt.visible&&m.push(b,xt,wt,W,Ot.z,null)}}let rt=b.children;for(let xt=0,wt=rt.length;xt<wt;xt++)qo(rt[xt],O,W,X)}function wh(b,O,W,X){let z=b.opaque,rt=b.transmissive,xt=b.transparent;f.setupLightsView(W),st===!0&&K.setGlobalState(y.clippingPlanes,W),X&&Pt.viewport(A.copy(X)),z.length>0&&ca(z,O,W),rt.length>0&&ca(rt,O,W),xt.length>0&&ca(xt,O,W),Pt.buffers.depth.setTest(!0),Pt.buffers.depth.setMask(!0),Pt.buffers.color.setMask(!0),Pt.setPolygonOffset(!1)}function Ah(b,O,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[X.id]===void 0&&(f.state.transmissionRenderTarget[X.id]=new Be(1,1,{generateMipmaps:!0,type:Ht.has("EXT_color_buffer_half_float")||Ht.has("EXT_color_buffer_float")?rn:qn,minFilter:ds,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));let rt=f.state.transmissionRenderTarget[X.id],xt=X.viewport||A;rt.setSize(xt.z,xt.w);let wt=y.getRenderTarget();y.setRenderTarget(rt),y.getClearColor(V),$=y.getClearAlpha(),$<1&&y.setClearColor(16777215,.5),y.clear(),Yt&&Lt.render(W);let At=y.toneMapping;y.toneMapping=zi;let Bt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),f.setupLightsView(X),st===!0&&K.setGlobalState(y.clippingPlanes,X),ca(b,W,X),T.updateMultisampleRenderTarget(rt),T.updateRenderTargetMipmap(rt),Ht.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Rt=0,ne=O.length;Rt<ne;Rt++){let Se=O[Rt],Ee=Se.object,_n=Se.geometry,re=Se.material,Ct=Se.group;if(re.side===Mn&&Ee.layers.test(X.layers)){let hi=re.side;re.side=Ye,re.needsUpdate=!0,Rh(Ee,W,X,_n,re,Ct),re.side=hi,re.needsUpdate=!0,Wt=!0}}Wt===!0&&(T.updateMultisampleRenderTarget(rt),T.updateRenderTargetMipmap(rt))}y.setRenderTarget(wt),y.setClearColor(V,$),Bt!==void 0&&(X.viewport=Bt),y.toneMapping=At}function ca(b,O,W){let X=O.isScene===!0?O.overrideMaterial:null;for(let z=0,rt=b.length;z<rt;z++){let xt=b[z],wt=xt.object,At=xt.geometry,Bt=X===null?xt.material:X,Wt=xt.group;wt.layers.test(W.layers)&&Rh(wt,O,W,At,Bt,Wt)}}function Rh(b,O,W,X,z,rt){b.onBeforeRender(y,O,W,X,z,rt),b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),z.onBeforeRender(y,O,W,X,b,rt),z.transparent===!0&&z.side===Mn&&z.forceSinglePass===!1?(z.side=Ye,z.needsUpdate=!0,y.renderBufferDirect(W,O,X,z,b,rt),z.side=ki,z.needsUpdate=!0,y.renderBufferDirect(W,O,X,z,b,rt),z.side=Mn):y.renderBufferDirect(W,O,X,z,b,rt),b.onAfterRender(y,O,W,X,z,rt)}function ha(b,O,W){O.isScene!==!0&&(O=he);let X=Tt.get(b),z=f.state.lights,rt=f.state.shadowsArray,xt=z.state.version,wt=Z.getParameters(b,z.state,rt,O,W),At=Z.getProgramCacheKey(wt),Bt=X.programs;X.environment=b.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(b.isMeshStandardMaterial?G:_).get(b.envMap||X.environment),X.envMapRotation=X.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Bt===void 0&&(b.addEventListener("dispose",Gt),Bt=new Map,X.programs=Bt);let Wt=Bt.get(At);if(Wt!==void 0){if(X.currentProgram===Wt&&X.lightsStateVersion===xt)return Ph(b,wt),Wt}else wt.uniforms=Z.getUniforms(b),b.onBeforeCompile(wt,y),Wt=Z.acquireProgram(wt,At),Bt.set(At,Wt),X.uniforms=wt.uniforms;let Rt=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Rt.clippingPlanes=K.uniform),Ph(b,wt),X.needsLights=af(b),X.lightsStateVersion=xt,X.needsLights&&(Rt.ambientLightColor.value=z.state.ambient,Rt.lightProbe.value=z.state.probe,Rt.directionalLights.value=z.state.directional,Rt.directionalLightShadows.value=z.state.directionalShadow,Rt.spotLights.value=z.state.spot,Rt.spotLightShadows.value=z.state.spotShadow,Rt.rectAreaLights.value=z.state.rectArea,Rt.ltc_1.value=z.state.rectAreaLTC1,Rt.ltc_2.value=z.state.rectAreaLTC2,Rt.pointLights.value=z.state.point,Rt.pointLightShadows.value=z.state.pointShadow,Rt.hemisphereLights.value=z.state.hemi,Rt.directionalShadowMap.value=z.state.directionalShadowMap,Rt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Rt.spotShadowMap.value=z.state.spotShadowMap,Rt.spotLightMatrix.value=z.state.spotLightMatrix,Rt.spotLightMap.value=z.state.spotLightMap,Rt.pointShadowMap.value=z.state.pointShadowMap,Rt.pointShadowMatrix.value=z.state.pointShadowMatrix),X.currentProgram=Wt,X.uniformsList=null,Wt}function Ch(b){if(b.uniformsList===null){let O=b.currentProgram.getUniforms();b.uniformsList=qs.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function Ph(b,O){let W=Tt.get(b);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function sf(b,O,W,X,z){O.isScene!==!0&&(O=he),T.resetTextureUnits();let rt=O.fog,xt=X.isMeshStandardMaterial?O.environment:null,wt=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:rr,At=(X.isMeshStandardMaterial?G:_).get(X.envMap||xt),Bt=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Wt=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Rt=!!W.morphAttributes.position,ne=!!W.morphAttributes.normal,Se=!!W.morphAttributes.color,Ee=zi;X.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Ee=y.toneMapping);let _n=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,re=_n!==void 0?_n.length:0,Ct=Tt.get(X),hi=f.state.lights;if(st===!0&&(yt===!0||b!==v)){let Nn=b===v&&X.id===E;K.setState(X,b,Nn)}let ae=!1;X.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==hi.state.version||Ct.outputColorSpace!==wt||z.isBatchedMesh&&Ct.batching===!1||!z.isBatchedMesh&&Ct.batching===!0||z.isBatchedMesh&&Ct.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Ct.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Ct.instancing===!1||!z.isInstancedMesh&&Ct.instancing===!0||z.isSkinnedMesh&&Ct.skinning===!1||!z.isSkinnedMesh&&Ct.skinning===!0||z.isInstancedMesh&&Ct.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ct.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ct.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ct.instancingMorph===!1&&z.morphTexture!==null||Ct.envMap!==At||X.fog===!0&&Ct.fog!==rt||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==K.numPlanes||Ct.numIntersection!==K.numIntersection)||Ct.vertexAlphas!==Bt||Ct.vertexTangents!==Wt||Ct.morphTargets!==Rt||Ct.morphNormals!==ne||Ct.morphColors!==Se||Ct.toneMapping!==Ee||Ct.morphTargetsCount!==re)&&(ae=!0):(ae=!0,Ct.__version=X.version);let Vn=Ct.currentProgram;ae===!0&&(Vn=ha(X,O,z));let Es=!1,Rn=!1,br=!1,Te=Vn.getUniforms(),Jn=Ct.uniforms;if(Pt.useProgram(Vn.program)&&(Es=!0,Rn=!0,br=!0),X.id!==E&&(E=X.id,Rn=!0),Es||v!==b){Pt.buffers.depth.getReversed()?(at.copy(b.projectionMatrix),kf(at),Hf(at),Te.setValue(F,"projectionMatrix",at)):Te.setValue(F,"projectionMatrix",b.projectionMatrix),Te.setValue(F,"viewMatrix",b.matrixWorldInverse);let Ai=Te.map.cameraPosition;Ai!==void 0&&Ai.setValue(F,It.setFromMatrixPosition(b.matrixWorld)),kt.logarithmicDepthBuffer&&Te.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Te.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),v!==b&&(v=b,Rn=!0,br=!0)}if(z.isSkinnedMesh){Te.setOptional(F,z,"bindMatrix"),Te.setOptional(F,z,"bindMatrixInverse");let Nn=z.skeleton;Nn&&(Nn.boneTexture===null&&Nn.computeBoneTexture(),Te.setValue(F,"boneTexture",Nn.boneTexture,T))}z.isBatchedMesh&&(Te.setOptional(F,z,"batchingTexture"),Te.setValue(F,"batchingTexture",z._matricesTexture,T),Te.setOptional(F,z,"batchingIdTexture"),Te.setValue(F,"batchingIdTexture",z._indirectTexture,T),Te.setOptional(F,z,"batchingColorTexture"),z._colorsTexture!==null&&Te.setValue(F,"batchingColorTexture",z._colorsTexture,T));let Er=W.morphAttributes;if((Er.position!==void 0||Er.normal!==void 0||Er.color!==void 0)&&Nt.update(z,W,Vn),(Rn||Ct.receiveShadow!==z.receiveShadow)&&(Ct.receiveShadow=z.receiveShadow,Te.setValue(F,"receiveShadow",z.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Jn.envMap.value=At,Jn.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&O.environment!==null&&(Jn.envMapIntensity.value=O.environmentIntensity),Rn&&(Te.setValue(F,"toneMappingExposure",y.toneMappingExposure),Ct.needsLights&&rf(Jn,br),rt&&X.fog===!0&&tt.refreshFogUniforms(Jn,rt),tt.refreshMaterialUniforms(Jn,X,q,j,f.state.transmissionRenderTarget[b.id]),qs.upload(F,Ch(Ct),Jn,T)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(qs.upload(F,Ch(Ct),Jn,T),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Te.setValue(F,"center",z.center),Te.setValue(F,"modelViewMatrix",z.modelViewMatrix),Te.setValue(F,"normalMatrix",z.normalMatrix),Te.setValue(F,"modelMatrix",z.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){let Nn=X.uniformsGroups;for(let Ai=0,Ri=Nn.length;Ai<Ri;Ai++){let Ih=Nn[Ai];U.update(Ih,Vn),U.bind(Ih,Vn)}}return Vn}function rf(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function af(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(b,O,W){Tt.get(b.texture).__webglTexture=O,Tt.get(b.depthTexture).__webglTexture=W;let X=Tt.get(b);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||Ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,O){let W=Tt.get(b);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,W=0){I=b,w=O,R=W;let X=!0,z=null,rt=!1,xt=!1;if(b){let At=Tt.get(b);if(At.__useDefaultFramebuffer!==void 0)Pt.bindFramebuffer(F.FRAMEBUFFER,null),X=!1;else if(At.__webglFramebuffer===void 0)T.setupRenderTarget(b);else if(At.__hasExternalTextures)T.rebindTextures(b,Tt.get(b.texture).__webglTexture,Tt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Rt=b.depthTexture;if(At.__boundDepthTexture!==Rt){if(Rt!==null&&Tt.has(Rt)&&(b.width!==Rt.image.width||b.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(b)}}let Bt=b.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(xt=!0);let Wt=Tt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Wt[O])?z=Wt[O][W]:z=Wt[O],rt=!0):b.samples>0&&T.useMultisampledRTT(b)===!1?z=Tt.get(b).__webglMultisampledFramebuffer:Array.isArray(Wt)?z=Wt[W]:z=Wt,A.copy(b.viewport),D.copy(b.scissor),L=b.scissorTest}else A.copy(mt).multiplyScalar(q).floor(),D.copy(Ut).multiplyScalar(q).floor(),L=Jt;if(Pt.bindFramebuffer(F.FRAMEBUFFER,z)&&X&&Pt.drawBuffers(b,z),Pt.viewport(A),Pt.scissor(D),Pt.setScissorTest(L),rt){let At=Tt.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+O,At.__webglTexture,W)}else if(xt){let At=Tt.get(b.texture),Bt=O||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,At.__webglTexture,W||0,Bt)}E=-1},this.readRenderTargetPixels=function(b,O,W,X,z,rt,xt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=Tt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xt!==void 0&&(wt=wt[xt]),wt){Pt.bindFramebuffer(F.FRAMEBUFFER,wt);try{let At=b.texture,Bt=At.format,Wt=At.type;if(!kt.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!kt.textureTypeReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-X&&W>=0&&W<=b.height-z&&F.readPixels(O,W,X,z,zt.convert(Bt),zt.convert(Wt),rt)}finally{let At=I!==null?Tt.get(I).__webglFramebuffer:null;Pt.bindFramebuffer(F.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(b,O,W,X,z,rt,xt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=Tt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xt!==void 0&&(wt=wt[xt]),wt){let At=b.texture,Bt=At.format,Wt=At.type;if(!kt.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!kt.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=b.width-X&&W>=0&&W<=b.height-z){Pt.bindFramebuffer(F.FRAMEBUFFER,wt);let Rt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Rt),F.bufferData(F.PIXEL_PACK_BUFFER,rt.byteLength,F.STREAM_READ),F.readPixels(O,W,X,z,zt.convert(Bt),zt.convert(Wt),0);let ne=I!==null?Tt.get(I).__webglFramebuffer:null;Pt.bindFramebuffer(F.FRAMEBUFFER,ne);let Se=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Bf(F,Se,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Rt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,rt),F.deleteBuffer(Rt),F.deleteSync(Se),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,O=null,W=0){b.isTexture!==!0&&(Lr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,b=arguments[1]);let X=Math.pow(2,-W),z=Math.floor(b.image.width*X),rt=Math.floor(b.image.height*X),xt=O!==null?O.x:0,wt=O!==null?O.y:0;T.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,W,0,0,xt,wt,z,rt),Pt.unbindTexture()},this.copyTextureToTexture=function(b,O,W=null,X=null,z=0){b.isTexture!==!0&&(Lr("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,b=arguments[1],O=arguments[2],z=arguments[3]||0,W=null);let rt,xt,wt,At,Bt,Wt,Rt,ne,Se,Ee=b.isCompressedTexture?b.mipmaps[z]:b.image;W!==null?(rt=W.max.x-W.min.x,xt=W.max.y-W.min.y,wt=W.isBox3?W.max.z-W.min.z:1,At=W.min.x,Bt=W.min.y,Wt=W.isBox3?W.min.z:0):(rt=Ee.width,xt=Ee.height,wt=Ee.depth||1,At=0,Bt=0,Wt=0),X!==null?(Rt=X.x,ne=X.y,Se=X.z):(Rt=0,ne=0,Se=0);let _n=zt.convert(O.format),re=zt.convert(O.type),Ct;O.isData3DTexture?(T.setTexture3D(O,0),Ct=F.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(T.setTexture2DArray(O,0),Ct=F.TEXTURE_2D_ARRAY):(T.setTexture2D(O,0),Ct=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,O.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,O.unpackAlignment);let hi=F.getParameter(F.UNPACK_ROW_LENGTH),ae=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Vn=F.getParameter(F.UNPACK_SKIP_PIXELS),Es=F.getParameter(F.UNPACK_SKIP_ROWS),Rn=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Ee.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ee.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,At),F.pixelStorei(F.UNPACK_SKIP_ROWS,Bt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Wt);let br=b.isDataArrayTexture||b.isData3DTexture,Te=O.isDataArrayTexture||O.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){let Jn=Tt.get(b),Er=Tt.get(O),Nn=Tt.get(Jn.__renderTarget),Ai=Tt.get(Er.__renderTarget);Pt.bindFramebuffer(F.READ_FRAMEBUFFER,Nn.__webglFramebuffer),Pt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ai.__webglFramebuffer);for(let Ri=0;Ri<wt;Ri++)br&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Tt.get(b).__webglTexture,z,Wt+Ri),b.isDepthTexture?(Te&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Tt.get(O).__webglTexture,z,Se+Ri),F.blitFramebuffer(At,Bt,rt,xt,Rt,ne,rt,xt,F.DEPTH_BUFFER_BIT,F.NEAREST)):Te?F.copyTexSubImage3D(Ct,z,Rt,ne,Se+Ri,At,Bt,rt,xt):F.copyTexSubImage2D(Ct,z,Rt,ne,Se+Ri,At,Bt,rt,xt);Pt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Pt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Te?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(Ct,z,Rt,ne,Se,rt,xt,wt,_n,re,Ee.data):O.isCompressedArrayTexture?F.compressedTexSubImage3D(Ct,z,Rt,ne,Se,rt,xt,wt,_n,Ee.data):F.texSubImage3D(Ct,z,Rt,ne,Se,rt,xt,wt,_n,re,Ee):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,z,Rt,ne,rt,xt,_n,re,Ee.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,z,Rt,ne,Ee.width,Ee.height,_n,Ee.data):F.texSubImage2D(F.TEXTURE_2D,z,Rt,ne,rt,xt,_n,re,Ee);F.pixelStorei(F.UNPACK_ROW_LENGTH,hi),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ae),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Vn),F.pixelStorei(F.UNPACK_SKIP_ROWS,Es),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Rn),z===0&&O.generateMipmaps&&F.generateMipmap(Ct),Pt.unbindTexture()},this.copyTextureToTexture3D=function(b,O,W=null,X=null,z=0){return b.isTexture!==!0&&(Lr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,b=arguments[2],O=arguments[3],z=arguments[4]||0),Lr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,O,W,X,z)},this.initRenderTarget=function(b){Tt.get(b).__webglFramebuffer===void 0&&T.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?T.setTextureCube(b,0):b.isData3DTexture?T.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?T.setTexture2DArray(b,0):T.setTexture2D(b,0),Pt.unbindTexture()},this.resetState=function(){w=0,R=0,I=null,Pt.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}},eo=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Mt(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Xi=class extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ti,this.environmentIntensity=1,this.environmentRotation=new ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Rc=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=hc,this.updateRanges=[],this.version=0,this.uuid=Bi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},dn=new P,no=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)dn.fromBufferAttribute(this,e),dn.applyMatrix4(t),this.setXYZ(e,dn.x,dn.y,dn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)dn.fromBufferAttribute(this,e),dn.applyNormalMatrix(t),this.setXYZ(e,dn.x,dn.y,dn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)dn.fromBufferAttribute(this,e),dn.transformDirection(t),this.setXYZ(e,dn.x,dn.y,dn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Qn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Qn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Qn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Qn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Qn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array),r=me(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Qe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},zn=class extends ei{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Mt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Bs,Cr=new P,ks=new P,Hs=new P,Vs=new Et,Pr=new Et,ad=new le,Da=new P,Ir=new P,La=new P,Pu=new Et,bl=new Et,Iu=new Et,Yn=class extends Ie{constructor(t=new zn){if(super(),this.isSprite=!0,this.type="Sprite",Bs===void 0){Bs=new $e;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Rc(e,5);Bs.setIndex([0,1,2,0,2,3]),Bs.setAttribute("position",new no(n,3,0,!1)),Bs.setAttribute("uv",new no(n,2,3,!1))}this.geometry=Bs,this.material=t,this.center=new Et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ks.setFromMatrixScale(this.matrixWorld),ad.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Hs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ks.multiplyScalar(-Hs.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Ua(Da.set(-.5,-.5,0),Hs,a,ks,s,r),Ua(Ir.set(.5,-.5,0),Hs,a,ks,s,r),Ua(La.set(.5,.5,0),Hs,a,ks,s,r),Pu.set(0,0),bl.set(1,0),Iu.set(1,1);let o=t.ray.intersectTriangle(Da,Ir,La,!1,Cr);if(o===null&&(Ua(Ir.set(-.5,.5,0),Hs,a,ks,s,r),bl.set(0,1),o=t.ray.intersectTriangle(Da,La,Ir,!1,Cr),o===null))return;let l=t.ray.origin.distanceTo(Cr);l<t.near||l>t.far||e.push({distance:l,point:Cr.clone(),uv:Fi.getInterpolation(Cr,Da,Ir,La,Pu,bl,Iu,new Et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Ua(i,t,e,n,s,r){Vs.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Pr.x=r*Vs.x-s*Vs.y,Pr.y=s*Vs.x+r*Vs.y):Pr.copy(Vs),i.copy(t),i.x+=Pr.x,i.y+=Pr.y,i.applyMatrix4(ad)}var er=class extends Sn{constructor(t=null,e=1,n=1,s,r,a,o,l,c=nn,h=nn,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Cc=class extends ei{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Mt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Du=new le,Pc=new Za,Na=new Js,Fa=new P,io=class extends Ie{constructor(t=new $e,e=new Cc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Na.copy(n.boundingSphere),Na.applyMatrix4(s),Na.radius+=r,t.ray.intersectsSphere(Na)===!1)return;Du.copy(s).invert(),Pc.copy(t.ray).applyMatrix4(Du);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=d,x=p;g<x;g++){let m=c.getX(g);Fa.fromBufferAttribute(u,m),Lu(Fa,m,l,s,t,e,this)}}else{let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,x=p;g<x;g++)Fa.fromBufferAttribute(u,g),Lu(Fa,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Lu(i,t,e,n,s,r,a){let o=Pc.distanceSqToPoint(i);if(o<e){let l=new P;Pc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var ni=class extends Sn{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Br=class i extends $e{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new P,h=new Et;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let p=n+u/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ye(a,3)),this.setAttribute("normal",new ye(o,3)),this.setAttribute("uv",new ye(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},sn=class i extends $e{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],p=[],g=0,x=[],m=n/2,f=0;M(),a===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new ye(u,3)),this.setAttribute("normal",new ye(d,3)),this.setAttribute("uv",new ye(p,2));function M(){let y=new P,C=new P,w=0,R=(e-t)/n;for(let I=0;I<=r;I++){let E=[],v=I/r,A=v*(e-t)+t;for(let D=0;D<=s;D++){let L=D/s,V=L*l+o,$=Math.sin(V),k=Math.cos(V);C.x=A*$,C.y=-v*n+m,C.z=A*k,u.push(C.x,C.y,C.z),y.set($,R,k).normalize(),d.push(y.x,y.y,y.z),p.push(L,1-v),E.push(g++)}x.push(E)}for(let I=0;I<s;I++)for(let E=0;E<r;E++){let v=x[E][I],A=x[E+1][I],D=x[E+1][I+1],L=x[E][I+1];(t>0||E!==0)&&(h.push(v,A,L),w+=3),(e>0||E!==r-1)&&(h.push(A,D,L),w+=3)}c.addGroup(f,w,0),f+=w}function S(y){let C=g,w=new Et,R=new P,I=0,E=y===!0?t:e,v=y===!0?1:-1;for(let D=1;D<=s;D++)u.push(0,m*v,0),d.push(0,v,0),p.push(.5,.5),g++;let A=g;for(let D=0;D<=s;D++){let V=D/s*l+o,$=Math.cos(V),k=Math.sin(V);R.x=E*k,R.y=m*v,R.z=E*$,u.push(R.x,R.y,R.z),d.push(0,v,0),w.x=$*.5+.5,w.y=k*.5*v+.5,p.push(w.x,w.y),g++}for(let D=0;D<s;D++){let L=C+D,V=A+D;y===!0?h.push(V,V+1,L):h.push(V+1,V,L),I+=3}c.addGroup(f,I,y===!0?1:2),f+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var ms=class i extends $e{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],l=[],c=[],h=[],u=t,d=(e-t)/s,p=new P,g=new Et;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){let f=r+m/n*a;p.x=u*Math.cos(f),p.y=u*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<s;x++){let m=x*(n+1);for(let f=0;f<n;f++){let M=f+m,S=M,y=M+n+1,C=M+n+2,w=M+1;o.push(S,y,w),o.push(y,C,w)}}this.setIndex(o),this.setAttribute("position",new ye(l,3)),this.setAttribute("normal",new ye(c,3)),this.setAttribute("uv",new ye(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Si=class i extends $e{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new P,d=new P,p=[],g=[],x=[],m=[];for(let f=0;f<=n;f++){let M=[],S=f/n,y=0;f===0&&a===0?y=.5/e:f===n&&l===Math.PI&&(y=-.5/e);for(let C=0;C<=e;C++){let w=C/e;u.x=-t*Math.cos(s+w*r)*Math.sin(a+S*o),u.y=t*Math.cos(a+S*o),u.z=t*Math.sin(s+w*r)*Math.sin(a+S*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(w+y,1-S),M.push(c++)}h.push(M)}for(let f=0;f<n;f++)for(let M=0;M<e;M++){let S=h[f][M+1],y=h[f][M],C=h[f+1][M],w=h[f+1][M+1];(f!==0||a>0)&&p.push(S,y,w),(f!==n-1||l<Math.PI)&&p.push(y,C,w)}this.setIndex(p),this.setAttribute("position",new ye(g,3)),this.setAttribute("normal",new ye(x,3)),this.setAttribute("uv",new ye(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ln=class i extends $e{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],h=new P,u=new P,d=new P;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){let x=g/s*r,m=p/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){let x=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,M=(s+1)*p+g;a.push(x,m,M),a.push(m,f,M)}this.setIndex(a),this.setAttribute("position",new ye(o,3)),this.setAttribute("normal",new ye(l,3)),this.setAttribute("uv",new ye(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var so=class extends de{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}},ce=class extends ei{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nh,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var ro=class extends ei{static get type(){return"MeshNormalMaterial"}constructor(t){super(),this.isMeshNormalMaterial=!0,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nh,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}};function Oa(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Ux(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var nr=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ic=class extends nr{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nh,endingEnd:Nh}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Fh:r=t,o=2*e-n;break;case Oh:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Fh:a=t,l=2*n-e;break;case Oh:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-e)/(s-e),x=g*g,m=x*g,f=-d*m+2*d*x-d*g,M=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,S=(-1-p)*m+(1.5+p)*x+.5*g,y=p*m-p*x;for(let C=0;C!==o;++C)r[C]=f*a[h+C]+M*a[c+C]+S*a[l+C]+y*a[u+C];return r}},Dc=class extends nr{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},Lc=class extends nr{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Zn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Oa(e,this.TimeBufferType),this.values=Oa(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Oa(t.times,Array),values:Oa(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Lc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Dc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ic(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ga:e=this.InterpolantFactoryMethodDiscrete;break;case cc:e=this.InterpolantFactoryMethodLinear;break;case Zo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ga;case this.InterpolantFactoryMethodLinear:return cc;case this.InterpolantFactoryMethodSmooth:return Zo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Ux(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Zo,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let u=o*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[p+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*n,d=a*n;for(let p=0;p!==n;++p)e[d+p]=e[u+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Zn.prototype.TimeBufferType=Float32Array;Zn.prototype.ValueBufferType=Float32Array;Zn.prototype.DefaultInterpolation=cc;var gs=class extends Zn{constructor(t,e,n){super(t,e,n)}};gs.prototype.ValueTypeName="bool";gs.prototype.ValueBufferType=Array;gs.prototype.DefaultInterpolation=Ga;gs.prototype.InterpolantFactoryMethodLinear=void 0;gs.prototype.InterpolantFactoryMethodSmooth=void 0;var Uc=class extends Zn{};Uc.prototype.ValueTypeName="color";var Nc=class extends Zn{};Nc.prototype.ValueTypeName="number";var Fc=class extends nr{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Wi.slerpFlat(r,0,a,c-o,a,c,l);return r}},ao=class extends Zn{InterpolantFactoryMethodLinear(t){return new Fc(this.times,this.values,this.getValueSize(),t)}};ao.prototype.ValueTypeName="quaternion";ao.prototype.InterpolantFactoryMethodSmooth=void 0;var xs=class extends Zn{constructor(t,e,n){super(t,e,n)}};xs.prototype.ValueTypeName="string";xs.prototype.ValueBufferType=Array;xs.prototype.DefaultInterpolation=Ga;xs.prototype.InterpolantFactoryMethodLinear=void 0;xs.prototype.InterpolantFactoryMethodSmooth=void 0;var Oc=class extends Zn{};Oc.prototype.ValueTypeName="vector";var zc=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},Nx=new zc,Bc=class{constructor(t){this.manager=t!==void 0?t:Nx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Bc.DEFAULT_MATERIAL_NAME="__DEFAULT";var kr=class extends Ie{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Mt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},ir=class extends kr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Mt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},El=new le,Uu=new P,Nu=new P,oo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zr,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Uu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Uu),Nu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Nu),e.updateMatrixWorld(),El.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(El),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(El)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Fu=new le,Dr=new P,Tl=new P,kc=class extends oo{constructor(){super(new ze(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Et(4,2),this._viewportCount=6,this._viewports=[new ge(2,1,1,1),new ge(0,1,1,1),new ge(3,1,1,1),new ge(1,1,1,1),new ge(3,0,1,1),new ge(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Dr.setFromMatrixPosition(t.matrixWorld),n.position.copy(Dr),Tl.copy(n.position),Tl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Tl),n.updateMatrixWorld(),s.makeTranslation(-Dr.x,-Dr.y,-Dr.z),Fu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fu)}},ii=class extends kr{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new kc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Hc=class extends oo{constructor(){super(new Qs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},vs=class extends kr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new Hc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var lo=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ou(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Ou();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Ou(){return performance.now()}var sh="\\[\\]\\.:\\/",Fx=new RegExp("["+sh+"]","g"),rh="[^"+sh+"]",Ox="[^"+sh.replace("\\.","")+"]",zx=/((?:WC+[\/:])*)/.source.replace("WC",rh),Bx=/(WCOD+)?/.source.replace("WCOD",Ox),kx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rh),Hx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rh),Vx=new RegExp("^"+zx+Bx+kx+Hx+"$"),Gx=["material","materials","bones","map"],Vc=class{constructor(t,e,n){let s=n||Re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Re=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Fx,"")}static parseTrackName(t){let e=Vx.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Gx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Re.Composite=Vc;Re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Re.prototype.GetterByBindingType=[Re.prototype._getValue_direct,Re.prototype._getValue_array,Re.prototype._getValue_arrayElement,Re.prototype._getValue_toArray];Re.prototype.SetterByBindingTypeAndVersioning=[[Re.prototype._setValue_direct,Re.prototype._setValue_direct_setNeedsUpdate,Re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_array,Re.prototype._setValue_array_setNeedsUpdate,Re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_arrayElement,Re.prototype._setValue_arrayElement_setNeedsUpdate,Re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_fromArray,Re.prototype._setValue_fromArray_setNeedsUpdate,Re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Uv=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gc);var qi={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var pn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Wx=new Qs(-1,1,1,-1,0,1),ah=class extends $e{constructor(){super(),this.setAttribute("position",new ye([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ye([0,2,0,0,2,0],2))}},Xx=new ah,si=class{constructor(t){this._mesh=new pt(Xx,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Wx)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var lr=class extends pn{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof de?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=bn.clone(t.uniforms),this.material=new de({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new si(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Gr=class extends pn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},go=class extends pn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var xo=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new Et);this._width=n.width,this._height=n.height,e=new Be(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:rn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new lr(qi),this.copyPass.material.blending=He,this.clock=new lo}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Gr!==void 0&&(a instanceof Gr?n=!0:a instanceof go&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new Et);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Wr=class extends pn{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Mt}render(t,e,n){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};var od={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Mt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var cr=class i extends pn{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new Et(t.x,t.y):new Et(256,256),this.clearColor=new Mt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Be(r,a,{type:rn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let d=new Be(r,a,{type:rn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let p=new Be(r,a,{type:rn});p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),a=Math.round(a/2)}let o=od;this.highPassUniforms=bn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new de({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Et(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let h=qi;this.copyUniforms=bn.clone(h.uniforms),this.blendMaterial=new de({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Ze,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Mt,this.oldClearAlpha=1,this.basic=new xe,this.fsQuad=new si(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Et(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){let e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new de({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Et(.5,.5)},direction:{value:new Et(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new de({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};cr.BlurDirectionX=new Et(1,0);cr.BlurDirectionY=new Et(0,1);var ld={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var vo=class extends pn{constructor(){super();let t=ld;this.uniforms=bn.clone(t.uniforms),this.material=new so({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new si(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Kt.getTransfer(this._outputColorSpace)===oe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Xc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===qc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Yc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Vr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Zc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===$c&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Xr={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Et},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new le},cameraProjectionMatrixInverse:{value:new le},cameraWorldMatrix:{value:new le},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new P(-1,-1,-1)},sceneBoxMax:{value:new P(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;		
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif
		
		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {  
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {   
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}
		
		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif
			
			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {
				
				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w); 
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));
				
				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));
				
				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);	

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}		

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);		
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},qr={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},_o={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function cd(i=5){let t=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),e=qx(t),n=e.length,s=new Uint8Array(n*4);for(let a=0;a<n;++a){let o=e[a],l=2*Math.PI*o/n,c=new P(Math.cos(l),Math.sin(l),0).normalize();s[a*4]=(c.x*.5+.5)*255,s[a*4+1]=(c.y*.5+.5)*255,s[a*4+2]=127,s[a*4+3]=255}let r=new er(s,t,t);return r.wrapS=Dn,r.wrapT=Dn,r.needsUpdate=!0,r}function qx(i){let t=Math.floor(i)%2===0?Math.floor(i)+1:Math.floor(i),e=t*t,n=Array(e).fill(0),s=Math.floor(t/2),r=t-1;for(let a=1;a<=e;){if(s===-1&&r===t?(r=t-2,s=0):(r===t&&(r=0),s<0&&(s=t-1)),n[s*t+r]!==0){r-=2,s++;continue}else n[s*t+r]=a++;r++,s--}return n}var Yr={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:oh(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Et},cameraProjectionMatrixInverse:{value:new le},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;
		
		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}
		
		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1    
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1    
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);
			
			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;
		
			denoised += w * neighborColor;
			totalWeight += w;
		}
		
		void main() {
			float depth = getDepth(vUv.xy);	
			vec3 viewNormal = getViewNormal(vUv);	
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);
		
			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}
		
			if (totalWeight > 0.) { 
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function oh(i,t,e){let n=Yx(i,t,e),s="vec3[SAMPLES](";for(let r=0;r<i;r++){let a=n[r];s+=`vec3(${a.x}, ${a.y}, ${a.z})${r<i-1?",":")"}`}return s}function Yx(i,t,e){let n=[];for(let s=0;s<i;s++){let r=2*Math.PI*t*s/i,a=Math.pow(s/(i-1),e);n.push(new P(Math.cos(r),Math.sin(r),a))}return n}var yo=class{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(t,e,n){return t[0]*e+t[1]*n}dot3(t,e,n,s){return t[0]*e+t[1]*n+t[2]*s}dot4(t,e,n,s,r){return t[0]*e+t[1]*n+t[2]*s+t[3]*r}noise(t,e){let n,s,r,a=.5*(Math.sqrt(3)-1),o=(t+e)*a,l=Math.floor(t+o),c=Math.floor(e+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,d=l-u,p=c-u,g=t-d,x=e-p,m,f;g>x?(m=1,f=0):(m=0,f=1);let M=g-m+h,S=x-f+h,y=g-1+2*h,C=x-1+2*h,w=l&255,R=c&255,I=this.perm[w+this.perm[R]]%12,E=this.perm[w+m+this.perm[R+f]]%12,v=this.perm[w+1+this.perm[R+1]]%12,A=.5-g*g-x*x;A<0?n=0:(A*=A,n=A*A*this.dot(this.grad3[I],g,x));let D=.5-M*M-S*S;D<0?s=0:(D*=D,s=D*D*this.dot(this.grad3[E],M,S));let L=.5-y*y-C*C;return L<0?r=0:(L*=L,r=L*L*this.dot(this.grad3[v],y,C)),70*(n+s+r)}noise3d(t,e,n){let s,r,a,o,c=(t+e+n)*.3333333333333333,h=Math.floor(t+c),u=Math.floor(e+c),d=Math.floor(n+c),p=1/6,g=(h+u+d)*p,x=h-g,m=u-g,f=d-g,M=t-x,S=e-m,y=n-f,C,w,R,I,E,v;M>=S?S>=y?(C=1,w=0,R=0,I=1,E=1,v=0):M>=y?(C=1,w=0,R=0,I=1,E=0,v=1):(C=0,w=0,R=1,I=1,E=0,v=1):S<y?(C=0,w=0,R=1,I=0,E=1,v=1):M<y?(C=0,w=1,R=0,I=0,E=1,v=1):(C=0,w=1,R=0,I=1,E=1,v=0);let A=M-C+p,D=S-w+p,L=y-R+p,V=M-I+2*p,$=S-E+2*p,k=y-v+2*p,j=M-1+3*p,q=S-1+3*p,it=y-1+3*p,ot=h&255,mt=u&255,Ut=d&255,Jt=this.perm[ot+this.perm[mt+this.perm[Ut]]]%12,J=this.perm[ot+C+this.perm[mt+w+this.perm[Ut+R]]]%12,st=this.perm[ot+I+this.perm[mt+E+this.perm[Ut+v]]]%12,yt=this.perm[ot+1+this.perm[mt+1+this.perm[Ut+1]]]%12,at=.6-M*M-S*S-y*y;at<0?s=0:(at*=at,s=at*at*this.dot3(this.grad3[Jt],M,S,y));let St=.6-A*A-D*D-L*L;St<0?r=0:(St*=St,r=St*St*this.dot3(this.grad3[J],A,D,L));let It=.6-V*V-$*$-k*k;It<0?a=0:(It*=It,a=It*It*this.dot3(this.grad3[st],V,$,k));let Ot=.6-j*j-q*q-it*it;return Ot<0?o=0:(Ot*=Ot,o=Ot*Ot*this.dot3(this.grad3[yt],j,q,it)),32*(s+r+a+o)}noise4d(t,e,n,s){let r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,u,d,p,g,x=(t+e+n+s)*l,m=Math.floor(t+x),f=Math.floor(e+x),M=Math.floor(n+x),S=Math.floor(s+x),y=(m+f+M+S)*c,C=m-y,w=f-y,R=M-y,I=S-y,E=t-C,v=e-w,A=n-R,D=s-I,L=E>v?32:0,V=E>A?16:0,$=v>A?8:0,k=E>D?4:0,j=v>D?2:0,q=A>D?1:0,it=L+V+$+k+j+q,ot=a[it][0]>=3?1:0,mt=a[it][1]>=3?1:0,Ut=a[it][2]>=3?1:0,Jt=a[it][3]>=3?1:0,J=a[it][0]>=2?1:0,st=a[it][1]>=2?1:0,yt=a[it][2]>=2?1:0,at=a[it][3]>=2?1:0,St=a[it][0]>=1?1:0,It=a[it][1]>=1?1:0,Ot=a[it][2]>=1?1:0,he=a[it][3]>=1?1:0,Yt=E-ot+c,pe=v-mt+c,F=A-Ut+c,Xe=D-Jt+c,Ht=E-J+2*c,kt=v-st+2*c,Pt=A-yt+2*c,jt=D-at+2*c,Tt=E-St+3*c,T=v-It+3*c,_=A-Ot+3*c,G=D-he+3*c,Q=E-1+4*c,B=v-1+4*c,N=A-1+4*c,Z=D-1+4*c,tt=m&255,nt=f&255,bt=M&255,K=S&255,lt=o[tt+o[nt+o[bt+o[K]]]]%32,Lt=o[tt+ot+o[nt+mt+o[bt+Ut+o[K+Jt]]]]%32,Nt=o[tt+J+o[nt+st+o[bt+yt+o[K+at]]]]%32,_t=o[tt+St+o[nt+It+o[bt+Ot+o[K+he]]]]%32,Vt=o[tt+1+o[nt+1+o[bt+1+o[K+1]]]]%32,zt=.6-E*E-v*v-A*A-D*D;zt<0?h=0:(zt*=zt,h=zt*zt*this.dot4(r[lt],E,v,A,D));let ee=.6-Yt*Yt-pe*pe-F*F-Xe*Xe;ee<0?u=0:(ee*=ee,u=ee*ee*this.dot4(r[Lt],Yt,pe,F,Xe));let U=.6-Ht*Ht-kt*kt-Pt*Pt-jt*jt;U<0?d=0:(U*=U,d=U*U*this.dot4(r[Nt],Ht,kt,Pt,jt));let ct=.6-Tt*Tt-T*T-_*_-G*G;ct<0?p=0:(ct*=ct,p=ct*ct*this.dot4(r[_t],Tt,T,_,G));let Y=.6-Q*Q-B*B-N*N-Z*Z;return Y<0?g=0:(Y*=Y,g=Y*Y*this.dot4(r[Vt],Q,B,N,Z)),27*(h+u+d+p+g)}};var hr=class i extends pn{constructor(t,e,n,s,r,a,o){super(),this.width=n!==void 0?n:512,this.height=s!==void 0?s:512,this.clear=!0,this.camera=e,this.scene=t,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=cd(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Be(this.width,this.height,{type:rn}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new de({defines:Object.assign({},Xr.defines),uniforms:bn.clone(Xr.uniforms),vertexShader:Xr.vertexShader,fragmentShader:Xr.fragmentShader,blending:He,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new ro,this.normalMaterial.blending=He,this.pdMaterial=new de({defines:Object.assign({},Yr.defines),uniforms:bn.clone(Yr.uniforms),vertexShader:Yr.vertexShader,fragmentShader:Yr.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new de({defines:Object.assign({},qr.defines),uniforms:bn.clone(qr.uniforms),vertexShader:qr.vertexShader,fragmentShader:qr.fragmentShader,blending:He}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new de({uniforms:bn.clone(qi.uniforms),vertexShader:qi.vertexShader,fragmentShader:qi.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:ho,blendDst:sr,blendEquation:On,blendSrcAlpha:co,blendDstAlpha:sr,blendEquationAlpha:On}),this.blendMaterial=new de({uniforms:bn.clone(_o.uniforms),vertexShader:_o.vertexShader,fragmentShader:_o.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Wc,blendSrc:ho,blendDst:sr,blendEquation:On,blendSrcAlpha:co,blendDstAlpha:sr,blendEquationAlpha:On}),this.fsQuad=new si(null),this.originalClearColor=new Mt,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(t,e){t!==void 0?(this.depthTexture=t,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new tr,this.depthTexture.format=Vi,this.depthTexture.type=Hi,this.normalRenderTarget=new Be(this.width,this.height,{minFilter:nn,magFilter:nn,type:rn,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let n=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(t){t?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(t){t.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=t.radius),t.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=t.distanceExponent),t.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=t.thickness),t.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=t.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),t.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=t.scale),t.samples!==void 0&&t.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=t.samples,this.gtaoMaterial.needsUpdate=!0),t.screenSpaceRadius!==void 0&&(t.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=t.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(t){let e=!1;t.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=t.lumaPhi),t.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=t.depthPhi),t.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=t.normalPhi),t.radius!==void 0&&t.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=t.radius),t.radiusExponent!==void 0&&t.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=t.radiusExponent,e=!0),t.rings!==void 0&&t.rings!==this.pdRings&&(this.pdRings=t.rings,e=!0),t.samples!==void 0&&t.samples!==this.pdSamples&&(this.pdSamples=t.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=oh(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,e,n){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case i.OUTPUT.Off:break;case i.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=He,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case i.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=He,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case i.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=He,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case i.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case i.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=He,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case i.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=He,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(t,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(t,e,n,s,r){t.getClearColor(this.originalClearColor);let a=t.getClearAlpha(),o=t.autoClear;t.setRenderTarget(n),t.autoClear=!1,s!=null&&(t.setClearColor(s),t.setClearAlpha(r||0),t.clear()),this.fsQuad.material=e,this.fsQuad.render(t),t.autoClear=o,t.setClearColor(this.originalClearColor),t.setClearAlpha(a)}renderOverride(t,e,n,s,r){t.getClearColor(this.originalClearColor);let a=t.getClearAlpha(),o=t.autoClear;t.setRenderTarget(n),t.autoClear=!1,s=e.clearColor||s,r=e.clearAlpha||r,s!=null&&(t.setClearColor(s),t.setClearAlpha(r||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=o,t.setClearColor(this.originalClearColor),t.setClearAlpha(a)}setSize(t,e){this.width=t,this.height=e,this.gtaoRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.pdRenderTarget.setSize(t,e),this.gtaoMaterial.uniforms.resolution.value.set(t,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(t,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){let t=this.scene,e=this._visibilityCache;t.traverse(function(n){e.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){let t=this.scene,e=this._visibilityCache;t.traverse(function(n){let s=e.get(n);n.visible=s}),e.clear()}generateNoise(t=64){let e=new yo,n=t*t*4,s=new Uint8Array(n);for(let a=0;a<t;a++)for(let o=0;o<t;o++){let l=a,c=o;s[(a*t+o)*4]=(e.noise(l,c)*.5+.5)*255,s[(a*t+o)*4+1]=(e.noise(l+t,c)*.5+.5)*255,s[(a*t+o)*4+2]=(e.noise(l,c+t)*.5+.5)*255,s[(a*t+o)*4+3]=(e.noise(l+t,c+t)*.5+.5)*255}let r=new er(s,t,t,In,qn);return r.wrapS=Dn,r.wrapT=Dn,r.needsUpdate=!0,r}};hr.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Zx={name:"FinishShader",uniforms:{tDiffuse:{value:null},time:{value:0},aberr:{value:7e-4},hurt:{value:0},vignette:{value:.32},grain:{value:.035},aspect:{value:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform float time, aberr, hurt, vignette, grain, aspect; varying vec2 vUv;
    float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    void main(){
      vec2 c = vUv - 0.5;
      float r2 = dot(c * vec2(aspect, 1.0), c * vec2(aspect, 1.0));
      // aberration v\xE4xer mot kanterna, tydligare vid skada
      vec2 off = c * r2 * (aberr * 6.0 + hurt * 0.018);
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + off).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - off).b;
      // gradering: l\xE4tt S-kurva, kall skugga / varm h\xF6gdager
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, 1.08);
      col = col * col * (3.0 - 2.0 * col) * 0.35 + col * 0.65;
      col += vec3(-0.006, 0.0, 0.012) * (1.0 - l) + vec3(0.012, 0.004, -0.008) * l * 0.5;
      // vignett
      float v = smoothstep(0.18, 0.95, r2 * 1.6);
      col *= 1.0 - v * (vignette + hurt * 0.25);
      col.r += v * hurt * 0.10;
      // filmkorn (mest i skuggor)
      float g = hash(vUv * vec2(1920.0, 1080.0) + fract(time) * 71.0) - 0.5;
      col += g * grain * (1.0 - l * 0.7);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }`};function hd(){return new lr(Zx)}function ud(i,t,e,n){let s=new ze(t.fov,t.aspect,.1,70),r=new hr(i,s,e,n);r.syncCamera=()=>{s.fov=t.fov,s.aspect=t.aspect,s.updateProjectionMatrix(),t.updateMatrixWorld(),s.matrixWorld.copy(t.matrixWorld),s.matrixWorldInverse.copy(t.matrixWorldInverse),s.position.copy(t.position),s.quaternion.copy(t.quaternion)},r.output=hr.OUTPUT.Default,r.blendIntensity=.75,r.updateGtaoMaterial({radius:.6,distanceExponent:1.5,thickness:1,scale:1,samples:12,distanceFallOff:1,screenSpaceRadius:!1}),r.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:12});let a=r.overrideVisibility.bind(r);return r.overrideVisibility=function(){a(),this.scene.traverse(o=>{if(o.isSprite){o.visible=!1;return}if(!o.isMesh||!o.visible)return;let l=o.material;l&&(l.depthWrite===!1||l.transparent&&l.blending!==1)&&(o.visible=!1)})},r}var ri=Math.PI*2,$t=(i,t,e)=>i<t?t:i>e?e:i,lh=(i,t,e)=>i+(t-i)*e,dt=(i,t)=>i+Math.random()*(t-i);var dd=i=>i[Math.random()*i.length|0],En=(i,t,e,n)=>lh(i,t,1-Math.exp(-e*n));function fd(i,t){let e=(t-i)%ri;return e>Math.PI&&(e-=ri),e<-Math.PI&&(e+=ri),e}function Mo(i){return function(){i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function an(i,t){try{if(t===void 0)return JSON.parse(localStorage.getItem("gamma."+i));localStorage.setItem("gamma."+i,JSON.stringify(t))}catch{}return null}var Me=24,Le=9,So=class{constructor(){this.boxes=[],this.cyls=[],this.hit={nx:0,ny:1,nz:0,kind:"floor"}}addBox(t,e,n,s,r,a){this.boxes.push({cx:t,cz:e,hx:n,hz:s,c:Math.cos(r),s:Math.sin(r),h:a,yaw:r})}addCyl(t,e,n,s){this.cyls.push({cx:t,cz:e,r:n,h:s})}resolve(t,e,n=0){for(let a of this.boxes){if(n>a.h)continue;let o=t.x-a.cx,l=t.z-a.cz,c=o*a.c-l*a.s,h=o*a.s+l*a.c,u=$t(c,-a.hx,a.hx),d=$t(h,-a.hz,a.hz),p=c-u,g=h-d,x=p*p+g*g;if(x>=e*e)continue;let m,f;if(x>1e-8){let M=Math.sqrt(x),S=(e-M)/M;m=p*S,f=g*S}else{let M=a.hx-Math.abs(c),S=a.hz-Math.abs(h);M<S?(m=c>=0?M+e:-(M+e),f=0):(f=h>=0?S+e:-(S+e),m=0)}t.x+=m*a.c+f*a.s,t.z+=-m*a.s+f*a.c}for(let a of this.cyls){if(n>a.h)continue;let o=t.x-a.cx,l=t.z-a.cz,c=o*o+l*l,h=a.r+e;if(c>=h*h)continue;let u=Math.sqrt(c)||1e-4,d=(h-u)/u;t.x+=o*d,t.z+=l*d}let s=Math.hypot(t.x,t.z),r=Me-e-.05;s>r&&(t.x*=r/s,t.z*=r/s)}ray(t,e,n,s,r,a,o,l=!0){let c=o,h=!1,u=this.hit;for(let d of this.boxes){let p=t-d.cx,g=n-d.cz,x=p*d.c-g*d.s,m=p*d.s+g*d.c,f=s*d.c-a*d.s,M=s*d.s+a*d.c,S=0,y=c,C=-1,w=0,R=[-d.hx,0,-d.hz],I=[d.hx,d.h,d.hz],E=[x,e,m],v=[f,r,M],A=!0;for(let D=0;D<3;D++){if(Math.abs(v[D])<1e-9){if(E[D]<R[D]||E[D]>I[D]){A=!1;break}continue}let L=(R[D]-E[D])/v[D],V=(I[D]-E[D])/v[D],$=-1;if(L>V){let k=L;L=V,V=k,$=1}if(L>S&&(S=L,C=D,w=$),V<y&&(y=V),S>y){A=!1;break}}!A||C<0||S>=c||(c=S,h=!0,C===0?(u.nx=w*d.c,u.nz=-w*d.s,u.ny=0):C===2?(u.nx=w*d.s,u.nz=w*d.c,u.ny=0):(u.nx=0,u.ny=w,u.nz=0),u.kind="crate")}for(let d of this.cyls){let p=t-d.cx,g=n-d.cz,x=s*s+a*a;if(x>1e-9){let m=p*s+g*a,f=p*p+g*g-d.r*d.r,M=m*m-x*f;if(M>=0){let S=(-m-Math.sqrt(M))/x;if(S>0&&S<c){let y=e+r*S;if(y>=0&&y<=d.h){c=S,h=!0;let C=p+s*S,w=g+a*S,R=Math.hypot(C,w)||1;u.nx=C/R,u.nz=w/R,u.ny=0,u.kind="pillar";continue}}}}if(Math.abs(r)>1e-9){let m=(d.h-e)/r;if(m>0&&m<c){let f=p+s*m,M=g+a*m;f*f+M*M<=d.r*d.r&&(c=m,h=!0,u.nx=0,u.ny=1,u.nz=0,u.kind="crate")}}}if(l){if(r<-1e-9){let p=-e/r;p>0&&p<c&&(c=p,h=!0,u.nx=0,u.ny=1,u.nz=0,u.kind="floor")}else if(r>1e-9){let p=(Le-e)/r;p>0&&p<c&&(c=p,h=!0,u.nx=0,u.ny=-1,u.nz=0,u.kind="ceil")}let d=s*s+a*a;if(d>1e-9){let p=t*s+n*a,g=t*t+n*n-Me*Me,x=p*p-d*g;if(x>=0){let m=(-p+Math.sqrt(x))/d;if(m>0&&m<c){c=m,h=!0;let f=t+s*m,M=n+a*m,S=Math.hypot(f,M)||1;u.nx=-f/S,u.nz=-M/S,u.ny=0,u.kind="wall"}}}}return h?c:-1}clear(t,e,n,s,r,a){let o=s-t,l=r-e,c=a-n,h=Math.hypot(o,l,c);return h<.001?!0:this.ray(t,e,n,o/h,l/h,c/h,h,!1)<0}};var Zr=new P;function Bn(i,t,e,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;Zr.copy(t),Zr[n]=0,Zr.normalize();let c=.5*a/(a+o),h=1-Zr.angleTo(i)/l;return Math.sign(Zr[e])===1?h*c:o/(a+o)+c+c*(1-h)}var Yi=class extends ve{constructor(t=1,e=1,n=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,n/2,r),super(1,1,1,s,s,s),s===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let o=new P,l=new P,c=new P(t,e,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=h.length/6,g=new P,x=.5/s;for(let m=0,f=0;m<h.length;m+=3,f+=2)switch(o.fromArray(h,m),l.copy(o),l.x-=Math.sign(l.x)*x,l.y-=Math.sign(l.y)*x,l.z-=Math.sign(l.z)*x,l.normalize(),h[m+0]=c.x*Math.sign(o.x)+l.x*r,h[m+1]=c.y*Math.sign(o.y)+l.y*r,h[m+2]=c.z*Math.sign(o.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),d[f+0]=Bn(g,l,"z","y",r,n),d[f+1]=1-Bn(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),d[f+0]=1-Bn(g,l,"z","y",r,n),d[f+1]=1-Bn(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),d[f+0]=1-Bn(g,l,"x","z",r,t),d[f+1]=Bn(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),d[f+0]=1-Bn(g,l,"x","z",r,t),d[f+1]=1-Bn(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),d[f+0]=1-Bn(g,l,"x","y",r,t),d[f+1]=1-Bn(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),d[f+0]=Bn(g,l,"x","y",r,t),d[f+1]=1-Bn(g,l,"y","x",r,e);break}}};function mn(i,t){let e=document.createElement("canvas");return e.width=i,e.height=t,e}function $x(i,t){let e=i.width,n=i.height,s=i.getContext("2d").getImageData(0,0,e,n).data,r=mn(e,n),a=r.getContext("2d"),o=a.createImageData(e,n),l=o.data,c=(h,u)=>s[((u+n)%n*e+(h+e)%e)*4]/255;for(let h=0;h<n;h++)for(let u=0;u<e;u++){let d=(c(u+1,h)-c(u-1,h))*t,p=(c(u,h+1)-c(u,h-1))*t,g=Math.sqrt(d*d+p*p+1),x=(h*e+u)*4;l[x]=(-d/g*.5+.5)*255,l[x+1]=(p/g*.5+.5)*255,l[x+2]=(1/g*.5+.5)*255,l[x+3]=255}return a.putImageData(o,0,0),r}function _s(i,t,e=[1,1],n=4){let s=new ni(i);return s.wrapS=s.wrapT=Dn,s.repeat.set(e[0],e[1]),s.anisotropy=n,t&&(s.colorSpace=ke),s}function Eo(i={}){let{size:t=1024,cols:e=4,rows:n=4,base:s=[58,68,82],seed:r=1,bolts:a=!0,glowSeams:o=null,accent:l=null,dirt:c=.5,normalStrength:h=3}=i,u=t,d=Math.round(t*n/e),p=Mo(r),g=mn(u,d),x=mn(u,d),m=mn(u,d),f=g.getContext("2d"),M=x.getContext("2d"),S=m.getContext("2d"),y=o?mn(u,d):null,C=y?y.getContext("2d"):null;C&&(C.fillStyle="#000",C.fillRect(0,0,u,d)),M.fillStyle="#9a9a9a",M.fillRect(0,0,u,d),S.fillStyle="#8a8a8a",S.fillRect(0,0,u,d);let w=u/e,R=d/n,I=Math.max(3,u/200);for(let v=0;v<n;v++)for(let A=0;A<e;A++){let D=A*w,L=v*R,V=.88+p()*.24;f.fillStyle=`rgb(${s[0]*V|0},${s[1]*V|0},${s[2]*V|0})`,f.fillRect(D,L,w,R);let $=f.createLinearGradient(D,L,D+w,L+R);$.addColorStop(0,"rgba(255,255,255,0.05)"),$.addColorStop(1,"rgba(0,0,0,0.12)"),f.fillStyle=$,f.fillRect(D,L,w,R);let k=I*3;if(f.strokeStyle="rgba(0,0,0,0.35)",f.lineWidth=I*.8,f.strokeRect(D+k,L+k,w-k*2,R-k*2),M.strokeStyle="#555",M.lineWidth=I*.8,M.strokeRect(D+k,L+k,w-k*2,R-k*2),M.fillStyle="#a8a8a8",M.fillRect(D+k+I,L+k+I,w-(k+I)*2,R-(k+I)*2),f.fillStyle="rgba(0,0,0,0.75)",M.fillStyle="#000",S.fillStyle="#ddd",f.fillRect(D,L,w,I),f.fillRect(D,L,I,R),M.fillRect(D,L,w,I),M.fillRect(D,L,I,R),S.fillRect(D,L,w,I),S.fillRect(D,L,I,R),f.fillStyle="rgba(255,255,255,0.08)",f.fillRect(D+I,L+I,w-I,1),f.fillRect(D+I,L+I,1,R-I),a){let j=I*6,q=I*1.5;for(let[it,ot]of[[D+j,L+j],[D+w-j,L+j],[D+j,L+R-j],[D+w-j,L+R-j]])f.fillStyle="rgba(20,24,30,0.9)",f.beginPath(),f.arc(it,ot,q,0,7),f.fill(),f.fillStyle="rgba(190,200,215,0.55)",f.beginPath(),f.arc(it-1,ot-1,q*.5,0,7),f.fill(),M.fillStyle="#fff",M.beginPath(),M.arc(it,ot,q,0,7),M.fill()}C&&p()<o.chance&&(C.strokeStyle=o.color,C.lineWidth=I*.9,C.beginPath(),p()<.5?(C.moveTo(D+w*.15,L+R*.5),C.lineTo(D+w*.85,L+R*.5)):(C.moveTo(D+k*1.5,L+k*1.5),C.lineTo(D+w-k*1.5,L+k*1.5),C.lineTo(D+w-k*1.5,L+R-k*1.5)),C.stroke())}if(l){f.fillStyle=l.color;for(let v=0;v<n;v++)f.fillRect(0,v*R+R*.5-I,u,I*2)}for(let v=0;v<220*c;v++){let A=p()*u,D=p()*d,L=6+p()*40,V=f.createRadialGradient(A,D,0,A,D,L);V.addColorStop(0,`rgba(0,0,0,${.05+p()*.12})`),V.addColorStop(1,"rgba(0,0,0,0)"),f.fillStyle=V,f.fillRect(A-L,D-L,L*2,L*2);let $=S.createRadialGradient(A,D,0,A,D,L);$.addColorStop(0,`rgba(255,255,255,${.15+p()*.25})`),$.addColorStop(1,"rgba(255,255,255,0)"),S.fillStyle=$,S.fillRect(A-L,D-L,L*2,L*2)}for(let v=0;v<160*c;v++){let A=p()*u,D=p()*d,L=10+p()*70,V=p()*6.28;f.strokeStyle=`rgba(210,220,235,${.04+p()*.12})`,f.lineWidth=1,f.beginPath(),f.moveTo(A,D),f.lineTo(A+Math.cos(V)*L,D+Math.sin(V)*L),f.stroke(),M.strokeStyle="rgba(0,0,0,0.25)",M.lineWidth=1,M.beginPath(),M.moveTo(A,D),M.lineTo(A+Math.cos(V)*L,D+Math.sin(V)*L),M.stroke()}for(let v=0;v<40*c;v++){let A=p()*u,D=p()*d,L=40+p()*160,V=f.createLinearGradient(A,D,A,D+L);V.addColorStop(0,"rgba(10,12,16,0.2)"),V.addColorStop(1,"rgba(10,12,16,0)"),f.fillStyle=V,f.fillRect(A,D,2+p()*6,L)}let E=f.getImageData(0,0,u,d);for(let v=0;v<E.data.length;v+=4){let A=(p()-.5)*12;E.data[v]+=A,E.data[v+1]+=A,E.data[v+2]+=A}return f.putImageData(E,0,0),{color:g,height:x,rough:m,emissive:y,normal:$x(x,h)}}function $r(i,t,e){return{map:_s(i.color,!0,t,e),normalMap:_s(i.normal,!1,t,e),roughnessMap:_s(i.rough,!1,t,e),emissiveMap:i.emissive?_s(i.emissive,!0,t,e):null}}function pd(){let i=mn(256,256),t=i.getContext("2d");t.fillStyle="#e3b21c",t.fillRect(0,0,256,256),t.fillStyle="#15181c";for(let s=-4;s<8;s++)t.beginPath(),t.moveTo(s*64,0),t.lineTo(s*64+32,0),t.lineTo(s*64+32+256,256),t.lineTo(s*64+256,256),t.fill();let e=t.getImageData(0,0,256,256),n=Mo(5);for(let s=0;s<e.data.length;s+=4){let r=(n()-.5)*24;e.data[s]+=r,e.data[s+1]+=r,e.data[s+2]+=r}return t.putImageData(e,0,0),_s(i,!0,[1,1])}function md(){let t=mn(1024,1024),e=mn(1024,1024),n=t.getContext("2d"),s=e.getContext("2d");n.fillStyle="#1b222b",n.fillRect(0,0,1024,1024),s.fillStyle="#000",s.fillRect(0,0,1024,1024);let r=1024/2;for(let a=60;a<520;a+=62)n.strokeStyle="rgba(0,0,0,0.6)",n.lineWidth=6,n.beginPath(),n.arc(r,r,a,0,7),n.stroke(),n.strokeStyle="rgba(120,140,170,0.15)",n.lineWidth=2,n.beginPath(),n.arc(r,r,a+4,0,7),n.stroke();for(let a=0;a<24;a++){let o=a/24*6.2832;n.strokeStyle="rgba(0,0,0,0.5)",n.lineWidth=4,n.beginPath(),n.moveTo(r+Math.cos(o)*60,r+Math.sin(o)*60),n.lineTo(r+Math.cos(o)*520,r+Math.sin(o)*520),n.stroke()}for(let[a,o,l]of[[210,"#35e0ff",8],[330,"#ffffff",6],[450,"#35e0ff",8]])s.strokeStyle=o,s.lineWidth=l,s.beginPath(),s.arc(r,r,a,0,7),s.stroke(),n.strokeStyle="#6a7683",n.lineWidth=l+6,n.beginPath(),n.arc(r,r,a,0,7),n.stroke(),n.strokeStyle=o,n.lineWidth=l,n.beginPath(),n.arc(r,r,a,0,7),n.stroke();return{map:_s(t,!0),emissiveMap:_s(e,!0)}}function Jx(i,t,e,n){let s=i*374761393+t*668265263+e*1274126177+n*144665|0;return s=Math.imul(s^s>>>13,1274126177),((s^s>>>16)>>>0)/4294967296}function Kx(i,t,e,n){let s=Math.floor(i),r=Math.floor(t),a=Math.floor(e),o=i-s,l=t-r,c=e-a,h=o*o*(3-2*o),u=l*l*(3-2*l),d=c*c*(3-2*c),p=0;for(let g=0;g<8;g++){let x=g&1,m=g>>1&1,f=g>>2&1,M=(x?h:1-h)*(m?u:1-u)*(f?d:1-d);p+=M*Jx(s+x,r+m,a+f,n)}return p}function bo(i,t,e,n,s=5){let r=.5,a=1,o=0;for(let l=0;l<s;l++)o+=r*Kx(i*a,t*a,e*a,n+l),r*=.5,a*=2.03;return o}function gd(i=!0){let t=i?2048:1024,e=t/2,n=256,s=128,r=mn(n,s),a=r.getContext("2d"),o=a.createImageData(n,s);for(let d=0;d<s;d++){let p=(.5-(d+.5)/s)*Math.PI;for(let g=0;g<n;g++){let x=(g+.5)/n*Math.PI*2,m=Math.cos(p)*Math.cos(x),f=Math.sin(p),M=Math.cos(p)*Math.sin(x),S=bo(m*2.2+5,f*2.2+5,M*2.2+5,11),y=bo(m*4.5+9,f*4.5+9,M*4.5+9,23,4),C=Math.exp(-Math.pow(f*2.2+.3,2)*2),w=Math.max(0,S-.38)*2.4*(.35+C),R=Math.max(0,y-.45)*1.8*C,I=(d*n+g)*4;o.data[I]=Math.min(255,10+w*120+R*160),o.data[I+1]=Math.min(255,14+w*70+R*90),o.data[I+2]=Math.min(255,28+w*190+R*70),o.data[I+3]=255}}a.putImageData(o,0,0);let l=mn(t,e),c=l.getContext("2d");c.imageSmoothingEnabled=!0,c.imageSmoothingQuality="high",c.drawImage(r,0,0,t,e);let h=Mo(77);for(let d=0;d<t*2.2;d++){let p=h()*t,g=h()*e,x=Math.pow(h(),6),m=h();c.fillStyle=`rgba(${m<.2?255:200+(h()*55|0)},${m<.2?210:220+(h()*35|0)},${m>.8?255:235},${.25+x*.75})`;let f=.6+x*2.4;c.fillRect(p,g,f,f)}for(let d=0;d<40;d++){let p=h()*t,g=h()*e,x=5+h()*10,m=c.createRadialGradient(p,g,0,p,g,x);m.addColorStop(0,"rgba(255,255,255,0.95)"),m.addColorStop(.2,"rgba(180,210,255,0.35)"),m.addColorStop(1,"rgba(180,210,255,0)"),c.fillStyle=m,c.fillRect(p-x,g-x,x*2,x*2)}let u=new ni(l);return u.colorSpace=ke,u.mapping=Fr,u}function xd(){let e=mn(1024,512),n=e.getContext("2d"),s=n.createImageData(1024,512),r=[[28,52,96],[60,110,160],[210,200,170],[150,90,70],[90,60,110]];for(let o=0;o<512;o++){let l=(.5-o/512)*Math.PI;for(let c=0;c<1024;c++){let h=c/1024*Math.PI*2,u=Math.cos(l)*Math.cos(h),d=Math.sin(l),p=Math.cos(l)*Math.sin(h),g=bo(u*3,d*6,p*3,3,4)*.5,x=Math.sin((d+g*.4)*11)*.5+.5,m=bo(u*6,d*14,p*6,9,5),M=Math.min(.999,Math.max(0,x*.65+m*.5))*(r.length-1),S=r[Math.floor(M)],y=r[Math.min(r.length-1,Math.floor(M)+1)],C=M-Math.floor(M),w=(o*1024+c)*4;s.data[w]=S[0]+(y[0]-S[0])*C,s.data[w+1]=S[1]+(y[1]-S[1])*C,s.data[w+2]=S[2]+(y[2]-S[2])*C,s.data[w+3]=255}}n.putImageData(s,0,0);let a=new ni(e);return a.colorSpace=ke,a}function ur(i="rgba(255,255,255,1)",t="rgba(255,255,255,0.35)",e=128){let n=mn(e,e),s=n.getContext("2d"),r=s.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);r.addColorStop(0,i),r.addColorStop(.25,t),r.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=r,s.fillRect(0,0,e,e);let a=new ni(n);return a.colorSpace=ke,a}function vd(){let t=mn(128,128),e=t.getContext("2d"),n=e.createRadialGradient(128/2,128/2,0,128/2,128/2,128/2);n.addColorStop(0,"rgba(255,255,240,1)"),n.addColorStop(.3,"rgba(255,200,120,0.7)"),n.addColorStop(1,"rgba(255,120,40,0)"),e.fillStyle=n,e.fillRect(0,0,128,128),e.translate(128/2,128/2),e.fillStyle="rgba(255,240,200,0.9)";for(let r=0;r<6;r++)e.rotate(Math.PI/3),e.beginPath(),e.moveTo(0,-3),e.lineTo(128*.48,0),e.lineTo(0,3),e.fill();let s=new ni(t);return s.colorSpace=ke,s}function _d(){let i=mn(8,256),t=i.getContext("2d"),e=t.createLinearGradient(0,0,0,256);e.addColorStop(0,"rgba(255,255,255,0.9)"),e.addColorStop(.5,"rgba(255,255,255,0.3)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,8,256);let n=new ni(i);return n.colorSpace=ke,n}function yd(){let t=mn(64,64),e=t.getContext("2d"),n=e.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return n.addColorStop(0,"rgba(0,0,0,0.9)"),n.addColorStop(.35,"rgba(10,10,10,0.55)"),n.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=n,e.fillRect(0,0,64,64),new ni(t)}var gn=(i,t,e)=>new Mt(i,t,e),bi=gn(.35,2.4,3.2),Jr=gn(3.2,1.2,.25);function Un(i){return new xe({color:i,toneMapped:!1})}function Qx(i){let t=new Xi,e=new pt(new Si(30,24,16),new xe({color:726566,side:Ye}));t.add(e);let n=(a,o,l,c,h,u,d,p=0)=>{let g=new pt(new ve(a,o,l),new xe({color:c}));g.position.set(h,u,d),g.rotation.y=p,t.add(g)};n(14,.4,2,gn(10,10,11),0,14,0),n(2,.4,14,gn(10,10,11),6,14,0);for(let a=0;a<8;a++){let o=a/8*Math.PI*2;n(5,.5,.5,a%2?gn(.8,5,7):gn(7,2.5,.6),Math.cos(o)*22,6+a%3,Math.sin(o)*22,-o)}n(10,6,.3,gn(1.2,1.8,3),0,4,-24),n(.3,6,10,gn(3,1.4,.5),24,4,0);let s=new js(i),r=s.fromScene(t,.02);return s.dispose(),r.texture}function Md(i,t,e,n){let s={portals:[],anim:[],lights:{}},r=n.aniso,a=n.texSize;i.background=new Mt(329484),i.fog=new eo(726048,.016),i.environment=Qx(t),i.environmentIntensity=.7;let o=new pt(new Si(1500,32,16),new xe({map:gd(!n.mobile),side:Ye,depthWrite:!1,fog:!1}));o.renderOrder=-10,o.rotation.y=.6,i.add(o);let l=new P(-.55,.35,.6).normalize(),c=new de({uniforms:{map:{value:xd()},sunDir:{value:l}},vertexShader:`varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main(){ vUv=uv; vN=normalize(mat3(modelMatrix)*normal); vec4 wp=modelMatrix*vec4(position,1.0); vV=normalize(cameraPosition-wp.xyz); gl_Position=projectionMatrix*viewMatrix*wp; }`,fragmentShader:`uniform sampler2D map; uniform vec3 sunDir; varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main(){
        vec3 c = texture2D(map, vUv).rgb; c = pow(c, vec3(2.2));
        float l = clamp(dot(normalize(vN), sunDir)*1.1+0.08, 0.0, 1.0);
        float rim = pow(1.0 - max(dot(normalize(vN), vV), 0.0), 3.0);
        vec3 col = c * l * 1.7 + vec3(0.25,0.55,1.0) * rim * (0.25 + l * 1.2);
        gl_FragColor = vec4(col, 1.0);
      }`,fog:!1,depthWrite:!1}),h=new pt(new Si(340,48,32),c);h.position.set(-420,190,-880),h.rotation.y=1.2,h.rotation.z=.25,h.renderOrder=-9,i.add(h),s.anim.push(B=>{h.rotation.y=1.2+B*.004});let u=new ir(9416928,2761780,.85);i.add(u);let d=new vs(14674687,1.7);d.position.set(9,30,6),d.target.position.set(0,0,0),d.shadow.camera.left=-27,d.shadow.camera.right=27,d.shadow.camera.top=27,d.shadow.camera.bottom=-27,d.shadow.camera.near=5,d.shadow.camera.far=70,d.shadow.bias=-4e-4,d.shadow.normalBias=.04,i.add(d,d.target),s.lights.sun=d;let p=new ii(3524863,70,34,2);p.position.set(0,3.2,0);let g=new ii(16742954,40,24,2);g.position.set(-13,4.2,10);let x=new ii(10116351,36,24,2);x.position.set(13,4.2,-11),i.add(p,g,x);let m=new ii(16756832,0,14,2),f=new ii(16747066,0,26,2);i.add(m,f),Object.assign(s.lights,{reactorLight:p,warmLight:g,violetLight:x,muzzle:m,boom:f});let M=Eo({size:a,cols:4,rows:4,base:[82,93,110],seed:3,glowSeams:{chance:.22,color:"#35e0ff"},dirt:1}),S=Eo({size:a,cols:4,rows:2,base:[104,118,140],seed:8,glowSeams:null,dirt:.9,normalStrength:4}),y=Eo({size:Math.min(a,512),cols:2,rows:2,base:[128,134,146],seed:21,accent:{color:"rgba(227,178,28,0.9)"},dirt:1.2,normalStrength:4}),C=$r(M,[Me*2/8,Me*2/8],r),w=new ce({map:C.map,normalMap:C.normalMap,roughnessMap:C.roughnessMap,emissiveMap:C.emissiveMap,emissive:new Mt(.35,1,1.25),emissiveIntensity:1,metalness:.4,roughness:.9,envMapIntensity:1});w.normalScale.set(.9,.9);let R=new pt(new Br(Me+.2,80),w);R.rotation.x=-Math.PI/2,R.receiveShadow=!0,i.add(R);let I=B=>{let N=$r(S,B,r);return new ce({map:N.map,normalMap:N.normalMap,roughnessMap:N.roughnessMap,metalness:.35,roughness:.9,side:Ye,envMapIntensity:.9})},E=new pt(new sn(Me+.05,Me+.05,2.2,96,1,!0),I([Me*2*Math.PI/8,.55]));E.position.y=1.1,E.receiveShadow=!0;let v=new pt(new sn(Me+.05,Me+.05,1.8,96,1,!0),I([Me*2*Math.PI/8,.45]));v.position.y=Le-.9,i.add(E,v);let A=md(),D=new pt(new Br(Me+.2,64),new ce({map:A.map,emissiveMap:A.emissiveMap,emissive:new Mt(1,1,1),emissiveIntensity:1.4,metalness:.5,roughness:.6}));D.rotation.x=Math.PI/2,D.position.y=Le,i.add(D);let L=new Ln(Me,.07,6,160);for(let B of[2.2,7.2]){let N=new pt(L,Un(bi));N.rotation.x=Math.PI/2,N.position.y=B,i.add(N)}let V=$r(S,[1,2.2],r),$=new ce({map:V.map,normalMap:V.normalMap,roughnessMap:V.roughnessMap,metalness:.45,roughness:.8}),k=Un(bi),j=Un(Jr),q=new ve(1.7,Le,1.1),it=new ve(.22,5.2,.3),ot=new ve(.14,5.6,.06);for(let B=0;B<12;B++){let N=B/12*Math.PI*2+Math.PI/12,Z=new pt(q,$);Z.position.set(Math.cos(N)*(Me-.45),Le/2,Math.sin(N)*(Me-.45)),Z.rotation.y=-N+Math.PI/2,Z.receiveShadow=!0,i.add(Z);let tt=new pt(ot,B%2?j:k);tt.position.set(Math.cos(N)*(Me-1.02),4.5,Math.sin(N)*(Me-1.02)),tt.rotation.y=-N+Math.PI/2,i.add(tt);for(let nt of[-.33,.33]){let bt=N+nt*2*Math.PI/12*1,K=new pt(it,$);K.position.set(Math.cos(bt)*(Me-.1),4.7,Math.sin(bt)*(Me-.1)),K.rotation.y=-bt+Math.PI/2,i.add(K)}}let mt=pd();mt.wrapS=mt.wrapT=Dn,mt.repeat.set(10,1);let Ut=new pt(new ms(3.95,5,64),new ce({map:mt,metalness:.3,roughness:.7}));Ut.rotation.x=-Math.PI/2,Ut.position.y=.012,Ut.receiveShadow=!0,i.add(Ut);for(let[B,N]of[[10.5,.07],[16.8,.07],[22.8,.1]]){let Z=new pt(new ms(B,B+N,128),Un(bi));Z.rotation.x=-Math.PI/2,Z.position.y=.02,i.add(Z)}for(let B=0;B<8;B++){let N=B/8*Math.PI*2+Math.PI/8,Z=new pt(new Mi(.07,5.4),Un(bi));Z.rotation.x=-Math.PI/2,Z.rotation.z=-N+Math.PI/2,Z.position.set(Math.cos(N)*7.7,.022,Math.sin(N)*7.7),i.add(Z)}let Jt=new ce({color:2106926,metalness:.9,roughness:.35}),J=new ce({color:4871266,metalness:.85,roughness:.4}),st=new se,yt=new pt(new sn(3.7,4,.5,48),J);yt.position.y=.25,yt.castShadow=!0,yt.receiveShadow=!0;let at=new pt(new sn(2.6,3.2,.5,48),Jt);at.position.y=.72,at.castShadow=!0;let St=new pt(new Ln(3.45,.06,6,64),Un(bi));St.rotation.x=Math.PI/2,St.position.y=.52;let It=new ce({color:664624,emissive:new Mt(.15,1.2,1.9),emissiveIntensity:.9,roughness:.2,metalness:.2,transparent:!0,opacity:.88}),Ot=new pt(new sn(1.15,1.15,Le-1.4,32,1,!0),It);Ot.position.y=.95+(Le-1.4)/2;let he=new pt(new sn(.35,.35,Le-.9,16),Un(gn(.8,2.6,3.4)));he.position.y=(Le-.9)/2+.5,st.add(yt,at,St,Ot,he);let Yt=[];for(let B=0;B<4;B++){let N=new pt(new Ln(1.55+B%2*.25,.1,10,40),B%2?J:Jt);N.position.y=1.8+B*1.7,N.castShadow=!0,st.add(N),Yt.push(N);let Z=new pt(new Ln(1.55+B%2*.25,.035,6,40),Un(B%2?Jr:bi));N.add(Z)}for(let B=0;B<4;B++){let N=B/4*Math.PI*2+Math.PI/4,Z=new pt(new ve(.28,Le-1.2,.28),Jt);Z.position.set(Math.cos(N)*2.4,(Le-1.2)/2+.9,Math.sin(N)*2.4),Z.castShadow=!0,st.add(Z)}i.add(st),e.addCyl(0,0,3.95,Le),s.anim.push(B=>{Yt.forEach((N,Z)=>{N.rotation.x=Math.sin(B*.6+Z)*.35,N.rotation.y=B*(.5+Z*.2)*(Z%2?-1:1)}),It.emissiveIntensity=.85+Math.sin(B*3.1)*.15+Math.sin(B*7.3)*.06,p.intensity=66+Math.sin(B*3.1)*8});let pe=_d(),F=new xe({map:pe,color:gn(.045,.13,.17),transparent:!0,blending:Ze,depthWrite:!1,side:Mn,fog:!1,toneMapped:!1}),Xe=Un(gn(4,4.4,5));for(let B=0;B<6;B++){let N=B/6*Math.PI*2+Math.PI/6,Z=14,tt=new pt(new sn(.45,2.4,Le-.2,24,1,!0),F);tt.position.set(Math.cos(N)*Z,(Le-.2)/2+.1,Math.sin(N)*Z),i.add(tt);let nt=new pt(new sn(.55,.55,.12,20),Xe);nt.position.set(Math.cos(N)*Z,Le-.06,Math.sin(N)*Z),i.add(nt)}let Ht=new pt(new sn(3.4,4.3,Le,32,1,!0),new xe({map:pe,color:gn(.03,.12,.17),transparent:!0,blending:Ze,depthWrite:!1,side:Mn,fog:!1,toneMapped:!1}));Ht.position.y=Le/2,i.add(Ht);let kt=$r(y,[1,1],r),Pt=new ce({map:kt.map,normalMap:kt.normalMap,roughnessMap:kt.roughnessMap,metalness:.4,roughness:.85,envMapIntensity:1}),jt=new ce({map:mt.clone(),metalness:.3,roughness:.7});jt.map.repeat.set(3,.3),jt.map.needsUpdate=!0;let Tt=(B,N,Z,tt,nt,bt,K=Pt)=>{let lt=new pt(new Yi(Z,tt,nt,2,.06),K);return lt.position.set(B,tt/2,N),lt.rotation.y=bt,lt.castShadow=!0,lt.receiveShadow=!0,i.add(lt),e.addBox(B,N,Z/2,nt/2,bt,tt),lt};for(let B=0;B<6;B++){let N=B/6*Math.PI*2+Math.PI/6+.18,Z=Math.cos(N)*11.5,tt=Math.sin(N)*11.5,nt=Math.atan2(-Math.cos(N),-Math.sin(N));Tt(Z,tt,3.6,1.35,.8,nt);let bt=new pt(new ve(3.7,.08,.9),Un(B%2?Jr:bi));bt.position.set(Z,1.37,tt),bt.rotation.y=nt,i.add(bt);let K=new pt(new ve(3.64,.3,.84),jt);K.position.set(Z,.15,tt),K.rotation.y=nt,i.add(K)}for(let B=0;B<4;B++){let N=B/4*Math.PI*2+Math.PI/4,Z=Math.cos(N)*8.6,tt=Math.sin(N)*8.6,nt=N+.3,bt=Math.cos(nt),K=-Math.sin(nt);Tt(Z,tt,1.7,1.7,1.7,nt),Tt(Z+bt*1.75,tt+K*1.75,1.7,1.7,1.7,nt+.15),Tt(Z+bt*.4,tt+K*.4,1.4,1.4,1.4,nt-.2).position.y+=1.7,e.boxes[e.boxes.length-1].h=3.1,e.boxes[e.boxes.length-1].cx=Z+bt*.4,e.boxes[e.boxes.length-1].cz=tt+K*.4;let lt=new pt(new ve(1.5,.06,1.5),Un(B%2?bi:Jr));lt.position.set(Z+bt*.4,3.13,tt+K*.4),lt.rotation.y=nt-.2,i.add(lt)}let T=new ce({color:5924470,metalness:.6,roughness:.5});for(let B=0;B<6;B++){let N=B/6*Math.PI*2+Math.PI/6-.2,Z=Math.cos(N)*17,tt=Math.sin(N)*17,nt=new pt(new sn(.65,.8,Le,20),T);nt.position.set(Z,Le/2,tt),nt.castShadow=!0,nt.receiveShadow=!0,i.add(nt);for(let bt of[1,2.6,4.2,5.8,7.4]){let K=new pt(new Ln(.68,.035,6,24),Un(B%2?Jr:bi));K.rotation.x=Math.PI/2,K.position.set(Z,bt,tt),i.add(K)}e.addCyl(Z,tt,.8,Le)}let _=new ce({color:658448,metalness:.8,roughness:.4}),G=new ce({color:2764858,metalness:.9,roughness:.4}),Q=ur();for(let B=0;B<6;B++){let N=B/6*Math.PI*2,Z=new se;Z.position.set(Math.cos(N)*(Me-.05),0,Math.sin(N)*(Me-.05)),Z.rotation.y=-N-Math.PI/2;let tt=new pt(new ve(3.4,3.6,.3),_);tt.position.set(0,1.8,-.05);let nt=new pt(new ve(.35,3.8,.5),G);nt.position.set(-1.9,1.9,0);let bt=nt.clone();bt.position.x=1.9;let K=new pt(new ve(4.2,.4,.5),G);K.position.set(0,3.8,0);let lt=Un(gn(2.8,.25,.15)),Lt=new pt(new ve(3.2,.1,.1),lt);Lt.position.set(0,3.55,.28);let Nt=new xe({color:gn(.4,.05,.03),toneMapped:!1}),_t=new pt(new Mi(2.8,3.2),Nt);_t.position.set(0,1.8,.12);let Vt=new Yn(new zn({map:Q,color:gn(2.5,.35,.2),blending:Ze,depthWrite:!1,transparent:!0,opacity:0,toneMapped:!1}));Vt.position.set(0,1.8,.8),Vt.scale.set(6,5,1),Z.add(tt,nt,bt,K,Lt,_t,Vt),i.add(Z);let zt={pos:new P(Math.cos(N)*(Me-2.6),0,Math.sin(N)*(Me-2.6)),angle:N,glow:0,lampMat:lt,slitMat:Nt,sprite:Vt};s.portals.push(zt)}return s.anim.push((B,N)=>{for(let Z of s.portals){Z.glow=Math.max(0,Z.glow-N*.8);let tt=Z.glow>0?.5+.5*Math.sin(B*22):0;Z.sprite.material.opacity=Math.min(1,Z.glow)*(.55+tt*.45);let nt=.4+Math.min(1,Z.glow)*4*(.6+.4*tt);Z.slitMat.color.setRGB(.4*nt*.2,.05*nt*.2,.03*nt*.2),Z.lampMat.color.setRGB(2.8*(.35+Math.min(1,Z.glow)),.25,.15)}}),s.update=(B,N)=>{for(let Z of s.anim)Z(B,N)},s.setShadows=(B,N)=>{t.shadowMap.enabled=B,t.shadowMap.type=Hr,d.castShadow=B,B&&d.shadow.mapSize.x!==N&&(d.shadow.mapSize.set(N,N),d.shadow.map&&(d.shadow.map.dispose(),d.shadow.map=null)),i.traverse(Z=>{Z.material&&(Array.isArray(Z.material)?Z.material:[Z.material]).forEach(nt=>{nt.needsUpdate=!0})})},s}var jx=`
attribute float size; attribute vec4 pcolor;
uniform float uScale; varying vec4 vColor;
void main(){
  vColor = pcolor;
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  gl_PointSize = size * uScale / max(0.1,-mv.z);
  gl_Position = projectionMatrix * mv;
}`,tv=`
varying vec4 vColor;
void main(){
  vec2 p = gl_PointCoord - 0.5; float d = length(p)*2.0;
  float a = smoothstep(1.0, 0.0, d); a *= a;
  gl_FragColor = vec4(vColor.rgb, vColor.a * a);
  if (gl_FragColor.a < 0.003) discard;
}`,To=class{constructor(t,e,n){this.max=e,this.i=0,this.pos=new Float32Array(e*3),this.col=new Float32Array(e*4),this.size=new Float32Array(e),this.vel=new Float32Array(e*3),this.life=new Float32Array(e),this.maxLife=new Float32Array(e),this.s0=new Float32Array(e),this.s1=new Float32Array(e),this.c0=new Float32Array(e*4),this.c1=new Float32Array(e*4),this.grav=new Float32Array(e),this.drag=new Float32Array(e);let s=new $e;s.setAttribute("position",new Qe(this.pos,3).setUsage(po)),s.setAttribute("pcolor",new Qe(this.col,4).setUsage(po)),s.setAttribute("size",new Qe(this.size,1).setUsage(po)),this.uniforms={uScale:{value:800}},this.mat=new de({vertexShader:jx,fragmentShader:tv,uniforms:this.uniforms,transparent:!0,depthWrite:!1,blending:n?Ze:Oi}),this.points=new io(s,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=n?5:4,t.add(this.points)}emit(t,e,n,s,r,a,o,l,c,h,u,d=0,p=0){let g=this.i;this.i=(this.i+1)%this.max,this.pos[g*3]=t,this.pos[g*3+1]=e,this.pos[g*3+2]=n,this.vel[g*3]=s,this.vel[g*3+1]=r,this.vel[g*3+2]=a,this.life[g]=o,this.maxLife[g]=o,this.s0[g]=l,this.s1[g]=c;for(let x=0;x<4;x++)this.c0[g*4+x]=h[x],this.c1[g*4+x]=u[x];this.grav[g]=d,this.drag[g]=p}update(t){let{pos:e,vel:n,life:s,maxLife:r,s0:a,s1:o,c0:l,c1:c,col:h,size:u,grav:d,drag:p}=this;for(let x=0;x<this.max;x++){if(s[x]<=0){u[x]=0;continue}if(s[x]-=t,s[x]<=0){u[x]=0;continue}let m=1-s[x]/r[x],f=Math.max(0,1-p[x]*t);n[x*3]*=f,n[x*3+1]=n[x*3+1]*f-d[x]*t,n[x*3+2]*=f,e[x*3]+=n[x*3]*t,e[x*3+1]+=n[x*3+1]*t,e[x*3+2]+=n[x*3+2]*t,e[x*3+1]<.02&&d[x]>0&&(e[x*3+1]=.02,n[x*3+1]*=-.35,n[x*3]*=.7,n[x*3+2]*=.7),u[x]=a[x]+(o[x]-a[x])*m;for(let M=0;M<4;M++)h[x*4+M]=l[x*4+M]+(c[x*4+M]-l[x*4+M])*m}let g=this.points.geometry;g.attributes.position.needsUpdate=!0,g.attributes.pcolor.needsUpdate=!0,g.attributes.size.needsUpdate=!0}},wo=class{constructor(t,e){this.scene=t;let n=e.mobile;this.add=new To(t,n?500:900,!0),this.smoke=new To(t,n?120:220,!1),this.tracers=[];let s=new ve(1,1,1);for(let l=0;l<20;l++){let c=new pt(s,new xe({color:new Mt(1,1,1),blending:Ze,transparent:!0,depthWrite:!1,toneMapped:!1}));c.visible=!1,c.frustumCulled=!1,c.renderOrder=6,t.add(c),this.tracers.push({m:c,life:0,max:.1,w:.03})}this.ti=0;let r=yd();this.decalGeo=new Mi(1,1),this.decalMat=new xe({map:r,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,fog:!0}),this.decals=[];for(let l=0;l<(n?28:56);l++){let c=new pt(this.decalGeo,this.decalMat);c.visible=!1,t.add(c),this.decals.push(c)}this.di=0,this.debris=[];let a=new ve(1,1,1);this.debrisMats=[new ce({color:2764600,metalness:.8,roughness:.4}),new ce({color:5923440,metalness:.7,roughness:.5}),new ce({color:546,emissive:16734762,emissiveIntensity:2.5})];for(let l=0;l<(n?28:56);l++){let c=new pt(a,this.debrisMats[l%3]);c.visible=!1,c.castShadow=!n,t.add(c),this.debris.push({m:c,v:new P,rv:new P,life:0,max:1})}this.dbi=0,this.rings=[];let o=new ms(.8,1,40);for(let l=0;l<4;l++){let c=new pt(o,new xe({color:16777215,transparent:!0,opacity:0,blending:Ze,depthWrite:!1,side:Mn,toneMapped:!1}));c.rotation.x=-Math.PI/2,c.visible=!1,t.add(c),this.rings.push({m:c,life:0,max:.5,size:5})}this.ri=0,this.glowTex=ur(),this.flashes=[];for(let l=0;l<6;l++){let c=new Yn(new zn({map:this.glowTex,blending:Ze,depthWrite:!1,transparent:!0,toneMapped:!1}));c.visible=!1,t.add(c),this.flashes.push({s:c,life:0,max:.3,size:5})}this.fi=0}setScale(t,e){let n=t/(2*Math.tan(e*Math.PI/180/2));this.add.uniforms.uScale.value=n,this.smoke.uniforms.uScale.value=n}tracer(t,e,n,s=.025,r=.09){let a=this.tracers[this.ti];this.ti=(this.ti+1)%this.tracers.length;let o=t.distanceTo(e);a.m.position.copy(t).add(e).multiplyScalar(.5),a.m.lookAt(e),a.m.scale.set(s,s,o),a.m.material.color.copy(n),a.m.material.opacity=1,a.m.visible=!0,a.life=r,a.max=r,a.w=s,a.len=o}decal(t,e,n=.28){let s=this.decals[this.di];this.di=(this.di+1)%this.decals.length,s.position.copy(t).addScaledVector(e,.012),s.lookAt(t.x+e.x,t.y+e.y,t.z+e.z),s.rotateZ(Math.random()*6.28);let r=n*dt(.8,1.4);s.scale.set(r,r,r),s.visible=!0}sparks(t,e,n=8,s=!0){for(let r=0;r<n;r++){let a=dt(2,7);this.add.emit(t.x,t.y,t.z,e.x*a+dt(-2.5,2.5),e.y*a+dt(0,3),e.z*a+dt(-2.5,2.5),dt(.2,.5),.07,.01,s?[3,1.6,.5,1]:[.8,2.2,3,1],[1,.2,.05,0],14,1.2)}this.add.emit(t.x+e.x*.05,t.y+e.y*.05,t.z+e.z*.05,0,0,0,.08,.5,.2,s?[3,2.4,1.2,.9]:[1,2.5,3,.9],[1,1,1,0],0,0)}puff(t,e,n=3){for(let s=0;s<n;s++)this.smoke.emit(t.x,t.y,t.z,e.x*.8+dt(-.5,.5),e.y*.8+dt(0,.8),e.z*.8+dt(-.5,.5),dt(.5,.9),.25,.9,[.25,.27,.3,.3],[.1,.1,.12,0],-.4,1.5)}ring(t,e,n,s=.45){let r=this.rings[this.ri];this.ri=(this.ri+1)%this.rings.length,r.m.position.set(t.x,Math.max(.06,t.y),t.z),r.m.material.color.copy(e),r.size=n,r.life=s,r.max=s,r.m.visible=!0}flash(t,e,n,s=.25){let r=this.flashes[this.fi];this.fi=(this.fi+1)%this.flashes.length,r.s.position.copy(t),r.s.material.color.copy(e),r.size=n,r.life=s,r.max=s,r.s.visible=!0}explosion(t,e=1,n=[1,.5,.15]){let s=Math.round(26*e);for(let r=0;r<s;r++){let a=Math.random()*6.28,o=dt(-.3,1),l=dt(2,9)*e;this.add.emit(t.x,t.y,t.z,Math.cos(a)*l*(1-o*.5),o*l*1.1,Math.sin(a)*l*(1-o*.5),dt(.25,.7),dt(.5,1.1)*e,.1,[n[0]*4,n[1]*4,n[2]*4,1],[n[0],n[1]*.3,0,0],3,2.5)}for(let r=0;r<s;r++){let a=dt(3,12)*e;this.add.emit(t.x,t.y,t.z,dt(-1,1)*a,dt(0,1)*a,dt(-1,1)*a,dt(.4,.9),.09,.02,[3,2,.8,1],[1,.3,.05,0],16,.6)}for(let r=0;r<8*e;r++)this.smoke.emit(t.x+dt(-.4,.4),t.y+dt(-.2,.4),t.z+dt(-.4,.4),dt(-1.5,1.5),dt(.5,2.5),dt(-1.5,1.5),dt(1,1.8),.8*e,2.4*e,[.2,.2,.22,.5],[.05,.05,.06,0],-.3,1.2);this.flash(t,new Mt(n[0]*3,n[1]*3,n[2]*3),7*e,.3),this.ring(t,new Mt(n[0]*2,n[1]*2,n[2]*2),4.5*e,.45)}gibs(t,e,n=.2){for(let s=0;s<e;s++){let r=this.debris[this.dbi];this.dbi=(this.dbi+1)%this.debris.length,r.m.position.set(t.x+dt(-.3,.3),t.y+dt(-.3,.3),t.z+dt(-.3,.3)),r.m.scale.set(n*dt(.4,1.4),n*dt(.3,1),n*dt(.4,1.4)),r.v.set(dt(-5,5),dt(2,8),dt(-5,5)),r.rv.set(dt(-9,9),dt(-9,9),dt(-9,9)),r.life=r.max=dt(1.6,3),r.base=r.m.scale.clone(),r.m.visible=!0}}update(t){this.add.update(t),this.smoke.update(t);for(let e of this.tracers){if(!e.m.visible)continue;if(e.life-=t,e.life<=0){e.m.visible=!1;continue}let n=e.life/e.max;e.m.scale.set(e.w*n,e.w*n,e.len),e.m.material.opacity=n}for(let e of this.debris){if(!e.m.visible)continue;if(e.life-=t,e.life<=0){e.m.visible=!1;continue}e.v.y-=18*t,e.m.position.addScaledVector(e.v,t),e.m.rotation.x+=e.rv.x*t,e.m.rotation.y+=e.rv.y*t,e.m.rotation.z+=e.rv.z*t;let n=Math.hypot(e.m.position.x,e.m.position.z);n>23.3&&(e.m.position.x*=23.3/n,e.m.position.z*=23.3/n,e.v.x*=-.4,e.v.z*=-.4),e.m.position.y<.08&&(e.m.position.y=.08,e.v.y*=-.35,e.v.x*=.65,e.v.z*=.65,e.rv.multiplyScalar(.6));let s=Math.min(1,e.life/.5);e.m.scale.copy(e.base).multiplyScalar(s)}for(let e of this.rings){if(!e.m.visible)continue;if(e.life-=t,e.life<=0){e.m.visible=!1;continue}let n=1-e.life/e.max;e.m.scale.setScalar(.5+e.size*n),e.m.material.opacity=(1-n)*.9}for(let e of this.flashes){if(!e.s.visible)continue;if(e.life-=t,e.life<=0){e.s.visible=!1;continue}let n=e.life/e.max;e.s.scale.setScalar(e.size*(.6+(1-n)*.6)),e.s.material.opacity=n}}};var dr=(i,t,e)=>new Mt(i,t,e),Zi=[{id:"rifle",name:"PULSGEV\xC4R",rate:.095,dmg:15,pellets:1,mag:30,reserveMax:300,reserveStart:120,reload:1.45,spread:.004,bloom:.012,maxBloom:.035,kick:.5,shake:.05,color:dr(.5,2.6,3.4),kind:"hit"},{id:"shotgun",name:"HAGELKANON",rate:.82,dmg:11,pellets:10,mag:6,reserveMax:54,reserveStart:18,reload:2.1,spread:.055,bloom:0,maxBloom:0,kick:1.5,shake:.22,color:dr(3.2,1.6,.4),kind:"hit"},{id:"plasma",name:"PLASMAKANON",rate:.85,dmg:120,radius:4.6,pellets:1,mag:5,reserveMax:30,reserveStart:10,reload:2,spread:.002,bloom:0,maxBloom:0,kick:1.1,shake:.2,color:dr(3.4,1.2,.3),kind:"proj"}];function be(i,t,e,n,s,r,a,o){let l=new pt(new Yi(i,t,e,2,Math.min(i,t,e)*.25),n);return l.position.set(s,r,a),o.add(l),l}function ys(i,t,e,n,s,r,a,o,l=14){let c=new pt(new sn(i,t,e,l),n);return c.rotation.x=Math.PI/2,c.position.set(s,r,a),o.add(c),c}var Ao=class{constructor(t){this.scene=new Xi,this.scene.environment=t,this.scene.environmentIntensity=.9,this.camera=new ze(52,1,.02,10),this.scene.add(this.camera),this.scene.add(new ir(10466520,2761776,.9));let e=new vs(16777215,2.1);e.position.set(-1.5,2,1.2),this.scene.add(e);let n=new vs(3524863,1.3);n.position.set(2,.5,-1),this.scene.add(n),this.muzzleLight=new ii(16754768,0,3,2),this.scene.add(this.muzzleLight),this.metal=new ce({color:9147813,metalness:.75,roughness:.3}),this.dark=new ce({color:2764600,metalness:.7,roughness:.45}),this.glove=new ce({color:1777188,metalness:.2,roughness:.8}),this.cyan=new xe({color:dr(.4,2.4,3.2),toneMapped:!1}),this.orange=new xe({color:dr(3.2,1.2,.25),toneMapped:!1}),this.root=new se,this.camera.add(this.root),this.models=[this.buildRifle(),this.buildShotgun(),this.buildPlasma()],this.models.forEach(s=>{s.visible=!1,s.scale.setScalar(.82),this.root.add(s)}),this.flashMat=new zn({map:vd(),blending:Ze,depthWrite:!1,transparent:!0,toneMapped:!1,opacity:0}),this.flash=new Yn(this.flashMat),this.flash.scale.set(.35,.35,1),this.root.add(this.flash),this.ammo=Zi.map(s=>({mag:s.mag,reserve:s.reserveStart})),this.cur=0,this.cooldown=0,this.reloadT=0,this.swapT=0,this.swapTo=-1,this.kick=0,this.heat=0,this.flashT=0,this.sway={x:0,y:0},this.bob=0,this.pump=0,this.pumpAnim=0,this.dryT=0,this.xScale=1,this.show(0)}reset(){this.ammo=Zi.map(t=>({mag:t.mag,reserve:t.reserveStart})),this.cur=0,this.cooldown=0,this.reloadT=0,this.swapT=0,this.swapTo=-1,this.kick=0,this.heat=0,this.show(0)}show(t){this.models.forEach((e,n)=>{e.visible=n===t}),this.muzzle=this.models[t].userData.muzzle}hands(t,e=-.2){be(.075,.075,.15,this.glove,0,-.095,.1,t),be(.08,.07,.4,this.glove,.03,-.17,.32,t).rotation.x=-.35,be(.085,.075,.13,this.glove,-0,-.065,e,t),be(.09,.07,.42,this.glove,-.07,-.16,e+.28,t).rotation.set(-.3,-.3,0)}buildRifle(){let t=new se;return be(.075,.1,.5,this.metal,0,0,-.1,t),be(.05,.035,.42,this.dark,0,.07,-.1,t),be(.06,.07,.26,this.dark,0,0,-.45,t),ys(.017,.017,.32,this.metal,0,.005,-.7,t),ys(.026,.02,.06,this.dark,0,.005,-.87,t),be(.012,.012,.34,this.cyan,.039,.015,-.1,t),be(.012,.012,.34,this.cyan,-.039,.015,-.1,t),be(.052,.15,.075,this.dark,0,-.11,-.02,t).rotation.x=.12,be(.045,.12,.06,this.metal,0,-.1,.12,t).rotation.x=.35,be(.06,.09,.2,this.metal,0,-.01,.28,t),be(.03,.045,.07,this.dark,0,.1,-.26,t),be(.012,.012,.012,this.orange,0,.128,-.29,t),this.hands(t),t.userData.muzzle=new P(0,.005,-.9),t.userData.base=new P(.19,-.19,-.42),t}buildShotgun(){let t=new se;return be(.085,.11,.38,this.metal,0,0,-.02,t),ys(.03,.03,.72,this.metal,0,.025,-.58,t),ys(.024,.024,.55,this.dark,0,-.03,-.5,t),ys(.036,.03,.05,this.dark,0,.025,-.94,t),this.pumpMesh=be(.07,.07,.2,this.dark,0,-.045,-.5,t),be(.014,.014,.28,this.orange,.045,.01,-.02,t),be(.014,.014,.28,this.orange,-.045,.01,-.02,t),be(.05,.12,.07,this.dark,0,-.105,.06,t).rotation.x=.3,be(.07,.1,.28,this.metal,0,-.025,.28,t).rotation.x=.05,be(.02,.02,.1,this.orange,0,.065,-.2,t),this.hands(t,-.42),t.userData.muzzle=new P(0,.025,-.98),t.userData.base=new P(.19,-.19,-.4),t}buildPlasma(){let t=new se;be(.14,.15,.46,this.metal,0,0,-.1,t),be(.1,.05,.4,this.dark,0,.1,-.1,t),this.core=ys(.045,.045,.36,new xe({color:dr(3.2,1.3,.3),toneMapped:!1}),0,.045,-.12,t,12);let e=new pt(new sn(.075,.075,.38,16,1,!0),new ce({color:547,metalness:.5,roughness:.05,transparent:!0,opacity:.35}));e.rotation.x=Math.PI/2,e.position.set(0,.045,-.12),t.add(e),ys(.065,.09,.28,this.dark,0,0,-.52,t,16);for(let n=0;n<3;n++){let s=new pt(new Ln(.085+n*.006,.012,6,20),this.orange);s.position.set(0,0,-.44-n*.07),t.add(s)}for(let n=0;n<4;n++)be(.17,.012,.03,this.dark,0,.04-n*.03,.14+n%2*.01,t);return be(.05,.13,.07,this.dark,0,-.12,.06,t).rotation.x=.3,be(.075,.1,.24,this.metal,0,-.02,.3,t),this.hands(t,-.3),t.userData.muzzle=new P(0,0,-.7),t.userData.base=new P(.21,-.2,-.44),t}def(){return Zi[this.cur]}state(){return this.ammo[this.cur]}switchTo(t){return t===this.cur||t<0||t>=Zi.length||this.swapT>0?!1:(this.swapTo=t,this.swapT=.36,this.reloadT=0,!0)}cycle(t){this.switchTo((this.cur+t+Zi.length)%Zi.length)}startReload(t){let e=this.def(),n=this.state();return this.reloadT>0||this.swapT>0||n.mag>=e.mag||n.reserve<=0?!1:(this.reloadT=e.reload,t.reload(e.reload),!0)}addAmmo(t){let e=[50,6,3];Zi.forEach((n,s)=>{this.ammo[s].reserve=Math.min(n.reserveMax,this.ammo[s].reserve+e[s])})}totalAmmo(){return this.ammo.reduce((t,e)=>t+e.mag+e.reserve,0)}lowAmmo(){return Zi.every((t,e)=>this.ammo[e].reserve+this.ammo[e].mag<t.mag*1.2)}update(t,e,n,s,r,a,o){let l=this.def(),c=this.state();if(this.cooldown=Math.max(0,this.cooldown-t),this.heat=Math.max(0,this.heat-t*.55),this.kick=Math.max(0,this.kick-t*7),this.flashT=Math.max(0,this.flashT-t),this.dryT=Math.max(0,this.dryT-t),s.select>=0&&this.switchTo(s.select),s.swapDir&&this.cycle(s.swapDir),s.reload&&this.startReload(e.sfx),this.swapT>0){let y=this.swapT;this.swapT-=t,y>.18&&this.swapT<=.18&&(this.cur=this.swapTo,this.show(this.cur),e.sfx.swap(),e.onSwap&&e.onSwap()),this.swapT<=0&&(this.swapT=0)}if(this.reloadT>0&&(this.reloadT-=t,this.reloadT<=0)){this.reloadT=0;let y=l.mag-c.mag,C=Math.min(y,c.reserve);c.mag+=C,c.reserve-=C,e.onAmmo&&e.onAmmo()}if(n&&this.cooldown<=0&&this.swapT<=0&&this.reloadT<=0)if(c.mag<=0)c.reserve>0?this.startReload(e.sfx):this.dryT<=0&&(e.sfx.dry(),this.dryT=.35);else{c.mag--,this.cooldown=l.rate;let y=$t(r/6,0,1)*.012+(o?0:.015),C=l.spread+this.heat*l.maxBloom+y*(l.id==="plasma"?.3:1);this.heat=Math.min(1,this.heat+l.bloom/Math.max(.001,l.maxBloom||1)),this.kick=Math.min(1.3,this.kick+l.kick),this.flashT=l.id==="rifle"?.05:.09,this.flash.material.rotation=Math.random()*6.28,this.pumpAnim=l.id==="shotgun"?.5:0,e.fireWeapon(l,C,this.muzzle),c.mag===0&&c.reserve>0&&(this.cooldown=Math.max(this.cooldown,.18))}this.pumpAnim>0&&(this.pumpAnim-=t),this.bob+=t*(o?$t(r,0,8)*1.5:.5),this.sway.x=En(this.sway.x,$t(-a.x*.0012,-.05,.05),8,t),this.sway.y=En(this.sway.y,$t(a.y*.0012,-.05,.05),8,t);let h=this.models[this.cur],u=h.userData.base,d=$t(r/5,0,1.3),p=u.x*this.xScale+this.sway.x+Math.sin(this.bob)*.008*d,g=u.y+this.sway.y-Math.abs(Math.cos(this.bob))*.012*d,x=u.z+this.kick*.035,m=this.kick*.045,f=0,M=0;if(this.reloadT>0){let y=1-this.reloadT/l.reload,C=Math.sin(y*Math.PI);g-=C*.13,f+=C*.55,m-=C*.45,M+=C*.2}if(this.swapT>0){let y=this.swapT/.36,C=1-Math.abs(y-.5)*2;g-=C*.32,m-=C*.5}this.models[1].visible&&this.pumpMesh&&(this.pumpMesh.position.z=-.5+Math.sin($t(this.pumpAnim/.5,0,1)*Math.PI)*.13),h.position.set(p,g,x),h.rotation.set(m,M,f),this.core&&this.models[2].visible&&this.core.scale.setScalar(1+Math.sin(e.time*9)*.12+this.kick*.2);let S=this.muzzle;this.flash.position.set(h.position.x+S.x,h.position.y+S.y,h.position.z+S.z-.05),this.flashMat.opacity=this.flashT>0?1:0,this.flash.scale.setScalar(this.flashT>0?lh(.3,.55,Math.random())*(l.id==="rifle"?.8:1.4):.01),this.muzzleLight.position.copy(this.flash.position).z-=.1,this.muzzleLight.intensity=this.flashT>0?6:0}};var fr=(i,t,e)=>new Mt(i,t,e),Sd={},Kr=(i,t)=>Sd[i]||(Sd[i]=t()),$i={};function ev(){return $i.dark||($i.dark=new ce({color:3883600,metalness:.6,roughness:.5}),$i.mid=new ce({color:10792122,metalness:.5,roughness:.38}),$i.red=new xe({color:fr(2.4,.1,.06),toneMapped:!1}),$i.orange=new xe({color:fr(2.6,.9,.1),toneMapped:!1}),$i.cyan=new xe({color:fr(.4,2.4,3.2),toneMapped:!1})),$i}function te(i,t,e,n,s=0,r=0,a=0,o=null){let l=new pt(Kr(`b${i},${t},${e}`,()=>new Yi(i,t,e,2,Math.min(i,t,e)*.22)),n);return l.position.set(s,r,a),o&&o.add(l),l}var ch={drone:{name:"Dr\xF6nare",hp:38,speed:6.4,radius:.5,score:100,cost:1,height:1.9,spheres:[[0,0,0,.55,1]]},trooper:{name:"Soldat",hp:90,speed:3.5,radius:.5,score:200,cost:2,height:2,spheres:[[0,1.85,0,.27,2.2],[0,1.3,0,.44,1],[0,.55,0,.42,.8]]},brute:{name:"Bruten",hp:460,speed:2.7,radius:1,score:600,cost:6,height:3,spheres:[[0,2.6,.15,.4,2],[0,1.8,0,.9,1],[0,.8,0,.75,.8]]}},Qr=class{constructor(t,e,n,s){this.type=t;let r=ch[t];this.T=r;let a=1+(s-1)*.07;this.maxHp=Math.round(r.hp*a),this.hp=this.maxHp,this.radius=r.radius,this.pos=new P(e.pos.x,0,e.pos.z),this.yaw=Math.atan2(-e.pos.x,-e.pos.z),this.vel=new P,this.dead=!1,this.flash=0,this.spawnT=t==="brute"?1.3:.9,this.walk=dt(0,6),this.cd=dt(2,3.6),this.burst=0,this.burstT=0,this.telegraph=0,this.strafe=Math.random()<.5?1:-1,this.strafeT=dt(1.5,3.5),this.detour=Math.random()<.5?1:-1,this.pref=dt(8.5,13),this.state="walk",this.stateT=0,this.chargeCd=dt(2,5),this.dmgScale=1+(s-1)*.045,this.hover=dt(1.4,2.4),this.hoverPh=dt(0,6),this.stuck=0,this.hitSpheres=r.spheres,this.group=new se,this.parts={},this.build(n.castShadow),this.group.position.copy(this.pos),this.group.rotation.y=this.yaw,this.group.scale.setScalar(.3),n.scene.add(this.group),this.pos.y=t==="drone"?1:0}build(t){let e=ev();this.armor=e.mid.clone(),this.armor.emissive=new Mt(0,0,0);let n=this.armor,s=e.dark,r=this.group,a=this.parts;if(this.type==="drone"){let o=te(.36,.36,.36,e.dark,0,0,0,r);o.geometry=Kr("dsph",()=>new Si(.34,20,14)),o.material=n;let l=new pt(Kr("deye",()=>new Si(.17,14,10)),e.red);l.position.set(0,0,.26),r.add(l),a.eye=l;let c=new pt(Kr("dring",()=>new Ln(.5,.05,8,28)),n);c.rotation.x=Math.PI/2,r.add(c),a.ring=c;let h=new pt(Kr("dringg",()=>new Ln(.5,.015,6,28)),e.red);c.add(h);for(let u of[-1,1]){let d=te(.07,.34,.5,s,u*.42,0,-.05,r);d.rotation.z=u*.25;let p=te(.1,.1,.1,e.cyan,u*.42,-.22,-.2,r)}a.muzzle=new Ie,a.muzzle.position.set(0,-.05,.4),r.add(a.muzzle)}else if(this.type==="trooper"){a.legL=new se,a.legR=new se,a.legL.position.set(-.2,.95,0),a.legR.position.set(.2,.95,0);for(let c of[a.legL,a.legR]){te(.2,.5,.22,n,0,-.25,0,c);let h=new se;h.position.set(0,-.5,0),c.add(h),te(.17,.5,.2,s,0,-.22,.03,h),te(.22,.12,.34,n,0,-.47,.06,h),r.add(c)}a.torso=new se,a.torso.position.y=.95,r.add(a.torso),te(.62,.62,.36,n,0,.42,0,a.torso),te(.5,.24,.3,s,0,0,0,a.torso),te(.2,.2,.05,e.orange,0,.5,.2,a.torso),te(.84,.18,.4,n,0,.7,0,a.torso);let o=new se;o.position.set(0,.97,.02),a.torso.add(o),te(.3,.28,.3,n,0,0,0,o),te(.24,.07,.06,e.red,0,.02,.16,o),te(.04,.2,.04,s,.1,.22,-.05,o),te(.12,.2,.12,s,-.46,.55,0,a.torso),a.arm=new se,a.arm.position.set(.46,.62,0),a.torso.add(a.arm),te(.14,.14,.4,n,0,-.1,.18,a.arm),te(.12,.16,.7,s,0,-.1,.55,a.arm),te(.06,.06,.12,e.orange,0,-.1,.92,a.arm),a.muzzle=new Ie,a.muzzle.position.set(0,-.1,1),a.arm.add(a.muzzle);let l=new se;l.position.set(-.46,.62,0),a.torso.add(l),te(.13,.5,.15,s,0,-.25,.05,l),l.rotation.x=-.3,a.armL=l}else{a.legL=new se,a.legR=new se,a.legL.position.set(-.45,1.25,0),a.legR.position.set(.45,1.25,0);for(let l of[a.legL,a.legR])te(.5,.8,.5,n,0,-.4,0,l),te(.42,.7,.42,s,0,-.95,.04,l),te(.6,.2,.8,n,0,-1.2,.12,l),r.add(l);a.torso=new se,a.torso.position.y=1.2,r.add(a.torso),te(1.5,.9,.95,n,0,.65,0,a.torso),te(1.1,.5,.8,s,0,0,0,a.torso),te(.52,.52,.12,e.orange,0,.7,.5,a.torso),te(.3,.3,.1,e.red,0,.7,.57,a.torso),te(2.3,.45,1.05,n,0,1.2,0,a.torso);for(let l of[-1,1])te(.5,.4,.9,s,l*1.2,1.38,0,a.torso),te(.08,.08,.7,e.red,l*1.2,1.62,0,a.torso);let o=new se;o.position.set(0,1.7,.2),a.torso.add(o),te(.45,.38,.42,s,0,0,0,o),te(.36,.08,.06,e.red,0,.03,.22,o),a.armL=new se,a.armL.position.set(-1.25,1.1,0),a.torso.add(a.armL),a.armR=new se,a.armR.position.set(1.25,1.1,0),a.torso.add(a.armR);for(let l of[a.armL,a.armR])te(.42,.9,.42,n,0,-.45,0,l),te(.62,.6,.62,s,0,-1.1,.05,l),te(.5,.1,.5,e.red,0,-1.35,.05,l)}r.traverse(o=>{o.isMesh&&(o.castShadow=t,o.receiveShadow=!1)})}rayHit(t,e,n,s,r,a,o){let l=-1,c=1,h=this.type==="drone"?this.pos.y:this.pos.y;for(let u of this.hitSpheres){let d=this.pos.x+u[0],p=h+u[1],g=this.pos.z+u[2],x=d-t,m=p-e,f=g-n,M=x*s+m*r+f*a;if(M<0)continue;let S=x*x+m*m+f*f-M*M,y=u[3]*(this.type==="drone",1);if(S>y*y)continue;let C=M-Math.sqrt(y*y-S);C<0||C>o||(l<0||C<l)&&(l=C,c=u[4])}return l<0?null:[l,c]}center(t){let e=this.hitSpheres[Math.min(1,this.hitSpheres.length-1)];return t.set(this.pos.x+e[0],this.pos.y+e[1],this.pos.z+e[2])}damage(t){this.hp-=t,this.flash=.12,this.hp<=0&&(this.dead=!0)}fire(t,e,n,s,r,a){let o=t.player;this.parts.muzzle.getWorldPosition(t.tmpA);let l=t.tmpA,c=o.pos.x,h=o.pos.y+o.eye-.35,u=o.pos.z,d=Math.hypot(c-l.x,u-l.z),p=$t(d/n,0,1.2)*.5,g=t.tmpB.set(c+o.vx*p-l.x,h-l.y,u+o.vz*p-l.z).normalize(),x=(a?.03:.07)*(1-Math.min(.5,t.wave*.035));g.x+=dt(-x,x),g.y+=dt(-x,x)*.6,g.z+=dt(-x,x),g.normalize(),t.spawnBolt(l,g,n,e*this.dmgScale,s,r),t.fx.flash(l,s,1.6,.1),t.sfx.enemyShot(this.pos.x,this.pos.z,a),this.parts.arm&&(this.recoil=.12)}update(t,e){let n=e.player,s=this.pos.x,r=this.pos.z,a=n.pos.x-s,o=n.pos.z-r,l=Math.hypot(a,o)||.001,c=Math.atan2(a,o),h=this.type==="brute"?2.4:this.type==="drone"?7:5,u=this.state==="charge";if(this.yaw+=$t(fd(this.yaw,c),-h*t*(u?.35:1),h*t*(u?.35:1)),this.flash=Math.max(0,this.flash-t),this.recoil=Math.max(0,(this.recoil||0)-t),this.armor.emissive.setRGB(this.flash*9,this.flash*4.5,this.flash*3.5),this.spawnT>0){this.spawnT-=t;let k=1-Math.max(0,this.spawnT)/(this.type==="brute"?1.3:.9);this.group.scale.setScalar(.3+.7*Math.min(1,k*1.5));let j=this.T.speed*.45;this.pos.x+=Math.sin(this.yaw)*j*t,this.pos.z+=Math.cos(this.yaw)*j*t,this.type==="drone"&&(this.pos.y=En(this.pos.y,this.hover,3,t)),this.sync(t,e,.6);return}this.group.scale.setScalar(1);let d=this.type==="drone"?this.pos.y:this.pos.y+1.5,p=e.world.clear(s,d,r,n.pos.x,n.pos.y+n.eye,n.pos.z),g=a/l,x=o/l,m=-x*this.strafe,f=g*this.strafe,M=0,S=0,y=this.T.speed*(1+e.wave*.012);if(this.strafeT-=t,this.strafeT<=0&&(this.strafe*=-1,this.strafeT=dt(1.5,3.5)),this.type==="trooper")!p||l>this.pref+2.5?(M=g,S=x):l<this.pref-3?(M=-g*.8+m*.5,S=-x*.8+f*.5):(M=m*.7,S=f*.7,y*=.75),this.attack(t,e,p&&l<26,k=>{this.burst=3,this.burstT=0,this.cd=dt(2.4,4)/(1+k.wave*.035)},()=>{this.fire(e,7,22+e.wave*.5,fr(3.2,1,.25),.16,!1)});else if(this.type==="drone"){this.hoverPh+=t;let k=this.hover+Math.sin(this.hoverPh*1.7)*.35;this.pos.y=En(this.pos.y,k,3,t),!p||l>this.pref-1.5?(M=g+m*.4,S=x+f*.4):l<this.pref-4.5?(M=-g*.6+m,S=-x*.6+f):(M=m,S=f,y*=.8),this.attack(t,e,p&&l<24,j=>{this.burst=2,this.burstT=0,this.cd=dt(2.6,4.2)/(1+j.wave*.035)},()=>{this.fire(e,5,20+e.wave*.5,fr(3.4,.35,.3),.13,!1)})}else if(this.stateT-=t,this.chargeCd-=t,this.state==="walk")M=g,S=x,l<4?(this.state="slamWind",this.stateT=.75,e.sfx.roar(s,r)):this.chargeCd<=0&&p&&l>7&&l<22&&(this.state="chargeWind",this.stateT=.8,e.sfx.roar(s,r));else if(this.state==="chargeWind")y=0,this.flash=Math.max(this.flash,.03+.03*Math.sin(e.time*40)),this.stateT<=0&&(this.state="charge",this.stateT=1.25,this.cdx=g,this.cdz=x);else if(this.state==="charge"){let k=$t(1-2.2*t,0,1);this.cdx=this.cdx*k+g*(1-k),this.cdz=this.cdz*k+x*(1-k);let j=Math.hypot(this.cdx,this.cdz)||1;M=this.cdx/j,S=this.cdz/j,y=11.5,l<this.radius+.9?(e.hurtPlayer(26*this.dmgScale,this.pos,8),e.sfx.slam(s,r),this.state="recover",this.stateT=1.5,this.chargeCd=dt(6,9)):(this.stateT<=0||this.stuck>.25)&&(this.state="recover",this.stateT=.9,this.chargeCd=dt(5,8))}else if(this.state==="slamWind"){if(y=0,this.stateT<=0){this.state="recover",this.stateT=1.2,e.sfx.slam(s,r);let k=e.tmpA.set(s+Math.sin(this.yaw)*1.5,.1,r+Math.cos(this.yaw)*1.5);e.fx.ring(k,fr(3,1,.3),9,.5),e.fx.explosion(k,.45,[1,.5,.2]),e.shake(.35),Math.hypot(n.pos.x-s,n.pos.z-r)<5.2&&n.pos.y<1.2&&e.hurtPlayer(20*this.dmgScale,this.pos,10)}}else this.state==="recover"&&(y=.5,M=g,S=x,this.stateT<=0&&(this.state="walk"));for(let k of e.enemies){if(k===this||k.dead)continue;let j=s-k.pos.x,q=r-k.pos.z,it=Math.hypot(j,q),ot=this.radius+k.radius+.2;if(it<ot&&it>.001){let mt=(ot-it)/ot;M+=j/it*mt*1.6,S+=q/it*mt*1.6}}!p&&this.type!=="drone"&&this.stuck>.15&&(M+=-x*this.detour*1.4,S+=g*this.detour*1.4);let C=Math.hypot(M,S);C>1&&(M/=C,S/=C);let w=this.type==="drone"?7:10;this.vel.x=En(this.vel.x,M*y,w,t),this.vel.z=En(this.vel.z,S*y,w,t);let R=this.pos.x,I=this.pos.z;this.pos.x+=this.vel.x*t,this.pos.z+=this.vel.z*t;let E=this.type==="drone"?this.pos.y-.55:0;e.world.resolve(this.pos,this.radius,E);let v=this.pos.x-n.pos.x,A=this.pos.z-n.pos.z,D=Math.hypot(v,A),L=this.radius+.4;D<L&&D>.001&&!(this.type==="drone"&&this.pos.y>2.6)&&(this.pos.x=n.pos.x+v/D*L,this.pos.z=n.pos.z+A/D*L);let V=Math.hypot(this.pos.x-R,this.pos.z-I),$=Math.hypot(this.vel.x,this.vel.z)*t;$>.001&&V<$*.4?this.stuck+=t:this.stuck=Math.max(0,this.stuck-t*2),this.stuck>1.2&&(this.detour*=-1,this.stuck=.4),this.sync(t,e,Math.hypot(this.vel.x,this.vel.z))}attack(t,e,n,s,r){this.cd-=t,this.burst<=0?(n&&this.cd<=0&&(this.telegraph=.45,this.cd=99),this.telegraph>0&&(this.telegraph-=t,this.telegraph<=0&&s(e))):(this.burstT-=t,this.burstT<=0&&(r(),this.burst--,this.burstT=.2))}sync(t,e,n){let s=this.group,r=this.parts;s.position.copy(this.pos),s.rotation.y=this.yaw,this.walk+=t*n*(this.type==="brute"?1.5:2.4);let a=Math.sin(this.walk);if(this.type==="drone"){r.ring.rotation.z+=t*8,s.rotation.x=$t(this.vel.z*.03,-.3,.3)*0+Math.sin(this.hoverPh*2)*.05,s.rotation.z=Math.sin(this.hoverPh*1.3)*.08;let o=this.telegraph>0?1+3*Math.abs(Math.sin(e.time*30)):1;r.eye.scale.setScalar(o)}else if(this.type==="trooper"){let o=$t(n/3.5,0,1)*.8;r.legL.rotation.x=a*o,r.legR.rotation.x=-a*o,r.torso.position.y=.95+Math.abs(Math.cos(this.walk))*.03*o,r.torso.rotation.y=Math.sin(this.walk*.5)*.05*o;let l=this.telegraph>0||this.burst>0;r.arm.rotation.x=En(r.arm.rotation.x,l?-.05-(this.recoil?.18:0):.5,10,t),r.armL.rotation.x=-.3-a*.3*o}else{let o=$t(n/3,0,1)*.55;r.legL.rotation.x=a*o,r.legR.rotation.x=-a*o,r.torso.position.y=1.2+Math.abs(Math.cos(this.walk))*.07*o,r.torso.rotation.z=a*.05*o;let l=0;this.state==="slamWind"?l=-2.4*(1-Math.max(0,this.stateT)/.75):this.state==="chargeWind"?l=-.8:this.state==="charge"?l=-1.2:this.state==="recover"&&this.stateT>0&&(l=.2),r.armL.rotation.x=En(r.armL.rotation.x,l+a*.4*o,12,t),r.armR.rotation.x=En(r.armR.rotation.x,l-a*.4*o,12,t)}}dispose(t){t.remove(this.group),this.armor.dispose()}};var ut={isTouch:!1,mx:0,my:0,lookX:0,lookY:0,fire:!1,sprint:!1,jump:!1,reload:!1,swapDir:0,select:-1,pause:!1,locked:!1},Tn=new Set,Co=null,bd=null,Ms=null;function hh(){return window.matchMedia&&matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>1||"ontouchstart"in window}function Ed(i,t,e){Co=i,bd=t,Ms=e,ut.isTouch=hh(),window.addEventListener("keydown",n=>{if(n.repeat)return;let s=n.code;Tn.add(s),s==="Space"?(ut.jump=!0,n.preventDefault()):s==="KeyR"?ut.reload=!0:s==="KeyQ"?ut.swapDir=-1:s==="KeyE"?ut.swapDir=1:s==="Digit1"?ut.select=0:s==="Digit2"?ut.select=1:s==="Digit3"?ut.select=2:s==="KeyP"&&Ms&&Ms(),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].includes(s)&&n.preventDefault()}),window.addEventListener("keyup",n=>Tn.delete(n.code)),window.addEventListener("blur",()=>{Tn.clear(),ut.fire=!1}),document.addEventListener("mousemove",n=>{ut.locked&&(ut.lookX+=$t(n.movementX||0,-120,120),ut.lookY+=$t(n.movementY||0,-120,120))}),document.addEventListener("mousedown",n=>{n.button===0&&ut.locked&&(ut.fire=!0,n.preventDefault())}),document.addEventListener("mouseup",n=>{n.button===0&&(ut.fire=!1)}),document.addEventListener("wheel",n=>{ut.locked&&(ut.swapDir=n.deltaY>0?1:-1)},{passive:!0}),document.addEventListener("contextmenu",n=>n.preventDefault()),document.addEventListener("pointerlockchange",()=>{ut.locked=document.pointerLockElement===Co,ut.locked||(ut.fire=!1,Ms&&Ms(!0))}),["gesturestart","gesturechange","gestureend"].forEach(n=>document.addEventListener(n,s=>s.preventDefault())),nv()}function uh(){if(!ut.isTouch)try{let i=Co.requestPointerLock&&Co.requestPointerLock();i&&i.catch&&i.catch(()=>{})}catch{}}function Po(){document.pointerLockElement&&document.exitPointerLock()}function Td(){let i=0,t=0;if((Tn.has("KeyW")||Tn.has("ArrowUp"))&&(t+=1),(Tn.has("KeyS")||Tn.has("ArrowDown"))&&(t-=1),(Tn.has("KeyD")||Tn.has("ArrowRight"))&&(i+=1),(Tn.has("KeyA")||Tn.has("ArrowLeft"))&&(i-=1),i||t){let e=Math.hypot(i,t);ut.mx=i/e,ut.my=t/e}else qt.stickId===null&&(ut.mx=0,ut.my=0);ut.sprint=Tn.has("ShiftLeft")||Tn.has("ShiftRight")||qt.autoSprint}function wd(){let i={x:ut.lookX,y:ut.lookY};return ut.lookX=0,ut.lookY=0,i}function Ad(){let i={jump:ut.jump,reload:ut.reload,swapDir:ut.swapDir,select:ut.select};return ut.jump=!1,ut.reload=!1,ut.swapDir=0,ut.select=-1,i}function jr(){Tn.clear(),ut.fire=!1,ut.mx=0,ut.my=0,ut.lookX=0,ut.lookY=0,ut.jump=ut.reload=!1,ut.swapDir=0,ut.select=-1,qt.stickId=null,qt.lookId=null,qt.fireId=null,qt.autoSprint=!1,Ei&&Ei.classList.remove("active"),pr&&(pr.style.transform=""),document.querySelectorAll("#touch .tbtn.down").forEach(i=>i.classList.remove("down"))}var qt={stickId:null,lookId:null,fireId:null,ox:0,oy:0,lx:0,ly:0,autoSprint:!1},Ei,pr,Ro=62;function nv(){Ei=document.getElementById("stickBase"),pr=document.getElementById("stickKnob");let i=bd,t={passive:!1};i.addEventListener("touchstart",n=>{n.preventDefault();for(let s of n.changedTouches){let r=s.target.closest?s.target.closest("[data-btn]"):null;if(r){let a=r.dataset.btn;r.classList.add("down"),a==="fire"?(ut.fire=!0,qt.fireId=s.identifier,qt.lx=s.clientX,qt.ly=s.clientY):a==="jump"?ut.jump=!0:a==="reload"?ut.reload=!0:a==="swap"?ut.swapDir=1:a==="pause"&&(Ms&&Ms(),r.classList.remove("down"));continue}s.clientX<window.innerWidth*.46&&qt.stickId===null?(qt.stickId=s.identifier,qt.ox=s.clientX,qt.oy=s.clientY,Ei.style.left=s.clientX+"px",Ei.style.top=s.clientY+"px",Ei.classList.add("active"),pr.style.transform="translate(-50%,-50%)"):qt.lookId===null&&(qt.lookId=s.identifier,qt.lx=s.clientX,qt.ly=s.clientY)}},t),i.addEventListener("touchmove",n=>{n.preventDefault();for(let s of n.changedTouches)if(s.identifier===qt.stickId){let r=s.clientX-qt.ox,a=s.clientY-qt.oy,o=Math.hypot(r,a);if(o>Ro){let d=(o-Ro)/o;qt.ox+=r*d,qt.oy+=a*d,Ei.style.left=qt.ox+"px",Ei.style.top=qt.oy+"px",r=s.clientX-qt.ox,a=s.clientY-qt.oy}let l=r/Ro,c=a/Ro,h=.12,u=Math.hypot(l,c);if(u<h)ut.mx=0,ut.my=0,qt.autoSprint=!1;else{let d=(u-h)/(1-h);ut.mx=l/u*$t(d,0,1),ut.my=-c/u*$t(d,0,1),qt.autoSprint=-c/u>.55&&d>.97}pr.style.transform=`translate(calc(-50% + ${r}px), calc(-50% + ${a}px))`}else(s.identifier===qt.lookId||s.identifier===qt.fireId)&&(ut.lookX+=s.clientX-qt.lx,ut.lookY+=s.clientY-qt.ly,qt.lx=s.clientX,qt.ly=s.clientY)},t);let e=n=>{n.preventDefault();for(let r of n.changedTouches)r.identifier===qt.stickId&&(qt.stickId=null,ut.mx=0,ut.my=0,qt.autoSprint=!1,ut.sprint=!1,Ei.classList.remove("active"),pr.style.transform=""),r.identifier===qt.lookId&&(qt.lookId=null),r.identifier===qt.fireId&&(qt.fireId=null,ut.fire=!1);let s=new Set;for(let r of n.touches){let a=r.target.closest&&r.target.closest("[data-btn]");a&&s.add(a)}i.querySelectorAll(".tbtn.down").forEach(r=>{s.has(r)||r.classList.remove("down")})};i.addEventListener("touchend",e,t),i.addEventListener("touchcancel",e,t)}var Dt=null,Ki,ea,Qi,Ji,na,Io=!!an("muted"),dh=an("music")!==!1,fh=0,iv=null,ta=0,Rd=0,Ti={x:0,z:0,yaw:0};function Id(i,t,e){Ti.x=i,Ti.z=t,Ti.yaw=e}function ph(){if(Dt){Dt.state==="suspended"&&Dt.resume();return}try{navigator.audioSession&&(navigator.audioSession.type="playback"),Dt=new(window.AudioContext||window.webkitAudioContext)}catch{return}Ji=Dt.createDynamicsCompressor(),Ji.threshold.value=-14,Ji.ratio.value=6,Ji.attack.value=.003,Ji.release.value=.2,Ki=Dt.createGain(),Ki.gain.value=Io?0:.9,ea=Dt.createGain(),ea.gain.value=.9,Qi=Dt.createGain(),Qi.gain.value=0,ea.connect(Ji),Qi.connect(Ji),Ji.connect(Ki),Ki.connect(Dt.destination),na=Dt.createBuffer(1,Dt.sampleRate*2,Dt.sampleRate);let i=na.getChannelData(0);for(let t=0;t<i.length;t++)i[t]=Math.random()*2-1;sv(),ov()}function ia(){return Io}function Do(i){Io=i,an("muted",i),Ki&&Ki.gain.setTargetAtTime(i?0:.9,Dt.currentTime,.05)}function Dd(){return dh}function Ld(i){dh=i,an("music",i),Ud()}function ji(i){fh=i,Ud()}function Ud(){Qi&&Qi.gain.setTargetAtTime(dh?.1+.32*fh:0,Dt.currentTime,.4)}function Nd(){Dt&&Dt.state==="running"&&Dt.suspend()}function Lo(){Dt&&Dt.state==="suspended"&&Dt.resume()}function mr(i,t,e=1){if(i===void 0)return{pan:0,vol:e};let n=i-Ti.x,s=t-Ti.z,r=Math.hypot(n,s),a=-Math.sin(Ti.yaw),o=-Math.cos(Ti.yaw),l=Math.cos(Ti.yaw),c=-Math.sin(Ti.yaw);return{pan:r>.01?Math.max(-1,Math.min(1,(n*l+s*c)/r))*.8:0,vol:e/(1+r*.12)}}function we(i,t){let e=Dt.createGain();if(e.gain.value=t,Dt.createStereoPanner){let n=Dt.createStereoPanner();n.pan.value=i,e.connect(n),n.connect(ea)}else e.connect(ea);return e}function Je(i,t,e,n,s,r,a=0){let o=Dt.createBufferSource();o.buffer=na,o.loop=!0;let l=Dt.createBiquadFilter();l.type=t,l.Q.value=s;let c=Dt.currentTime+a;l.frequency.setValueAtTime(e,c),l.frequency.exponentialRampToValueAtTime(Math.max(20,n),c+i);let h=Dt.createGain();h.gain.setValueAtTime(1e-4,c),h.gain.exponentialRampToValueAtTime(1,c+.004),h.gain.exponentialRampToValueAtTime(1e-4,c+i),o.connect(l),l.connect(h),h.connect(r),o.start(c,Math.random()*1.5),o.stop(c+i+.05)}function Qt(i,t,e,n,s,r=1,a=0,o=.004){let l=Dt.createOscillator();l.type=i;let c=Dt.currentTime+a;l.frequency.setValueAtTime(t,c),l.frequency.exponentialRampToValueAtTime(Math.max(20,e),c+n);let h=Dt.createGain();h.gain.setValueAtTime(1e-4,c),h.gain.exponentialRampToValueAtTime(r,c+o),h.gain.exponentialRampToValueAtTime(1e-4,c+n),l.connect(h),h.connect(s),l.start(c),l.stop(c+n+.05)}var Ae=()=>Dt&&Dt.state==="running"&&!Io,Ue={rifle(){if(!Ae())return;let i=we(0,.55);Je(.11,"bandpass",2600,500,.8,i),Qt("square",220,60,.09,i,.5),Qt("sine",140,45,.12,i,.9)},shotgun(){if(!Ae())return;let i=we(0,.9);Je(.35,"lowpass",3200,160,.7,i),Qt("sine",120,35,.3,i,1.2),Je(.08,"highpass",4e3,3e3,1,i)},plasma(){if(!Ae())return;let i=we(0,.6);Qt("sawtooth",1100,140,.35,i,.5),Qt("sine",90,40,.3,i,1.1),Je(.2,"bandpass",3e3,400,1.2,i,0)},dry(){if(!Ae())return;let i=we(0,.3);Qt("square",900,700,.04,i,.4)},reload(i=1.5){if(!Ae())return;let t=we(0,.5);Qt("square",500,300,.05,t,.5,.15),Je(.08,"highpass",2500,2e3,1,t,.15),Qt("square",380,560,.06,t,.5,i*.6),Je(.1,"highpass",2e3,1500,1,t,i*.6),Qt("square",700,260,.07,t,.6,i*.92)},swap(){if(!Ae())return;let i=we(0,.35);Je(.07,"bandpass",1800,900,2,i),Qt("square",300,200,.05,i,.4)},hit(i){if(!Ae())return;let t=we(0,.45);Qt("sine",i?1900:1200,i?1500:900,.07,t,.8),i&&Qt("sine",2600,2200,.09,t,.5,.03)},kill(){if(!Ae())return;let i=we(0,.5);Qt("triangle",700,1500,.15,i,.8),Qt("sine",1400,2100,.2,i,.5,.06)},enemyShot(i,t,e){if(!Ae())return;let n=mr(i,t,.5),s=we(n.pan,n.vol);Qt("sawtooth",e?500:800,180,.18,s,.6),Je(.1,"bandpass",2e3,600,1,s)},enemyDie(i,t,e){if(!Ae())return;let n=mr(i,t,e?1:.7),s=we(n.pan,n.vol);Je(e?.7:.4,"lowpass",2400,90,.8,s),Qt("sine",e?90:160,30,e?.6:.3,s,1),Qt("square",600,100,.25,s,.3)},explosion(i,t,e=1){if(!Ae())return;let n=mr(i,t,e),s=we(n.pan,n.vol);Je(1,"lowpass",1800,50,.7,s),Qt("sine",80,24,.9,s,1.5),Je(.2,"highpass",3500,1500,1,s)},hurt(){if(!Ae())return;let i=we(0,.7);Qt("sawtooth",220,70,.25,i,.7),Je(.2,"lowpass",900,150,1,i)},shieldBreak(){if(!Ae())return;let i=we(0,.6);Qt("sawtooth",900,120,.45,i,.6),Qt("square",1500,300,.3,i,.3)},shieldUp(){if(!Ae())return;let i=we(0,.3);Qt("sine",300,900,.5,i,.6)},pickup(i){if(!Ae())return;let t=we(0,.5),e=i==="health"?520:760;Qt("triangle",e,e*1.5,.12,t,.7),Qt("triangle",e*1.5,e*2,.16,t,.7,.08)},step(i){if(!Ae())return;let t=we(dt(-.1,.1),i?.2:.14);Je(.06,"lowpass",600,200,1,t),Qt("sine",90,50,.07,t,.6)},jump(){if(!Ae())return;let i=we(0,.2);Je(.12,"lowpass",500,200,1,i)},land(){if(!Ae())return;let i=we(0,.3);Je(.1,"lowpass",500,120,1,i),Qt("sine",100,40,.12,i,.8)},waveStart(){if(!Ae())return;let i=we(0,.5);for(let t=0;t<3;t++)Qt("sawtooth",320,520,.28,i,.4,t*.34),Qt("square",160,260,.28,i,.3,t*.34)},waveClear(){if(!Ae())return;let i=we(0,.5);[523,659,784,1047].forEach((t,e)=>Qt("triangle",t,t,.35,i,.6,e*.1))},spawn(i,t){if(!Ae())return;let e=mr(i,t,.6),n=we(e.pan,e.vol);Qt("sawtooth",120,500,.5,n,.35),Je(.4,"bandpass",400,2e3,2,n)},slam(i,t){if(!Ae())return;let e=mr(i,t,1),n=we(e.pan,e.vol);Qt("sine",70,24,.5,n,1.4),Je(.4,"lowpass",900,80,1,n)},roar(i,t){if(!Ae())return;let e=mr(i,t,.9),n=we(e.pan,e.vol);Qt("sawtooth",90,55,.6,n,.7),Qt("square",70,45,.6,n,.4)},ui(){if(!Ae())return;let i=we(0,.4);Qt("triangle",660,990,.09,i,.6)},death(){if(!Ae())return;let i=we(0,.8);Qt("sawtooth",300,30,1.6,i,.8),Je(1.4,"lowpass",1200,40,1,i)}};function sv(){let i=Dt.createGain();i.gain.value=.07,i.connect(Ki);let t=Dt.createBiquadFilter();t.type="lowpass",t.frequency.value=220,t.connect(i);for(let o of[55,55.4,82.5]){let l=Dt.createOscillator();l.type="sawtooth",l.frequency.value=o,l.connect(t),l.start()}let e=Dt.createOscillator();e.frequency.value=.12;let n=Dt.createGain();n.gain.value=90,e.connect(n),n.connect(t.frequency),e.start();let s=Dt.createBufferSource();s.buffer=na,s.loop=!0;let r=Dt.createBiquadFilter();r.type="bandpass",r.frequency.value=900,r.Q.value=.5;let a=Dt.createGain();a.gain.value=.012,s.connect(r),r.connect(a),a.connect(Ki),s.start()}var rv=[45,45,45,45,41,41,43,43],av=[57,60,64,67,64,60,69,67,57,60,64,67,65,64,62,60],Cd=i=>440*Math.pow(2,(i-69)/12);function ov(){ta=Dt.currentTime+.1;let i=60/112/4;iv=setInterval(()=>{if(!Dt||Dt.state!=="running"){ta=Dt?Dt.currentTime+.1:0;return}for(;ta<Dt.currentTime+.25;)lv(Rd,ta),ta+=i,Rd++},60)}function Pd(i,t,e,n,s,r){let a=Dt.createOscillator();a.type=i,a.frequency.value=t;let o=Dt.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(r,e),o.frequency.exponentialRampToValueAtTime(Math.max(80,r*.25),e+n);let l=Dt.createGain();l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(s,e+.01),l.gain.exponentialRampToValueAtTime(1e-4,e+n),a.connect(o),o.connect(l),l.connect(Qi),a.start(e),a.stop(e+n+.05)}function lv(i,t){let e=i>>4&7,n=i&15;if(n%2===0&&Pd("sawtooth",Cd(rv[e]-12+(n%8===6?12:0)),t,.22,.5,600),(fh>.5||n%4===0)&&Pd("square",Cd(av[n]+(e>=4?-2:0)),t,.14,.16,2400),n%4===0){let s=Dt.createOscillator();s.frequency.setValueAtTime(140,t),s.frequency.exponentialRampToValueAtTime(40,t+.12);let r=Dt.createGain();r.gain.setValueAtTime(.9,t),r.gain.exponentialRampToValueAtTime(1e-4,t+.15),s.connect(r),r.connect(Qi),s.start(t),s.stop(t+.2)}if(n%2===1){let s=Dt.createBufferSource();s.buffer=na;let r=Dt.createBiquadFilter();r.type="highpass",r.frequency.value=7e3;let a=Dt.createGain();a.gain.setValueAtTime(.18,t),a.gain.exponentialRampToValueAtTime(1e-4,t+.04),s.connect(r),r.connect(a),a.connect(Qi),s.start(t,Math.random()),s.stop(t+.06)}}var ft=i=>document.getElementById(i),oa=(i,t,e)=>new Mt(i,t,e),Ke=hh();document.body.classList.toggle("touch",Ke);var hv=navigator.userAgent,uv=/iPad|iPhone|iPod/.test(hv)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,dv=window.navigator.standalone===!0||matchMedia("(display-mode: fullscreen)").matches||matchMedia("(display-mode: standalone)").matches,Hd=(navigator.hardwareConcurrency||8)<=4,bs=[{name:"L\xE5g",bloom:!1,ao:!1,finish:!1,shadows:!1,shadowSize:0,samples:0,prCap:Ke?1:1.25},{name:"Medel",bloom:!0,ao:!1,finish:!0,shadows:!0,shadowSize:1024,samples:Ke?0:2,prCap:Ke?1.5:1.75},{name:"H\xF6g",bloom:!0,ao:!Ke,finish:!0,shadows:!0,shadowSize:2048,samples:4,prCap:2}],Ne={quality:an("quality")??"auto",sens:an("sens")??1,autoFire:an("autoFire")??!0,assist:an("assist")??!0},kn=Ne.quality==="auto"?Ke||Hd?1:2:$t(+Ne.quality,0,2),ai=1,Vd=ft("c"),cn=new to({canvas:Vd,antialias:!0,powerPreference:"high-performance",stencil:!1});cn.toneMapping=Vr;cn.toneMappingExposure=1.05;cn.autoClear=!1;cn.shadowMap.type=Hr;var vn=new Xi,An=new ze(72,1,.08,2600);An.rotation.order="YXZ";vn.add(An);var Gd={mobile:Ke,aniso:Math.min(Ke?4:8,cn.capabilities.getMaxAnisotropy()),texSize:Ke?512:1024},ln=new So,hn=Md(vn,cn,ln,Gd),We=new wo(vn,Gd),_e=new Ao(vn.environment),on=null,Fd=null,Wd=null,gr=null,vr=null;function fv(){on&&(on.dispose(),on=null);let i=bs[kn];if(!i.bloom)return;let t=new Be(4,4,{type:rn,samples:i.samples});on=new xo(cn,t),on.addPass(new Wr(vn,An)),vr=null,i.ao&&(vr=ud(vn,An,innerWidth,innerHeight),on.addPass(vr));let e=new Wr(_e.scene,_e.camera);e.clear=!1,e.clearDepth=!0,on.addPass(e),Wd=e,Fd=new cr(new Et(256,256),Ke?.28:.34,.4,1),on.addPass(Fd),on.addPass(new vo),gr=null,i.finish&&(gr=hd(),gr.uniforms.grain.value=Ke?.025:.035,on.addPass(gr)),Xd()}function Xd(){on&&(on.setPixelRatio(ko),on.setSize(innerWidth,innerHeight))}var ko=1;function yr(){let i=innerWidth,t=innerHeight;ko=Math.max(.5,Math.min(devicePixelRatio||1,bs[kn].prCap)*ai),cn.setPixelRatio(ko),cn.setSize(i,t,!1);let e=i/t,n=$t(2*Math.atan(Math.tan(100*Math.PI/360)/e)*180/Math.PI,62,98);An.fov=n,An.aspect=e,An.updateProjectionMatrix(),_e.camera.aspect=e,_e.camera.fov=$t(2*Math.atan(Math.tan(31*Math.PI/180)/e)*180/Math.PI,46,78),_e.camera.updateProjectionMatrix(),_e.xScale=$t(e/1.7,.5,1),We.setScale(t*ko,n),Xd();let s=Ke&&i<640&&t>i*1.1;ft("rotate").classList.toggle("show",s&&ie!=="loading"),s&&ie==="playing"&&xr(!0)}function aa(){let i=bs[kn];hn.setShadows(i.shadows,i.shadowSize),fv(),yr()}var ie="loading",H={pos:new P(0,0,11),vx:0,vz:0,vy:0,yaw:0,pitch:0,eye:1.7,hp:100,maxHp:100,shield:50,maxShield:50,lastHurt:-99,onGround:!0,alive:!0,bobT:0,stepD:0,recoilVis:0,deadT:0,lowFired:!1},Ft={score:0,kills:0,headshots:0,shots:0,hits:0,wave:0,combo:0,comboT:0,best:an("best")||{score:0,wave:0},time:0,started:0},fe={phase:"idle",timer:0,queue:[],spawnT:0,alive:0},Fe=[],un=0;var Ss=0,xh=0,_r=0,De=new P,wn=new P,$n=new P,xn=new P,Mr=new P,Wo=new P,vh=new P,pv=oa(.6,2.6,3.2),li={scene:vn,world:ln,fx:We,sfx:Ue,player:H,enemies:Fe,wave:1,time:0,tmpA:De,tmpB:wn,castShadow:bs[kn].shadows,spawnBolt:(i,t,e,n,s,r)=>Yd(i,t,e,n,s,r,0),hurtPlayer:(i,t,e)=>Mh(i,t,e),shake:i=>{un=Math.max(un,i)},fireWeapon:(i,t,e)=>gv(i,t,e),onAmmo:()=>Sr(!0),onSwap:()=>Sr(!0)},qd=ur(),la=[];for(let i=0;i<48;i++){let t=new Yn(new zn({map:qd,blending:Ze,depthWrite:!1,transparent:!0,toneMapped:!1}));t.visible=!1,vn.add(t),la.push({s:t,active:!1,pos:new P,vel:new P,dmg:0,life:0,kind:0,size:.5,def:null})}function Yd(i,t,e,n,s,r,a,o){let l=la.find(c=>!c.active);l&&(l.active=!0,l.kind=a,l.dmg=n,l.life=a?3:4,l.size=r,l.def=o||null,l.pos.copy(i),l.vel.copy(t).multiplyScalar(e),l.s.material.color.copy(s),l.s.scale.setScalar(r*3.2),l.s.position.copy(i),l.s.visible=!0)}function Uo(i,t,e,n,s,r){let a=t.x-i.x,o=t.y-i.y,l=t.z-i.z,c=a*a+o*o+l*l,h=c>0?((e-i.x)*a+(n-i.y)*o+(s-i.z)*l)/c:0;h=$t(h,0,1);let u=i.x+a*h-e,d=i.y+o*h-n,p=i.z+l*h-s;return u*u+d*d+p*p<=r*r?h:-1}function mv(i){for(let t of la){if(!t.active)continue;t.life-=i,$n.copy(t.pos),xn.copy(t.pos).addScaledVector(t.vel,i);let e=t.vel.length()*i,n=!1,s=t.vel.x/(e/i),r=t.vel.y/(e/i),a=t.vel.z/(e/i),o=ln.ray($n.x,$n.y,$n.z,s,r,a,e,!0);if(t.kind===0)if(o>=0)xn.copy($n).addScaledVector(t.vel,i*(o/e)),n=!0,De.set(ln.hit.nx,ln.hit.ny,ln.hit.nz),We.sparks(xn,De,6,!0);else{let l=H.pos,c=Uo($n,xn,l.x,l.y+1.2,l.z,.55),h=Uo($n,xn,l.x,l.y+.6,l.z,.5),u=Uo($n,xn,l.x,l.y+1.5,l.z,.35);(c>=0||h>=0||u>=0)&&H.alive&&(Mh(t.dmg,t.pos,2.5),n=!0,We.sparks(xn,De.set(0,.4,0),8,!0))}else{let l=o>=0?o/e:2,c=null;for(let h of Fe)if(!h.dead)for(let u of h.hitSpheres){let d=h.pos.x+u[0],p=h.pos.y+u[1],g=h.pos.z+u[2],x=Uo($n,xn,d,p,g,u[3]+.2);x>=0&&x<l&&(l=x,c=h)}(c||o>=0)&&(xn.copy($n).addScaledVector(t.vel,i*Math.min(1,l)),n=!0,vv(xn,t.def)),We.add.emit(t.pos.x,t.pos.y,t.pos.z,dt(-.4,.4),dt(-.4,.4),dt(-.4,.4),.28,.35,.05,[2.4,1,.25,.8],[1,.2,.05,0],0,2),We.add.emit(t.pos.x,t.pos.y,t.pos.z,0,0,0,.08,.8,.5,[3.4,1.8,.7,.9],[2,.6,.1,0],0,0)}if(n||t.life<=0){t.active=!1,t.s.visible=!1;continue}t.pos.copy(xn),t.s.position.copy(t.pos),t.kind===0&&Math.random()<.5&&We.add.emit(t.pos.x,t.pos.y,t.pos.z,0,0,0,.15,.2,.02,[2.5,.5,.3,.6],[1,.1,.05,0],0,3)}}function _h(){let i=Math.cos(H.pitch),t=Math.sin(H.pitch);Mr.set(-Math.sin(H.yaw)*i,t,-Math.cos(H.yaw)*i),Wo.set(Math.cos(H.yaw),0,-Math.sin(H.yaw)),vh.crossVectors(Wo,Mr)}function Zd(i,t,e){let n=null,s=e;for(let r of Fe){if(r.dead||r.spawnT>0)continue;r.center(De),wn.copy(De).sub(i);let a=wn.length();if(a>45)continue;wn.divideScalar(a);let l=Math.acos($t(wn.dot(t),-1,1))-Math.atan2(r.T.radius*.8,a);l<s&&ln.clear(i.x,i.y,i.z,De.x,De.y,De.z)&&(s=l,n=r)}return n}function gv(i,t,e){_h();let n=$n.set(H.pos.x,H.pos.y+H.eye,H.pos.z),s=new P().copy(n),r=new P().copy(s).addScaledVector(Mr,.9).addScaledVector(Wo,.24*_e.xScale).addScaledVector(vh,-.17);Ft.shots++;let a=new P().copy(Mr),o=null;ut.isTouch&&Ne.assist&&(o=Zd(s,a,.085)),i.id==="rifle"?Ue.rifle():i.id==="shotgun"?Ue.shotgun():Ue.plasma(),H.pitch=$t(H.pitch+i.kick*.0085*(.6+Math.random()*.8),-1.5,1.5),H.yaw+=dt(-1,1)*i.kick*.0028,H.recoilVis+=i.kick*.012,un=Math.max(un,i.shake),We.flash(r,i.color,i.id==="rifle"?.7:1.4,.07),hn.lights.muzzle.position.copy(r),hn.lights.muzzle.color.setRGB(i.color.r/3,i.color.g/3,i.color.b/3).addScalar(.35),hn.lights.muzzle.intensity=i.id==="rifle"?14:30,Ss=Math.max(Ss,0),Ho=.06;for(let l=0;l<i.pellets;l++){let c=new P().copy(a);o&&(o.center(De),wn.copy(De).sub(s).normalize(),c.lerp(wn,.6).normalize());let h=Math.random()*ri,u=Math.sqrt(Math.random())*t;if(c.addScaledVector(Wo,Math.cos(h)*u).addScaledVector(vh,Math.sin(h)*u).normalize(),i.kind==="proj"){Yd(r,c,42,i.dmg,i.color,.55,1,i);continue}xv(s,r,c,i,l)}}function xv(i,t,e,n,s){let r=ln.ray(i.x,i.y,i.z,e.x,e.y,e.z,160,!0);r<0&&(r=160);let a=De.set(ln.hit.nx,ln.hit.ny,ln.hit.nz).clone(),o=ln.hit.kind,l=null,c=r,h=1;for(let d of Fe){if(d.dead)continue;let p=d.rayHit(i.x,i.y,i.z,e.x,e.y,e.z,c);p&&p[0]<c&&(c=p[0],l=d,h=p[1])}let u=new P().copy(i).addScaledVector(e,c);if((n.pellets===1||s<4)&&We.tracer(t,u,pv.clone().multiplyScalar(n.id==="shotgun"?.7:1),n.id==="shotgun"?.018:.026,n.id==="shotgun"?.07:.09),l){let d=n.dmg*h;n.id==="shotgun"&&(d*=1-$t((c-5)/22,0,.65));let p=h>=2;Ft.hits++,We.sparks(u,wn.copy(e).negate(),p?10:5,!0),$d(l,d,p,u)}else We.sparks(u,a,4*1,!1),s<5&&(We.decal(u,a,n.id==="shotgun"?.2:.26),We.puff(u,a,1))}var Ho=0;function $d(i,t,e,n){let s=i.hp;i.damage(t),_v(i.dead?"kill":e?"head":""),i.dead||Ue.hit(e),i.dead&&yv(i,e,s)}function vv(i,t){We.explosion(i,1.15,[.9,.55,.18]),hn.lights.boom.position.copy(i).y=Math.max(1,i.y),hn.lights.boom.intensity=160,Ss=.28,Ue.explosion(i.x,i.z,1);let e=Math.hypot(i.x-H.pos.x,i.z-H.pos.z);un=Math.max(un,$t(.5-e*.03,.05,.5));let n=t.radius;for(let s of Fe){if(s.dead)continue;s.center(wn);let r=wn.distanceTo(i)-s.T.radius*.6;if(r<n){let a=t.dmg*(1-.65*$t(r/n,0,1));Ft.hits++,$d(s,a,!1,i)}}}function _v(i){let t=ft("hitmark");t.className="on"+(i?" "+i:""),xh=i==="kill"?.35:.14}var ra=ft("feed");function Vo(i,t=""){let e=document.createElement("div");for(e.textContent=i,t&&(e.className=t),ra.appendChild(e);ra.children.length>4;)ra.removeChild(ra.firstChild);setTimeout(()=>e.remove(),2500)}function yv(i,t,e){i.dead=!0,Ft.kills++,t&&Ft.headshots++,Ft.combo++,Ft.comboT=4.2;let n=1+Math.min(Ft.combo-1,12)*.1,s=Math.round(i.T.score*n*(t?1.5:1));Ft.score+=s,Vo(`+${s}  ${i.T.name.toUpperCase()}${t?"  HUVUDSKOTT":""}`,t?"head":i.type==="brute"?"big":""),i.center(De);let r=i.type==="brute"?1.9:i.type==="trooper"?.95:.7;We.explosion(De,r,i.type==="drone"?[1,.35,.2]:[1,.55,.2]),We.gibs(De,i.type==="brute"?16:i.type==="trooper"?9:5,i.type==="brute"?.35:.2),Ue.enemyDie(i.pos.x,i.pos.z,i.type==="brute"),Ue.kill(),i.type==="brute"&&(un=Math.max(un,.3),hn.lights.boom.position.copy(De),hn.lights.boom.intensity=90,Ss=.3);let a=H.hp<70?1.8:1,o=_e.lowAmmo()?2.2:1,l=i.type==="brute"?1:i.type==="trooper"?.3:.14;Math.random()<l*a*.8&&ts("health",i.pos.x,i.pos.z),Math.random()<l*o*1.1&&ts("ammo",i.pos.x+dt(-1,1),i.pos.z+dt(-1,1)),i.type==="brute"&&ts("ammo",i.pos.x+1,i.pos.z+1)}var es=[];function Jd(i){let t=new se,e=new pt(new ve(.5,.36,.36),new ce({color:2896701,metalness:.8,roughness:.4}));t.add(e);let n=i==="health"?oa(.4,3.2,1.2):oa(3.2,1.8,.3),s=new xe({color:n,toneMapped:!1});if(i==="health"){let a=new pt(new ve(.34,.1,.38),s),o=new pt(new ve(.1,.34,.38),s);t.add(a,o)}else for(let a=-1;a<=1;a++){let o=new pt(new ve(.06,.26,.38),s);o.position.x=a*.13,t.add(o)}let r=new Yn(new zn({map:qd,color:n,blending:Ze,depthWrite:!1,transparent:!0,opacity:.6,toneMapped:!1}));return r.scale.setScalar(1.8),t.add(r),t.visible=!1,vn.add(t),{g:t,kind:i,active:!1,life:0,ph:0,x:0,z:0}}for(let i=0;i<8;i++)es.push(Jd("health"));for(let i=0;i<8;i++)es.push(Jd("ammo"));function ts(i,t,e){let n=es.find(r=>!r.active&&r.kind===i);if(!n)return;let s={x:t,z:e};ln.resolve(s,.5,0),n.active=!0,n.life=28,n.ph=dt(0,6),n.x=s.x,n.z=s.z,n.g.visible=!0,n.g.position.set(s.x,.6,s.z),We.flash(De.set(s.x,.7,s.z),n.kind==="health"?oa(.4,2.5,1):oa(2.5,1.6,.3),2.4,.4)}var No=0;function Mv(i){if(H.alive&&_e.totalAmmo()===0){if(No+=i,No>4&&!es.some(t=>t.active&&t.kind==="ammo")){let t=Math.random()*ri,e=dt(3,6);ts("ammo",H.pos.x+Math.cos(t)*e,H.pos.z+Math.sin(t)*e),No=0,Vo("N\xD6DLEVERANS - AMMUNITION","good")}}else No=0;for(let t of es){if(!t.active)continue;if(t.life-=i,t.ph+=i,t.g.rotation.y+=i*1.8,t.g.position.y=.65+Math.sin(t.ph*2.4)*.12,t.g.visible=t.life>5||Math.floor(t.life*6)%2===0,t.life<=0){t.active=!1,t.g.visible=!1;continue}let e=H.pos.x-t.x,n=H.pos.z-t.z;if(H.alive&&e*e+n*n<1.9*1.9){if(t.kind==="health"){if(H.hp>=H.maxHp&&H.shield>=H.maxShield)continue;H.hp=Math.min(H.maxHp,H.hp+30),H.shield=Math.min(H.maxShield,H.shield+15),Vo("+30 HULL","good")}else _e.addAmmo(),Vo("+AMMUNITION","good"),Sr(!0);Ue.pickup(t.kind),t.active=!1,t.g.visible=!1}}}function Mh(i,t,e=0){if(!H.alive||ie!=="playing")return;let n=i,s=H.shield>0;if(H.shield>0){let r=Math.min(H.shield,n);H.shield-=r,n-=r,H.shield<=0&&s&&Ue.shieldBreak()}if(H.hp-=n,H.lastHurt=Ft.time,_r=Math.min(1,_r+i/30),un=Math.max(un,$t(i/40,.1,.6)),Ue.hurt(),t){let r=t.x-H.pos.x,a=t.z-H.pos.z,o=Math.hypot(r,a)||1,l=Math.atan2(r,-a)+H.yaw,c=document.createElement("div");c.className="dd",c.style.transform=`rotate(${(-l*180/Math.PI+0).toFixed(1)}deg)`,ft("dmgDirs").appendChild(c),setTimeout(()=>c.remove(),1e3),e&&(H.vx-=r/o*e,H.vz-=a/o*e)}H.hp<=0&&(H.hp=0,Sv())}function Sv(){H.alive=!1,H.deadT=0,Ue.death(),ji(0),setTimeout(Iv,1700)}function bv(i){let t=wd(),e=(ut.isTouch?.0042:.0022)*Ne.sens,n=t.x,s=t.y;if(H.alive){let l=e;ut.isTouch&&Ne.assist&&(_h(),xn.set(H.pos.x,H.pos.y+H.eye,H.pos.z),Zd(xn,Mr,.05)&&(l*=.6)),H.yaw-=n*l,H.pitch=$t(H.pitch-s*l,-1.45,1.45)}Td();let r=Ad(),a=0;if(H.alive){let l=ut.sprint&&ut.my>.2&&H.shield>=0,c=l?7.6:5.4,h=-Math.sin(H.yaw),u=-Math.cos(H.yaw),d=Math.cos(H.yaw),p=-Math.sin(H.yaw),g=h*ut.my+d*ut.mx,x=u*ut.my+p*ut.mx,m=H.onGround?14:3.5;H.vx=En(H.vx,g*c,m,i),H.vz=En(H.vz,x*c,m,i),r.jump&&H.onGround&&(H.vy=6.4,H.onGround=!1,Ue.jump()),H.vy-=17*i,H.pos.y+=H.vy*i,H.pos.y<=0&&(!H.onGround&&H.vy<-4&&(Ue.land(),un=Math.max(un,.06)),H.pos.y=0,H.vy=0,H.onGround=!0),H.pos.x+=H.vx*i,H.pos.z+=H.vz*i,ln.resolve(H.pos,.42,H.pos.y),a=Math.hypot(H.vx,H.vz),H.onGround&&a>1&&(H.stepD+=a*i,H.stepD>(l?2.3:1.9)&&(H.stepD=0,Ue.step(l))),H.bobT+=i*a*1.6,Ft.time-H.lastHurt>4.5&&H.shield<H.maxShield&&(H.shield<=0&&Ue.shieldUp(),H.shield=Math.min(H.maxShield,H.shield+i*16))}else H.deadT+=i;let o=ut.fire&&H.alive;return ut.isTouch&&Ne.autoFire&&H.alive&&(_h(),xn.set(H.pos.x,H.pos.y+H.eye,H.pos.z),Ev(xn,Mr,.04)&&(o=!0)),_e.update(i,li,o&&ie==="playing",H.alive?r:{select:-1,swapDir:0,reload:!1},a,{x:n,y:s},H.onGround),a}function Ev(i,t,e){for(let n of Fe){if(n.dead||n.spawnT>0)continue;n.center(De),wn.copy(De).sub(i);let s=wn.length();if(s>40)continue;if(wn.divideScalar(s),Math.acos($t(wn.dot(t),-1,1))-Math.atan2(n.T.radius*.7,s)<e&&ln.clear(i.x,i.y,i.z,De.x,De.y,De.z))return!0}return!1}function Tv(i,t){let e=H.alive&&H.onGround?Math.sin(H.bobT)*.03*$t(t/5,0,1.4):0,n=H.pos.y+H.eye+e,s=0;H.alive||(n=Math.max(.35,H.eye-H.deadT*2.2)+H.pos.y,s=Math.min(.9,H.deadT*1.2)),un=Math.max(0,un-i*1.8);let r=un*un;H.recoilVis=Math.max(0,H.recoilVis-i*.35),An.position.set(H.pos.x+dt(-1,1)*r*.05,n+dt(-1,1)*r*.05,H.pos.z+dt(-1,1)*r*.05),An.rotation.set(H.pitch+dt(-1,1)*r*.03,H.yaw+dt(-1,1)*r*.03,s+dt(-1,1)*r*.02),_e.camera.position.set(0,0,0)}function wv(i){let t=Math.floor(6+i*3.4),e=[],n=0,s=Math.min(5,Math.floor((i-1)/2));for(;t>0;){let r=Math.random(),a="drone";i>=3&&n<s&&t>=6&&r<.18?(a="brute",n++):r<.52+Math.min(.1,i*.01)&&t>=2?a="trooper":a="drone",t-=ch[a].cost,e.push(a)}return e.sort((r,a)=>(r==="brute")-(a==="brute")+(Math.random()-.5)*.4),e}function Od(){Ft.wave++,li.wave=Ft.wave,fe.queue=wv(Ft.wave),fe.phase="fight",fe.spawnT=1.2,fe.total=fe.queue.length,Sh(`V\xC5G ${Ft.wave}`,Ft.wave===1?"F\xD6RSVARA REAKTORN":`${fe.queue.length} FIENDER INKOMMANDE`),Ue.waveStart(),ji(1)}function Sh(i,t){ft("bannerT").textContent=i,ft("bannerS").textContent=t;let e=ft("banner");e.classList.remove("go"),e.offsetWidth,e.classList.add("go")}function Av(i){let t=Math.min(Ke?11:15,Math.round(4+Ft.wave*1.5)),e=Fe.filter(n=>!n.dead).length;if(fe.alive=e,fe.phase==="fight"){if(fe.queue.length){if(fe.spawnT-=i,fe.spawnT<=0&&e<t){let n=fe.queue.shift(),s=hn.portals.filter(o=>Math.hypot(o.pos.x-H.pos.x,o.pos.z-H.pos.z)>15),r=dd(s.length?s:hn.portals);r.glow=1.3;let a=new Qr(n,r,li,Ft.wave);Fe.push(a),Ue.spawn(r.pos.x,r.pos.z),fe.spawnT=Math.max(.45,1.5-Ft.wave*.07)}}else if(e===0){fe.phase="clear",fe.timer=6;let n=250*Ft.wave;Ft.score+=n,Sh("V\xC5G KLAR",`BONUS +${n}`),Ue.waveClear(),ji(.2),H.hp=Math.min(H.maxHp,H.hp+25),ts("health",H.pos.x+2,H.pos.z-2),ts("ammo",H.pos.x-2,H.pos.z-2),Ft.wave%2===0&&ts("ammo",H.pos.x,H.pos.z-3.5)}}else(fe.phase==="clear"||fe.phase==="start")&&(fe.timer-=i,fe.timer<=0&&Od())}var Ce={hp:ft("hpFill"),hpT:ft("hpTxt"),sh:ft("shFill"),shT:ft("shTxt"),score:ft("score"),combo:ft("combo"),wave:ft("waveLbl"),left:ft("leftLbl"),name:ft("wpnName"),mag:ft("ammoMag"),res:ft("ammoRes"),ammo:ft("ammo"),reload:ft("reloadBar"),reloadF:ft("reloadFill"),cross:ft("cross"),dmg:ft("dmgFlash"),low:ft("lowhp"),slots:[...document.querySelectorAll("#slots i")],swapLbl:ft("swapLbl"),hpBar:document.querySelector(".bar.hp"),radar:ft("radar")},zd={};function oi(i,t,e){zd[t]!==e&&(zd[t]=e,i.textContent=e)}function Sr(i){let t=_e.def(),e=_e.state();oi(Ce.name,"wn",t.name),oi(Ce.mag,"mag",String(e.mag)),oi(Ce.res,"res","/ "+e.reserve),Ce.ammo.classList.toggle("low",e.mag<=Math.ceil(t.mag*.25)),Ce.slots.forEach((n,s)=>n.classList.toggle("on",s===_e.cur)),oi(Ce.swapLbl,"sw",String(_e.cur+1))}var mh=0;function Rv(i,t){let e=H.hp/H.maxHp;Ce.hp.style.transform=`scaleX(${e.toFixed(3)})`,oi(Ce.hpT,"hpT",Math.ceil(H.hp)),Ce.sh.style.transform=`scaleX(${(H.shield/H.maxShield).toFixed(3)})`,oi(Ce.shT,"shT",Math.ceil(H.shield)),Ce.hpBar.classList.toggle("low",e<.3),oi(Ce.score,"score",Ft.score.toLocaleString("sv-SE"));let n=1+Math.min(Ft.combo-1,12)*.1;oi(Ce.combo,"combo",Ft.combo>1?`KOMBO x${n.toFixed(1)}`:""),oi(Ce.wave,"wave",`V\xC5G ${Ft.wave||1}`);let s=fe.queue.length+Fe.filter(l=>!l.dead).length;oi(Ce.left,"left",fe.phase==="clear"?"KLART":fe.phase==="start"?"G\xD6R DIG REDO":`${s} kvar`),Sr(),_e.reloadT>0?(Ce.reload.classList.add("on"),Ce.reloadF.style.transform=`scaleX(${(1-_e.reloadT/_e.def().reload).toFixed(3)})`):Ce.reload.classList.remove("on"),Ce.dmg.style.opacity=_r.toFixed(2),_r=Math.max(0,_r-i*1.6),Ce.low.style.opacity=e<.3&&H.alive?"1":"0";let r=_e.def(),o=6+(r.spread+_e.heat*r.maxBloom+$t(t/6,0,1)*.012)*innerHeight*.9;Ce.cross.style.setProperty("--sp",o.toFixed(1)+"px"),xh-=i,xh<=0&&ft("hitmark").classList.contains("on")&&(ft("hitmark").className="off"),mh-=i,mh<=0&&(mh=.07,Pv())}var Cv=Ce.radar.getContext("2d");function Pv(){let i=Cv,t=Ce.radar.width,e=t/2-4,n=e/(Me+2);i.clearRect(0,0,t,t),i.save(),i.translate(t/2,t/2),i.strokeStyle="rgba(53,224,255,0.35)",i.lineWidth=1,i.beginPath(),i.arc(0,0,e,0,ri),i.stroke(),i.beginPath(),i.arc(0,0,e*.5,0,ri),i.stroke(),i.rotate(H.yaw),i.fillStyle="rgba(53,224,255,0.5)",i.beginPath(),i.arc(-H.pos.x*n,-H.pos.z*n,4*n*1.2,0,ri),i.fill();for(let s of Fe){if(s.dead)continue;let r=(s.pos.x-H.pos.x)*n,a=(s.pos.z-H.pos.z)*n;if(Math.hypot(r,a)>e)continue;i.fillStyle=s.type==="brute"?"#ff9a2a":"#ff3b4e";let o=s.type==="brute"?4:s.type==="drone"?2.6:3;i.beginPath(),i.arc(r,a,o,0,ri),i.fill()}for(let s of es){if(!s.active)continue;let r=(s.x-H.pos.x)*n,a=(s.z-H.pos.z)*n;Math.hypot(r,a)>e||(i.fillStyle=s.kind==="health"?"#5dffa0":"#ffd24a",i.fillRect(r-2,a-2,4,4))}i.restore(),i.fillStyle="#fff",i.beginPath(),i.moveTo(t/2,t/2-7),i.lineTo(t/2+5,t/2+5),i.lineTo(t/2-5,t/2+5),i.fill()}function wi(i,t=!0){ft(i).classList.toggle("show",t)}function Xo(){["start","pause","settings","over","loading"].forEach(i=>wi(i,!1))}var Kd="start";function bh(){let i=Ft.best;return i.score?`REKORD ${i.score.toLocaleString("sv-SE")} PO\xC4NG \xB7 V\xC5G ${i.wave}`:""}function Go(){ph(),Lo(),Ue.ui(),Xo();for(let t of Fe)t.dispose(vn);Fe.length=0,la.forEach(t=>{t.active=!1,t.s.visible=!1}),es.forEach(t=>{t.active=!1,t.g.visible=!1}),Object.assign(H,{hp:100,shield:50,vx:0,vz:0,vy:0,yaw:0,pitch:0,alive:!0,lastHurt:-99,onGround:!0,deadT:0,recoilVis:0}),H.pos.set(0,0,11),Object.assign(Ft,{score:0,kills:0,headshots:0,shots:0,hits:0,wave:0,combo:0,comboT:0,time:0,started:performance.now()}),li.wave=1,_e.reset(),jr(),fe.phase="start",fe.timer=3.2,fe.queue=[],ft("hud").hidden=!1,ft("touch").hidden=!Ke,ra.innerHTML="",ie="playing",Sh("GAMMA STATION","REAKTORN M\xC5STE H\xC5LLA"),ji(.3),Sr(!0),uh();let i=ft("kbdHint");i.style.animation="none",i.offsetWidth,i.style.animation=""}function xr(i){ie==="playing"&&(ie="paused",Po(),jr(),wi("pause",!0),ft("touch").hidden=!0,ji(0))}function Qd(){ie==="paused"&&(ft("rotate").classList.contains("show")||(Xo(),ie="playing",ft("touch").hidden=!Ke,Lo(),ji(fe.phase==="fight"?1:.3),uh()))}function Bd(){ie="menu",Po(),jr(),ft("hud").hidden=!0,ft("touch").hidden=!0,Xo(),wi("start",!0),ft("bestLine").textContent=bh(),ji(0);for(let i of Fe)i.dispose(vn);Fe.length=0,la.forEach(i=>{i.active=!1,i.s.visible=!1})}function Iv(){if(ie!=="playing")return;ie="dead",Po(),jr(),ft("touch").hidden=!0;let i=Ft.score>(Ft.best.score||0);i&&(Ft.best={score:Ft.score,wave:Ft.wave},an("best",Ft.best));let t=Math.round((performance.now()-Ft.started)/1e3),e=Ft.shots?Math.round(Ft.hits/Ft.shots*100):0;ft("overT").textContent=Ft.wave>=8?"EN LEGEND FALLER":"STATIONEN FALLER",ft("overStats").innerHTML=[["PO\xC4NG",Ft.score.toLocaleString("sv-SE")],["V\xC5G",Ft.wave],["F\xC4LLDA ROBOTAR",Ft.kills],["HUVUDSKOTT",Ft.headshots],["TR\xC4FFS\xC4KERHET",e+"%"],["TID",`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`]].map(([n,s])=>`<div><b>${s}</b><span>${n}</span></div>`).join(""),ft("overBest").textContent=i?"NY REKORD!":bh(),wi("over",!0)}function kd(i){Kd=i,wi(i,!1),wi("settings",!0),ft("setQuality").value=String(Ne.quality),ft("setSens").value=Ne.sens,ft("setSound").checked=!ia(),ft("setMusic").checked=Dd(),ft("setAuto").checked=Ne.autoFire,ft("setAssist").checked=Ne.assist,jd()}function jd(){ft("qNote").textContent=`Aktuell grafikniv\xE5: ${bs[kn].name} \xB7 uppl\xF6sning ${Math.round(ai*100)}%. Auto s\xE4nker kvaliteten sj\xE4lv om spelet laggar.`}function Dv(){ft("btnPlay").onclick=Go,ft("btnAgain").onclick=Go,ft("btnMenu").onclick=Bd,ft("btnResume").onclick=Qd,ft("btnQuit").onclick=Bd,ft("btnSettings").onclick=()=>{ph(),kd("start")},ft("btnSettings2").onclick=()=>kd("pause"),ft("btnSetBack").onclick=()=>{wi("settings",!1),wi(Kd,!0)},ft("btnPause").onclick=()=>xr(),ft("btnMute").onclick=()=>{Do(!ia()),Fo()},ft("setQuality").onchange=i=>{Ne.quality=i.target.value,an("quality",Ne.quality),kn=Ne.quality==="auto"?Ke||Hd?1:2:+Ne.quality,ai=1,li.castShadow=bs[kn].shadows,aa(),jd()},ft("setSens").oninput=i=>{Ne.sens=+i.target.value,an("sens",Ne.sens)},ft("setSound").onchange=i=>{Do(!i.target.checked),Fo()},ft("setMusic").onchange=i=>Ld(i.target.checked),ft("setAuto").onchange=i=>{Ne.autoFire=i.target.checked,an("autoFire",Ne.autoFire)},ft("setAssist").onchange=i=>{Ne.assist=i.target.checked,an("assist",Ne.assist)},document.addEventListener("visibilitychange",()=>{document.hidden?(xr(!0),Nd()):Lo()}),window.addEventListener("blur",()=>{Ke&&xr(!0)}),window.addEventListener("resize",yr),window.addEventListener("orientationchange",()=>setTimeout(()=>{yr(),!ft("rotate").classList.contains("show")&&ie==="paused"&&ft("pause").classList.contains("show")},300)),document.addEventListener("keydown",i=>{i.code==="Escape"&&ie==="playing"&&!ut.locked&&xr(),i.code==="Enter"&&ie==="menu"&&Go(),i.code==="KeyM"&&(Do(!ia()),Fo())}),ft("ctlHelp").innerHTML=Ke?"<div><b>V\xC4NSTER TUMME</b> - g\xE5 (skjut spaken fram\xE5t f\xF6r att springa)</div><div><b>H\xD6GER TUMME</b> - dra f\xF6r att sikta, tryck <b>ELD</b> f\xF6r att skjuta (dra fr\xE5n knappen f\xF6r att sikta samtidigt)</div><div><b>SIKTET P\xC5 FIENDE</b> - skjuter automatiskt och hj\xE4lper till att sikta</div>":"<div><b>WASD</b> g\xE5 \xB7 <b>MUS</b> sikta \xB7 <b>V\xC4NSTERKLICK</b> skjut \xB7 <b>R</b> ladda om</div><div><b>1 / 2 / 3</b> eller <b>MUSHJUL</b> byt vapen \xB7 <b>SHIFT</b> spring \xB7 <b>MELLANSLAG</b> hoppa \xB7 <b>ESC</b> paus</div>",ft("installHint").hidden=!(uv&&!dv),Fo()}function Fo(){let i=ia();ft("btnMute").innerHTML=i?'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>':'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>'}var tf=0,yh=performance.now(),Oo=0,zo=0,Bo=0,sa=0,gh=0;function ef(i){if(ie==="playing"||ie==="dead"){Ft.time+=i,li.time=Ft.time;let t=bv(i);if(ie==="playing"||ie==="dead"){H.alive&&(Ft.comboT-=i,Ft.comboT<=0&&(Ft.combo=0)),Av(H.alive?i:0);for(let e of Fe)e.update(i,li);for(let e=Fe.length-1;e>=0;e--)Fe[e].dead&&(Fe[e].dispose(vn),Fe.splice(e,1));mv(i),Mv(i)}Tv(i,t),Id(H.pos.x,H.pos.z,H.yaw),Rv(i,t)}else if(ie==="menu"||ie==="loading"){gh+=i;let t=gh*.08+.6;An.position.set(Math.cos(t)*15,2.6+Math.sin(gh*.3)*.4,Math.sin(t)*15),An.lookAt(Math.cos(t+.9)*2,2.8,Math.sin(t+.9)*2)}ie!=="paused"&&(hn.update(performance.now()/1e3,i),We.update(i),Ss>0&&(Ss-=i,hn.lights.boom.intensity*=Math.pow(.001,i/.28),Ss<=0&&(hn.lights.boom.intensity=0)),Ho>0&&(Ho-=i,Ho<=0&&(hn.lights.muzzle.intensity=0)))}function nf(i){requestAnimationFrame(nf);let t=Math.min(.05,(i-yh)/1e3);if(yh=i,t<=0)return;tf++;let e=t;ef(t);let n=ie==="playing"||ie==="dead"||ie==="paused";if(on){if(Wd.enabled=n,vr&&vr.syncCamera(),gr){let s=gr.uniforms;s.time.value=i*.001,s.hurt.value=_r,s.aspect.value=innerWidth/innerHeight}on.render(t)}else cn.clear(),cn.render(vn,An),n&&(cn.clearDepth(),cn.render(_e.scene,_e.camera));if(Oo+=e,zo++,Bo+=e,Bo>1.5&&ie==="playing"){let s=Oo/zo;Oo=0,zo=0,Bo=0,Ne.quality==="auto"&&(s>1/36?(sa=0,ai>.55?(ai=Math.max(.55,ai-.15),yr()):kn>0&&(kn--,ai=.8,li.castShadow=bs[kn].shadows,aa())):s<1/52?(sa+=1,sa>5&&ai<1&&(ai=Math.min(1,ai+.1),sa=0,yr())):sa=0)}else ie!=="playing"&&(Oo=0,zo=0,Bo=0)}function Lv(){Ed(Vd,ft("touch"),t=>{ie==="playing"?xr(t):ie==="paused"&&!t&&Qd()}),Dv(),aa(),_e.camera.add(new Ie),cn.compile(vn,An),cn.compile(_e.scene,_e.camera),Sr(!0),ft("bestLine").textContent=bh(),ie="menu",Xo(),wi("start",!0),yr(),requestAnimationFrame(t=>{yh=t,nf(t)});let i=(t,e,n,s=0)=>{let r=new Qr(t,hn.portals[0],li,Ft.wave||1);return r.spawnT=0,r.pos.set(e,t==="drone"?1.8:0,n),r.yaw=s,r.group.scale.setScalar(1),r.group.position.copy(r.pos),r.group.rotation.y=s,r.cd=99,Fe.push(r),r};window.__gamma={get composer(){return on},get aoPass(){return vr},placeEnemy:i,input:ut,world:hn,phys:ln,scene:vn,camera:An,player:H,enemies:Fe,game:Ft,waveState:fe,ctx:li,weapons:_e,fx:We,renderer:cn,get mode(){return ie},get frames(){return tf},sim:(t,e)=>{for(let n=0;n<t*30;n++)e&&e(),ef(1/30)},startGame:Go,setMode:t=>{ie=t},pickups:es,spawnPickup:ts,hurtPlayer:Mh,tier:()=>kn,applyTier:aa,setTier:t=>{kn=t,aa()}}}setTimeout(Lv,30);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
