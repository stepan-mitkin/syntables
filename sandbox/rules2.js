var nools = require("nools")


function Foo(name, value, weight) {
    this.name = name
    this.value = value
    this.weight = weight
}

function Bar(name, value) {
    this.name = name
    this.value = value
}

function Moo(name) {
    this.name = name    
}

function initFlow(flow) {

    //find any message that is exactly hello world
    flow.rule("Hello", [
        [Foo, "f", "f.value == 'world'"],
        [Foo, "f", "f.name == 'hello'"],
     ], function (facts) {
        console.log("found", facts.f)
    })  
    /*
    flow.rule("add add", [
        [Property, "p1"],
        [Property, "p2"],
        [Contains, "c1", "c1.container == p1.value and c1.element == p2.obj and p1.obj == p2.value"]
    ], function(facts) {
        var add = new Add(facts.c1.container, facts.p2.obj)        
        this.assert(add)
        console.log("created add", add)
    })
    */
}

//var flow = nools.flow("flow1", initFlow)



var flow = nools.compile("rules2.nools", {
    define: {
        Foo: Foo,
        Bar: Bar,
        Moo: Moo
    },
    scope: {

    }
});


var session = flow.getSession();


session.assert(new Foo("hello", "dear", 200))
session.assert(new Foo("hello", "world", 200));
session.assert(new Foo("bye", "world", 200));

session.match()

var facts = session.getFacts()

console.log("match done. listing facts");

for (var i in facts) {
    var fact = facts[i]
    console.log(fact)
}


