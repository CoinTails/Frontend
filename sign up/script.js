const form = document.querySelector("form");
nField = form.querySelector(".fullname"),
nInput = nField.querySelector('input'),
phoneField = form.querySelector(".phone-no"),
phoneInput = phoneField.querySelector("input"),
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),
pField = form.querySelector(".password"),
pInput = pField.querySelector("input"),
confPassField = form.querySelector(".confirm-password"),
confPassInput = confPassField.querySelector("input");

form.onsubmit = (e)=>{
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
  (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();
  (confPassInput.value == "") ? confPassField.add("shake", "error") : passMatch();

  setTimeout(()=>{ //remove shake class after 500ms
    eField.classList.remove("shake");
    pField.classList.remove("shake");
    confPassField.classList.remove("shake");
  }, 500);

  eInput.onkeyup = ()=>{checkEmail();} //calling checkEmail function on email input keyup
  pInput.onkeyup = ()=>{checkPass();} //calling checkPassword function on pass input keyup
  confPassInput.onkeyup = ()=>{passMatch();} //calling matchPassword function on input keyup 

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

  function checkPass(){ //checkPass function
    if(pInput.value == ""){ //if pass is empty then add error and remove valid class
      pField.classList.add("error");
      pField.classList.remove("valid");
    }else{ //if pass is empty then remove error and add valid class
      pField.classList.remove("error");
      pField.classList.add("valid");
      //console.log(pInput.value);
      //passMatch();
    }
  }

  function passMatch() {
    if (confPassInput.value === pInput.value) {
      confPassField.classList.add("valid");
      confPassField.classList.remove("error");
    } else {
      confPassField.classList.add("error");
      confPassField.classList.remove("valid");
    }
  }

  //if eField and pField doesn't contains error class that mean user filled details properly
  if(!eField.classList.contains("error") && !pField.classList.contains("error")){
    //console.log('email=', eInput.value, 'pass =', pInput.value, 'confirmed Password=', confPassInput.value );
    fetch("https://api.cointails.org/api/v1/auth/register", { //the login api url
      method: "POST",
      body:JSON.stringify({
        phone:phoneInput.value,
        email:eInput.value,
        name:nInput.value,
        password:confPassInput.value
      }),
    })
    .then((response) => response.json())
    .then((result) => {
      //console.log("result status", result.status);
      if (result.status == "success") {
        Toastify({
          text: "Signed Up successfully, proceed to Login",
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
        //console.log("registerd in successfully");
      } else { 
        Toastify({
          text: "Error occured! \n Make sure passowrd has 8+ chars \n Add country code to Phone number \n",
          duration: 8000,
          avatar: "../imgs/IMG-20220520-WA0007-removebg-preview.png",
          destination: "#",
          newWindow: false,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function(){} // Callback after click
        }).showToast();
      
        //console.log("fucked up")
      }
    });
    //window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
  }
}


