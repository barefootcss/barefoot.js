/* ==========================================================================
   #bare-cloak
   ========================================================================== */

/**
 * The cloak component hides content until the page is loaded.
 */

new barefoot.component({

	element: function(el) {

		//
		// Make sure to include the barefoot.js stylesheet.
		//

		el.removeAttr('data-bare-cloakd');
	}

}).render('data-bare-cloak');