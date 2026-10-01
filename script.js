// ---------- DATA (edit me) ----------
// ---------- IMAGES (replace any link with your own photo URL) ----------
// Each experience has 3 images: [card/main, gallery 2, gallery 3]. Placeholder photos from picsum.photos.
// If a link is empty or fails to load, the colored gradient shows instead.
const IMAGES={
  1:["https://picsum.photos/seed/jaipur-block-printing-1/900/600","https://picsum.photos/seed/jaipur-block-printing-2/600/400","https://picsum.photos/seed/jaipur-block-printing-3/600/400"],
  2:["https://picsum.photos/seed/kyoto-cooking-1/900/600","https://picsum.photos/seed/kyoto-cooking-2/600/400","https://picsum.photos/seed/kyoto-cooking-3/600/400"],
  3:["https://picsum.photos/seed/oaxaca-pottery-1/900/600","https://picsum.photos/seed/oaxaca-pottery-2/600/400","https://picsum.photos/seed/oaxaca-pottery-3/600/400"],
  4:["https://picsum.photos/seed/florence-pasta-1/900/600","https://picsum.photos/seed/florence-pasta-2/600/400","https://picsum.photos/seed/florence-pasta-3/600/400"],
  5:["https://picsum.photos/seed/lisbon-fado-1/900/600","https://picsum.photos/seed/lisbon-fado-2/600/400","https://picsum.photos/seed/lisbon-fado-3/600/400"],
  6:["https://picsum.photos/seed/seville-flamenco-1/900/600","https://picsum.photos/seed/seville-flamenco-2/600/400","https://picsum.photos/seed/seville-flamenco-3/600/400"],
  7:["https://picsum.photos/seed/yogyakarta-batik-1/900/600","https://picsum.photos/seed/yogyakarta-batik-2/600/400","https://picsum.photos/seed/yogyakarta-batik-3/600/400"],
  8:["https://picsum.photos/seed/hoian-lantern-1/900/600","https://picsum.photos/seed/hoian-lantern-2/600/400","https://picsum.photos/seed/hoian-lantern-3/600/400"],
};
const pic=(x,i=0)=>{const u=(IMAGES[x.id]||[])[i];return (u?`background:url('${u}') center/cover,`:'background:')+`linear-gradient(135deg,${x.g[0]},${x.g[1]})`};

const CATS=["Cooking","Pottery","Language","Art","Dance","Crafts"];
const EXP=[
{id:1,t:"Block Printing with a Master Artisan",city:"Jaipur",co:"India",cat:"Crafts",h:3,p:35,r:4.9,n:212,e:"🎨",g:["#e8863f","#b8431f"],host:"Meera Devi",hb:"Third-generation block printer",d:"Carve wooden blocks and print your own textile using natural dyes in a family workshop."},
{id:2,t:"Kaiseki Home Cooking Class",city:"Kyoto",co:"Japan",cat:"Cooking",h:4,p:78,r:4.8,n:164,e:"🍱",g:["#7aa886","#3f6b4e"],host:"Chef Haruka",hb:"Home chef, 15 years teaching",d:"Shop at Nishiki Market, then cook a seasonal multi-course meal in a traditional machiya."},
{id:3,t:"Barro Negro Pottery Day",city:"Oaxaca",co:"Mexico",cat:"Pottery",h:5,p:55,r:4.9,n:98,e:"🏺",g:["#8b5e3c","#4a3426"],host:"Don Ernesto",hb:"Master potter, San Bartolo",d:"Shape and burnish black clay pieces using techniques older than the Spanish arrival."},
{id:4,t:"Tuscan Pasta from Scratch",city:"Florence",co:"Italy",cat:"Cooking",h:3,p:65,r:4.7,n:301,e:"🍝",g:["#f0b45a","#d9622b"],host:"Nonna Lucia",hb:"Family trattoria owner",d:"Roll, cut and sauce three classic pastas, then eat them together on a sunny terrace."},
{id:5,t:"Fado & Portuguese for Beginners",city:"Lisbon",co:"Portugal",cat:"Language",h:2,p:30,r:4.6,n:77,e:"🎸",g:["#5b8fa8","#2f5266"],host:"Inês Matos",hb:"Teacher & fado singer",d:"Learn survival phrases through song in a cozy Alfama tavern."},
{id:6,t:"Flamenco Basics Workshop",city:"Seville",co:"Spain",cat:"Dance",h:2,p:42,r:4.8,n:130,e:"💃",g:["#c9453a","#7a1f1a"],host:"Carmen Ruiz",hb:"Professional bailaora",d:"Rhythm, posture and palmas with a working flamenco dancer in her studio."},
{id:7,t:"Batik Painting Afternoon",city:"Yogyakarta",co:"Indonesia",cat:"Art",h:3,p:28,r:4.7,n:89,e:"🖌️",g:["#4f8a7a","#274f45"],host:"Pak Slamet",hb:"Batik artist",d:"Draw with hot wax and dye your own cloth with the royal city's signature technique."},
{id:8,t:"Lantern Making in the Old Town",city:"Hoi An",co:"Vietnam",cat:"Crafts",h:2,p:22,r:4.9,n:240,e:"🏮",g:["#f2a65a","#c4572a"],host:"Ms. Lan",hb:"Lantern maker",d:"Build a silk lantern frame and take it home, or hang it on the river at dusk."}];
const REV=[["Aisha","Genuinely the highlight of our trip. So warm and welcoming!"],["Tom","Small group, real skills, zero tourist-trap vibes."],["Lucía","Our host was patient and funny. Worth every penny."]];
let S={wish:[],booked:[],q:"",cat:"All",dest:"All",maxP:100,dur:"All",user:null};
try{Object.assign(S,JSON.parse(localStorage.getItem("wl")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("wl",JSON.stringify({wish:S.wish,booked:S.booked,user:S.user}))}catch(e){}};
const $=s=>document.querySelector(s),app=$("#app");
const grad=x=>`background:linear-gradient(135deg,${x.g[0]},${x.g[1]})`;
function toast(m){const t=$("#toast");t.textContent=m;t.style.display="block";setTimeout(()=>t.style.display="none",2200)}

// ---------- COMPONENTS ----------
const card=x=>`<div class="card fade" onclick="go('exp/${x.id}')"><div class="img" style="${pic(x)}"><span class="tag">${x.cat}</span>
<button class="heart ${S.wish.includes(x.id)?"on":""}" onclick="wish(event,${x.id})" aria-label="Save">♥</button></div>
<div class="body"><h3>${x.t}</h3><div class="meta">📍 ${x.city}, ${x.co} · ⏱ ${x.h}h</div>
<div class="row"><span class="meta">⭐ ${x.r} (${x.n})</span><span class="price">$${x.p} <small>/ person</small></span></div></div></div>`;
const dests=()=>[...new Set(EXP.map(x=>x.city))];
const destCard=c=>{const l=EXP.filter(x=>x.city==c),f=l[0];return `<div class="dest fade" style="${pic(f,1)}" onclick="S.dest='${c}';go('explore')"><h3>${c}</h3><span>${f.co} · ${l.length} experience${l.length>1?"s":""}</span></div>`}

// ---------- PAGES ----------
const P={
home(){return `<div class="hero"><div class="wrap fade"><div><h1>Travel. Learn. <em>Experience.</em></h1>
<p>Skip the souvenir shop. Cook, craft, dance and speak with local masters who'll teach you their world.</p>
<div class="search"><input id="hq" placeholder="Where to? Try Kyoto or pottery…"><button class="btn" onclick="S.q=$('#hq').value;S.dest='All';go('explore')">Search</button></div>
<a class="btn g" href="#explore">Explore Experiences</a></div>
<div class="collage"><div style="${pic(EXP[0],0)}"></div><div style="${pic(EXP[1],0)}"></div><div style="${pic(EXP[2],0)}"></div></div></div></div>
<section><div class="wrap"><div class="sh"><h2>Learn by category</h2></div><div class="chips">${CATS.map(c=>`<button class="chip" onclick="S.cat='${c}';S.dest='All';S.q='';go('explore')">${c}</button>`).join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap"><div class="sh"><div><h2>Popular destinations</h2><p>Places where culture is taught, not staged.</p></div><a class="btn o" href="#destinations">See all</a></div><div class="grid">${dests().slice(0,4).map(destCard).join("")}</div></div></section>
<section><div class="wrap"><div class="sh"><div><h2>Featured experiences</h2></div></div><div class="grid">${EXP.slice(0,4).map(card).join("")}</div></div></section>
<section><div class="wrap"><div class="cta"><h2>Share your craft with the world</h2><p>Teach travelers what you love and earn doing it.</p><a class="btn" href="#about">Become a host</a></div></div></section>`},
explore(){return `<section><div class="wrap fade"><div class="sh"><div><h2>Explore experiences</h2><p id="cnt"></p></div></div>
<div class="chips">${["All",...CATS].map(c=>`<button class="chip ${S.cat==c?"on":""}" onclick="S.cat='${c}';go('explore')">${c}</button>`).join("")}</div>
<div class="filters"><div><label>Search</label><input id="fq" value="${S.q}" placeholder="Keyword"></div>
<div><label>Destination</label><select id="fd"><option>All</option>${dests().map(c=>`<option ${S.dest==c?"selected":""}>${c}</option>`).join("")}</select></div>
<div><label>Max price: $<span id="pv">${S.maxP}</span></label><input id="fp" type="range" min="20" max="100" value="${S.maxP}"></div>
<div><label>Duration</label><select id="fh"><option>All</option><option ${S.dur=="short"?"selected":""} value="short">Up to 2 hours</option><option ${S.dur=="mid"?"selected":""} value="mid">3–4 hours</option><option ${S.dur=="long"?"selected":""} value="long">5+ hours</option></select></div></div>
<div class="grid" id="list"></div></div></section>`},
exp(id){const x=EXP.find(e=>e.id==id);if(!x)return P.home();
return `<section><div class="wrap fade"><a href="#explore" class="meta">← Back to experiences</a><h2 style="font-size:36px;margin-top:10px">${x.t}</h2><p class="meta">📍 ${x.city}, ${x.co} · ⭐ ${x.r} (${x.n} reviews) · ${x.cat}</p>
<div class="gal"><div style="${pic(x,0)}"></div><div style="${pic(x,1)}"></div><div style="${pic(x,2)}"></div></div>
<div class="det"><div><h3>About this experience</h3><p>${x.d}</p>
<div class="box host" style="margin:20px 0"><div class="av">👤</div><div><b>Hosted by ${x.host}</b><div class="meta">${x.hb}</div></div></div>
<h3>Schedule</h3><div class="box"><div>🕐 <b>Start</b> – Welcome & introductions</div><div>🛠 <b>Middle</b> – Hands-on learning</div><div>🍵 <b>End</b> – Share, taste & take your creation home</div></div>
<h3 style="margin-top:24px">Location</h3><div class="box" style="${grad({g:["#e9dcc4","#cdbf9f"]})};height:120px;display:grid;place-items:center;color:var(--br)">📍 ${x.city}, ${x.co} (exact spot shared after booking)</div>
<h3 style="margin-top:24px">Reviews</h3>${REV.map(r=>`<div class="rev"><b>${r[0]}</b> ⭐⭐⭐⭐⭐<div class="meta">${r[1]}</div></div>`).join("")}</div>
<div class="sticky box"><div class="price" style="font-size:28px">$${x.p} <small>/ person</small></div><p class="meta">⏱ ${x.h} hours · Small group · Free cancellation 48h</p>
<a class="btn" style="width:100%;text-align:center" href="#book/${x.id}">Book Experience</a></div></div></div></section>`},
destinations(){return `<section><div class="wrap fade"><div class="sh"><div><h2>Destinations</h2><p>Pick a city and learn like a local.</p></div></div><div class="grid">${dests().map(destCard).join("")}</div></div></section>`},
about(){return `<section><div class="wrap fade"><h2 style="font-size:44px;max-width:700px">We connect curious travelers with the people who keep culture alive.</h2>
<p class="meta" style="max-width:640px;font-size:18px">Wanderlearn partners with local teachers, artists, chefs and cultural experts so every trip leaves you with a skill, a story and a new friend.</p>
<div class="steps" style="margin-top:30px"><div class="box"><div class="big">🔍</div><h3>Discover</h3><p class="meta">Browse hand-vetted classes in cities worldwide.</p></div><div class="box"><div class="big">📅</div><h3>Book</h3><p class="meta">Reserve your spot in seconds with secure checkout.</p></div><div class="box"><div class="big">🤝</div><h3>Learn</h3><p class="meta">Spend time with a local master and take home something real.</p></div></div>
<div class="cta" style="margin-top:40px"><h2>Are you a local expert?</h2><p>Host a class and welcome travelers into your world.</p><button class="btn" onclick="toast('Host application coming soon!')">Apply to host</button></div></div></section>`},
book(id){const x=EXP.find(e=>e.id==id);if(!x)return P.home();
return `<section><div class="wrap fade"><h2>Book: ${x.t}</h2><div class="det"><div class="box"><div class="two"><div><label>Date</label><input id="bd" type="date"><div class="err" id="b1"></div></div>
<div><label>Travelers</label><input id="bn" type="number" min="1" max="10" value="2"><div class="err" id="b2"></div></div></div>
<label>Full name</label><input id="bname" placeholder="Your name"><div class="err" id="b3"></div>
<label>Email</label><input id="bmail" type="email" placeholder="you@example.com"><div class="err" id="b4"></div>
<label>Payment method</label><select><option>Credit / debit card</option><option>UPI</option><option>PayPal</option></select></div>
<div class="sticky box sum"><h3>Booking summary</h3><div><span>${x.t}</span></div><div><span>$${x.p} × <b id="sn">2</b></span><span id="s1"></span></div><div><span>Service fee (5%)</span><span id="s2"></span></div><div class="t"><span>Total</span><span id="s3"></span></div>
<button class="btn" id="pay" style="width:100%;margin-top:10px">Confirm booking</button></div></div></div></section>`},
profile(){const B=S.booked.map(i=>EXP.find(e=>e.id==i)),W=S.wish.map(i=>EXP.find(e=>e.id==i));
const sec=(t,l,em)=>`<div class="sh" style="margin-top:30px"><h2 style="font-size:26px">${t}</h2></div>${l.length?`<div class="grid">${l.map(card).join("")}</div>`:`<p class="meta">${em}</p>`}`;
return `<section><div class="wrap fade"><div class="box host"><div class="av" style="width:72px;height:72px;font-size:34px">🧳</div><div><h2 style="margin:0">${S.user||"Guest traveler"}</h2><p class="meta" style="margin:0">${S.user?"Member · "+B.length+" booked · "+W.length+" saved":"Log in to sync your trips."}</p></div></div>
${sec("Booked experiences",B,"Nothing booked yet.")}${sec("Saved experiences",W,"Tap the ♥ on any card to save it.")}
<div class="sh" style="margin-top:30px"><h2 style="font-size:26px">My reviews</h2></div><p class="meta">${B.length?"Review your completed classes after your trip.":"Your reviews will appear here."}</p>
<div class="sh" style="margin-top:30px"><h2 style="font-size:26px">Travel history</h2></div><p class="meta">${[...new Set(B.map(x=>x.city))].join(" · ")||"Your journeys will show up here."}</p></div></section>`}};

// ---------- ROUTER & EVENTS ----------
function go(h){location.hash=h;if(location.hash=="#"+h)route()}
function route(){const [p,a]=(location.hash.slice(1)||"home").split("/");
app.innerHTML=(P[p]||P.home)(a);window.scrollTo(0,0);$("#links").classList.remove("open");
document.querySelectorAll(".links a").forEach(l=>l.classList.toggle("on",l.dataset.p==p));
if(p=="explore")initExplore();if(p=="book")initBook(a)}
function initExplore(){const run=()=>{S.q=$("#fq").value;S.dest=$("#fd").value;S.maxP=+$("#fp").value;$("#pv").textContent=S.maxP;
const d=$("#fh").value;S.dur=d;
const L=EXP.filter(x=>(S.cat=="All"||x.cat==S.cat)&&(S.dest=="All"||x.city==S.dest)&&x.p<=S.maxP&&(!S.q||(x.t+x.city+x.co+x.cat).toLowerCase().includes(S.q.toLowerCase()))&&(d=="All"||(d=="short"&&x.h<=2)||(d=="mid"&&x.h>=3&&x.h<=4)||(d=="long"&&x.h>=5)));
$("#list").innerHTML=L.map(card).join("")||'<p class="meta">No matches. Try loosening your filters.</p>';$("#cnt").textContent=L.length+" experiences found"};
["fq","fd","fp","fh"].forEach(i=>$("#"+i).addEventListener("input",run));run()}
function initBook(id){const x=EXP.find(e=>e.id==id),d=$("#bd");d.min=new Date().toISOString().slice(0,10);
const calc=()=>{const n=Math.max(1,+$("#bn").value||1),s=x.p*n,f=Math.round(s*.05);$("#sn").textContent=n;$("#s1").textContent="$"+s;$("#s2").textContent="$"+f;$("#s3").textContent="$"+(s+f)};
$("#bn").addEventListener("input",calc);calc();
$("#pay").onclick=()=>{let ok=true;const set=(e,m)=>{$("#"+e).textContent=m;if(m)ok=false};
set("b1",d.value?"":"Please pick a date.");const n=+$("#bn").value;set("b2",n>=1&&n<=10?"":"Choose 1–10 travelers.");
set("b3",$("#bname").value.trim().length>1?"":"Enter your name.");set("b4",/^\S+@\S+\.\S+$/.test($("#bmail").value)?"":"Enter a valid email.");
if(!ok)return;if(!S.booked.includes(x.id))S.booked.push(x.id);save();toast("🎉 Booked! See it in your profile.");setTimeout(()=>go("profile"),1200)}}
function wish(e,id){e.stopPropagation();const i=S.wish.indexOf(id);i<0?S.wish.push(id):S.wish.splice(i,1);save();e.currentTarget.classList.toggle("on");toast(i<0?"Saved to wishlist":"Removed from wishlist")}
$("#burger").onclick=()=>$("#links").classList.toggle("open");
const M=$("#modal");$("#loginBtn").onclick=()=>M.classList.add("show");$("#closeM").onclick=()=>M.classList.remove("show");
$("#doLogin").onclick=()=>{const e=$("#em").value,p=$("#pw").value;let ok=true;
$("#e1").textContent=/^\S+@\S+\.\S+$/.test(e)?"":(ok=false,"Enter a valid email.");$("#e2").textContent=p.length>=6?"":(ok=false,"Password needs 6+ characters.");
if(!ok)return;S.user=e.split("@")[0];save();M.classList.remove("show");toast("Welcome, "+S.user+"!");if(location.hash=="#profile")route()};
window.addEventListener("hashchange",route);route();
