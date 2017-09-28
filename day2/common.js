
function ModuleName(name) {
    this.name = name
}

function Table(name) {
    this.name = name
}

function Field(ordinal, tableName, name, type, defaultValue, keys) {
    this.ordinal = ordinal
    this.tableName = tableName
    this.name = name
    this.type = type
    this.defaultValue = defaultValue || ""
    this.keys = keys || ""
}

function Export(name) {
    this.name = name
}

exports.ModuleName = ModuleName
exports.Table = Table
exports.Field = Field
exports.Export = Export

