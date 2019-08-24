

chrome.runtime.onInstalled.addListener(() => {
    console.log("installed !");
    chrome.storage.local.set({sites:["www.facebook.com","www.youtube.com"]});

});


chrome.tabs.onUpdated.addListener((id,changeInfo,tab) => {

    chrome.storage.local.get("sites",(res) => {
        blackList = res.sites;
        console.log(blackList);
        for(let site of blackList){
            if(tab.url.match(new RegExp("https?://" + site))){
                chrome.tabs.update(id,{url:"index.html"});
            }
        }
    });
    
});

chrome.runtime.onMessage.addListener((req,sender,sendResponse) => {

    if(req.text == "wake up"){
        // send black list to text area 
        chrome.storage.local.get("sites",(res) => {
            chrome.runtime.sendMessage(chrome.runtime.id,res);
        });

    }else{
        // save new black list
        chrome.storage.local.get("sites",(res) => {
            sites = req.text.split("\n");
            chrome.storage.local.set({sites});

        });
        
    }
    
});