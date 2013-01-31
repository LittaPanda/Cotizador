// Pop up fields validator

function validatePopup(form) {
var errors = "";

  errors += validateAlpha(form.firstName);
  errors += validateAlpha(form.lastName1);
  errors += validateAlpha(form.lastName2);
  errors += validateAlphaNumeric(form.address);
  errors += validateAlpha(form.neighborhood);
  errors += validateAlpha(form.city);
  //errors += validateState(form.state);
  errors += validateAlpha(form.country);
  errors += validateZipCode(form.zipCode);
  errors += validateEmail(form.email);
  errors += validatePhone(form.phone);
      
  if (errors != "") {
    alert(errors);
    return false;
  }
  return true;
}

function validateEmail(emailValue)
{	
	var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
	var error = "";
	if(emailValue.value.length == 0)
		error = "Se requiere llenar el campo " + emailValue.placeholder + ".\n";
	else
	{
		if(!emailreg.test(emailValue))
        error = "Por favor ingrese una dirección de correo electrónico válida.\n";
	}
	return error;
}

function validateAlpha(alphaValue)
{
	var AlphaReg = /[a-zA-Z]/;
	var error = "";
	if(alphaValue.value.length == 0)
		error = "Se requiere llenar el campo " + alphaValue.placeholder + ".\n";
	else
	{
		if(!AlphaReg.test(alphaValue))
			error = "El campo " + alphaValue.placeholder + " solo puede contener caracteres de la A a la Z y espacios en blanco.\n";
	}
	return error;
}

function validateAlphaNumeric(alphaNumericValue)
{
	var error = "";
	var AlphaNumericReg = /[a-zA-Z0-9]\s*,-/;
	if(alphaNumericValue.value.length == 0)
		error = "Se requiere llenar el campo " + alphaNumericValue.placeholder + ".\n";
	else
	{
		if(!AlphaNumericReg.test(alphaNumericValue))
			error = "El campo " + alphaNumericValue.placeholder + " no admite caracteres especiales.\n";
	}
	return error;
}

function validateState(stateValue)
{
	var error = "";
	if(stateValue.value == "Estado")
		error = "Seleccione un estado";
}

function validateZipCode(zipCodeValue)
{
	var error = "";
	var zipCodeRegex = /[0-9]/;
	if(zipCodeValue.value.length == 0)
		error = "Se requiere llenar el campo " + zipCodeValue.placeholder + ".\n";
	else
	{
		if(!AlphaNumericReg.test(zipCodeValue))
			error += "El campo " + zipCodeValue.placeholder + " sólo admite números.\n";
		else if(zipCodeValue.value.length<5 || zipCodeValue.value.length>5)
			error = "El código postal no es válido."
	}
	return error;
}

function validatePhone(phoneValue)
{
	var error = "";
	var phoneRegex = /[0-9]/;
	if(phoneValue.value.length == 0)
		error = "Se requiere llenar el campo " + phoneValue.placeholder + ".\n";
	else
	{
		if(!AlphaNumericReg.test(phoneValue))
			error += "El campo " + phoneValue.placeholder + " sólo admite números.\n";
		else if(zipCodeValue.value.length<8 || zipCodeValue.value.length>8)
			error = "El teléfono no es válido."
	}	
	return error;
}



