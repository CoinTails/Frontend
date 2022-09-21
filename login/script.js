const form = document.querySelector("form");
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),
pField = form.querySelector(".password"),
pInput = pField.querySelector("input"),
phoneField = form.querySelector(".phone-no"),
phoneInput = phoneField.querySelector("input");
forgotPass = document.querySelector(".forgot_pass");

form.onsubmit = (e)=>{
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
  (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();

  setTimeout(()=>{ //remove shake class after 500ms
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 500);

  eInput.onkeyup = ()=>{checkEmail();} //calling checkEmail function on email input keyup
  pInput.onkeyup = ()=>{checkPass();} //calling checkPassword function on pass input keyup

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
    }
  }

  //if eField and pField doesn't contains error class that mean user filled details properly
  if(!eField.classList.contains("error") && !pField.classList.contains("error")){
    //console.log(/*'email=', eInput.value,*/ 'pass =', pInput.value, "phoneNumber =", phoneInput.value);
    fetch("http://api.cryptochainmarket.tk:8000/api/v1/auth/login", { //the login api url
      method: "POST",
      body:JSON.stringify({
        email:eInput.value,
        phone:phoneInput.value,
        password:pInput.value
      }),
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.status == "success") {//to display the toast of login success
        Toastify({
          text: "logged in successfully",
          duration: 10000,
          destination: "/index.html",
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
        //window.location.href = "/user profile/index.html";
      } else {//display toast if login wasn't succefull
        Toastify({
          text: "Error occured! \n Check your login details \n",
          duration: 8000,
          avatar: "../imgs/IMG-20220520-WA0007-removebg-preview.png",
          destination: "#",
          newWindow: false,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #4C4F50, #B0B0BO)",
          },
          onClick: function(){} // Callback after click
        }).showToast();
        alert("fucked up")
      }
    });
    //window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
  }
}

