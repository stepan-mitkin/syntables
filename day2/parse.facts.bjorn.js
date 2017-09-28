var common = require("./common.js")
var fs = require("fs")

function AddIndex(output, tableName, index)
{
	output.push(new common.Index(tableName, index.name))
	for (var f in index.fields)
	{
		var field = index.fields[f]
		output.push(new common.IndexedField(tableName, index.name, field))
	}
}

function CopyOptionalField(src, dst, name)
{
	if (name in src)
	{
		dst[name] = src[name]
	}
}

function InputString(filename)
{
	var buffer = fs.readFileSync(filename)
	var s = buffer.toString('utf8')
	var module = JSON.parse(s)
	
	var output = []
	output.push(new common.ModuleName(module.name))
	for(var t in module.tables)
	{
		var table = module.tables[t]
		output.push(new common.Table(table.name, table.collectionName))
		var cnt = 1
		for(var f in table.fields)
		{
			var field = table.fields[f]
			var ffact = new common.Field(cnt, table.name, field.name, field.type)
			CopyOptionalField(field, ffact, "nullable")
			CopyOptionalField(field, ffact, "defaultValue")
			output.push(ffact)
			cnt += 1
		}

		var indexes = table.indexes || []
		for (var i in indexes)
		{
			var index = indexes[i]
			AddIndex(output, table.name, index)
		}
				
	}	
	return output
}

exports.InputString = InputString


// execute
// p = require.("parse.facts.bjorn.js")
// r = p.InputString("example.bjorn.in.json")
