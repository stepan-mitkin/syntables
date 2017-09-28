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

	stepan.transformModel("rules.nools", inFacts, part2, onError)
}

function part2(data) {
	try {
        var root = stepan.buildJavaScriptAst(data)

        var lines = []
        root.print(lines, 0)

		var result = lines.join("\n")
		fs.writeFileSync("example02.js", result)
	} catch (e) {
		console.log(e)
	}
}

part1()