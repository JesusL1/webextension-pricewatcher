const websites = {"www.microcenter.com":"Scrape_Microcenter", "www.93brand.com":"my 93brand function"}

async function Scrape_Microcenter(url) {
    console.log("Called the scrape microcenter function: ")
    var doc = await loadDoc(url)
    let productPrice = doc.getElementById('pricing').innerText.substring(1)
    console.log("Microcenter: ", productPrice)
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
    price = parseFloat(price.replace(/[^\d\.\-]/g, "")) // remove commas from prices
    //sendResponse({productInfo: {"price": price, "url":taburl.hostname}})
  }
  else {
      console.log("NOT SUPPORTED")
  } 
  return ({productInfo: {"price": price, "url":taburl.href}})      
});


Scrape_Microcenter('https://www.microcenter.com/product/628685/asus-geforce-rtx-3090-strix-overclocked-triple-fan-24gb-gddr6x-pcie-40-graphics-card')

//localStorage.clear()


// const periodInMinutes = 0.3;

// browser.alarms.create({
//   periodInMinutes
// });


browser.alarms.onAlarm.addListener((alarm) => {
  console.log("Alarm has started...")
  Object.keys(localStorage).forEach(async function(key) {
    console.log(localStorage.getItem(key))
    let product_url = new URL(key)
    let product = JSON.parse(localStorage.getItem(key))
    let product_title = product.name
    let watch_price = product.price 
    let scrape_function = websites[product_url.hostname] // get the function of the current website from dict
    current_price = await this[scrape_function](product_url.href) // call the function

    if (current_price <= watch_price) {
      console.log("There's a discount!")
      // send out an email
      var data = {
        service_id: config.service_id,
        template_id: config.template_id,
        user_id: config.user_id,
        template_params: {
            'to_email': 'test@email.com',
            'product_title' : product_title,
            'product_price' : current_price,
            'product_url' : product_url.href,
            'watch_price' : watch_price
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

  });
})