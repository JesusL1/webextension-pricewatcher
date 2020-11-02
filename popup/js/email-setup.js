var form = document.getElementById("form")
form.onsubmit = function() {
    var email = document.getElementById("Email").value 
    localStorage.setItem('userEmail', email)   
}