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
	  if(!DBName)
		{
			return false;
		}
	  var dbSize = 5 * 1024 * 1024; // 5MB
	  localDataStorage.webdb.db = openDatabase(DBName, DBVersion, DBDesc, dbSize);
	  return true;
  };
	
  localDataStorage.webdb.createTable = function(DBTable, TFields,onSuccess,onError) {
	  var fields = dbSetup.concatenateFields(TFields, true); 
	  var db = localDataStorage.webdb.db;
	  db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS "+ DBTable +"(ID INTEGER PRIMARY KEY ASC, " + fields + ")", [],onSuccess,onError);
	  });
  };
  
  localDataStorage.webdb.addNewItem = function(DBTable, TFields, thisItem,onSuccess,onError) {
	  
	  var fields = dbSetup.concatenateFields(TFields, false); 
	  var db = localDataStorage.webdb.db;
	  var totalParameters = dbSetup.setNumberofParameters(thisItem.length);
	  db.transaction(function(tx){
			var addedOn = new Date();
			tx.executeSql("INSERT INTO "+ DBTable +"("+ fields +") VALUES " + totalParameters,
						  thisItem, onSuccess,onError);
	 });
  //}
  };
	
  localDataStorage.webdb.onError = function(tx, e) {
	alert("Ha ocurrido un error: " + e.message);
  };
  
  localDataStorage.webdb.onSuccess = function(tx, r) {
  };	
	
  localDataStorage.webdb.getAllitemsList = function(renderFunc, DBTable, errorCallback) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT * FROM "+ DBTable, [], renderFunc, errorCallback);
	});
  };
  
  localDataStorage.webdb.getAllBrandsList = function(DBTable,brand,onSuccess,onError) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT * FROM "+ DBTable +" WHERE brand=?", [brand],
	  function(tx,results) {
			localDataStorage.webdb.deleteList(results.rows.item(0).ID,DBTable,onSuccess,onError);
			}
	  ,onError);
	});
  };
  
  
  localDataStorage.webdb.getAllModels = function(renderFunc, DBTable, brand,onError) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT DISTINCT model,brand FROM "+ DBTable +" WHERE brand=?", [brand], renderFunc,onError);
	});
  };
  
  localDataStorage.webdb.getAllVersions = function(renderFunc, DBTable, brand, model,onError) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT DISTINCT version FROM "+ DBTable +" WHERE brand=? AND model=?", [brand, model], renderFunc,onError);
	});
  };
  
  localDataStorage.webdb.getAllColors = function(renderFunc, DBTable, brand, model, version,onError) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT DISTINCT color FROM "+ DBTable +" WHERE brand=? AND model=? AND version=?", [brand, model, version], renderFunc,onError);
	});
  };
  
  localDataStorage.webdb.getCar = function(renderFunc, DBTable, brand, model, version, color,onError) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT * FROM "+ DBTable +" WHERE brand=? AND model=? AND version=? AND color=?", [brand, model, version, color], renderFunc,onError);
	});
  };

  localDataStorage.webdb.getCarId = function(DBTable, brand, model, version, color,onSuccess,onError) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	tx.executeSql("SELECT * FROM "+ DBTable +" WHERE brand=? AND model=? AND version=? AND color=?", [brand, model, version, color], 
	function(tx,results) {
		localDataStorage.webdb.deleteList(results.rows.item(0).ID,DBTable,onSuccess,onError);
	} ,onError);
	});
  };

  
  localDataStorage.webdb.getCarWithoutColor = function(renderFunc, DBTable, brand, model, version,onError) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx) {
	  tx.executeSql("SELECT * FROM "+ DBTable +" WHERE brand=? AND model=? AND version=? LIMIT 1", [brand, model, version], renderFunc,onError);
	});
  };
	  
  localDataStorage.webdb.updateCarData = function(DBTable,brand, model, version, color,description,price,onSuccess,onError) {
	var db=localDataStorage.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("UPDATE " + DBTable + "  SET price=?,description=?,added_on=? WHERE brand=? AND model=? AND version=? AND color=?",[price,description,new Date(),brand, model, version, color],onSuccess,onError);
	});
	  
  };	  
	  
  localDataStorage.webdb.deleteList = function(id, DBTable,onSuccess,onError) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx){
	  tx.executeSql("DELETE FROM "+ DBTable +" WHERE ID=?", [id],
		  onSuccess,onError);
	  });
  };
  
  localDataStorage.webdb.truncateList = function(DBTable,onSuccess,onError) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx){
	  tx.executeSql("DELETE FROM "+ DBTable, [],
		  onSuccess,onError);
	  });
  };
  
  localDataStorage.webdb.dropTable = function(DBTable,onSuccess,onError) {
  	var db=localDataStorage.webdb.db;
  	db.transaction(function(tx) {
		tx.executeSql("DROP TABLE " + DBTable,[],onSuccess,onError);
	});
  };
  
  localDataStorage.webdb.dropDataBase = function(DBName,onSuccess,onError) {
	var db = localDataStorage.webdb.db;
	db.transaction(function(tx){
	  tx.executeSql("DROP DATABASE "+ DBName, [],onSuccess,onError);
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
			newCar.isolate.Brand = thatItem.brand;
			newCar.isolate.Model = thatItem.model;
			newCar.isolate.Color = thatItem.color;
			newCar.isolate.Version = thatItem.version;
			newCar.isolate.Description = thatItem.description;
			newCar.isolate.Price = thatItem.price;
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
  
  function renderReport(customerData,carData,data){
	  	var src = $('#Report-template').html();
		var template = Handlebars.compile(src);		
		carData.SelectedPrice = toCurrency(carData.SelectedPrice);
		var amortizationData = quotation(data);
		var renderData = {"CustomerData":customerData,"AmortizedTable":amortizationData,"CarData":carData};	
		var html = template(renderData);		
		$('#ReportContainer').html(html);
		$('#ReportContainer').find( ":jqmData(role=fieldcontain)" ).fieldcontain();
		$('#ReportContainer').find( ":jqmData(role=controlgroup)" ).controlgroup();
		$('#ReportContainer').find( "select" ).selectmenu();
		$('#ReportContainer').find('input').textinput();
		$('#ReportContainer').find( ":jqmData(role=button)" ).button();
		$('#ReportContainer').find(":jqmData(type=range)").slider();
  }
//Ends Data Handling:: Renders
//Begins Event Shooter:: Initialization
  function init() {
	localDataStorage.webdb.open(dbSetup.Name, dbSetup.Version, dbSetup.Vesc);
	localDataStorage.webdb.createTable(dbSetup.carsTableName, dbSetup.allFields,localDataStorage. webdb.onSuccess,localDataStorage.webdb.onError);
	localDataStorage.webdb.createTable(dbSetup.brandsTableName, dbSetup.brandFields,localDataStorage.webdb.onSuccess,localDataStorage.webdb.onError);
	localDataStorage.webdb.getAllitemsList(storeNewCars,dbSetup.carsTableName,localDataStorage.webdb.onError);
	localDataStorage.webdb.getAllitemsList(storeNewBrands,dbSetup.brandsTableName,localDataStorage.webdb.onError);
	//customers
	localDataStorage.webdb.createTable(dbSetup.customersTableName, dbSetup.customerAllFields,localDataStorage.webdb.onSuccess,localDataStorage.webdb.onError);
  }
//Ends Event Shooter:: Initialization
//Begins Event Shooter:: Loading
  
  function loadBrands(){
	handledTypeList = "Brands";	
	localDataStorage.webdb.getAllitemsList(loadAllBrands,dbSetup.brandsTableName,localDataStorage.webdb.onError);
  }
  
  function loadModels(brand){
	handledTypeList = "Models";
	localDataStorage.webdb.getAllModels(loadAllModels,dbSetup.carsTableName,brand,localDataStorage.webdb.onError);
  }
  
  function loadDetail(brand, model, defaultVersion, defaultColor){
	handledTypeList = "Detail";
	localDataStorage.webdb.getAllVersions(loadVersions, dbSetup.carsTableName, brand , model,localDataStorage.webdb.onError);
	localDataStorage.webdb.getAllColors(loadColors, dbSetup.carsTableName, brand, model, defaultVersion,localDataStorage.webdb.onError);
	localDataStorage.webdb.getCar(loadCarDetail, dbSetup.carsTableName, brand, model, defaultVersion, defaultColor,localDataStorage.webdb.onError);	
  }
//Ends Event Shooter:: Loading
//Begins Event Shooter:: Change  
  function changeDetailbyVersion(brand, model, version){
	handledTypeList = "Detail";
	localDataStorage.webdb.getAllVersions(loadVersions, dbSetup.carsTableName, brand , model,localDataStorage.webdb.onError);
	localDataStorage.webdb.getAllColors(loadColors, dbSetup.carsTableName, brand, model, version,localDataStorage.webdb.onError);
	localDataStorage.webdb.getCarWithoutColor(loadCarDetail, dbSetup.carsTableName, brand, model, version,localDataStorage.webdb.onError);	
  }
  
  function changeDetailbyColor(brand, model, color, version){
	handledTypeList = "Detail";
	localDataStorage.webdb.getAllVersions(loadVersions, dbSetup.carsTableName, brand , model,localDataStorage.webdb.onError);
	localDataStorage.webdb.getAllColors(loadColors, dbSetup.carsTableName, brand, model, version,localDataStorage.webdb.onError);
	localDataStorage.webdb.getCar(loadCarDetail, dbSetup.carsTableName, brand, model, version, color,localDataStorage.webdb.onError);	
  }
//Ends Event Shooter:: Change
//Begins Data Aggregation
  
  function addCars(DBTable, TFields, allItemsList, dateToCompare) {	
	var itemsToAdd = new Array;		
	for(var car in allItemsList){
			var src = allItemsList[car];
			var thisCar = new Car();
			var carToAdd = new Array(src.isolate.Brand,src.isolate.Model,src.isolate.Color,src.isolate.Version,src.isolate.Description,src.isolate.Price,new Date());
			thisCar.isolate.Brand = src.isolate.Brand;
			thisCar.isolate.Model = src.isolate.Model;
			thisCar.isolate.Color = src.isolate.Color;
			thisCar.isolate.Version = src.isolate.Version;
			thisCar.isolate.Description = src.isolate.Description;
			thisCar.isolate.Price = src.isolate.Price;
			if(allItemsList.length != 0){
				for(var itemIn in carsCatalog){
					if(!thisCar.dup || !newCar.dup){
						var newCar = carsCatalog[itemIn];
						thisCar.isDup(newCar);
						if(thisCar.dup){
							newCar.dup = true;
						}
					}				
				}
			}
			if(!thisCar.dup){
				localDataStorage.webdb.getCarId(DBTable,src.isolate.Brand,src.isolate.Model,src.isolate.Version,src.isolate.Color,localDataStorage.webdb.onSuccess,localDataStorage.webdb.onError);
			}	
	}

	for(var car in carsCatalog){
			var src = carsCatalog[car];
			var thisCar = new Car();
			var carToAdd = new Array(src.Brand,src.Model,src.Color,src.Version,src.Description,src.Price,new Date());
			thisCar.isolate.Brand = src.Brand;
			thisCar.isolate.Model = src.Model;
			thisCar.isolate.Color = src.Color;
			thisCar.isolate.Version = src.Version;
			thisCar.isolate.Description = src.Description;
			thisCar.isolate.Price = src.Price;
			if(allItemsList.length != 0){
				for(var itemIn in allItemsList){
					if(!thisCar.dup || !newCar.dup){
						var newCar = allItemsList[itemIn];
						thisCar.isDup(newCar.isolate);
						if(thisCar.dup){
							newCar.dup = true;
							thisCar.mustChangeData(newCar.isolate);
						}
					}				
				}
			}
			if(!thisCar.dup){
				localDataStorage.webdb.addNewItem(DBTable, TFields, carToAdd,localDataStorage.webdb.onSuccess,localDataStorage.webdb.onError);
			}
			else {
				if(thisCar.changeData){
					localDataStorage.webdb.updateCarData(DBTable,src.Brand,src.Model,src.Version,src.Color,src.Description,src.Price,localDataStorage.webdb.onSuccess,localDataStorage.webdb.onError);
				}
			}
			
	}
  }
  
  function addBrands(DBTable, TFields, allBrandsList) {	
  	var isDup;
  	var itemsToAdd = new Array;		
	var itemsToDelete = new Array;		
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
	
	for(var brand in allBrandsList){
		isDup = false;
		var src = allBrandsList[brand];
		if(brandsCatalog.length != 0){
			for(var itemIn in brandsCatalog){
				if(!isDup){
					var itemInSrc = brandsCatalog[itemIn];
					if(itemInSrc.Brand == src.brand){
						isDup = true;				
					}
				}				
			}
			if(!isDup){
				var thisBrand = new Array(src.brand);							
				itemsToDelete.push(thisBrand);	
			}
		}else{
			var thisBrand = new Array(src.brand);		
			itemsToDelete.push(thisBrand);		
		}
	}
	
	if(itemsToDelete.length!=0) {
		for(newItem in itemsToDelete){
			var thisNew = itemsToDelete[newItem];
			localDataStorage.webdb.getAllBrandsList(DBTable, thisNew[0],localDataStorage.webdb.onSuccess,localDataStorage.webdb.onError);
		}
	}
	
	if(itemsToAdd.length != 0){
		for(newItem in itemsToAdd){
			var thisNew = itemsToAdd[newItem];
			localDataStorage.webdb.addNewItem(DBTable, TFields, thisNew,localDataStorage.webdb.onSuccess,localDataStorage.webdb.onError);
		}
	}
  }
//Ends Data Aggregation

// Begins PDF Report creation
//PDF generator
function CreatePDF(){
		var doc = new jsPDF('landscape');
		doc.setFontSize(16);
		var positionX = 5;
		var positionY = 35;
		var rectW = 47;
		var rectH = 7;
		doc.rect(5, 10, 282, 25);
		doc.text(10, 15, 'Cotización');
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
			var valueUnForm = this.innerHTML;
			var valueDisp = "";
			if(this.attributes.name.nodeValue == "price"){
				var cur = valueUnForm.replace("Precio: ", "");
				valueDisp += "Precio: $";
				valueDisp += toCurrency(cur);
			}else{
				valueDisp += valueUnForm;
				}
			thirdBlock += valueDisp + "  ";							 
		});	
		doc.text(10, 30, thirdBlock);	
		
		$('#GeneratedHeaderContainer h5').each(function () {
			var header = "";
			header += this.innerHTML;
			doc.setDrawColor(0);
			doc.setFillColor(100,100,100);
			doc.rect(positionX, positionY, rectW, rectH, 'FD');
			doc.text(positionX + 2, positionY + 5, header);
			positionX = positionX + rectW;							 
		});
		var counter = 0;
		$('#GeneratedDataContainer .rowCont').each(function () {
			if(counter == 22){
				doc.addPage();
				positionY = 5;
			}
			positionX = 5;
			positionY = positionY + rectH;
			$(this).children().children().children("p").each(function () {							
						var content = "";
						var valueDisp = "";
						content += this.innerHTML;
						if(this.className != "payment"){
							valueDisp += "$";
							valueDisp += toCurrency(content);
						}else{
							valueDisp += content;
						}
						doc.rect(positionX, positionY, rectW, rectH);
						doc.text(positionX + 2, positionY + 5, valueDisp);
						positionX = positionX + rectW;
			});
			counter++;					 
		});
		doc.output('save');
}
// Currency formater
function toCurrency(cnt){
    cnt = cnt.toString().replace(/\$|\,/g,'');
    if (isNaN(cnt))
        return 0;    
    var sgn = (cnt == (cnt = Math.abs(cnt)));
    cnt = Math.floor(cnt * 100 + 0.5);
    cvs = cnt % 100;
    cnt = Math.floor(cnt / 100).toString();
    if (cvs < 10)
    cvs = '0' + cvs;
    for (var i = 0; i < Math.floor((cnt.length - (1 + i)) / 3); i++)
        cnt = cnt.substring(0, cnt.length - (4 * i + 3)) + ',' + cnt.substring(cnt.length - (4 * i + 3));
    return (((sgn) ? '' : '-') + cnt + '.' + cvs);
}
// Ends PDF Report creation
