

class Timer{

    static MINUTE = 60 * 1000 // (ms)

    constructor(){
        this._id = undefined;
        this.status = "frozen";
        this._setBadgeSettings("--","red");
    }

    _setBadgeSettings(text,color){
        chrome.browserAction.setBadgeText({text:text});
        chrome.browserAction.setBadgeBackgroundColor({color:color});
    }

    _clear(){
        clearInterval(this._id);
        this._id = undefined;
    }

    _ring(){
        new Audio(chrome.runtime.getURL("audio/horn.mp3")).play();
    }

    _finish(){
        chrome.browserAction.setBadgeText({text:'DONE'});
        this.status = "finished";
        this._ring();
        this._clear();
    }

    _increment(){
        if(this._time + 1 < this.limit){
            chrome.browserAction.setBadgeText({text:(++this._time) + "m"});
        }else{
            this._finish()
        }
    }

    start(){
        chrome.storage.local.get("workTime",(res) => {
            this._time = 0;
            this.limit = res.workTime;
            this.status = "started";

            this._clear();
            this._setBadgeSettings(this._time + "m","green");
            this._id = setInterval(this._increment.bind(this),Timer.MINUTE);
            
        });
    }

    stop(){
        if(this.status !== "stopped"){
            this._time = 0;
            this._clear();
            this._setBadgeSettings("X","red");
            this.status = "stopped";
        }
    }

    pause(){
        if(this.status !== "stopped"){
            this._setBadgeSettings("P","yellow");
            this._clear();
            this.status = "paused";
        }else{
            throw new Error("can't pause timer if it's not running !");
        }
    }

    resume(){
        if(this.status === "paused"){
            this._setBadgeSettings(this._time + "m","green");
            this._id = setInterval(this._increment.bind(this),Timer.MINUTE);
            this.status = "started";
        }else{
            throw new Error("can't resume timer if it's already working !");
        }
    }
}


// main 

const timer = new Timer();

chrome.runtime.onMessage.addListener((msg) => {
    timer[msg.text]();
});