/* ---------- YOUR CONTACT DETAILS (edit these) ---------- */
const CONTACT={
  whatsapp:"2348000000000",      /* phone number with country code, no + or spaces (Nigeria = 234...) */
  instagram:"luxdriverentals",   /* your Instagram username */
  tiktok:"luxdriverentals"       /* your TikTok username */
};

/* ---------- FLEET DATA ----------
   photo: put your own image path (e.g. "images/sedan.jpg") to use a real photo.
   Leave it "" to use the built-in drawn car (colors then change with the swatches). */
const cars=[
{k:"Huracán",n:"Lamborghini Huracán",p:1500000,perf:"5.2L V10 · 631 HP",sub:"Mid-engine supercar",photo:"images/lamborghini-huracan.jpg",c:["#c9d400","#f26a00","#1a1a1d","#e9e9ec"],
 body:"M30 176 L30 158 Q38 144 96 136 Q190 96 300 80 Q410 72 470 112 L560 128 Q612 136 612 162 L612 176 Z",
 win:["M250 102 Q300 88 372 92 L430 118 L226 122 Z"],doors:[330],intake:1},
{k:"Ferrari",n:"Ferrari 488 GTB",p:1800000,perf:"3.9L Twin-Turbo V8 · 661 HP",sub:"Italian icon",photo:"images/ferrari-488.jpg",c:["#c8102e","#f5f5f5","#1a1a1d","#f2c200"],
 body:"M30 176 L30 160 Q40 146 100 138 Q190 98 296 82 Q404 74 466 114 L562 130 Q612 138 612 164 L612 176 Z",
 win:["M246 104 Q298 90 366 94 L424 120 L224 124 Z"],doors:[326],intake:1},
{k:"McLaren",n:"McLaren 720S",p:2000000,perf:"4.0L Twin-Turbo V8 · 710 HP",sub:"British hypercar tech",photo:"images/mclaren-720s.jpg",c:["#ff6a13","#2b4a8a","#d9dce3","#1a1a1d"],
 body:"M30 176 L30 156 Q40 142 100 134 Q186 90 296 78 Q410 70 474 112 L564 126 Q612 134 612 162 L612 176 Z",
 win:["M244 100 Q300 84 372 88 L432 116 L222 120 Z"],doors:[322],intake:1},
{k:"Aventador",n:"Lamborghini Aventador",p:2500000,perf:"6.5L V12 · 740 HP",sub:"Flagship V12",photo:"images/lamborghini-aventador.jpg",c:["#6b1fa8","#1a1a1d","#c9a45c","#1f7a3a"],
 body:"M30 176 L30 160 Q36 144 90 138 Q190 98 310 82 Q420 76 476 114 L566 130 Q612 138 612 164 L612 176 Z",
 win:["M256 104 Q306 90 376 94 L434 120 L232 124 Z"],doors:[334],intake:1,wing:1}];

let cur=0,col=0,uid=0;
const naira=n=>"₦"+n.toLocaleString("en-NG");
const $=id=>document.getElementById(id);

/* ---------- DRAWN CAR (side view, facing right) ---------- */
function wheel(cx){
  let spokes="";
  for(let i=0;i<5;i++) spokes+=`<line x1="${cx}" y1="172" x2="${cx}" y2="150" stroke="#7d8392" stroke-width="6" stroke-linecap="round" transform="rotate(${i*72} ${cx} 172)"/>`;
  return `<circle cx="${cx}" cy="172" r="47" fill="#0e1014"/>
  <circle cx="${cx}" cy="172" r="38" fill="#1b1d23"/>
  <circle cx="${cx}" cy="172" r="27" fill="#cfd3dc"/>
  <circle cx="${cx}" cy="172" r="27" fill="none" stroke="#9aa0ad" stroke-width="2"/>
  ${spokes}<circle cx="${cx}" cy="172" r="7" fill="#2b2e36"/>`;
}
function svg(c,color,cls="car"){
  const id="g"+(uid++);
  const wins=c.win.map(d=>`<path d="${d}" fill="url(#${id}w)"/>`).join("");
  const doors=c.doors.map(x=>`<path d="M${x} 108 V166" stroke="#0004" stroke-width="2" fill="none"/><rect x="${x-26}" y="122" width="18" height="4" rx="2" fill="#0005"/>`).join("");
  return `<svg class="${cls}" viewBox="0 0 640 240" role="img" aria-label="${c.n}">
  <defs>
   <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
   <linearGradient id="${id}w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9f2fb"/><stop offset="1" stop-color="#6f8499"/></linearGradient>
  </defs>
  <ellipse cx="320" cy="214" rx="290" ry="10" fill="#000" opacity=".22"/>
  <path d="${c.body}" fill="${color}"/>
  <path d="${c.body}" fill="url(#${id}s)"/>
  ${wins}${doors}
  ${c.intake?`<path d="M338 132 L404 128 L416 154 L346 156 Z" fill="#000" opacity=".55"/>`:""}${c.wing?`<path d="M26 124 H76 V131 H26 Z M44 131 H52 V150 H44 Z" fill="#111"/>`:""}
  <rect x="30" y="162" width="582" height="14" fill="#000" opacity=".3"/>
  <path d="M584 124 L610 130 L608 140 L578 134 Z" fill="#fff7c9"/>
  <rect x="30" y="130" width="10" height="16" rx="3" fill="#d62828"/>
  <circle cx="150" cy="172" r="52" fill="#101216" opacity=".0"/>
  ${wheel(150)}${wheel(490)}
  </svg>`;
}
/* returns either your photo or the drawn car */
function carImage(c,color,cls="car"){
  return c.ok ? `<img class="car-photo" src="${c.photo}" alt="${c.n}">` : svg(c,color,cls);
}

/* ---------- RENDER ---------- */
function whatsappLink(msg){return "https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(msg)}
function updateSocial(){
  const c=cars[cur];
  const msg="Hello Luxdrive Rentals, I'm interested in renting the "+c.n+". Is it available?";
  $("waLink").href=$("waFloat").href=whatsappLink(msg);
  $("igLink").href="https://instagram.com/"+CONTACT.instagram;
  $("ttLink").href="https://www.tiktok.com/@"+CONTACT.tiktok;
}
function render(){
  const c=cars[cur];
  updateSocial();
  $("carbox").innerHTML=carImage(c,c.c[col]);
  $("cname").textContent="✦ "+c.n.toUpperCase();
  $("cprice").textContent=naira(c.p);
  $("perf").innerHTML="SEE+ "+c.perf+"<small>"+c.sub+"</small>";
  $("sw").innerHTML=c.ok?"":c.c.map((x,i)=>`<i style="background:${x}" data-i="${i}"></i>`).join("");
  $("cats").innerHTML=cars.map((x,i)=>`<button class="cat ${i==cur?"on":""}" data-i="${i}">${i==cur?x.k:x.k[0]}</button>`).join("");
}
$("cats").onclick=e=>{const b=e.target.closest(".cat");if(b){cur=+b.dataset.i;col=0;render()}};
$("sw").onclick=e=>{if(e.target.dataset.i){col=+e.target.dataset.i;render()}};

/* fleet grid */
function buildFleet(){$("fleetGrid").innerHTML=cars.map((c,i)=>`<div class="tile" data-i="${i}">${c.ok?`<img src="${c.photo}" alt="${c.n}" style="width:100%;border-radius:14px">`:svg(c,c.c[0],"").replace('class=""','style="width:100%"')}<h3>${c.n}</h3><p>${c.sub} · from ${naira(c.p)}/day</p></div>`).join("");}
buildFleet();
$("fleetGrid").onclick=e=>{const t=e.target.closest(".tile");if(t){cur=+t.dataset.i;col=0;render();$("home").scrollIntoView()}};

/* booking form */
$("bcar").innerHTML=cars.map(c=>`<option>${c.n} (${naira(c.p)}/day)</option>`).join("");
const today=new Date().toISOString().split("T")[0];$("d1").min=$("d2").min=today;
$("bookForm").onsubmit=e=>{
  e.preventDefault();
  const a=new Date($("d1").value),b=new Date($("d2").value);
  const days=Math.round((b-a)/864e5);
  if(days<1){$("msg").textContent="Return date must be after pickup date.";return}
  const car=cars[$("bcar").selectedIndex];
  $("msg").textContent=`Reserved ${car.n} for ${days} day(s). Estimated total: ${naira(days*car.p)}. We'll email you shortly.`;
  e.target.reset();
};

/* menu, modal, theme */
$("burger").onclick=()=>$("links").classList.toggle("open");
$("links").onclick=()=>$("links").classList.remove("open");
$("watch").onclick=()=>$("modal").classList.add("show");
$("close").onclick=()=>$("modal").classList.remove("show");
$("theme").onclick=()=>{
  const r=document.documentElement,d=matchMedia("(prefers-color-scheme:dark)").matches;
  const now=r.dataset.theme||(d?"dark":"light");
  r.dataset.theme=now==="dark"?"light":"dark";
};

/* animated counters */
document.querySelectorAll("[data-n]").forEach(el=>{
  const t=+el.dataset.n,s=el.dataset.s;let v=0;
  const io=new IntersectionObserver(([en])=>{
    if(!en.isIntersecting)return;io.disconnect();
    const id=setInterval(()=>{
      v+=Math.ceil(t/50);if(v>=t){v=t;clearInterval(id)}
      el.textContent=v.toLocaleString()+s;
    },30);
  });
  io.observe(el);
});

/* use your photo if the file exists, otherwise keep the drawn car */
cars.forEach(c=>{if(!c.photo)return;const im=new Image();im.onload=()=>{c.ok=true;render();buildFleet()};im.src=c.photo});
render();
