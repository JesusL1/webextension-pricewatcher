browser.tabs.query({active: true, currentWindow: true}, function(tabs) {

    browser.tabs.sendMessage(tabs[0].id, {greeting: "hello i'm from pw.js"}, function(response) {
        document.getElementById("productName").value = response.farewell["name"]
        document.getElementById('productPrice').value = response.farewell["price"]
        document.getElementById("productURL").value = response.farewell["url"]
    })

    // var currTab = tabs[0]; // gets current tab where browser extension was clicked
    // if (currTab) { 
    //     var url = new URL(currTab.url)
    //     if (url.hostname in websites) { 
    //         document.getElementById('productName').innerText = currTab.title
    //         document.getElementById('productURL').innerText = url.href
    //         var scrape_function = websites[url.hostname] // get the function of the current website from dict
           

    //         //window[scrape_function]() // call the function
    //     }
    //     else {
    //         console.log("This website can't be scraped!")
    //     }
    // }
  });

  // document.getElementById('productPrice').innerText = localStorage.getItem('myCat');