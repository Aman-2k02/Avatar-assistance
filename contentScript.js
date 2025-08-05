// Inject CSS for widget
const style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.runtime.getURL('widget.css');
document.head.appendChild(style);

// Inject widget root
if (!document.getElementById('hologram-widget-root')) {
  const widgetRoot = document.createElement('div');
  widgetRoot.id = 'hologram-widget-root';
  document.body.appendChild(widgetRoot);

  // Add draggable header
  const header = document.createElement('div');
  header.id = 'hologram-widget-header';
  header.innerText = 'AI Avatar Assistant';
  widgetRoot.appendChild(header);

  // Inject the React app as an iframe
  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL('index.html');
  iframe.style.width = '100%';
  iframe.style.height = 'calc(100% - 36px)';
  iframe.style.minHeight = '564px';
  iframe.style.minWidth = '400px';
  iframe.style.border = 'none';
  iframe.style.background = 'transparent';
  iframe.allow = 'microphone;';
  widgetRoot.appendChild(iframe);

  // Drag logic
  let isDragging = false, startX, startY, startLeft, startTop;
  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = widgetRoot.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    widgetRoot.style.left = (startLeft + dx) + 'px';
    widgetRoot.style.top = (startTop + dy) + 'px';
    widgetRoot.style.right = 'auto';
    widgetRoot.style.bottom = 'auto';
    widgetRoot.style.position = 'fixed';
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
  });
}