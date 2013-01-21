// Customer class definition

function Customer(firstName_value, lastName1_value, lastName2_value, address_value, city_value, state_value, country_value, zipCode_value, phone_value, rfc_value, email_value){
	var name;
	var firstName;
	var lastName1;
	var lastName2;
	var address;
	var city;
	var state;
	var country;
	var zipCode;
	var phone;
	var rfc;
	var email;
	
	this.getFirstName = function() {
            return this.firstName;
    };
	
	this.getLastName1 = function() {
			return this.lastName1;
	};
	
	this.getLastName2 = function() {
			return this.lastName2;
	};
	
	this.getAddress = function () {
			return this.address;
	};
	
	this.getCity = function () {
			return this.city;
	};
	
	this.getState = function () {
			return this.state;
	};
	
	this.getCountry = function () {
			return this.country;
	};
	
	this.getZipCode = function () {
			return this.zipCode;
	};
	
	this.getPhone = function() {
			return this.phone;
	};
	
	this.getRfc = function() {
			return this.rfc;
	};
	
	this.getEmail = function() {
			return this.email;
	};
	
    this.setFirstName = function(firstName_value) {
		    this.firstName = firstName_value;
	};
	
	this.setLastName1 = function(lastName1_value) {
			this.lastName1 = lastName1_value;
	};
	
	this.setLastName2 = function(lastName2_value) {
			this.lastName2 = lastName2_value;
	};
	
	this.setAddress = function(address_value) {
			this.address = address_value;
	};
	
	this.setCity = function(city_value) {
			this.city = city_value;
	};
	
	this.setState = function(state_value) {
			this.state = state_value;
	};
	
	this.setCountry = function(country_value) {
			this.country = country_value;
	};
	
	this.setZipCode = function(zipCode_value) {
			this.zipCode = zipCode_value;
	};
	
	this.setPhone = function(phone_value) {
			this.phone = phone_value;
	};
	
	this.setRfc = function(rfc_value) {
			this.rfc = rfc_value;
	};
	
	this.setEmail = function(email_value){
			this.email = email_value;
	};
}