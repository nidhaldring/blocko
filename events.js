
// set defaults 
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({"sites":[]});
    chrome.storage.local.set({"workTime":45});
});

