"use strict";

//==================================The Array of objects containing the quiz questions and answers====================//
let Question = [
  {
    question: "What does HTML stand for?",
    option1: "Hyper Text Markup Language",
    option2: "Hyperlinks and Text Markup Language",
    option3: "Home Tool Markup Language",
    Answer: "Hyper Text Markup Language",
  },

  {
    question: "Choose the correct HTML element for the largest heading:",
    option1: "h1",
    option2: "head",
    option3: "heading",
    Answer: "h1",
  },

  {
    question: "What is the correct HTML element for inserting a line break?",
    option1: "br",
    option2: "break",
    option3: "lb",
    Answer: "br",
  },

  {
    question: "Which HTML tag is used to define an internal style sheet?",
    option1: "css",
    option2: "style",
    option3: "script",
    Answer: "style",
  },

  {
    question: "What does CSS stand for?",
    option1: "Colorful Style Sheets",
    option2: "Creative Style Sheets",
    option3: "Cascading Style Sheets",
    Answer: "Cascading Style Sheets",
  },

  {
    question: "Which is the correct CSS syntax?",
    option1: "body:color=black;",
    option2: "{body;color:black;}",
    option3: "body {color: black;}",
    Answer: "body {color: black;}",
  },

  {
    question: "Inside which HTML element do we put the JavaScript?",
    option1: "javascript",
    option2: "script",
    option3: "scripting",
    Answer: "script",
  },

  {
    question: 'How do you write "Hello World" in an alert box?',
    option1: 'msgBox("Hello World");',
    option2: 'alertBox("Hello World");',
    option3: 'alert("Hello World");',
    Answer: 'alert("Hello World");',
  },

  {
    question: "How do you create a function in JavaScript?",
    option1: "function:myFunction()",
    option2: "function myFunction()",
    option3: "function = myFunction()",
    Answer: "function myFunction()",
  },

  {
    question: "How to write an IF statement in JavaScript?",
    option1: "if i == 5 then",
    option2: "if (i == 5)",
    option3: "if i == 5 then",
    Answer: "if (i == 5)",
  },
];


//-----Locating the correct answers----//

let correctAnswers = [];
for (let i = 0, length = Question.length ; i < length; i++) {
  correctAnswers[i] = Question[i].Answer;
}

//======================================================Saving Correct Answers To Local Storage=============================================//

function saveCorrectAnswersToStorage(correctAnswers) {
  
  //In Order to print the question number in the keys in the local storage//
  let questionNumber = 0;
  /////Saving each element in the correct answers array coming from Questions Object into the storage as separate key for each question with the Text of the correct answer///////
  for (let i of correctAnswers) {
    localStorage.setItem(`Question${questionNumber}`, i);
    questionNumber++;
  }
}
saveCorrectAnswersToStorage(correctAnswers);

//=====================================================================Declarations===========================================================//

//Getting Username from session storage//
let username;
let passOrFail;
let insertName = document.querySelector(".insertName");
let loggedinUserBefore = sessionStorage.getItem(0);
let loggedinUser = JSON.parse(localStorage.getItem(loggedinUserBefore));
const nextButton = document.querySelector(".nextButton");
let mainDiv = document.querySelector("main");
let quizQuestion = document.querySelector(".quiz-question");
let quizAnswer = document.getElementsByTagName("label");
let letStart = document.querySelector(".letsStart");
let showRadio = document.getElementsByClassName("radio");
let endQuiz = document.querySelector(".endQuiz");
let welcoming = document.querySelector(".welcoming");
let quizTitle = document.querySelector(".quiz-title");
let divChoice= document.getElementsByClassName("choice");
let quizContent=document.querySelector(".quiz-content");
let quizContainer=document.querySelector(".quiz-container");
let currentQuestion = 1;
let correctStatus = [];
let userAnswers = [];
let userCurrentAnswerText;
let correctAnswersCounter = 0;
let value = false;
let count = 1;
let showResultBtn;
let hideResultBtn;
let showCounter = 0;

//Saving question keys from Local Storage into an array//
let questionsFromLocal = []; ////Array that will contain the questions from local storage////
let questionsFromLocalLength = localStorage.length;
let countQ = 0;
for (let j = 0; j < questionsFromLocalLength; j++) {
  if (localStorage.key(j).includes("@")) {
    continue;
  } else {
    questionsFromLocal[countQ] = localStorage.key(j);
    countQ++;
  }
}
questionsFromLocal.sort();


//=====================================================Initial Rules (DOM Manipulation)=====================================================//

//---------- If the user has not logged in-------//
if(!loggedinUserBefore){
  mainDiv.innerHTML = "<h1> YOU HAVE NO ACCESS FOR THIS QUIZ, PLEASE LOGIN!"
}
//----------If the user has already took the exam------//
else if(!(loggedinUser.yourFirstTime)){
  mainDiv.innerHTML = `You ${loggedinUser.passOrFail} The Exam and Your Result is ${loggedinUser.yourScore}`
}
//---------Showing user's name from local storage-------//
else{

insertName.innerHTML = `${loggedinUser.fname}` ;
}

nextButton.style.display = "none";
quizContent.style.display ="none";

//=====================================================Let's Start Button Dom Manipulation==================================================//

letStart.addEventListener("click", function () {

  quizContent.style.display="flex";

  //hide welcoming
  welcoming.style.display = "none";
  //show Next button
  nextButton.style.display = "inline-block";

  for(let i=0; i<divChoice.length; i++){
    divChoice[i].style.display = "flex";
  }
  //show Radio button
  for (let i = 0; i < showRadio.length; i++)
    showRadio[i].style.visibility = "visible";

  // hidden the let`s start button
  document.querySelector(".letsStart").style.display = "none";

  // show the question one
  quizQuestion.innerHTML = Question[0].question;

  // // show the options of question one
  quizAnswer[0].innerHTML = Question[0].option1;
  quizAnswer[1].innerHTML = Question[0].option2;
  quizAnswer[2].innerHTML = Question[0].option3;

});


//======================================================Validating Users Answers + Moving To The Next Question==============================//

//====Functions to be called in the nextBtn Event Listner==//
function validateUserAnswer(){
    let userCurrentAnswerValue;
    // 1) Determining which answer the user has chosen (will save the input value as a number)//
    for(let i =0; i<showRadio.length; i++){
    if (showRadio[i].checked) {
        userCurrentAnswerValue = showRadio[i].value;
        userCurrentAnswerText = document.getElementById(
        `a${userCurrentAnswerValue}`
        ).innerHTML;
    }
    } 
    /* -Comparing user answer with correct answer.
    -Editing the correct counter if the answer is correct.
    -Pushing the correct status to correctStatus Array:
    *if correct answer-->i will push true
    *if wrong answer--> i will push false
    */
    if (
        userCurrentAnswerText ==
        localStorage.getItem(questionsFromLocal[currentQuestion - 1])
    ) {
        correctAnswersCounter++;
        correctStatus.push(true);
    } else {
        correctStatus.push(false);
    }
    userAnswers.push(userCurrentAnswerText); //pushing the user answer to the userAnswers array//

}

function endExamClickFunction(){
  loggedinUser.yourFirstTime = false;
  loggedinUser.yourScore = `${correctAnswersCounter}/10`;
  let content = document.querySelector(".quiz-content");
  content.style.display="flex"
  content.style.alignItems="center"
  content.innerHTML = "<h2 class='complete'>You Completed The Quiz</h2>";
  content.innerHTML += `<p class='complete1'>Your result:</p>`;
  content.innerHTML +=
  `<h2>` +
  correctAnswersCounter +
  ` / ${currentQuestion}</h2>`;
  
  if (correctAnswersCounter >= currentQuestion / 2) {
    loggedinUser.passOrFail = "Passed";
    content.innerHTML += `<img  class="resultimg" src="./assets/images/pass.png"/>`;
  } else {
    loggedinUser.passOrFail = "Failed";
    content.innerHTML +=`<img  class="resultimg" src="./assets/images/failed.png"/>`;
  }
  localStorage.setItem(loggedinUserBefore, JSON.stringify(loggedinUser));

  content.innerHTML += `<input type="button" value="Check Answers" class="show" >`;
  content.innerHTML += `<input type="button" value="Hide Answers" class="hideBtn" >`;
  let completeText = document.querySelector('.complete');
  let completeText1 = document.querySelector('.complete1');
  let resultimg = document.querySelector(".resultimg")
  showResultBtn = document.querySelector(".show");
  hideResultBtn = document.querySelector(".hideBtn");
  hideResultBtn.style.display = "none"

  showResultBtn.addEventListener("click", function () {

    checkAnswer(correctStatus, userAnswers);
    resultimg.style.display = "none"
    completeText.style.display = "none"
    completeText1.style.display = "none"
    showResultBtn.style.display = "none";
    hideResultBtn.style.display = "inline-block";
    table.style.display = "block";
    hideResultBtn.addEventListener("click", function () {
      resultimg.style.display = "block"
      completeText.style.display = "block"
      completeText1.style.display = "block"
      table.style.display = "none";
      content;
      hideResultBtn.style.display = "none";
      showResultBtn.style.display = "inline-block";
    });
    
  });

}
//==============Next Button and End Exam Event Listner=================//
nextButton.addEventListener("click", function () {
  value = false;
  //check if the user selected one of the radios//
  for (let i = 0; i < showRadio.length; i++) {
    if (showRadio[i].checked) value = true;
  }
  //==If the user has selected one of the radios==//
  if (value) {
    validateUserAnswer();
    //==Questions [1-9]==//
    if(currentQuestion<=9){
      currentQuestion++; //incrementing the current question number//
      //Resetting the selection of the user//
      for(let i =0; i<showRadio.length; i++){
        showRadio[i].checked = false;
      }
      // show the next question
      for (let i = 1; i < Question.length; i++) {
        quizQuestion.innerHTML = Question[count].question;

        quizAnswer[0].innerHTML = Question[count].option1;
        quizAnswer[1].innerHTML = Question[count].option2;
        quizAnswer[2].innerHTML = Question[count].option3;

        if (count === Question.length - 1) {
          nextButton.value = "End-Exam";
        }
      }
      //  Increase the counter to move to the next question
      count++;
    }

    //== final question (question Number 10)==//
    else {
      endExamClickFunction();
    }
      
  }
  //==If the User has not selected any of the radios==//
  else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Choose one of the options!",
    });
  }
});



let table = document.createElement("table"); //creating a table to show the user's answers//

function checkAnswer(correctStatus, userAnswers) {
  let examQuestion = [];
  for (let i = 0, length = Question.length; i < length; i++) {
    examQuestion[i] = Question[i].question;
  }

  let quizDiv = document.querySelector(".quiz-content"); //selecting the div where the table will be inserted//
  if (showCounter < 1) {
    for (let i = 0; i < userAnswers.length; i++) {
      //
      let listItem = document.createElement("tr"); //creating a row for each question//
      let questionCell = document.createElement("td"); //creating a cell for each question//
      questionCell.innerHTML = examQuestion[i];

      let userAnswerCell = document.createElement("td"); //creating a cell for each user answer//
      userAnswerCell.innerHTML = `${userAnswers[i]}`;

      if (correctStatus[i] == true) {
        //if the user answer is correct//

        userAnswerCell.style.color = "green"; //changing the color of the user answer cell to green//
      } else {
        userAnswerCell.style.color = "red"; //changing the color of the user answer cell to red//
      }

      table.appendChild(listItem); //adding the row to the table//
      listItem.appendChild(questionCell); //adding the question cell to the row//
      listItem.appendChild(userAnswerCell); //adding the user answer cell to the row//
    }
    quizDiv.appendChild(table); //adding the table to the div//
  } showCounter++;

  // quizContainer.style.height="100%";
  

  
}





