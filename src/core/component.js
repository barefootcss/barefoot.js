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