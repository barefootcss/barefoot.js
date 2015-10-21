# Barefoot.js

Barefoot.js is a lightweight framework for building components. It traverses the DOM for custom data attributes and works its magic. The framework is 4KB because it does not extend the HTML5 vocabulary or "normalize" the page. In otherwords, your pages will be compliant and fast to load.

## Usage Instructions

Place all scripts after the closing body tag:

    <html>
        <body>
    
        </body>
    
        <script src="scripts/barefoot.min.js"></script>
        <script src="script/directives.min.js"></script>
    </html>

## Building a Component

### Data

The `data` setting can be used to pass a data object to a component. The values will replace any corresponding handle bar.

**example.html**

    <p data-example> Hello {{name}} </p>

**example.js**

    new barefoot.component({
        data: {
            name: 'World'
        }
    }).render('data-example');

You can also provide data objects that are deeply nested:

**example.html**

    <p data-example> Hello {{name.last}} </p>

**example.js**

    new barefoot.component({
        data: {
            name: {
                last: 'World'
            }
        }
    }).render('data-example');
    
### Content

The content setting can be used to replace the innerHTML of the component with a string value you provide. 

**example.html**

    <p data-example></p>
    
**example.js**

    new barefoot.component({
        data: {
            name: 'World'
        },
        content: '<p>Hello {{name}}</p>'
    }).render('data-example');
    
### Include

The `include` setting can be used to replace the innerHTML of the component with the contents of a file. 

**example.html**

    <p data-example></p>
    
**example.js**

    new barefoot.component({
        data: {
            name: 'World'
        },
        include: 'sayhello.shtml'
    }).render('data-example');    

**sayhello.shtml**
    
    Hello {{name}}
    
### Element

The `element` setting can be used to provide interactivity or DOM manipulation to your component. It wraps each match inside a [src/com/core.query.js](query class) that has jQuery-like methods.

**example.html**

    <p data-example></p>
    
**example.js**

    new barefoot.component({
        data: {
            name: 'World'
        },
        element: function(el, data) {
            el.html('<p>Hello {{name}}</p>');
        }
    }).render('data-example');    

## Tricks & Tips

### Passing Data

The `prop` method contains all the properties of your object, even the data object.

**example.js**

    var remember = new barefoot.component({
    	data: {
    		name: 'Hello World'
    	}
    });

    new barefoot.component({
    	element: function(el) {
    		console.log(remember.prop.data.name);
    	}
    });

### Rerendering

The `barefoot.render` method can be used to rerender components after a property has changed.

**example.html**

    <p data-example></p>

**example.js**

    var example = new barefoot.component({
    	data: {
    		name: 'World'
    	},
    	content: 'Hello {{name}}'
    }).render('data-example');
    
    example.prop.content = "Goodbye Cruel {{name}}";
    
    barefoot.render(example, 'data-example');

## Built-in Directives

### bare-cloak

Hides content until the page loads. Requires the `barefoot-js.css` stylesheet.

**example.html**

    <div data-bare-cloak>

    </div>

### bare-include

**example.html**

Includes the contents of a file.

    <div data-bare-include="example.shtml">

    </div>

**example.shtml**

    Hello World


