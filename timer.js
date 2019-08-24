

class Timer{

    constructor(limit){
        this.limit = limit;
        this.minute = 60 * 1000; // (ms)
        this._id = undefined;
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
        chrome.browserAction.setBadgeText({text:(++this._time) + "m"});
    }

    start(){
        this._time = 0;
        this._setBadgeSettings(this._time + "m","green");
        this._id = setInterval(this._increment.bind(this),this.minute) ;
    }

    stop(){
        this._time = 0;
        this._clear();
        this._setBadgeSettings("X","red");
    }

    pause(){
        this._setBadgeSettings("P","yellow");
        this._clear();
    }

    resume(){
        this._setBadgeSettings(this._time + "m","green");
        this._id = setInterval(this._increment,this.minute);
    }
}