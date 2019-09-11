
// set defaults 
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({"sites":[]});
    chrome.storage.local.set({"workTime":45});
    chrome.storage.local.set({"history":{
            fixedDate: new Date(), // used to if a week has passed or no
            total: 0,
            weeklyTotal: 0,
            month: {}
        }
    });
});


// wait for a msg from the popup
chrome.runtime.onMessage.addListener((msg) => {
    if(msg.text === "status"){
        sendTimerStatus();
    }else{
        timer[msg.text]();
    }
});


// block the new page if it's on the black list
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