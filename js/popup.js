
function sendMessage(msg){
    chrome.runtime.sendMessage({text:msg});
}

function createButton(id,value,color,onclick){
    const btn = document.createElement("button");
    btn.id = id;
    btn.innerText = value;
    btn.onclick = onclick;
    btn.style.color = color;
    btn.style.backgroundColor = "black";
    btn.style.width = "100%";

    return btn;
}

function createOnclickFunc(pauseState,resumeState,msg){
    return () => {
        const pauseBtn = document.getElementById("pause");
        const resumeBtn = document.getElementById("resume");

        pauseBtn.disabled = pauseState;
        resumeBtn.disabled = resumeState;
        sendMessage(msg);
    }
}

// create buttons

const startBtnOnclick = createOnclickFunc(false,true,"start");
const startBtn = createButton("start","start","green",startBtnOnclick);

const pauseBtnOnclick = createOnclickFunc(true,false,"pause");
const pauseBtn = createButton("pause","pause","yellow",pauseBtnOnclick);
pauseBtn.disabled = true;

const resumeBtnOnclick = createOnclickFunc(false,true,"resume");
const resumeBtn = createButton("resume","resume","white",resumeBtnOnclick);
resumeBtn.disabled = true;


// main shit
document.addEventListener("DOMContentLoaded",() => {
    // send a request to get the status of the timer 
    sendMessage("status");
    document.body.append(startBtn,pauseBtn,resumeBtn);
});

// listen for when the background scripts sends the timer' status
chrome.runtime.onMessage.addListener((msg) => {
    pauseBtn.disabled = msg.status !== "started";
    resumeBtn.disabled = !(pauseBtn.disabled);
});