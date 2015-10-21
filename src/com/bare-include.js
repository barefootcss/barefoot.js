/* ==========================================================================
   #bare-include
   ========================================================================== */

/**
 * The include component includes content from another page.
 */

new barefoot.component({

	element: function(el) {

		barefoot.http.get(el.attr('data-bare-include'), '').then(function(text) {

			el.html(text);

		});

	}

}).render('data-bare-include');