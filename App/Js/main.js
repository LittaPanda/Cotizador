// Verificación de nuevos cambios en el servidor
window.addEventListener('load', function(e) {
	 window.applicationCache.addEventListener('updateready', function(e) {
		if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
		  window.applicationCache.swapCache();
		  window.location.reload();
		} else {
		  // El manifiesto no cambio. No hay nada nuevo.
		}
	  }, false);
}, false);
