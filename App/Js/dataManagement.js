// JavaScript Document
  var handledTypeList= "";
  var localDataStorage = {};
  localDataStorage.webdb = {};
  localDataStorage.webdb.db = null;
  var dbSetup = new DataBaseSetup();
  var thisVersions = new Array;
  var thisColors = new Array;
	
  localDataStorage.webdb.open = function(DBName, DBVersion, DBDesc) {
	  var dbSize = 5 * 1024 * 1024; // 5MB
	  localDataStorage.webdb.db = openDatabase(DBName, DBVersion, DBDesc, dbSize);
  };
	
  localDataStorage.webdb.createTable = function(DBTable, TFields) {
	  var fields = dbSetup.concatenateFields(TFields, true); 
	  var db = localDataStorage.webdb.db;
	  db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS "+ DBTable +"(ID INTEGER PRIMARY KEY ASC, " + fields + ")", []);
	  });
  };
  
  localDataStorage.webdb.addNewItem = function(DBTable, TFields, thisItem) {
	  var fields = dbSetup.concatenateFields(TFields, false); 
	  var db = localDataStorage.webdb.db;
	  var totalParameters = dbSetup.setNumberofParameters(thisItem.length);
	  db.transaction(function(tx){
			var addedOn = new Date();
			tx.executeSql("INSERT INTO "+ DBTable +"("+ fields +") VALUES " + totalParameters,
						  thisItem,
						  localDataStorage.webdb.onSuccess,
						  localDataStorage.webdb.onError);
	 });
  };
	
  localDataStorage.webdb.onError = function(tx, e) {
	alert("Ha ocurrido un error: " + e.message);
  };
  
  localDataStorage.webdb.onSuccess = function(tx, r) {
	//localDataStorage.webdb.getAllitemsList(loaditems);
  };
	
	
  localDataStorage.webdb.getAllitemsList = function(renderFunc, DBTable) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT * FROM "+ DBTable, [], renderFunc,
		  localDataStorage.webdb.onError);
	});
  };
  
  localDataStorage.webdb.getAllModels = function(renderFunc, DBTable, brand) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT DISTINCT model,brand FROM "+ DBTable +" WHERE brand=?", [brand], renderFunc,
		  localDataStorage.webdb.onError);
	});
  };
  
  localDataStorage.webdb.getAllVersions = function(renderFunc, DBTable, brand , model) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT version FROM "+ DBTable +" WHERE brand=? AND model=?", [brand, model], renderFunc,
		  localDataStorage.webdb.onError);
	});
  };
  
  localDataStorage.webdb.getAllColors = function(renderFunc, DBTable, brand , model, version) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT color FROM "+ DBTable +" WHERE brand=? AND model=? AND version=?", [brand, model, version], renderFunc,
		  localDataStorage.webdb.onError);
	});
  };
  
  localDataStorage.webdb.getCar = function(renderFunc, DBTable, brand , model, version, color) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT * FROM "+ DBTable +" WHERE brand=? AND model=? AND version=? AND color=?", [brand, model, version, color], renderFunc,
		  localDataStorage.webdb.onError);
	});
  };
	  
  localDataStorage.webdb.deleteList = function(id, DBTable) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx){
	  tx.executeSql("DELETE FROM "+ DBTable +" WHERE ID=?", [id],
		  localDataStorage.webdb.onSuccess,
		  localDataStorage.webdb.onError);
	  });
  };
  
  localDataStorage.webdb.truncateList = function(DBTable) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx){
	  tx.executeSql("DELETE FROM "+ DBTable, [],
		  localDataStorage.webdb.onSuccess,
		  localDataStorage.webdb.onError);
	  });
  };
  
  localDataStorage.webdb.dropDataBase = function(DBName) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx){
	  tx.executeSql("DROP DATABASE "+ DBName, [],
		  localDataStorage.webdb.onSuccess,
		  localDataStorage.webdb.onError);
	  });
  };
	  
  function loaditems(tx, rs) {
	var rowOutput = "";
	var itemsList = document.getElementById(handledTypeList+"Container");
	for (var i=0; i < rs.rows.length; i++) {
		if((i%2)==0)
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
  
  function loadColors (tx, rs){
	  	var colors = new Array;
		for (var i=0; i < rs.rows.length; i++) {
			var thisColor = rs.rows.item(i).color;
			colors.push({"color":thisColor});
		}	  
		thisColors = colors;
  }
  
  function loadVersions (tx, rs){
		var versions = new Array;
		for (var i=0; i < rs.rows.length; i++) {
			var thisVersion = rs.rows.item(i).version;
			versions.push({"version":thisVersion});
		}
		thisVersions = versions;	  	  
  }
  
  function loadCarDetail (tx, rs){
		var thisCar = rs.rows.item(0);	 
		var data = {
			brand: thisCar.brand,
			model: thisCar.model,
			version: thisCar.version,
			price: thisCar.price,
			color: thisCar.color,
			colors: thisColors,
			versions: thisVersions
		};
		renderDetail(data);  
  }
  
  function renderDetail (data){
	  	var src = $('#'+handledTypeList+'-template').html();
		var template = Handlebars.compile(src);		
		var html = template(data);		
		$('#'+handledTypeList+"Container").html(html);
  }
  
  function storeNewBrands(tx, rs) {
	var allItems = new Array;
	for (var i=0; i < rs.rows.length; i++) {
		allItems.push(rs.rows.item(i));		 
	}	
	addBrands(dbSetup.brandsTableName, dbSetup.brandFields, allItems);		
  }
  
  function storeNewCars(tx, rs) {
	var allItems = new Array;
	var dateToCompare = new Date();
	for (var i=0; i < rs.rows.length; i++) {
			var newCar = new Car();				
			var thatItem = rs.rows.item(i);			
			newCar.isolate.brand = thatItem.brand;
			newCar.isolate.model = thatItem.model;
			newCar.isolate.color = thatItem.color;
			newCar.isolate.version = thatItem.version;
			newCar.isolate.description = thatItem.description;
			newCar.isolate.price = thatItem.price;
			newCar.isolate.added_on = dateToCompare;
			allItems.push(newCar);		 
	}	
	addCars(dbSetup.carsTableName, dbSetup.allFields, allItems, dateToCompare);		
  }
  
  function renderBrands(row) {
	return "<div class=\"contenedorImagen\"><a class=\"brandLink\" href=\"#ModelsPage\" id=\"" + row.brand + "\"><img src=\"Img/" + row.brand + ".png\" alt=\""+ row.brand +"\" title=\""+ row.brand +"\" class=\"imagenStyle\" /></a></div>";
  }
  
  function renderModels(row) {
	return "<div class=\"contenedorImagen\"><a class=\"modelLink\" href=\"#DetailPage\" name=\"" + row.brand + "\" id=\"" + row.model + "\"><img src=\"Img/" + row.brand+"/" + row.model + ".png\" alt=\""+ row.model +"\" title=\""+ row.model +"\" class=\"imagenStyle\" /></a></div>";
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

  function init() {
	localDataStorage.webdb.open(dbSetup.Name, dbSetup.Version, dbSetup.Vesc);
	localDataStorage.webdb.createTable(dbSetup.carsTableName, dbSetup.allFields);
	localDataStorage.webdb.createTable(dbSetup.brandsTableName, dbSetup.brandFields);
	//localDataStorage.webdb.truncateList(dbSetup.carsTableName);
	//localDataStorage.webdb.truncateList(dbSetup.brandsTableName);
	localDataStorage.webdb.getAllitemsList(storeNewCars,dbSetup.carsTableName);
	localDataStorage.webdb.getAllitemsList(storeNewBrands,dbSetup.brandsTableName);
	//customers
	localDataStorage.webdb.createTable(dbSetup.customersTableName, dbSetup.customerAllFields);
  }
  
  function loadBrands(typeList){
	handledTypeList = typeList;	
	localDataStorage.webdb.getAllitemsList(loaditems,dbSetup.brandsTableName);
  }
  
  function loadModels(typeList, brand){
	handledTypeList = typeList;
	localDataStorage.webdb.getAllModels(loaditems,dbSetup.carsTableName,brand);
  }
  
  function loadDetail(brand, model, defaultVersion, defaultColor){
	handledTypeList = "Detail";
	localDataStorage.webdb.getAllVersions(loadVersions, dbSetup.carsTableName, brand , model);
	localDataStorage.webdb.getAllColors(loadColors, dbSetup.carsTableName, brand, model, defaultVersion);
	localDataStorage.webdb.getCar(loadCarDetail, dbSetup.carsTableName, brand, model, defaultVersion, defaultColor);	
  }
  
  function addCars(DBTable, TFields, allItemsList, dateToCompare) {	
	var itemsToAdd = new Array;		
	for(var car in carsCatalog){
			var src = carsCatalog[car];
			var thisCar = new Car();
			var carToAdd = new Array(src.Brand,src.Model,src.Color,src.Version,src.Description,src.Price,new Date());
			thisCar.isolate.brand = src.Brand;
			thisCar.isolate.model = src.Model;
			thisCar.isolate.color = src.Color;
			thisCar.isolate.version = src.Version;
			thisCar.isolate.description = src.Description;
			thisCar.isolate.price = src.Price;
			thisCar.isolate.added_on = dateToCompare;
			if(allItemsList.length != 0){
				for(var itemIn in allItemsList){
					if(!thisCar.dup || !newCar.dup){
						var newCar = allItemsList[itemIn];
						thisCar.isDup(newCar.isolate);
						if(thisCar.dup){
							newCar.dup = true;
						}
					}				
				}
			}
			if(!thisCar.dup){
				localDataStorage.webdb.addNewItem(DBTable, TFields, carToAdd);
			}
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