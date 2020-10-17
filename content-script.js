console.log("CONTENT SCRIPT STARTED")

var websites = {"www.microcenter.com":"Scrape_Microcenter", "www.93brand.com":"my 93brand function"}

function Scrape_Microcenter() {
    console.log("Called the scrape microcenter function: ")
    let productPrice = parseFloat(document.getElementById('pricing').innerText.substring(1))
    return productPrice
    //console.log(productPrice) 
}

browser.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if (window.location.hostname in websites) {
            console.log("supported")
            var scrape_function = websites[window.location.hostname] // get the function of the current website from dict
            price = this[scrape_function]() // call the function
            sendResponse({productInfo: {"name":document.title, "price": price, "url":window.location.href}})
            browser.runtime.sendMessage({greeting: "greeting from content-script"})
        }
        else {
            console.log("NOT SUPPORTED")
        }

        // if (request.greeting == "hello i'm from pw.js")
        //     sendResponse({farewell: window.location.href});
});


