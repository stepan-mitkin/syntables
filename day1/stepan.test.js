fs = require("fs")
stepan = require("./stepan.js")
bjorn = require("./parse.facts.bjorn.js")

var common = require("./common.js")

var ModuleName = common.ModuleName
var Table = common.Table
var Field = common.Field
var Export = common.Export

var inFacts = bjorn.InputString("example.01.in.json")

var data = stepan.transformModel(inFacts)
var root = stepan.buildJavaScriptAst(data)

var lines = []
root.print(lines, 0)

console.log(lines.join("\n"))
