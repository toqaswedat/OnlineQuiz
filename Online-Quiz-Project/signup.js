'use strict';

//===================Global Declarations==========================//
let loginForm = document.getElementById("firstForm");
let signupForm = document.querySelector(".signupForm");
let signinLink = document.querySelector(".signinLink");
let signupLink = document.querySelector(".signupLink");
let emailField = document.querySelector(".emailSignin");
let loginPasswordField = document.querySelector(".passwordLogin");
let signupPasswordField = document.querySelector(".passwordSignup");
let rsignupPasswordField = document.querySelector(".rpasswordSignup");
let repeatPasswordValue;
let msg1 = document.querySelector(".msg1");
let msg2 = document.querySelector(".msg2");
let signupBtn = document.querySelector(".signupBtn");
let signinBtn = document.querySelector(".loginBtn");
let signupValid = document.querySelector(".emailSignup");
let signupstatus;
let correctCheck = document.querySelector(".fa-check-circle");
let wrongCheck = document.querySelector(".fa-exclamation-circle ");
let wrongCheck2 = document.querySelector(".iconsPass .fa-exclamation-circle");
let correctCheckForSignUpValidation = document.querySelector(".signupField  .fa-check-circle");
let wrongCheckForSignUpValidation = document.querySelector(".signupField  .fa-exclamation-circle");

//-----------------------------------------------------------//
// if(window.innerWidth<=656){
//   document.body.style.background=" linear-gradient(20deg, rgba(253, 70, 82, 1) 50%, rgba(248, 247, 247, 1) 50%)";
// }
//==============================Toggle Between Create Account and Login Sections======================//

signinLink.addEventListener("click", goSignin);
function goSignin() {
  loginForm.style.display=" flex";

  signupForm.style.display = "none";
}
signupLink.addEventListener("click", goSignup);
function goSignup() {
  signupForm.style.display = " flex";

  loginForm.style.display = "none";
}
  

//------------------------------------------------------------------------------------------------------------//

//======================================Signup password length and matching validation========================//

//------Validation for Password Field-------//
signupPasswordField.addEventListener("keyup", invalidPassword);

function invalidPassword() {
  let passwordValue= signupPasswordField.value;
  let passwordLength = passwordValue.length;
  
  if (passwordLength < 6) {l
    msg1.innerHTML = "Password must be of a minimum length of 6 characters";
  }
  else{
    msg1.style.display='none';
  }
}
//------Validation for Repeat Password Field-------//

rsignupPasswordField.addEventListener("keyup", invalidRepeatPassword);
function invalidRepeatPassword() {
  let passwordValue= signupPasswordField.value;
  repeatPasswordValue = rsignupPasswordField.value;
  
//-----------Validation for Matching-----------------//

if (!(repeatPasswordValue == passwordValue)) {
  msg2.innerHTML = "Passwords Don't Match";
}
else{
  msg2.style.display='none';
}
}


//---------------------------------------------------------------------------------------------------------------//

//==============================================Handling new user creation========================================//

//------------Checking if user follows the email rules on signup section (Before Clicking SignUp Button)--------//

signupValid.addEventListener("keydown", validationEmail);
function validationEmail(){
const regx = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let emailValue = signupValid.value;
if (emailValue.match(regx)) {
  signupValid.style.border = "3px solid green";
  correctCheckForSignUpValidation.style.display = "block";
  wrongCheckForSignUpValidation.style.display = "none";
} else {
  signupValid.style.border = "3px solid red";
  wrongCheckForSignUpValidation.style.display = "block";
  correctCheckForSignUpValidation.style.display = "none";
}
}
//------------------------------------------------------------------------------//
//----------------------------Click Enter to Signup------------------------------//
signupPasswordField.addEventListener('keydown',enterKeySignup)
rsignupPasswordField.addEventListener('keydown',enterKeySignup)
signupValid.addEventListener('keydown',enterKeySignup)

function enterKeySignup(ev){
  if(ev.keyCode == 13){
    newSignup();
  }
}
//----------------------------On click of the signup button----------------------//
signupBtn.addEventListener("click", newSignup);
function newSignup() {
  
  //----Function Declarations--------//
  let fname = document.querySelector(".usernameSignup").value;
  let email = document.querySelector(".emailSignup").value;
  let passwordValue = signupPasswordField.value;
  let user = {
    fname: fname,
    email: email,
    password: passwordValue,
    yourFirstTime: true,
  };
  let passwordLength = passwordValue.length;
  repeatPasswordValue = rsignupPasswordField.value;
  let repeatPasswordlength = repeatPasswordValue.length;
  const regx = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  let userEmail = user.email;
  let sigupEmailRule = userEmail.match(regx);
  
  //--------Check if the Email already exists in the local storage----------//
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).includes("@")) {
      if (user.email == localStorage.key(i)) {
        signupstatus = true;
      }
    } else {
      continue;
    }
  }
  
  //----------Evaluate the syntax of users inputs to decide whether to store it or not and toggle automaically to login section if true--------//
  if (signupstatus || passwordLength < 6 || passwordLength != repeatPasswordlength || fname == "" || sigupEmailRule == null){
      alert("incorrect email or password");
  } else {
    let userOjectToString = JSON.stringify(user);
    localStorage.setItem(userEmail, userOjectToString);
    goSignin();
  }
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------//


//======================================================== Handeling Login ===============================================================================//

//------------Login when user presses ENTER KEY -------//
emailField.addEventListener("keyup",enterKey);
loginPasswordField.addEventListener("keyup",enterKey);
function enterKey(event){
  if(event.keyCode === 13){
    goQuiz();
  }
}

//-----------------------------------------------------//

//-----------------Validation for user email input(Before clicking Login) -------------//

// emailField.addEventListener("keydown", checkEmail);
// function checkEmail() {
  //   let email = emailField.value;
  //   const regx = /^[^ ]+@[^ ]+\.[a-z]{1,3}$/;
  
  //   if (email.match(regx)) {
    //     emailField.style.border = "3px solid green";
    //     correctCheck.style.display = "block";
    //     wrongCheck.style.display = "none";
    //   } else {
      //     emailField.style.border = "3px solid red";
      //     wrongCheck.style.display = "block";
      //     correctCheck.style.display = "none";
      //   }
      // }
      
      //-----------------------------------------------------------------------------------// 
      
      
signinBtn.addEventListener("click", goQuiz);
//------------------------What happens when user clicks login button-------------------//
function goQuiz() {
  //-----------------Function Declarations---------------------//
  let email = emailField.value;
  let password = loginPasswordField.value;
  let located = false;
  let locatedIndex;
  sessionStorage.setItem("0", email);
  let userObjectFromLocalStorage;

  //------------------------------------------------------------//

  //---------------- searching for users email in local storage ------------//

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).includes("@")) {
      if (email == localStorage.key(i)) {
        located = true;
        locatedIndex = i;
      } else {
        continue;
      }
    }
  }
  //--------------------------------------------------------------------------//
  
  //-------------------Handeling if the email and password matches data in local storage---------------//
  
  if (located) {
    userObjectFromLocalStorage = JSON.parse(localStorage.getItem(localStorage.key(locatedIndex)));
    
    if (password == userObjectFromLocalStorage.password && located) {
      window.location.href = "welcome.html";
    } else {
      emailField.style.border = "3px solid red";
      loginPasswordField.style.border = "3px solid red";
      wrongCheck.style.display = "block";
      wrongCheck2.style.display = "block";
      correctCheck.style.display = "none";
      setTimeout(function () {
        alert("incorrect email or password");
      }, 100);
    }
  }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------//



