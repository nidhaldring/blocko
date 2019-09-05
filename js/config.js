
function validateTextAreaInput(textArea){

    const values = textArea.value.split("\n");
    const domainReg = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$/;
    const test = values.every((e) => e.match(domainReg));

    if(!test){
        textArea.focus();
        alert("invalid input");
    }   
}

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

function initSaveButton(){
    document.getElementById("save").onclick = () => {
        const sites = document.getElementById("text").value
        const workTime = document.getElementById("workTime").value;

        chrome.storage.local.set({"sites":sites.split("\n")});
        chrome.storage.local.set({"workTime":parseInt(workTime)});

        alert("Saved sucessfully !");
    }
}

// main
document.addEventListener("DOMContentLoaded",() => {
    initTextArea();
    initSaveButton();
    initWorkTimeFiled();

});
