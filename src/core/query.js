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
   #index
   ========================================================================== */

query.prototype.index = function(index) {

	//
	// TODO
	//

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
