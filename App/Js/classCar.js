// Definición de la clase Auto
function Car(brand_value, model_value, color_value, version_value, description_value, price_value) {
      var brand;
      var model;
      var color;
	  var version;
	  var description;
	  var price;
   
      this.getBrand = function() {
            return this.brand;
      };
    
      this.getModel = function() {
            return this.model;
      };

      this.getColor = function() {
            return this.color;
      };
	  
	  this.getVersion = function() {
            return this.version;
      };
	  
	  this.getDescription = function() {
            return this.description;
      };
	  
	  this.getPrice = function() {
            return this.price;
      };
	 
      this.setBrand = function(brand_value) {
            this.brand = brand_value;
      };

      this.setModel = function(model_value) {
            this.model = model_value;
      };

      this.setColor = function(color_value) {
            this.color = color_value;
      }
	  
	  this.setVersion = function(version_value) {
            this.version = version_value;
      }
	  
	  this.setDescription = function(description_value) {
            this.description = description_value;
      }
	  
	  this.setPrice = function(price_value) {
            this.price = price_value;
      }
}