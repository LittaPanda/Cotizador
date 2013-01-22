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
		var isduplicate= 0;
		if(this.isolate.brand == itemToCompare.brand){
			isduplicate++;
		}
		if(this.isolate.model == itemToCompare.model){
			isduplicate++;
		}
		if(this.isolate.color == itemToCompare.color){
			isduplicate++;
		}
		if(this.isolate.version == itemToCompare.version){
			isduplicate++;
		}
		if(this.isolate.description == itemToCompare.description){
			isduplicate++;
		}
		if(this.isolate.price == itemToCompare.price){
			isduplicate++;
		}
		if(isduplicate == 6){
			this.dup = true;
		}
	};