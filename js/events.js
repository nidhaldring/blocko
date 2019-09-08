
// set defaults 
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({"sites":[]});
    chrome.storage.local.set({"workTime":45});
});


chrome.runtime.onMessage.addListener((msg) => {
    if(msg.text === "status"){
        sendTimerStatus();
    }else{
        timer[msg.text]();
    }
});


chrome.tabs.onUpdated.addListener((tabId,_,tab) => {
    if(timer.status == "started"){
        chrome.storage.local.get("sites",(res) => {
            const url = tab.url;
            const found = res.sites.find((e) => url.match(new RegExp(`https?://${e}`)) !== null);
           
            if(found !== undefined){
                chrome.tabs.update(tabId,{url:chrome.runtime.getURL("html/blockPage.html")});
            } 
        });
    }
});