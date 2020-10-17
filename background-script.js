//localStorage.setItem('myCat', 'Tom');

function handleMessage(request, sender, sendResponse) {
    console.log("Message from content script: " + request.greeting);
    sendResponse({response: "Response from background script"});
  }
  
browser.runtime.onMessage.addListener(handleMessage)


function loadXMLDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          //console.log(this.responseText)
        // document.getElementById("demo").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "https://stackoverflow.com", true);
    xhttp.send();
}

// loadXMLDoc()