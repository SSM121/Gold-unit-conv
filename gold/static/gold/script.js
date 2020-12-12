/* TODO: Build up the HTML document by using JavaScript DOM manipulation functions.
 * Do not rely on changes you may have made to index.html because the grader won't use that file.
 */

var theData;
var theVal;
function changeValue(response){
	theData = response;
	theVal = theData.dataset.data[0][1];
	var output = "The value of gold is currently: $" + theVal.toFixed(2) + " per troy ounce";
	var para = document.getElementById("price");
	para.textContent = output;
}

function quand(){
	var now = new Date();
	var then = new Date();
	then.setDate(now.getDate() - 5);
	var start = "start_date=" + then.getFullYear() + "-" + (then.getMonth() + 1) + "-" + then.getDate();
	var end = "end_date=" + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
	var formParamsString = function() {
		    let argsArray = Array.from(arguments);
		    let url = argsArray.shift();
		    return `${url}?${argsArray.join('&')}`;
	}
	url = formParamsString('https://www.quandl.com/api/v3/datasets/LBMA/GOLD.json', apiKey, start, end);
	fetch(url)
		.then(response => response.json())
		.then(data => changeValue(data));

}
function hdiv(){ //creates the head div
	//creates a div with the neeeded style
	var headDiv = document.createElement('div');
	headDiv.id = "headDiv";
	headDiv.className = "yellow stuff-box shadowed";
	//create the explainer title
	var header = document.createElement('h1');
	header.id = "header";
	header.textContent = "Worth your weight in gold!";
	header.style = "color:black";
	headDiv.appendChild(header);
	document.body.appendChild(headDiv);
	//create the insructions
	var para = document.createElement('p');
	para.id = "para";
	para.textContent = "Please enter a weight to be converted to US dollars"
	para.style += " text-align:center";
	header.appendChild(para);
	//create first number box
	var num1 = document.createElement('input');
	num1.id = "num1";
	num1.rows = 1;
	num1.type = "number";
	headDiv.appendChild(num1);
	//create the drop down for the calculations
	var op = document.createElement('select');
	op.id = "unit"
	var add = document.createElement('option');
	add.text = "t_oz";
	op.add(add);
	var sub = document.createElement('option');
	sub.text = "oz";
	op.add(sub);
	var mul = document.createElement('option');
	mul.text = "T";
	op.add(mul);
	var div = document.createElement('option');
	div.text = "lb";
	op.add(div);
	var mod = document.createElement('option');
	mod.text = "g";
	op.add(mod);
	var exp = document.createElement('option');
	exp.text = "kg";
	op.add(exp);
	headDiv.appendChild(op);
	//make a compute button that runs the computation using calc()
	var compute = document.createElement('input');
	compute.type = "button";
	compute.value = "Compute";
	compute.addEventListener('click', calc);
	headDiv.appendChild(compute);
	var price = document.createElement('p');
	price.textContent = "Please wait..."
	price.id = "price";
	price.style += " text-align:center";
	headDiv.appendChild(price);
	//create a div that follows head so we have a place to add the children too
	var tailDiv = document.createElement('div');
	tailDiv.id = "tailDiv";
	document.body.append(tailDiv);
}

function calc(){ //used to run the calculation
	var type = document.getElementById("unit").value;
	var valu = document.getElementById("num1").value;
	let convURL = "http://" + location.hostname + ":8000/unitconv/convert?from=" + type + "&to=t_oz&value=" + valu;
	fetch(convURL)
		.then(response => response.json())
		.then(data => makeDiv(data));
}
var gData;
function makeDiv(data){
	gData = data;
	var newDiv = document.createElement('div');
	var rawDate = new Date();
	var parsedDate = (rawDate.getMonth() + 1) + "/" + rawDate.getDate() + "/" + rawDate.getFullYear() + " " + rawDate.toLocaleTimeString('en-US');
	
	if(gData.hasOwnProperty("error")){
		var fin = gData.error + ". " + "Error! ";
		newDiv.style.backgroundColor = "red";
		newDiv.innerHTML += fin;
	}
	else{
		newDiv.id = "headDiv";
		newDiv.className = "green stuff-box shadowed";
		newDiv.innerHTML = parsedDate + " The weight you entered is worth: $" + ((gData.value * theVal).toFixed(2)) + "! That is a ton of money!";
	}
		//create a listener to delete the new div on click
	newDiv.addEventListener('click', function(){
		this.remove();
	});
	//add the new div right after tail befor any of the other children
	tailDiv.prepend(newDiv);
}
//run the function to create the header
hdiv();
quand();
