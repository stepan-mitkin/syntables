
function example01() {

    function instrument() {
        this.feed = 0
        this.ticker = ""
        this.last = 0.0
    }
    
    this.instrument = instrument
}


/*
var module = new example01()

var record = new module.instrument()
record.feed = 18177
record.ticker = "STL"
record.last = 141.1
*/