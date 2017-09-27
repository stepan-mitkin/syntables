
function ModuleName(name) {
    this.name = name
}

function Table(name) {
    this.name = name
}

function Field(ordinal, tableName, name, type) {
    this.ordinal = ordinal
    this.tableName = tableName
    this.name = name
    this.type = type
}

exports.ModuleName = ModuleName
exports.Table = Table
exports.Field = Field
