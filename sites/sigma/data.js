"use strict";
/* Sigma - speldata: nivåer, parametrar, beslutstyper, påverkansfaktorer och scenarier.
   Parameterordning överallt: [Ekonomi, Företagskultur, Löneutveckling, Tjänsteutveckling]. */
(function (root) {
  const D = {};

  D.PARAMS = [
    { id: "eko", icon: "💰", name: "Ekonomi", short: "Ekonomi", desc: "Bankens resultat och ditt bidrag till det." },
    { id: "kul", icon: "🤝", name: "Företagskultur", short: "Kultur", desc: "Stämning, förtroende och arbetsmiljö." },
    { id: "lon", icon: "📈", name: "Löneutveckling", short: "Lön", desc: "Din lön och löneutrymmet i organisationen." },
    { id: "tjn", icon: "🪜", name: "Tjänsteutveckling", short: "Karriär", desc: "Din kompetens, synlighet och mandat." },
  ];

  // Beslutstyper. Påverkansfaktorer belönar eller straffar dessa.
  D.TAGS = {
    tillvaxt: { icon: "🚀", name: "Tillväxt" },
    kostnad: { icon: "✂️", name: "Kostnad" },
    manniskor: { icon: "🧑‍🤝‍🧑", name: "Människor" },
    digital: { icon: "💻", name: "Digitalt" },
    kund: { icon: "🎯", name: "Kund" },
    regelverk: { icon: "⚖️", name: "Regelverk" },
    hallbart: { icon: "🌱", name: "Hållbart" },
    politik: { icon: "🏛️", name: "Internpolitik" },
  };

  // sal = månadslön vid Löneutveckling 50, need = Σ-index som krävs för befordran
  D.LEVELS = [
    { n: "Springpojke", unit: "Postrummet", sal: 26000, need: 53, sub: "Du bär post, kaffe och rykten genom huset." },
    { n: "Kundtjänstmedarbetare", unit: "Kundtjänst", sal: 31000, need: 54, sub: "Du är bankens röst när det blåser." },
    { n: "Privatrådgivare", unit: "Rådgivningen", sal: 40000, need: 54, sub: "Du har egna kunder och egna säljmål." },
    { n: "Kreditanalytiker", unit: "Kreditavdelningen", sal: 49000, need: 55, sub: "Du säger ja eller nej till andras drömmar." },
    { n: "Gruppchef", unit: "Lokalkontoret", sal: 62000, need: 55, sub: "Du leder fjorton människor och en kaffemaskin." },
    { n: "Avdelningschef", unit: "Avdelningen", sal: 80000, need: 56, sub: "Du äger budgeten, kulturen och kalendern." },
    { n: "Affärsområdeschef", unit: "Affärsområdet", sal: 110000, need: 57, sub: "Du sätter strategi och försvarar den uppåt." },
    { n: "Divisionschef", unit: "Divisionen", sal: 150000, need: 57, sub: "Du ansvarar för miljarder och rubriker." },
    { n: "Vice VD", unit: "Koncernledningen", sal: 210000, need: 58, sub: "Du sitter i ledningen och bevakas av styrelsen." },
    { n: "VD", unit: "Penthouse", sal: 320000, need: 59, sub: "Du bär hela bankens ansvar. Och hela bankens pressmeddelanden." },
  ];

  /* Faktorer: flat = alltid, tag = tillägg om beslutets typ matchar, riskAdd = ökad risk för bakslag. */
  D.FACTORS = [
    // ----- externa -----
    { id: "inflation", ext: true, icon: "💸", name: "Inflation", txt: "Priserna rusar och löneanspråken följer efter. Ingen vill ha en reallönesänkning.",
      flat: [-1, 0, -1, 0], tag: { kostnad: [0, -3, -3, 0], manniskor: [-1, 3, 3, 0], tillvaxt: [-1, 0, 0, 0] } },
    { id: "ranta", ext: true, icon: "🏦", name: "Räntechock", txt: "Riksbanken höjer styrräntan oväntat. Marginalerna växer men kunderna oroar sig.",
      flat: [2, -1, 0, 0], tag: { tillvaxt: [-3, 0, 0, 0], kund: [1, 1, 0, 2] }, riskAdd: 0.08 },
    { id: "strejk", ext: true, icon: "✊", name: "Strejkvarsel", txt: "Facket varslar om strejk. Det är spänt i korridorerna och fikarummet är tyst.",
      flat: [-2, 0, 0, 0], tag: { manniskor: [0, 4, 2, 1], kostnad: [0, -5, -2, -1] } },
    { id: "klimat", ext: true, icon: "🌍", name: "Klimathot", txt: "Översvämningar och skogsbränder får kunder och ägare att kräva klimatomställning.",
      flat: [0, 0, 0, 0], tag: { hallbart: [2, 2, 0, 3], tillvaxt: [-2, 0, 0, -1] }, riskAdd: 0.05 },
    { id: "cyber", ext: true, icon: "🕵️", name: "Cyberattack", txt: "Hackare slår mot internetbanken. Säkerhetsteamet har inte sovit på två dygn.",
      flat: [-2, 0, 0, 0], tag: { digital: [3, 0, 0, 3], regelverk: [2, 0, 0, 1], kostnad: [-3, -1, 0, -2] }, riskAdd: 0.08 },
    { id: "bankoro", ext: true, icon: "🏚️", name: "Bankoro", txt: "Utländska banker vacklar och rädda insättare ställer sig i kö.",
      flat: [-1, 0, 0, 0], tag: { kund: [3, 1, 0, 2], regelverk: [2, 0, 0, 1], tillvaxt: [-4, 0, 0, 0] }, riskAdd: 0.12 },
    { id: "reglering", ext: true, icon: "⚖️", name: "Ny reglering", txt: "EU släpper en förordning på 300 sidor med nio månaders genomförandetid.",
      flat: [-1, 0, 0, 0], tag: { regelverk: [3, 0, 0, 3], digital: [1, 0, 0, 1], politik: [-1, 0, 0, 0] } },
    { id: "fintech", ext: true, icon: "🦄", name: "Fintech-utmanare", txt: "En ny neobank tar unga kunder med gratis kort och en snygg app.",
      flat: [-1, 0, 0, 0], tag: { digital: [3, 1, 0, 2], kund: [2, 0, 0, 2], kostnad: [-2, 0, 0, -1] } },
    { id: "lagkonj", ext: true, icon: "📉", name: "Lågkonjunktur", txt: "Arbetslösheten stiger, företag går i konkurs och kreditförlusterna växer.",
      flat: [-2, -1, 0, 0], tag: { kostnad: [3, -2, -1, 0], tillvaxt: [-3, 0, 0, 0], regelverk: [2, 0, 0, 0] }, riskAdd: 0.1 },
    { id: "hogkonj", ext: true, icon: "☀️", name: "Högkonjunktur", txt: "Marknaden är het och alla vill låna. Överdriven optimism är ett säkert tecken.",
      flat: [2, 1, 1, 0], tag: { tillvaxt: [4, 0, 1, 1], regelverk: [-1, 0, 0, 1] }, riskAdd: 0.06 },
    { id: "kompetens", ext: true, icon: "🧠", name: "Kompetensbrist", txt: "Konkurrenterna värvar bankens experter. En rekrytering tar fem månader.",
      flat: [0, 0, 0, 0], tag: { manniskor: [-1, 2, 4, 2], digital: [0, 0, 0, 2], kostnad: [0, -2, -3, -1] } },
    { id: "media", ext: true, icon: "📰", name: "Mediegranskning", txt: "Kvällspressen granskar bankens avgifter, bonusar och bolån.",
      flat: [0, -1, 0, 0], tag: { kund: [2, 0, 0, 2], hallbart: [1, 1, 0, 2], politik: [-3, -1, -2, -4] } },
    { id: "skatt", ext: true, icon: "🗳️", name: "Politiska beslut", txt: "Regeringen utreder en ny skatt på bankerna. Lobbyisterna jobbar på högvarv.",
      flat: [-3, 0, 0, 0], tag: { politik: [0, 0, 0, 3], kostnad: [2, 0, 0, 0], tillvaxt: [-1, 0, 0, 0] } },
    { id: "geopolitik", ext: true, icon: "🌐", name: "Geopolitisk kris", txt: "Sanktioner och handelsstrider skakar marknaderna. Allt prissätts om.",
      flat: [-1, 0, 0, 0], tag: { regelverk: [2, 0, 0, 2], tillvaxt: [-3, 0, 0, 0], kund: [1, 0, 0, 1] }, riskAdd: 0.08 },
    // ----- interna -----
    { id: "omorg", ext: false, icon: "🔄", name: "Omorganisation", txt: "”Projekt Nordstjärnan” presenteras. Boxarna flyttas och pilarna byter riktning.",
      flat: [0, -2, 0, 0], tag: { politik: [0, -1, 0, 4], manniskor: [0, 3, 1, 1] } },
    { id: "chefsbyte", ext: false, icon: "👔", name: "Ny chef", txt: "Din chef ersätts av en ny som har egna idéer och en egen kaffekopp.",
      flat: [0, -1, 0, 0], tag: { politik: [0, 0, 2, 4], regelverk: [0, 0, 0, 1], kostnad: [1, 0, 0, 0] } },
    { id: "haveri", ext: false, icon: "💥", name: "Systemhaveri", txt: "Kärnsystemet går ner och kassören stirrar på en blå skärm. Incidenten höjs till Major Incident.",
      flat: [-3, -1, 0, 0], tag: { digital: [2, 0, 0, 3], kund: [3, 0, 0, 1] } },
    { id: "visselblasare", ext: false, icon: "📣", name: "Visselblåsare", txt: "En medarbetare larmar anonymt om oegentligheter. Compliance ringer.",
      flat: [0, 0, 0, 0], tag: { regelverk: [2, 3, 0, 3], politik: [-2, -2, 0, -4] }, riskAdd: 0.05 },
    { id: "bonus", ext: false, icon: "💶", name: "Bonusdebatt", txt: "Personalen vill ha vinstdelning efter ett starkt år. Ägarna vill ha utdelning.",
      flat: [-1, 0, 0, 0], tag: { manniskor: [-2, 3, 4, 0], kostnad: [2, -3, -4, 0] } },
    { id: "safe", ext: false, icon: "🚂", name: "Release train", txt: "Alla team ska synka i PI-planeringen. Beroenden, beroenden överallt.",
      flat: [0, 0, 0, 1], tag: { digital: [2, 1, 0, 3], politik: [0, 0, 0, 2] } },
    { id: "enkat", ext: false, icon: "📊", name: "Svag enkät", txt: "Medarbetarenkäten visar sjunkande engagemang. Ledarskapet nämns i fritextsvaren.",
      flat: [0, -1, 0, 0], tag: { manniskor: [0, 4, 1, 1], kostnad: [0, -3, 0, 0] } },
    { id: "distans", ext: false, icon: "🏠", name: "Distansarbetet", txt: "Hälften av personalen jobbar hemma. Kontoret ekar och kaffemaskinen längtar.",
      flat: [0, 0, 0, 0], tag: { manniskor: [0, 3, 1, 1], digital: [1, 1, 0, 2], politik: [0, -1, 0, -1] } },
    { id: "konsult", ext: false, icon: "🧾", name: "Konsultrapport", txt: "Ett konsultbolag levererar 140 PowerPoint-sidor. SWOT-analysen ligger på sidan 12.",
      flat: [-1, 0, 0, 1], tag: { politik: [0, 0, 0, 3], kostnad: [-2, -1, 0, 0], digital: [1, 0, 0, 1] } },
  ];

  D.CALM = { id: "lugnt", ext: null, icon: "🌤️", name: "Lugnt läge", txt: "Inga större störningar från omvärlden eller korridoren. Ett tillfälle att fokusera.", flat: [0, 0, 0, 0], tag: {} };

  // Standardtexter när ett beslut slår fel, per beslutstyp.
  D.BAD = {
    tillvaxt: ["Marknaden svarade inte som kalkylen sa. Tillväxten uteblev men kostnaderna kom först.", "Volymerna kom aldrig. Prognosen var mer hoppfull än korrekt."],
    kostnad: ["Besparingen blev dyrare än den smakade. Följdkostnader dök upp i oväntade hörn.", "Siffrorna såg bra ut i Excel. Verkligheten tyckte annorlunda."],
    manniskor: ["Initiativet landade snett. Några kände sig förbigångna och stämningen svalnade.", "Goda avsikter, dåligt genomförande. Folk undrar vad det egentligen handlade om."],
    digital: ["Lösningen krånglade vid skarpt läge. Felsökning, support och en hel del kaffe följde.", "Tekniken höll inte måttet. Release-tåget fick backa en station."],
    kund: ["Kunden blev inte nöjd. Ett klagomål hamnade hos chefen före lunch.", "Kundens förväntningar var högre än löftet. Det kostade förtroende."],
    regelverk: ["En detalj i regelverket missades. Rättelsen tog tid och uppmärksamhet.", "Compliance hittade en lucka. Rapporten skickades uppåt."],
    hallbart: ["Satsningen sågades som grönmålning. Tidningarna skrev och hashtaggen spred sig.", "Ambitionen var rätt men genomslaget uteblev, och kritikerna hann före."],
    politik: ["Du hade räknat fel på maktbalansen. Någon på övervåningen kommer ihåg det här.", "Beslutet föll i dåligt sällskap. Allianserna skiftade över natten."],
  };

  /* Scenarier. Alternativ: [rubrik, beskrivning, beslutstyp, risk 0-2, [E,K,L,T], utfall vid lyckat beslut] */
  const S = (lvl, id, t, s, o) => ({ id: lvl + "." + id, lvl, t, s, o });
  D.SCENARIOS = [
    /* ================= 1  Springpojke ================= */
    S(1, 1, "Bråda dagen i posten", "Klockan 08.45. Chefens akuta kuvert ska över stan samtidigt som hela dagens post ska delas ut. Alla vill ha sitt först.", [
      ["Följ turordningen", "Kuvert för kuvert, precis som rutinen säger.", "regelverk", 0, [1, 2, 1, 1], "Alla får sitt i tur och ordning. Ingen klagar och chefen noterar din noggrannhet."],
      ["Det akuta först", "Chefens kuvert iväg direkt, resten när du är tillbaka.", "kund", 1, [3, -1, 1, 4], "Det akuta kuvertet räddar en affär. Chefen noterar ditt omdöme."],
      ["Optimera rutten", "Samla allt i en enda slinga med elcykeln.", "kostnad", 2, [6, -3, 0, 4], "Rutten sparar tid och pengar, men några får vänta över lunch."],
    ]),
    S(1, 2, "Kaffemaskinen står still", "Bankens viktigaste infrastruktur har havererat. Köerna i pentryt växer och stämningen sjunker.", [
      ["Fixa den själv", "Du lirkar på maskinen i tjugo minuter med en video som guide.", "manniskor", 1, [0, 5, 1, 3], "Maskinen går igen! Du blir hjälten på våningen."],
      ["Skriv felanmälan enligt ITIL", "Incident registrerad, prioriterad och tilldelad.", "regelverk", 0, [2, -1, 0, 3], "Ärendet får nummer INC-00417 och fem dagars SLA. Folk muttrar men ingen skyller på dig."],
      ["Föreslå ny leverantör", "Pitcha ett abonnemang som sparar pengar.", "kostnad", 1, [5, -2, 1, 3], "Kalkylen imponerar. Kaffet blir lite sämre, men det märker bara kaffedrickarna."],
    ]),
    S(1, 3, "Kuvertet i hissen", "Ett obevakat kuvert med kunduppgifter ligger på hissgolvet. Ingen verkar sakna det.", [
      ["Lämna till säkerhetsansvarig", "Rapportera direkt enligt GDPR-rutinen.", "regelverk", 0, [2, 1, 0, 3], "Rutinen följs. Säkerhetschefen tackar och nämner dig på morgonmötet."],
      ["Fråga runt på våningen", "Någon måste ju sakna det.", "manniskor", 1, [1, 3, 0, 2], "Ägaren hittas på tio minuter och fikarummet pratar om din hederlighet."],
      ["Cykla till kunden själv", "Personlig service av bästa märke.", "kund", 2, [5, -2, 2, 4], "Kunden blir överlycklig över servicen. Compliance höjer ett ögonbryn men låter det passera."],
    ]),
    S(1, 4, "Ryktet i fikarummet", "Det viskas om en omorganisation. Kollegorna ber dig, som springer överallt, att lyssna av läget.", [
      ["Håll dig neutral", "Du ler, nickar och bär vidare posten.", "politik", 0, [0, 1, 1, 3], "Ingen kan beskylla dig för något. Du ses som pålitlig."],
      ["Dela med dig av det du hör", "Du blir husets levande intranät.", "manniskor", 1, [0, 4, 1, 2], "Stämningen lättar när folk får veta något. Chefen undrar varifrån du fick informationen."],
      ["Be chefen om besked", "Mod att fråga uppåt.", "politik", 2, [2, 1, 3, 5], "Chefen imponeras av initiativet. Några kollegor tycker att du tog i."],
    ]),
    S(1, 5, "Pappersarkivet", "Källarens arkiv ska digitaliseras: 4 000 pärmar, en skanner och mycket damm.", [
      ["Skanna pärm för pärm", "Metodiskt, långsamt och pålitligt.", "kostnad", 0, [3, -1, 1, 2], "Fyra veckor senare är det klart. Du är nu husets främsta arkivexpert."],
      ["Anlita en skanningsfirma", "Låt proffsen ta hand om det.", "digital", 1, [4, 0, 0, 3], "Skanningen går snabbt. Notan är högre än tänkt men chefen glömmer den snabbt."],
      ["Gör det till lunchprojekt", "Bjud kollegorna på pizza och skanna tillsammans.", "manniskor", 1, [1, 4, 0, 3], "Arkivet blir klart och dessutom träffas folk från tre avdelningar."],
    ]),
    S(1, 6, "Sommarfesten", "Budgeten för sommarfesten halverades. Du ombeds ordna något minnesvärt.", [
      ["Grillkväll på taket", "Billigt, trivsamt och med utsikt.", "manniskor", 1, [-2, 6, 1, 2], "Grillkvällen blir veckans samtalsämne. Budgeten sträcker sig precis."],
      ["Samarbete med lokal krog", "De får synas, banken får rabatt.", "kund", 2, [3, 3, 0, 3], "Krogen bjuder på förrätten mot en skylt i foajén. Alla är nöjda, nästan."],
      ["Bullar på fredagen", "Skippa festen och ge alla en kanelbulle.", "kostnad", 0, [4, -3, 0, 1], "Bullarna tar slut på fem minuter. Besparingen märks, men det gör även besvikelsen."],
    ]),
    S(1, 7, "VD i hissen", "Du hamnar i hissen med VD:n. Hen frågar: ”Och vad gör du här?” Du har tjugo sekunder.", [
      ["Berätta om kunderna", "Du har faktiskt träffat många i receptionen.", "kund", 1, [1, 0, 0, 5], "VD:n lyssnar förvånat. Du hör på kvällen att hen citerat dig i ledningsgruppen."],
      ["Föreslå en förbättring", "Postrutinen kan spara en halv tjänst.", "kostnad", 1, [4, 0, 1, 4], "VD:n ber dig skicka förslaget. Din chef undrar varför hen inte fick det först."],
      ["Fråga om karriärtips", "Man ska ju passa på.", "politik", 2, [0, 1, 3, 7], "VD:n skrattar och ger dig sitt kort. Några kollegor tycker att det var kaxigt."],
    ]),

    /* ================= 2  Kundtjänstmedarbetare ================= */
    S(2, 1, "Samtalskön ringlar", "Köplats 47 och 18 minuters väntetid. Ledningen vill ner till 5 minuter före kvartalets slut.", [
      ["Korta samtalen", "Snabbare samtal, färre frågor per kund.", "kostnad", 1, [5, -3, 0, 2], "Väntetiden sjunker, men kunderna tycker att ni är stressade."],
      ["Lös ärendet på en gång", "Ta den tid som behövs och undvik återsamtal.", "kund", 1, [2, 2, 1, 4], "Färre återkommande kunder gör att kön till slut krymper."],
      ["Bygg självbetjäning i appen", "Kunderna kan spärra kort och beställa nytt själva.", "digital", 2, [5, 0, 1, 4], "Appfunktionen halverar spärrsamtalen. Teamet får andas."],
    ]),
    S(2, 2, "Den arga kunden", "Kunden skriker att en avgift på 59 kronor är en skandal. Samtalet spelas in.", [
      ["Återbetala avgiften", "Stoppa eskaleringen med en gest.", "kund", 0, [-1, 2, 0, 3], "Kunden lugnar sig direkt. 59 kronor är billigt för en kvarvarande kund."],
      ["Förklara villkoren lugnt", "Ruta för ruta i prislistan.", "regelverk", 1, [2, 0, 0, 3], "Kunden accepterar motvilligt. Samtalet bedöms som ”korrekt hanterat”."],
      ["Lyft till teamledaren", "Låt någon med mandat ta över.", "politik", 1, [0, -1, 1, 4], "Teamledaren löser det. Du får uppmärksamhet som någon som vet när man ska eskalera."],
    ]),
    S(2, 3, "Romansbluffen", "En äldre kund vill ta ut 200 000 kronor kontant till en ”amerikansk läkare” hen träffat på nätet.", [
      ["Stoppa och ring anhörig", "Ta ansvaret även om kunden protesterar.", "kund", 1, [1, 2, 0, 5], "Anhöriga tackar. Kunden är först arg, sedan lättad."],
      ["Larma bedrägeriteamet", "Följ processen och låt experterna ta över.", "digital", 0, [2, 0, 1, 3], "Teamet spärrar kontot inom minuter. Rutinen fungerade."],
      ["Varna men låt kunden välja", "Kunden bestämmer själv över sina pengar.", "regelverk", 2, [0, 2, 1, 4], "Kunden drar sig ur efter din långa, vänliga varning. Det hade kunnat gå helt åt skogen."],
    ]),
    S(2, 4, "Chatboten", "Banken lanserar chatboten ”Sigrid” och du ska träna den med dina vanligaste svar.", [
      ["Träna den noga", "Ge boten dina bästa svar.", "digital", 1, [4, -2, 1, 4], "Sigrid imponerar på ledningen. Dina kollegor undrar vad som händer med jobben."],
      ["Protestera", "Boten tar mitt jobb.", "manniskor", 2, [-2, 4, 1, 0], "Du får medhåll i fikarummet men chefen noterar motståndet."],
      ["Föreslå arbetsfördelning", "Boten tar det enkla, människor tar det svåra.", "kund", 1, [3, 2, 2, 3], "Förslaget går igenom. Teamet får mer meningsfulla ärenden."],
    ]),
    S(2, 5, "Samtalstiden", "Månadsmålet är fyra minuters medelsamtalstid. Du ligger på sex, men har bankens bästa kundbetyg.", [
      ["Pressa tiden", "Lär dig avsluta samtal snabbare.", "kostnad", 1, [4, -3, 0, 2], "Siffrorna blir fina. Din nöjd-kund-poäng sjunker i takt."],
      ["Visa dina betyg", "Gå till teamledaren med siffrorna.", "politik", 1, [0, 1, 2, 5], "Teamledaren tar med dina siffror till ledningen. Du får större frihet."],
      ["Dela dina knep", "Håll en liten session för teamet.", "manniskor", 1, [2, 4, 0, 2], "Fler lär sig av dig. Teamets betyg går upp."],
    ]),
    S(2, 6, "Sjukskriven kollega", "En kollega sjukskrivs och du ombeds täcka upp i tre veckor.", [
      ["Täck upp mot övertid", "Fler timmar, högre lön.", "manniskor", 0, [2, 0, 3, 2], "Du går hem trött men med en fin lönespecifikation."],
      ["Kräv en bemanningsplan", "Rätt sak är att inte slita ut sig.", "politik", 1, [1, 2, 0, 3], "Chefen tar tag i bemanningen. Du ses som tydlig."],
      ["Bygg ett vidarekopplingsflöde", "Smartare fördelning av ärenden med hjälp av systemet.", "digital", 1, [3, 1, 0, 3], "Flödet jämnar ut belastningen. Kollegan kommer tillbaka till ett lugnare team."],
    ]),
    S(2, 7, "Ledig tjänst som rådgivare", "En tjänst som privatrådgivare utlyses. Du har tre års erfarenhet och gott rykte, men ingen formell examen.", [
      ["Sök direkt", "Det värsta som kan hända är ett nej.", "politik", 2, [0, 0, 3, 7], "Du får tjänsten på prov. Utmanande, men rätt riktning."],
      ["Läs en kvällskurs först", "Certifiering enligt IDD ger tyngd.", "regelverk", 0, [-1, 1, 1, 5], "Du tar certifieringen och söker nästa vår. Chefen noterar din uthållighet."],
      ["Be chefen vara referens", "Förankra innan du söker.", "politik", 1, [0, 1, 2, 5], "Chefen backar dig. Du går in som favorit."],
    ]),

    /* ================= 3  Privatrådgivare ================= */
    S(3, 1, "Bolånekunden hotar byta", "Kunden har fått ett bättre erbjudande hos konkurrenten och vill ha 0,3 procentenheter lägre ränta.", [
      ["Möt räntan", "Behåll relationen till nuvarande marginal minus lite.", "kund", 1, [-3, 1, 2, 5], "Kunden stannar och tackar. Marginalen minskar men kundnöjdheten stiger."],
      ["Erbjud ett helhetspaket", "Bolån, pension och försäkring med samlad rabatt.", "tillvaxt", 1, [5, 0, 1, 4], "Kunden binder upp sig. Din bonus ser bra ut."],
      ["Låt kunden gå", "Räntekrig är en dålig affär.", "kostnad", 0, [4, -2, 0, 1], "Du håller marginalen. Teamet undrar om du verkligen vill ha kunder."],
    ]),
    S(3, 2, "Fondkampanjen", "Banken vill sälja sina egna fonder. Provisionen är hög men en billig indexfond passar kunden bättre.", [
      ["Sälj bankens fond", "Det är trots allt bankens produkt.", "tillvaxt", 2, [8, -4, 3, 2], "Försäljningen är rekordhög. Kunden är nöjd tills hen ser avgiften."],
      ["Rekommendera indexfonden", "Kundens bästa först.", "kund", 0, [1, 2, 0, 3], "Kunden tackar dig. Månadens siffror blir lite lägre, men kunden stannar."],
      ["Visa båda alternativen", "Låt kunden välja med full information.", "regelverk", 1, [3, 1, 1, 3], "Dokumentationen är perfekt. Kunden väljer den dyrare fonden men vet vad hen köpt."],
    ]),
    S(3, 3, "Pensionskvällen", "Du ska ordna en kväll om pension för 80 kunder. Budget: 5 000 kronor.", [
      ["Webbinarium", "Digitalt, billigt och skalbart.", "digital", 0, [3, 0, 0, 3], "Hundratals tittar. Få ställer frågor men alla får materialet."],
      ["Lokal föredragskväll", "Med smörgåstårta och handskakning.", "kund", 1, [2, 2, 1, 4], "Salen fylls och tre kunder bokar möte direkt efter."],
      ["Gör det tillsammans med arbetsgivare", "Nå hela företag på en gång.", "politik", 1, [4, 0, 0, 4], "Tre arbetsgivare bjuder in dig. Det blir hundratals nya kontakter."],
    ]),
    S(3, 4, "Kunden i kris", "En kund mitt i en skilsmässa vill sälja huset i panik. Hen ringer dig sent en fredag.", [
      ["Svara och hjälp direkt", "Det är en människa som behöver dig.", "kund", 1, [2, -2, 0, 5], "Kunden är djupt tacksam. Du går hem först vid åtta."],
      ["Boka möte på måndag", "Skicka en checklista och återkom lugnt.", "regelverk", 0, [1, 0, 0, 3], "Kunden hinner andas. Ni gör en bra plan på måndag."],
      ["Koppla in ekonomisk rådgivare", "Tillsammans blir det bättre.", "manniskor", 1, [1, 3, 0, 3], "Rådgivaren löser det. Du lär dig något nytt."],
    ]),
    S(3, 5, "Säljmålet", "Kvartalets mål är tolv nya sparavtal. Du har fem och det är tre veckor kvar.", [
      ["Kampanja mot befintliga kunder", "Ring alla med lite sparande.", "tillvaxt", 1, [5, -1, 2, 3], "Du når målet precis. Några kunder tycker att du ringde en gång för mycket."],
      ["Satsa på färre, bättre kunder", "Kvalitet före kvantitet.", "kund", 0, [1, 2, 0, 3], "Du når inte hela vägen men tre kunder blir stora."],
      ["Samla leads via kollegor", "Be företagsrådgivarna om tips.", "politik", 1, [3, 2, 0, 3], "Kollegorna bjuder in dig till kundmöten. Du når målet och nätverket växer."],
    ]),
    S(3, 6, "Nya kundsystemet", "Banken inför ett nytt CRM-system. Ingen förstår det men alla ska använda det från måndag.", [
      ["Bli superanvändare", "Bli den som alla frågar.", "digital", 1, [2, 1, 0, 5], "Du blir intern guide. Din kalender fylls av hjälpbehov."],
      ["Skriv en manual till kollegorna", "Enkel och vänlig.", "manniskor", 1, [1, 4, 0, 3], "Manualen delas över hela banken. Stämningen lättar."],
      ["Pressa leverantören", "Rapportera varje bugg tills de rättar sig.", "politik", 2, [3, -2, 1, 5], "Leverantören skärper sig. Projektledaren undrar om du kan sluta mejla."],
    ]),
    S(3, 7, "Mentorskapet", "Divisionschefen erbjuder dig mentorskap. Det kräver tid du inte har.", [
      ["Tacka ja och prioritera", "Karriär är långsiktigt.", "politik", 1, [-1, 0, 2, 6], "Mentorn öppnar dörrar. Dina kundmål blir lidande."],
      ["Ja, med fokus på kundfrågor", "Lär dig av en som kan kundmöten.", "kund", 0, [1, 1, 1, 4], "Du får praktiska råd som du kan använda direkt."],
      ["Tacka nej", "Fokusera på kundmålen.", "tillvaxt", 1, [4, 0, 2, 1], "Siffrorna blir bra. Divisionschefen hittar en annan adept."],
    ]),

    /* ================= 4  Kreditanalytiker ================= */
    S(4, 1, "Fossilkunden", "Ett lönsamt oljebolag ansöker om 200 miljoner kronor. Ränta och säkerheter är bra, men klimatfrågan växer.", [
      ["Bevilja som det är", "Affären är god.", "tillvaxt", 2, [8, -3, 2, 2], "Affären bokas. Hållbarhetsavdelningen suckar tyst."],
      ["Bevilja med hållbarhetskovenant", "Krav på omställningsplan.", "hallbart", 1, [4, 1, 1, 4], "Kunden accepterar villkoren. Ni blir ett exempel på ansvarsfull utlåning."],
      ["Avslå", "Det är inte rätt tid.", "hallbart", 0, [-2, 3, 0, 3], "Beslutet väcker beundran internt men kostar intäkter."],
    ]),
    S(4, 2, "Fastighetsbolaget", "Ett fastighetsbolag är belånat till 78 procent. Räntorna stiger och direktören är en charmig golfspelare.", [
      ["Kräv mer säkerhet", "Skydda banken.", "regelverk", 0, [2, 0, 0, 3], "Bolaget går med på ytterligare pant. Relationen svalnar något."],
      ["Behåll relationen, följ upp varje kvartal", "Lojalitet först, men med uppsikt.", "kund", 1, [3, 1, 1, 2], "Bolaget uppskattar förtroendet. Kreditrisken ökar något."],
      ["Syndikera delar av lånet", "Minska exponeringen.", "kostnad", 1, [4, -1, 0, 3], "Du hittar två medlånare. Riskerna delas."],
    ]),
    S(4, 3, "Familjeföretaget", "Ett familjeföretag vill expandera men saknar säkerhet. Idén är genomtänkt och dottern brinner.", [
      ["Använd statlig garanti", "Utnyttja ett etablerat stödsystem.", "regelverk", 0, [2, 2, 0, 3], "Garantin gör att affären går. Pappersexercisen är omfattande."],
      ["Skräddarsy ett ägarlån", "Mer riskfyllt, men flexibelt.", "tillvaxt", 1, [5, 2, 0, 2], "Företaget växer. Dottern blir bankens bästa ambassadör."],
      ["Hänvisa till riskkapital", "Det är inte bankens uppgift.", "kostnad", 1, [3, 0, 0, 2], "Du slipper risken, men kunden går till konkurrenten för resten."],
    ]),
    S(4, 4, "Scorecard-felet", "Kreditmodellen ger konstiga utfall för små bolag. Du har hittat felet.", [
      ["Rapportera till modellvalideringen", "Följ processen.", "regelverk", 0, [1, 0, 0, 5], "Modellen rättas i nästa version. Du får äran på pappret."],
      ["Bygg en egen justering", "Fixa det själv.", "digital", 2, [4, -1, 1, 7], "Din modell fungerar. Modellvalideringen är mindre förtjust."],
      ["Berätta för teamet", "Låt alla veta, så vi gör det tillsammans.", "manniskor", 0, [1, 3, 0, 2], "Teamet hjälps åt och felet dokumenteras."],
    ]),
    S(4, 5, "Kreditkommittén", "Din chef vill få igenom en kredit du anser vara för riskabel. Mötet är imorgon.", [
      ["Säg ifrån öppet", "Din analys är solklar.", "regelverk", 2, [2, 1, 0, 6], "Din analys får stöd. Chefen ser sur ut men håller med till sist."],
      ["Skriv en skriftlig reservation", "Spår i protokollet skyddar alla.", "regelverk", 1, [3, 0, 0, 4], "Kommittén noterar reservationen. Krediten får skärpta villkor."],
      ["Håll med chefen", "Lojalitet.", "politik", 1, [2, 0, 2, 2], "Chefen blir tacksam. Du slipper konflikt men tar en risk."],
    ]),
    S(4, 6, "Rödflaggor i bokslutet", "Ett kundbokslut ser för bra ut. Intäkterna stiger snabbare än kunden kan förklara.", [
      ["Beställ oberoende granskning", "Be en revisor titta närmare.", "regelverk", 1, [-1, 0, 0, 5], "Granskningen hittar en feltolkning. Banken skyddas."],
      ["Kontakta kunden diskret", "Fråga hur de gör.", "kund", 1, [1, 1, 0, 3], "Kunden förklarar och du blir lugnare."],
      ["Kör transaktionsanalys", "Låt systemen leta avvikelser.", "digital", 1, [3, 0, 0, 4], "Systemet hittar tre avvikande transaktioner. Ni följer upp."],
    ]),
    S(4, 7, "Robotiserade kreditbeslut", "Banken vill automatisera alla kreditbeslut upp till 500 000 kronor. Teamet är oroligt.", [
      ["Driv projektet", "Effektivitet är framtiden.", "digital", 2, [7, -5, 1, 6], "Genomlopptiden går från dagar till minuter. Teamet känner sig ersatt."],
      ["Kräv mänsklig kontroll", "Människor ska ha sista ordet.", "manniskor", 0, [2, 3, 1, 2], "Du får med dig kollegorna och en rimlig kompromiss."],
      ["Föreslå en pilot i en region", "Testa innan du rullar ut.", "digital", 1, [4, 0, 0, 4], "Piloten visar goda resultat. Du leder utrullningen."],
    ]),

    /* ================= 5  Gruppchef ================= */
    S(5, 1, "Budgetrundan", "Regionchefen kräver fem procent lägre kostnader. Ditt kontor har fjorton medarbetare.", [
      ["Skär i resor och utbildning", "Smärtfritt på papper.", "kostnad", 0, [4, -3, -1, 2], "Budgeten håller. Medarbetarna noterar att kompetensutvecklingen försvann."],
      ["Säg upp två personer", "Tungt men effektivt.", "kostnad", 2, [9, -8, -2, 3], "Du når målet. Kontoret blir tyst och försiktigt."],
      ["Förhandla hyran", "Hyresvärden har också intresse av att ha kvar er.", "politik", 1, [4, 0, 0, 3], "Hyran sänks med sex procent. Du får beröm av regionchefen."],
    ]),
    S(5, 2, "Stjärnan hotar sluta", "Din bästa rådgivare Mia har fått ett bud från konkurrenten. Hon vill ha 15 procent mer.", [
      ["Matcha budet", "Behåll henne till varje pris.", "manniskor", 1, [-3, 2, 3, 3], "Mia stannar. Andra kollegor får reda på det."],
      ["Erbjud en utvecklingsplan", "Pengar är inte allt.", "manniskor", 1, [1, 2, 0, 4], "Mia gillar planen men vill också ha lite lön."],
      ["Låt henne gå", "Ingen är oersättlig.", "kostnad", 2, [3, -4, 0, 2], "Hon går. Teamet blir skakat men budgeten klarar sig."],
    ]),
    S(5, 3, "Lågpresteraren", "En medarbetare har missat målen i fyra kvartal. Hen är dock allas favorit.", [
      ["Coacha med plan", "Tydliga mål och regelbunden uppföljning.", "manniskor", 1, [1, 2, 0, 3], "Planen fungerar delvis. Medarbetaren uppskattar tydligheten."],
      ["Skriftlig varning", "HR ber om dokumentation.", "regelverk", 1, [2, -3, 0, 3], "Rutinen följs. Kontoret blir tyst."],
      ["Flytta till annan roll", "Rätt person på rätt plats.", "politik", 0, [0, 1, 0, 2], "Medarbetaren blomstrar i ny roll. Du får beröm för omdömet."],
    ]),
    S(5, 4, "Distansarbetet", "Medarbetarna vill jobba hemma tre dagar i veckan. Regionchefen tror på kontoret.", [
      ["Tillåt två dagar hemma", "En vettig mellanväg.", "manniskor", 0, [0, 4, 1, 2], "Stämningen förbättras. Regionchefen suckar men accepterar."],
      ["Behåll kontorsplikt", "Följ ledningens linje.", "politik", 1, [1, -3, 0, 4], "Du blir regionchefens favorit. Medarbetarna är mindre förtjusta."],
      ["Kör en pilot och mät", "Fakta först.", "digital", 1, [2, 2, 0, 4], "Resultaten visar likvärdig produktivitet. Du har datan med dig."],
    ]),
    S(5, 5, "Medarbetarenkäten", "Enkäten visar att trivseln sjunkit 12 poäng. Ledarskapet nämns.", [
      ["Håll en workshop", "Öppen dialog om vad som skaver.", "manniskor", 1, [-2, 5, 1, 3], "Folk säger sanningen. Du får en lång lista och mycket förtroende."],
      ["Inför veckovisa retrospektiv", "Kontinuerlig förbättring på agilt vis.", "digital", 1, [1, 3, 0, 3], "Retrospektiven blir en vana. Teamet börjar föreslå egna förbättringar."],
      ["Bjud på trivselkväll", "Bowling och pizza.", "kostnad", 0, [-1, 3, 0, 1], "Trevlig kväll. Några frågar vad som egentligen ändrades."],
    ]),
    S(5, 6, "Säljare mot kredit", "Rådgivarna lovar kunder snabba krediter. Kreditavdelningen säger nej. Kunderna ringer dig.", [
      ["Inför gemensamt kundmöte", "Sälj och kredit sitter ner tillsammans.", "kund", 1, [3, 2, 0, 4], "Kunderna får svar direkt. Interna konflikterna minskar."],
      ["Standardisera förhandsbesked", "Ett digitalt flöde med tydliga gränser.", "digital", 1, [4, 0, 0, 3], "Flödet gör förväntningarna tydliga. Ärendena går fortare."],
      ["Ta striden uppåt", "Lyft frågan till divisionsnivå.", "politik", 2, [2, 0, 2, 6], "Ledningen tar tag i processen. Du blir synlig."],
    ]),
    S(5, 7, "Release-tåget", "Ditt kontor ska ingå i ett agilt release-tåg. PI-planeringen är på måndag och ingen vet vad en ART är.", [
      ["Gå utbildningen och ta rollen som RTE", "Lär dig metodiken ordentligt.", "digital", 1, [3, 0, 1, 6], "Du blir tågets fasta punkt. Din kalender blir lite för full."],
      ["Skicka den tekniska medarbetaren", "Låt de som kan det sköta det.", "manniskor", 0, [1, 1, 0, 2], "Medarbetaren gör ett bra jobb. Du hänger inte riktigt med."],
      ["Kräv att tåget anpassar sig", "Kontoret har särskilda behov.", "politik", 2, [4, -2, 1, 3], "Tågets ägare går med på ett undantag. Andra team blir irriterade."],
    ]),

    /* ================= 6  Avdelningschef ================= */
    S(6, 1, "Bonussystemet", "VD vill införa rörlig lön i hela avdelningen. Facket säger: ”Vi pratar efter semestern.”", [
      ["Individuell bonus", "Prestation ska löna sig.", "tillvaxt", 2, [7, -3, 5, 2], "Försäljningen skjuter i höjden. Samarbetet blir sämre."],
      ["Teambaserad vinstdelning", "Alla vinner tillsammans.", "manniskor", 1, [-2, 5, 3, 3], "Teamet jobbar mer som en enhet. Kostnaderna stiger något."],
      ["Fast lön, mer utveckling", "Satsa på kompetens i stället.", "kostnad", 0, [2, 1, 0, 3], "Kompetensen höjs. Några säljare oroar sig för sin lön."],
    ]),
    S(6, 2, "Outsourcing av back-office", "Ett IT-bolag erbjuder 30 procent lägre kostnad för back-office. Kollegorna är oroliga.", [
      ["Outsourca", "Följ kalkylen.", "kostnad", 2, [9, -7, -2, 2], "Kostnaden sjunker kraftigt. Förtroendet för ledningen också."],
      ["Nearshoring i Sverige", "Mindre besparing, mindre risk.", "kostnad", 1, [4, -1, 0, 3], "Du sparar 12 procent med behållen kontroll."],
      ["Behåll men automatisera", "Robotisera repetitiva moment.", "digital", 1, [4, 1, 0, 4], "Automatiseringen ger tid till mer kvalificerat arbete."],
    ]),
    S(6, 3, "Sammanslagningen", "Två avdelningar ska bli en. Kulturerna är som olja och vatten.", [
      ["Dela ansvaret", "Båda cheferna får ansvara tillsammans.", "politik", 1, [0, 1, 0, 3], "En kompromiss som ingen är riktigt nöjd med."],
      ["Ta ledningen själv", "Enkelt och tydligt.", "politik", 2, [2, -3, 3, 7], "Du blir ensam chef. Några i teamet saknar sin gamla chef."],
      ["Teamutveckling och tät kommunikation", "Bygg samman människorna först.", "manniskor", 1, [-2, 5, 1, 3], "Nya rutiner växer fram. Resultatet tar tid."],
    ]),
    S(6, 4, "Digital kundresa", "Ett nytt digitalt bolåneflöde ska byggas. IT, produkt och kund vill olika saker.", [
      ["Produkt äger backloggen", "Tydligt ägarskap.", "digital", 1, [4, 0, 0, 3], "Leveranserna går i god takt. IT känner sig åsidosatta."],
      ["Workshop med kunder", "Fråga dem som ska använda det.", "kund", 1, [3, 2, 0, 3], "Kundernas önskemål omformar flödet. Resultatet är tydligt bättre."],
      ["Eskalera till styrgruppen", "Låt toppen avgöra.", "politik", 1, [1, -1, 0, 4], "Styrgruppen fattar beslut. Du ser ut som en tydlig ledare."],
    ]),
    S(6, 5, "Inspektion från FI", "Finansinspektionen kommer på granskning med tre veckors varsel.", [
      ["Gå igenom allt själva", "Allt på banan, alla på plats.", "regelverk", 0, [-1, 0, 0, 4], "Dokumentationen får högsta betyg. Teamet är utmattat men stolt."],
      ["Anlita konsulter för förgranskning", "Skaffa en objektiv bedömning.", "kostnad", 1, [-4, 1, 0, 4], "Konsulterna hittar luckor. Inspektionen går bra."],
      ["Ta en öppen dialog med FI", "Berätta själva om svagheterna.", "regelverk", 1, [1, 1, 0, 5], "FI uppskattar transparensen. Utfallet blir milt."],
    ]),
    S(6, 6, "Avgiftshöjningen", "Konkurrenterna höjer sina avgifter. Din avdelning kan höja med 12 procent.", [
      ["Höj avgifterna", "Följ marknaden.", "tillvaxt", 1, [7, -1, 1, 2], "Intäkterna ökar. Kundtjänst får många samtal."],
      ["Behåll och profilera som billigast", "Gör det till ett säljargument.", "kund", 1, [1, 2, 0, 4], "Kampanjen drar nya kunder. Intäkterna ökar långsamt."],
      ["Höj och addera ett mervärde", "Kunderna får något nytt.", "kund", 2, [5, 1, 0, 5], "Kunderna tycker att prishöjningen känns rimlig."],
    ]),
    S(6, 7, "Mobilbanken ligger nere", "Appen har varit nere i sex timmar. Sociala medier brinner. Du leder krishanteringen enligt ITIL:s Major Incident-process.", [
      ["Kommunicera öppet", "Berätta vad som hänt och när det löses.", "kund", 0, [-1, 2, 0, 5], "Kunderna uppskattar ärligheten. Rubrikerna blir mindre hätska."],
      ["Vänta tills orsaken är klar", "Ingen gissning innan det finns fakta.", "regelverk", 1, [1, -1, 0, 2], "Du undviker felaktig information. Kunderna känner sig lämnade."],
      ["Erbjud kompensation", "Ge kunderna en liten gest.", "kund", 1, [-3, 2, 1, 4], "Gesten kostar, men kunderna blir lugnare."],
    ]),

    /* ================= 7  Affärsområdeschef ================= */
    S(7, 1, "Fintech till salu", "En liten fintech med 200 000 användare kan köpas för 400 miljoner kronor. Teamet är kreativt men oorganiserat.", [
      ["Köp och integrera", "Ta hem kompetensen.", "tillvaxt", 2, [6, -2, 2, 6], "Förvärvet ger nya kunder. Integrationen kostar mer än beräknat."],
      ["Köp en minoritetsandel", "Mindre risk, mer insyn.", "tillvaxt", 1, [3, 1, 1, 4], "Ni får en plats i styrelsen och ett öga på tekniken."],
      ["Partnerskap utan ägande", "Samarbeta i stället för att köpa.", "digital", 0, [2, 2, 0, 3], "Samarbetet fungerar. Ni har inte full kontroll men heller ingen risk."],
    ]),
    S(7, 2, "Gröna lån", "Styrelsen vill bli ledande på gröna lån. Marginalen är lägre men efterfrågan växer.", [
      ["Lansera gröna lån direkt", "Ta marknadsandelar tidigt.", "hallbart", 1, [-2, 3, 1, 5], "Produkten väcker intresse. Intäkterna ökar långsamt."],
      ["Hållbarhetsmål i alla produkter", "Stor satsning, stor effekt.", "hallbart", 2, [3, 2, 0, 6], "Banken profileras som hållbarhetsledare. Genomförandet kräver mycket."],
      ["Vänta på tydligare regelverk", "Se vad EU kommer fram till.", "regelverk", 0, [3, 0, 0, 1], "Ni undviker misstag men tappar profil."],
    ]),
    S(7, 3, "Prisstrategin", "Räntemarginalen krymper. Du kan öka marginalen eller marknadsandelen.", [
      ["Höj marginalen", "Fokus på lönsamhet.", "tillvaxt", 1, [6, -1, 2, 1], "Resultatet stiger. Kunder går till konkurrenterna."],
      ["Prissätt aggressivt", "Ta marknadsandelar.", "tillvaxt", 2, [-3, 2, 2, 6], "Volymerna ökar kraftigt. Marginalen sjunker."],
      ["Segmentera prissättningen", "Olika kunder, olika priser.", "digital", 1, [4, 0, 1, 4], "Dataanalysen ger en smart prisstruktur."],
    ]),
    S(7, 4, "Strategisk allians", "Ett internationellt betalningsbolag vill samarbeta. Det ger skala men också beroende.", [
      ["Femårsavtal", "Binder er men ger trygghet.", "digital", 1, [5, 0, 0, 4], "Samarbetet fungerar bra och intäkterna ökar."],
      ["Kräv exklusivitet", "Alla andra stängs ute.", "politik", 2, [6, -1, 1, 4], "Ni får förmånliga villkor. Konkurrenterna reagerar."],
      ["Bygg egen lösning", "Behåll kontrollen.", "digital", 2, [-3, 2, 1, 6], "Egna systemet tar tid men ger oberoende."],
    ]),
    S(7, 5, "Fit for Growth", "Koncernen kräver ett kostnadsprogram. Din enhet ska bidra med 80 miljoner kronor.", [
      ["Skär i konsultbudgeten", "Konsulter är lätta att spara på.", "kostnad", 0, [4, -1, 0, 2], "Besparingen går hem. Projekt försenas."],
      ["Automatisera processer", "Investera för att spara.", "digital", 1, [4, -2, 1, 4], "Automatiseringen sänker kostnader permanent."],
      ["Avveckla olönsamma produkter", "Rensa i sortimentet.", "kostnad", 2, [7, -4, 0, 3], "Portföljen blir smalare och lönsammare."],
    ]),
    S(7, 6, "Talangprogrammet", "Du får budget för ett talangprogram: tio personer, tolv månader.", [
      ["Välj de mest lovande", "Satsa på elitgruppen.", "manniskor", 1, [1, 2, 2, 4], "Deltagarna blomstrar. De som inte valdes känner sig förbigångna."],
      ["Öppet för alla", "Alla får chansen.", "manniskor", 0, [-2, 5, 0, 2], "Engagemanget är högt. Programmet blir bredare."],
      ["Bjud in externa talanger", "Ta in nytt blod.", "tillvaxt", 1, [0, 1, 1, 5], "Nya perspektiv men gamla kollegor känner sig bortvalda."],
    ]),
    S(7, 7, "Kundtappet", "NPS har sjunkit 14 punkter. Kundernas viktigaste klagomål: ”Ni förstår inte vad jag behöver.”", [
      ["Inför Voice of Customer", "Systematisera återkopplingen.", "kund", 1, [1, 2, 0, 4], "Kundernas röst får större genomslag i produktutvecklingen."],
      ["Satsa på AI-personalisering", "Rätt erbjudande vid rätt tillfälle.", "digital", 2, [5, -1, 0, 5], "Personaliseringen ger bättre träffsäkerhet. Integritetsfrågor uppstår."],
      ["Återinför lokala rådgivare", "Mänsklig kontakt väger tungt.", "manniskor", 1, [-3, 4, 1, 3], "Kunderna uppskattar den personliga kontakten. Det kostar."],
    ]),

    /* ================= 8  Divisionschef ================= */
    S(8, 1, "Expansion till Norge", "Banken ser möjligheter i Norge. Marknaden är större, men konkurrensen och regelverken annorlunda.", [
      ["Etablera filial", "Bygg från grunden.", "tillvaxt", 2, [6, -1, 2, 5], "Filialen tar fart. Etableringen kostar mer än planerat."],
      ["Förvärva en liten norsk bank", "Genväg till kunder.", "tillvaxt", 2, [7, -3, 2, 5], "Förvärvet ger snabb tillväxt men kulturkrockar uppstår."],
      ["Samarbeta med lokal partner", "Låt lokalkännedom styra.", "digital", 1, [3, 1, 0, 4], "Partnern öppnar dörrar. Vinsten delas."],
    ]),
    S(8, 2, "Kapitalet", "Kapitaltäckningen ligger 2,1 procentenheter över kravet. Ägarna vill ha utdelning, tillsynen vill ha buffert.", [
      ["Maxa utdelningen", "Ägarna först.", "tillvaxt", 2, [6, -1, 3, 3], "Ägarna jublar. Tillsynen höjer ett ögonbryn."],
      ["Bygg en stor buffert", "Säkerhet först.", "regelverk", 0, [2, 0, 0, 3], "Tillsynen uppskattar försiktigheten. Ägarna suckar."],
      ["Aktieåterköp och buffert", "En balanserad väg.", "politik", 1, [4, 0, 2, 3], "Både ägare och tillsyn är hyfsat nöjda."],
    ]),
    S(8, 3, "Kreditförlusten", "En portfölj om 300 miljoner kronor försämras snabbt. Det kan bli en nedskrivning.", [
      ["Skriv ner direkt", "Ta smällen nu.", "regelverk", 0, [-4, 2, 0, 5], "Marknaden respekterar öppenheten. Resultatet svider."],
      ["Omstrukturera med kunderna", "Hjälp dem ur knipan.", "kund", 1, [1, 1, 0, 3], "Hälften av kunderna klarar sig. Arbetet är omfattande."],
      ["Sälj portföljen med rabatt", "Av med problemet.", "kostnad", 1, [2, -2, 0, 3], "Affären stänger snabbt. Förlusten blir tydlig."],
    ]),
    S(8, 4, "Kärnsystemet", "Kärnsystemet är 30 år gammalt. Ett moderniseringsprogram kostar 2 miljarder kronor och tar fem år.", [
      ["Stor-bang-migrering", "Byt allt på en gång.", "digital", 2, [3, -2, 1, 8], "Migreringen lyckas efter en nervös helg."],
      ["Stegvis modernisering", "Byt en komponent i taget.", "digital", 1, [3, 1, 0, 4], "Det går långsamt men stabilt."],
      ["Underhåll det gamla", "Skjut på problemet.", "kostnad", 0, [4, -1, 0, 0], "Kostnaderna blir låga i år. Teknikskulden växer."],
    ]),
    S(8, 5, "Facklig förhandling", "Facket kräver ett avtal om trygghet vid digitalisering.", [
      ["Skriv avtal", "Visa att ni tar ansvar.", "manniskor", 0, [-2, 5, 2, 3], "Avtalet ger ro. Digitaliseringen kan fortsätta."],
      ["Förhandla hårt", "Skydda bankens frihet.", "kostnad", 2, [4, -5, 0, 4], "Ni behåller flexibiliteten. Förtroendet kostar."],
      ["Skapa kompetensfond", "Gemensam omställning.", "manniskor", 1, [-1, 4, 2, 3], "Fonden blir ett föredöme i branschen."],
    ]),
    S(8, 6, "Banking-as-a-Service", "Fintechbolag vill hyra bankens licens och infrastruktur.", [
      ["Gå in fullt", "Bli plattform för andra.", "tillvaxt", 2, [6, -1, 0, 6], "Plattformen drar intäkter. Tillsynen vill ha mer kontroll."],
      ["Pilot med två partners", "Testa först.", "digital", 1, [3, 1, 0, 4], "Piloten lär er mycket. Utrullningen kan ske i lugn takt."],
      ["Avstå", "Fokusera på kärnan.", "regelverk", 0, [2, 1, 0, 2], "Ni undviker risk men missar en trend."],
    ]),
    S(8, 7, "AI i kundmötet", "Rådgivarna får AI-assistenter som föreslår lösningar i realtid. Några är skeptiska.", [
      ["Rulla ut direkt", "Tidigt ute vinner.", "digital", 2, [5, -3, 1, 6], "AI-stödet höjer kvaliteten. Några rådgivare känner sig övervakade."],
      ["Frivillig pilot", "Låt entusiasterna gå först.", "digital", 1, [3, 1, 0, 4], "Piloten blir lyckad. Skeptikerna ändrar sig sakta."],
      ["Utbilda först", "Bygg förståelse och förtroende.", "manniskor", 1, [-2, 4, 1, 4], "Utbildningen tar tid men ger trygga användare."],
    ]),

    /* ================= 9  Vice VD ================= */
    S(9, 1, "Kapitalbehovet", "Banken behöver ta in 5 miljarder kronor. Marknaden är nervös och spreadarna höga.", [
      ["Emittera obligationer nu", "Lås in finansieringen.", "tillvaxt", 1, [3, 0, 0, 4], "Emissionen blir övertecknad. Styrelsen nickar nöjt."],
      ["Vänta på lugnare läge", "Hoppas på lägre spreadar.", "kostnad", 2, [7, 0, 0, 3], "Marknaden lugnar sig och du sparar hundratals miljoner."],
      ["Nyemission till ägarna", "Stärk kärnkapitalet utan skuld.", "politik", 1, [1, -2, 2, 5], "Ägarna gillar inte spädningen. Tillsynen älskar buffertarna."],
    ]),
    S(9, 2, "Mellan två eldar", "Ordföranden vill byta strategi. VD vill hålla kursen. Båda ber om ditt stöd.", [
      ["Stå bakom VD", "Lojalitet.", "politik", 2, [2, 0, 1, 7], "Lojalitet lönar sig, tills den inte gör det."],
      ["Medla fram en kompromiss", "Hitta mellanvägen.", "politik", 1, [1, 2, 1, 4], "Ni når en kompromiss. Båda sidor tackar dig."],
      ["Lägg fram eget förslag", "Ta initiativet.", "tillvaxt", 2, [4, 0, 2, 5], "Förslaget ger nytt fokus. Du blir synlig."],
    ]),
    S(9, 3, "Aktivistägaren", "En aktivistägare har köpt 6 procent och kräver nedskärningar, högre utdelning och ny strategi. Pressen ringer.", [
      ["Möt dem med fakta", "Presentera en kapitalallokeringsplan.", "regelverk", 1, [3, 0, 1, 4], "Planen väcker respekt. Aktivisten ger sig delvis."],
      ["Slå tillbaka offentligt", "Försvara strategin i media.", "kund", 2, [1, 3, 0, 5], "Medarbetarna jublar. Aktivistens ton skärps."],
      ["Ge efter delvis", "Sänk kostnadsbasen.", "kostnad", 1, [5, -4, -1, 3], "Ägarna får det de vill ha. Medarbetarna betalar."],
    ]),
    S(9, 4, "Stresstestet", "FI:s stresstest visar att kreditförluster vid 8 procents arbetslöshet skulle äta upp hälften av bufferten.", [
      ["Bygg buffert", "Spara kapital.", "regelverk", 0, [-3, 1, 0, 5], "Bufferten byggs upp. Resultatet pressas."],
      ["Minska fastighetsexponeringen", "Rensa i den riskfyllda portföljen.", "kostnad", 1, [2, -1, 0, 3], "Risken minskar. Intäkterna sjunker lite."],
      ["Förbättra riskmodellerna", "Bättre data, bättre beslut.", "digital", 1, [3, 0, 1, 4], "De nya modellerna visar en mer nyanserad bild."],
    ]),
    S(9, 5, "Vinstvarningen", "Kvartalet landar 15 procent under förväntan. Analytikerna väntar på besked.", [
      ["Gå ut tidigt", "Öppenhet bygger förtroende.", "regelverk", 1, [-2, 2, 0, 5], "Marknaden uppskattar ärligheten. Aktien dippar kort."],
      ["Rapportera som planerat", "Förklara på rapportdagen.", "politik", 2, [2, 0, 1, 3], "Rapporten blir tydlig. Analytikerna är kritiska."],
      ["Skär kostnader snabbt", "Kompensera nu.", "kostnad", 1, [6, -5, -1, 2], "Resultatet repareras. Förtroendet i organisationen sjunker."],
    ]),
    S(9, 6, "Efterträdaren", "Styrelsen ber dig föreslå din egen efterträdare. Samtidigt hör du att VD funderar på att avgå.", [
      ["Bygg intern talangpipeline", "Låt de bästa växa.", "manniskor", 1, [0, 4, 1, 4], "Pipelinen ger kandidater. Du ses som en generös ledare."],
      ["Rekrytera externt", "Hämta in ny energi.", "politik", 2, [-2, -2, 2, 6], "Den nya kandidaten imponerar. Internt blir det oro."],
      ["Satsa på dig själv", "Gå in i rummet och ta platsen.", "politik", 2, [0, -2, 4, 7], "Styrelsen noterar ditt driv. Några undrar över din lojalitet."],
    ]),
    S(9, 7, "Hållbarhetsrapporteringen", "Nya CSRD-krav kräver 400 datapunkter. Bankens data ligger i 17 olika system.", [
      ["Bygg ett samlat datalager", "En sanning för alla.", "digital", 1, [-2, 1, 0, 6], "Datalagret blir bankens nya ryggrad."],
      ["Anlita konsulter", "Snabbare men dyrare.", "kostnad", 1, [-4, 0, 0, 4], "Rapporten blir klar i tid."],
      ["Rapportera minimalt", "Uppfyll kraven men inget mer.", "regelverk", 2, [4, -1, 0, 1], "Ni klarar kraven. Investerarna önskar mer."],
    ]),

    /* ================= 10  VD ================= */
    S(10, 1, "Bolagsstämman", "Ägarna vill ha rekordutdelning. Medarbetarna vill ha rekordlön. Kunderna vill ha lägre avgifter.", [
      ["Rekordutdelning", "Ägarna först.", "tillvaxt", 1, [6, -3, -1, 4], "Ägarna är nöjda. Personalen ser en annan sida av banken."],
      ["Dela vinsten med personalen", "Nöjd personal, nöjd bank.", "manniskor", 1, [-3, 6, 3, 3], "Engagemanget lyfter. Ägarna höjer ögonbrynen."],
      ["Sänk avgifterna", "Kunderna ska märka framgången.", "kund", 1, [-4, 2, 0, 6], "Kunderna jublar. Analytikerna är mer försiktiga."],
    ]),
    S(10, 2, "Fusionsbudet", "Nordeuropas största bank bjuder 40 procent över börskurs. Styrelsen vill ha ditt råd.", [
      ["Acceptera budet", "Ägarna får sitt.", "tillvaxt", 2, [8, -6, 4, 3], "Affären stänger. Kulturen kollapsar i integrationen."],
      ["Avvisa och växa själva", "Visa att banken klarar sig.", "tillvaxt", 2, [3, 4, 0, 7], "Du får medarbetarnas lojalitet. Ägarna är inte alla förtjusta."],
      ["Förhandla fram en jämbördig fusion", "Ge och ta.", "politik", 1, [4, 0, 3, 4], "Avtalet ger en bra struktur. Du får en stor roll."],
    ]),
    S(10, 3, "Bankoron", "Rykten om likviditetsproblem sprids i sociala medier. På tre timmar har fyra miljarder lämnat banken.", [
      ["Garantera öppet", "Håll presskonferens och visa siffror.", "kund", 1, [-2, 3, 0, 6], "Rädslan lägger sig. Insättningarna återvänder långsamt."],
      ["Be Riksbanken om likviditetsstöd", "Skapa trygghet.", "regelverk", 1, [3, 0, 0, 3], "Stödet lugnar marknaden. Ni blir beroende av Riksbanken en tid."],
      ["Ring storkunderna personligen", "De 200 största insättarna först.", "manniskor", 1, [2, 3, 0, 4], "Storkunderna stannar. Det sprider sig lugn."],
    ]),
    S(10, 4, "Ett bank", "Medarbetarenkäten visar att kulturen är stuprörsfylld. Att bygga ett gemensamt företag tar år.", [
      ["Lansera kulturprogrammet ”Ett bank”", "Satsa stort och långsiktigt.", "manniskor", 1, [-3, 7, 1, 4], "Programmet får fotfäste. Resultatet kommer om tre år."],
      ["Flytta ledningen till öppen yta", "Visa vägen genom exempel.", "politik", 1, [0, 4, 0, 3], "Ledningen blir mer tillgänglig. Några av dem hatar det."],
      ["Belöna samverkan i bonus", "Rätt incitament.", "manniskor", 1, [-1, 3, 3, 3], "Silosen luckras sakta upp."],
    ]),
    S(10, 5, "AML-sanktionen", "FI utreder bankens penningtvättskontroller. Sanktionsavgiften kan bli 800 miljoner kronor. Pressen står utanför.", [
      ["Ta fullt ansvar och byt ansvarig chef", "Tydlighet väger tungt.", "regelverk", 1, [-3, -2, 0, 6], "Du får beröm för tydligheten. Kulturen skakas."],
      ["Granska oberoende och investera i AML", "Bygg om kontrollen.", "regelverk", 1, [-4, 2, 0, 6], "Ni investerar tungt. FI tonar ned sanktionen."],
      ["Överklaga beslutet", "Banken har gjort sitt bästa.", "politik", 2, [3, -1, 0, 2], "Processen drar ut. Pressen blir inte vänligare."],
    ]),
    S(10, 6, "VD-lönen", "Din lön diskuteras i tidningarna. Ordföranden föreslår en sänkning men ägarna vill ha konkurrenskraft.", [
      ["Behåll lönen", "Konkurrenskraft är viktigt.", "politik", 1, [1, -3, 4, 2], "Lönen står kvar. Debatten dör ut."],
      ["Sänk frivilligt och inför lönetak", "Leda genom exempel.", "manniskor", 0, [2, 4, -4, 4], "Personalen applåderar. Dina vänner i branschen skakar på huvudet."],
      ["Koppla lönen till hållbarhetsmål", "Ansvar för helheten.", "hallbart", 1, [0, 2, 2, 5], "Modellen ses som ett föredöme."],
    ]),
    S(10, 7, "Vision 2030", "Dags att lägga fast bankens vision. Alla vill ha ett ord med i laget: ägare, personal, kunder och politiker.", [
      ["Digital i världsklass", "Teknik som konkurrensfördel.", "digital", 1, [4, -1, 0, 5], "Visionen känns modern. Några frågar var människorna tog vägen."],
      ["Sveriges mest hållbara bank", "Ansvar som varumärke.", "hallbart", 1, [1, 3, 0, 6], "Visionen väcker stolthet. Ägarna vill se siffror."],
      ["Sveriges bästa arbetsplats", "Människor först.", "manniskor", 1, [-1, 6, 2, 4], "Medarbetarna älskar visionen. Det kostar pengar."],
    ]),
  ];

  // Befordran, nedflyttning, kris: texter till utvärderingen.
  D.VERDICT = {
    up: ["Utvärderingen är entydig. Du tar rätt beslut under tryck och har visat balans. Välkommen till nästa nivå.", "Chefen nickar: ”Det här var ett riktigt år. Ledningen vill se mer av dig.”", "HR ringer med goda nyheter. Din nya titel finns redan i lönesystemet."],
    up2: ["Snabbspår! Ledningen hoppar över en nivå eftersom du presterade klart över förväntan.", "Det händer sällan, men nu har det hänt: två trappsteg på ett år."],
    stay: ["Förlängt uppdrag. Siffrorna är hyfsade men chefen vill se mer balans eller tyngre resultat innan nästa steg.", "Du blir kvar på nivån. ”Vi ser potential”, säger chefen med ett leende och en viktig paus."],
    down: ["Omplacering. HR kallar till ett samtal. ”Vi tror på dig, men just nu behövs du på en annan plats.”", "Resultaten räckte inte. Du flyttas ned en nivå och får en ny chans att bevisa dig."],
    floor: ["Du blir kvar som springpojke. Chefen räcker över ett kuvert: ”En chans till.”"],
    crisis: [
      "Resultatet rasade. Kreditkommittén ingriper och styrelsen kräver förändring.",
      "Kulturen havererade. Nyckelpersoner sa upp sig och facket står i foajén.",
      "Lönefrågan eskalerade. Förtroendet för ledningen är borta och din ersättning ses över.",
      "Din karriär stannade av. Ingen vill ha dig i sitt team och rollen dras tillbaka.",
    ],
    win: ["Styrelsen reser sig och applåderar. Du har gått från postrummet till penthouse och lämnar banken starkare än du fann den."],
  };

  root.SigmaData = D;
  if (typeof module !== "undefined" && module.exports) module.exports = D;
})(typeof window !== "undefined" ? window : globalThis);
