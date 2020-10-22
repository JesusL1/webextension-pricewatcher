browser.tabs.query({active: true, currentWindow: true}, function(tabs) { 
    browser.runtime.sendMessage({greeting: tabs[0].url}, function(response) {
        console.log("pricewatcher.js response: ", response)
        document.getElementById("productName").value  = tabs[0].title
        document.getElementById("productPrice").value = response.productInfo["price"]
        document.getElementById("productURL").value = response.productInfo["url"]
    })
});


var form = document.getElementById("form")
form.onsubmit = function() {
    var productName = document.getElementById("productName").value 
    var productPrice = document.getElementById("productPrice").value
    var productURL = document.getElementById("productURL").value
    localStorage.setItem(productURL, JSON.stringify([productName, productPrice]))
    var arr = JSON.parse(localStorage.getItem(productURL))
    console.log(arr)
    //alert("The form was submitted: " + productName)
}
