var websites = {"www.microcenter.com":"Scrape_Microcenter", "www.93brand.com":"my 93brand function"}

async function Scrape_Microcenter(url) {
    console.log("Called the scrape microcenter function: ")
    var doc = await loadDoc(url)
    let productPrice = parseFloat(doc.getElementById('pricing').innerText.substring(1))
    console.log(productPrice)
    return productPrice
}

function loadDoc(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) { 
        return response.text();
      }
      else {
        throw Error(`Request rejected with status ${response.status}`);
      }
    })
    .then(function (html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html')
      return doc
    })
    .catch(console.error)
}


browser.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  let taburl = new URL(request.greeting)

  if (taburl.hostname in websites) {
    console.log("supported")
    var scrape_function = websites[taburl.hostname] // get the function of the current website from dict
    price = await this[scrape_function](taburl.href) // call the function
    //sendResponse({productInfo: {"price": price, "url":taburl.hostname}})
  }
  else {
      console.log("NOT SUPPORTED")
  } 
  return ({productInfo: {"price": price, "url":taburl.hostname}})      
});



// const periodInMinutes = 0.1;

// browser.alarms.create({
//   periodInMinutes
// });

// browser.alarms.onAlarm.addListener((alarm) => {
//   console.log("alarm is going off")
//   //portFromCS.postMessage({greeting: "CheckPrices"});
  
// })
