// JavaScript Document
  var handledTypeList= "";
  var localDataStorage = {};
  localDataStorage.webdb = {};
  localDataStorage.webdb.db = null;
  var DBTable2="BrandsList";
  var TFields2= [{"Name":"brand","Type":"TEXT"}
				  ,{"Name":"added_on","Type":"DATETIME"}];
	
  localDataStorage.webdb.open = function(DBName, DBVersion, DBDesc) {
	  var dbSize = 5 * 1024 * 1024; // 5MB
	  localDataStorage.webdb.db = openDatabase(DBName, DBVersion, DBDesc, dbSize);
  }
	
  localDataStorage.webdb.createTable = function(DBTable, TFields) {
	  var fields = concatenateFields(TFields, true); 
	  var db = localDataStorage.webdb.db;
	  db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS "+ DBTable +"(ID INTEGER PRIMARY KEY ASC, " + fields + ")", []);
	  });
  }
  
  localDataStorage.webdb.addNewItem = function(DBTable, TFields, thisItem) {
	  var fields = concatenateFields(TFields, false); 
	  var db = localDataStorage.webdb.db;
	  var totalParameters = setNumberofParameters(thisItem.length);
	  db.transaction(function(tx){
			var addedOn = new Date();
			tx.executeSql("INSERT INTO "+ DBTable +"("+ fields +") VALUES " + totalParameters,
						  thisItem,
						  localDataStorage.webdb.onSuccess,
						  localDataStorage.webdb.onError);
	 });
  }
	
  localDataStorage.webdb.onError = function(tx, e) {
	alert("Ha ocurrido un error: " + e.message);
  }
  
  localDataStorage.webdb.onSuccess = function(tx, r) {
	//localDataStorage.webdb.getAllitemsList(loaditems);
  }
	
	
  localDataStorage.webdb.getAllitemsList = function(renderFunc, DBTable) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT * FROM "+ DBTable, [], renderFunc,
		  localDataStorage.webdb.onError);
	});
  }
  
  localDataStorage.webdb.getAllModels = function(renderFunc, DBTable, brand) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT * FROM "+ DBTable +" WHERE brand=?", [brand], renderFunc,
		  localDataStorage.webdb.onError);
	});
  }
  
  localDataStorage.webdb.getAllColors = function(renderFunc, DBTable, brand , model) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT * FROM "+ DBTable +" WHERE brand=? AND model=?", [brand, model], renderFunc,
		  localDataStorage.webdb.onError);
	});
  }
	  
  localDataStorage.webdb.deleteList = function(id, DBTable) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx){
	  tx.executeSql("DELETE FROM "+ DBTable +" WHERE ID=?", [id],
		  localDataStorage.webdb.onSuccess,
		  localDataStorage.webdb.onError);
	  });
  }
  
  localDataStorage.webdb.truncateList = function(DBTable) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx){
	  tx.executeSql("DELETE FROM "+ DBTable, [],
		  localDataStorage.webdb.onSuccess,
		  localDataStorage.webdb.onError);
	  });
  }
  
	  
  function setNumberofParameters(length){
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
  }
  
  function concatenateFields(TFields, typeNeeded){
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
  }
	  
  function loaditems(tx, rs) {
	var rowOutput = "";
	var itemsList = document.getElementById(handledTypeList+"Container");
	for (var i=0; i < rs.rows.length; i++) {
		if((i%2)!=0)
			{
				rowOutput += renderBlockA();	
			}
		else
			{
				rowOutput += renderBlockB();
			}
			
		switch (handledTypeList){
			case "Brands":
				rowOutput += renderBrands(rs.rows.item(i));					
			break;
			case "Models":
				rowOutput += renderModels(rs.rows.item(i));
			break;
            /*case "Versions":
				rowOutput += renderVersions(rs.rows.item(i));
			break;*/
		}		
		rowOutput += "</div>";
		itemsList.innerHTML = rowOutput;  
	}	 		
  }
  
  function getAllItemsList(tx, rs) {
	var rowOutput = "";
	var allItems = new Array;
	for (var i=0; i < rs.rows.length; i++) {
		allItems.push(rs.rows.item(i));		 
	}	
	addBrands(DBTable2, TFields2, allItems);		
  }
  
  function renderBrands(row) {

	return "<div class=\"contenedorImagen\"><a href=\"#ModelsPage\"><img src=\"Img/" + row.brand + ".png\" alt=\""+ row.brand +"\" title=\""+ row.brand +"\" class=\"imagenStyle\" /></a></div>";
  }
  
  function renderModels(row) {
	return "<div class=\"contenedorImagen\"><a><img src=\"Img/" + row.brand+"/" + row.model + ".png\" alt=\""+ row.model +"\" title=\""+ row.model +"\" class=\"imagenStyle\" /></a></div>";
  }
  
  function renderVersions(row) {
	return "<div class=\"contenedorImagen\"><a><img src=\"Img/" + row.brand+"/"+row.model+row.color+ row.version  + ".png\" alt=\""+ row.version +"\" title=\""+ row.version +"\" class=\"imagenStyle\" /></a></div>";
  }
  
  function renderBlockA() {
	return "<div class=\"ui-block-a\">";
  }
  
  function renderBlockB() {
	return "<div class=\"ui-block-b\">";
  }

  function init(typeList) {
	var DBName = "ETCatalog";
	var DBVersion = "1.0";
	var DBDesc = "Local storage of cars for mobile app";
	var DBTable = "CarList";
	var TFields = [{"Name":"brand","Type":"TEXT"}
					,{"Name":"model","Type":"TEXT"}
					,{"Name":"color","Type":"TEXT"}
					,{"Name":"version","Type":"TEXT"}
					,{"Name":"description","Type":"TEXT"}
					,{"Name":"price","Type":"TEXT"}
					,{"Name":"added_on","Type":"DATETIME"}];
	localDataStorage.webdb.open(DBName, DBVersion, DBDesc);
	localDataStorage.webdb.createTable(DBTable, TFields);
	// must be addCars=>addBrands(DBTable, TFields);	
	localDataStorage.webdb.createTable(DBTable2, TFields2);
	//localDataStorage.webdb.truncateList(DBTable2);
	handledTypeList = "Brands";
	localDataStorage.webdb.getAllitemsList(getAllItemsList,DBTable2);
	localDataStorage.webdb.getAllitemsList(loaditems,DBTable2);
  }
  
  function addCars(DBTable, TFields) {		
	for(var car in carsCatalog){
			//var thisCar = new Car();
			var src = carsCatalog[car];
			var thisCar = new Array(src.Brand,src.Model,src.Color,src.Version,src.Description,src.Price,new Date());
			/*thisCar.Brand = src.Brand;
			thisCar.Model = src.Model;
			thisCar.AddedOn = new Date();*/
			localDataStorage.webdb.addNewItem(DBTable, TFields, thisCar);
	}
  }
  
  function addBrands(DBTable, TFields, allBrandsList) {	
  	var isDup;
  	var itemsToAdd = new Array;		
	for(var brand in brandsCatalog){
		isDup = false;
		var src = brandsCatalog[brand];
		if(allBrandsList.length != 0){
			for(var itemIn in allBrandsList){
				if(!isDup){
					var itemInSrc = allBrandsList[itemIn];
					if(itemInSrc.brand == src.Brand){
						isDup = true;				
					}
				}				
			}
			if(!isDup){
				var thisBrand = new Array(src.Brand,new Date());	
				itemsToAdd.push(thisBrand);	
			}
		}else{
			var thisBrand = new Array(src.Brand,new Date());	
			itemsToAdd.push(thisBrand);		
		}
	}
	if(itemsToAdd.length != 0){
		for(newItem in itemsToAdd){
			var thisNew = itemsToAdd[newItem];
			localDataStorage.webdb.addNewItem(DBTable, TFields, thisNew);
		}
	}
  }