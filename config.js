
/* helpers */

function sendMessage(msg){
    chrome.runtime.sendMessage(msg);
}

function createSaveBtn(){

    btn = document.createElement("button");
    btn.onclick = () => {
        let text = document.getElementById("text").value;
        sendMessage({text});
    }
    btn.innerText = "Save";
    document.body.append(btn);
}

function initTextArea(){
    // wait for the bg script to send the black list 
    chrome.runtime.onMessage.addListener((req) => {
        document.getElementById("text").value = req.sites.join("\n");
    });
}

/***************/

// main method 
document.addEventListener("DOMContentLoaded",() => {

    createSaveBtn();

    // wake bg script
    sendMessage({text:"wake up"});

    initTextArea();
    
});
