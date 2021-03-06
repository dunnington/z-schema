"use strict";

module.exports = {
    description: "assumeAdditional - Assume additional properties/items in schemas are defined to false",
    options: {
        assumeAdditional: true
    },
    tests: [
        {
            schema: {
                "type": "object",
                "properties": {
                    "hello": {
                        "type": "string"
                    }
                }
            },
            data: {
                hello: "world"
            },
            description: "should pass validation when only defined properties are used",
            valid: true
        },
        {
            schema: {
                "type": "object",
                "properties": {
                    "hello": {
                        "type": "string"
                    }
                }
            },
            data: {
                hello: "world",
                good: "morning"
            },
            description: "should fail validation when other than defined properties are used",
            valid: false
        },
        {
            schema: {
                "type": "object",
                "properties": {
                    "hello": {
                        "type": "string"
                    }
                }
            },
            data: {
                hello: "world",
                good: "morning",
                night: "night"
            },
            description: "should fail validation with multiple errors when several other than defined properties are used",
            valid: false,
            after: function(errs) {
                expect(errs.length).toBe(2);
                expect(errs[0].message).toBe('Additional properties not allowed: good');
                expect(errs[1].message).toBe('Additional properties not allowed: night');
            }
        },
        {
            schema: {
                "type": "array",
                "items": [
                    { "type": "string" },
                    { "type": "string" },
                    { "type": "string" }
                ]
            },
            data: [
                "aaa",
                "bbb",
                "ccc"
            ],
            description: "should pass validation when only allowed items are used",
            valid: true
        },
        {
            schema: {
                "type": "array",
                "items": [
                    { "type": "string" },
                    { "type": "string" },
                    { "type": "string" }
                ]
            },
            data: [
                "aaa",
                "bbb",
                "ccc",
                null
            ],
            description: "should fail validation when other than allowed items are used",
            valid: false
        }
    ]
};
