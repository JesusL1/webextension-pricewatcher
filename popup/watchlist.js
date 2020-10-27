var node = document.createElement("li")

browser.storage.sync.get().then((watchlist => {
    for (var key in watchlist) { 
      var product = watchlist[key]
      var textnode = document.createTextNode(product.name)
      node.appendChild(textnode)
      document.getElementById("listofproducts").appendChild(node)
      textnode = document.createTextNode(product.price)
      node.appendChild(textnode)
      document.getElementById("listofproducts").appendChild(node)
    }
  }))