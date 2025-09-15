// ❄️ Gelo caindo leve e performático (reutilizado em index e modelo)
(function iceFall(){
  const layer = document.getElementById('iceLayer');
  if(!layer) return;

  const COUNT = Math.min(90, Math.max(60, Math.floor(window.innerWidth/12)));
  const shards = [];

  function makeShard(){
    const d = document.createElement('div');
    d.className = 'ice-shard';
    d.style.left = (Math.random()*100) + 'vw';
    const size = 6 + Math.random()*10;
    d.style.width = size + 'px';
    d.style.height = (size*1.8) + 'px';
    d.style.opacity = 0.8 + Math.random()*0.2;
    const dur = 4 + Math.random()*4;
    d.style.animation = `shardFall ${dur}s linear`;
    d.style.transform = `rotate(${Math.random()*60 - 30}deg)`;
    layer.appendChild(d);
    shards.push(d);
    setTimeout(()=> {
      d.remove();
      const idx = shards.indexOf(d);
      if(idx>=0) shards.splice(idx,1);
    }, dur*1000 + 200);
  }

  // cria estilo se não existir
  if(!document.getElementById('icefall-style')){
    const css = document.createElement('style');
    css.id = 'icefall-style';
    css.textContent = `
      .ice-shard{
        position:fixed; top:-30px; border-radius:3px;
        background:linear-gradient(180deg,rgba(255,255,255,.95),rgba(125,211,252,.75));
        box-shadow:0 6px 14px rgba(0,0,0,.3);
        pointer-events:none; z-index:5;
      }
      @keyframes shardFall{
        to{ transform:translateY(120vh) rotate(380deg); }
      }
    `;
    document.head.appendChild(css);
  }

  // burst inicial
  for(let i=0;i<COUNT;i++){
    setTimeout(makeShard, Math.random()*1200);
  }

  // queda contínua
  setInterval(makeShard, 240);
})();
