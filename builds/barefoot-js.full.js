// jshint unused: false

/* ==========================================================================
   #GLOBALS
   ========================================================================== */

/**
 * Global declarations.
 */

 var barefoot;

/* ==========================================================================
   #INTRO
   ========================================================================== */

/**
 * Begin the module enclosure. 
 */

(function (barefoot) {
/* ==========================================================================
   #component
   ========================================================================== */

/**
 * The component class is used to create reusable components. 
 */

var component = function(prop) {

	this.prop = prop;

};

/* 
   #render
   ========================================================================== */

/**
 * The render function renders a component inside a container. 
 */

component.prototype.render = function(da, cb) {

	barefoot.render(this, da, cb);

	return this;
};

// 
// @public
// ========================================================================== */

barefoot.component = component;
/* ==========================================================================
   #http
   ========================================================================== */

/**
 * The http namespace provides ajax helper functions.
 */

var http = {};

/* 
   http.request
   ========================================================================== */

/**
 * Perform a request with any type of http method.
 */

http.request = function (method, url, data) {
    var backend = new window.XMLHttpRequest();
    backend.open(method, url, true);
    return {
        then: function (success, failure) {
            backend.onreadystatechange = function () {
                if (backend.readyState == 4) {
                    if (backend.status == 200) {
                        success(backend.responseText);
                    }
                    else {
                        failure(backend.statusText);
                    }
                }
            };
            backend.send(data);
        }
    };
};

/* 
   http.get
   ========================================================================== */

/**
 * Perform a request with the 'get' http method.
 */

http.get = function (url, data) {
    return {
        then: function (success, failure) {
            http.request('GET', url, data).then(success, failure);
        }
    };
};

/* 
   http.post
   ========================================================================== */

/**
 * Perform a request with the 'post' http method.
 */

http.post = function (url, data) {
    return {
        then: function (success, failure) {
            http.request('POST', url, data).then(success, failure);
        }
    };
};

// 
// @public
// ========================================================================== */

barefoot.http = http;
/* ==========================================================================
   #query
   ========================================================================== */

/**
 * The query class wraps elements in a light dom manipulation helper. 
 */


var query = (function() {
	
	function query(selector, context) {

		if (context === void 0) {

			context = document;

		}

		this.els = (selector.substring) ? context.querySelectorAll(selector) : [selector];
	
	}

	return query;

})();

//
// TRAVERSING
//

/* 
   #each
   ========================================================================== */

query.prototype.each = function(cb) {

	Array.prototype.forEach.call(this.els, function(el, index) {

		cb(el, index);

	});

	return this;

};

/* 
   #eq
   ========================================================================== */

query.prototype.eq = function(index) {

	return new query(this.els[index]);

};

/* 
   #first
   ========================================================================== */

query.prototype.first = function(selector) {

	return new query(this.els[0]);

};

/* 
   #last
   ========================================================================== */

query.prototype.last = function(selector) {

	return new query(this.els[this.els.length - 1]);

};

/* 
   #find
   ========================================================================== */

query.prototype.find = function(selector) {

	return new query(selector, this.els[0]);

};

/* 
   #next
   ========================================================================== */

query.prototype.next = function() {
	
	return new query(this.els[0].nextElementSibling);

};

/* 
   #parent
   ========================================================================== */

query.prototype.parent = function() {

	return new query(this.els[0].parentNode);

};

//
// MANIPULATION
//

/* 
   #html
   ========================================================================== */

query.prototype.html = function(value) {

	if(value) {

		this.each(function(el) {

			el.innerHTML = value;

		});

		return this;
	}

	return this.els[0].innerHTML;

};

/* 
   #text
   ========================================================================== */

query.prototype.text = function(value) {

	if(value) {

		this.each(function(el) {

			el.innerText = value;

		});

		return this;
	}

	return this.els[0].innerText;

};

/* 
   #attr
   ========================================================================== */

query.prototype.attr = function(name, value) {

	if(value) {

		this.each(function(el) {

			el.setAttribute(name, value);

		});

		return this;
	}

	return this.els[0].getAttribute(name);

};

/* 
   #removeAttr
   ========================================================================== */

query.prototype.removeAttr = function(name) {

	if(name) {

		this.each(function(el) {

			el.removeAttribute(name);

		});
	}

	return this;

};

/* 
   #value
   ========================================================================== */

query.prototype.value = function(value) {

	if(value) {

		this.each(function(el) {

			el.value = value;

		});

		return this;
	}

	return this.els[0].value;

};

/* 
   #style
   ========================================================================== */

query.prototype.style = function(name, value) {

	if(value) {

		this.each(function(el) {

			el.style[name] = value;

		});

		return this;
	}

	return this.els[0].style[name];

};

/* 
   #addClass
   ========================================================================== */

query.prototype.addClass = function(className) {

	this.each(function(el) {

        var result = !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));

        if (result === false) {

            el.className += ' ' + className;

        }

	});

	return this;

};

/* 
   #removeClass
   ========================================================================== */

query.prototype.removeClass = function(className) {

 	var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');

	this.each(function(el) {

		 el.className = el.className.replace(reg, ' ');

	});

	return this;

};

/* 
   #hasClass
   ========================================================================== */

query.prototype.hasClass = function(className) {

	return !!this.els[0].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));

};

/* 
   #append
   ========================================================================== */

query.prototype.append = function(el) {

	this.each(function(parent) {

		parent.appendChild(el);

	});

	return this;

};

/* 
   #prepend
   ========================================================================== */

query.prototype.prepend = function(el) {

  this.each(function(parent) {

    parent.insertBefore(el, parent.firstChild);

  });

  return this;

};

/* 
   query.before
   ========================================================================== */

query.prototype.before = function(html) {

	this.each(function(el) {

		el.insertAdjacentHTML("beforebegin", html);

	});

	return this;

};

/* 
   #after
   ========================================================================== */

query.prototype.after = function(html) {

	this.each(function(el) {

		el.insertAdjacentHTML("afterend", html);

	});

	return this;

};

/* 
   #empty
   ========================================================================== */

query.prototype.empty = function() {

	this.each(function(el) {

		el.innerHTML = '';

	});

	return this;

};

/* 
   #remove
   ========================================================================== */

query.prototype.remove = function() {

	this.each(function(el) {
		
		if(el.parentNode) {

			el.parentNode.removeChild(el);

		}

	});

};

/* 
   #on
   ========================================================================== */

query.prototype.on = function(event, cb) {

	this.each(function(el) {

		el.addEventListener(event, cb, false);

	});

	return this;

};

/* 
   #un
   ========================================================================== */

query.prototype.un = function(event, cb) {

	this.each(function(el) {

		el.removeEventListener(event, cb, false);

	});

	return this;

};

//
// EFFECTS
//

/* 
   #show
   ========================================================================== */

query.prototype.show = function() {

	this.each(function(el) {

		el.style.display='';

	});

	return this;

};

/* 
   #hide
   ========================================================================== */

query.prototype.hide = function() {

	this.each(function(el) {

		el.style.display = 'none';

	});

	return this;

};

//
// UTILITY
//

/* 
   #template
   ========================================================================== */

query.prototype.template = function(data) {

	this.each(function(el) {

		el.innerHTML = template(el.innerHTML, data);

	});

	return this;

};

// 
// @public
// ========================================================================== */

barefoot.query = query;

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

         component.prop.element(new query(el, component.prop.data));   
           
      }

/* 
   template
   ========================================================================== */

/**
 * Replace the handle bars string with the data setting's properties. 
 */

      if (component.prop.data) {
         
         el.innerHTML = template(el.innerHTML, component.prop.data);

      }

	});

}

// 
// @public
// ========================================================================== */

barefoot.render = render;

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
/* ==========================================================================
   #OUTRO
   ========================================================================== */

/**
 * End the module enclosure. 
 */

})(barefoot || (barefoot = {}));
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