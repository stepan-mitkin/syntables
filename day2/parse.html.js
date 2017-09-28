var common = require('./common.js')
var builder = require('xmlbuilder')

function InputString(filename)
{
	var buffer = fs.readFileSync(filename)
	var s = buffer.toString('utf8')
	var m = JSON.parse(s)
	
	var resultList = []
	var moduleList = []
	for(var t in m.tables)
	{
		var html = builder.create('html', {headless: true, standalone: false})
		var head = html.ele('head')
	
		var module =  m.tables[t].name
		moduleList.push(module)
	
	
		head.ele('title', {}, module)
		head.ele('link', {rel:"stylesheet", type:"text/css", href:"mystyle.css"})
			
		var body = html.ele('body')
		body.ele('h1', {}, module)
		body.ele('p', {}, m.name)
		
		for(var t in m.tables)
		{
			var table = body.ele('table')
			var row = table.ele('tr')
			row.ele('th', {}, "Name")
			row.ele('th', {}, "Type")
			
			for(var f in m.tables[t].fields)
			{
				row = table.ele('tr')
				row.ele('td', {}, m.tables[t].fields[f].name)
				row.ele('td', {}, m.tables[t].fields[f].type)
			}
		}	
		resultList.push(html.end({pretty: true}))
	}
	var result = []
	for(var item in resultList)
	{
		var ext = ".html"
		var asdf = {filename: moduleList[item] + ext, body: resultList[item]}
		result.push(asdf)
		
	}
	//console.log(result)
	
	//var xmlString = html.end({pretty: true})
	
	//return xmlString
	return result
}

exports.InputString = InputString

