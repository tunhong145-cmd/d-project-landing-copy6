/* Presentation only: the existing K calculator owns the selected period and all math. */
(() => {
  'use strict';
  const toggle = document.getElementById('more-terms');
  const extras = document.getElementById('extra-terms');
  const toggleLabel = document.getElementById('more-terms-label');
  const selection = document.getElementById('selected-term');

  function paint() {
    const button = document.querySelector('[data-term].selected');
    const term = button ? button.dataset.term : '60';
    const extended = !!button && extras.contains(button);
    selection.textContent = `${term} 期`;
    toggle.classList.toggle('has-selection', extended);
    toggleLabel.textContent = extended && extras.hidden ? `${term}期` : (extras.hidden ? '更多期數' : '收合期數');
    toggle.setAttribute('aria-label', extended && extras.hidden ? `更多期數，目前選擇 ${term} 期` : toggleLabel.textContent);
  }

  toggle.addEventListener('click', () => {
    extras.hidden = !extras.hidden;
    toggle.setAttribute('aria-expanded', String(!extras.hidden));
    paint();
  });
  for (const button of document.querySelectorAll('[data-term]')) button.addEventListener('click', paint);
  paint();
})();
