function updateMessageCount(socketMessages, sseMessages) {
  if (socketMessages)
    document.getElementById('socketIOMessages').innerText = '' + socketMessages;
  if (sseMessages)
    document.getElementById('sseMessages').innerText = '' + sseMessages;
}

chrome.extension.getBackgroundPage().popupLoaded();

chrome.runtime.sendMessage({ message: "getCount" }, function(response) {
  updateMessageCount(response.socketcount, response.ssecount);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == 'updateCount')
      if (request.type == 'socket')
        updateMessageCount(request.count);
      else
        updateMessageCount(null ,request.count);
});