

class Timer{
    
    constructor(limit){
        if(typeof(limit) !== "number"){
            throw new Error("missing <limit> argument to the constructor ! ");
        }

        this.limit = limit; // (minute)
        this.minute = 60 * 1000; // (ms)
        this._id = undefined;
        this.status = "frozen";
    }

    _setBadgeSettings(text,color){
        chrome.browserAction.setBadgeText({text:text});
        chrome.browserAction.setBadgeBackgroundColor({color:color});
    }

    _clear(){
        clearInterval(this._id);
        this._id = undefined;
    }

    _increment(){
        if(this._time <= this.limit){
            chrome.browserAction.setBadgeText({text:(++this._time) + "m"});
        }else{
            chrome.browserAction.setBadgeText({text:null});
            this.status = "finished";
        }
    }

    start(){
        this._time = 0;
        this._clear();
        this._setBadgeSettings(this._time + "m","rgb(179, 0, 0)");
        this._id = setInterval(this._increment.bind(this),this.minute);
        this.status = "started";
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
            this._id = setInterval(this._increment.bind(this),this.minute);
            this.status = "started";
        }else{
            throw new Error("can't resume timer if it's already working !");
        }
    }
}


// main 

const timer = new Timer(60 * 60 * 1000);

chrome.runtime.onMessage.addListener((msg) => {
    timer[msg.text]();
});