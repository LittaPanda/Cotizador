// Pop up fields validator

var AlphaReg = /^[\sa-zA-ZÁáÉéÍíÓóÚú]+$/;
var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
var AlphaNumericReg = /^[\sa-zA-Z0-9ÁáÉéÍíÓóÚú.#]+$/;
var numericRegex = /^[0-9]+$/;
//var rfcReg = /^([A-Z\\s]{3,4})(\\d{2}(0[1-9]{1}|1[0-2]{1})(0{1}[1-9]|[1-2]{1}[0-9]{1}|3{1}[0-1]{1}))([A-Z\\w]{3})+$/;
var rfcReg = /^(([A-Z]){3,4})(\d{2}(0[1-9]{1}|1[0-2]{1})(0{1}[1-9]|[1-2]{1}[0-9]{1}|3{1}[0-1]{1}))((([A-Z]|[0-9]){3}))/;

var firstnamePH = "Nombre"; var lastname1PH = "Apellido Paterno"; var lastname2PH = "Apellido Materno"; var addressPH = "Calle"; var neighborhoodPH = "Colonia"; var cityPH = "Ciudad"; var statePH = "Estado"; var countryPH = "País"; var zipcodePH = "Código postal"; var rfcPH = "RFC"; var phonePH = "Teléfono"; var emailPH = "Correo electrónico"; 

function validatePopup(form) {
  var FirstName = validateName(form.firstName, firstnamePH);
  var LastName1 = validateName(form.lastName1, lastname1PH);
  var LastName2 = validateName(form.lastName2,lastname2PH);
  var Address = validateAlphaNumeric(form.address);
  var Neighborhood = validateAlpha(form.neighborhood, neighborhoodPH);
  var City = validateAlpha(form.city, cityPH);
  //var State = validateState(form.stateSelector);
  var Country = validateAlpha(form.country, countryPH);
  var ZipCode = validateZipCode(form.zipCode, zipcodePH);
  var Email = validateEmail(form.email, emailPH);
  var Phone = validatePhone(form.phone, phonePH);
  var RFC = validateRFC(form.rfc, rfcPH);
      
  if (FirstName||LastName1||LastName2||Email||Phone||RFC) {
    return false;
  }
  return true;
}

function validateEmail(emailValue, PlaceHolder)
{	
	var error = false;
	var id = emailValue.id;
	if(emailValue.value.length == 0){
		error = true;
		emailValue.placeholder = "";
		emailValue.placeholder = "Se requiere llenar el campo " + PlaceHolder;
	}
	else{
		if(!(emailValue.value.match(emailreg))){
			error = true;
			emailValue.value = "";
			emailValue.placeholder = "";
        	emailValue.placeholder ="Ingrese una dirección de correo electrónico válida";
		}
	}
	if(error == true)
		$('#' + id ).addClass("error");
	return error;
}

function validateName(alphaValue, PlaceHolder){
	var error = false;
	var id = alphaValue.id;
	if(alphaValue.value.length == 0){
		error = true;
		alphaValue.placeholder = "";
		alphaValue.placeholder = "Se requiere llenar el campo " + PlaceHolder;	
	}
	else{
		if(!(alphaValue.value.match(AlphaReg))){
			error = true;
			alphaValue.value = "";
			alphaValue.placeholder = "";
			alphaValue.placeholder = "El campo " + PlaceHolder + " sólo permite caracteres de la A a la Z y espacios";
		}
	}
	if(error == true)
		$('#' + id ).addClass("error");
	return error;
}

function validateAlpha(alphaValue, PlaceHolder){
	var error = false;
	var id = alphaValue.id;
	if(alphaValue.value.length == 0){}
	else{
	  if(!(alphaValue.value.match(AlphaReg))){
		  error = true;
		  alphaValue = "";
		  alphaValue.placeholder = "";
		  alphaValue.placeholder = "El campo " + PlaceHolder + " sólo permite caracteres de la A a la Z y espacios";
		  $('#' + id ).addClass("error");
	  }
	}
	return error;
}

function validateAlphaNumeric(alphaNumericValue, PlaceHolder)
{
	var error = false;
	var id = alphaNumericValue.id;
	if(alphaNumericValue.value.length == 0){}
	else{
	  if(!(alphaNumericValue.value.match(AlphaNumericReg))){
		  error = true;
		  alphaNumericValue = "";
		  alphaNumericValue.placeholder = "";
		  alphaNumericValue.placeholder = "El campo " + PlaceHolder + " no permite caracteres especiales";
		  $('#' + id ).addClass("error");
	  }
	}
	return error;
}

//function validateState(stateValue)
//{
//	var error = false;
//	if(stateValue.value == "Estado"){
//		error = true;
//		//stateValue.className.background-color = "#f78185";
//		}
//	if(error == false)
//		alphaValue.className = "ui-field-contain ui-body ui-br";
//	return error;
//	
//}

function validateZipCode(zipCodeValue, PlaceHolder)
{
	var error = false;
	var id = zipCodeValue.id;
	if(zipCodeValue.value.length == 0){}
	else{
		if(!(zipCodeValue.value.match(numericRegex))){
			zipCodeValue.placeholder = "";
			zipCodeValue.value = "";
			zipCodeValue.placeholder = "El campo " + PlaceHolder + " sólo permite numeros";
			error = true;
			$('#' + id ).addClass("error");
		}
		else if(zipCodeValue.value.length<5 || zipCodeValue.value.length>5){
			zipCodeValue.placeholder = "";
			zipCodeValue.value = "";
			zipCodeValue.placeholder = "El código postal no es válido"
			error = true;
			$('#' + id ).addClass("error");
		}
	}
	return error;
}

function validatePhone(phoneValue, PlaceHolder){
	var error = false;
	var id = phoneValue.id;
	if(phoneValue.value.length == 0){
		error = true;
		phoneValue.placeholder="";
		phoneValue.placeholder = "Se requiere llenar el campo " + PlaceHolder;
	}
	else{
		if(!(phoneValue.value.match(numericRegex))){
			error = true
			phoneValue.placeholder="";
			phoneValue.value="";
			phoneValue.placeholder = "El campo " + PlacheHolder + " sólo permite números.";
		}
		else if(phoneValue.value.length<8 || phoneValue.value.length>8){
			error = true
			phoneValue.placeholder="";
			phoneValue.value="";
			phoneValue.placeholder = "El número de teléfono no es válido.\n"
		}
	}	
	if(error == true)
		$('#' + id ).addClass("error");
	return error;
}

function validateRFC(rfc, PlaceHolder)
{
	var error = false;
	var id = rfc.id;
	if(rfc.value.length == 0){
		error = true;
		rfc.placeholder = "";
		rfc.placeholder =  "Se requiere llenar el campo " + PlaceHolder;
	}
	else{
		if(!(rfc.value.match(rfcReg))){
			error = true;
			rfc.placeholder="";
			rfc.value="";
			rfc.placeholder = "El RFC no es válido."
		}
	}
	if(error == true)
		$('#' + id ).addClass("error");
	return error;
}

function onFocusInput(id){
	$('#' + id).removeClass("error");
	}