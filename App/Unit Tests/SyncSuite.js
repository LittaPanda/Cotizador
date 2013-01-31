test("Create or open Database: Database name is empty",function() {
	ok(DataBaseOpen("")==false, "Database name is empty.");
});

test("Create or open Database: Database name is not empty",function() {
	ok(DataBaseOpen("TestDataBase")==true, "Database name is not empty");
});

//test("Create or open table: Table name is incorrect",function() {
//	setTimeout(function()
	//	{
//			var h = CreatedTable("BrandsList//");
		//	ok(CreatedTable("BrandsList\\")==false,"The creation of the table was failed");
	//		start();
		//	stop(1000);
		//},1000);
	//	CreatedTable("BrandsList//");
//	});


/*************************************/
/*asyncTest("Create or open table: Table name is correct",function() {
	setTimeout(function()
		{					
			CreatedTable("BrandsList//")
			ok(true,"Assert");
			start();
		},1000);
	});

/*************************************/


/*asyncTest("Create or open table: Table name is correct",function() {
expect(1);
	setTimeout(function()
		{

						
			CreatedTable("BrandsList")
			ok(true,"s");
			start();
		},1000);
	});
*/
/*asyncTest("Add/Delete brands: Database length is equals to Server length and both contain only diferent values",function() {
//	expect(3);
		var brands =  
			[{"Brand":"ChevroletTest"},
			 {"Brand":"NissanTest"},
			 {"Brand":"VolkswagenTest"}];
		
	setTimeout(function()
		{ 	
			AddItems(brands);
			start();
		},1000);
	});*/

/*asyncTest("Add/Delete brands: Database length is equals to Server length and both contain one or more values equal(not all)",function() {
	//expect(2);
	var brands =  
		[{"Brand":"Chevrolet"},
 		 {"Brand":"NissanTest"},
 	     {"Brand":"VolkswagenTest"}];
			
	setTimeout(function()
		{ 
			AddItems(brands);
			start();
		},1000);
	});

asyncTest("Add/Delete brands: Database length is equals to Server length and both contain equals values",function() {
	expect(0);
	var brands =  
		[{"Brand":"Chevrolet"},
 		 {"Brand":"Nissan"},
		 {"Brand":"Volkswagen"}];
		 			
	setTimeout(function()
		{ 
			AddItems(brands);
			start();
		},1000);
	});

asyncTest("Add/Delete brands: Database length is smaller than Server length and both contain only different values",function() {

	var brands =  
		[{"Brand":"ChevroletTest"},
 		 {"Brand":"NissanTest"}];
			
	setTimeout(function()
		{ 
			AddItems(brands);
			start();
		},1000);
	});

asyncTest("Add/Delete brands: Database length is smaller than Server length and both contain one or more equals values(not all)",function() {
//	expect(2);
	var brands =  
		[{"Brand":"Chevrolet"},
 		 {"Brand":"NissanTest"}];
			
	setTimeout(function()
		{ 
			AddItems(brands);
			start();
		},1000);
	});

asyncTest("Add/Delete brands: Database length is smaller than Server length and both congtain all equals values",function() {
	var brands =  
		[{"Brand":"Chevrolet"},
 		 {"Brand":"Nissan"}];
		 			
	setTimeout(function()
		{ 
			AddItems(brands);
			start();
		},1000);
	});

asyncTest("Add/Delete brands: Database length is bigger than Server length and both contain all diferent values.",function() {
	//expect(3);
	var brands =  
		[{"Brand":"ChevroletTest"},
 		 {"Brand":"NissanTest"},
		 {"Brand":"VolkswagenTest"},
		 {"Brand":"ToyotaTest"}];
			
	setTimeout(function()
		{ 
			AddItems(brands);
			start();
		},1000);
	});

asyncTest("Add/Delete brands: Database length is bigger than Server length and both one or more equals values(not all).",function() {
//	expect(2);
	var brands =  
		[{"Brand":"Chevrolet"},
 		 {"Brand":"NissanTest"},
		 {"Brand":"VolkswagenTest"},
		 {"Brand":"ToyotaTest"}];
		 			
	setTimeout(function()
		{ 
			AddItems(brands);
			start();
		},1000);
	});



asyncTest("Add/Delete brands: Database length is bigger than Server length and both contain all equals values.",function() {
expect(0);
	var brands =  
		[{"Brand":"Chevrolet"},
 		 {"Brand":"Nissan"},
		 {"Brand":"Volkswagen"},
		 {"Brand":"Toyota"}];
		 			
	setTimeout(function()
		{ 
			AddItems(brands);
			start();
		},1000);
	});
*/


function DataBaseOpen(dataBaseName)
{
	return localDataStorage.webdb.open(dataBaseName,"","");
}

/*function CreatedTable(tableName)
{
	DataBaseOpen("TestDataBase");
	var fields = new Array({"Name":"brand","Type":"TEXT"}
				  					,{"Name":"added_on","Type":"DATETIME"});
return	 localDataStorage.webdb.createTable(tableName,fields);
}

function AddItems(brands)
{
DataBaseOpen("TestDataBase");
var fields = new Array({"Name":"brand","Type":"TEXT"}
				  					,{"Name":"added_on","Type":"DATETIME"});


	return addBrands("BrandsList", fields, brands); 
}	*/