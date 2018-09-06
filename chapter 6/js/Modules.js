// create object cloning code
var ImagesInc_Utilizes = (function() {
    var clone = function clone(deep) {
        // create instance of the object
        var newClonedObject = new this.constructor();

        // copy all properties from the original object
        for (var property in this) {
            // if deep flag is not set, just do a shallow copy of properties
            if (!deep) {
                if (this.hasOwnProperty(property)) {
                    newClonedObject[property] = this[property];
                }
            }
            // to make a deep clone, call the function recursively
            else if (typeof this[property] == 'object' && this.hasOwnProperty(property)) {
                newClonedObject[property] = this[property].clone(deep);
            } else if (this.hasOwnProperty(property)) {
                // just clone all properties
                newClonedObject[property] = this[property];
            }
        }
        return newClonedObject;
    };

    // attach the clone function to the Pbject prototype
    var initialize = (function() {
        Object.prototype.clone = clone; // all the objects in the application can have access to this method
    })();
})();

// testing the custom cloning method
var TestModule = (function() {
    var privateTestValue = 'Test for cloning, this property is hidden';

    return {
        publicTestValue: privateTestValue + ', but now showing it publicly',
        testFunc: function() {
            var anotherTest = 'This property will be cloned';
            return anotherTest;
        },

        getPrivacyValue: function() {
            return privateTestValue
        },

        changePrivateVar: function() {
            privateTestValue = 'privateTestValue has been changed';
            return privateTestValue;
        },
        testArray: [1, 2, 3]
    };
})();

// MODULE INHERITANCE
var Polygon_Module = (function() {
    var sides = 6;
    var name = 'Polygon';
    var type = '2D';

    function getSides() {
        return sides;
    };

    function getName() {
        return name;
    };

    function getType() {
        return type;
    };

    return {
        getSides: getSides,
        getName: getName,
        getType: getType

    };
})();

var Rectangle_Module = (function() {
    var Rectangle = {};
    var sides = 4;
    var name = 'Rectangle';
    var color = 'blue';

    Rectangle.__proto__ = Polygon_Module;

    Rectangle.getName = function() {
        return name;
    };
    Rectangle.getSides = function() {
        return sides;
    };

    Rectangle.getColor = function() {
        return color;
    };

    return {
        getName: Rectangle.getName,
        getSides: Rectangle.getSides,
        getType: Rectangle.getType
    }
})();
console.log('Displayed module is: ' + Polygon_Module.getName());
console.log('Polygon\' sides are : ' + Polygon_Module.getSides());
console.log(' Rectangle\'s sides are : ' + Rectangle_Module.getSides());
console.log('Rectangle\'s type is: ' + Rectangle_Module.getType());

// PARASITING MODULE INHERITANCE
var Polygon_Module2 = (function() {
    var sides = 6,
        name = 'Polygon',
        type = '2D';

    // constructor
    function Polygon() {
        this.sides = sides;
        this.name = name;
        this.type = type;
    }

    Polygon.prototype.getSides = function() {
        return this.sides;
    };
    Polygon.prototype.getName = function() {
        return this.name;
    };
    Polygon.prototype.getType = function() {
        return this.type;
    };

    // annonymous object with regerence to Polycon class/object/
    return {
        Polygon: Polygon
    };
})();

var Rectangle_Module2 = (function() {
    var sides = 4,
        name = 'Rectangle';

    // constructor
    function Rectangle() {
        // make it use aviable interface in parent Object to borrow its constructor
        Polygon_Module2.Polygon.apply(this);

        this.sides = sides;
        this.name = name;
    };
    // enable access aviable to all methods defined in parent/Rectangle/ Object
    Rectangle.prototype = Polygon_Module2.Polygon.prototype;
    // reset the constructor property so that it points the correct object 
    Rectangle.prototype.constructor = Rectangle;

    // start the inheritance relationship between the two objets and set the object's context properly
    var RectangleInstance = new Rectangle();
    return {
        Rectangle: RectangleInstance
    };
})();
console.log('1 ' + Rectangle_Module2.Rectangle.getName());
console.log('2 ' + Rectangle_Module2.Rectangle.getSides());
console.log('3 ' + Rectangle_Module2.Rectangle.getType());
// PARASITING MODULE INHERITANCE END
//creating object definition for the header:
var ImagesInc_GlobalData = (function(module) {
    var headerContainerDef = {
        sectionHTML: '<div class="logo_titleClass" >' +
            '<a href=""><img src="img/ImagesIncLogo.png"  alt="Company Logo" style="max-height:100%;"></a>' +
            '<div class="siteTitleClass">Images Inc.</div>' +
            '</div>' +
            '<nav role="navigation" itemscope   itemtype="https://schema.org/SiteNavigationElement">' +
            '<h1 class="hiddenClass">Main Navigation</h1>' +
            '<ul class="navmenuClass" >' +
            '<li><a href="#" class="active">Home</a></li>' +
            '<li><a href="#">Our Company</a></li>' +
            '<li><a href="#">Pricing</a></li>' +
            '<li><a href="#">Contact Us</a></li>' +
            '</ul>' +
            '</nav>'

    };
    var footerContainerDef = {
        sectionHTML: '<div>' +
            '<a href="#">Latest News</a>' +
            '</div>' +
            '<div>' +
            '<a href="#">Services</a>' +
            '</div>' +
            '<div>' +
            '<a href="#">Support</a>' +
            '</div>'
    };

    module.getHeaderHTMLTxt = function() {
        return headerContainerDef.sectionHTML;
    };
    module.getFooterHTMLTxt = function() {
        return footerContainerDef.sectionHTML;
    };
    return module;
})(ImagesInc_GlobalData || {});
// update on a page fragment
var ImagesInc_PageUpdater = (function() {
    // private function
    var insertHTMLtxt = function(containerID, newStructure) {
        var theContainer = document.getElementById(containerID);
        theContainer.innerHTML = newStructure;
    };
    // private function
    var applyElementCss = function(elemID, className) {
        var theElement = document.getElementById(elemID);
        theElement.className = className; // prisvoyavam klasa na elementa
    }

    return {
        // privilidged method
        updateElement: function(elemID, htmlTxt) {
            return insertHTMLtxt(elemID, htmlTxt);
        },

        // privilidged method 
        updateElementClass: function(elemID, className) {
            if (!className) {
                console.error('No className has been provided, eciting module');
            }
            applyElementCss(elemID, className);
        }
    };
})();