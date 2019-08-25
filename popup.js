

function sendMessage(msg){
    chrome.runtime.sendMessage({text:msg});
}

function createButton(id,value,color,onclick){
    let btn = document.createElement("button");
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

const stopBtnOnclick = createOnclickFunc(true,true,"stop");
const stopBtn = createButton("stop","stop","red",stopBtnOnclick);

const pauseBtnOnclick = createOnclickFunc(true,false,"pause");
const pauseBtn = createButton("pause","pause","yellow",pauseBtnOnclick);

const resumeBtnOnclick = createOnclickFunc(false,true,"resume");
const resumeBtn = createButton("resume","resume","white",resumeBtnOnclick);


// main shit
document.addEventListener("DOMContentLoaded",() => {
    document.body.append(startBtn,stopBtn,pauseBtn,resumeBtn);
});