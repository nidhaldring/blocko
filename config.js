
function initTextArea(){
    chrome.storage.local.get("sites",(res) => {
        // if first time then leave the placeholder :)
        if(res.sites.length > 0){
            document.getElementById("text").value = res.sites.join("\n");
        }
    });
}

function initInputFiled(id){
    chrome.storage.local.get(id,(res) => {
        document.getElementById(id).value = res[id]
    });
}

document.addEventListener("DOMContentLoaded",() => {
    initTextArea();

    document.getElementById("save").onclick = () => {
        let sites = document.getElementById("text").value
        let workTime = document.getElementById("workTime").value;

        chrome.storage.local.set({"sites":sites.split("\n")});
        chrome.storage.local.set({"workTime":parseInt(workTime)});

        alert("Saved sucessfully !");
    }

    initInputFiled("workTime");

});
