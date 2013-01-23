// Definición de la clase Auto
// Construccion del uso del prototipo
Car = function () {
		this.isolate = new Object();       
      	this.isolate.brand = new String;
		this.isolate.model = new String;
		this.isolate.color = new String;
		this.isolate.version = new String;
		this.isolate.description = new String;
		this.isolate.price = new String;
		this.isolate.added_on = new Date;
		this.dup = false;
	  };
	  
Car.prototype.isDup = function (itemToCompare){
		if(this.isolate.brand != itemToCompare.brand){
			return;
		}
		if(this.isolate.model != itemToCompare.model){
			return;
		}
		if(this.isolate.color != itemToCompare.color){
			return;
		}
		if(this.isolate.version != itemToCompare.version){
			return;
		}
		if(this.isolate.description != itemToCompare.description){
			return;
		}
		if(this.isolate.price != itemToCompare.price){
			return;
		}
		this.dup = true;
	};