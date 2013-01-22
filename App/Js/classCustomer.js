// Customer class definition

// Construccion del uso del prototipo
Customer = function () {
		this.isolate = new Object();       
      	this.isolate.id = new String;
		this.isolate.firstName = new String;
		this.isolate.lastName1 = new String;
		this.isolate.lastName2 = new String;
		this.isolate.address = new String;
		this.isolate.neighborhood = new String;
		this.isolate.city = new String;
		this.isolate.state = new String;
		this.isolate.country = new String;
		this.isolate.zipCode = new String;
		this.isolate.phone = new String;
		this.isolate.rfc = new String;
		this.isolate.email = new String;
		this.isolate.added_on = new Date;
		this.dup = false;
	  };
	  
Customer.prototype.isDup = function (itemToCompare){
		var isduplicate= 0;
		if(this.isolate.id == itemToCompare.id){
			isduplicate++;
		}
		if(this.isolate.firstName == itemToCompare.firstName){
			isduplicate++;
		}
		if(this.isolate.lastName1 == itemToCompare.lastName1){
			isduplicate++;
		}
		if(this.isolate.lastName2 == itemToCompare.lastName2){
			isduplicate++;
		}
		if(this.isolate.address == itemToCompare.address){
			isduplicate++;
		}
		if(this.isolate.neighborhood == itemToCompare.neighborhood){
			isduplicate++;
		}
		if(this.isolate.city == itemToCompare.city){
			isduplicate++;
		}
		if(this.isolate.state == itemToCompare.state){
			isduplicate++;
		}
		if(this.isolate.country == itemToCompare.country){
			isduplicate++;
		}
		if(this.isolate.zipCode == itemToCompare.zipCode){
			isduplicate++;
		}
		if(this.isolate.phone == itemToCompare.phone){
			isduplicate++;
		}
		if(this.isolate.rfc == itemToCompare.rfc){
			isduplicate++;
		}
		if(this.isolate.email == itemToCompare.email){
			isduplicate++;
		}
		if(isduplicate == 13){
			this.dup = true;
		}
	};






//function Customer(id_value, firstName_value, lastName1_value, lastName2_value, address_value, neighborhood_value, city_value, state_value, country_value, zipCode_value, phone_value, rfc_value, email_value){
//	var id;
//	var name;
//	var firstName;
//	var lastName1;
//	var lastName2;
//	var address;
//	var neighborhood;
//	var city;
//	var state;
//	var country;
//	var zipCode;
//	var phone;
//	var rfc;
//	var email;
//	
//	this.getId = function() {
//            return this.id;
//    };
//	
//	this.getFirstName = function() {
//            return this.firstName;
//    };
//	
//	this.getLastName1 = function() {
//			return this.lastName1;
//	};
//	
//	this.getLastName2 = function() {
//			return this.lastName2;
//	};
//	
//	this.getAddress = function () {
//			return this.address;
//	};
//	
//	this.getNeighborhood = function () {
//			return this.neighborhood;
//	};
//	
//	this.getCity = function () {
//			return this.city;
//	};
//	
//	this.getState = function () {
//			return this.state;
//	};
//	
//	this.getCountry = function () {
//			return this.country;
//	};
//	
//	this.getZipCode = function () {
//			return this.zipCode;
//	};
//	
//	this.getPhone = function() {
//			return this.phone;
//	};
//	
//	this.getRfc = function() {
//			return this.rfc;
//	};
//	
//	this.getEmail = function() {
//			return this.email;
//	};
//	
//    this.setFirstName = function(firstName_value) {
//		    this.firstName = firstName_value;
//	};
//	
//	this.setId = function(id_value) {
//		    this.id = id_value;
//	};
//	
//	this.setLastName1 = function(lastName1_value) {
//			this.lastName1 = lastName1_value;
//	};
//	
//	this.setLastName2 = function(lastName2_value) {
//			this.lastName2 = lastName2_value;
//	};
//	
//	this.setAddress = function(address_value) {
//			this.address = address_value;
//	};
//	
//	this.setNeighborhood = function(neighborhood_value) {
//			this.neighborhood = neighborhood_value;
//	};
//	
//	this.setCity = function(city_value) {
//			this.city = city_value;
//	};
//	
//	this.setState = function(state_value) {
//			this.state = state_value;
//	};
//	
//	this.setCountry = function(country_value) {
//			this.country = country_value;
//	};
//	
//	this.setZipCode = function(zipCode_value) {
//			this.zipCode = zipCode_value;
//	};
//	
//	this.setPhone = function(phone_value) {
//			this.phone = phone_value;
//	};
//	
//	this.setRfc = function(rfc_value) {
//			this.rfc = rfc_value;
//	};
//	
//	this.setEmail = function(email_value){
//			this.email = email_value;
//	};
//}	