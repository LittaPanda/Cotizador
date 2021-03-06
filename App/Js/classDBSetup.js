// Setup
DataBaseSetup = function () {       
      	this.allFields = new Array({"Name":"brand","Type":"TEXT"}
						  	   ,{"Name":"model","Type":"TEXT"}
							   ,{"Name":"color","Type":"TEXT"}
						  	   ,{"Name":"version","Type":"TEXT"}
						  	   ,{"Name":"description","Type":"TEXT"}
						  	   ,{"Name":"price","Type":"TEXT"}
						  	   ,{"Name":"added_on","Type":"DATETIME"});
		this.brandFields = new Array({"Name":"brand","Type":"TEXT"}
				  					,{"Name":"added_on","Type":"DATETIME"});
		//customers
		this.customerAllFields = new Array({"Name":"firstName","Type":"TEXT"}
							   ,{"Name":"lastName1","Type":"TEXT"}
						  	   ,{"Name":"lastName2","Type":"TEXT"}
						  	   ,{"Name":"address","Type":"TEXT"}
						  	   ,{"Name":"neighborhood","Type":"TEXT"}
							   ,{"Name":"city","Type":"TEXT"}
						  	   ,{"Name":"state","Type":"TEXT"}
						  	   ,{"Name":"country","Type":"TEXT"}
							   ,{"Name":"zipCode","Type":"TEXT"}
						  	   ,{"Name":"phone","Type":"TEXT"}
						  	   ,{"Name":"rfc","Type":"TEXT"}
						  	   ,{"Name":"email","Type":"TEXT"}
							   ,{"Name":"added_on","Type":"DATETIME"});
		this.customersTableName = "CustomerList";	
		this.brandsTableName = "BrandsList";
		this.carsTableName = "CarList";
		this.Name = "ETCatalog";
		this.Version = "1.0";
		this.Desc = "Local storage of cars for mobile app";
	  };
	  
DataBaseSetup.prototype.concatenateFields = function(TFields, typeNeeded){
	  var fields = "";
	  var fieldsPositions = TFields.length - 1; 
	  for(var field in TFields){
		  var thisField = TFields[field];
		  if(field != fieldsPositions){
			 if(typeNeeded){
				fields += thisField.Name + " " + thisField.Type + ", ";
			 }else{
				fields += thisField.Name + ", ";
			 }
		  }else{
			if(typeNeeded){
				fields += thisField.Name + " " + thisField.Type;
			 }else{
				fields += thisField.Name;
			 }
		  }
	  }
	  return fields;
  };
  
DataBaseSetup.prototype.setNumberofParameters = function(length){
		var parameters= "(";
		for(var x=0;x<length;x++)
		{
			parameters += "?";
			if((x+1)==length)
			{
				parameters += ")";
			}
			else
			{
				parameters += ",";
			}
		}
		return parameters;
  };
  
DataBaseSetup.prototype.onError=function(errorMessage)
{
	alert(errorMessage);//$("#dialogo").dialog();
}