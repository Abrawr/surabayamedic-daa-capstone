// ════════════════════════════════════════════════
//  SURABAYAMEDIC — script.js
//  DAA Final Exam 2026
//  Algoritma: Dijkstra · Bellman-Ford · Kruskal
// ════════════════════════════════════════════════

// ── DATA: 20 NODE FASILITAS MEDIS SURABAYA ──
const PLACES = [
  // ── PUSAT / EXISTING ──
  {id:0,  name:"RSUD Dr. Soetomo",          lat:-7.2680296,lng:112.7582191,cat:"rsud",     wilayah:"pusat",  desc:"RS umum daerah terbesar Jawa Timur. Rujukan utama kegawatdaruratan Surabaya.",    beds:1500,igd:"24 jam",phone:"(031) 5501011"},
  {id:1,  name:"RS Universitas Airlangga",  lat:-7.2700624,lng:112.7853088,cat:"rsswasta", wilayah:"timur",  desc:"RS pendidikan UNAIR. IGD 24 jam, dokter spesialis lengkap.",                     beds:333, igd:"24 jam",phone:"(031) 5916290"},
  {id:2,  name:"RS Islam A. Yani",          lat:-7.30617,lng:112.73489,cat:"rsswasta", wilayah:"selatan",desc:"RS Islam Surabaya Selatan. IGD aktif 24 jam dengan ambulans siaga.",              beds:289, igd:"24 jam",phone:"(031) 8281119"},
  {id:3,  name:"RS Darmo",                  lat:-7.2869871,lng:112.7393517,cat:"rsswasta", wilayah:"pusat",  desc:"RS swasta kawasan Darmo. Layanan bedah dan trauma lengkap.",                      beds:254, igd:"24 jam",phone:"(031) 5676253"},
  {id:4,  name:"RS Dr. Ramelan",            lat:-7.308012,lng:112.7377004,cat:"rsud",     wilayah:"pusat",  desc:"RS TNI AL. Layanan gawat darurat trauma dan resusitasi 24 jam.",                  beds:450, igd:"24 jam",phone:"(031) 3523278"},
  {id:5,  name:"RS William Booth",          lat:-7.290987,lng:112.737267,cat:"rsswasta", wilayah:"pusat",  desc:"RS legendaris pusat kota. Spesialisasi bedah, jantung, trauma.",                  beds:210, igd:"24 jam",phone:"(031) 5678910"},
  {id:6,  name:"RS PHC Surabaya",           lat:-7.2087878,lng:112.7353505,cat:"rsswasta", wilayah:"utara",  desc:"RS kawasan Pelabuhan. Emergensi maritim dan umum 24 jam.",                        beds:195, igd:"24 jam",phone:"(031) 3293253"},
  {id:7,  name:"RS Bhayangkara",            lat:-7.3249436,lng:112.7317763,cat:"rsud",     wilayah:"pusat",  desc:"RS Polri. IGD trauma dan kecelakaan, layanan cepat 24 jam.",                      beds:180, igd:"24 jam",phone:"(031) 5947760"},
  {id:8,  name:"Puskesmas Sawahan",         lat:-7.2655813,lng:112.7277504,cat:"puskesmas",wilayah:"pusat",  desc:"Puskesmas rawat inap Kec. Sawahan. IGD dasar dan rujukan.",                       beds:20,  igd:"07–21", phone:"(031) 5671234"},
  {id:9,  name:"Puskesmas Tambaksari",      lat:-7.2491409,lng:112.7650498,cat:"puskesmas",wilayah:"pusat",  desc:"Faskes pertama BPJS Tambaksari. Gawat darurat ringan.",                           beds:15,  igd:"07–21", phone:"(031) 5921234"},
  {id:10, name:"Puskesmas Kenjeran",        lat:-7.2411107,lng:112.7952791,cat:"puskesmas",wilayah:"utara",  desc:"Puskesmas pesisir utara. Melayani komunitas nelayan.",                            beds:12,  igd:"07–21", phone:"(031) 3814567"},
  {id:11, name:"Puskesmas Wonocolo",        lat:-7.3079893,lng:112.7552907,cat:"puskesmas",wilayah:"selatan",desc:"Puskesmas Surabaya Selatan. Layanan KIA dan IGD dasar.",                          beds:18,  igd:"07–21", phone:"(031) 8412345"},
  {id:12, name:"Puskesmas Mulyorejo",       lat:-7.2607225,lng:112.784748,cat:"puskesmas",wilayah:"timur",  desc:"Puskesmas dekat kampus UNAIR. Faskes primer wilayah timur.",                      beds:14,  igd:"07–21", phone:"(031) 5942345"},
  {id:13, name:"Klinik Pratama Ngagel",     lat:-7.2905095,lng:112.7466458,cat:"klinik",   wilayah:"pusat",  desc:"Klinik pratama 24 jam kawasan Ngagel. UGD ringan dan BPJS.",                     beds:0,   igd:"24 jam",phone:"(031) 5024678"},
  {id:14, name:"Klinik Medika Gubeng",      lat:-7.2909826,lng:112.751876,cat:"klinik",   wilayah:"pusat",  desc:"Klinik modern dekat Stasiun Gubeng. IGD ringan.",                                beds:0,   igd:"08–22", phone:"(031) 5023456"},
  {id:15, name:"Klinik Utama Darmo",        lat:-7.2934043,lng:112.735286,cat:"klinik",   wilayah:"selatan",desc:"Klinik utama Darmo. Dokter spesialis, poliklinik lengkap.",                      beds:0,   igd:"08–21", phone:"(031) 5681234"},
  {id:16, name:"Dinas PMK Surabaya",        lat:-7.2522766,lng:112.6531946,cat:"damkar",   wilayah:"pusat",  desc:"Posko utama PMK Surabaya. Ambulans & rescue 24 jam siaga.",                      beds:0,   igd:"24 jam",phone:"113"},
  {id:17, name:"Pos PMK Surabaya Selatan",  lat:-7.3142808,lng:112.6958416,cat:"damkar",   wilayah:"selatan",desc:"Pos pemadam wilayah selatan. Ambulans siaga 24 jam.",                            beds:0,   igd:"24 jam",phone:"113"},
  {id:18, name:"Pos PMK Surabaya Timur",    lat:-7.2952762,lng:112.8017295,cat:"damkar",   wilayah:"timur",  desc:"Pos pemadam wilayah timur. Respon cepat kecelakaan.",                            beds:0,   igd:"24 jam",phone:"113"},
  {id:19, name:"BPBD Kota Surabaya",        lat:-7.249,lng:112.74,cat:"damkar",   wilayah:"pusat",  desc:"Badan Penanggulangan Bencana Daerah. Koordinasi darurat kota.",                  beds:0,   igd:"24 jam",phone:"(031) 3523451"},
  // ── SURABAYA BARAT ──
  {id:20, name:"RS Sumber Santoso",         lat:-7.265,lng:112.689,cat:"rsswasta", wilayah:"barat",  desc:"RS swasta Surabaya Barat. IGD 24 jam, layanan bedah dan trauma.",                beds:180, igd:"24 jam",phone:"(031) 7412345"},
  {id:21, name:"RS Graha Amerta Barat",     lat:-7.2993659,lng:112.6764063,cat:"rsswasta", wilayah:"barat",  desc:"RS modern kawasan Lakarsantri. Spesialis anak dan kandungan.",                   beds:120, igd:"24 jam",phone:"(031) 7523456"},
  {id:22, name:"Puskesmas Lakarsantri",     lat:-7.32492,lng:112.656109,cat:"puskesmas",wilayah:"barat",  desc:"Puskesmas Kec. Lakarsantri. Faskes primer BPJS wilayah barat.",                  beds:15,  igd:"07–21", phone:"(031) 7634567"},
  {id:23, name:"Puskesmas Pakal",           lat:-7.2347252,lng:112.6115006,cat:"puskesmas",wilayah:"barat",  desc:"Puskesmas Kec. Pakal. Melayani wilayah perbatasan barat laut.",                  beds:12,  igd:"07–21", phone:"(031) 7745678"},
  {id:24, name:"Pos PMK Surabaya Barat",    lat:-7.275,lng:112.695,cat:"damkar",   wilayah:"barat",  desc:"Pos pemadam kebakaran wilayah barat. Ambulans siaga 24 jam.",                    beds:0,   igd:"24 jam",phone:"113"},
  // ── SURABAYA UTARA ──
  {id:25, name:"RS Hajj Surabaya",          lat:-7.2842254,lng:112.7807524,cat:"rsud",     wilayah:"timur",  desc:"RS milik Pemprov Jatim. IGD 24 jam, layanan haji dan umrah.",                   beds:300, igd:"24 jam",phone:"(031) 3816999"},
  {id:26, name:"RS Pelabuhan Surabaya",     lat:-7.2087878,lng:112.7353505,cat:"rsswasta", wilayah:"utara",  desc:"RS kawasan Tanjung Perak. Emergensi maritim & kecelakaan kerja.",                beds:150, igd:"24 jam",phone:"(031) 3294567"},
  {id:27, name:"Puskesmas Semampir",        lat:-7.2246344,lng:112.7469155,cat:"puskesmas",wilayah:"utara",  desc:"Puskesmas Kec. Semampir. Faskes primer kawasan padat penduduk utara.",            beds:14,  igd:"07–21", phone:"(031) 3856789"},
  {id:28, name:"Puskesmas Asemrowo",        lat:-7.2518611,lng:112.7145619,cat:"puskesmas",wilayah:"utara",  desc:"Puskesmas Kec. Asemrowo. Dekat kawasan industri pelabuhan.",                     beds:10,  igd:"07–21", phone:"(031) 7967890"},
  {id:29, name:"Pos PMK Tanjung Perak",     lat:-7.2,lng:112.735,cat:"damkar",   wilayah:"utara",  desc:"Pos PMK area pelabuhan & industri. Respon kebakaran & kecelakaan.",              beds:0,   igd:"24 jam",phone:"113"},
  // ── SURABAYA SELATAN ──
  {id:30, name:"RS Royal Surabaya",         lat:-7.3289549,lng:112.7513808,cat:"rsswasta", wilayah:"selatan",desc:"RS modern Surabaya Selatan. IGD 24 jam, NICU dan ICU lengkap.",                  beds:220, igd:"24 jam",phone:"(031) 8290123"},
  {id:31, name:"RS Husada Utama Selatan",   lat:-7.2516888,lng:112.7462643,cat:"rsswasta", wilayah:"selatan",desc:"RS swasta area Wonocolo. Spesialis jantung dan neurologi.",                     beds:170, igd:"24 jam",phone:"(031) 8401234"},
  {id:32, name:"Puskesmas Gayungan",        lat:-7.3381017,lng:112.7186968,cat:"puskesmas",wilayah:"selatan",desc:"Puskesmas Kec. Gayungan. Faskes primer BPJS Surabaya Selatan.",                  beds:16,  igd:"07–21", phone:"(031) 8512345"},
  {id:33, name:"Puskesmas Jambangan",       lat:-7.3284006,lng:112.7144456,cat:"puskesmas",wilayah:"selatan",desc:"Puskesmas Kec. Jambangan. Wilayah perbatasan selatan kota.",                    beds:12,  igd:"07–21", phone:"(031) 8623456"},
  {id:34, name:"Pos PMK Surabaya Selatan 2",lat:-7.3221482,lng:112.7699985,cat:"damkar",   wilayah:"selatan",desc:"Pos PMK wilayah selatan ke-2. Jangkauan Gayungan–Jambangan.",                  beds:0,   igd:"24 jam",phone:"113"},
  {id:35, name:"Jalan Lorong Tengah Rumah Sakit Dokter Ramelan Surabaya", lat:-7.3091364, lng:112.7391458, cat:"rsud", wilayah:"pusat", desc:"Jalan Lorong Tengah Rumah Sakit Dokter Ramelan Surabaya,  RW 09,  Jagir", beds:40, igd:true, open:"24 Jam"},
  {id:36, name:"Jalan Depan Paviliun 7 Rumah Sakit Dokter Ramelan Surabaya", lat:-7.3098151, lng:112.7372802, cat:"rsud", wilayah:"pusat", desc:"Jalan Depan Paviliun 7 Rumah Sakit Dokter Ramelan Surabaya,  RW 09,  Jagir", beds:40, igd:true, open:"24 Jam"}
];

// Edge berdasarkan koordinat nyata × faktor jalan 1.35
const EDGES = [
  [0,1,4.05],[0,9,3.01],[0,13,3.79],[0,14,3.57],[0,25,4.14],
  [0,31,3.03],[1,9,4.35],[1,10,4.59],[1,12,1.4],[1,18,4.51],
  [1,25,2.23],[2,4,0.5],[2,15,1.92],[2,35,0.77],[2,36,0.65],
  [3,5,0.68],[3,8,3.65],[3,13,1.21],[3,14,1.96],[3,15,1.14],
  [4,7,2.69],[4,11,2.62],[4,15,2.22],[4,35,0.27],[4,36,0.28],
  [5,13,1.4],[5,14,2.18],[5,15,0.47],[6,19,6.08],[6,26,0.0],
  [6,27,2.94],[6,29,1.32],[7,17,5.58],[7,30,2.98],[7,32,2.77],
  [7,33,2.63],[7,35,2.61],[7,36,2.41],[8,19,3.09],[8,24,5.08],
  [8,28,2.85],[8,31,3.46],[9,10,4.66],[9,12,3.41],[9,19,3.73],
  [9,31,2.82],[10,12,3.34],[10,25,6.82],[11,14,2.6],[11,30,3.2],
  [11,34,3.05],[11,35,2.41],[11,36,2.7],[12,18,5.77],[12,25,3.58],
  [13,14,0.78],[13,15,1.75],[14,15,2.5],[16,20,5.66],[16,21,7.87],
  [16,23,6.74],[16,24,7.1],[17,21,3.66],[17,22,6.13],[17,32,4.94],
  [17,33,3.49],[18,25,3.54],[18,34,6.21],[19,26,6.08],[19,27,3.8],
  [19,28,3.81],[19,29,7.39],[19,31,1.02],[20,21,5.49],[20,23,12.4],
  [20,24,1.75],[20,28,4.29],[21,22,4.88],[21,23,13.7],[21,24,4.59],
  [22,24,9.47],[22,33,8.7],[23,24,13.83],[24,28,4.53],[26,27,2.94],
  [26,29,1.32],[27,29,4.1],[27,31,4.06],[30,32,5.06],[30,34,2.95],
  [30,35,3.49],[32,33,1.59],[33,36,4.4],[34,35,4.99],[34,36,5.21],
  [35,36,0.3]
];

// Build adjacency list
const ADJ = {};
PLACES.forEach(p => ADJ[p.id] = []);
EDGES.forEach(([a,b,w]) => { ADJ[a].push({to:b,w}); ADJ[b].push({to:a,w}); });

const CAT_LABELS = {all:'Semua',rsud:'RS Pemerintah',rsswasta:'RS Swasta',puskesmas:'Puskesmas',klinik:'Klinik',damkar:'PMK/BPBD'};
const CAT_COLORS = {rsud:'#dc2626',rsswasta:'#2563eb',puskesmas:'#059669',klinik:'#7c3aed',damkar:'#d97706'};
const CAT_ICONS  = {
  rsud: '<i class="fa-solid fa-hospital-user"></i>',
  rsswasta: '<i class="fa-solid fa-hospital"></i>',
  puskesmas: '<i class="fa-solid fa-stethoscope"></i>',
  klinik: '<i class="fa-solid fa-house-medical"></i>',
  damkar: '<i class="fa-solid fa-fire-extinguisher"></i>'
};
const WILAYAH_LABELS = {all:'Semua Wilayah',pusat:'Pusat',barat:'Barat',utara:'Utara',selatan:'Selatan',timur:'Timur'};
let activeWilayah = 'all';

// ── STATE ──
let srcId=null, stops=[], algo='dijkstra', animSpd=40, running=false;
let visitedMarkers=[], pathLines=[], mstLines=[], allMarkers=[], baseEdgeLines=[], baseEdgeLabels=[];
let activeCategory='all';
let solveId=0;
let srcPlaceholderRemoved=false, dstPlaceholderRemoved=false;

// OSRM route cache (seperti Quiz 2)
const routeCache={};
const geomRequests={};

// Benchmark state
let benchSizes = new Set([100,500,1000,5000,10000]);

// ── PETA (OpenStreetMap — stabil, no API key) ──
const map = L.map('map',{zoomControl:true}).setView([-7.265,112.745],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);

// ── OSRM: Ambil geometri jalan nyata (seperti Quiz 2) ──
async function fetchOSRM(latA,lngA,latB,lngB){
  const url=`https://router.project-osrm.org/route/v1/driving/${lngA},${latA};${lngB},${latB}?overview=full&geometries=geojson`;
  const controller=new AbortController();
  const tid=setTimeout(()=>controller.abort(),4000);
  try{
    const r=await fetch(url,{signal:controller.signal});
    clearTimeout(tid);
    const d=await r.json();
    if(d.routes&&d.routes[0])
      return d.routes[0].geometry.coordinates.map(([lng,lat])=>([lat,lng]));
  }catch(e){ clearTimeout(tid); }
  // Fallback: garis lurus
  return [[latA,lngA],[latB,lngB]];
}

async function getRouteGeom(a,b){
  const key=`${Math.min(a,b)}-${Math.max(a,b)}`;
  if(routeCache[key]) return routeCache[key];
  if(geomRequests[key]) return await geomRequests[key];
  const pa=PLACES[a], pb=PLACES[b];
  geomRequests[key]=fetchOSRM(pa.lat,pa.lng,pb.lat,pb.lng);
  const geom=await geomRequests[key];
  routeCache[key]=geom;
  delete geomRequests[key];
  return geom;
}

// Gambar semua edge sebagai garis dasar
function drawBaseEdges(){
  baseEdgeLines.forEach(l=>map.removeLayer(l)); baseEdgeLines=[];
  baseEdgeLabels.forEach(m=>map.removeLayer(m)); baseEdgeLabels=[];
  EDGES.forEach(([a,b,w])=>{
    const pa=PLACES[a], pb=PLACES[b];
    const l=L.polyline([[pa.lat,pa.lng],[pb.lat,pb.lng]],{
      color:'#cbd5e1',weight:1.5,opacity:.5,dashArray:'5 5'
    }).addTo(map);
    baseEdgeLines.push(l);
    const ml=(pa.lat+pb.lat)/2, mg=(pa.lng+pb.lng)/2;
    const mk=L.marker([ml,mg],{
      icon:L.divIcon({html:`<div style="font-size:8px;color:#94a3b8;background:rgba(255,255,255,.88);padding:1px 4px;border-radius:3px;border:1px solid #e2e8f0;white-space:nowrap;">${w}km</div>`,className:'',iconAnchor:[14,7]}),
      interactive:false
    }).addTo(map);
    baseEdgeLabels.push(mk);
  });
}
drawBaseEdges();

// ── IKON MARKER ──
function makeIcon(p){
  const isSrc=srcId!==null&&p.id===srcId, isStop=stops.includes(p.id);
  const bg=isSrc?'#ef4444':isStop?'#059669':(CAT_COLORS[p.cat]||'#dc2626');
  const sz=isSrc?38:isStop?34:26;
  const brd=isSrc?'3px solid #fff':isStop?'2.5px solid #6ee7b7':'1.5px solid rgba(255,255,255,.9)';
  const extraClass=isSrc?' pulse-marker':'';
  let content;
  if(isSrc) content=`<i class="fa-solid fa-location-dot" style="font-size:15px;color:#fff;pointer-events:none;user-select:none"></i>`;
  else if(isStop) content=`<span style="font-size:11px;font-weight:800;color:#fff;pointer-events:none;user-select:none">${stops.indexOf(p.id)+1}</span>`;
  else content=`<span style="font-size:11px;color:#fff;pointer-events:none;user-select:none">${CAT_ICONS[p.cat]||'<i class="fa-solid fa-hospital"></i>'}</span>`;
  return L.divIcon({
    html:`<div class="${extraClass}" style="width:${sz}px;height:${sz}px;border-radius:50%;background:${bg};border:${brd};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.25);cursor:pointer;pointer-events:auto;user-select:none">${content}</div>`,
    className:'',iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]
  });
}

function makePopup(p){
  const isSrc=srcId!==null&&p.id===srcId, isStop=stops.includes(p.id);
  const badge=isSrc?'<span class="pc-badge src"><i class="fa-solid fa-triangle-exclamation"></i> Lokasi Darurat</span>':isStop?'<span class="pc-badge stop"><i class="fa-solid fa-circle-check"></i> Tujuan Dipilih</span>':'';
  const conns=ADJ[p.id].map(e=>`${PLACES[e.to].name.split(' ')[0]}(${e.w}km)`).join(' · ');
  const bedInfo=p.beds>0?`<div class="pc-row"><i class="fa-solid fa-bed"></i> <b>Kapasitas:</b>&nbsp;${p.beds} bed</div>`:'';
  return`<div class="pc">
    <div class="pc-h"><div><div class="pc-name">${p.name}</div><div class="pc-cat">${CAT_ICONS[p.cat]} &nbsp;${CAT_LABELS[p.cat]||p.cat}</div></div></div>
    ${badge?`<div style="margin-bottom:6px">${badge}</div>`:''}
    <div class="pc-desc">${p.desc}</div>
    <div class="pc-div"></div>
    <div class="pc-row"><i class="fa-solid fa-clock"></i> <b>IGD:</b>&nbsp;${p.igd}</div>
    ${bedInfo}
    <div class="pc-row"><i class="fa-solid fa-phone"></i> <b>Tel:</b>&nbsp;${p.phone}</div>
    <div class="pc-conns"><i class="fa-solid fa-link"></i> <div>${conns}</div></div>
    ${!isStop&&p.id!==srcId?`<button class="pc-addBtn" onclick="addStopById(${p.id})"><i class="fa-solid fa-plus"></i> Tambah ke Rute</button>`:''}
  </div>`;
}

function drawAllMarkers(){
  allMarkers.forEach(m=>map.removeLayer(m)); allMarkers=[];
  PLACES.forEach(p=>{
    const m=L.marker([p.lat,p.lng],{
      icon:makeIcon(p),draggable:false,interactive:true,bubblingMouseEvents:false,keyboard:false
    }).addTo(map);
    m.bindPopup(makePopup(p),{maxWidth:260,autoPan:true,closeButton:true,offset:[0,-10]});
    m.on('mousedown', L.DomEvent.stopPropagation);
    m.on('click', function(e){ L.DomEvent.stop(e); map.closePopup(); setTimeout(()=>this.openPopup(),10); });
    allMarkers.push(m);
  });
}
drawAllMarkers();

// ── DROPDOWN ──
function buildCatFilter(){
  const cats=['all','rsud','rsswasta','puskesmas','klinik','damkar'];
  document.getElementById('catWrap').innerHTML=cats.map(c=>
    `<button class="catbtn${c===activeCategory?' on':''}" onclick="setCategory('${c}',this)">${CAT_LABELS[c]}</button>`
  ).join('');
}
function setCategory(cat,btn){
  activeCategory=cat;
  document.querySelectorAll('.catbtn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  buildDstSelect();
}
function buildDstSelect(){
  const dst=document.getElementById('selDst');
  let pool=PLACES;
  if(activeCategory!=='all') pool=pool.filter(p=>p.cat===activeCategory);
  if(activeWilayah!=='all') pool=pool.filter(p=>p.wilayah===activeWilayah);
  let opts='';
  if(!dstPlaceholderRemoved) opts+=`<option value="" disabled selected>Pilih fasilitas tujuan</option>`;
  opts+=pool.map(p=>{
    const prefix = p.cat === 'user' ? '' : `[${CAT_LABELS[p.cat]||p.cat}] `;
    return `<option value="${p.id}">${prefix}${p.name}${p.wilayah&&p.wilayah!=='pusat'?' ('+(WILAYAH_LABELS[p.wilayah]||p.wilayah)+')':''}</option>`;
  }).join('');
  dst.innerHTML=opts;
}

function buildWilayahFilter(){
  const el=document.getElementById('wilayahWrap');
  if(!el) return;
  const wils=['all','pusat','barat','utara','selatan','timur'];
  el.innerHTML=wils.map(w=>
    `<button class="catbtn${w===activeWilayah?' on':''}" onclick="setWilayah('${w}',this)">${WILAYAH_LABELS[w]}</button>`
  ).join('');
}
function setWilayah(w,btn){
  activeWilayah=w;
  document.querySelectorAll('#wilayahWrap .catbtn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  buildDstSelect();
}
function populateSrc(){
  const src=document.getElementById('selSrc');
  let opts='';
  if(!srcPlaceholderRemoved) opts+=`<option value="" disabled selected>Pilih lokasi kejadian</option>`;
  opts+=PLACES.map(p=>{
    const prefix = p.cat === 'user' ? '' : `[${CAT_LABELS[p.cat]||p.cat}] `;
    return `<option value="${p.id}">${prefix}${p.name}</option>`;
  }).join('');
  src.innerHTML=opts;
}
populateSrc(); buildDstSelect(); buildCatFilter();

function onSrcChange(){
  srcId=parseInt(document.getElementById('selSrc').value);
  srcPlaceholderRemoved=true;
  populateSrc();
  document.getElementById('selSrc').value=srcId;
  clearRoute(); drawAllMarkers();
  log(`Lokasi darurat: ${PLACES[srcId].name}`,'lb');
}
function onDstChange(){
  dstPlaceholderRemoved=true;
  const v=document.getElementById('selDst').value;
  buildDstSelect();
  document.getElementById('selDst').value=v;
}

// ── STOPS ──
function addStop(){
  const val=document.getElementById('selDst').value;
  if(!val){log('Pilih fasilitas tujuan terlebih dahulu!','lr');return;}
  addStopById(parseInt(val));
}
function addStopById(v){
  if(v===srcId){log('Tujuan sama dengan lokasi darurat!','lr');return;}
  if(stops.includes(v)){log('Sudah ada di rute!','lr');return;}
  if(stops.length>=5){log('Maks 5 tujuan.','lr');return;}
  stops.push(v); renderStops(); drawAllMarkers();
  map.setView([PLACES[v].lat,PLACES[v].lng],15);
  log(`Tambah: ${PLACES[v].name}`,'lb');
}
function removeStop(id){stops=stops.filter(s=>s!==id);renderStops();clearRoute();drawAllMarkers();}
function renderStops(){
  const el=document.getElementById('stopList');
  document.getElementById('stopCount').textContent=stops.length;
  if(!stops.length){el.innerHTML='<div style="font-size:.74rem;color:var(--text3);text-align:center;padding:8px;">Belum ada tujuan dipilih</div>';return;}
  el.innerHTML=stops.map((id,i)=>`
    <div class="stop-item">
      <div class="s-num">${i+1}</div>
      <span style="flex:1;font-size:.77rem">${CAT_ICONS[PLACES[id].cat]} &nbsp;${PLACES[id].name}</span>
      <button class="s-del" onclick="removeStop(${id})"><i class="fa-solid fa-xmark"></i></button>
    </div>`).join('');
}

// ════════════════════════════════════════════════
//  ALGORITMA (FROM SCRATCH — no library)
// ════════════════════════════════════════════════

/** Min-Heap untuk Dijkstra — O(log n) push/pop */
class MinHeap{
  constructor(){this.h=[];}
  push(x){this.h.push(x);this._up(this.h.length-1);}
  pop(){if(this.h.length===1)return this.h.pop();const t=this.h[0];this.h[0]=this.h.pop();this._dn(0);return t;}
  get size(){return this.h.length;}
  _up(i){while(i>0){const p=(i-1)>>1;if(this.h[p][0]<=this.h[i][0])break;[this.h[p],this.h[i]]=[this.h[i],this.h[p]];i=p;}}
  _dn(i){const n=this.h.length;while(true){let s=i,l=2*i+1,r=2*i+2;if(l<n&&this.h[l][0]<this.h[s][0])s=l;if(r<n&&this.h[r][0]<this.h[s][0])s=r;if(s===i)break;[this.h[s],this.h[i]]=[this.h[i],this.h[s]];i=s;}}
}

/** Union-Find dengan path compression + rank untuk Kruskal */
class UnionFind{
  constructor(n){this.p=[...Array(n).keys()];this.r=new Array(n).fill(0);}
  find(x){if(this.p[x]!==x)this.p[x]=this.find(this.p[x]);return this.p[x];}
  union(a,b){const ra=this.find(a),rb=this.find(b);if(ra===rb)return false;if(this.r[ra]<this.r[rb])this.p[ra]=rb;else if(this.r[ra]>this.r[rb])this.p[rb]=ra;else{this.p[rb]=ra;this.r[ra]++;}return true;}
}

/** DIJKSTRA — O((V+E) log V)
 *  Menggunakan MinHeap. Optimal untuk bobot non-negatif. */
function dijkstraRun(src, tgt, adjMap, nodes){
  adjMap = adjMap || ADJ;
  nodes  = nodes  || PLACES.map(p=>p.id);
  const dist={}, prev={}, vis=[];
  nodes.forEach(id=>dist[id]=Infinity);
  dist[src]=0;
  const heap=new MinHeap();
  heap.push([0,src]);
  while(heap.size){
    const[d,u]=heap.pop();
    if(vis.includes(u)) continue;
    vis.push(u);
    if(u===tgt) break;
    for(const{to,w} of (adjMap[u]||[]))
      if(d+w<dist[to]){dist[to]=d+w;prev[to]=u;heap.push([d+w,to]);}
  }
  return{dist:dist[tgt],prev,visited:vis};
}

/** BELLMAN-FORD — O(V·E)
 *  Relaksasi semua edge V-1 kali. Handle bobot negatif.
 *  Termasuk deteksi negative cycle (iterasi ke-V). */
function bellmanFordRun(src, tgt, edgeList, nodes){
  edgeList = edgeList || EDGES;
  nodes    = nodes    || PLACES.map(p=>p.id);
  const V=nodes.length;
  const dist={}, prev={};
  nodes.forEach(id=>{dist[id]=Infinity;prev[id]=undefined;});
  dist[src]=0;
  const vis=[src];
  let hasNegCycle=false;

  for(let i=0;i<V-1;i++){
    let updated=false;
    for(const[a,b,w] of edgeList){
      if(dist[a]!==Infinity&&dist[a]+w<dist[b]){
        dist[b]=dist[a]+w; prev[b]=a; updated=true;
        if(!vis.includes(b)) vis.push(b);
      }
      if(dist[b]!==Infinity&&dist[b]+w<dist[a]){
        dist[a]=dist[b]+w; prev[a]=b; updated=true;
        if(!vis.includes(a)) vis.push(a);
      }
    }
    if(!updated) break;
  }
  // Deteksi negative cycle (iterasi ke-V)
  for(const[a,b,w] of edgeList){
    if(dist[a]!==Infinity&&dist[a]+w<dist[b]) hasNegCycle=true;
    if(dist[b]!==Infinity&&dist[b]+w<dist[a]) hasNegCycle=true;
  }
  return{dist:dist[tgt],prev,visited:vis,hasNegCycle};
}

/** KRUSKAL MST — O(E log E)
 *  Sort edge + Union-Find. Membangun jaringan minimum
 *  yang menghubungkan semua node (MST). */
function kruskalRun(edgeList, nodeCount){
  edgeList  = edgeList  || EDGES;
  nodeCount = nodeCount || PLACES.length;
  const idToIdx={};
  PLACES.forEach((p,i)=>idToIdx[p.id]=i);
  const uf=new UnionFind(nodeCount);
  const sorted=[...edgeList].sort((a,b)=>a[2]-b[2]);
  const mst=[];let totalW=0;
  for(const[a,b,w] of sorted){
    const ia = idToIdx[a]!==undefined ? idToIdx[a] : a;
    const ib = idToIdx[b]!==undefined ? idToIdx[b] : b;
    if(uf.union(ia,ib)){
      mst.push([a,b,w]); totalW+=w;
      if(mst.length===nodeCount-1) break;
    }
  }
  const visited=[...new Set(mst.flatMap(e=>[e[0],e[1]]))];
  return{mst,totalW:+totalW.toFixed(2),visited};
}

/** Cari RS terdekat dari node srcId */
function findNearestRS(fromId){
  const rsNodes=PLACES.filter(p=>p.cat==='rsud'||p.cat==='rsswasta').map(p=>p.id);
  let bestDist=Infinity, bestId=null, bestPrev=null;
  for(const rsId of rsNodes){
    const res=dijkstraRun(fromId,rsId);
    if(res.dist<bestDist){bestDist=res.dist;bestId=rsId;bestPrev=res.prev;}
  }
  return{dist:bestDist,id:bestId,prev:bestPrev};
}

/** Rekonstruksi jalur dari tabel prev[] */
function recon(prev,src,tgt){
  const p=[];let c=tgt,iter=0;
  while(c!==undefined&&iter<100){p.unshift(c);if(c===src)break;c=prev[c];iter++;}
  return p[0]===src?p:null;
}

// ── PSEUDOCODE DATA ──
const PSEUDO={
  dijkstra:[
    {id:'d1', text:`<span class="kw">function</span> <span class="fn">Dijkstra</span>(<span class="vr">graph</span>, <span class="vr">src</span>, <span class="vr">tgt</span>):`},
    {id:'d2', text:`  <span class="kw">for each</span> node <span class="vr">v</span>: dist[v] ← <span class="nm">∞</span>`},
    {id:'d3', text:`  dist[<span class="vr">src</span>] ← <span class="nm">0</span>`},
    {id:'d4', text:`  heap ← MinHeap(); heap.<span class="fn">push</span>([<span class="nm">0</span>, src])`},
    {id:'d5', text:`  <span class="kw">while</span> heap <span class="kw">not empty</span>:`},
    {id:'d6', text:`    [d, u] ← heap.<span class="fn">extractMin</span>()`},
    {id:'d7', text:`    <span class="kw">if</span> u ∈ visited: <span class="kw">continue</span>`},
    {id:'d8', text:`    visited.<span class="fn">add</span>(u)`},
    {id:'d9', text:`    <span class="kw">if</span> u == tgt: <span class="kw">break</span>`},
    {id:'d10',text:`    <span class="kw">for each</span> (v, w) <span class="kw">in</span> adj[u]:`},
    {id:'d11',text:`      <span class="kw">if</span> d + w &lt; dist[v]:  <span class="cm">// relaksasi</span>`},
    {id:'d12',text:`        dist[v] ← d + w; prev[v] ← u`},
    {id:'d13',text:`        heap.<span class="fn">push</span>([dist[v], v])`},
    {id:'d14',text:`  <span class="kw">return</span> <span class="fn">reconstruct</span>(prev, src, tgt)`},
  ],
  bellman:[
    {id:'b1', text:`<span class="kw">function</span> <span class="fn">BellmanFord</span>(<span class="vr">graph</span>, <span class="vr">src</span>, <span class="vr">tgt</span>):`},
    {id:'b2', text:`  <span class="kw">for each</span> node <span class="vr">v</span>: dist[v] ← <span class="nm">∞</span>`},
    {id:'b3', text:`  dist[<span class="vr">src</span>] ← <span class="nm">0</span>`},
    {id:'b4', text:`  <span class="kw">for</span> i ← <span class="nm">1</span> <span class="kw">to</span> V-1:  <span class="cm">// ${PLACES.length-1} iterasi</span>`},
    {id:'b5', text:`    updated ← <span class="nm">false</span>`},
    {id:'b6', text:`    <span class="kw">for each</span> edge (u,v,w) <span class="kw">in</span> E:  <span class="cm">// ${EDGES.length} edges</span>`},
    {id:'b7', text:`      <span class="kw">if</span> dist[u] + w &lt; dist[v]:  <span class="cm">// relaksasi</span>`},
    {id:'b8', text:`        dist[v] ← dist[u] + w; prev[v] ← u`},
    {id:'b9', text:`        updated ← <span class="nm">true</span>`},
    {id:'b10',text:`    <span class="kw">if not</span> updated: <span class="kw">break</span>  <span class="cm">// early stop</span>`},
    {id:'b11',text:`  <span class="cm">// Iterasi ke-V: deteksi negative cycle</span>`},
    {id:'b12',text:`  <span class="kw">for each</span> edge (u,v,w): <span class="kw">if</span> dist[u]+w &lt; dist[v]: negCycle=<span class="nm">true</span>`},
    {id:'b13',text:`  <span class="kw">return</span> <span class="fn">reconstruct</span>(prev, src, tgt), negCycle`},
  ],
  kruskal:[
    {id:'k1', text:`<span class="kw">function</span> <span class="fn">Kruskal</span>(<span class="vr">graph</span>):`},
    {id:'k2', text:`  <span class="kw">for each</span> v: <span class="fn">makeSet</span>(v)  <span class="cm">// UnionFind init</span>`},
    {id:'k3', text:`  edges ← <span class="fn">sort</span>(E, key=weight)  <span class="cm">// O(E log E)</span>`},
    {id:'k4', text:`  mst ← []`},
    {id:'k5', text:`  <span class="kw">for each</span> (u, v, w) <span class="kw">in</span> sorted edges:`},
    {id:'k6', text:`    <span class="kw">if</span> <span class="fn">find</span>(u) ≠ <span class="fn">find</span>(v):  <span class="cm">// no cycle</span>`},
    {id:'k7', text:`      mst.<span class="fn">add</span>((u,v,w))`},
    {id:'k8', text:`      <span class="fn">union</span>(u, v)  <span class="cm">// path compression + rank</span>`},
    {id:'k9', text:`      <span class="kw">if</span> |mst| == V-1: <span class="kw">break</span>`},
    {id:'k10',text:`  <span class="kw">return</span> mst  <span class="cm">// minimum spanning tree</span>`},
  ],
};

function renderPseudo(k){
  document.getElementById('pseudoBlock').innerHTML=
    `<div class="pseudo">${(PSEUDO[k]||[]).map(l=>`<span class="pln" id="pln-${l.id}">${l.text}</span>`).join('')}</div>`;
}
function hlPseudo(lineId){
  document.querySelectorAll('.pln').forEach(el=>el.classList.remove('hl'));
  if(lineId){
    const el=document.getElementById('pln-'+lineId);
    if(el) el.classList.add('hl');
  }
}

// ── UTILS ──
function sleep(ms){return ms>0?new Promise(r=>setTimeout(r,ms)):Promise.resolve();}
function log(msg,cls=''){
  const lb=document.getElementById('logBox');
  const d=document.createElement('div');
  if(cls) d.className=cls;
  d.innerHTML='> '+msg;
  lb.appendChild(d); lb.scrollTop=lb.scrollHeight;
}
function setProgress(pct){document.getElementById('prog').style.width=pct+'%';}

// ── KONTROL ──
function setAlgo(a,el){
  algo=a;
  document.querySelectorAll('.apill').forEach(p=>p.classList.remove('on','d','b','k'));
  el.classList.add('on',{dijkstra:'d',bellman:'b',kruskal:'k'}[a]);
  ['dijkstra','bellman','kruskal'].forEach(k=>{
    const m=document.getElementById('ami-'+k);
    if(m) m.classList.toggle('show',k===a);
  });
  renderPseudo(a); clearRoute();
}
function setSpd(ms,el){
  animSpd=ms;
  document.querySelectorAll('.spd').forEach(s=>s.classList.remove('on'));
  el.classList.add('on');
}
function toggleSec(h){
  h.classList.toggle('open');
  h.nextElementSibling?.classList.toggle('open');
}
function switchTab(id,el){
  document.querySelectorAll('.rp-tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.rp-pane').forEach(p=>p.classList.remove('on'));
  el.classList.add('on');
  document.getElementById('pane-'+id).classList.add('on');
}
function toggleTheme(){
  document.body.classList.toggle('dark');
  localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light');
}
function logout(){
  document.getElementById('mainApp').style.display='none';
  document.getElementById('loginScreen').style.display='flex';
  document.getElementById('username').value='';
  document.getElementById('password').value='';
}
function attemptLogin(){
  const u=document.getElementById('username').value.trim();
  const p=document.getElementById('password').value.trim();
  const err=document.getElementById('loginError');
  if(u==='admin'&&p==='daa2026'){
    err.style.display='none';
    document.getElementById('loginScreen').style.display='none';
    document.getElementById('mainApp').style.display='flex';
    renderPseudo('dijkstra');
    if(localStorage.getItem('theme')==='dark') document.body.classList.add('dark');
    log('Login berhasil. Sistem siaga <i class="fa-solid fa-shield-halved"></i>','lb');
    setTimeout(()=>map.invalidateSize(),200);
  }else{
    err.style.display='block';
    document.getElementById('password').value='';
    setTimeout(()=>{err.style.display='none';},3000);
  }
}
document.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&document.getElementById('loginScreen').style.display!=='none') attemptLogin();
});

// ── CLEAR/RESET ──
function clearRoute(){
  visitedMarkers.forEach(m=>map.removeLayer(m)); visitedMarkers=[];
  pathLines.forEach(l=>map.removeLayer(l)); pathLines=[];
  mstLines.forEach(l=>map.removeLayer(l)); mstLines=[];
  ['sDist','sStops','sEta','sTime','sRoute'].forEach(id=>{ const el = document.getElementById(id); if(el) el.textContent='—'; });
  document.getElementById('routeSteps').innerHTML='<div style="font-size:.74rem;color:var(--text3)">Klik "Cari Rute Darurat" untuk memulai.</div>';
  document.getElementById('kruskalPanel').style.display='none';
  document.getElementById('pathStepsWrap').style.display='';
  document.getElementById('explainContent').innerHTML=`<div class="insight b" style="font-size:.77rem;line-height:1.75"><b>Penjelasan algoritma</b> akan muncul setelah rute ditemukan.</div>`;
  setProgress(0);
}
function resetAll(){
  srcId=null; stops=[]; srcPlaceholderRemoved=false; dstPlaceholderRemoved=false;
  activeCategory='all';
  populateSrc(); buildDstSelect(); buildCatFilter();
  clearRoute(); drawAllMarkers();
  log('Reset semua <i class="fa-solid fa-circle-check"></i>');
}

// ── FITUR: CARI RS TERDEKAT ──
function findNearest(){
  if(srcId===null){log('Pilih lokasi darurat dulu!','lr');return;}
  log('Mencari RS terdekat dari semua wilayah...','lb');

  // Cari RS terdekat per wilayah (RS Umum Pemerintah + RS Swasta 24 Jam/IGD)
  const rsNodes = PLACES.filter(p => 
    p.cat === 'rsud' || 
    (p.cat === 'rsswasta' && (String(p.igd).toLowerCase().includes('24') || p.igd === true))
  );
  const byWilayah = {};
  rsNodes.forEach(p=>{
    const w = p.wilayah||'pusat';
    if(!byWilayah[w]) byWilayah[w]=[];
    byWilayah[w].push(p);
  });

  // Cari yang paling dekat overall
  let bestDist=Infinity, bestId=null, bestPrev=null, bestWilayah='';
  const wilayahResults = [];
  for(const [wLabel, nodes] of Object.entries(byWilayah)){
    let wBestDist=Infinity, wBestId=null, wBestPrev=null;
    for(const p of nodes){
      const res = (algo === 'bellman') ? bellmanFordRun(srcId, p.id) : dijkstraRun(srcId, p.id);
      if(res.dist<wBestDist){wBestDist=res.dist;wBestId=p.id;wBestPrev=res.prev;}
      if(res.dist<bestDist){bestDist=res.dist;bestId=p.id;bestPrev=res.prev;bestWilayah=wLabel;}
    }
    if(wBestId!==null) wilayahResults.push({wilayah:wLabel,id:wBestId,dist:wBestDist});
  }

  if(!bestId){log('Tidak ada RS ditemukan','lr');return;}

  // Tampilkan hasil per wilayah di panel
  const wLabels = WILAYAH_LABELS;
  const resultHTML = wilayahResults
    .sort((a,b)=>a.dist-b.dist)
    .map((r,i)=>`
      <div class="r-step" style="${r.id===bestId?'background:var(--success-bg);border-radius:6px;':''}">
        <div class="r-dot${i===0?' start':''}"></div>
        <div>
          <div class="r-node">${i===0?'<i class="fa-solid fa-trophy" style="color:var(--warning)"></i> ':''}<b>${wLabels[r.wilayah]||r.wilayah}</b> — ${PLACES[r.id].name.split(' ').slice(0,3).join(' ')}</div>
          <div class="r-dist">${r.dist.toFixed(2)} km${i===0?' · <b style="color:var(--success)">Terdekat!</b>':''}</div>
        </div>
      </div>`).join('');

  document.getElementById('routeSteps').innerHTML=`
    <div style="font-size:.72rem;font-weight:600;color:var(--text-secondary);margin-bottom:6px">RS Terdekat per Wilayah</div>
    ${resultHTML}`;
  document.getElementById('sDist').textContent=bestDist.toFixed(2)+' km';
  document.getElementById('sStops').textContent='1 RS';
  const etaMins = (bestDist / 40) * 60;
  document.getElementById('sEta').textContent=etaMins.toFixed(0)+' menit';
  document.getElementById('sTime').textContent='Dijkstra';

  stops=[bestId]; renderStops(); drawAllMarkers();
  log(`RS terdekat: ${PLACES[bestId].name} · ${wLabels[bestWilayah]||bestWilayah} · ${bestDist.toFixed(1)} km`,'lg');
  solve();
}

// ── FITUR: COMPARE MODE ──
async function compareAlgos(){
  if(srcId===null||stops.length===0){log('Pilih lokasi & tujuan dulu!','lr');return;}
  if(running){log('Tunggu proses selesai dulu!','lr');return;}
  running=true;
  const tgt=stops[0];
  const sid=++solveId;
  clearRoute();
  log('Membandingkan Dijkstra vs Bellman-Ford...','lb');

  const t1=performance.now(); const rD=dijkstraRun(srcId,tgt); const msD=performance.now()-t1;
  const t3=performance.now(); const rB=bellmanFordRun(srcId,tgt); const msB=performance.now()-t3;

  // Gambar rute Dijkstra (merah) di peta
  const pathD=recon(rD.prev,srcId,tgt);
  if(pathD){
    for(let i=0;i<pathD.length-1;i++){
      if(sid!==solveId) break;
      const geom=await getRouteGeom(pathD[i],pathD[i+1]);
      const line=L.polyline(geom,{color:'#dc2626',weight:6,opacity:.85,dashArray:null}).addTo(map);
      pathLines.push(line);
    }
  }

  // Gambar rute Bellman-Ford (biru, dashed) di peta
  const pathB=recon(rB.prev,srcId,tgt);
  if(pathB){
    for(let i=0;i<pathB.length-1;i++){
      if(sid!==solveId) break;
      const geom=await getRouteGeom(pathB[i],pathB[i+1]);
      const line=L.polyline(geom,{color:'#2563eb',weight:4,opacity:.8,dashArray:'8 5'}).addTo(map);
      pathLines.push(line);
    }
  }

  // Fit bounds
  if(pathD&&pathD.length>0){
    const pts=pathD.map(id=>[PLACES[id].lat,PLACES[id].lng]);
    map.fitBounds(L.latLngBounds(pts),{padding:[40,40]});
  }

  showComparePanel(rD,rB,msD,msB,srcId,tgt);
  log(`Compare selesai — Dijkstra: ${msD.toFixed(2)}ms | BF: ${msB.toFixed(2)}ms`,'lg');
  running=false;
}
function showComparePanel(rD,rB,msD,msB,src,tgt){
  const srcN=PLACES[src].name.split(' ').slice(0,2).join(' ');
  const tgtN=PLACES[tgt].name.split(' ').slice(0,2).join(' ');
  const negMsg=rB.hasNegCycle?'<div class="insight r" style="margin-top:4px"><i class="fa-solid fa-triangle-exclamation"></i> <b>Negative cycle terdeteksi</b> oleh Bellman-Ford!</div>':'';
  document.getElementById('explainContent').innerHTML=`
    <div class="expl-block">
      <div class="expl-head d"><i class="fa-solid fa-scale-balanced"></i> Dijkstra vs Bellman-Ford</div>
      <div class="expl-body">
        <div style="font-size:.72rem;color:var(--text-tertiary);margin-bottom:4px">${srcN} → ${tgtN}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <div style="background:var(--primary-glow);border:1px solid rgba(244, 63, 94, 0.2);border-radius:8px;padding:10px">
            <div style="font-size:.65rem;font-weight:700;color:var(--primary);margin-bottom:6px">DIJKSTRA</div>
            <div style="font-family:var(--font-mono);font-size:1rem;font-weight:700;color:var(--primary)">${rD.dist===Infinity?'∞':rD.dist.toFixed(2)+' km'}</div>
            <div style="font-size:.68rem;color:var(--text-tertiary);margin-top:2px">${msD.toFixed(3)} ms</div>
            <div style="font-size:.65rem;color:var(--text-secondary);margin-top:4px">${rD.visited.length} node dikunjungi</div>
            <div class="tag tag-r" style="margin-top:4px;display:inline-block">O((V+E)logV)</div>
          </div>
          <div style="background:var(--info-bg);border:1px solid var(--info-border);border-radius:8px;padding:10px">
            <div style="font-size:.65rem;font-weight:700;color:var(--info);margin-bottom:6px">BELLMAN-FORD</div>
            <div style="font-family:var(--font-mono);font-size:1rem;font-weight:700;color:var(--info)">${rB.dist===Infinity?'∞':rB.dist.toFixed(2)+' km'}</div>
            <div style="font-size:.68rem;color:var(--text-tertiary);margin-top:2px">${msB.toFixed(3)} ms</div>
            <div style="font-size:.65rem;color:var(--text-secondary);margin-top:4px">${rB.visited.length} node dikunjungi</div>
            <div class="tag tag-b" style="margin-top:4px;display:inline-block">O(V·E)</div>
          </div>
        </div>
        ${negMsg}
        <div class="insight ${rD.dist===rB.dist?'g':'r'}" style="margin-top:4px">
          ${rD.dist===rB.dist
            ?`<i class="fa-solid fa-circle-check"></i> <b>Hasil sama</b> — ${rD.dist.toFixed(2)} km. Cross-check passed!`
            :`<i class="fa-solid fa-triangle-exclamation"></i> Hasil berbeda — Dijkstra: ${rD.dist.toFixed(2)} km, BF: ${rB.dist.toFixed(2)} km`}
        </div>
        <div class="insight a">
          <b>Performa:</b> Dijkstra ${(msB/Math.max(msD,0.001)).toFixed(1)}× lebih cepat dari Bellman-Ford pada graph ini.
        </div>
      </div>
    </div>`;
  document.querySelectorAll('.rp-tab').forEach((t,i)=>t.classList.toggle('on',i===1));
  document.querySelectorAll('.rp-pane').forEach((p,i)=>p.classList.toggle('on',i===1));
}

// ── ANIMASI ──
async function animateVisited(visited,sid){
  for(const v of visited){
    if(sid!==solveId) return;
    if(v===srcId||stops.includes(v)) continue;
    const p=PLACES[v];
    const m=L.circleMarker([p.lat,p.lng],{radius:7,fillColor:'rgba(220,38,38,.2)',fillOpacity:1,color:'rgba(220,38,38,.35)',weight:1}).addTo(map);
    visitedMarkers.push(m);
    if(animSpd>0) {
      if(algo === 'dijkstra'){
        hlPseudo('d5'); await sleep(animSpd * 0.1);
        hlPseudo('d6'); await sleep(animSpd * 0.1);
        hlPseudo('d8'); await sleep(animSpd * 0.1);
        hlPseudo('d11'); await sleep(animSpd * 0.1);
        hlPseudo('d13'); await sleep(animSpd * 0.1);
      } else if(algo === 'bellman') {
        hlPseudo('b4'); await sleep(animSpd * 0.15);
        hlPseudo('b6'); await sleep(animSpd * 0.15);
        hlPseudo('b7'); await sleep(animSpd * 0.1);
        hlPseudo('b9'); await sleep(animSpd * 0.1);
      }
      await sleep(animSpd/2);
    }
  }
}

// drawPath: pakai OSRM untuk rute mengikuti jalan nyata (seperti Quiz 2)
async function drawPath(path,sid){
  for(let i=0;i<path.length-1;i++){
    if(sid!==solveId) return;
    const a=path[i], b=path[i+1];
    // Fetch geometri jalan nyata via OSRM
    const geom=await getRouteGeom(a,b);
    if(sid!==solveId) return;
    const line=L.polyline(geom,{color:'#dc2626',weight:5,opacity:.9}).addTo(map);
    pathLines.push(line);
    if(animSpd>0) {
      hlPseudo(algo === 'dijkstra' ? 'd14' : 'b13');
      await sleep(animSpd);
    }
  }
  const pts=path.map(id=>[PLACES[id].lat,PLACES[id].lng]);
  if(pts.length>0) map.fitBounds(L.latLngBounds(pts),{padding:[40,40]});
}

// ── RENDER PANEL ──
function renderRouteSteps(steps){
  document.getElementById('routeSteps').innerHTML=steps.map((s,i)=>`
    <div class="r-step">
      <div class="r-dot${i===0?' start':''}${i===steps.length-1?' end':''}"></div>
      <div>
        <div class="r-node">${s.from.split(' ').slice(0,2).join(' ')} → ${s.to.split(' ').slice(0,2).join(' ')}</div>
        <div class="r-dist">${s.dist} km · estimasi ${((s.dist/40)*60).toFixed(0)} menit</div>
      </div>
    </div>`).join('');
}

function renderKruskalPanel(result){
  document.getElementById('pathStepsWrap').style.display='none';
  const panel=document.getElementById('kruskalPanel');
  panel.style.display='block';
  panel.innerHTML=`
    <div class="expl-block">
      <div class="expl-head k"><i class="fa-solid fa-circle-nodes"></i> Kruskal MST — Jaringan Ambulans Minimum</div>
      <div style="padding:10px 12px">
        <div class="kp-stats">
          <div class="kp-stat"><div class="kp-sl">Total Jarak</div><div class="kp-sv">${result.totalW} km</div></div>
          <div class="kp-stat"><div class="kp-sl">Edge MST</div><div class="kp-sv">${result.mst.length}</div></div>
          <div class="kp-stat"><div class="kp-sl">Node</div><div class="kp-sv">${PLACES.length}</div></div>
          <div class="kp-stat"><div class="kp-sl">Kompleksitas</div><div class="kp-sv" style="font-size:.72rem">O(E log E)</div></div>
        </div>
        <div class="kp-edges-label">Edge MST (urutan dipilih)</div>
        <div class="kp-edge-list">
          ${result.mst.map(([a,b,w],i)=>`
            <div class="kp-edge-item">
              <div class="kp-edge-num">${i+1}</div>
              <div class="kp-edge-name">${PLACES[a].name.split(' ').slice(0,2).join(' ')} ↔ ${PLACES[b].name.split(' ').slice(0,2).join(' ')}</div>
              <div class="kp-edge-km">${w}km</div>
            </div>`).join('')}
        </div>
        <div class="kp-total-bar"><span>Total bobot MST</span><strong>${result.totalW} km</strong></div>
      </div>
    </div>`;
}

function renderExplain(algoKey,visited,path,dist,steps,execMs){
  const isD=algoKey==='dijkstra';
  const color=isD?'d':'b';
  const label=isD?'Dijkstra':'Bellman-Ford';
  document.getElementById('explainContent').innerHTML=`
    <div class="expl-block">
      <div class="expl-head ${color}"><i class="fa-solid fa-brain"></i> ${label} — Penjelasan</div>
      <div class="expl-body">
        <div class="expl-txt">${isD
          ?`Dijkstra menggunakan <b>min-heap priority queue</b>. Setiap iterasi, node jarak terkecil di-extract dan edge-nya di-relaksasi. Kompleksitas <b>O((V+E) log V)</b>.`
          :`Bellman-Ford merelaksasi <b>semua ${EDGES.length} edge sebanyak ${PLACES.length-1} iterasi</b>. Lebih lambat (<b>O(V·E)</b>) namun dapat mendeteksi <b>negative cycle</b> dan menangani bobot negatif.`}
        </div>
        <div class="flabel">Node Dieksplorasi (${[...visited].length})</div>
        <div class="nt-wrap">
          ${[...visited].map((v,i)=>{const inP=path.includes(v);return`
            <div class="nt-item ${inP?'path':'vis'}">
              <div class="nt-num" style="background:${inP?'#059669':'#dc2626'}">${i+1}</div>
              <div><div>${PLACES[v].name.split(' ').slice(0,2).join(' ')}</div>
              <div class="nt-sub">${inP?'<i class="fa-solid fa-circle-check"></i> Bagian dari rute':'Dieksplorasi'}</div></div>
            </div>`}).join('')}
        </div>
        <div class="insight g">
          <b>Hasil:</b> ${dist.toFixed(2)} km · ${[...visited].length} node dikunjungi · ${execMs.toFixed(2)} ms
        </div>
        <div class="insight r">
          <b>Tip:</b> Klik <b><i class="fa-solid fa-scale-balanced"></i> Compare</b> untuk membandingkan kedua algoritma pada rute yang sama.
        </div>
      </div>
    </div>`;
}

function renderExplainKruskal(result,execMs){
  document.getElementById('explainContent').innerHTML=`
    <div class="expl-block">
      <div class="expl-head k"><i class="fa-solid fa-circle-nodes"></i> Kruskal — Penjelasan MST</div>
      <div class="expl-body">
        <div class="expl-txt">Kruskal mengurutkan <b>${EDGES.length} edge</b> berdasarkan bobot, lalu memilih edge terkecil yang tidak membentuk siklus menggunakan <b>Union-Find</b> dengan path compression dan rank.</div>
        <div class="insight a"><b>Kompleksitas:</b> O(E log E) = O(${EDGES.length}·log ${EDGES.length}) ≈ O(${Math.round(EDGES.length*Math.log2(EDGES.length))}) operasi sorting.</div>
        <div class="insight g"><b>Hasil:</b> ${result.mst.length} edge · ${result.totalW} km total · ${execMs.toFixed(2)} ms</div>
        <div class="insight r"><b>Vs Dijkstra/BF:</b> Kruskal output spanning tree (semua node), bukan rute A→B. Ideal untuk merancang jaringan ambulans kota biaya minimum.</div>
      </div>
    </div>`;
}

// ── SOLVE UTAMA ──
async function solve(){
  if(running){log('Sedang berjalan...','lr');return;}
  if(algo==='kruskal'){await solveKruskal();return;}
  if(srcId===null){log('Pilih lokasi darurat terlebih dahulu!','lr');return;}
  if(stops.length===0){log('Pilih minimal 1 fasilitas tujuan!','lr');return;}

  running=true;
  const sid=++solveId;
  const btn=document.getElementById('btnSolve');
  btn.disabled=true; btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Mencari rute...';
  clearRoute(); setProgress(5);

  const tabs = document.querySelectorAll('.rp-tab');
  if(tabs[2]) switchTab('pseudo', tabs[2]);

  const label=algo==='dijkstra'?'Dijkstra':'Bellman-Ford';
  log(`Menjalankan ${label}...`,'lb');

  const t0=performance.now();
  let totalDist=0, allVisited=new Set(), fullPath=[srcId], allSteps=[];
  const waypoints=[srcId,...stops];

  for(let i=0;i<waypoints.length-1;i++){
    if(sid!==solveId) break;
    const from=waypoints[i], to=waypoints[i+1];
    const result=algo==='dijkstra'?dijkstraRun(from,to):bellmanFordRun(from,to);
    result.visited.forEach(v=>allVisited.add(v));

    if(result.dist===Infinity||result.dist===undefined){log(`Tidak ada jalur ke ${PLACES[to].name}!`,'lr');continue;}

    const path=recon(result.prev,from,to);
    if(!path){log('Gagal rekonstruksi jalur','lr');continue;}

    totalDist+=result.dist;
    fullPath=i===0?[...path]:[...fullPath,...path.slice(1)];
    allSteps.push({from:PLACES[from].name,to:PLACES[to].name,dist:+result.dist.toFixed(2),hops:path.length-1,path});

    if (animSpd > 0) {
      if(algo === 'dijkstra') {
        hlPseudo('d2'); await sleep(animSpd * 0.5);
        hlPseudo('d3'); await sleep(animSpd * 0.5);
        hlPseudo('d4'); await sleep(animSpd * 0.5);
      } else {
        hlPseudo('b2'); await sleep(animSpd * 0.5);
        hlPseudo('b3'); await sleep(animSpd * 0.5);
      }
    }

    await animateVisited(result.visited,sid);
    if(sid!==solveId) break;
    await drawPath(path,sid);
    setProgress(20+Math.round(70*(i+1)/(waypoints.length-1)));

    // Tampilkan warning negative cycle jika Bellman-Ford
    if(algo==='bellman'&&result.hasNegCycle) log('<i class="fa-solid fa-triangle-exclamation"></i> Negative cycle terdeteksi!','lr');
  }

  const t1=performance.now();
  if(sid!==solveId){
    running=false;
    btn.disabled=false;
    btn.innerHTML='<i class="fa-solid fa-truck-medical"></i> &nbsp;Cari Rute Darurat';
    hlPseudo(null);
    if(tabs[0]) switchTab('stats', tabs[0]);
    return;
  }

  document.getElementById('sDist').textContent=totalDist.toFixed(2)+' km';
  document.getElementById('sStops').textContent=stops.length+' fasilitas';
  const etaMins = (totalDist / 40) * 60;
  document.getElementById('sEta').textContent=etaMins.toFixed(0)+' menit';
  document.getElementById('sTime').textContent=(t1-t0).toFixed(2)+' ms';
  document.getElementById('sRoute').textContent=fullPath.map(id=>PLACES[id].name.split(' ').slice(0,2).join(' ')).join(' → ');

  renderRouteSteps(allSteps);
  renderExplain(algo,allVisited,fullPath,totalDist,allSteps,t1-t0);
  setProgress(100);
  log(`${label} selesai — ${totalDist.toFixed(2)} km dalam ${(t1-t0).toFixed(2)} ms`,'lg');
  running=false;
  btn.disabled=false;
  btn.innerHTML='<i class="fa-solid fa-truck-medical"></i> &nbsp;Cari Rute Darurat';

  hlPseudo(null);
  if(tabs[0]) switchTab('stats', tabs[0]);
}

async function solveKruskal(){
  running=true;
  const btn=document.getElementById('btnSolve');
  btn.disabled=true; btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Membangun MST...';
  clearRoute(); setProgress(10);
  log('Menjalankan Kruskal MST...','lb');

  const tabs = document.querySelectorAll('.rp-tab');
  if(tabs[2]) switchTab('pseudo', tabs[2]);

  if (animSpd > 0) {
    hlPseudo('k2'); await sleep(Math.max(animSpd, 100));
    hlPseudo('k3'); await sleep(Math.max(animSpd, 100));
    hlPseudo('k4'); await sleep(Math.max(animSpd, 100));
  }

  const t0=performance.now();
  const result=kruskalRun();
  const t1=performance.now();

  setProgress(50);
  for(let i=0;i<result.mst.length;i++){
    const[a,b]=result.mst[i];
    const pa=PLACES[a],pb=PLACES[b];
    const line=L.polyline([[pa.lat,pa.lng],[pb.lat,pb.lng]],{color:'#059669',weight:3,opacity:.85}).addTo(map);
    mstLines.push(line);
    setProgress(50+Math.round(40*(i+1)/result.mst.length));
    
    if (animSpd > 0) {
      hlPseudo('k5'); await sleep(animSpd * 0.1);
      hlPseudo('k6'); await sleep(animSpd * 0.1);
      hlPseudo('k7'); await sleep(animSpd * 0.1);
      hlPseudo('k8'); await sleep(animSpd * 0.1);
      hlPseudo('k9'); await sleep(animSpd * 0.1);
      if(i%Math.max(1,Math.floor(result.mst.length/10))===0) await sleep(Math.min(animSpd, 50));
    }
  }

  if (animSpd > 0) {
    hlPseudo('k10'); await sleep(Math.max(animSpd, 100));
  }

  document.getElementById('sDist').textContent=result.totalW+' km';
  document.getElementById('sStops').textContent=PLACES.length+' faskes';
  // Note: sVis does not exist in HTML so it is safe to assign to textContent if it is present
  const visEl = document.getElementById('sVis');
  if(visEl) visEl.textContent=result.visited.length+' faskes';
  document.getElementById('sTime').textContent=(t1-t0).toFixed(2)+' ms';
  document.getElementById('sRoute').textContent='Minimum Spanning Tree';

  renderKruskalPanel(result);
  renderExplainKruskal(result,t1-t0);
  setProgress(100);
  log(`Kruskal selesai — ${result.totalW} km, ${result.mst.length} koneksi, ${(t1-t0).toFixed(2)} ms`,'lg');
  running=false;
  btn.disabled=false;
  btn.innerHTML='<i class="fa-solid fa-truck-medical"></i> &nbsp;Cari Rute Darurat';

  hlPseudo(null);
  if(tabs[0]) switchTab('stats', tabs[0]);
}

// ════════════════════════════════════════════════
//  BENCHMARK — Synthetic Graph Generator
//  Memenuhi syarat: n ≥ 1.000 vertex,
//  5 ukuran input spanning 2 order of magnitude
// ════════════════════════════════════════════════

/**
 * Generate synthetic weighted graph dengan n node
 * di dalam bounding box Surabaya.
 * Setiap node dihubungkan ke k tetangga terdekat.
 * Bobot = jarak Euclidean × faktor jalan 1.35
 */
function generateSyntheticGraph(n, k=4){
  // Bounding box Surabaya
  const LAT_MIN=-7.35, LAT_MAX=-7.18, LNG_MIN=112.62, LNG_MAX=112.82;

  // Node dengan koordinat acak (seed deterministik via LCG)
  let seed=n*31337;
  function rand(){seed=(seed*1664525+1013904223)&0xffffffff;return(seed>>>0)/0xffffffff;}

  const nodes=[];
  for(let i=0;i<n;i++){
    nodes.push({id:i,lat:LAT_MIN+rand()*(LAT_MAX-LAT_MIN),lng:LNG_MIN+rand()*(LNG_MAX-LNG_MIN)});
  }

  // Build adjacency: tiap node ke k tetangga terdekat
  // Hitung jarak (derajat lat/lng ≈ km dengan skala Surabaya: 1°lat≈111km, 1°lng≈97km)
  const adjMap={};
  nodes.forEach(p=>{adjMap[p.id]=[];});

  // Untuk efisiensi: hanya hitung k nearest, bukan O(n²) penuh
  // Gunakan grid bucket untuk membatasi pencarian
  const GRID=Math.ceil(Math.sqrt(n));
  const bucket={};
  nodes.forEach(p=>{
    const gx=Math.floor((p.lng-LNG_MIN)/(LNG_MAX-LNG_MIN)*GRID);
    const gy=Math.floor((p.lat-LAT_MIN)/(LAT_MAX-LAT_MIN)*GRID);
    const key=`${Math.max(0,Math.min(GRID-1,gx))}_${Math.max(0,Math.min(GRID-1,gy))}`;
    if(!bucket[key]) bucket[key]=[];
    bucket[key].push(p);
  });

  const edges=[];
  const edgeSet=new Set();

  nodes.forEach(p=>{
    const gx=Math.floor((p.lng-LNG_MIN)/(LNG_MAX-LNG_MIN)*GRID);
    const gy=Math.floor((p.lat-LAT_MIN)/(LAT_MAX-LAT_MIN)*GRID);
    // Cek bucket sekitar
    const candidates=[];
    for(let dx=-2;dx<=2;dx++) for(let dy=-2;dy<=2;dy++){
      const bk=`${Math.max(0,Math.min(GRID-1,gx+dx))}_${Math.max(0,Math.min(GRID-1,gy+dy))}`;
      if(bucket[bk]) candidates.push(...bucket[bk]);
    }
    // Sort by distance, ambil k nearest (skip self)
    candidates.sort((a,b)=>{
      const da=Math.hypot((a.lat-p.lat)*111,(a.lng-p.lng)*97);
      const db=Math.hypot((b.lat-p.lat)*111,(b.lng-p.lng)*97);
      return da-db;
    });
    let added=0;
    for(const nb of candidates){
      if(nb.id===p.id) continue;
      const ekey=`${Math.min(p.id,nb.id)}_${Math.max(p.id,nb.id)}`;
      if(!edgeSet.has(ekey)){
        const distKm=+(Math.hypot((nb.lat-p.lat)*111,(nb.lng-p.lng)*97)*1.35).toFixed(2);
        edges.push([p.id,nb.id,distKm]);
        adjMap[p.id].push({to:nb.id,w:distKm});
        adjMap[nb.id].push({to:p.id,w:distKm});
        edgeSet.add(ekey);
      }
      added++;
      if(added>=k) break;
    }
  });

  return{nodes,edges,adjMap};
}

/**
 * Dijkstra pada synthetic graph (parameter eksplisit, tidak pakai global)
 */
function dijkstraSynth(src, tgt, adjMap, nodeIds){
  const dist={}, vis=new Set();
  nodeIds.forEach(id=>dist[id]=Infinity);
  dist[src]=0;
  const heap=new MinHeap();
  heap.push([0,src]);
  let nodesVisited=0;
  while(heap.size){
    const[d,u]=heap.pop();
    if(vis.has(u)) continue;
    vis.add(u); nodesVisited++;
    if(u===tgt) break;
    for(const{to,w} of (adjMap[u]||[]))
      if(d+w<dist[to]){dist[to]=d+w;heap.push([d+w,to]);}
  }
  return{dist:dist[tgt],nodesVisited};
}

/**
 * Bellman-Ford pada synthetic graph — BENAR: V-1 iterasi dengan early stop
 * Untuk n besar di browser, gunakan edge subset yang representatif
 */
function bellmanFordSynth(src, tgt, edges, nodeIds){
  const V=nodeIds.length;
  const dist={};
  nodeIds.forEach(id=>dist[id]=Infinity);
  dist[src]=0;
  let nodesVisited=0;
  // V-1 iterasi penuh dengan early termination (benar secara algoritma)
  for(let i=0;i<V-1;i++){
    let updated=false;
    for(const[a,b,w] of edges){
      if(dist[a]!==Infinity&&dist[a]+w<dist[b]){dist[b]=dist[a]+w;updated=true;nodesVisited++;}
      if(dist[b]!==Infinity&&dist[b]+w<dist[a]){dist[a]=dist[b]+w;updated=true;nodesVisited++;}
    }
    if(!updated) break; // Early termination jika tidak ada update
  }
  return{dist:dist[tgt],nodesVisited};
}

// Benchmark size toggle
function toggleBenchSize(n,el){
  if(benchSizes.has(n)){benchSizes.delete(n);el.classList.remove('on');}
  else{benchSizes.add(n);el.classList.add('on');}
}

async function runBenchmark(){
  const btn=document.getElementById('btnBench');
  const progEl=document.getElementById('benchProg');
  const statusEl=document.getElementById('benchStatus');
  const resultsEl=document.getElementById('benchResults');
  const noteEl=document.getElementById('benchNote');

  if(benchSizes.size===0){log('Pilih minimal satu ukuran input!','lr');return;}

  btn.disabled=true; btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Menjalankan...';
  resultsEl.innerHTML=''; progEl.style.width='0%'; noteEl.style.display='none';

  const sizes=[...benchSizes].sort((a,b)=>a-b);
  const rows=[];

  for(let si=0;si<sizes.length;si++){
    const n=sizes[si];
    statusEl.textContent=`Generating graph n=${n.toLocaleString()}...`;
    progEl.style.width=`${(si/sizes.length*60)}%`;
    await sleep(10); // yield to UI

    // Generate graph
    const g=generateSyntheticGraph(n);
    const nodeIds=g.nodes.map(p=>p.id);

    // Pilih src dan tgt: node 0 dan node n-1
    const src=0, tgt=n-1;

    statusEl.textContent=`n=${n.toLocaleString()} — Menjalankan Dijkstra...`;
    await sleep(5);
    const t0=performance.now();
    const rD=dijkstraSynth(src,tgt,g.adjMap,nodeIds);
    const msD=performance.now()-t0;

    statusEl.textContent=`n=${n.toLocaleString()} — Menjalankan Bellman-Ford...`;
    await sleep(5);
    // Bellman-Ford: gunakan semua edge, V-1 iterasi (benar secara algoritma)
    // Untuk n besar, early termination akan mempercepat secara signifikan
    const t1=performance.now();
    const rB=bellmanFordSynth(src,tgt,g.edges,nodeIds);
    const msB=performance.now()-t1;

    rows.push({n,edges:g.edges.length,msD,msB,distD:rD.dist,distB:rB.dist});
    progEl.style.width=`${((si+1)/sizes.length*100)}%`;
    log(`n=${n.toLocaleString()}: Dijkstra ${msD.toFixed(1)}ms | BF ${msB.toFixed(1)}ms`,'lb');
    await sleep(20);
  }

  // Render tabel hasil
  let tableHTML=`
    <table class="bench-table">
      <thead>
        <tr>
          <th>n (node)</th>
          <th>|E| (edge)</th>
          <th style="color:var(--red)">Dijkstra (ms)</th>
          <th style="color:var(--blue)">Bellman-Ford (ms)</th>
          <th>Rasio BF/D</th>
          <th>Lebih cepat</th>
        </tr>
      </thead>
      <tbody>`;
  rows.forEach(r=>{
    const ratio=r.msB/Math.max(r.msD,0.001);
    const winner=r.msD<=r.msB?'d':'b';
    const winnerLabel=r.msD<=r.msB?'Dijkstra':'Bellman-Ford';
    tableHTML+=`<tr>
      <td class="td-n">${r.n.toLocaleString()}</td>
      <td class="td-n" style="color:var(--text2)">${r.edges.toLocaleString()}</td>
      <td class="td-d">${r.msD.toFixed(2)}</td>
      <td class="td-b">${r.msB.toFixed(2)}</td>
      <td class="td-r">${ratio.toFixed(1)}×</td>
      <td><span class="bench-winner ${winner}">${winnerLabel}</span></td>
    </tr>`;
  });
  tableHTML+=`</tbody></table>`;

  // Summary insight
  const avgRatio=rows.reduce((s,r)=>s+r.msB/Math.max(r.msD,0.001),0)/rows.length;
  tableHTML+=`
    <div class="insight a" style="margin-top:8px;font-size:.68rem">
      <b>Kesimpulan empiris:</b> Rata-rata Dijkstra <b>${avgRatio.toFixed(1)}× lebih cepat</b> dari Bellman-Ford.
      Sesuai analisis teoritis: O((V+E)logV) vs O(V·E).
    </div>
    <div class="insight b" style="margin-top:4px;font-size:.67rem">
      <b>Trade-off:</b> Dijkstra lebih cepat tapi tidak handle bobot negatif.
      Bellman-Ford lebih lambat tapi dapat mendeteksi negative cycle — penting untuk
      pemodelan kondisi darurat dengan bobot dinamis.
    </div>`;

  resultsEl.innerHTML=tableHTML;
  noteEl.style.display='block';
  btn.disabled=false; btn.innerHTML='<i class="fa-solid fa-bolt"></i> Jalankan Benchmark';
  statusEl.innerHTML='Benchmark selesai <i class="fa-solid fa-circle-check"></i>';
  log(`Benchmark selesai — ${rows.length} ukuran diuji`,'lg');
}

// -- FITUR: LACAK LOKASI --
function getDistKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function trackAndFindNearest() {
  if (navigator.geolocation) {
    log('Melacak lokasi saat ini...', 'lb');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        log(`Lokasi ditemukan: ${lat.toFixed(4)}, ${lng.toFixed(4)}`, 'lg');

        const USER_ID = 999;
        
        // Bersihkan edge lama
        for (let i = EDGES.length - 1; i >= 0; i--) {
          if (EDGES[i][0] === USER_ID || EDGES[i][1] === USER_ID) EDGES.splice(i, 1);
        }

        // Cari 2 node terdekat
          let distances = [];
          for(let i=0; i<PLACES.length; i++){
             if (!PLACES[i]) continue;
             if (PLACES[i].id === USER_ID) continue;
             distances.push({ id: PLACES[i].id, dist: getDistKm(lat, lng, PLACES[i].lat, PLACES[i].lng) });
          }
          distances.sort((a, b) => a.dist - b.dist);
  
          // Tambah/Update node user di index 999
          PLACES[USER_ID] = {
            id: USER_ID,
            name: "Lokasi Anda",
            lat: lat,
            lng: lng,
            cat: "user",
            wilayah: "pusat",
            desc: "Titik koordinat darurat dari GPS perangkat.",
            igd: "-",
            beds: 0,
            phone: "-"
          };
  
          // Tambah edge ke graf
        EDGES.push([USER_ID, distances[0].id, parseFloat(distances[0].dist.toFixed(2))]);
        if (distances.length > 1) {
          EDGES.push([USER_ID, distances[1].id, parseFloat(distances[1].dist.toFixed(2))]);
        }

        // Rebuild ADJ list
        for (let key in ADJ) delete ADJ[key];
        PLACES.forEach(p => ADJ[p.id] = []);
        EDGES.forEach(([a, b, w]) => { ADJ[a].push({to: b, w}); ADJ[b].push({to: a, w}); });

        srcId = USER_ID;
        srcPlaceholderRemoved = true;
        
        // Pastikan opsi 999 bisa dipilih (re-populate dropdown)
        populateSrc();
        document.getElementById('selSrc').value = srcId;
        
        clearRoute();
        // Gambar ulang rute dasar (garis abu-abu) karena EDGES berubah
        drawBaseEdges();
        // Gambar ulang marker karena PLACES berubah
        drawAllMarkers();
        
        log(`Posisi Anda ditambahkan ke peta, memanggil algoritma...`, 'lb');
        
        // Fokus peta ke user
        map.setView([lat, lng], 14);
        
        // Cari RS terdekat
        findNearest();
      },
      (error) => {
        log('Gagal melacak lokasi: ' + error.message, 'lr');
        // Fallback untuk demo jika akses lokasi diblokir: letakkan di pusat Surabaya
        log('Menggunakan lokasi default (Tunjungan Plaza) untuk demo...', 'lb');
        navigator.geolocation.getCurrentPosition = (cb) => cb({coords: {latitude: -7.261, longitude: 112.739}});
        trackAndFindNearest(); 
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  } else {
    log('Geolocation tidak didukung oleh browser ini.', 'lr');
  }
}

// Init
renderPseudo('dijkstra');
if(localStorage.getItem('theme')==='dark') document.body.classList.add('dark');