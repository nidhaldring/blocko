




const req = new XMLHttpRequest();

req.open("get",chrome.runtime.getURL("js/quotes.json"));

req.onload = () =>{
    const quotes = JSON.parse(req.responseText);
    const quoteObject = quotes[Math.floor(Math.random() * quotes.length)];

    document.getElementById("quote").innerText = quoteObject.quote;
    document.getElementById("author").innerHTML = "<q>" + quoteObject.name + "</q>";
}

req.send();

