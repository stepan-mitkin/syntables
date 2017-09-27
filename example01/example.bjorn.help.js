

/* jason parse
from comand prompt
c:/gitfolder/syntables/example01/node
>x = "{\"foo\":500}"
	'{foo":500}'
> y = JSON.parse(x)
>
>obj = JSON.parse(x)


*/


[
new ModuleName("example01"),
new Table("instrument"),
new Field(1, "feed", "int"),
new Field(2, "ticker", "string"),
new Field(3, "last", "double")
]