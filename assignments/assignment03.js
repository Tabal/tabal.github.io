let elem = [];
// assign the entire table row for hole 1 to a variable, elem
// elem[1] = document.getElementById("1");

// display the number of children (all td elements)
// console.log(elem.children.length);
// display the content of the + button, which is the first child of the fifth element
// console.log(elem.children[4].children[0]); 

// assign a function to the + button
// elem[1].children[4].children[0].onclick = function(){add1(elem[1]);};

//Create a clear button for each hole first
for(let i=1; i<=18; i++) {
  elem[i] = document.getElementById(i.toString()); //Get the next row
  let clearButton = document.createElement("button"); //Create the button
  clearButton.innerHTML = "c"; //"C" for clear
  clearButton.className = "btn btn-primary"; //Bootstrap class for style
  elem[i].children[4].appendChild(clearButton) //Append it to the parent element next to the other buttons
}

for(let i=1; i<=18; i++) {
  // console.log(i);
  elem[i] = document.getElementById(i.toString());
  elem[i].children[4].children[0].onclick = function(){add1(elem[i]);};
  elem[i].children[4].children[1].onclick = function(){sub1(elem[i]);};
  elem[i].children[4].children[2].onclick = function(){clear(elem[i]);};
}

// create an "add1" function
function add1 (elem) {
  if(elem.children[2].innerHTML == "-") 
    elem.children[2].innerHTML = "1";
  else {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    elem.children[2].innerHTML = currentScore + 1;
  }
  
  // Update the Over/Under
  overUpdate(elem, 1);

  // Adds 1 to the total score
  totalsUpdate(1);
}

// create a "sub1" function
function sub1 (elem) {
    if(elem.children[2].innerHTML == "-")
      elem.children[2].innerHTML = "-1";
    else {
      let currentScore = elem.children[2].innerHTML;
      currentScore = Number.parseInt(currentScore);
      elem.children[2].innerHTML = currentScore - 1;
    }
    
    //Update the Over/Under
    overUpdate(elem, -1);

    //Subtracts 1 from the total score
    totalsUpdate (-1);
}

function clear (elem) {
  let change = elem.children[2].innerHTML; //Get the score to clear
  change = Number.parseInt(change); //Conver to integer
  change = 0 - change; //Make it negative
  totalsUpdate(change); //Update the total score
  elem.children[2].innerHTML = "-"; //Reset the score for the hole
  elem.children[3].innerHTML = "-"; //Reset the over for the hole
}

//Will update the total score based on changes to individual scores for each hole
function totalsUpdate (change) {
  //Update the total score
  let totals = document.getElementById('scoreTotal'); //Get the score total element
  let scoreTotal = totals.innerHTML; //Set the current total score
  scoreTotal = Number.parseInt(scoreTotal); //Convert the string to a number
  totals.innerHTML = scoreTotal + change; //Add or Subtract as needed

  //Update the total Over
  let over = document.getElementById('overTotal'); //Get the total over element
  over.innerHTML = totals.innerHTML - 74;
}

function overUpdate (elem, firstStep) {
  if(elem.children[3].innerHTML == "-") {
    if(firstStep == 1) //If increasing the score for the first stroke
      elem.children[3].innerHTML = "-3";
    else //If decreasing the score for the first stroke
      elem.children[3].innerHTML = "-5";
  }
  else {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    elem.children[3].innerHTML = currentScore - 4; //Diplsya the difference between the score and par
  }
}