var common = require("./common.js")
var fs = require("fs")

function InputString(filename)
{
	var buffer = fs.readFileSync(filename)
	var s = buffer.toString('utf8')
	var module = JSON.parse(s)
	
	var output = []
	output.push(new common.ModuleName(module.name))
	for(var table in module.tables)
	{
		output.push(new common.Table(module.tables[table].name))
		var cnt = 1
		for(var field in module.tables[table].fields)
		{
			output.push(new common.Field(cnt, module.tables[table].name, module.tables[table].fields[field].name, module.tables[table].fields[field].type)) 
			cnt += 1
		}	
	}	
	return output		
}

exports.InputString = InputString


// execute
// p = require.("parse.facts.bjorn.js")
// r = p.InputString("example.bjorn.in.json")
