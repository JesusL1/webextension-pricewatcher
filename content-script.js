console.log("CONTENT SCRIPT STARTED")

var websites = ["www.microcenter.com", "93brand"]

if (websites.includes(window.location.hostname)) {
    console.log("THIS IS A VALID WEBSITE")
}
else{
    console.log("NOT A VALID WEBSITE")
}



function Scrape_Microcenter() {
    let price = parseFloat(document.getElementById('pricing').innerText.substring(1))
    console.log(price)
}

// // Scrape_Microcenter()

// console.log(window.location.href)
// console.log(window.location.hostname)
