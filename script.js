// ════════════════════════════════════════════════
//  SURABAYAMEDIC — script.js
//  DAA Final Exam 2026
//  Algoritma: Dijkstra · Bellman-Ford · Kruskal
// ════════════════════════════════════════════════

// ── DATA: 20 NODE FASILITAS MEDIS SURABAYA ──
const PLACES = [
  // ── PUSAT / EXISTING ──
  {id:0,  name:"RSUD Dr. Soetomo",          lat:-7.2675,lng:112.7519,cat:"rsud",     wilayah:"pusat",  desc:"RS umum daerah terbesar Jawa Timur. Rujukan utama kegawatdaruratan Surabaya.",    beds:1500,igd:"24 jam",phone:"(031) 5501011"},
  {id:1,  name:"RS Universitas Airlangga",  lat:-7.2821,lng:112.7965,cat:"rsswasta", wilayah:"timur",  desc:"RS pendidikan UNAIR. IGD 24 jam, dokter spesialis lengkap.",                     beds:333, igd:"24 jam",phone:"(031) 5916290"},
  {id:2,  name:"RS Islam A. Yani",          lat:-7.3049,lng:112.7275,cat:"rsswasta", wilayah:"selatan",desc:"RS Islam Surabaya Selatan. IGD aktif 24 jam dengan ambulans siaga.",              beds:289, igd:"24 jam",phone:"(031) 8281119"},
  {id:3,  name:"RS Darmo",                  lat:-7.2894,lng:112.7256,cat:"rsswasta", wilayah:"pusat",  desc:"RS swasta kawasan Darmo. Layanan bedah dan trauma lengkap.",                      beds:254, igd:"24 jam",phone:"(031) 5676253"},
  {id:4,  name:"RS Dr. Ramelan",            lat:-7.2466,lng:112.7330,cat:"rsud",     wilayah:"pusat",  desc:"RS TNI AL. Layanan gawat darurat trauma dan resusitasi 24 jam.",                  beds:450, igd:"24 jam",phone:"(031) 3523278"},
  {id:5,  name:"RS William Booth",          lat:-7.2571,lng:112.7483,cat:"rsswasta", wilayah:"pusat",  desc:"RS legendaris pusat kota. Spesialisasi bedah, jantung, trauma.",                  beds:210, igd:"24 jam",phone:"(031) 5678910"},
  {id:6,  name:"RS PHC Surabaya",           lat:-7.2099,lng:112.7332,cat:"rsswasta", wilayah:"utara",  desc:"RS kawasan Pelabuhan. Emergensi maritim dan umum 24 jam.",                        beds:195, igd:"24 jam",phone:"(031) 3293253"},
  {id:7,  name:"RS Bhayangkara",            lat:-7.2433,lng:112.7784,cat:"rsud",     wilayah:"pusat",  desc:"RS Polri. IGD trauma dan kecelakaan, layanan cepat 24 jam.",                      beds:180, igd:"24 jam",phone:"(031) 5947760"},
  {id:8,  name:"Puskesmas Sawahan",         lat:-7.2701,lng:112.7233,cat:"puskesmas",wilayah:"pusat",  desc:"Puskesmas rawat inap Kec. Sawahan. IGD dasar dan rujukan.",                       beds:20,  igd:"07–21", phone:"(031) 5671234"},
  {id:9,  name:"Puskesmas Tambaksari",      lat:-7.2467,lng:112.7618,cat:"puskesmas",wilayah:"pusat",  desc:"Faskes pertama BPJS Tambaksari. Gawat darurat ringan.",                           beds:15,  igd:"07–21", phone:"(031) 5921234"},
  {id:10, name:"Puskesmas Kenjeran",        lat:-7.2310,lng:112.7850,cat:"puskesmas",wilayah:"utara",  desc:"Puskesmas pesisir utara. Melayani komunitas nelayan.",                            beds:12,  igd:"07–21", phone:"(031) 3814567"},
  {id:11, name:"Puskesmas Wonocolo",        lat:-7.3278,lng:112.7280,cat:"puskesmas",wilayah:"selatan",desc:"Puskesmas Surabaya Selatan. Layanan KIA dan IGD dasar.",                          beds:18,  igd:"07–21", phone:"(031) 8412345"},
  {id:12, name:"Puskesmas Mulyorejo",       lat:-7.2630,lng:112.7945,cat:"puskesmas",wilayah:"timur",  desc:"Puskesmas dekat kampus UNAIR. Faskes primer wilayah timur.",                      beds:14,  igd:"07–21", phone:"(031) 5942345"},
  {id:13, name:"Klinik Pratama Ngagel",     lat:-7.2831,lng:112.7529,cat:"klinik",   wilayah:"pusat",  desc:"Klinik pratama 24 jam kawasan Ngagel. UGD ringan dan BPJS.",                     beds:0,   igd:"24 jam",phone:"(031) 5024678"},
  {id:14, name:"Klinik Medika Gubeng",      lat:-7.2680,lng:112.7577,cat:"klinik",   wilayah:"pusat",  desc:"Klinik modern dekat Stasiun Gubeng. IGD ringan.",                                beds:0,   igd:"08–22", phone:"(031) 5023456"},
  {id:15, name:"Klinik Utama Darmo",        lat:-7.2950,lng:112.7200,cat:"klinik",   wilayah:"selatan",desc:"Klinik utama Darmo. Dokter spesialis, poliklinik lengkap.",                      beds:0,   igd:"08–21", phone:"(031) 5681234"},
  {id:16, name:"Dinas PMK Surabaya",        lat:-7.2562,lng:112.7378,cat:"damkar",   wilayah:"pusat",  desc:"Posko utama PMK Surabaya. Ambulans & rescue 24 jam siaga.",                      beds:0,   igd:"24 jam",phone:"113"},
  {id:17, name:"Pos PMK Surabaya Selatan",  lat:-7.3150,lng:112.7310,cat:"damkar",   wilayah:"selatan",desc:"Pos pemadam wilayah selatan. Ambulans siaga 24 jam.",                            beds:0,   igd:"24 jam",phone:"113"},
  {id:18, name:"Pos PMK Surabaya Timur",    lat:-7.2740,lng:112.8050,cat:"damkar",   wilayah:"timur",  desc:"Pos pemadam wilayah timur. Respon cepat kecelakaan.",                            beds:0,   igd:"24 jam",phone:"113"},
  {id:19, name:"BPBD Kota Surabaya",        lat:-7.2490,lng:112.7400,cat:"damkar",   wilayah:"pusat",  desc:"Badan Penanggulangan Bencana Daerah. Koordinasi darurat kota.",                  beds:0,   igd:"24 jam",phone:"(031) 3523451"},
  // ── SURABAYA BARAT ──
  {id:20, name:"RS Sumber Santoso",         lat:-7.2650,lng:112.6890,cat:"rsswasta", wilayah:"barat",  desc:"RS swasta Surabaya Barat. IGD 24 jam, layanan bedah dan trauma.",                beds:180, igd:"24 jam",phone:"(031) 7412345"},
  {id:21, name:"RS Graha Amerta Barat",     lat:-7.2820,lng:112.6720,cat:"rsswasta", wilayah:"barat",  desc:"RS modern kawasan Lakarsantri. Spesialis anak dan kandungan.",                   beds:120, igd:"24 jam",phone:"(031) 7523456"},
  {id:22, name:"Puskesmas Lakarsantri",     lat:-7.3020,lng:112.6810,cat:"puskesmas",wilayah:"barat",  desc:"Puskesmas Kec. Lakarsantri. Faskes primer BPJS wilayah barat.",                  beds:15,  igd:"07–21", phone:"(031) 7634567"},
  {id:23, name:"Puskesmas Pakal",           lat:-7.2330,lng:112.6650,cat:"puskesmas",wilayah:"barat",  desc:"Puskesmas Kec. Pakal. Melayani wilayah perbatasan barat laut.",                  beds:12,  igd:"07–21", phone:"(031) 7745678"},
  {id:24, name:"Pos PMK Surabaya Barat",    lat:-7.2750,lng:112.6950,cat:"damkar",   wilayah:"barat",  desc:"Pos pemadam kebakaran wilayah barat. Ambulans siaga 24 jam.",                    beds:0,   igd:"24 jam",phone:"113"},
  // ── SURABAYA UTARA ──
  {id:25, name:"RS Hajj Surabaya",          lat:-7.2050,lng:112.7180,cat:"rsud",     wilayah:"utara",  desc:"RS milik Pemprov Jatim. IGD 24 jam, layanan haji dan umrah.",                   beds:300, igd:"24 jam",phone:"(031) 3816999"},
  {id:26, name:"RS Pelabuhan Surabaya",     lat:-7.1980,lng:112.7290,cat:"rsswasta", wilayah:"utara",  desc:"RS kawasan Tanjung Perak. Emergensi maritim & kecelakaan kerja.",                beds:150, igd:"24 jam",phone:"(031) 3294567"},
  {id:27, name:"Puskesmas Semampir",        lat:-7.2190,lng:112.7480,cat:"puskesmas",wilayah:"utara",  desc:"Puskesmas Kec. Semampir. Faskes primer kawasan padat penduduk utara.",            beds:14,  igd:"07–21", phone:"(031) 3856789"},
  {id:28, name:"Puskesmas Asemrowo",        lat:-7.2260,lng:112.7050,cat:"puskesmas",wilayah:"utara",  desc:"Puskesmas Kec. Asemrowo. Dekat kawasan industri pelabuhan.",                     beds:10,  igd:"07–21", phone:"(031) 7967890"},
  {id:29, name:"Pos PMK Tanjung Perak",     lat:-7.2000,lng:112.7350,cat:"damkar",   wilayah:"utara",  desc:"Pos PMK area pelabuhan & industri. Respon kebakaran & kecelakaan.",              beds:0,   igd:"24 jam",phone:"113"},
  // ── SURABAYA SELATAN ──
  {id:30, name:"RS Royal Surabaya",         lat:-7.3320,lng:112.7150,cat:"rsswasta", wilayah:"selatan",desc:"RS modern Surabaya Selatan. IGD 24 jam, NICU dan ICU lengkap.",                  beds:220, igd:"24 jam",phone:"(031) 8290123"},
  {id:31, name:"RS Husada Utama Selatan",   lat:-7.3480,lng:112.7380,cat:"rsswasta", wilayah:"selatan",desc:"RS swasta area Wonocolo. Spesialis jantung dan neurologi.",                     beds:170, igd:"24 jam",phone:"(031) 8401234"},
  {id:32, name:"Puskesmas Gayungan",        lat:-7.3410,lng:112.7260,cat:"puskesmas",wilayah:"selatan",desc:"Puskesmas Kec. Gayungan. Faskes primer BPJS Surabaya Selatan.",                  beds:16,  igd:"07–21", phone:"(031) 8512345"},
  {id:33, name:"Puskesmas Jambangan",       lat:-7.3580,lng:112.7120,cat:"puskesmas",wilayah:"selatan",desc:"Puskesmas Kec. Jambangan. Wilayah perbatasan selatan kota.",                    beds:12,  igd:"07–21", phone:"(031) 8623456"},
  {id:34, name:"Pos PMK Surabaya Selatan 2",lat:-7.3500,lng:112.7300,cat:"damkar",   wilayah:"selatan",desc:"Pos PMK wilayah selatan ke-2. Jangkauan Gayungan–Jambangan.",                  beds:0,   igd:"24 jam",phone:"113"},
];

// Edge berdasarkan koordinat nyata × faktor jalan 1.35
const EDGES = [
  // ── EXISTING (pusat/timur) ──
  [0,1,7.0],[0,5,1.6],[0,7,5.4],[0,9,3.5],[0,14,0.8],[0,16,2.7],
  [1,12,2.8],[1,7,6.5],[1,9,7.4],[1,18,1.8],
  [2,3,2.3],[2,11,3.4],[2,15,1.9],[2,17,1.6],
  [3,8,3.0],[3,15,1.2],[3,13,4.2],
  [4,16,1.6],[4,19,1.1],[4,5,2.8],[4,9,4.3],[4,6,5.5],
  [5,14,2.2],[5,16,1.6],[5,7,5.0],
  [6,16,7.0],[6,19,5.9],
  [7,9,2.6],[7,10,2.0],[7,18,6.1],
  [8,3,3.0],[8,15,3.8],[8,16,3.0],[8,17,6.9],
  [9,14,3.2],[9,19,3.2],
  [10,18,7.2],[10,12,5.0],
  [11,2,3.4],[11,17,2.0],[11,15,5.1],
  [12,18,2.3],[12,14,5.5],
  [13,3,4.2],[13,14,2.4],[13,0,2.3],
  [16,19,1.1],
  // ── BARAT (id 20–24) ──
  [20,21,2.3],[20,22,3.8],[20,24,1.9],[20,8,6.2],[20,4,6.8],
  [21,22,2.9],[21,23,4.1],[21,24,2.7],
  [22,23,5.3],[22,24,2.5],[22,15,7.1],
  [23,24,3.4],[23,28,5.8],
  [24,16,5.9],[24,4,7.2],
  // ── UTARA (id 25–29) ──
  [25,26,1.4],[25,27,3.2],[25,28,3.8],[25,29,2.1],[25,6,2.3],
  [26,29,1.6],[26,27,3.5],[26,6,1.8],
  [27,28,4.2],[27,29,2.8],[27,19,3.6],
  [28,29,4.1],[28,4,5.5],[28,16,5.2],
  [29,6,2.5],[29,19,4.8],
  // ── SELATAN (id 30–34) ──
  [30,31,2.2],[30,32,1.8],[30,34,2.0],[30,11,3.9],[30,2,4.5],
  [31,32,2.5],[31,33,2.1],[31,34,1.7],
  [32,33,2.8],[32,34,1.9],[32,17,4.3],
  [33,34,2.4],[33,11,5.1],
  [34,17,3.8],[34,11,4.7],
  // ── KONEKSI ANTAR WILAYAH ──
  [20,5,6.5],[20,3,7.3],    // barat → pusat
  [25,4,5.1],[25,16,6.3],   // utara → pusat
  [30,2,3.8],[30,15,4.2],   // selatan → pusat
  [20,25,9.1],              // barat → utara
];

// Build adjacency list
const ADJ = {};
PLACES.forEach(p => ADJ[p.id] = []);
EDGES.forEach(([a,b,w]) => { ADJ[a].push({to:b,w}); ADJ[b].push({to:a,w}); });

const CAT_LABELS = {all:'Semua',rsud:'RS Pemerintah',rsswasta:'RS Swasta',puskesmas:'Puskesmas',klinik:'Klinik',damkar:'PMK/BPBD'};
const CAT_COLORS = {rsud:'#dc2626',rsswasta:'#2563eb',puskesmas:'#059669',klinik:'#7c3aed',damkar:'#d97706'};
const CAT_ICONS  = {rsud:'🏥',rsswasta:'🏥',puskesmas:'🩺',klinik:'⚕️',damkar:'🚒'};
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
  const bg=isSrc?'#dc2626':isStop?'#059669':(CAT_COLORS[p.cat]||'#dc2626');
  const sz=isSrc||isStop?34:26;
  const brd=isSrc?'2.5px solid #fca5a5':isStop?'2.5px solid #6ee7b7':'1.5px solid rgba(255,255,255,.9)';
  let content;
  if(isSrc) content=`<span style="font-size:13px;pointer-events:none;user-select:none">🚨</span>`;
  else if(isStop) content=`<span style="font-size:11px;font-weight:800;color:#fff;pointer-events:none;user-select:none">${stops.indexOf(p.id)+1}</span>`;
  else content=`<span style="font-size:11px;pointer-events:none;user-select:none">${CAT_ICONS[p.cat]||'🏥'}</span>`;
  return L.divIcon({
    html:`<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:${bg};border:${brd};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.25);cursor:pointer;pointer-events:auto;user-select:none">${content}</div>`,
    className:'',iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]
  });
}

function makePopup(p){
  const isSrc=srcId!==null&&p.id===srcId, isStop=stops.includes(p.id);
  const badge=isSrc?'<span class="pc-badge src">🚨 Lokasi Darurat</span>':isStop?'<span class="pc-badge stop">✓ Tujuan Dipilih</span>':'';
  const conns=ADJ[p.id].map(e=>`${PLACES[e.to].name.split(' ')[0]}(${e.w}km)`).join(' · ');
  const bedInfo=p.beds>0?`<div class="pc-row">🛏 <b>Kapasitas:</b>&nbsp;${p.beds} bed</div>`:'';
  return`<div class="pc">
    <div class="pc-h"><div><div class="pc-name">${p.name}</div><div class="pc-cat">${CAT_ICONS[p.cat]} ${CAT_LABELS[p.cat]||p.cat}</div></div></div>
    ${badge?`<div style="margin-bottom:6px">${badge}</div>`:''}
    <div class="pc-desc">${p.desc}</div>
    <div class="pc-div"></div>
    <div class="pc-row">🕐 <b>IGD:</b>&nbsp;${p.igd}</div>
    ${bedInfo}
    <div class="pc-row">📞 <b>Tel:</b>&nbsp;${p.phone}</div>
    <div class="pc-conns">🔗 ${conns}</div>
    ${!isStop&&p.id!==srcId?`<button class="pc-addBtn" onclick="addStopById(${p.id})">+ Tambah ke Rute</button>`:''}
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
  opts+=pool.map(p=>`<option value="${p.id}">${CAT_ICONS[p.cat]} ${p.name}${p.wilayah&&p.wilayah!=='pusat'?' ('+WILAYAH_LABELS[p.wilayah]+')':''}</option>`).join('');
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
  opts+=PLACES.map(p=>`<option value="${p.id}">${CAT_ICONS[p.cat]} ${p.name}</option>`).join('');
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
      <span style="flex:1;font-size:.77rem">${CAT_ICONS[PLACES[id].cat]} ${PLACES[id].name}</span>
      <button class="s-del" onclick="removeStop(${id})">✕</button>
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

// ── UTILS ──
function sleep(ms){return ms>0?new Promise(r=>setTimeout(r,ms)):Promise.resolve();}
function log(msg,cls=''){
  const lb=document.getElementById('logBox');
  const d=document.createElement('div');
  if(cls) d.className=cls;
  d.textContent='> '+msg;
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
    log('Login berhasil. Sistem siaga 🚨','lb');
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
  ['sDist','sStops','sVis','sTime','sRoute'].forEach(id=>document.getElementById(id).textContent='—');
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
  log('Reset semua ✓');
}

// ── FITUR: CARI RS TERDEKAT ──
function findNearest(){
  if(srcId===null){log('Pilih lokasi darurat dulu!','lr');return;}
  log('Mencari RS terdekat dari semua wilayah...','lb');

  // Cari RS terdekat per wilayah
  const rsNodes = PLACES.filter(p=>p.cat==='rsud'||p.cat==='rsswasta');
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
      const res=dijkstraRun(srcId,p.id);
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
      <div class="r-step" style="${r.id===bestId?'background:var(--green-l);border-radius:6px;':''}">
        <div class="r-dot${i===0?' start':''}"></div>
        <div>
          <div class="r-node">${i===0?'🏆 ':''}<b>${wLabels[r.wilayah]||r.wilayah}</b> — ${PLACES[r.id].name.split(' ').slice(0,3).join(' ')}</div>
          <div class="r-dist">${r.dist.toFixed(2)} km${i===0?' · <b style="color:var(--green)">Terdekat!</b>':''}</div>
        </div>
      </div>`).join('');

  document.getElementById('routeSteps').innerHTML=`
    <div style="font-size:.72rem;font-weight:600;color:var(--text2);margin-bottom:6px">RS Terdekat per Wilayah</div>
    ${resultHTML}`;
  document.getElementById('sDist').textContent=bestDist.toFixed(2)+' km';
  document.getElementById('sStops').textContent='1 RS';
  document.getElementById('sVis').textContent=wilayahResults.length+' wilayah';
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
  const negMsg=rB.hasNegCycle?'<div class="insight r" style="margin-top:4px">⚠️ <b>Negative cycle terdeteksi</b> oleh Bellman-Ford!</div>':'';
  document.getElementById('explainContent').innerHTML=`
    <div class="expl-block">
      <div class="expl-head d">⚖️ Dijkstra vs Bellman-Ford</div>
      <div class="expl-body">
        <div style="font-size:.72rem;color:var(--text3);margin-bottom:4px">${srcN} → ${tgtN}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <div style="background:var(--red-l);border:1px solid var(--red-xl);border-radius:8px;padding:10px">
            <div style="font-size:.65rem;font-weight:700;color:var(--red);margin-bottom:6px">DIJKSTRA</div>
            <div style="font-family:var(--mono);font-size:1rem;font-weight:700;color:var(--red)">${rD.dist===Infinity?'∞':rD.dist.toFixed(2)+' km'}</div>
            <div style="font-size:.68rem;color:var(--text3);margin-top:2px">${msD.toFixed(3)} ms</div>
            <div style="font-size:.65rem;color:var(--text2);margin-top:4px">${rD.visited.length} node dikunjungi</div>
            <div class="tag tag-r" style="margin-top:4px;display:inline-block">O((V+E)logV)</div>
          </div>
          <div style="background:var(--blue-l);border:1px solid var(--blue-xl);border-radius:8px;padding:10px">
            <div style="font-size:.65rem;font-weight:700;color:var(--blue);margin-bottom:6px">BELLMAN-FORD</div>
            <div style="font-family:var(--mono);font-size:1rem;font-weight:700;color:var(--blue)">${rB.dist===Infinity?'∞':rB.dist.toFixed(2)+' km'}</div>
            <div style="font-size:.68rem;color:var(--text3);margin-top:2px">${msB.toFixed(3)} ms</div>
            <div style="font-size:.65rem;color:var(--text2);margin-top:4px">${rB.visited.length} node dikunjungi</div>
            <div class="tag tag-b" style="margin-top:4px;display:inline-block">O(V·E)</div>
          </div>
        </div>
        ${negMsg}
        <div class="insight ${rD.dist===rB.dist?'g':'r'}" style="margin-top:4px">
          ${rD.dist===rB.dist
            ?`✓ <b>Hasil sama</b> — ${rD.dist.toFixed(2)} km. Cross-check passed!`
            :`⚠️ Hasil berbeda — Dijkstra: ${rD.dist.toFixed(2)} km, BF: ${rB.dist.toFixed(2)} km`}
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
    if(animSpd>0) await sleep(animSpd/2);
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
    if(animSpd>0) await sleep(animSpd);
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
        <div class="r-dist">${s.dist} km · melewati ${s.hops} node</div>
      </div>
    </div>`).join('');
}

function renderKruskalPanel(result){
  document.getElementById('pathStepsWrap').style.display='none';
  const panel=document.getElementById('kruskalPanel');
  panel.style.display='block';
  panel.innerHTML=`
    <div class="expl-block">
      <div class="expl-head k">🌐 Kruskal MST — Jaringan Ambulans Minimum</div>
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
      <div class="expl-head ${color}">🧠 ${label} — Penjelasan</div>
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
              <div class="nt-sub">${inP?'✓ Bagian dari rute':'Dieksplorasi'}</div></div>
            </div>`}).join('')}
        </div>
        <div class="insight g">
          <b>Hasil:</b> ${dist.toFixed(2)} km · ${[...visited].length} node dikunjungi · ${execMs.toFixed(2)} ms
        </div>
        <div class="insight r">
          <b>Tip:</b> Klik <b>⚖️ Compare</b> untuk membandingkan kedua algoritma pada rute yang sama.
        </div>
      </div>
    </div>`;
}

function renderExplainKruskal(result,execMs){
  document.getElementById('explainContent').innerHTML=`
    <div class="expl-block">
      <div class="expl-head k">🌐 Kruskal — Penjelasan MST</div>
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
  btn.disabled=true; btn.textContent='⏳ Mencari rute...';
  clearRoute(); setProgress(5);

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

    await animateVisited(result.visited,sid);
    if(sid!==solveId) break;
    await drawPath(path,sid);
    setProgress(20+Math.round(70*(i+1)/(waypoints.length-1)));

    // Tampilkan warning negative cycle jika Bellman-Ford
    if(algo==='bellman'&&result.hasNegCycle) log('⚠️ Negative cycle terdeteksi!','lr');
  }

  const t1=performance.now();
  if(sid!==solveId){running=false;btn.disabled=false;btn.innerHTML='🚑 &nbsp;Cari Rute Darurat';return;}

  document.getElementById('sDist').textContent=totalDist.toFixed(2)+' km';
  document.getElementById('sStops').textContent=stops.length+' fasilitas';
  document.getElementById('sVis').textContent=allVisited.size+' node';
  document.getElementById('sTime').textContent=(t1-t0).toFixed(2)+' ms';
  document.getElementById('sRoute').textContent=fullPath.map(id=>PLACES[id].name.split(' ').slice(0,2).join(' ')).join(' → ');

  renderRouteSteps(allSteps);
  renderExplain(algo,allVisited,fullPath,totalDist,allSteps,t1-t0);
  setProgress(100);
  log(`${label} selesai — ${totalDist.toFixed(2)} km dalam ${(t1-t0).toFixed(2)} ms`,'lg');
  running=false;
  btn.disabled=false;
  btn.innerHTML='🚑 &nbsp;Cari Rute Darurat';
}

async function solveKruskal(){
  running=true;
  const btn=document.getElementById('btnSolve');
  btn.disabled=true; btn.textContent='⏳ Membangun MST...';
  clearRoute(); setProgress(10);
  log('Menjalankan Kruskal MST...','lb');

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
    await sleep(animSpd);
  }

  document.getElementById('sDist').textContent=result.totalW+' km';
  document.getElementById('sStops').textContent=PLACES.length+' node';
  document.getElementById('sVis').textContent=result.visited.length+' node';
  document.getElementById('sTime').textContent=(t1-t0).toFixed(2)+' ms';
  document.getElementById('sRoute').textContent='Minimum Spanning Tree';

  renderKruskalPanel(result);
  renderExplainKruskal(result,t1-t0);
  setProgress(100);
  log(`Kruskal selesai — ${result.totalW} km, ${result.mst.length} edge, ${(t1-t0).toFixed(2)} ms`,'lg');
  running=false;
  btn.disabled=false;
  btn.innerHTML='🚑 &nbsp;Cari Rute Darurat';
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

  btn.disabled=true; btn.textContent='⏳ Menjalankan...';
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
  btn.disabled=false; btn.textContent='⚡ Jalankan Benchmark';
  statusEl.textContent='Benchmark selesai ✓';
  log(`Benchmark selesai — ${rows.length} ukuran diuji`,'lg');
}

// Init
renderPseudo('dijkstra');
if(localStorage.getItem('theme')==='dark') document.body.classList.add('dark');