function example02() {
   function instrument(feed, ticker) {
       this.feed = feed
       this.ticker = ticker
       this.type = -1
       this.subtype = -1
       this.last = 0.0
       this.prev_close = 0.0
       this.bid = 0.0
       this.ask = 0.0
   }

   function portfolio(login_id, title, ticker, prev_close) {
       this.login_id = login_id
       this.title = title
       this.ticker = ticker
       this.currency = ""
       this.last = -1
       this.prev_close = prev_close
   }

   function instruments() {
       this._count = 0
       this.insert = instrument_insert
       this.remove = instrument_remove
       this.count = function() { return this._count } 
       this.forEach = instrument_forEach
       this._ft = {}
       this.get_by_ft = instrument_get_by_ft
   }

   function portfolios() {
       this._count = 0
       this.insert = portfolio_insert
       this.remove = portfolio_remove
       this.count = function() { return this._count } 
       this.forEach = portfolio_forEach
       this._login_title = {}
       this._ticker = {}
       this.get_by_login_title = portfolio_get_by_login_title
       this.get_by_ticker = portfolio_get_by_ticker
   }

   function instrument_insert(feed, ticker) {
       if (typeof feed === "undefined" || feed === null) {
           throw new Error("instrument.feed is null")
       }

       if (typeof ticker === "undefined" || ticker === null || ticker === "") {
           throw new Error("instrument.ticker is null")
       }

       var _key_ft = feed + "|||" + ticker
       if (_key_ft in this._ft) {
           throw new Error("instrument.ft indexed fields are not unique: " + feed + ", " + ticker)
       }

       var _record = new instrument(feed, ticker)
       this._ft[_key_ft] = _record
       this._count++
       return _record
   }

   function instrument_remove(row) {
       if (!row) {
           return
       }

       var _key_ft = row.feed + "|||" + row.ticker
       if (!(_key_ft in this._ft)) {
           return
       }

       delete this._ft[_key_ft]
       this._count--
   }

   function instrument_get_by_ft(feed, ticker) {
       var _key = feed + "|||" + ticker
       return this._ft[_key]
   }

   function instrument_forEach(action) {
       for (var key in this._ft) {
           var row = this._ft[key]
           action(row)
       }

   }

   function portfolio_insert(login_id, title, ticker, prev_close) {
       if (typeof login_id === "undefined" || login_id === null) {
           throw new Error("portfolio.login_id is null")
       }

       if (typeof title === "undefined" || title === null || title === "") {
           throw new Error("portfolio.title is null")
       }

       if (typeof ticker === "undefined" || ticker === null || ticker === "") {
           throw new Error("portfolio.ticker is null")
       }

       if (typeof prev_close === "undefined" || prev_close === null) {
           throw new Error("portfolio.prev_close is null")
       }

       var _key_login_title = login_id + "|||" + title
       if (_key_login_title in this._login_title) {
           throw new Error("portfolio.login_title indexed fields are not unique: " + login_id + ", " + title)
       }

       var _key_ticker = ticker
       if (_key_ticker in this._ticker) {
           throw new Error("portfolio.ticker indexed fields are not unique: " + ticker)
       }

       var _record = new portfolio(login_id, title, ticker, prev_close)
       this._login_title[_key_login_title] = _record
       this._ticker[_key_ticker] = _record
       this._count++
       return _record
   }

   function portfolio_remove(row) {
       if (!row) {
           return
       }

       var _key_login_title = row.login_id + "|||" + row.title
       if (!(_key_login_title in this._login_title)) {
           return
       }

       var _key_ticker = row.ticker
       if (!(_key_ticker in this._ticker)) {
           return
       }

       delete this._login_title[_key_login_title]
       delete this._ticker[_key_ticker]
       this._count--
   }

   function portfolio_get_by_login_title(login_id, title) {
       var _key = login_id + "|||" + title
       return this._login_title[_key]
   }

   function portfolio_get_by_ticker(ticker) {
       var _key = ticker
       return this._ticker[_key]
   }

   function portfolio_forEach(action) {
       for (var key in this._login_title) {
           var row = this._login_title[key]
           action(row)
       }

   }

   this.instruments = new instruments()
   this.portfolios = new portfolios()
}

if (typeof exports != "undefined") {
   exports.example02 = example02
}
