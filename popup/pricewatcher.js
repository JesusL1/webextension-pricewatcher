document.getElementById('price').innerText = localStorage.getItem('myCat');

browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currTab = tabs[0]; // gets current tab where browser extension was clicked
    if (currTab) { 
      console.log(currTab.url)
    }
  });