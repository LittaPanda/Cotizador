// JavaScript Document
	  var localDataStorage = {};
	  localDataStorage.webdb = {};
	  localDataStorage.webdb.db = null;
		
	  localDataStorage.webdb.open = function(DBName, DBVersion, DBDesc) {
		  var dbSize = 5 * 1024 * 1024; // 5MB
		  localDataStorage.webdb.db = openDatabase(DBName, DBVersion, DBDesc, dbSize);
	  }
		
	  localDataStorage.webdb.createTable = function(DBTable) {
		  var db = localDataStorage.webdb.db;
		  db.transaction(function(tx) {
			tx.executeSql("CREATE TABLE IF NOT EXISTS "+ DBTable +"(ID INTEGER PRIMARY KEY ASC, brand TEXT, model TEXT, color TEXT, version TEXT, description TEXT, price TEXT, added_on DATETIME)", []);
		  });
	  }
		
	  localDataStorage.webdb.addList = function(DBTable, thisItem) {
		var db = localDataStorage.webdb.db;
		db.transaction(function(tx){
		  var addedOn = new Date();
		  tx.executeSql("INSERT INTO "+ DBTable +"(brand, model, color, version, description, price, added_on) VALUES (?, ?, ?, ?, ?, ?, ?)",
			  [thisItem.brand, thisItem.model,thisItem.color, thisItem.version, thisItem.description, thisItem.price, addedOn],
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
				default:
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
		localDataStorage.webdb.open(DBName, DBVersion, DBDesc);
		localDataStorage.webdb.createTable(DBTable);
		localDataStorage.webdb.getAllitemsList(loaditems(typeList));
	  }
	  
	  function addList(DBTable) {
		for(var car in carsCatalog){
			var thisCar = new Car();
			var src = carsCatalog[car];
			thisCar.Brand = src.Brand;
			thisCar.Model = src.Model;
			localDataStorage.webdb.addList(DBTable, thisCar);
		}
	  }