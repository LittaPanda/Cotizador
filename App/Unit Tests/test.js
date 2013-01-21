test( "Data Base name is empty",function() {
	
	ok(DataBaseOpen(""), "Passed!" );
});

test( "Data Base name is not empty",function() {
	
	ok(DataBaseOpen("Data")==true, "Passed!" );
});




function DataBaseOpen(dataBaseName)
{
	localDataStorage.webdb.open(dataBaseName,"","");
	return true;
}

