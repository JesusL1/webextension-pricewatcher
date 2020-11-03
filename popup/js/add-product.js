const userEmail = localStorage.getItem('userEmail')
if (userEmail === null) {
    window.location.href="setup-email.html"
}
else {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) { 
        browser.runtime.sendMessage({greeting: tabs[0].url}, function(response) {
            document.getElementById("productName").value  = tabs[0].title
            document.getElementById("productPrice").value = response.productInfo["price"]
            document.getElementById("productURL").value = response.productInfo["url"]
        })
    });
    
    var form = document.getElementById("form")
    form.onsubmit = function() {
        var name = document.getElementById("productName").value 
        var price = document.getElementById("productPrice").value
        var url = document.getElementById("productURL").value
        browser.storage.sync.set({[url]: {name,price}})
    }
}
