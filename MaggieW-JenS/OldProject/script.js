function contactForm(nameValue, email, comment) {
  this.nameValue = nameValue;
  this.email = email;
  this.comment = comment;
}

var contactForms = [];
var i = 0;

document.getElementById('clickButton').onclick = function(){

  var nameVal = document.getElementById('nameVal').value;
  var emailVal = document.getElementById('emailVal').value;
  var commentVal = document.getElementById('commentVal').value;

  contactForms[i] = new contactForm(nameVal, emailVal, commentVal);

  var outputVal = document.getElementById('output');

  var newOutputElement = document.createElement('p');
  newOutputElement.setAttribute('class','wallPost');
  var newOutputText = document.createTextNode(contactForms[i].nameValue + " " + contactForms[i].email + " " + contactForms[i].comment);
  newOutputElement.appendChild(newOutputText);
  outputVal.appendChild(newOutputElement);
  // Things to do next :
  // - add styling to our wall posts
  // - put each object property into its own span
  // - keep them there with local storage

  i += 1;
};


