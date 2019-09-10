
//filters

function trimArray(arr){
    return arr.filter((e) => e.trim() !== "" );
}

// getter 

function getTextAreaValues(){  
    return trimArray(document.getElementById("text").value.split("\n"));
}

// validators

function textAreaIsValid(){
    const values = getTextAreaValues();
    const domainReg = /www\.[a-zA-Z0-9_-]+\.[a-z]+$/;

    return values.every((e) => e.match(domainReg));
}

function workTimeFieldIsValid(){
    const input = Number(document.getElementById("workTime").value);
    return !isNaN(input) && input > 0 && input < 1000;
}


function saveConfigs(){
    const sites = getTextAreaValues();
    const workTime = Number(document.getElementById("workTime").value);

    chrome.storage.local.set({sites});
    chrome.storage.local.set({workTime});
}

// init funcs

function initTextArea(){
    chrome.storage.local.get("sites",(res) => {
        if(res.sites.length > 0){
            document.getElementById("text").value = res.sites.join("\n");
        }
    });
}

function initWorkTimeFiled(){
    chrome.storage.local.get("workTime",(res) => {
        document.getElementById("workTime").value = res["workTime"];
    });
}


function initSaveButton(){
    document.getElementById("save").onclick = () => {
        if(!textAreaIsValid()){
            alert("Input field is malformed !");
        }else if(!workTimeFieldIsValid()){
            alert("Work time field should be a number between 1 and 999 !");
        }else{
            saveConfigs();
            alert("saved sucessfully !");
        }
    }
}


function initNavItems(){  
    document.getElementById("settingsBtn").onclick = () => changePagesStatus(true,false,false);
    document.getElementById("historyBtn").onclick = () => changePagesStatus(false,true,false);
    document.getElementById("aboutBtn").onclick = () => changePagesStatus(false,false,true);
}

function initVersionField(){
    document.getElementById("version").innerText += " " + chrome.runtime.getManifest().version;
}

function initHistoryItems(){
    chrome.storage.local.get("history",(res) => {
        const history = res.history;
        
        document.getElementById("total").innerText = history.total;
        document.getElementById("timePerDay").innerText = history.timePerDay;
        document.getElementById("timePerMonth").innerText = history.timePerMonth;
        document.getElementById("timePerWeek").innerText = history.timePerWeek;
    });

}

// utils

function changePagesStatus(settingsPageStatus,historyPageStatus,aboutPageStatus){

    const boolToVisiblity = (bool) => bool ? "block" : "none"

    document.getElementById("settings").style.display = boolToVisiblity(settingsPageStatus);
    document.getElementById("history").style.display = boolToVisiblity(historyPageStatus);
    document.getElementById("about").style.display = boolToVisiblity(aboutPageStatus);
}

// main

document.addEventListener("DOMContentLoaded",() => {
    initNavItems();
    initTextArea();
    initSaveButton();
    initWorkTimeFiled(); 
    initVersionField();
    initHistoryItems();
});

