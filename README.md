# BarefootJS

BarefootJS is a lightweight framework for building components. It's __NOT__ required by Barefoot.css. BarefootJS is its own entity.

## Installation

Make sure to include the barefoot-js.min.js script before the closing <body> tag.
    
    <html>
        <body>
            .
            .
            .
            <script src="scripts/barefoot.min.js"></script>
            <script src="script/directives.min.js"></script>
        </body>
    </html>

---

# How to Use

### component class

The `component` class defines a component. 

    new barefoot.component({
        //
        // Properties appear here
        //
    });
    
### render function

The `component.render` function traverses the document for a passed data attribute, and draws the component.

    new barefoot.component({
        //
        // Properties appear here
        //
    }).render('some-data-attribute');

### Rendering Outside a Component

The `barefoot.render` function allows you to render a component from another place in your script.

    var example = new barefoot.component({
        //
        // Properties appear here
        //
    });
    
    barefoot.render(example, 'some-data-attribute');

## Properties

### data property

The `data` property defines the data that will be used to replace any handlebar placeholders.

    new barefoot.component({
        data: {
            name: 'world'
        }
    }).render('some-data-attribute');
    
### content property

The `content` property replaces the contents of the container element with a string value.

    new barefoot.component({
        data: {
            name: 'world'
        },
        content: '<p>Hello {{name}}</p>'
    }).render('some-data-attribute');
    
### include property

The `include` property replaces the contents of the container element with a external file.

    new barefoot.component({
        data: {
            name: 'world'
        },
        include: 'hello.shtml'
    }).render('some-data-attribute');
    
### element property

The `element` defines the main function that will be called when the component is rendered.

    new barefoot.component({
        data: {
            name: 'world'
        },
        include: 'hello.shtml',
            el.html('<p>Hello {{name}}</p>')
        }
    }).render('some-data-attribute');

### Accessing Properties Outside a Component

Properties can be changed or read outside of a property by using the `prop` variable.

    var example = new barefoot.component({
        data: {
            name: 'world'
        },
        content: '<p>Hello {{name}}</p>'
    }).render('some-data-attribute');
    
    console.log(example.prop.data.name);

### Replacing Handlebars Outside a Component

Handlebars values in a string can be 

    barefoot.template('<p>Hello {{name}}', {
        name: 'World'
    });
        
## DOM Manipulation

### element property

Matches are wrapped inside a `query` class before passed to your main funciion.

    new barefoot.component({
        element: function(el) {
            el.on('click', function(e) {
                console.log('Hello World');
            }
        }
    }).render('some-data-attribute');
    
### query class

The `query` class contains the the following functions found in popular selector engines.

* each()
* index()
* find()
* next()
* parent()
* html()
* text()
* attr()
* removeAttr()
* value()
* style()
* addClass()
* removeClass()
* toggleClass()
* append()
* prepend()
* before()
* after()
* empty()
* remove()
* show()
* hide()
* on()
* un()

### Querying Outside a Component

You can quey outside of a component like so:

    new barefoot.component({
        element: function(el) 
            el.on('click', function(e) {
                new barefoot.query('body').style('background', 'red');
            }
        }
    }).render('some-data-attribute');
 
## Ajax

This section still has to be written.

---

# Contribute

This section still has to be written.

---

# License

This section still has to be written.
