(typeof define === "function" ? {define:define} : require("um_node")._(require, exports)).
define([ "./ootools" ],
    function(ootools) {
        describe("getTypeName", function() {
            it("", function() {
                expect(ootools.getTypeName(null)).toEqual("null");
                expect(ootools.getTypeName(new Object())).toEqual("Object");
                expect(ootools.getTypeName(new String())).toEqual("String");
                expect(ootools.getTypeName("")).toEqual("string");
                expect(ootools.getTypeName(function() {})).toEqual("Function");
            });
        });
    }
);
