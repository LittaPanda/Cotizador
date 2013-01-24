//Init Global 
  var handledTypeList= "";
  var localDataStorage = {};
  localDataStorage.webdb = {};
  localDataStorage.webdb.db = null;
  var dbSetup = new DataBaseSetup();
  var thisVersions = new Array;
  var thisColors = new Array;
//End Global 
//Begins Database management:: SQL Instructions
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
	//localDataStorage.webdb.getAllitemsList();
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
  
  localDataStorage.webdb.getAllVersions = function(renderFunc, DBTable, brand, model) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT version FROM "+ DBTable +" WHERE brand=? AND model=?", [brand, model], renderFunc,
		  localDataStorage.webdb.onError);
	});
  };
  
  localDataStorage.webdb.getAllColors = function(renderFunc, DBTable, brand, model, version) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT color FROM "+ DBTable +" WHERE brand=? AND model=? AND version=?", [brand, model, version], renderFunc,
		  localDataStorage.webdb.onError);
	});
  };
  
  localDataStorage.webdb.getCar = function(renderFunc, DBTable, brand, model, version, color) {
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
//Ends Database management:: SQL Instructions
//Begins Data Handling:: Manipulation of results
  
  function loadAllBrands(tx, rs) {
	var thisBlockA = new Array;
	var thisBlockB = new Array;
	for (var i=0; i < rs.rows.length; i++) {
		if((i%2)==0)
			{
				thisBlockA.push({"brand":rs.rows.item(i).brand});
			}
		else
			{
				thisBlockB.push({"brand":rs.rows.item(i).brand});
			}
	}		
	var brands = {blockA: thisBlockA,
				  blockB: thisBlockB};
	basicRender(brands);		
  }
  
  function loadAllModels(tx, rs) {
	var thisBlockA = new Array;
	var thisBlockB = new Array;
	for (var i=0; i < rs.rows.length; i++) {
		if((i%2)==0)
			{
				thisBlockA.push({"brand":rs.rows.item(i).brand,"model":rs.rows.item(i).model});
			}
		else
			{
				thisBlockB.push({"brand":rs.rows.item(i).brand,"model":rs.rows.item(i).model});
			}
	}		
	var models = {blockA: thisBlockA,
				  blockB: thisBlockB};
	basicRender(models);		
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
  
//Ends Data Handling:: Manipulation of results
//Begins Data Handling:: Renders
  
  function basicRender (data){
	  	var src = $('#'+handledTypeList+'-template').html();
		var template = Handlebars.compile(src);		
		var html = template(data);		
		$('#'+handledTypeList+"Container").html(html);
  }
  
  function loadColors (tx, rs){
	  	var colors = new Array;
		for (var i=0; i < rs.rows.length; i++) {
			var thisColor = rs.rows.item(i).color;
			colors.push({"color":thisColor});
		}	  
		thisColors = colors;
  }
  
  function renderDetail (data){
	  	var src = $('#'+handledTypeList+'-template').html();
		var template = Handlebars.compile(src);		
		var html = template(data);		
		$('#'+handledTypeList+"Container").html(html);
		$('#'+handledTypeList+"Container").find( "select" ).selectmenu();
		$('#'+handledTypeList+"Container").find( ":jqmData(role=button)" ).button();
  }
  
  //states
  function renderPopup(){
	  	var src = $('#Popup-template').html();
		var template = Handlebars.compile(src);		
		var html = template(States);		
		$('#PopupContainer').html(html);
		$('#PopupContainer').find( ":jqmData(role=fieldcontain)" ).fieldcontain();
		$('#PopupContainer').find( ":jqmData(role=controlgroup)" ).controlgroup();
		$('#PopupContainer').find( "select" ).selectmenu();
		$('#PopupContainer').find('input').textinput();
		$('#PopupContainer').find( ":jqmData(role=button)" ).button();
		$('#PopupContainer').find('[type="reset"]').button();
  }
//Ends Data Handling:: Renders
//Begins Event Shooter:: Initialization
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
//Ends Event Shooter:: Initialization
//Begins Event Shooter:: Loading
  
  function loadBrands(){
	handledTypeList = "Brands";	
	localDataStorage.webdb.getAllitemsList(loadAllBrands,dbSetup.brandsTableName);
  }
  
  function loadModels(brand){
	handledTypeList = "Models";
	localDataStorage.webdb.getAllModels(loadAllModels,dbSetup.carsTableName,brand);
  }
  
  function loadDetail(brand, model, defaultVersion, defaultColor){
	handledTypeList = "Detail";
	localDataStorage.webdb.getAllVersions(loadVersions, dbSetup.carsTableName, brand , model);
	localDataStorage.webdb.getAllColors(loadColors, dbSetup.carsTableName, brand, model, defaultVersion);
	localDataStorage.webdb.getCar(loadCarDetail, dbSetup.carsTableName, brand, model, defaultVersion, defaultColor);	
  }
//Ends Event Shooter:: Loading
//Begins Data Aggregation
  
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
//Ends Data Aggregation