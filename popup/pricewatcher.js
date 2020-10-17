var form = document.getElementById("form")
form.onsubmit = function() {
    alert("The form was submitted")
}

browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    
    browser.tabs.sendMessage(tabs[0].id, {greeting: "hello i'm from pw.js"}, function(response) {
        document.getElementById("productName").value = response.productInfo["name"]
        document.getElementById('productPrice').value = response.productInfo["price"]
        document.getElementById("productURL").value = response.productInfo["url"]
    })

  });
