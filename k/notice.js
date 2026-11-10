// User-supplied historical submissions; not a live feed and not approval results.
(() => {
  'use strict';
  const suppliedAt = Date.parse('2026-10-29T03:52:58Z');
  const records = [['臺北市','陳*華',50,2],['高雄市','林*豪',200,4],['臺中市','黃*婷',80,5],['新北市','張*偉',150,7],['桃園市','李*傑',30,8],['臺南市','吳*玲',120,10],['新竹市','劉*宇',45,12],['彰化縣','王*志',60,14],['屏東縣','楊*雅',90,15],['苗栗縣','蔡*明',100,1]];
  const card = document.querySelector('.diamond-notice-lane .application-notice');
  const calculator = document.getElementById('calculator');
  const playback = document.getElementById('notice-playback');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const cityText = document.getElementById('notice-city');
  const nameText = document.getElementById('notice-name');
  const amountText = document.getElementById('notice-amount');
  const timeText = document.getElementById('notice-time');
  let index = 0;
  let timer;
  let paused = false;

  function ageLabel(createdAt) {
    const minutes = Math.floor((Date.now() - createdAt) / 60000);
    if (minutes < 60) return '歷史送件紀錄';
    if (minutes < 1440) return `${Math.floor(minutes / 60)} 小時前送件`;
    return `${Math.floor(minutes / 1440)} 天前送件`;
  }

  function paint() {
    const [city, name, amount, originalOffset] = records[index];
    const createdAt = suppliedAt - originalOffset * 60000;
    cityText.textContent = city;
    nameText.textContent = name;
    amountText.textContent = amount;
    timeText.textContent = ageLabel(createdAt);
    timeText.title = `${new Date(createdAt).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}，歷史送件紀錄，非核貸結果`;
  }

  function stop() { clearTimeout(timer); }
  function refresh() {
    stop();
    playback.hidden = reduced.matches;
    const label = paused ? '播放客戶動態' : '暫停客戶動態';
    playback.setAttribute('aria-label', label);
    playback.title = label;
    playback.dataset.paused = String(paused);
    card.classList.add('is-visible');
    if (calculator.hidden || document.hidden) return;
    paint();
    if (!paused && !reduced.matches) timer = setTimeout(() => {
      index = (index + 1) % records.length;
      refresh();
    }, 5500);
  }

  playback.addEventListener('click', () => { paused = !paused; refresh(); });
  document.addEventListener('visibilitychange', refresh);
  new MutationObserver(refresh).observe(calculator, { attributes: true, attributeFilter: ['hidden'] });
  reduced.addEventListener('change', refresh);
  window.addEventListener('pagehide', stop);
  window.addEventListener('pageshow', refresh);
  refresh();
})();
