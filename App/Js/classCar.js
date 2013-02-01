// Definición de la clase Auto
// Construccion del uso del prototipo
Car = function () {
		this.isolate = new Object();       
      	this.isolate.Brand = new String;
		this.isolate.Model = new String;
		this.isolate.Color = new String;
		this.isolate.Version = new String;
		this.isolate.Description = new String;
		this.isolate.Price = new String;
		this.isolate.added_on = new Date;
		this.dup = false;
		this.changeData=true;
	  };
	  
Car.prototype.mustChangeData = function(itemToCompare) {
	if(this.isolate.Description != itemToCompare.Description)
		return;
	if(this.isolate.Price != itemToCompare.Price)
		return;
	this.changeData = false;
}

Car.prototype.isDup = function (itemToCompare){
		if(this.isolate.Brand != itemToCompare.Brand){
			return;
		}
		if(this.isolate.Model != itemToCompare.Model){
			return;
		}
		if(this.isolate.Color != itemToCompare.Color){
			return;
		}
		if(this.isolate.Version != itemToCompare.Version){
			return;
		}
		this.dup = true;
	};