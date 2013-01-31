test("Create or open Database: Database name is empty",function() {
	ok(DataBaseOpen("")==false, "Database name is empty.");
});

test("Create or open Database: Database name is not empty",function() {
	ok(DataBaseOpen("TestDataBase")==true, "Database name is not empty");
});

function DataBaseOpen(dataBaseName)
{
	return localDataStorage.webdb.open(dataBaseName,"","");
}

