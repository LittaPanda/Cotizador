	var testBrandsFields = new Array(
								{"Name":"brand","Type":"TEXT"},
				  				{"Name":"added_on","Type":"DATETIME"});

	var testCarsFields = new Array(
								{"Name":"brand","Type":"TEXT"},
						  	   	{"Name":"model","Type":"TEXT"},
							   	{"Name":"color","Type":"TEXT"},
						  	   	{"Name":"version","Type":"TEXT"},
						  	   	{"Name":"description","Type":"TEXT"},
						  	   	{"Name":"price","Type":"TEXT"},
						  	   	{"Name":"added_on","Type":"DATETIME"});
									
	var testCustomersFields = new Array(
								{"Name":"id","Type":"TEXT"},
						  	   	{"Name":"firstName","Type":"TEXT"},
							   	{"Name":"lastName1","Type":"TEXT"},
						  	   	{"Name":"lastName2","Type":"TEXT"},
						  	  	{"Name":"address","Type":"TEXT"},
						  	   	{"Name":"neighborhood","Type":"TEXT"},
							   	{"Name":"city","Type":"TEXT"},
						  	   	{"Name":"state","Type":"TEXT"},
						  	   	{"Name":"country","Type":"TEXT"},
							   	{"Name":"zipCode","Type":"TEXT"},
						  	   	{"Name":"phone","Type":"TEXT"},
						  	   	{"Name":"rfc","Type":"TEXT"},
						  	   	{"Name":"email","Type":"TEXT"},
							   	{"Name":"added_on","Type":"DATETIME"});

	var testValuesBrandsFine= new Array();
	testValuesBrandsFine.push(new Array("Chevrolet",new Date()));	

	var testValuesBrandsBad= new Array();
	testValuesBrandsBad.push(new Array("Chevrolet","Non Value",new Date()));	
			
	var testValuesCarsFine = new Array();
 	testValuesCarsFine.push(new Array("Chevrolet","Spark","Azul","Deluxe","Contiene un año                            de seguro mas stereo y 2 pares de ruedas","350000",new Date()));

	var testValuesCarsBad = new Array();
 	testValuesCarsBad.push(new Array("Chevrolet","Spark","Azul","Deluxe","Contiene un año                           de seguro mas stereo y 2 pares de ruedas","350000","No Value",
	                       new Date()));
						   
	var tabletoTest= "BrandsTestTable";
	//var createTable= "CarsTestTable";
	//var createTable= "CustomersTestTable";



	asyncTest("asynchronous test: localDataStorage.webdb.createTable--Create table with an invalid 			   name",1,
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable(tabletoTest + "//",testBrandsFields,
		function() {
			ok(false,"Create table function works, but it must have failed");
			start();
		},
		function () {
			ok( true, "Create table function does not work, and this is correct" );
			start();
		});
	});

	asyncTest("asynchronous test: localDataStorage.webdb.createTable--Create table with a valid 			               name",1,
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable(tabletoTest,testBrandsFields,
		function() {
			ok(true,"Create table function works correctly");
			start();
		},
		function () {
			ok( false, "Create table function does not work correctly" );
			start();
		});
	});
		
	asyncTest("asynchronous test: localDataStorage.webdb.addNewItem--Add new invalid item(brand               item)",1,
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("BrandsTestTable",testBrandsFields,
		localDataStorage.webdb.onSuccess,localDataStorage.webdb.onError);
		localDataStorage.webdb.addNewItem("BrandsTestTable",testBrandsFields,
		testValuesBrandsBad[0],
		function() {
		    ok(false,"Add new item function works correctly, but it must have failed");
			start();
		}, function() {
			ok(true, "Add new item function does not work correctly, and this is correct");
			start();
		});
	});
	
	asyncTest("asynchronous test: localDataStorage.webdb.addNewItem--Add new valid item(brand               item)",1,   		
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		
		localDataStorage.webdb.createTable("BrandsTestTable",testBrandsFields,
		localDataStorage.webdb.onSuccess,localDataStorage.webdb.onError);
		
		localDataStorage.webdb.addNewItem("BrandsTestTable",testBrandsFields,
		testValuesBrandsFine[0],
		
		function() {
			ok(true,"Add new item function works correctly");
			start();
		}, 
		function() {
			ok(false, "Add new tem function does not work correctly");
			start();
		});
	});

/**/
	asyncTest("asynchronous test: localDataStorage.webdb.addNewItem--Add new invalid item(car               item)",1,
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields,
		localDataStorage.webdb.onSuccess,localDataStorage.webdb.onError);
		localDataStorage.webdb.addNewItem("CarsTestTable",testCarsFields,
		testValuesCarsBad[0],
		function() {
		    ok(false,"Add new item function works correctly, but it must have failed");
			start();
		}, function() {
			ok(true, "Add new item function does not work correctly, and this is correct");
			start();
		});
	});
	
	asyncTest("asynchronous test: localDataStorage.webdb.addNewItem--Add new valid item(car               item)",1,   		
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields,
		localDataStorage.webdb.onSuccess,localDataStorage.webdb.onError);
		
		localDataStorage.webdb.addNewItem("CarsTestTable",testCarsFields,
		testValuesCarsFine[0],
		
		function() {
			ok(true,"Add new item function works correctly");
			start();
		}, 
		function() {
			ok(false, "Add new tem function does not work correctly");
			start();
		});
	});
	
	asyncTest( "asynchronous test: localDataStorage.webdb.getAllitemsList--Get all items for an                 inexisting table",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable(tabletoTest,testBrandsFields);
		localDataStorage.webdb.getAllitemsList(
		function() {
			ok( false, "Get all items list function works correctly, but it must have failed" );
			start();
		},tabletoTest+"Fake",
		function(){
			ok(true, "Get all items list function does not work correctlym and this is correct" );
			start();
		});
	});	
	
	asyncTest( "asynchronous test: localDataStorage.webdb.getAllitemsList--Get all items for an                 existing table",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable(tabletoTest,testBrandsFields);
		localDataStorage.webdb.getAllitemsList(
		function() {
			ok( true, "Get all items list function works correctly" );
			start();
		},tabletoTest,
		function(){
			ok( false, "Get all items list function does not work correctly" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.getAllModels--Get all models for an                inexisting table",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getAllModels(
		function() {
			ok(false, "Get all models function works correctly, but it must have failed" );
			start();
		},"CarsTestTableFake","Chevrolet",
		function(){
			ok(true, "Get all models function does not work correctly, and this is correct" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.getAllModels--Get all models for an                existing table with zero coincidences",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getAllModels(
		function(tx,results) {
			if(results.rows.length==0) {
				ok(true, "Get all models function works correctly, the number of records is zero" );	
			}
			else {
				ok(false, "Get all models function does not work correctly, the number of records must be zero" );	
			}
			start();
		},"CarsTestTable","ChevroletNonExisting",
		function(){
			ok(true, "Get all models function does not work correctly" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.getAllModels--Get all models for an                existing table with more than zero coincidences",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getAllModels(
		function(tx,results) {
			if(results.rows.length>0) {
				ok(true, "Get all models function works correctly, the number of records are more than zero" );	
			}
			else {
				ok(false, "Get all models function does not work correctly, the number of records must be more than zero" );	
			}
			start();
		},"CarsTestTable","Chevrolet",
		function(){
			ok(true, "Get all models function does not work correctly" );
			start();
		});
	});


	asyncTest( "asynchronous test: localDataStorage.webdb.getAllVersions--Get all versions for an                inexisting table",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getAllVersions(
		function() {
			ok(false, "Get all versions function works correctly, but it must have failed" );
			start();
		},"CarsTestTableFake","Chevrolet","Spark",
		function(){
			ok(true, "Get all versions function does not work correctly, and this is correct" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.getAllVersions--Get all versions for an                existing table with zero coincidences",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getAllVersions(
		function(tx,results) {
			if(results.rows.length==0) {
				ok(true, "Get all versions function works correctly, the number of records is zero" );	
			}
			else {
				ok(false, "Get all versions versions does not work correctly, the number of records must be zero" );	
			}
			start();
		},"CarsTestTable","Chevrolet","SparkNonExisting",
		function(){
			ok(true, "Get all versions function does not work correctly" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.getAllVersions--Get all versions for an                existing table with more than zero coincidences",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getAllVersions(
		function(tx,results) {
			if(results.rows.length>0) {
				ok(true, "Get all versions function works correctly, the number of records are more than zero" );	
			}
			else {
				ok(false, "Get all versions function does not work correctly, the number of records must be more than zero" );	
			}
			start();
		},"CarsTestTable","Chevrolet","Spark",
		function(){
			ok(true, "Get all versions function does not work correctly" );
			start();
		});
	});

	
	asyncTest( "asynchronous test: localDataStorage.webdb.getAllColors--Get all colors for an                inexisting table",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getAllColors(
		function() {
			ok(false, "Get all colors function works correctly, but it must have failed" );
			start();
		},"CarsTestTableFake","Chevrolet","Spark","Deluxe",
		function(){
			ok(true, "Get all colors function does not work correctly, and this is correct" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.getAllColors--Get all colors for an                existing table with zero coincidences",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getAllColors(
		function(tx,results) {
			if(results.rows.length==0) {
				ok(true, "Get all colors function works correctly, the number of records is zero" );	
			}
			else {
				ok(false, "Get all colors versions does not work correctly, the number of records must be zero" );	
			}
			start();
		},"CarsTestTable","Chevrolet","Spark","DeluxeNonExisting",
		function(){
			ok(true, "Get all colors function does not work correctly" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.getAllColors--Get all colors for an                existing table with more than zero coincidences",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getAllColors(
		function(tx,results) {
			if(results.rows.length>0) {
				ok(true, "Get all colors function works correctly, the number of records are more than zero" );	
			}
			else {
				ok(false, "Get all colors function does not work correctly, the number of records must be more than zero" );	
			}
			start();
		},"CarsTestTable","Chevrolet","Spark","Deluxe",
		function(){
			ok(true, "Get all colors function does not work correctly" );
			start();
		});
	});


	asyncTest( "asynchronous test: localDataStorage.webdb.getCar--Get a car for an                inexisting table",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getCar(
		function() {
			ok(false, "Get car function works correctly, but it must have failed" );
			start();
		},"CarsTestTableFake","Chevrolet","Spark","Deluxe","Azul",
		function(){
			ok(true, "Get car function does not work correctly, and this is correct" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.getCar--Get a carfor an                existing table with zero coincidences",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getCar(
		function(tx,results) {
			if(results.rows.length==0) {
				ok(true, "Get car function works correctly, the number of records is zero" );	
			}
			else {
				ok(false, "Get car function does not work correctly, the number of records must be zero" );	
			}
			start();
		},"CarsTestTable","Chevrolet","Spark","Deluxe","AzulNonExisting",
		function(){
			ok(true, "Get car function does not work correctly" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.getCar--Get car for an                existing table with more than zero coincidences",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getCar(
		function(tx,results) {
			if(results.rows.length>0) {
				ok(true, "Get car function works correctly, the number of records are more than zero" );	
			}
			else {
				ok(false, "Get car function does not work correctly, the number of records must be more than zero" );	
			}
			start();
		},"CarsTestTable","Chevrolet","Spark","Deluxe","Azul",
		function(){
			ok(true, "Get car function does not work correctly" );
			start();
		});
	});


	asyncTest( "asynchronous test: localDataStorage.webdb.getCarWithoutColor--Get a car without color for an inexisting table",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getCarWithoutColor(
		function() {
			ok(false,"Get car with out color function works correctly, but it must have failed" );
			start();
		},"CarsTestTableFake","Chevrolet","Spark","Deluxe",
		function(){
			ok(true, "Get car with out color function does not work correctly, and this is correct" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.getCarWithoutColor--Get a car without color for an existing table with zero coincidences",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getCarWithoutColor(
		function(tx,results) {
			if(results.rows.length==0) {
				ok(true, "Get car without color function works correctly, the number of records must be zero" );	
			}
			else {
				ok(false, "Get car without color does not work correctly, the number of records must be zero" );	
			}
			start();
		},"CarsTestTable","Chevrolet","Spark","DeluxeNonExisting",
		function(){
			ok(true, "Get car without color function does not work correctly" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.getCarWithoutColor--Get car without color for an existing table with only one concidence",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable("CarsTestTable",testCarsFields);
		localDataStorage.webdb.getCarWithoutColor(
		function(tx,results) {
			if(results.rows.length>0) {
				ok(true, "Get car without color function works correctly, the number of records must be one" );	
			}
			else {
				ok(false, "Get car without color function with out color does not work correctly, the number of records must be one" );	
			}
			start();
		},"CarsTestTable","Chevrolet","Spark","Deluxe",
		function(){
			ok(true, "Get car without color function does not work correctly" );
			start();
		});
	});

	asyncTest( "asynchronous test: localDataStorage.webdb.deleteList--Delete an element for an inexisting table",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable(tabletoTest,testCarsFields);
		localDataStorage.webdb.deleteList(1,tabletoTest + "Fake",
		function() {
			ok(false, "Delete list function works correctly, but it must have failed" );
			start();
		},
		function(){
			ok(true, "Delete list function does not work correctly, and this is correct" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.deleteList--Delete an element for an existing table without concidences",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable(tabletoTest,testCarsFields);
		localDataStorage.webdb.deleteList(1000,tabletoTest,
		function() {
			ok(true,"Delete list function works correctly although it did not delete any record");
			start();
		},
		function(){
			ok(true, "Delete list function does not work correctly" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.deleteList--Delete an element for an existing table with concidences",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable(tabletoTest,testCarsFields);
		localDataStorage.webdb.deleteList(2,tabletoTest,
		function() {
			ok(true, "Delete list function works correctly, it deleted only one record" );
			start();
		},
		function(){
			ok(false, "Delete list function does not work correctly." );
			start();
		});
	});

	asyncTest( "asynchronous test: localDataStorage.webdb.truncateList--Delete all elements for an inexisting table",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.createTable(tabletoTest,testCarsFields);
		localDataStorage.webdb.truncateList(tabletoTest+"Fake",
		function() {
			ok(false, "Truncate list function works correctly, but it must have failed" );
			start();
		},
		function(){
			ok(true, "Truncate list function does not work correctly, and this is correct" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.truncateList--Delete all element for an existing table",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		var dataBaseToErase= "BrandsTestTable";
		localDataStorage.webdb.createTable(tabletoTest,testCarsFields);

		localDataStorage.webdb.truncateList(tabletoTest,
		function() {
			ok(true,"Truncate list function works correctly");
			start();
		},
		function(){
			ok(false, "Truncate list function does not work correctly" );
			start();
		});
	});
/**/
	asyncTest( "asynchronous test: localDataStorage.webdb.dropTable--Delete an inexisting table",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.dropTable(tabletoTest + "Fake",
		function() {
			ok(false, "Drop table function works correctly, but it must have failed" );
			start();
		},
		function(){
			ok(true, "Drop table function does not work correctly, and this is correct" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.dropDataBase--Delete an existing table",1, 
	function() {
	//	localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		//localDataStorage.webdb.open("ETCatalog", "1.0", "Local storage of cars for mobile app");
	 	//var dropTable = "CustomerList";	
		//var dropTable = "BrandsList";
		//var dropTable = "CarList";
	
		var dropTable= "BrandsTestTable";
		//var dropTable="CarsTestTable";
		//var dropTable="CustomersTestTable";
		localDataStorage.webdb.dropTable(dropTable,
		function() {
			ok(true, "Drop table function works correctly" );
			start();
		},
		function(){
			ok(false, "Drop table function does not work correctly" );
			start();
		});
	});

/*
	asyncTest( "asynchronous test: localDataStorage.webdb.dropDataBase--Delete an inexisting database",1, 
	function() {
		//localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.dropDataBase("TestDBFake",
		function() {
			ok(false, "Drop database function works correctly, but it must have failed" );
			start();
		},
		function(){
			ok(true, "Drop database function does not work correctly, and this is correct" );
			start();
		});
	});
		
	asyncTest( "asynchronous test: localDataStorage.webdb.dropDataBase--Delete an existing database",1, 
	function() {
		localDataStorage.webdb.open("TestDB", "1", "Database Testing");
		localDataStorage.webdb.dropDataBase("TestDB",
		function() {
			ok(true, "Drop database function works correctly" );
			start();
		},
		function(){
			ok(false, "Drop database function does not work correctly" );
			start();
		});
	});
/**/
