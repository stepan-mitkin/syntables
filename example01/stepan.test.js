fs = require("fs")
stepan = require("./stepan.js")

var common = require("./common.js")

var ModuleName = common.ModuleName
var Table = common.Table
var Field = common.Field
var Export = common.Export


var inFacts = [
	new ModuleName("example01"),
	new Table("instrument"),
	new Field(1, "instrument", "feed", "int"),
	new Field(2, "instrument", "ticker", "string"),
	new Field(3, "instrument", "last", "double")
]


function readJson(filename) {
	var buffer = fs.readFileSync(filename)
	var text = buffer.toString("utf8")
	return JSON.parse(text)
}

var data = stepan.transformModel(inFacts)

for (var tableName in data.tables) {
	console.log("=====", tableName, "=====")
	var table = data.tables[tableName]
	var rows = data.select(tableName, null)
	for (var r in rows) {
		var row = rows[r]
		console.log(row)
	}
}