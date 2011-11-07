"use strict";

// TODO: isExtending() 

(typeof define === "function" ? {define:define} : require("um_node")._(require, exports)).
define(function() {
    
    var e = {};

    /**
     */
    e.copyOwnFrom = function(target, source) {
        Object.getOwnPropertyNames(source).forEach(function(propName) {
            Object.defineProperty(target, propName,
                Object.getOwnPropertyDescriptor(source, propName));
        });
        return target;
    };

    e.extends = function (subC, superC) {
        var subProto = Object.create(superC.prototype);
        // At the very least, we keep the "constructor" property
        // At most, we preserve additions that have already been made
        e.copyOwnFrom(subProto, subC.prototype);
        subC.prototype = subProto;
    };
    
    e.getTypeName = function(value) {
        if (value === null) {
            return "null";
        }
        var t = typeof value;
        switch(t) {
            case "function":
            case "object":
                 if (value.constructor) {
                    return value.constructor.name;
                } else {
                    // fallback, just in case
                    return Object.prototype.toString.call(value);
                }
            default:
                return t;
        }
    };

    /**
     Find which object in the prototype chain starting at "obj"
     is the first to have a property whose name is "propName"

     @url https://mail.mozilla.org/pipermail/es-discuss/2011-April/013643.html
     @return defining object or null
    */
    e.getDefiningObject = function (obj, propName) {
        // TODO: exception if null
        obj = Object(obj); // make sure it’s an object
        while (obj && !obj.hasOwnProperty(propName)) {
            obj = Object.getPrototypeOf(obj);
            // obj is null if we have reached the end
        }
        return obj;
    };
    
    /**
     */
    e.getOwnProperty = function (obj, propName) {
        if (Object.hasOwnProperty(obj, propName)) {
            return obj[propName];
        } else {
            return undefined;
        }
    };

    /**
     * Return an array with the names of all enumerable properties of obj
     * (own and inherited properties)
     */
    e.allEnumerablePropertyNames = function (obj) {
        var result = [];
        for (var propName in obj) {
            result.push(propName);
        }
        return result;
    };

    /**
     * Return an array with the names of all properties of obj
     * (own and inherited properties)
     */
    e.allPropertyNames = function (obj) {
        if ((typeof obj) !== "object") { // null is not a problem
            throw new Error("Only objects are allowed");
        }
        var props = {};
        while(obj) {
            Object.getOwnPropertyNames(obj).forEach(function(p) {
                props[p] = true;
            });
            obj = Object.getPrototypeOf(obj);
        }
        return Object.getOwnPropertyNames(props);
    };
    return e;
});
