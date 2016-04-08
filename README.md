# money_formatter
jQuery Currency Text Formatter Plugin

### About

Money formatter is a jQuery plugin that formats the text of a collection of elements into a specified currency format.

### Options:

- decimalCharacter:  The decimal character you wish to use (default ".").
- thousandsSeparator:  The character thousands should be separated by (default ",").
- precision:  Number of decimals the formatted text should have (default "2").
- currencySymbol:  String or character to prepend in the formatted text result (default "$").
- round:  Four possible values.
  - "round" - rounds the decimal up or down based on the specified precision number (normal rounding)
  - "roundDown" - cuts off the remaining decimal numbers after the specified precision number of decimals (truncates / rounds down)
  - "roundUp" - always rounds the decimal up to the precision number of decimals specified
  
### Methods:

- $(input)[0].moneyReturnOriginalEntry(); 
  - returns the original unformatted and untouched number
- $(input)[0].moneyReturnUnformatted(); 
  - returns the newly rounded or truncated number unformatted using the specified decimal character
- $(input)[0].moneyUnformat(); 
  - immediately sets the rounded or truncated formatted value to the number without formatting using the specified decimal character

### See full documentation here:

##[Money Formatter Demo &amp; Documentation](http://eamster.tk/money_formatter/)
