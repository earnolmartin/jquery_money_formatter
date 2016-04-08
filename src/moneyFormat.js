/* 
   jQuery Money Formatter Plugin
   By Eric Arnol-Martin (earnolmartin@gmail.com)
*/
(function ( $ ) {
	$.fn.moneyFormat = function( options ) {
		
		// Get options
		var settings = $.extend({
			// These are the defaults for our options
			decimalCharacter: ".",
			thousandsSeparator: ",",
			precision: 2,
			currencySymbol: "$",
			round: "normal",
		}, options );
		
		// Initialize reusable variables
		var value = 0;
		var baseNum = null;
		var decNum = null;
		var diff = null;
		var formattedBaseNum = null;
		var unformattedNum = null;
		
		// Escape special characters in regex strings
		var regexSafe = settings.decimalCharacter;
		regexSafe = regexSafe.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		
		// Setup our regex expression
		var regex = new RegExp("[^0-9" + regexSafe + "]", "g");
		
		return this.each(function() {
			// For each matching element, format it!
			var value = $(this).val();
			
			// Remove leading zeros
			while(value[0] == "0"){
				value = value.slice(1);
			}
			
			// Replace invalid characters in number except for numbers and decimal character
			value = removeMoneyFormatting(value, regex, settings.decimalCharacter);
			
			// Set original unformatted value
			unformattedNum = value;
			
			// Make sure we have a value
			if(value != ""){
			
				// Check for decimal character
				var positionOfDecChar = value.indexOf(settings.decimalCharacter);
				if(positionOfDecChar != -1){
					// Get numbers before decimal
					baseNum = value.substring(0, positionOfDecChar);
					decNum = value.substring(positionOfDecChar + 1);
					if(decNum.length < settings.precision){
						diff = settings.precision - decNum.length;
						decNum = settings.decimalCharacter + decNum;
						for(var i = 0; i < diff; i++){
							decNum = decNum + "0";
						}						
					}else{
						if(decNum.length != settings.precision){
							// Just splice it
							if(settings.round == "roundDown"){
								if(settings.precision != 0){
									decNum = settings.decimalCharacter + decNum.substring(0, settings.precision);
								}else{
									decNum = "";
								}
							}else{
								// Round up or down
								var roundedNumber = 0;
								var decimalRange = decNum.substring(0, settings.precision);
								var restOfRange = decNum.substring(settings.precision);
								if(settings.round == "round"){
									if(Number(restOfRange[0]) >= 5){
										roundedNumber = incrementDecimalRange(decimalRange);
									}else{
										roundedNumber = decimalRange;
									}
								}else if(settings.round == "roundUp"){
									if(restOfRange[0] != "0"){
										roundedNumber = incrementDecimalRange(decimalRange);
									}else{
										roundedNumber = decimalRange;
									}
								}else{
									roundedNumber = decimalRange;
								}
								if(roundedNumber == Math.pow(10, Number(settings.precision))){
									decNum = settings.precision == 0 ? "" : settings.decimalCharacter;
									for(var i = 0; i < settings.precision; i++){
										decNum = decNum + "0";
									}
									baseNum = (Number(baseNum) + 1).toString();
								}else{
									if(settings.precision != 0){
										decNum = settings.decimalCharacter + roundedNumber.toString();
									}else{
										decNum = "";
									}
								}
							}
						}else{							
							if(settings.precision != 0){
								decNum = settings.decimalCharacter + decNum;
							}
						}
					}
				}else{
					decNum = settings.precision == 0 ? "" : settings.decimalCharacter;
					for(var i = 0; i < settings.precision; i++){
						decNum = decNum + "0";
					}
					baseNum = value;
				}
				
				if(baseNum.length >= 4){
					var count = 0;
					formattedBaseNum = "";
					for(var i = baseNum.length -1; i >= 0; i--){
						if(count % 3 == 0 && count != 0){
							// Reset the counter
							count = 0;
							
							// Add the number plus the separator to the new string
							formattedBaseNum = baseNum[i] + settings.thousandsSeparator + formattedBaseNum;
						}else{
							formattedBaseNum = baseNum[i] + formattedBaseNum;
						}
						count++;
					}
				}else{
					formattedBaseNum = baseNum;
				}
				
				if(formattedBaseNum == ""){
					formattedBaseNum = "0";
				}
				
				// Set the new value
				$(this).val(settings.currencySymbol + formattedBaseNum + decNum);
				
			}else{
				value = "0" + settings.decimalCharacter;
				for(var i = 0; i < settings.precision; i++){
					value += "0";
				}
				// Set the new value
				$(this).val(settings.currencySymbol + value);
			}
			
			this.moneyUnformat = function(e){
				$(this).val(removeMoneyFormatting($(this).val(), regex, settings.decimalCharacter));
			}
			
			this.moneyReturnUnformatted = function(e){
				return removeMoneyFormatting($(this).val(), regex, settings.decimalCharacter);
			}
			
			this.moneyReturnOriginalEntry = function(e){
				return getOriginalNumber();
			}
		});
		
		function getOriginalNumber(){
			return unformattedNum;
		}
		
		function removeMoneyFormatting(value, regex, decimalChar){
			// Replace invalid characters
			value = value.replace(regex, "");
			
			// In case the decimal character is the same as the thousands separator, we need to strip out the originals
			var lastDecInStr = value.lastIndexOf(decimalChar); 
			if(lastDecInStr != -1){
				var toLastDec = value.substring(0, lastDecInStr);
				toLastDec = toLastDec.replace(/[^0-9]/g, "");
				value = toLastDec + value.substring(lastDecInStr);
			}
			
			return value;
		}
		
		function incrementDecimalRange(number){
			var lengthOfImmediateRange = number.length;
			number = Number(number) + 1;
			number = number.toString();
			if(number.length < lengthOfImmediateRange){
				// Re-add the proper number of zeros since a Number cast removes prefixed 0s
				var diff = lengthOfImmediateRange - number.length;
				for(var i = 0; i < diff; i++){
					number = "0" + number;
				}
			}
			return number;
		}
	
	};
}( jQuery ));
