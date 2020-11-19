var watchlistDiv = document.getElementById("watchProductContainer")

browser.storage.sync.get().then((watchlist => {
    for (var key in watchlist) { 
      var product = watchlist[key]

      var link = document.createElement("a")
      link.classList.add("pURL")
      link.href = key

      var watchProduct = document.createElement("div")
      watchProduct.classList.add("watchProduct")

      var pName = document.createElement("p")
      pName.classList.add("pName")
      pName.innerText = product.name

      var pWebsite = document.createElement("p")
      pWebsite.classList.add("pDomain")
      pWebsite.innerText = product.domain 

      var span = document.createElement("span")
      span.classList.add("pCurrent")
      span.innerText = " - $" + product.currentPrice
      pName.appendChild(span)

      var pNotify = document.createElement("p")
      pNotify.classList.add("pNotify")
      pNotify.innerText = "Notify Price: $" + product.notifyPrice

      var pImage = document.createElement("img")
      pImage.classList.add("pImage", "hvr-grow")
      pImage.src = product.image

      var removeForm = document.createElement("form")
      removeForm.method = "POST"
      removeForm.addEventListener('submit', RemoveProduct)

      var removeInput = document.createElement("input")
      removeInput.classList.add("pRemove", "btn", "btn-outline-danger", "btn-sm")
      removeInput.type="submit"
      removeInput.value="Remove"
      removeForm.id = key

      watchProduct.append(pName)
      watchProduct.append(pNotify)
      watchProduct.append(pWebsite)
      watchProduct.append(pImage)
      removeForm.appendChild(removeInput)
      watchProduct.append(removeForm)
      link.appendChild(watchProduct)
      watchlistDiv.append(link)
    }
  }))

  function RemoveProduct() {
    console.log('Removing:', this.id)
    browser.storage.sync.remove(this.id)
  }