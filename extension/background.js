var notifications = {
  'received': 0,
  'seen': 0
};


// server communication
io.connect('http://localhost:3000')
  .on('ping', onMessage);

function onMessage() {
  notifications.received = ++notifications.received;

  if (_isPopupVisible()) {
    notifications.seen = notifications.received;
    chrome.runtime.sendMessage({ message: 'updateCount', count: notifications.received });
  } else {
    _displayActiveIcon();
    _incrementBadge();
  }
}


// communication with the popup
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "getCount")
      sendResponse({ count: notifications.received });
  });

function popupLoaded() {
  notifications.seen = notifications.received;
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
  chrome.browserAction.setBadgeText({ text: '' + ( notifications.received - notifications.seen )});
}

function _clearBadge() {
  chrome.browserAction.setBadgeText({ text: '' });
}

function _isPopupVisible() {
  var views = chrome.extension.getViews({ type: 'popup' });
  return (views.length !== 0);
}
