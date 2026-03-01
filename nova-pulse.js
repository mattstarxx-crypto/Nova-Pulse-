// ═══════════════════════════════════════
// CORE STATE
// ═══════════════════════════════════════
let u24=false,uSec=true,uIsF=true,starsOn=true,userName='',isPlaying=false,repeat=false;
const tF=72;
let currentTrack=null,progInterval=null,progVal=0;

// ═══════════════════════════════════════
// CLOCK
// ═══════════════════════════════════════
function tick(){
  const n=new Date();let h=n.getHours(),ampm=h>=12?'PM':'AM';
  if(!u24){h=h%12||12;}
  const m=String(n.getMinutes()).padStart(2,'0');
  const s=String(n.getSeconds()).padStart(2,'0');
  document.getElementById('hh').textContent=String(h).padStart(2,'0');
  document.getElementById('hm').textContent=uSec?`${m}:${s}`:m;
  document.getElementById('hampm').textContent=u24?'':ampm;
  const D=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('hdate').textContent=`${D[n.getDay()]}, ${M[n.getMonth()]} ${n.getDate()}`;
  const hb=document.getElementById('hb-day');if(hb)hb.textContent=D[n.getDay()];
  const hbp=document.getElementById('hb-part'),hbi=document.getElementById('hb-icon');
  const hr=new Date().getHours();
  if(hr<12){if(hbp)hbp.textContent='Morning';if(hbi)hbi.textContent='🌅';}
  else if(hr<17){if(hbp)hbp.textContent='Afternoon';if(hbi)hbi.textContent='☀️';}
  else if(hr<21){if(hbp)hbp.textContent='Evening';if(hbi)hbi.textContent='🌆';}
  else{if(hbp)hbp.textContent='Night';if(hbi)hbi.textContent='🌙';}
}
setInterval(tick,1000);tick();

// ═══════════════════════════════════════
// GREETING
// ═══════════════════════════════════════
const cardGreets=[
  ()=>{const h=new Date().getHours(),n=userName?`, ${userName}`:'';return h<12?`Good morning${n} ☀️`:h<17?`Good afternoon${n} 👋`:h<21?`Good evening${n} 🌆`:`Good night${n} 🌙`;},
  ()=>`Hope your day's going smooth${userName?' '+userName:''} ✦`,
  ()=>`What's good${userName?', '+userName:''}? Stay focused 🎯`,
  ()=>`Another day, another W${userName?', '+userName:''} 💪`,
];
let cgIdx=0;
function rotateGreet(){const el=document.getElementById('hg');if(!el)return;el.classList.remove('show');setTimeout(()=>{cgIdx=(cgIdx+1)%cardGreets.length;el.textContent=cardGreets[cgIdx]();el.classList.add('show');},500);}
function liveGreet(){
  userName=document.getElementById('nameIn')?.value||'';
  const el=document.getElementById('hg');
  if(el){el.textContent=cardGreets[cgIdx]();el.classList.add('show');}
  const acn=document.getElementById('acc-name-display');if(acn)acn.textContent=userName||'Matthew Mateos';
  const anr=document.getElementById('acc-name-row');if(anr)anr.textContent=userName||'Matthew';
}
function saveName(){userName=document.getElementById('nameIn').value.trim();liveGreet();}
setTimeout(()=>{liveGreet();},250);
setInterval(rotateGreet,6000);

const prompts=["Matthew Mateos made this with Claude ✦","Built different. Built by Matthew.","Nova Pulse — crafted by Matthew Mateos 🌙","Matthew x Claude. That's the collab.","Made with Claude, designed by Matthew ✦","A Matthew Mateos production 🎬","Claude wrote the code. Matthew had the vision.","Powered by vibes & Claude AI ✦","Matthew said 'build me something clean' 🔥"];
let pIdx=Math.floor(Math.random()*prompts.length);
function cyclePrompt(){const el=document.getElementById('greetBar');el.classList.remove('show');setTimeout(()=>{pIdx=(pIdx+1)%prompts.length;el.textContent=prompts[pIdx];el.classList.add('show');},600);}
setTimeout(()=>{const el=document.getElementById('greetBar');el.textContent=prompts[pIdx];el.classList.add('show');},400);
setInterval(cyclePrompt,5000);

// ═══════════════════════════════════════
// WEATHER + UNIT
// ═══════════════════════════════════════
function setU(u){uIsF=u==='F';const t=uIsF?tF:Math.round((tF-32)*5/9);document.getElementById('wTemp').textContent=`${t}°${u}`;document.getElementById('uF').classList.toggle('active',uIsF);document.getElementById('uC').classList.toggle('active',!uIsF);document.getElementById('acc-unit-row').textContent=`°${u}`;}
fetch('https://wttr.in/Phoenix?format=j1').then(r=>r.json()).then(d=>{const c=d.current_condition[0];const ic={'113':'☀️','116':'🌤️','119':'⛅','122':'☁️','176':'🌦️','200':'⛈️','227':'🌨️','230':'❄️'};document.getElementById('wIcon').textContent=ic[c.weatherCode]||'🌡️';document.getElementById('wTemp').textContent=`${c.temp_F}°F`;document.getElementById('wDesc').textContent=c.weatherDesc[0].value;}).catch(()=>{});

// ═══════════════════════════════════════
// THEME
// ═══════════════════════════════════════
function setTheme(t,el){
  document.documentElement.setAttribute('data-theme',t);
  document.querySelectorAll('.topt').forEach(b=>b.classList.remove('active'));
  if(el)el.classList.add('active');
  const tnames={dark:'Dark',mono:'Mono ✦',light:'Light',ocean:'Ocean',rose:'Rose',sunset:'Sunset',mint:'Mint',violet:'Violet'};
  document.getElementById('acc-theme-row').textContent=tnames[t]||t;
  setTimeout(drawS,60);
}
document.addEventListener('click',e=>{if(e.target.classList.contains('gf')){document.querySelectorAll('.gf').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');}});

// ═══════════════════════════════════════
// CUSTOM BACKGROUND
// ═══════════════════════════════════════
let activeBgType = 'none'; // 'none' | 'color' | 'gradient' | 'image' | 'video'
let activeBgValue = '';

const BG_PRESETS_COLOR = ['#0b0b0e','#030810','#0c0610','#0f0800','#08020f','#1a0030','#003020','#001a30'];
const BG_PRESETS_GRADIENT = [
  'linear-gradient(135deg,#0b0b0e,#1a0040)',
  'linear-gradient(135deg,#030810,#001040)',
  'linear-gradient(135deg,#0c0610,#3a0050)',
  'linear-gradient(135deg,#0f0800,#400010)',
  'linear-gradient(160deg,#000 0%,#1a3a2a 100%)',
  'linear-gradient(135deg,#08020f,#1a0030,#000820)',
  'radial-gradient(ellipse at 60% 40%,#1a0040,#000)',
  'radial-gradient(ellipse at 30% 70%,#003020,#000)',
];

function initBgUI(){
  // color swatches
  const colorRow = document.getElementById('bg-color-swatches');
  if(colorRow){
    colorRow.innerHTML = BG_PRESETS_COLOR.map(c=>`<div class="color-swatch" style="background:${c};" onclick="applyBgColor('${c}',this)" title="${c}"></div>`).join('')
    + `<input type="color" id="bg-custom-color" style="width:28px;height:28px;border-radius:50%;border:none;cursor:pointer;padding:0;background:transparent;" value="#0b0b0e" onchange="applyBgColor(this.value,null)">`;
  }
  // gradient swatches
  const gradRow = document.getElementById('bg-gradient-swatches');
  if(gradRow){
    gradRow.innerHTML = BG_PRESETS_GRADIENT.map((g,i)=>`<div class="color-swatch" style="background:${g};border-radius:8px;width:44px;height:28px;" onclick="applyBgGradient('${g.replace(/'/g,'\\')}',this)"></div>`).join('');
  }
}

function switchBgType(type){
  activeBgType = type;
  document.querySelectorAll('.bg-type-btn').forEach(b=>b.classList.remove('active'));
  const btn = document.getElementById('bg-type-'+type);
  if(btn) btn.classList.add('active');
  document.querySelectorAll('.bg-section').forEach(s=>s.classList.remove('active'));
  const sec = document.getElementById('bg-sec-'+type);
  if(sec) sec.classList.add('active');
  if(type==='none') clearBg();
}

function applyBgColor(color, el){
  activeBgValue = color;
  const layer = document.getElementById('custom-bg-layer');
  const vid = document.getElementById('custom-bg-video');
  vid.src=''; vid.style.display='none';
  layer.style.background = color;
  layer.classList.add('active');
  document.querySelectorAll('#bg-color-swatches .color-swatch').forEach(s=>s.classList.remove('selected'));
  if(el) el.classList.add('selected');
  updateBgPreview();
}

function applyBgGradient(gradient, el){
  activeBgValue = gradient;
  const layer = document.getElementById('custom-bg-layer');
  const vid = document.getElementById('custom-bg-video');
  vid.src=''; vid.style.display='none';
  layer.style.background = gradient;
  layer.classList.add('active');
  document.querySelectorAll('#bg-gradient-swatches .color-swatch').forEach(s=>s.classList.remove('selected'));
  if(el) el.classList.add('selected');
  updateBgPreview();
}

function applyBgImage(){
  const url = document.getElementById('bg-image-url').value.trim();
  if(!url) return;
  activeBgValue = url;
  const layer = document.getElementById('custom-bg-layer');
  const vid = document.getElementById('custom-bg-video');
  vid.src=''; vid.style.display='none';
  layer.style.background = `url('${url}') center/cover no-repeat`;
  layer.classList.add('active');
  updateBgPreview();
}

function applyBgVideo(){
  const url = document.getElementById('bg-video-url').value.trim();
  if(!url) return;
  activeBgValue = url;
  const layer = document.getElementById('custom-bg-layer');
  const vid = document.getElementById('custom-bg-video');
  layer.style.background = '#000';
  vid.src = url;
  vid.loop = true;
  vid.muted = true;
  vid.autoplay = true;
  vid.style.display = 'block';
  vid.play().catch(()=>{});
  layer.classList.add('active');
  updateBgPreview();
}

function clearBg(){
  activeBgValue = '';
  const layer = document.getElementById('custom-bg-layer');
  const vid = document.getElementById('custom-bg-video');
  vid.src=''; vid.style.display='none';
  layer.style.background = '';
  layer.classList.remove('active');
  updateBgPreview();
}

function updateBgPreview(){
  const prev = document.getElementById('bg-preview-box');
  if(!prev) return;
  if(activeBgType==='video' && activeBgValue){
    prev.style.background = '#111';
    prev.innerHTML = '<div style="color:#fff;font-size:11px;display:flex;height:100%;align-items:center;justify-content:center;">🎬 Video BG Active</div>';
  } else if(activeBgValue){
    prev.style.background = activeBgValue.startsWith('url') ? activeBgValue : activeBgValue;
    prev.innerHTML = '';
  } else {
    prev.style.background = 'var(--surface2)';
    prev.innerHTML = '<div style="color:var(--muted);font-size:11px;display:flex;height:100%;align-items:center;justify-content:center;">No background set</div>';
  }
}

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
const brandHTML='<span class="brand-nova">Nova</span><span class="brand-pulse">Pulse</span><span class="brand-star">✦</span>';
const plabels={home:brandHTML,school:'School Hub 📚',games:'Games ✦',movies:'Movies ✦',music:'Music ✦',browse:'Browse ✦',apps:'Apps ✦',ai:'Nova AI ✦',calculator:'Calculator 🧮',pomodoro:'Focus Timer ⏱️',settings:'Settings ✦',account:'Account ✦'};
const pSt=document.createElement('style');document.head.appendChild(pSt);
function go(id,el,pill){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  document.getElementById('p-'+id).classList.add('on');
  document.querySelectorAll('.ni').forEach(n=>n.classList.remove('active'));
  if(el)el.classList.add('active');
  document.getElementById('pageLabel').innerHTML=plabels[id]||brandHTML;
  if(pill>0)pSt.textContent=`.sidebar::after{top:${pill}px;}`;
  else pSt.textContent=`.sidebar::after{display:none;}`;
  if(id==='music')setTimeout(initMusicPlayer,50);
  if(id==='settings')setTimeout(initBgUI,50);
}

// ═══════════════════════════════════════
// STARS
// ═══════════════════════════════════════
const cv=document.getElementById('sc'),ctx=cv.getContext('2d');
let stars=[],raf2;
function resize(){cv.width=innerWidth;cv.height=innerHeight;genS();if(raf2)cancelAnimationFrame(raf2);drawS();}
function genS(){stars=[];const c=Math.floor(cv.width*cv.height/4500);for(let i=0;i<c;i++)stars.push({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.4+.2,o:Math.random()*.7+.2,sp:Math.random()*.4+.05,ph:Math.random()*Math.PI*2});}
function drawS(){ctx.clearRect(0,0,cv.width,cv.height);if(!starsOn)return;const raw=getComputedStyle(document.documentElement).getPropertyValue('--star').trim();if(!raw||raw==='transparent')return;const t=Date.now()/1000;stars.forEach(s=>{const tw=s.o*(0.55+0.45*Math.sin(t*s.sp*2+s.ph));ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=raw.replace(/[\d.]+\)$/,tw.toFixed(2)+')');ctx.fill();});raf2=requestAnimationFrame(drawS);}
window.addEventListener('resize',resize);resize();

// ═══════════════════════════════════════
// CALCULATOR
// ═══════════════════════════════════════
let calcDisplay='0',calcExpr='',calcOperand=null,calcOper=null,calcNewNum=true,calcJustEq=false;

function updateCalcDisplay(){
  const rd=document.getElementById('calc-result'),re=document.getElementById('calc-expr');
  let disp=calcDisplay;
  if(disp.length>12)disp=parseFloat(parseFloat(disp).toPrecision(10)).toString();
  rd.textContent=disp;re.textContent=calcExpr;
  rd.classList.toggle('accent',calcJustEq&&calcDisplay!=='0');
}

document.addEventListener('keydown',e=>{
  if(!document.getElementById('p-calculator').classList.contains('on'))return;
  const k=e.key;
  if(k>='0'&&k<='9'){calcNum(k);return;}
  if(k==='.')  {calcDot();return;}
  if(k==='+'||k==='-'){calcOp(k);return;}
  if(k==='*'||k==='x'){calcOp('*');return;}
  if(k==='/')  {e.preventDefault();calcOp('/');return;}
  if(k==='Enter'||k==='='){calcEquals();return;}
  if(k==='Escape'||k==='Delete'){calcClear();return;}
  if(k==='Backspace'){calcBackspace();return;}
  if(k==='%'){calcPercent();return;}
});

function calcNum(d){calcJustEq=false;if(calcNewNum){calcDisplay=d==='0'&&calcDisplay==='0'?'0':d;calcNewNum=false;}else{if(calcDisplay==='0')calcDisplay=d;else calcDisplay+=d;}updateCalcDisplay();}
function calcDot(){calcJustEq=false;if(calcNewNum){calcDisplay='0.';calcNewNum=false;}else if(!calcDisplay.includes('.'))calcDisplay+='.';updateCalcDisplay();}
function calcBackspace(){calcJustEq=false;if(calcDisplay.length>1)calcDisplay=calcDisplay.slice(0,-1);else calcDisplay='0';updateCalcDisplay();}
function calcOp(op){
  calcJustEq=false;const opMap={'+':'+','-':'−','*':'×','/':'÷'};
  if(calcOperand!==null&&!calcNewNum){const result=compute(calcOperand,parseFloat(calcDisplay),calcOper);calcDisplay=formatResult(result);calcOperand=result;}
  else{calcOperand=parseFloat(calcDisplay);}
  calcOper=op;calcNewNum=true;calcExpr=`${calcOperand} ${opMap[op]}`;updateCalcDisplay();
}
function calcEquals(){
  if(calcOper===null||calcOperand===null)return;
  const opMap={'+':'+','-':'−','*':'×','/':'÷'};
  const b=parseFloat(calcDisplay);
  calcExpr=`${calcOperand} ${opMap[calcOper]} ${b} =`;
  const result=compute(calcOperand,b,calcOper);
  calcDisplay=formatResult(result);calcOperand=null;calcOper=null;calcNewNum=true;calcJustEq=true;updateCalcDisplay();
}
function compute(a,b,op){switch(op){case'+':return a+b;case'-':return a-b;case'*':return a*b;case'/':return b===0?NaN:a/b;default:return b;}}
function formatResult(n){if(isNaN(n))return'Error';if(!isFinite(n))return n>0?'∞':'-∞';return parseFloat(n.toPrecision(12)).toString();}
function calcClear(){calcDisplay='0';calcExpr='';calcOperand=null;calcOper=null;calcNewNum=true;calcJustEq=false;updateCalcDisplay();}
function calcToggleSign(){calcJustEq=false;calcDisplay=formatResult(-parseFloat(calcDisplay));updateCalcDisplay();}
function calcPercent(){calcJustEq=false;calcDisplay=formatResult(parseFloat(calcDisplay)/100);updateCalcDisplay();}

// ═══════════════════════════════════════
// MUSIC — YOUTUBE EMBED
// ═══════════════════════════════════════
let ytQueue=[],ytCurrentIdx=-1,ytSearching=false;
const ytColors=['#7b68ee','#ff6b6b','#4ecba0','#ffd700','#4da6ff','#bf55ff','#ff9a2e','#00ffc8'];

async function ytSearch(){
  const inp=document.getElementById('yt-search-input');
  const q=inp.value.trim();if(!q||ytSearching)return;ytSearching=true;
  const list=document.getElementById('ms-list');
  list.innerHTML='<div class="ms-empty"><div class="ms-empty-icon" style="animation:spin 1s linear infinite;display:inline-block;">⏳</div><div class="ms-empty-txt">Searching...</div></div>';
  try{
    const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:700,system:`You are a music search assistant. Return ONLY a valid JSON array, no markdown, no explanation. For each result include: videoId (real 11-char YouTube ID you are CERTAIN exists), title, artist. Return up to 6 results for well-known songs.`,messages:[{role:'user',content:`Find YouTube music videos for: ${q}`}]})});
    const data=await resp.json();
    const text=data.content?.[0]?.text||'[]';
    const results=JSON.parse(text.replace(/```json|```/g,'').trim());
    if(!results.length){list.innerHTML='<div class="ms-empty"><div class="ms-empty-icon">🔍</div><div class="ms-empty-txt">No results — try another search</div></div>';ytSearching=false;return;}
    list.innerHTML=results.map((r,i)=>`<div class="ms-track" onclick="ytAddAndPlay('${r.videoId}','${escHtml(r.title)}','${escHtml(r.artist)}')"><div class="ms-track-art" style="padding:0;overflow:hidden;"><img src="https://img.youtube.com/vi/${r.videoId}/default.jpg" width="40" height="40" style="object-fit:cover;border-radius:8px;display:block;" onerror="this.parentElement.innerHTML='🎵'"></div><div class="ms-track-info"><div class="ms-track-name">${r.title}</div><div class="ms-track-meta">${r.artist}</div></div><div style="font-size:16px;color:var(--accent);flex-shrink:0;">▶</div></div>`).join('');
  }catch(e){list.innerHTML='<div class="ms-empty"><div class="ms-empty-icon">😵</div><div class="ms-empty-txt">Search failed — try again ✦</div></div>';}
  ytSearching=false;
}

function escHtml(s){return(s||'').replace(/'/g,"&#39;").replace(/"/g,"&quot;");}

function ytAddAndPlay(videoId,title,artist){
  const existing=ytQueue.findIndex(t=>t.videoId===videoId);
  if(existing>=0){ytPlayIdx(existing);return;}
  ytQueue.push({videoId,title,artist,thumb:`https://img.youtube.com/vi/${videoId}/default.jpg`,color:ytColors[ytQueue.length%ytColors.length]});
  ytPlayIdx(ytQueue.length-1);
}

function ytPlayIdx(i){
  if(i<0||i>=ytQueue.length)return;
  const track=ytQueue[i];ytCurrentIdx=i;isPlaying=true;
  document.getElementById('mp-title').textContent=track.title;
  document.getElementById('mp-sub').textContent=track.artist+' ✦';
  applyTrackColor(track.color);setVisualizerActive(true);
  document.getElementById('mp-play-icon').innerHTML='<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>';
  document.getElementById('mp-prog').style.width='0%';
  const artArea=document.getElementById('mp-art-area');
  artArea.innerHTML=`<div class="mp-art-glow" id="mp-art-glow" style="background:radial-gradient(ellipse at 50% 60%,${track.color} 0%,transparent 70%);opacity:.55;"></div><iframe id="yt-embed" src="https://www.youtube.com/embed/${track.videoId}?autoplay=1&controls=1&playsinline=1&rel=0&modestbranding=1" allow="autoplay; encrypted-media" allowfullscreen style="width:100%;height:100%;border:none;position:relative;z-index:2;min-height:200px;"></iframe><div class="mp-visualizer" id="mp-visualizer">${[40,30,50,25,45,35,55,28].map((h,i)=>`<div class="vbar on" style="height:${h}px;--spd:${0.3+i*0.05}s;background:${track.color}"></div>`).join('')}</div>`;
  renderYtQueue();
}

function renderYtQueue(){
  if(!ytQueue.length)return;
  const list=document.getElementById('ms-list');
  list.innerHTML=`<div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);padding:4px 12px 8px;">Queue ✦</div>`+ytQueue.map((t,i)=>`<div class="ms-track ${i===ytCurrentIdx?'now-playing':''}" onclick="ytPlayIdx(${i})"><div class="ms-track-art" style="padding:0;overflow:hidden;${i===ytCurrentIdx?'box-shadow:0 0 14px '+t.color:''}"><img src="${t.thumb}" width="40" height="40" style="object-fit:cover;border-radius:8px;display:block;" onerror="this.parentElement.innerHTML='🎵'"></div><div class="ms-track-info"><div class="ms-track-name">${t.title}</div><div class="ms-track-meta">${t.artist}</div></div><div class="ms-track-del" onclick="event.stopPropagation();ytRemove(${i})">✕</div></div>`).join('');
}

function ytRemove(i){
  if(i===ytCurrentIdx){
    isPlaying=false;setVisualizerActive(false);
    document.getElementById('mp-title').textContent='Not Playing';
    document.getElementById('mp-sub').textContent='Search a song ✦';
    document.getElementById('mp-play-icon').innerHTML='<polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/>';
    document.getElementById('mp-prog').style.width='0%';resetTrackColor();
    document.getElementById('mp-art-area').innerHTML=`<div class="mp-art-glow" id="mp-art-glow"></div><div class="mp-art-icon" id="mp-art-emoji">🎵</div><div class="mp-visualizer" id="mp-visualizer">${[40,30,50,25,45,35,55,28].map(h=>`<div class="vbar" style="height:${h}px;"></div>`).join('')}</div>`;
    ytCurrentIdx=-1;
  }else if(i<ytCurrentIdx){ytCurrentIdx--;}
  ytQueue.splice(i,1);
  if(!ytQueue.length){document.getElementById('ms-list').innerHTML='<div class="ms-empty"><div class="ms-empty-icon">▶️</div><div class="ms-empty-txt">Search a song above to start playing ✦</div></div>';}
  else{renderYtQueue();}
}

function togglePlay(){
  if(musicSrc==='sc'){
    if(scCurrentIdx<0){if(scTracks.length>0)scPlayIdx(0);return;}
    if(!scWidget||!scReady)return;
    if(isPlaying)scWidget.pause();else scWidget.play();return;
  }
  if(ytCurrentIdx<0){if(ytQueue.length>0)ytPlayIdx(0);return;}
  const embed=document.getElementById('yt-embed');if(!embed)return;
  const track=ytQueue[ytCurrentIdx];
  if(isPlaying){
    isPlaying=false;setVisualizerActive(false);
    embed.src=`https://www.youtube.com/embed/${track.videoId}?autoplay=0&controls=1&playsinline=1&rel=0`;
    document.getElementById('mp-play-icon').innerHTML='<polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/>';
  }else{
    isPlaying=true;setVisualizerActive(true);
    embed.src=`https://www.youtube.com/embed/${track.videoId}?autoplay=1&controls=1&playsinline=1&rel=0`;
    document.getElementById('mp-play-icon').innerHTML='<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>';
  }
}

function nextTrack(){if(musicSrc==='sc'){if(scTracks.length)scPlayIdx((scCurrentIdx+1)%scTracks.length);}else if(ytQueue.length)ytPlayIdx((ytCurrentIdx+1)%ytQueue.length);}
function prevTrack(){if(musicSrc==='sc'){if(scTracks.length)scPlayIdx((scCurrentIdx-1+scTracks.length)%scTracks.length);}else if(ytQueue.length)ytPlayIdx((ytCurrentIdx-1+ytQueue.length)%ytQueue.length);}
function toggleRepeat(){repeat=!repeat;document.getElementById('repeat-btn').style.color=repeat?'var(--accent)':'var(--muted)';}
function initMusicPlayer(){renderYtQueue();}

// Source switcher
let musicSrc='yt';
function switchSrc(s){
  musicSrc=s;
  document.getElementById('src-yt').classList.toggle('active',s==='yt');
  document.getElementById('src-sc').classList.toggle('active',s==='sc');
  document.getElementById('yt-panel').style.display=s==='yt'?'':'none';
  document.getElementById('sc-panel').style.display=s==='sc'?'flex':'none';
  const list=document.getElementById('ms-list');
  if(s==='yt'){if(ytQueue.length)renderYtQueue();else list.innerHTML='<div class="ms-empty"><div class="ms-empty-icon">▶️</div><div class="ms-empty-txt">Search a song above to start playing ✦</div></div>';}
  else{renderScList();}
}

// SoundCloud
let scTracks=[],scCurrentIdx=-1,scWidget=null,scReady=false;
const scColors=['#7b68ee','#ff6b6b','#4ecba0','#ffd700','#4da6ff','#bf55ff','#ff9a2e','#00ffc8'];
const scEmojis=['🎵','🔥','🌊','⚡','🌙','💎','🚀','🌿','🎸','🎹'];

function loadScApi(cb){if(window.SC){cb();return;}const s=document.createElement('script');s.src='https://w.soundcloud.com/player/api.js';s.onload=cb;document.head.appendChild(s);}
function addScTrack(){
  const inp=document.getElementById('sc-url-input');let url=inp.value.trim();
  if(!url)return;if(!url.startsWith('http'))url='https://'+url;
  if(!url.includes('soundcloud.com')){scHintErr('Please paste a SoundCloud URL ✦');return;}
  if(scTracks.find(t=>t.url===url)){scHintErr('Already in your list ✦');return;}
  inp.value='';
  const track={url,title:'Loading...',artist:'SoundCloud',emoji:scEmojis[scTracks.length%scEmojis.length],color:scColors[scTracks.length%scColors.length],id:Date.now()};
  scTracks.push(track);renderScList();resolveScTitle(track);
}
function scHintErr(msg){const el=document.getElementById('sc-hint');const orig=el.textContent;el.style.color='#ff6b6b';el.textContent=msg;setTimeout(()=>{el.style.color='';el.textContent=orig;},2500);}
function resolveScTitle(track){
  loadScApi(()=>{
    const iframe=document.getElementById('sc-iframe');
    iframe.src='https://w.soundcloud.com/player/?url='+encodeURIComponent(track.url)+'&auto_play=false';
    iframe.style.display='none';
    const tw=SC.Widget(iframe);
    tw.bind(SC.Widget.Events.READY,()=>{tw.getCurrentSound(s=>{if(s){track.title=s.title||track.title;track.artist=s.user?s.user.username:'SoundCloud';}renderScList();if(scTracks.length===1)scPlayIdx(0);});});
  });
}
function renderScList(){
  const list=document.getElementById('ms-list');
  if(!scTracks.length){list.innerHTML='<div class="ms-empty"><div class="ms-empty-icon">🎧</div><div class="ms-empty-txt">Paste a SoundCloud URL above ✦</div></div>';return;}
  list.innerHTML='<div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);padding:4px 12px 8px;">Queue ✦</div>'
    +scTracks.map((t,i)=>`<div class="ms-track ${i===scCurrentIdx?'now-playing':''}" onclick="scPlayIdx(${i})"><div class="ms-track-art" style="${i===scCurrentIdx?'box-shadow:0 0 14px '+t.color:''}"><span style="font-size:18px">${t.emoji}</span></div><div class="ms-track-info"><div class="ms-track-name">${t.title}</div><div class="ms-track-meta">${t.artist}</div></div><div class="ms-track-del" onclick="event.stopPropagation();scRemove(${i})">✕</div></div>`).join('');
}
function scPlayIdx(i){
  if(i<0||i>=scTracks.length)return;
  const track=scTracks[i];scCurrentIdx=i;isPlaying=true;
  document.getElementById('mp-title').textContent=track.title;
  document.getElementById('mp-sub').textContent=track.artist+' ✦';
  applyTrackColor(track.color);setVisualizerActive(true);
  document.getElementById('mp-play-icon').innerHTML='<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>';
  const artArea=document.getElementById('mp-art-area');
  if(!document.getElementById('mp-art-emoji')){
    artArea.innerHTML=`<div class="mp-art-glow" id="mp-art-glow"></div><div class="mp-art-icon" id="mp-art-emoji">${track.emoji}</div><div class="mp-visualizer" id="mp-visualizer">${[40,30,50,25,45,35,55,28].map(h=>`<div class="vbar on" style="height:${h}px;"></div>`).join('')}</div>`;
  }else{document.getElementById('mp-art-emoji').textContent=track.emoji;}
  applyTrackColor(track.color);setVisualizerActive(true);renderScList();
  loadScApi(()=>{
    const iframe=document.getElementById('sc-iframe');
    iframe.src='https://w.soundcloud.com/player/?url='+encodeURIComponent(track.url)+'&auto_play=true&show_artwork=false&color='+track.color.replace('#','');
    iframe.style.cssText='width:1px;height:1px;position:fixed;bottom:-200px;left:-200px;display:block;';
    scReady=false;scWidget=SC.Widget(iframe);
    scWidget.bind(SC.Widget.Events.READY,()=>{scReady=true;scWidget.play();clearInterval(progInterval);progInterval=setInterval(()=>{if(!scReady||!isPlaying)return;scWidget.getPosition(pos=>scWidget.getDuration(dur=>{if(dur>0)document.getElementById('mp-prog').style.width=(pos/dur*100)+'%';}));},800);});
    scWidget.bind(SC.Widget.Events.FINISH,()=>{if(repeat)scWidget.play();else if(scTracks.length>1)scPlayIdx((scCurrentIdx+1)%scTracks.length);else{isPlaying=false;setVisualizerActive(false);document.getElementById('mp-play-icon').innerHTML='<polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/>';}});
    scWidget.bind(SC.Widget.Events.PAUSE,()=>{isPlaying=false;setVisualizerActive(false);document.getElementById('mp-play-icon').innerHTML='<polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/>';});
    scWidget.bind(SC.Widget.Events.PLAY,()=>{isPlaying=true;setVisualizerActive(true);document.getElementById('mp-play-icon').innerHTML='<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>';});
  });
}
function scRemove(i){
  if(i===scCurrentIdx){if(scWidget){try{scWidget.pause();}catch(e){}}isPlaying=false;scCurrentIdx=-1;scReady=false;document.getElementById('mp-title').textContent='Not Playing';document.getElementById('mp-sub').textContent='Add a SoundCloud URL ✦';document.getElementById('mp-play-icon').innerHTML='<polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/>';resetTrackColor();setVisualizerActive(false);}else if(i<scCurrentIdx)scCurrentIdx--;
  scTracks.splice(i,1);renderScList();
}

function hexToRgb(hex){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return`${r},${g},${b}`;}
function applyTrackColor(color){
  const pm=document.getElementById('p-music');if(pm)pm.style.setProperty('--track-color',color);
  const glow=document.getElementById('mp-art-glow');if(glow){glow.style.background=`radial-gradient(ellipse at 50% 60%, ${color} 0%, transparent 70%)`;glow.style.opacity='0.55';}
  const card=document.getElementById('music-player-card');if(card){card.style.boxShadow=`0 0 60px rgba(${hexToRgb(color)},0.25), 0 8px 40px rgba(0,0,0,.3)`;card.style.borderColor=`rgba(${hexToRgb(color)},0.35)`;}
  const prog=document.getElementById('mp-prog');if(prog)prog.style.background=color;
  document.querySelectorAll('.vbar').forEach(b=>b.style.background=color);
}
function resetTrackColor(){
  const glow=document.getElementById('mp-art-glow');if(glow)glow.style.opacity='0';
  const card=document.getElementById('music-player-card');if(card){card.style.boxShadow='';card.style.borderColor='';}
  const prog=document.getElementById('mp-prog');if(prog)prog.style.background='var(--accent)';
  document.querySelectorAll('.vbar').forEach(b=>b.style.background='var(--accent)');
}
function setVisualizerActive(on){
  const viz=document.getElementById('mp-visualizer'),emoji=document.getElementById('mp-art-emoji');
  if(viz)viz.classList.toggle('active',on);if(emoji)emoji.classList.toggle('playing',on);
  document.querySelectorAll('.vbar').forEach(b=>{if(on)b.classList.add('on');else b.classList.remove('on');});
}

// ═══════════════════════════════════════
// POMODORO
// ═══════════════════════════════════════
const POMO_MODES={focus:25*60,short:5*60,long:15*60};
const POMO_LABELS={focus:'FOCUS',short:'SHORT BREAK',long:'LONG BREAK'};
const POMO_COLORS={focus:'var(--accent)',short:'var(--accent2)',long:'#ffd166'};
let pomoMode='focus',pomoRemaining=25*60,pomoTotal=25*60,pomoRunning=false,pomoInterval=null;
let pomoSessions=0,pomoMinutes=0,pomoStreak=0;
const CIRC=2*Math.PI*108;

function setPomoMode(mode,el){if(pomoRunning)return;pomoMode=mode;pomoRemaining=POMO_MODES[mode];pomoTotal=pomoRemaining;document.querySelectorAll('.pomo-tab').forEach(t=>t.classList.remove('active'));if(el)el.classList.add('active');document.getElementById('pomo-mode-label').textContent=POMO_LABELS[mode];document.getElementById('pomo-fill').style.stroke=POMO_COLORS[mode];updatePomoDisplay();updatePomoRing();}
function updatePomoDisplay(){const m=Math.floor(pomoRemaining/60),s=pomoRemaining%60;document.getElementById('pomo-display').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
function updatePomoRing(){const pct=pomoRemaining/pomoTotal;document.getElementById('pomo-fill').style.strokeDashoffset=CIRC*(1-pct);}
function togglePomo(){
  if(pomoRunning){clearInterval(pomoInterval);pomoRunning=false;document.getElementById('pomo-icon').innerHTML='<polygon points="5 3 19 12 5 21 5 3" fill="white"/>';}
  else{
    pomoRunning=true;document.getElementById('pomo-icon').innerHTML='<rect x="6" y="4" width="4" height="16" fill="white"/><rect x="14" y="4" width="4" height="16" fill="white"/>';
    pomoInterval=setInterval(()=>{
      if(pomoRemaining<=0){
        clearInterval(pomoInterval);pomoRunning=false;document.getElementById('pomo-icon').innerHTML='<polygon points="5 3 19 12 5 21 5 3" fill="white"/>';
        if(pomoMode==='focus'){pomoSessions++;pomoMinutes+=Math.round(pomoTotal/60);pomoStreak++;document.getElementById('pomo-stat-sessions').textContent=pomoSessions;document.getElementById('pomo-stat-mins').textContent=pomoMinutes;document.getElementById('pomo-stat-streak').textContent=pomoStreak;const dots=document.querySelectorAll('.pomo-dot');const dotIdx=(pomoSessions-1)%dots.length;dots[dotIdx].classList.add('done');updateTaskPill();}
        try{const ac=new AudioContext();const o=ac.createOscillator();const g=ac.createGain();o.connect(g);g.connect(ac.destination);o.frequency.setValueAtTime(880,ac.currentTime);o.frequency.setValueAtTime(660,ac.currentTime+0.1);g.gain.setValueAtTime(0.3,ac.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+0.5);o.start();o.stop(ac.currentTime+0.5);}catch(e){}
        return;
      }
      pomoRemaining--;updatePomoDisplay();updatePomoRing();
    },1000);
  }
}
function resetPomo(){clearInterval(pomoInterval);pomoRunning=false;pomoRemaining=pomoTotal;document.getElementById('pomo-icon').innerHTML='<polygon points="5 3 19 12 5 21 5 3" fill="white"/>';updatePomoDisplay();updatePomoRing();}
function skipPomo(){clearInterval(pomoInterval);pomoRunning=false;pomoRemaining=0;document.getElementById('pomo-icon').innerHTML='<polygon points="5 3 19 12 5 21 5 3" fill="white"/>';updatePomoDisplay();updatePomoRing();}
document.getElementById('pomo-fill').style.strokeDasharray=CIRC;
document.getElementById('pomo-fill').style.strokeDashoffset=0;

// ═══════════════════════════════════════
// SCHOOL HUB — TASKS
// ═══════════════════════════════════════
let tasks=[],activeSubj='All';
const subjColors={Math:'#ff6b6b',English:'#4ecba0',Science:'#4da6ff',History:'#ffd166',Other:'#bf55ff'};

function filterSubj(el,subj){
  activeSubj=subj;
  document.querySelectorAll('.subj-pill').forEach(p=>{p.classList.remove('active');p.style.borderColor='';p.style.color='';p.style.background='';});
  el.classList.add('active');const col=subj==='All'?'var(--accent)':subjColors[subj];
  el.style.borderColor=col;el.style.color=col;renderTasks();
}

function addTask(){
  const inp=document.getElementById('task-input');const text=inp.value.trim();if(!text)return;
  let subj='Other';const lower=text.toLowerCase();
  if(lower.includes('math')||lower.includes('calc')||lower.includes('algebra'))subj='Math';
  else if(lower.includes('english')||lower.includes('essay')||lower.includes('write'))subj='English';
  else if(lower.includes('science')||lower.includes('bio')||lower.includes('chem')||lower.includes('lab'))subj='Science';
  else if(lower.includes('history')||lower.includes('hist'))subj='History';
  if(activeSubj!=='All')subj=activeSubj;
  tasks.push({id:Date.now(),text,done:false,subj});inp.value='';renderTasks();updateTaskPill();
}

function toggleTask(id){const t=tasks.find(t=>t.id===id);if(t)t.done=!t.done;renderTasks();updateTaskPill();}
function deleteTask(id){tasks=tasks.filter(t=>t.id!==id);renderTasks();updateTaskPill();}

function renderTasks(){
  const list=document.getElementById('task-list');
  const shown=activeSubj==='All'?tasks:tasks.filter(t=>t.subj===activeSubj);
  if(!shown.length){list.innerHTML='<div style="text-align:center;color:var(--muted);font-size:12px;padding:20px 0;">No tasks yet — add one above ✦</div>';document.getElementById('task-progress').style.display='none';return;}
  document.getElementById('task-progress').style.display='block';
  list.innerHTML=shown.map(t=>`<div class="task-item ${t.done?'done':''}" onclick="toggleTask(${t.id})"><div class="task-check"><svg viewBox="0 0 12 10" fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 5 4.5 8 10.5 2"/></svg></div><div class="task-text">${t.text}</div><div class="task-subj" style="background:${subjColors[t.subj]||'var(--muted)'};">${t.subj}</div><div class="task-del" onclick="event.stopPropagation();deleteTask(${t.id})">✕</div></div>`).join('');
  const done=shown.filter(t=>t.done).length,total=shown.length,pct=Math.round(done/total*100);
  document.getElementById('tp-pct').textContent=pct+'%';
  document.getElementById('tp-fill').style.width=pct+'%';
  document.getElementById('task-badge').textContent=shown.filter(t=>!t.done).length;
}
function updateTaskPill(){
  const pending=tasks.filter(t=>!t.done).length;
  const pill=document.getElementById('task-count-pill');
  if(pill)pill.textContent=pending===0?'All done! ✦':`${pending} task${pending===1?'':'s'} due`;
}

// ═══════════════════════════════════════
// SCHOOL HUB — NOTES
// ═══════════════════════════════════════
let notes=[{id:0,title:'General Notes',content:'',html:''}],activeNoteId=0;

function addNote(){const id=Date.now();notes.push({id,title:'New Note',content:'',html:''});renderNoteTabs();switchNote(id);}
function switchNote(id){
  const cur=notes.find(n=>n.id===activeNoteId);
  if(cur){cur.html=document.getElementById('note-editor').innerHTML;cur.title=document.getElementById('note-title').value;}
  activeNoteId=id;const note=notes.find(n=>n.id===id);
  if(note){document.getElementById('note-editor').innerHTML=note.html||'';document.getElementById('note-title').value=note.title||'';updateWordCount();}
  renderNoteTabs();
}
function renderNoteTabs(){
  const container=document.getElementById('notes-tabs');
  container.innerHTML=notes.map(n=>`<div class="note-tab ${n.id===activeNoteId?'active':''}" onclick="switchNote(${n.id})"><span class="tab-name">${n.title||'Untitled'}</span>${notes.length>1?`<span class="tab-x" onclick="event.stopPropagation();deleteNote(${n.id})">✕</span>`:''}</div>`).join('')+`<div class="note-tab-add" onclick="addNote()">+ New Note</div>`;
}
function deleteNote(id){if(notes.length===1)return;notes=notes.filter(n=>n.id!==id);if(activeNoteId===id)activeNoteId=notes[0].id;switchNote(activeNoteId);}
function saveNote(){const cur=notes.find(n=>n.id===activeNoteId);if(cur){cur.html=document.getElementById('note-editor').innerHTML;cur.title=document.getElementById('note-title').value||'Untitled';}renderNoteTabs();const saved=document.getElementById('note-saved');saved.textContent='Saved ✦';setTimeout(()=>saved.textContent='',2000);}
function clearNote(){if(confirm('Clear this note?')){document.getElementById('note-editor').innerHTML='';updateWordCount();}}
function fmtNote(cmd){document.getElementById('note-editor').focus();document.execCommand(cmd,false,null);updateWordCount();}
function updateWordCount(){const text=document.getElementById('note-editor').innerText||'';const words=text.trim().split(/\s+/).filter(w=>w).length;document.getElementById('note-words').textContent=words+' word'+(words===1?'':'s');}
setTimeout(()=>{const editor=document.getElementById('note-editor');if(editor)editor.addEventListener('input',updateWordCount);},100);

// ═══════════════════════════════════════
// NOVA AI
// ═══════════════════════════════════════
let aiHistory=[];
async function sendMsg(){
  const inp=document.getElementById('ai-f'),box=document.getElementById('am-f');
  const txt=inp.value.trim();if(!txt)return;inp.value='';
  const um=document.createElement('div');um.className='msg user';um.textContent=txt;box.appendChild(um);box.scrollTop=box.scrollHeight;
  const ty=document.createElement('div');ty.className='msg bot';ty.innerHTML='<div class="typing"><span></span><span></span><span></span></div>';box.appendChild(ty);box.scrollTop=box.scrollHeight;
  aiHistory.push({role:'user',content:txt});
  document.getElementById('ai-status').textContent='● Thinking...';
  try{
    const response=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:`You are Nova, a chill and helpful AI assistant built into Nova Pulse — a personal dashboard app made by Matthew Mateos. You're smart, casual, and real. You help with school stuff (homework, notes, studying), music recs, movie recs, games, and general life questions. Keep responses concise and conversational — this is a chat UI, not an essay box. Use ✦ occasionally for personality. The user's name is ${userName||'Matthew'}.`,messages:aiHistory})});
    const data=await response.json();
    const reply=data.content?.[0]?.text||"Hmm, something went sideways. Try again ✦";
    aiHistory.push({role:'assistant',content:reply});ty.remove();
    const bm=document.createElement('div');bm.className='msg bot';bm.textContent=reply;box.appendChild(bm);box.scrollTop=box.scrollHeight;
    document.getElementById('ai-status').textContent='● Powered by Claude — always ready';
  }catch(e){
    ty.remove();const bm=document.createElement('div');bm.className='msg bot';bm.textContent="Connection issue. Check your network and try again ✦";box.appendChild(bm);box.scrollTop=box.scrollHeight;
    document.getElementById('ai-status').textContent='● Offline — check connection';
  }
}

// ═══════════════════════════════════════
// ACCOUNT ACTIONS
// ═══════════════════════════════════════
function exportData(){const data={name:userName,theme:document.documentElement.getAttribute('data-theme'),unit:uIsF?'F':'C',tasks,notes:notes.map(n=>({...n,html:'',content:document.getElementById('note-editor')?.innerText||''})),built:'Nova Pulse ✦ by Matthew Mateos'};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='nova-pulse-data.json';a.click();}
function copyLink(){navigator.clipboard?.writeText(window.location.href).then(()=>alert('Link copied ✦')).catch(()=>alert('Copy manually from the address bar'));}
function clearPrefs(){document.getElementById('nameIn').value='';userName='';liveGreet();}
function confirmReset(){if(confirm('Reset all Nova Pulse preferences?')){clearPrefs();tasks=[];renderTasks();}}
