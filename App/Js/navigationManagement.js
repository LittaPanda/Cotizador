// Implementación de [jQuery Mobile and Dynamic Page Generation]
function showBrands( urlObj, options )
{
	var pageSelector = urlObj.hash.replace( /\?.*$/, "" );

	var $page = $( pageSelector ),
		$header = $page.children( ":jqmData(role=header)" ),
		$content = $page.children( ":jqmData(role=content)" ),
		markup = loadBrands();

	$page.page();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options );
}

function showModels( urlObj, options )
{
	var brand = urlObj.hash.replace(/.*data=/,''),
		pageSelector = urlObj.hash.replace( /\?.*$/, "" );

	var $page = $( pageSelector ),
		$header = $page.children( ":jqmData(role=header)" ),
		$content = $page.children( ":jqmData(role=content)" ),
		markup = loadModels(brand);

	$page.page();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options );
}

function showDetail( urlObj, options )
{
	var carData = urlObj.hash.replace(/.*data=/,'').split('&'),
		pageSelector = urlObj.hash.replace( /\?.*$/, "" );
		var defaultItem = new Array;
		for(car in defaultCatalog){
			var thisItem = defaultCatalog[car];
			if(thisItem.Brand == carData[0] && thisItem.Model == carData[1]){
				defaultItem.push(thisItem);
			}
		}
	var $page = $( pageSelector ),
		$header = $page.children( ":jqmData(role=header)" ),
		$content = $page.children( ":jqmData(role=content)" ),
		markup = loadDetail(carData[0], carData[1], defaultItem[0].Version, defaultItem[0].Color );

	$page.page();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options );
}

function showPopup( urlObj, options )
{
	var pageSelector = urlObj.hash.replace( /\?.*$/, "" );

	var $page = $( pageSelector ),
		$header = $page.children( ":jqmData(role=header)" ),
		$content = $page.children( ":jqmData(role=content)" ),
		markup = renderPopup();

	$page.page();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options );
}

function showReport( urlObj, options )
{
	var pageSelector = urlObj.hash.replace( /\?.*$/, "" );

	var $page = $( pageSelector ),
		$header = $page.children( ":jqmData(role=header)" ),
		$content = $page.children( ":jqmData(role=content)" ),
		markup = renderReport();

	$page.page();
	options.dataUrl = urlObj.href;
	$.mobile.changePage( $page, options );
}

$(document).bind( "pagebeforechange", function( e, data ) {
	if ( typeof data.toPage === "string" ) {
		var u = $.mobile.path.parseUrl( data.toPage ),
			apphome = /^#AppHome/,
			brands = /^#BrandsPage/,
			models = /^#ModelsPage/,
			detail = /^#DetailPage/,
			popup = /^#PopupPage/,
			reportP = /^#ReportPage/;
		if ( u.hash.search(apphome) !== -1 ) {
			//showDetail( u, data.options );
			//e.preventDefault();
		}
		if ( u.hash.search(brands) !== -1 ) {
			showBrands( u, data.options );
			e.preventDefault();
		}
		if ( u.hash.search(models) !== -1 ) {
			showModels( u, data.options );
			e.preventDefault();
		}
		if ( u.hash.search(detail) !== -1 ) {
			showDetail( u, data.options );
			e.preventDefault();
		}		
		if ( u.hash.search(popup) !== -1 ) {
			showPopup( u, data.options );
			e.preventDefault();
		}
		if ( u.hash.search(reportP) !== -1 ) {
			showReport( u, data.options );
			e.preventDefault();
		}
	}
});