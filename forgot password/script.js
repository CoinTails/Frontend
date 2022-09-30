const form = document.querySelector("form");
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),
codeDiv = document.querySelector(".input-code"),
resetPass = document.querySelector(".reset-pass"),
actionBtn = document.querySelector(".action-btn");


form.onsubmit = (e)=>{
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
  
  setTimeout(()=>{ //remove shake class after 500ms
    eField.classList.remove("shake");
  }, 500);

  eInput.onkeyup = ()=>{checkEmail();} //calling checkEmail function on email input keyup
  
  function checkEmail(){ //checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if(!eInput.value.match(pattern)){ //if pattern not matched then add error and remove valid class
      eField.classList.add("error");
      eField.classList.remove("valid");
      let errorTxt = eField.querySelector(".error-txt");
      //if email value is not empty then show please enter valid email else show Email can't be blank
      (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
    }else{ //if pattern matched then remove error and add valid class
      eField.classList.remove("error");
      eField.classList.add("valid");
    }
  }

  
  //if eField and pField doesn't contains error class that mean user filled details properly
  if(!eField.classList.contains("error")){
    //console.log(/*'email=', eInput.value,*/ 'pass =', pInput.value, "phoneNumber =", phoneInput.value);
    let email = {email:eInput.value};
    
    let query = Object.keys(email)
                 .map(k => encodeURIComponent(email[k]))
                 .join('&');
    
    let url = 'https://api.cointails.org/api/v1/auth/forget/' + query;
    
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "success") {//to display the toast of login success
          Toastify({
            text: "Check Your email and enter the code here  \n",
            duration: 5000,
            destination: "../login/loginmain.html",
            avatar: "../imgs/IMG-20220520-WA0007-removebg-preview.png",
            newWindow: false,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #4C4F50, #B0B0BO)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
          codeDiv.innerHTML = reset_code_div,
          resetPass.innerHTML = new_pass_div;
          actionBtn.value = "reset Password";
          document.querySelector(".code-class").focus();
        } else {//display toast if login wasn't succefull
          Toastify({
            text: "Error occured! \n Check your email and try again \n",
            duration: 8000,
            avatar: "../imgs/IMG-20220520-WA0007-removebg-preview.png",
            destination: "#",
            newWindow: false,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #4C4F50, #B0B0BO)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        }
    });

    //window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
  }
  const codefield = document.querySelector(".sent-code"),
  codeInput = document.querySelector(".code-input"),
  newPassf = document.querySelector(".newPass"),
  newPassI = document.querySelector(".new-password");

  fetch("https://api.cointails.org/api/v1/auth/forget", { //the login api url
      method: "POST",
      body:JSON.stringify({
        email:eInput.value,
        code:codeInput.value,
        password:newPassI.value
      }),
    })



}
let reset_code_div = 
`<div class="field sent-code">
    <div class="input-area">
      <input type="text" class="code-input" placeholder="Enter code">
      <i class="icon fas fa-user"></i>
      <i class="error error-icon fas fa-exclamation-circle"></i>
    </div>
    <div class="error error-txt">Wrong code!</div>
  </div>`;

let new_pass_div = 
`<div class="field newPass">
    <div class="input-area">
      <input type="password" class="new-password" placeholder="Enter new password">
      <i class="icon fas fa-lock"></i>
      <i class="error error-icon fas fa-exclamation-circle"></i>
    </div>
    <div class="error error-txt">Password can't be blank</div>
  </div>`;

