function getLoadingTempl() {
  return '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
    '     width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">\n' +
    '  <path fill="#888" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">\n' +
    '    <animateTransform attributeType="xml"\n' +
    '      attributeName="transform"\n' +
    '      type="rotate"\n' +
    '      from="0 25 25"\n' +
    '      to="360 25 25"\n' +
    '      dur="0.6s"\n' +
    '      repeatCount="indefinite"/>\n' +
    '    </path>\n' +
    '  </svg>';
}

function refreshLoading(el, binding) {
  const child = el.querySelector('.zk-loading');
  if (binding.value && !child) {
    const child = document.createElement('div');
    child.className = 'zk-loading text-center';
    child.innerHTML = getLoadingTempl();
    const modifiers = binding.modifiers;
    if (modifiers && modifiers.before && el.childNodes.length) {
      el.insertBefore(child, el.childNodes[0]);
    } else {
      el.appendChild(child);
    }
  } else if (!binding.value && child) {
    const child = el.querySelector('.zk-loading');
    if (child) {
      el.removeChild(child);
    }
  }
}

export default {
  bind(el, binding) {
    refreshLoading(el, binding);
  },
  update(el, binding) {
    refreshLoading(el, binding);
  },
  componentUpdated(el, binding) {
    refreshLoading(el, binding);
  },
};
