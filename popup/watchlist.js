var node = document.createElement("li")
    
    Object.keys(localStorage).forEach(function(key) {
        var textnode = document.createTextNode(localStorage.getItem(key))
        node.appendChild(textnode)
        document.getElementById("listofproducts").appendChild(node)
        console.log(localStorage.getItem(key))
    });