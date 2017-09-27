var nools = require("nools")

/*
function Contains(container, element) {
    this.container = container
    this.element = element
}

function Add(container, element) {
    this.container = container
    this.element = element
}


function Property(obj, property, value) {
    this.obj = obj
    this.property = property
    this.value = value
}


// Contains(C, E) and Property(O, M, C) and Property(E, M2, O) => Add(C, E)

*/

function Foo(name, value) {
    this.name = name
    this.value = value
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
        [Foo, "f"],
        [Bar, "b", "f.name == b.name"]
     ], function (facts) {
        var name = facts.f.value + "/" + facts.b.value
        this.assert(new Moo(name))
        console.log("created Moo", name)
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

var flow = nools.flow("flow1", initFlow)

var session = flow.getSession();


session.assert(new Foo("n1", "foo1"));
session.assert(new Bar("n1", "bar1"));

//session.assert(new Property("p", "items", "coll"))
//session.assert(new Property("it", "port", "p"))
//session.assert(new Contains("coll", "it"))

session.match()

var facts = session.getFacts()

console.log("match done. listing facts");

for (var i in facts) {
    var fact = facts[i]
    console.log(fact)
}


