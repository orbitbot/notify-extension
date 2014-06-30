var notifications = {
  socket: {
    'received': 0,
    'seen': 0
  },
  sse: {
    'received': 0,
    'seen': 0
  }
};


// server communication
io.connect('http://localhost:3000')
  .on('ping', function() { onMessage('socket'); });

var source = new EventSource('http://localhost:8080/sse');
source.addEventListener('ping', function() { onMessage('sse'); }, false);

function onMessage(type) {
  notifications[type].received = ++notifications[type].received;

  if (_isPopupVisible()) {
    notifications[type].seen = notifications[type].received;
    chrome.runtime.sendMessage({ message: 'updateCount', type: type, count: notifications[type].received });
  } else {
    _displayActiveIcon();
    _incrementBadge();
  }
}


// communication with the popup
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "getCount")
      sendResponse({ socketcount: notifications.socket.received,
                     ssecount: notifications.sse.received });
  });

function popupLoaded() {
  notifications.socket.seen = notifications.socket.received;
  notifications.sse.seen = notifications.sse.received;
  _clearBadge();
  _displayInactiveIcon();
}


// helper functions
function _displayActiveIcon() {
  chrome.browserAction.setIcon({ path: 'icons/icon_active.png' });
}

function _displayInactiveIcon() {
  chrome.browserAction.setIcon({ path: 'icons/icon_inactive.png' });
}

function _incrementBadge() {
  chrome.browserAction.setBadgeText({ text: '' + ( notifications.socket.received - notifications.socket.seen + notifications.sse.received - notifications.sse.seen )});
}

function _clearBadge() {
  chrome.browserAction.setBadgeText({ text: '' });
}

function _isPopupVisible() {
  var views = chrome.extension.getViews({ type: 'popup' });
  return (views.length !== 0);
}
