const userEmail = localStorage.getItem('userEmail')
console.log("My EMAIL: ", userEmail)
if (userEmail !== null) 
{
    document.getElementById("current_email").innerText = userEmail
}

var form = document.getElementById("emailForm")
form.onsubmit = function() {
    var email = document.getElementById("Email").value 
    localStorage.setItem('userEmail', email)   
}