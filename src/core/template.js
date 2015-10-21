/* ==========================================================================
   #template
   ========================================================================== */

/**
 * The template function returns a handle bar string as plain text.
 */

function template(content, values) {

    return content.replace(/{{(.+?)}}/g, function(match, prop) {

        return prop.split('.').reduce(function(obj, key) {
        
            return obj[key];
        
        }, values);

    });

}

// 
// @public
// ========================================================================== */

barefoot.template = template;