function updateMessageCount(count) {
  document.getElementById('socketIOMessages').innerText = '' + count;
}

chrome.extension.getBackgroundPage().popupLoaded();

chrome.runtime.sendMessage({ message: "getCount" }, function(response) {
  updateMessageCount(response.count);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == 'updateCount')
      updateMessageCount(request.count);
});