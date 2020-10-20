browser.tabs.query({active: true, currentWindow: true}, function(tabs) { 
    browser.tabs.sendMessage(tabs[0].id, {greeting: "i'm a message from page-script"}, function(response) {
        document.getElementById("productName").value  = response.productInfo["name"]
        document.getElementById("productPrice").value = response.productInfo["price"]
        document.getElementById("productURL").value = response.productInfo["url"]
    })
});


var form = document.getElementById("form")
form.onsubmit = function(event) {
    event.preventDefault()
    var productName = document.getElementById("productName").value 
    var productPrice = document.getElementById("productPrice").value
    var productURL = document.getElementById("productURL").value
    localStorage.setItem(productURL, JSON.stringify([productName, productPrice]))
    var arr = JSON.parse(localStorage.getItem(productURL))
    console.log(arr)
    location.replace("/popup/watchlist.html")
   
    //alert("The form was submitted: " + productName)
    
}