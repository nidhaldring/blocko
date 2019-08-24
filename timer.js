
// we don't aim  to be too precise 

const minute = 60 * 1000; // (ms)

let timerId;
let time;

const incrementTimer = () => chrome.browserAction.setBadgeText({text:(time++).toString()});

function startTimer(){
    clearInterval(timerId)
    time = 0;
    incrementTimer();
    timerId = setInterval(incrementTimer,minute);

    document.getElementById("start").disabled = true;
    document.getElementById("pause").disabled = false;
    document.getElementById("resume").disabled = true;
    document.getElementById("stop").disabled = false;
}

function stopTimer(){
    clearInterval(timerId);
    timerId = undefined;
    time = 0;

    chrome.browserAction.setBadgeText({text:"--"});

    document.getElementById("start").disabled = false;
    document.getElementById("pause").disabled = true;
    document.getElementById("resume").disabled = true;
    document.getElementById("stop").disabled = true;
}

function pauseTimer(){
    clearInterval(timerId);
    timerId = undefined;

    chrome.browserAction.setBadgeText({text:"P"});

    document.getElementById("start").disabled = true;
    document.getElementById("pause").disabled = false;
    document.getElementById("resume").disabled = false;
    document.getElementById("stop").disabled = false;
}

function resumeTimer(){
    timerId = setInterval(() => chrome.browserAction.setBadgeText({text:(++time).toString()}),minute);

    document.getElementById("start").disabled = true;
    document.getElementById("pause").disabled = false;
    document.getElementById("resume").disabled = false;
    document.getElementById("stop").disabled = false;
}

// create buttons and shit
function createButton(color,name,onclickFunc){
    btn = document.createElement("button");
    btn.innerText = name;
    btn.id = name;
    btn.style.backgroundColor = color;
    btn.style.width = "100%";
    btn.onclick = onclickFunc;
    btn.style.display = "block";

    return btn;
}

document.body.append(
    createButton("green","start",startTimer),
    createButton("yellow","pause",pauseTimer),
    createButton("red","stop",stopTimer),
    createButton("blue","resume",resumeTimer),
    createButton("grey","settings",null)
);
