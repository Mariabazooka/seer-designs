(()=>{const root=document.documentElement;const saved=localStorage.getItem('seer-theme');if(saved)root.dataset.theme=saved;document.addEventListener('click',e=>{const b=e.target.closest('[data-theme-toggle]');if(b){root.dataset.theme=root.dataset.theme==='light'?'dark':'light';localStorage.setItem('seer-theme',root.dataset.theme);b.textContent=root.dataset.theme==='light'?'☾ Dark':'☼ Light';}});document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('[data-theme-toggle]').forEach(b=>b.textContent=root.dataset.theme==='light'?'☾ Dark':'☼ Light');const search=document.querySelector('[data-search]');if(search){const rows=[...document.querySelectorAll('[data-row]')];search.addEventListener('input',()=>rows.forEach(r=>r.hidden=!r.innerText.toLowerCase().includes(search.value.toLowerCase())));}document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;document.querySelectorAll('[data-row]').forEach(r=>r.hidden=(f!=='all'&&r.dataset.category!==f)||(document.querySelector('[data-search]')?.value&&!r.innerText.toLowerCase().includes(document.querySelector('[data-search]').value.toLowerCase())))}));document.querySelectorAll('[data-demo-action]').forEach(b=>b.addEventListener('click',()=>{b.textContent=b.dataset.saved==='yes'?'☆ Watch':'✓ Watching';b.dataset.saved=b.dataset.saved==='yes'?'no':'yes';}));});})();
/* Demo wallet, trade buttons and gain/loss bar colours. No real wallet is ever contacted. */
(()=>{
const ADDR='0x7a3F…9c2E';
let connected=false;
try{connected=localStorage.getItem('seer-wallet')==='1'}catch(e){}
const store=v=>{try{localStorage.setItem('seer-wallet',v?'1':'0')}catch(e){}};
const mk=(h)=>{const d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild};
const back=mk('<div class="modalback" role="dialog" aria-modal="true" aria-labelledby="wtitle"><div class="modal"></div></div>');
const toast=mk('<div class="toast" role="status"></div>');
const names=[['M','MetaMask','Browser wallet'],['W','WalletConnect','Scan with phone'],['C','Coinbase Wallet','App or extension'],['R','Rainbow','Mobile wallet']];
function say(t){toast.textContent=t;toast.classList.add('show');clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove('show'),2600)}
function paint(){
 document.querySelectorAll('[data-wallet]').forEach(b=>{
  b.classList.toggle('on',connected);
  const l=b.querySelector('[data-wallet-label]');
  l.innerHTML=connected?ADDR:'Connect<span class="wl"> wallet</span>';
 });
}
function open(){
 const m=back.firstChild;
 if(connected){
  m.innerHTML='<button class="mclose" aria-label="Close" data-close>×</button><h3 id="wtitle">Wallet connected</h3><p>Demo wallet on Gnosis Chain. Nothing is signed or sent.</p><div class="addr">'+ADDR+'</div><button class="btn" style="width:100%" data-disconnect>Disconnect</button>';
 }else{
  m.innerHTML='<button class="mclose" aria-label="Close" data-close>×</button><h3 id="wtitle">Connect a wallet</h3><p>Choose a wallet to trade on Seer.</p>'+names.map(n=>'<button class="wopt" data-pick="'+n[1]+'"><i>'+n[0]+'</i>'+n[1]+'<span>'+n[2]+'</span></button>').join('')+'<div class="note">Design concept. No real wallet is contacted and no transaction is made.</div>';
 }
 back.classList.add('open');
 const f=m.querySelector('button.wopt,button[data-disconnect]');if(f)f.focus();
}
function close(){back.classList.remove('open')}
document.addEventListener('DOMContentLoaded',()=>{
 document.body.append(back,toast);paint();
 document.addEventListener('click',e=>{
  if(e.target.closest('[data-wallet]')){open();return}
  if(e.target===back||e.target.closest('[data-close]')){close();return}
  const p=e.target.closest('[data-pick]');
  if(p){connected=true;store(true);paint();close();say('Connected to '+p.dataset.pick+' (demo)');return}
  if(e.target.closest('[data-disconnect]')){connected=false;store(false);paint();close();say('Wallet disconnected');return}
  const t=e.target.closest('[data-trade]');
  if(t){ if(!connected){open();return} say('Demo ticket: '+t.dataset.trade+' at '+t.dataset.price+'¢. No funds moved.') }
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 // colour each market bar by its 24h move: green up, red down
 document.querySelectorAll('tr[data-row]').forEach(r=>{
  const bar=r.querySelector('.bar span');if(!bar)return;
  if(r.querySelector('td.up'))bar.classList.add('g');
  else if(r.querySelector('td.negative'))bar.classList.add('r');
 });
});
})();

(()=>{document.addEventListener('click',e=>{const m=e.target.closest('[data-menu]');if(!m)return;const t=document.querySelector('.topbar');const o=t.classList.toggle('open');m.setAttribute('aria-expanded',o);m.textContent=o?'✕':'☰'})})();
