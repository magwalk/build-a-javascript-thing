//Variable for where the "Monthly Excess" data will be stored in the DOM
var outputVal = document.getElementById('output');

var monthNameVal;
var incomeVal;
var foodVal;
var rentVal;

//monthValues is the array that will store all of the month objects with their respective data
var monthValues = [];
//monthExcess stores the value of the result of the calculateExcess function
var monthExcess;

//If newArray (what has been stored in localStorage) has values stored in it, run this:
if (localStorage) {

  //Calculates length of the array of objects that has been stored in localStorage.
  var length = localStorage.length;
  //Sets the array counter to the length of the stored array, allowing users to add new items to the array later on.
  i = length;

  //Moves data from localStorage into the monthValues array, starting from position 0 and iterating through to the length of the localStorage array.
  for (x = 0; x < length; x++) {

    monthValues[x] = JSON.parse(localStorage[x]);

    monthNameVal = JSON.parse(localStorage[x]).monthName;
    incomeVal = JSON.parse(localStorage[x]).income;
    incomeVal = parseInt(incomeVal, 10);

    foodVal = JSON.parse(localStorage[x]).food;
    foodVal = parseInt(foodVal, 10);

    rentVal = JSON.parse(localStorage[x]).rent;
    rentVal = parseInt(rentVal, 10);

    //Defines the calculateExcess function - For some reason the object function is not stored in localStorage, so we need to re-define it here.
    calculateExcess = function(food, rent, income) {
      var totalExpenses = food + rent;
      return income - totalExpenses;
    };

    monthExcess = calculateExcess(foodVal, rentVal, incomeVal);

    //Writes object to the page.
    var newOutputElement = document.createElement('p');
    var newOutputText = monthNameVal + " : " + monthExcess;
    var newOutputTextNode = document.createTextNode(newOutputText);
    newOutputElement.appendChild(newOutputTextNode);
    outputVal.appendChild(newOutputElement);

  }
}
//If nothing has been stored in localStorage, set the array counter to 0
else {
  i = 0;
}

//Create monthly object function.
function monthly(monthName, income, food, rent) {
  this.monthName = monthName
  this.income = income;
  this.food = food;
  this.rent = rent;
  this.calculateExcess = function() {
    var totalExpenses = this.food + this.rent;
    return this.income - totalExpenses;
  };
}

//When the submit buttin is clicked, create a new object in the monthValues array.
document.getElementById('submit').onclick = function(){

  // Retrieves values from text inputs
  monthNameVal = document.getElementById('monthName').value;
  incomeVal = document.getElementById('income').value;
  incomeVal = parseInt(incomeVal, 10);
  foodVal = document.getElementById('food').value;
  foodVal = parseInt(foodVal, 10);
  rentVal = document.getElementById('rent').value;
  rentVal = parseInt(rentVal, 10);

  monthValues[i] = new monthly(monthNameVal, incomeVal, foodVal, rentVal);

  //Moves each object to localStorage array
  localStorage[i] = JSON.stringify(monthValues[i]);

  monthExcess = monthValues[i].calculateExcess();

  //Writes new object data to the DOM
  var newOutputElement = document.createElement('p');
  var newOutputText = monthValues[i].monthName + " : " + monthExcess;
  var newOutputTextNode = document.createTextNode(newOutputText);
  newOutputElement.appendChild(newOutputTextNode);
  outputVal.appendChild(newOutputElement);

  i += 1;
};



