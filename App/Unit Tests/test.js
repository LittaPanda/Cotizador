test( "Database name",function() {
	ok(DataBaseOpen("")==false, "Database is empty.");
	ok(DataBaseOpen("TestDataBase")==true, "Database name is not empty");
});

asyncTest("Create Table",function() {
	setTimeout(function()
		{
			CreatedTable();
			start();
		},1000);
	});

asyncTest("Add Items",function() {
	setTimeout(function()
		{
			AddItems();
			start();
		},1000);
	});


function DataBaseOpen(dataBaseName)
{
	return localDataStorage.webdb.open(dataBaseName,"","");
}

function CreatedTable()
{
	DataBaseOpen("TestDataBase");
	var fields = new Array({"Name":"brand","Type":"TEXT"}
				  					,{"Name":"added_on","Type":"DATETIME"});
	localDataStorage.webdb.createTable("BrandsList",fields);
}

function AddItems()
{
DataBaseOpen("TestDataBase");
var fields = new Array({"Name":"brand","Type":"TEXT"}
				  					,{"Name":"added_on","Type":"DATETIME"});
var brandsCatalog =  
[{"Brand":"Chevrolet"},
 {"Brand":"Nissan"},
 {"Brand":"Volkswagen"}
];

addBrands("BrandsList", fields, brandsCatalog); 
}
