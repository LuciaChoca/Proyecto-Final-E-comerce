(function () {
    'use strict'

    var formProfile = document.getElementById("formProfile")

    formProfile.addEventListener('submit', function (event) {
        event.preventDefault()

        if (!formProfile.checkValidity()) {
            event.stopPropagation()
        }

        formProfile.classList.add('was-validated')
        if (formProfile.checkValidity()) {
            
            guardarDatos();



        }
    }, false)
})
    ();


function guardarDatos() {
    let datos = {};
    datos.nombre = document.getElementById("nombre").value;
    datos.segundoNombre = document.getElementById("segundoNombre").value;
    datos.apellido = document.getElementById("apellido").value;
    datos.segundoApellido = document.getElementById("segundoApellido").value;
    datos.numero = document.getElementById("numero").value;

    let datosPersonaa = JSON.stringify(datos);
    localStorage.setItem("datosPerson", datosPersonaa);
    console.log(datos);

}

  