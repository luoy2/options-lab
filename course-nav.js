/* 左侧常驻课程目录。所有页面在 </body> 前引入：<script src="course-nav.js"></script>
   节点的定义（讲什么、前置）以 roadmap.html 的 NODES 为准；这里只记每个节点的标题和页面文件。
   文件写了但还没做出来的节点，把 file 留空，目录里显示为灰字。
   当前页的小节取自页面顶部 <nav> 里的 #锚点链接，宽屏时顶部导航隐藏，小节列在目录里。 */
(function(){
  const COURSE=[
    ['主干',[
      ['1.1','远期价格','station-1-1-forward-price.html'],
      ['1.2','波动率','station-1-2-volatility.html'],
      ['2.1','delta','station-2-1-delta.html'],
      ['2.2','gamma 与 theta','station-2-2-gamma-theta.html'],
      ['2.3','vega 与 rho','station-2-3-vega-rho.html'],
      ['2.4','组合希腊字母','station-2-4-portfolio-greeks.html'],
    ]],
    ['风险与对冲',[
      ['4.1','动态对冲','station-4-1-dynamic-hedging.html'],
      ['4.2','gamma scalping','station-4-2-gamma-scalping.html'],
      ['6','风险的动态演化','station-6-risk-dynamics.html'],
    ]],
    ['策略与组合',[
      ['3.1','价差家族','station-3-1-spreads.html'],
      ['3.2','波动率结构','station-3-2-vol-structures.html'],
      ['3.3','四象限与选择','station-3-3-four-quadrants.html'],
      ['5.1','Synthetics','station-5-1-synthetics.html'],
      ['5.2','parity 与 conversion','station-5-2-parity-conversion.html'],
      ['5.3','box · roll · collar','station-5-3-box-roll-collar.html'],
      ['9','提前行权','station-9-early-exercise.html'],
    ]],
    ['合流',[
      ['7','模型假设怎么崩','station-7-model-assumptions.html'],
      ['8','skew 与波动率曲面','station-8-skew-surface.html'],
    ]],
    ['支线',[
      ['M','做市报价',''],
      ['V','波动率合约与 VIX',''],
    ]],
  ];
  window.COURSE=COURSE;

  const here=decodeURIComponent(location.pathname.split('/').pop()||'index.html');
  const onMap = here==='roadmap.html' || here==='index.html' || here==='';
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');

  /* 当前页的小节：顶部导航里的锚点 */
  const topNav=document.querySelector('nav .navin');
  const secs=topNav?[...topNav.querySelectorAll('a[href^="#"]')].map(a=>({h:a.getAttribute('href'),t:a.textContent.trim()})):[];

  const css=`
#toc{position:fixed;left:0;top:0;bottom:0;width:15rem;z-index:60;overflow-y:auto;overscroll-behavior:contain;
  background:var(--paper);border-right:1px solid var(--rule);padding:1.1rem .75rem 2rem;
  font-family:"IBM Plex Mono","SF Mono",ui-monospace,monospace;font-size:.76rem;line-height:1.45;scrollbar-width:thin}
#toc .toc-hd{position:sticky;top:-1.1rem;z-index:1;background:var(--paper);display:flex;align-items:center;justify-content:space-between;gap:.5rem;padding:1.1rem .45rem .8rem;margin:-1.1rem 0 .4rem;border-bottom:1px solid var(--rule)}
#toc .toc-home{color:var(--ink);text-decoration:none;font-weight:600;font-size:.8rem}
#toc .toc-home:hover{color:var(--control)}
#toc .toc-home.cur{color:var(--control)}
#toc .toc-theme{background:none;border:1px solid var(--rule);color:var(--ink-faint);border-radius:99px;
  padding:.16rem .6rem;font:inherit;font-size:.7rem;cursor:pointer}
#toc .toc-theme:hover{color:var(--ink);border-color:var(--ink-faint)}
#toc .toc-g{color:var(--ink-faint);font-size:.68rem;letter-spacing:.12em;padding:1rem .45rem .3rem}
#toc a.toc-n,#toc span.toc-n{display:flex;gap:.55rem;padding:.3rem .45rem;border-radius:6px;color:var(--ink-soft);text-decoration:none}
#toc a.toc-n:hover{background:var(--panel);color:var(--ink)}
#toc .toc-n .i{min-width:1.9rem;color:var(--ink-faint)}
#toc span.toc-n{color:var(--ink-faint);opacity:.6}
#toc .toc-n.cur{background:var(--control-bg);color:var(--control);font-weight:600}
#toc .toc-n.cur .i{color:var(--control)}
#toc ol{list-style:none;margin:.2rem 0 .5rem;padding:0 0 0 1.15rem;border-left:1px solid var(--rule);margin-left:1.1rem}
#toc ol a{display:block;padding:.22rem .5rem;color:var(--ink-faint);text-decoration:none;border-radius:5px;font-size:.72rem}
#toc ol a:hover{color:var(--ink);background:var(--panel)}
#toc ol a.on{color:var(--ink);font-weight:600;background:var(--panel)}
#tocBtn{background:none;border:1px solid var(--rule);color:var(--ink-soft);border-radius:7px;padding:.22rem .6rem;
  font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:.74rem;cursor:pointer;white-space:nowrap;flex:none}
#tocBtn.float{position:fixed;left:12px;top:12px;z-index:55;background:var(--paper)}
#tocShade{position:fixed;inset:0;z-index:58;background:oklch(0 0 0 / .35);display:none}
@media (min-width:1120px){
  body{padding-left:calc(15rem + 24px)}
  body.toc-sub nav{display:none}
  #tocBtn,#tocShade{display:none!important}
  body:not(.toc-sub) #themeBtn{display:none}
  html{scroll-padding-top:1.5rem}
}
@media (max-width:1119.98px){
  #toc{transform:translateX(-102%);transition:transform .2s ease;visibility:hidden}
  body.toc-open #toc{transform:none;visibility:visible;box-shadow:0 0 24px var(--shadow)}
  body.toc-open #tocShade{display:block}
}
@media (prefers-reduced-motion:reduce){ #toc{transition:none} }
@media print{ #toc,#tocBtn,#tocShade{display:none} body{padding-left:16px} }`;
  const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  let h=`<div class="toc-hd"><a class="toc-home${onMap?' cur':''}" href="roadmap.html">课程地图</a>`+
        `<button class="toc-theme" type="button">明暗</button></div>`;
  COURSE.forEach(([g,items])=>{
    h+=`<div class="toc-g">${esc(g)}</div>`;
    items.forEach(([id,t,file])=>{
      const cur = file && file===here;
      const inner=`<span class="i">${esc(id)}</span><span>${esc(t)}</span>`;
      if(cur){
        h+=`<a class="toc-n cur" href="#top" aria-current="page">${inner}</a>`;
        if(secs.length) h+=`<ol>${secs.map(s=>`<li><a href="${s.h}">${esc(s.t)}</a></li>`).join('')}</ol>`;
      } else if(file){
        h+=`<a class="toc-n" href="${file}">${inner}</a>`;
      } else {
        h+=`<span class="toc-n">${inner}</span>`;
      }
    });
  });
  const aside=document.createElement('aside'); aside.id='toc'; aside.setAttribute('aria-label','课程目录'); aside.innerHTML=h;
  const shade=document.createElement('div'); shade.id='tocShade';
  document.body.prepend(shade); document.body.prepend(aside);
  if(!document.getElementById('top')){ const a=document.createElement('a'); a.id='top'; document.body.prepend(a); }
  if(secs.length) document.body.classList.add('toc-sub');

  /* 窄屏：抽屉按钮 */
  const btn=document.createElement('button'); btn.id='tocBtn'; btn.type='button'; btn.textContent='目录';
  btn.setAttribute('aria-controls','toc');
  if(topNav) topNav.prepend(btn); else { btn.classList.add('float'); document.body.appendChild(btn); }
  const close=()=>document.body.classList.remove('toc-open');
  btn.addEventListener('click',()=>document.body.classList.toggle('toc-open'));
  shade.addEventListener('click',close);
  addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
  aside.addEventListener('click',e=>{ if(e.target.closest('a')) close(); });

  /* 明暗：交给页面自己的按钮，页面里的画布会跟着重画 */
  aside.querySelector('.toc-theme').addEventListener('click',()=>{
    const b=document.getElementById('themeBtn');
    if(b){ b.click(); return; }
    const d=document.documentElement, dark=d.dataset.theme? d.dataset.theme==='dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    d.dataset.theme=dark?'light':'dark';
  });

  /* 当前小节高亮 */
  const links=[...aside.querySelectorAll('ol a')];
  const targets=links.map(a=>document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  if(targets.length && 'IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>{
      es.forEach(e=>{ if(e.isIntersecting){
        links.forEach(a=>a.classList.toggle('on', a.getAttribute('href').slice(1)===e.target.id));
      }});
    },{rootMargin:'-20% 0px -70% 0px'});
    targets.forEach(s=>io.observe(s));
  }
  const cur=aside.querySelector('.toc-n.cur');
  if(cur){ const ol=cur.nextElementSibling, bottom=(ol&&ol.tagName==='OL'?ol:cur).offsetTop+(ol&&ol.tagName==='OL'?ol:cur).offsetHeight;
    if(bottom>aside.clientHeight-24) aside.scrollTop=cur.offsetTop-90; }
})();
