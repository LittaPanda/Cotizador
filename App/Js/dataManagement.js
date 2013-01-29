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
	
  localDataStorage.webdb.getAllitemsList = function(renderFunc, DBTable, errorCallback) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT * FROM "+ DBTable, [], renderFunc, errorCallback);
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
	  tx.executeSql("SELECT DISTINCT version FROM "+ DBTable +" WHERE brand=? AND model=?", [brand, model], renderFunc,
		  localDataStorage.webdb.onError);
	});
  };
  
  localDataStorage.webdb.getAllColors = function(renderFunc, DBTable, brand, model, version) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT DISTINCT color FROM "+ DBTable +" WHERE brand=? AND model=? AND version=?", [brand, model, version], renderFunc,
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
  
  localDataStorage.webdb.getCarWithoutColor = function(renderFunc, DBTable, brand, model, version) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT * FROM "+ DBTable +" WHERE brand=? AND model=? AND version=? LIMIT 1", [brand, model, version], renderFunc,
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
		var versionCollection = new Array;
		var colorsCollection = new Array;
		for(index in thisVersions){
			var thisVersion = thisVersions[index];
			if(thisCar.version == thisVersion.version){
				versionCollection.push({"version" : thisVersion.version,"selected":"selected"});
			}else{
				versionCollection.push({"version" : thisVersion.version});
			}
		}
		for(index in thisColors){
			var thisColor = thisColors[index];
			colorsCollection.push({brand: thisCar.brand,
									model: thisCar.model,
									version: thisCar.version,
									price: thisCar.price,
									color: thisColor.color
									});
		}
		var data = {
			brand: thisCar.brand,
			model: thisCar.model,
			version: thisCar.version,
			price: thisCar.price,
			color: thisCar.color,
			description: thisCar.description,
			colors: colorsCollection,
			versions: versionCollection
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
  function renderPopup(carData){
		var data = {"States":States,"CarData": carData};
	  	var src = $('#Popup-template').html();
		var template = Handlebars.compile(src);		
		var html = template(data);
		$('#PopupContainer').html(html);
		$('#PopupContainer').find( ":jqmData(role=fieldcontain)" ).fieldcontain();
		$('#PopupContainer').find( ":jqmData(role=controlgroup)" ).controlgroup();
		$('#PopupContainer').find( "select" ).selectmenu();
		$('#PopupContainer').find('input').textinput();
		$('#PopupContainer').find( ":jqmData(role=button)" ).button();
		$('#PopupContainer').find('[type="reset"]').button();
  }
  
  function renderReport(customerData,carData){
	  	var src = $('#Report-template').html();
		var template = Handlebars.compile(src);	
		var data = {Residue:carData.SelectedPrice,Months:18,AnualRate:8.5,payPeriod:1};
		var amortizationData = quotation(data);
		var renderData = {"CustomerData":customerData,"AmortizedTable":amortizationData,"CarData":carData};	
		var html = template(renderData);		
		$('#ReportContainer').html(html);
		$('#ReportContainer').find( ":jqmData(role=fieldcontain)" ).fieldcontain();
		$('#ReportContainer').find( ":jqmData(role=controlgroup)" ).controlgroup();
		$('#ReportContainer').find( "select" ).selectmenu();
		$('#ReportContainer').find('input').textinput();
		$('#ReportContainer').find( ":jqmData(role=button)" ).button();
		$('#ReportContainer').find('[type="reset"]').button();
  }
//Ends Data Handling:: Renders
//Begins Event Shooter:: Initialization
  function init() {
	localDataStorage.webdb.open(dbSetup.Name, dbSetup.Version, dbSetup.Vesc);
	localDataStorage.webdb.createTable(dbSetup.carsTableName, dbSetup.allFields);
	localDataStorage.webdb.createTable(dbSetup.brandsTableName, dbSetup.brandFields);
	//localDataStorage.webdb.truncateList(dbSetup.carsTableName);
	//localDataStorage.webdb.truncateList(dbSetup.brandsTableName);
	localDataStorage.webdb.getAllitemsList(storeNewCars,dbSetup.carsTableName,localDataStorage.webdb.onError);
	localDataStorage.webdb.getAllitemsList(storeNewBrands,dbSetup.brandsTableName,localDataStorage.webdb.onError);
	//customers
	localDataStorage.webdb.createTable(dbSetup.customersTableName, dbSetup.customerAllFields);
  }
//Ends Event Shooter:: Initialization
//Begins Event Shooter:: Loading
  
  function loadBrands(){
	handledTypeList = "Brands";	
	localDataStorage.webdb.getAllitemsList(loadAllBrands,dbSetup.brandsTableName,localDataStorage.webdb.onError);
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
//Begins Event Shooter:: Change  
  function changeDetailbyVersion(brand, model, version){
	handledTypeList = "Detail";
	localDataStorage.webdb.getAllVersions(loadVersions, dbSetup.carsTableName, brand , model);
	localDataStorage.webdb.getAllColors(loadColors, dbSetup.carsTableName, brand, model, version);
	localDataStorage.webdb.getCarWithoutColor(loadCarDetail, dbSetup.carsTableName, brand, model, version);	
  }
  
  function changeDetailbyColor(brand, model, color, version){
	handledTypeList = "Detail";
	localDataStorage.webdb.getAllVersions(loadVersions, dbSetup.carsTableName, brand , model);
	localDataStorage.webdb.getAllColors(loadColors, dbSetup.carsTableName, brand, model, version);
	localDataStorage.webdb.getCar(loadCarDetail, dbSetup.carsTableName, brand, model, version, color);	
  }
//Ends Event Shooter:: Change
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

// PDF Report creation
/*function CreatePDFTest(){
var pdf = new jsPDF('p','in','letter'), source = $('html')[0], specialElementHandlers = {'title': function(element, renderer){return true}}
pdf.fromHTML(
 source // HTML string or DOM elem ref.
 , 0.0 // x coord
 , 0.0 // y coord
 , {
    'width':7.5 // max width of content on PDF
  , 'elementHandlers': specialElementHandlers
 }
)
pdf.output('datauri');
}*/

//PDF generator
function CreatePDF(){
		var doc = new jsPDF('landscape');
		doc.setFontSize(16);
		var positionX = 5;
		var positionY = 40;
		var rectW = 37;
		var rectH = 7;
		doc.rect(5, 10, 222, 35);
		doc.text(10, 15, 'Cotizacion');
		doc.setFontSize(11);
		var firstBlock = "";
		$('.firstBlock').each(function () {			
			firstBlock += this.innerHTML + "  ";														 
		});	
		doc.text(10, 20, firstBlock);
		var secondBlock = "";	
		$('.secondBlock').each(function () {			
			secondBlock += this.innerHTML + "  ";										 
		});	
		doc.text(10, 25, secondBlock);
		var thirdBlock = "";
		$('.thirdBlock').each(function () {
			thirdBlock += this.innerHTML + "  ";							 
		});	
		doc.text(10, 30, thirdBlock);	
		
		$('#GeneratedHeaderContainer h4').each(function () {
			var header = "";
			header += this.innerHTML;
			doc.setDrawColor(0);
			doc.setFillColor(100,100,100);
			doc.rect(positionX, positionY, rectW, rectH, 'FD');
			doc.text(positionX + 2, positionY + 5, header);
			positionX = positionX + rectW;							 
		});
		
		$('#GeneratedDataContainer .rowCont').each(function () {
			positionX = 5;
			positionY = positionY + rectH;
			$(this).children().children().children("p").each(function () {					
					var content = "";
					content += this.innerHTML;
					doc.rect(positionX, positionY, rectW, rectH);
					doc.text(positionX + 2, positionY + 5, content);
					positionX = positionX + rectW;	

			});						 
		});
		doc.output('save');
}
