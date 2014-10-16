$(document).ready(function(){
  //Variable for where the "Monthly Excess" data will be stored in the DOM
  var $outputVal = $('#output');

  var $monthNameVal, $incomeVal, $foodVal, $rentVal;
  var $i = 0;
  //monthValues is the array that will store all of the month objects with their respective data
  var $monthValues = [];
  var $localArray = [];
  //monthExcess stores the value of the result of the calculateExcess function
  var $monthExcess;

  calculateExcess = function(food, rent, income) {
        var $totalExpenses = food + rent;
        return income - $totalExpenses;
      };

  //Create monthly object function.
  function monthly(monthName, income, food, rent) {
    this.monthName = monthName
    this.income = income;
    this.food = food;
    this.rent = rent;
    this.calculateExcess = function() {
      var $totalExpenses = this.food + this.rent;
      return this.income - $totalExpenses;
    };
  }

  //If newArray (what has been stored in localStorage) has values stored in it, run this:
  if ($.localStorage.isSet(1)) {

    //Calculates length of the array of objects that has been stored in localStorage.
    $monthValues = $.localStorage.get(1);
    var $length = $monthValues.length;
    //Sets the array counter to the length of the stored array, allowing users to add new items to the array later on.

    $.each($monthValues, function(index , value){
      $monthNameVal = $monthValues[index].monthName;

      $incomeVal = $monthValues[index].income;
      $incomeVal = parseInt($incomeVal, 10);

      $foodVal = $monthValues[index].food;
      $foodVal = parseInt($foodVal, 10);

      $rentVal = $monthValues[index].rent;
      $rentVal = parseInt($rentVal, 10);

      $monthExcess = calculateExcess($foodVal, $rentVal, $incomeVal);

      var $newOutputText = $monthNameVal + " : " + $monthExcess;
      $outputVal.append("<p>" + $newOutputText + "</p>");

    });
  }
  //If nothing has been stored in localStorage, set the array counter to 0
  else {
    $i = 0;
  }


  //When the submit buttin is clicked, create a new object in the monthValues array.
  $('#submit').click(function(){

    // Retrieves values from text inputs
    $monthNameVal = $('#monthName').val();
    $incomeVal = $('#income').val();
    $incomeVal = parseInt($incomeVal, 10);
    $foodVal = $('#food').val();
    $foodVal = parseInt($foodVal, 10);
    $rentVal = $('#rent').val();
    $rentVal = parseInt($rentVal, 10);

    var $currentMonth = new monthly($monthNameVal, $incomeVal, $foodVal, $rentVal);
    $monthValues.push($currentMonth);

    //Moves each object to localStorage array
    //$.localStorage[i] = JSON.stringify($monthValues[i]);
    $.localStorage.set(1 , $monthValues);

    $monthExcess = $currentMonth.calculateExcess();

    //Writes new object data to the DOM
    var $newOutputText = $monthNameVal + " : " + $monthExcess;
    $outputVal.append("<p>" + $newOutputText + "</p>");

    $i += 1;
  });

});

