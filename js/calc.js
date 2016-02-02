function checkNum(str) {
	for (var i = 0; i < str.length; i++) {
		var ch = str.substring(i, i+1)
		if (ch < "0" || ch > "9") {
			if (ch != "/" && ch != "*" && ch != "+" && ch != "-" && ch != "."
				&& ch != "(" && ch!= ")") {
				alert("invalid entry!")
				return false
				}
			}
		}
		return true
}

function addChar(input, character) {
	if(input.value == null || input.value == "0")
		input.value = character
	else
		input.value += character
}

function cos(form) {
	form.display.value = Math.cos(form.display.value);
}

function sin(form) {
	form.display.value = Math.sin(form.display.value);
}

function tan(form) {
	form.display.value = Math.tan(form.display.value);
}

function deleteChar(input) {
	input.value = input.value.substring(0, input.value.length - 1)
}

function compute(form) {
	form.display.value = eval(form.display.value)
}
//Old js code
/*Reference:
http://thecodeplayer.com/walkthrough/javascript-css3-calculator
*/

var operators = ['+', '-', 'X', '÷'];
var decimalAdded = false;

$(document).on('click', '.calc-row button', function(e) {
  handler($(this).text());
});

var data = [{'computation':'0', 'result' : 0}];
var prevPos = 0;

function handler(btnVal){
  var input = $("#res");
		var inputVal = input.val();

		if(btnVal == 'C') {
			input.val('');
			decimalAdded = false;
		}else if(btnVal == 'sin()') {
			input.val(Math.sin(eval(input.val())));
			decimalAdded = false;
		}else if(btnVal == 'cos()') {
			input.val(Math.cos(eval(input.val())));
			decimalAdded = false;
		}else if(btnVal == 'tan()') {
			input.val(Math.tan(eval(input.val())));
			decimalAdded = false;
		}else if(btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];

			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');

			if(equation){
				console.log(equation);
				console.log(typeof(equation));
				var res = eval(equation);
				data.push({'computation':equation, 'result' : res});
				prevPos = data.length - 1;
				showPrevious();
				input.val(res);
			}

			decimalAdded = false;
		}

		else if(operators.indexOf(btnVal) > -1) {
			var lastChar = inputVal[inputVal.length - 1];

			if(inputVal != '' && operators.indexOf(lastChar) == -1)
				input.val(input.val() +''+ btnVal);

			else if(inputVal == '' && btnVal == '-')
				input.val(input.val() +''+ btnVal);

			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				input.val(inputVal.replace(/.$/, btnVal));
			}

			decimalAdded =false;
		}

		else if(btnVal == '.') {
			if(!decimalAdded) {
				//input.append(btnVal);
				input.val(input.val() +''+ btnVal);
				decimalAdded = true;
			}
		}

		else {
			input.val(input.val() +''+ btnVal);;
		}

		e.preventDefault();
}

function showPrevious(){
	if(prevPos >= 0)
		$('#previous').text(data[prevPos].computation+' = '+data[prevPos].result);
	prevPos--;
}