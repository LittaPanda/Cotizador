// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
$(document).ready(function(e) {
    $('#StartButton').click(function(){
		var typeList = "Brands";
		loadBrands(typeList);
		});
	$('.brandLink').live('click' , function(){
		var brand = this.id;
		var typeList = "Models";
		loadModels(typeList, brand);
	});
	$('.modelLink').live('click' , function(){
		var brand = this.name;
		var model = this.id;
		loadDetail(brand, model, "Standar", "Rosa");
	});
	//$('#PopupButton').live('click',function(){
//		$('#PopupPage').bind({ create: function(event,ui){
//			renderPopup();
//		}
//		}).dialog("open");
//	});
});