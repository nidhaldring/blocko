
//filters

function filterTextAreaValues(values){
    return values.filter((e) => e.trim() !== "" );
}

// getter 

function getTextAreaValues(){  
    return filterTextAreaValues(document.getElementById("text").value.split("\n"));
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


// init funcs

function initTextArea(){
    chrome.storage.local.get("sites",(res) => {
        const textArea =  document.getElementById("text");

        if(res.sites.length > 0){
           textArea.value = res.sites.join("\n");
        }

    });
}

function initWorkTimeFiled(){
    chrome.storage.local.get("workTime",(res) => {
        document.getElementById("workTime").value = res["workTime"];
    });
}

function saveConfigs(){
    const sites = getTextAreaValues();
    const workTime = Number(document.getElementById("workTime").value);

    chrome.storage.local.set({sites});
    chrome.storage.local.set({workTime});
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

// main

document.addEventListener("DOMContentLoaded",() => {
    initTextArea();
    initSaveButton();
    initWorkTimeFiled();

});
