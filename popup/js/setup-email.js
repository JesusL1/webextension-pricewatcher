const userEmail = localStorage.getItem('userEmail')
if (userEmail !== null) 
{
    document.getElementById("current_email").innerText = userEmail
}

var form = document.getElementById("emailForm")
form.onsubmit = function() {
    var email = document.getElementById("Email").value 
    localStorage.setItem('userEmail', email)   
}

// var gettingItem = browser.storage.sync.getBytesInUse();
// gettingItem.then((res) => {
//     console.log(res);
// });

