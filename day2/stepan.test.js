fs = require("fs")
stepan = require("./stepan.js")
bjorn = require("./parse.facts.bjorn.js")
html = require("./parse.html.js")

common = require("./common.js")

inputFile = "example02.json"
outputFile = "example02.js"

function onError(err) {
	console.log("error", err)
}

function part1() {
	var inFacts = bjorn.ParseInput(inputFile)

	stepan.transformModel("rules.nools", inFacts, part2, onError)
}

function part2(data) {
	try {
        var root = stepan.buildJavaScriptAst(data)

        var lines = []
        root.print(lines, 0)

		var result = lines.join("\n")
		fs.writeFileSync(outputFile, result)
		
		var docs = html.GenerateHtmlDocs(inputFile)
		for (var i in docs) {
            var doc = docs[i]
            fs.writeFileSync(doc.filename, doc.body)
		}		
	} catch (e) {
		console.log(e)
	}
}

part1()
