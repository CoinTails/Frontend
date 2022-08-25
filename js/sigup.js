const response = new XMLHttpRequest();
const url = 'http://15.237.34.51:8000/api/v1/auth/register';
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

function select(el) {
    return document.querySelector(el);
}


let password = select('#password');
let conf_password = select('#conf_password')
let singup_btn = select('.btn_signup');


singup_btn.addEventListener('click', checkPassword);

function checkPassword() {
    let p1 = password.value;
    let p2 =conf_password.value;
    let mainPassword;
    if (p1===p2) {
        mainPassword=p2;
        final_details.password = mainPassword;
        emailcheck();
    }else{
        /*password.reset();
        conf_password.reset();*/
        password.focus();
        console.log("password doestn't match");
    }
}
function emailcheck() {
    let email = select('#email').value;
    email = email.toLowerCase();
    console.log(email);
    final_details.email=email;
    console.log('phone_number', phone_number, 'full name0', full_name);
    //console.log('json stringified',JSON.stringify(final_details));
}

let full_name = select('.signup_details_fullname').value;
let phone_number = select('.signup_details_phone_number').value;
let final_details =  {finalFull_name:'full_name',phone_number:'phone_number', email:'',password:''};

xhr.open("POST", url);

xhr.send(final_details);

/*response.open("POST", url)
response.setRequestHeader('Content-Type', 'application/json');
let final_details_json = JSON.stringify(final_details);
//console.log(final_details_json);
response.send(final_details_json);*/