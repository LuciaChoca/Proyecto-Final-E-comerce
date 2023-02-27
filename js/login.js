let email = document.getElementById("email")
let pass = document.getElementById("pass")
let button = document.getElementById("logBtn")
let usuarios = [];
function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}
function validaDatos(){
    return email.value.length > 0 && pass.value.length > 0 
}  

function redirection () {
return location.href = "entrada.html";
}  


button.addEventListener("click", e =>
{
    if (validaDatos()) {
        usuarios= email.value;
        localStorage.setItem("usuario", usuarios);
        console.log(usuarios);
        debugger;
        redirection();
    } else {
        showAlertError();
    }

   
} )


