
//filters

function trimArray(arr){
    return arr.filter((e) => e.trim() !== "" );
}

// getter 

function getTextAreaValues(){  
    return trimArray(document.getElementById("text").value.split("\n"));
}

// utils

function changePagesDisplay(settingsPageDisplayStatus,historyPageDisplayStatus,aboutPageDisplayStatus){
    document.getElementById("settings").style.display = settingsPageDisplayStatus;
    document.getElementById("history").style.display = historyPageDisplayStatus;
    document.getElementById("about").style.display = aboutPageDisplayStatus;
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
    document.getElementById("settingsBtn").onclick = () => changePagesDisplay("block","none","none");
    document.getElementById("historyBtn").onclick = () => changePagesDisplay("none","block","none");
    document.getElementById("aboutBtn").onclick = () => changePagesDisplay("none","none","block");
}

function initVersionField(){
    document.getElementById("version").innerText += " " + chrome.runtime.getManifest().version;
}

function initHistoryPage(){
    chrome.storage.local.get("history",(res) => {
        const history = res.history;
        const currentMonth = new Date().getMonth();
        const currentDate = new Date().getDate();
        let timePerDay = timePerMonth = 0;

        if(history.month[currentMonth] !== undefined){
            timePerDay = history.month[currentMonth][currentDate] || 0;
            timePerMonth = history.month[currentMonth].total;
        }
        
        document.getElementById("total").innerText = history.total;
        document.getElementById("timePerDay").innerText = timePerDay;
        document.getElementById("timePerMonth").innerText = timePerMonth;
        document.getElementById("timePerWeek").innerText = history.weeklyTotal;
    });

}

// main

document.addEventListener("DOMContentLoaded",() => {
    initNavItems();
    initTextArea();
    initSaveButton();
    initWorkTimeFiled(); 
    initVersionField();
    initHistoryPage();
});

