ex = require("./example02.js")

console.log("")
console.log("")
console.log("==============")
console.log("    HELLO!")
console.log("==============")
console.log("Let's run some tests.")
console.log("")


console.log("create the database")
var db = new ex.example02()


console.log("add instrument STL")
var stl = db.instruments.insert(18177, "STL")
console.log("here is hour instrument after insertion:", stl, stl.last)

console.log("the number of rows in instruments", db.instruments.count())

console.log("add instrument NHY")
db.instruments.insert(18177, "NHY")


console.log("the number of rows in instruments", db.instruments.count())

var printMe = row => console.log(row)

console.log("get STL by feed and ticker")

var stl2 = db.instruments.get_by_ft(18177, "STL")
stl2.last = 141.1
stl2.prev_close = 142.5

console.log("full table scan for instruments")
db.instruments.forEach(printMe)

console.log("deleting STL")
db.instruments.remove(stl2)

console.log("the number of rows in instruments", db.instruments.count())

console.log("full table scan for instruments (again)")
db.instruments.forEach(printMe)

console.log("")

console.log("insert portfolio")
db.portfolios.insert(22223322, "Alan's portfolio", "22223322-45", 4000)

console.log("get portfolio by ticker")
var p1 = db.portfolios.get_by_ticker("22223322-45")
p1.currency = "NOK"

console.log("get portfolio by login_id and title")
var p1 = db.portfolios.get_by_login_title(22223322, "Alan's portfolio")
p1.last = 5000

console.log("full table scan for portfolios")
db.portfolios.forEach(printMe)



console.log("")
console.log("")
console.log("==============")
console.log("  THANK YOU!")
console.log("==============")
console.log("")
console.log("")
