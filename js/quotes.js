
function createQuote(){
    const req = new XMLHttpRequest();

    req.open("get",chrome.runtime.getURL("js/quotes.json"));

    req.onload = () =>{
        const quotes = JSON.parse(req.responseText);
        const quoteObject = quotes[Math.floor(Math.random() * quotes.length)];

        document.getElementById("quote").innerText = quoteObject.quote;
        document.getElementById("author").innerHTML = "<q>" + quoteObject.name + "</q>";
    }

    req.send();
}

function createBackground(){
    const backgroundsNumber = 1;
    const backgroundName = "background" + Math.ceil(Math.random() * backgroundsNumber) + ".jpg";

    document.body.style.backgroundImage = `url('../backgrounds/${backgroundName}')`;
}

// main 
createBackground();
createQuote();


