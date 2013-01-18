// JavaScript Document
	  var localDataStorage = {};
	  localDataStorage.webdb = {};
	  localDataStorage.webdb.db = null;
		
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
	  
	  function concatenateFields(TFields, typeNeeded){
		  var fields = "";
		  var fieldsPositions = TFields.lenght - 1; 
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
		
	  localDataStorage.webdb.addNewItem = function(DBTable, TFields, thisItem) {
		  var fields = concatenateFields(TFields, false); 
		  var db = localDataStorage.webdb.db;
		  db.transaction(function(tx){
		  		var addedOn = new Date();
		  		tx.executeSql("INSERT INTO "+ DBTable +"("+ fields +") VALUES (?, ?, ?, ?, ?, ?, ?)",
			  thisItem,
			  localDataStorage.webdb.onSuccess,
			  localDataStorage.webdb.onError);
		 });
	  }
		
	  localDataStorage.webdb.onError = function(tx, e) {
		alert("Ha ocurrido un error: " + e.message);
	  }
	  
	  localDataStorage.webdb.onSuccess = function(tx, r) {
		localDataStorage.webdb.getAllitemsList(loaditems(typeList));
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
	  
	  function loaditems(typeList, tx, rs) {
		var rowOutput = "";
		var itemsList = document.getElementById(typeList+"Container");
		for (var i=0; i < rs.rows.length; i++) {
			switch (typeList){
				case "Brands":
					rowOutput += renderBrands(rs.rows.item(i));
				break;
				case "Models":
					rowOutput += renderModels(rs.rows.item(i));
				break;
				case "Versions":
					rowOutput += renderVersions(rs.rows.item(i));
				break;
			}		
			itemsList.innerHTML = rowOutput;  
		}	 		
	  }
	  
	  function renderBrands(row) {
		return "<div class=\"contenedorImagen\"><a><img src=\"" + row.brand + ".png alt=\""+ row.brand +"\" title=\""+ row.brand +"\" class=\"imagenStyle\" /></a></div>";
	  }
	  
	  function renderModels(row) {
		return "<div class=\"contenedorImagen\"><a><img src=\"" + row.brand+row.model + ".png alt=\""+ row.model +"\" title=\""+ row.model +"\" class=\"imagenStyle\" /></a></div>";
	  }
	  
	  function renderVersions(row) {
		return "<div class=\"contenedorImagen\"><a><img src=\"Img/" + row.brand+"/"+row.model+row.color+ row.version  + ".png alt=\""+ row.version +"\" title=\""+ row.version +"\" class=\"imagenStyle\" /></a></div>";
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
						,{"Name":"added_on","Type":"DATETIME"},
		];
		localDataStorage.webdb.open(DBName, DBVersion, DBDesc);
		localDataStorage.webdb.createTable(DBTable, TFields);
		localDataStorage.webdb.getAllitemsList(loaditems(typeList));
	  }
	  
	  function addList(DBTable, TFields) {		
		for(var car in carsCatalog){
				var thisCar = new Car();
				var src = carsCatalog[car];
				thisCar.Brand = src.Brand;
				thisCar.Model = src.Model;
				thisCar.AddedOn = new Date();
				localDataStorage.webdb.addNewItem(DBTable, TFields, thisCar);
		}
	  }