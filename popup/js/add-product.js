var form = document.getElementById("form")
const userEmail = localStorage.getItem('userEmail')
if (userEmail === null) {
    window.location.href="setup-email.html"
}
else {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) { 
        browser.runtime.sendMessage({greeting: tabs[0].url}, function(response) {  
            if (response==="invalid") {
                document.getElementById("loading").style.display='none' 
                document.getElementById("invalidMessage").style.display='block'
                document.getElementsByClassName("container")[0].style.display='none'
            }
            else {
                document.getElementById("productName").value  = tabs[0].title.substring(0,50) // gets only first 50 char of product name
                document.getElementById("productPrice").value = response.productInfo["price"] - 1
                document.getElementById("productImage").src = response.productInfo["image"]
                document.getElementById("productURL").value = response.productInfo["url"]
                document.getElementById("loading").style.display='none' 
                document.getElementsByClassName("container")[0].style.display='block'
            }   
        })
    });
    
    form.onsubmit = function() {
        var name = document.getElementById("productName").value 
        var price = document.getElementById("productPrice").value
        var image = document.getElementById("productImage").src
        var url = document.getElementById("productURL").value
        browser.storage.sync.set({[url]: {name,price,image}})
        form.reset()
        document.getElementById("productImage").style.display='none'
    }
}
