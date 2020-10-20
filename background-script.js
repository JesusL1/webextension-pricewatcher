//localStorage.setItem('myCat', 'Tom');

function handleMessage(request, sender, sendResponse) {
    console.log("Message from content script: " + request.greeting);
    sendResponse({response: "Response from background script"});
  }
  
browser.runtime.onMessage.addListener(handleMessage)

// const periodInMinutes = 0.1;

// browser.alarms.create({
//   periodInMinutes
// });

browser.alarms.onAlarm.addListener((alarm) => {
  console.log("alarm is going off")
})

function loadXMLDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        parser = new DOMParser()
        doc = parser.parseFromString(this.responseText, "text/html")
        console.log(doc)
          //console.log(this.responseText)
        // document.getElementById("demo").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "https://www.microcenter.com/product/608318/amd-ryzen-7-3700x-matisse-36ghz-8-core-am4-boxed-processor-with-wraith-prism-cooler", true);
    xhttp.send();
}

loadXMLDoc()

