fs = require("fs")
stepan = require("./stepan.js")
bjorn = require("./parse.facts.bjorn.js")

var common = require("./common.js")

var ModuleName = common.ModuleName
var Table = common.Table
var Field = common.Field
var Export = common.Export

function onError(err) {
	console.log("error", err)
}

function part1() {
	var inFacts = bjorn.InputString("example02.json")
//	for (var i in inFacts) { console.log(inFacts[i]) }
	stepan.transformModel("rules.nools", inFacts, part2, onError)
}

function part2(data) {
	try {
//        console.log(data.tables.Table.rows)
//        console.log(data.tables.Field.rows)

        var root = stepan.buildJavaScriptAst(data)

        var lines = []
        root.print(lines, 0)

        console.log(lines.join("\n"))
	} catch (e) {
		console.log(e)
	}
}

part1()