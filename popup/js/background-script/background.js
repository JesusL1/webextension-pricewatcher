const websites = {"93brand.com":"Scrape_93Brand", "bananarepublic.gap.com":"Scrape_Bananarepublic", "www.microcenter.com":"Scrape_Microcenter"}
var productDict = {"productPrice": null, "productImage": null}

async function Scrape_93Brand(url) {
  var doc = await loadDoc(url)
  let productPrice = doc.getElementById("ProductPrice-product-template").innerText.substring(1)
  productDict["productPrice"] = productPrice
  productImage = doc.getElementsByTagName("img")[2].src.replace("moz-extension", "https") // need to replace moz-extension with https in url
  productDict["productImage"] = productImage
  return productDict
}

async function Scrape_Bananarepublic(url) {
  console.log("bananna")
  var doc = await loadDoc(url)
  let productPrice = doc.getElementsByClassName("pdp-pricing__selected")[0].innerText.substring(1)
  console.log(productPrice)
  productDict["productPrice"] = productPrice
  productImage = doc.getElementsByClassName("hover-zoom")[0].href.replace("moz-extension://a2752f62-c2d4-455c-a886-09f24cbad882", "https://bananarepublic.gap.com") // need to replace moz-extension with https in url
  productDict["productImage"] = productImage
  return productDict
}

async function Scrape_Microcenter(url) {
    var doc = await loadDoc(url)
    let productPrice = doc.getElementById('pricing').innerText.substring(1)
    productDict["productPrice"] = productPrice
    productImage = doc.getElementsByClassName("productImageZoom")[0].src
    productDict["productImage"] = productImage
    return productDict
}



browser.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  let taburl = new URL(request.greeting)

  if (taburl.hostname in websites) {
    console.log("website supported.")
    var scrape_function = websites[taburl.hostname] // get the function of the current website from dict
    productDict = await this[scrape_function](taburl.href) // call the function
    price = productDict["productPrice"]
    price = parseFloat(price.replace(/[^\d\.\-]/g, "")) // remove commas from prices
    image = productDict["productImage"]
  }
  else {
      return ("invalid")
  } 
  return ({productInfo: {"price": price, "image": image, "url":taburl.href, "domain":taburl.host}})      
});


//browser.storage.sync.clear()

// const periodInMinutes = 0.3;

// browser.alarms.create({
//   periodInMinutes
// });


browser.alarms.onAlarm.addListener((alarm) => {
  console.log("Alarm has started...")
  browser.storage.sync.get().then((async watchlist => {
    for (var key in watchlist) { 
      let product = watchlist[key]
      let product_url = new URL(key)
      let scrape_function = websites[product_url.hostname] // get the function of the current website from dict
      product_price = await this[scrape_function](product_url.href) // call the function

      if (product_price <= product.notifyPrice) {
        console.log("There's a discount!")
        SendEmail(product.name, product_price, product_url, product_price)
      }
    }
  }))
})

function SendEmail(product_name, product_price, product_url, sale_price) {
  var data = {
    service_id: config.service_id,
    template_id: config.template_id,
    user_id: config.user_id,
    template_params: {
        'to_email': localStorage.get('userEmail'),
        'product_name' : product_name,
        'product_price' : product_price,
        'product_url' : product_url.href,
        'sale_price' : sale_price
    }
  };
  $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json'
  }).done(function() {
    console.log('Your mail is sent!');
  }).fail(function(error) {
    console.log('Oops... ' + JSON.stringify(error));
  });
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