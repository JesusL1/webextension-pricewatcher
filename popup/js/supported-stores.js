var container = document.getElementsByClassName("secondaryContainer")[0]

for (var i = 0; i < localStorage.length; i++){

    // only get the store names from localstorage 
    if (localStorage.getItem(localStorage.key(i)) === 'store')
    {
        //console.log(localStorage.key(i))
        var storeContainer = document.createElement("div")
        storeContainer.classList.add("storeContainer")

        var storeLink = document.createElement("a")
        var https = "https://"
        storeLink.href = https + localStorage.key(i)

        var storeName = document.createElement("p")
        storeName.classList.add("storeName")
        storeName.innerText = localStorage.key(i)
        
        storeContainer.append(storeName)
        storeLink.appendChild(storeContainer)
        container.append(storeLink)
    }
}
