// Implementación de [jQuery Mobile and Dynamic Page Generation]

function showDetail( urlObj, options )
{
	var carData = urlObj.hash.replace(/.*data=/,'').split('&'),
		pageSelector = urlObj.hash.replace( /\?.*$/, "" );

	var $page = $( pageSelector ),
		$header = $page.children( ":jqmData(role=header)" ),
		$content = $page.children( ":jqmData(role=content)" ),
		markup = loadDetail(carData[0], carData[1], carData[2], carData[3]);

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

$(document).bind( "pagebeforechange", function( e, data ) {
	if ( typeof data.toPage === "string" ) {
		var u = $.mobile.path.parseUrl( data.toPage ),
			detail = /^#DetailPage/,
			popup = /^#PopupPage/;
		if ( u.hash.search(detail) !== -1 ) {
			showDetail( u, data.options );
			e.preventDefault();
		}
		
		if ( u.hash.search(popup) !== -1 ) {
			showPopup( u, data.options );
			e.preventDefault();
		}
	}
});