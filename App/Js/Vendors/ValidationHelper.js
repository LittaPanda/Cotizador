// Pop up fields validator
var errors = [];

function validateEmail(emailValue)
{	
	var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
	if (!emailreg.test(emailValue)) {
        errors += "Por favor ingrese una dirección de correo electrónico válida.";
		alert(errors);
    }
}

function validateFullName(firstNameValue, lastName1Value, lastName2Value)
{
	var nameReg = /^[a-zA-Z]+$/;
	//var firstNameValue = form.firstName.value;
	//var lastName1Value = form.firstName1.value;
	//var lastName2Value = form.firstName2.value;
	if(!nameReg.test(firstNameValue)){
		errors += "El campo " + firstNameValue.placeholder + " solo puede contener caracteres de la A a la Z.";
		alert(errors);
	}
}