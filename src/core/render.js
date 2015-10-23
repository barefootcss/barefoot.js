/* ==========================================================================
   #render
   ========================================================================== */

/**
 * Traverse the document for a data-attribute, and render a component.
 */

function render(component, da) { 

	var els = document.querySelectorAll('[' + da + ']');

/* 
   iterate
   ========================================================================== */

/**
 * Loop through the matches and run them against the settings.
 */

	Array.prototype.forEach.call(els, function(el) {

/* 
   #content
   ========================================================================== */

/**
 * The content setting replaces the innerHTML with a string. 
 */

      if (component.prop.content) {
         
         el.innerHTML = component.prop.content;

      }

/* 
   #include
   ========================================================================== */

/**
 * The include setting replaces the innerHTML with a include. 
 */

      if (component.prop.include) {
   
         barefoot.http.get(component.prop.include, '').then(function(html) {

            el.innerHTML = render(html, component.prop.data);

         }); 

      }

/* 
   #element
   ========================================================================== */

/**
 * The element setting passes matches and data to a function. 
 */

      if (component.prop.element) {

         component.prop.element(new query(el), component.prop.data);   
           
      }

/* 
   template
   ========================================================================== */

/**
 * Replace the handle bars string with the data setting's properties. 
 */

      if (component.prop.data) {
         
         el.innerHTML = template(el.innerHTML, component.prop);

      }

	});

}

// 
// @public
// ========================================================================== */

barefoot.render = render;
