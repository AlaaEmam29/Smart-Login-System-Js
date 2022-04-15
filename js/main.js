let emailSignUpInput = document.getElementById('emailLoginInput'),
    userNameSignUpInput = document.getElementById('userNameLoginInput'),
    passwordSignUpInput = document.getElementById('passwordLoginInput'),
    emailAlert = document.getElementById('emailInputAlert'),
    userNameAlert = document.getElementById('usernameInputAlert'),
    passwordAlert = document.getElementById('passwordInputAlert'),
    msgAlert = document.getElementById('msgAlert'),
    modelForm = document.querySelector('.system-form'),
    confirmBtn = document.getElementById('confirmBtn'),
    logInBtn = document.getElementById('logInBtn'),
    welcomeBody = document.getElementById('welcomeBody'),
    welcomeUser = document.getElementById('welcomeUser'),
    logOutBtn = document.getElementById('logOutBtn'),
    usersData,
    loginName;
loginName = "";
usersData = [];
if (localStorage.getItem("ListUsers") != null) {
    usersData = JSON.parse(localStorage.getItem("ListUsers"));

}
if (localStorage.getItem("UserName") != null) {
    loginName = localStorage.getItem("UserName");

}

function signUp() {
    if (checkIsEmpty()) {
        displayRequired();
    } else {
        addUser()
    }
}

function login() {
    if (checkIsEmptyLogin()) {
        displayRequired();
    }
    else if (NotRegister()) {
        displayNotRegister();
    }
    else {
        if (isUserLogin())
        {
            location.replace("welcome.html");

        } else {

            displayIncorrect();


        }

    }
}

function NotRegister() {
    if (!isExit(usersData)) {
        return true;

    } else {
        return false
    }
}

function displayNotRegister() {
    msgAlert.classList.replace('d-none','d-block')

    msgAlert.innerHTML = "This Email Not Register, Please register first!";

}

function displayIncorrect() {
    msgAlert.classList.replace('d-none','d-block')
    msgAlert.innerHTML = "invalid email or password , Please try again!";

}

function displaySuccess() {
    modelForm.innerHTML = `<div class="badge bg-success py-2 px-5">Done</div>
                                    <p class="done-msg py-4">Congratulations
                                    <br>Your account has been created successfully
                                    <br>
                                    You can log in to your accost now
                                    </p>
                                    <div>
                                    <a id="goToLoginBtn" type="button" class="btn btn-green w-100" href="index.html">Go to login page</a>
                                    </div>
                                    `;

}

function displayUserExist() {
    msgAlert.classList.replace('d-none', 'd-block')
    msgAlert.innerHTML = "This Email already exists, Please try again!";

}

function checkIsEmpty() {
    if (emailSignUpInput.value == "" || passwordSignUpInput.value == "" || userNameAlert.value == "") {
        return true;
    } else {
        return false;
    }
}

function checkIsEmptyLogin() {
    if (emailSignUpInput.value == "" || passwordSignUpInput.value == "") {
        return true;
    } else {
        return false;
    }
}

function displayRequired() {
    msgAlert.classList.replace('d-none', 'd-block');
    msgAlert.innerHTML = "All info are required";

}

function isUserLogin() {
    let userCheck = 0
    usersData = JSON.parse(localStorage.getItem('ListUsers'));
    for (let i = 0; i < usersData.length; i++) {
        if (usersData[i].email == emailSignUpInput.value && usersData[i].password == passwordSignUpInput.value) {
            loginName = usersData[i].name;
            localStorage.setItem('UserName', loginName);
            userCheck = 1
            break;

        }

    }
    return userCheck;
}

function addUser() {
    if (validationAllInputs() == true) {
        let user = {
            name: userNameSignUpInput.value,
            email: emailSignUpInput.value,
            password: passwordSignUpInput.value
        };
        if (!localStorage.getItem("ListUsers")) {
            usersData.push(user);
            localStorage.setItem("ListUsers", JSON.stringify(usersData));
            displaySuccess();

        } else {
            usersData = JSON.parse(localStorage.getItem('ListUsers'));

            if (isExit(usersData)) {
                displayUserExist();
            } else {
                usersData.push(user);
                localStorage.setItem("ListUsers", JSON.stringify(usersData));
                displaySuccess();

            }

        }


    }
}

function validationEmail() {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
    if (regex.test(emailSignUpInput.value) == true) {
        emailSignUpInput.classList.add('is-valid');
        emailSignUpInput.classList.remove('is-invalid');
        if (emailAlert) {
            emailAlert.classList.replace('d-block', 'd-none');

        }
        return true;
    } else {
        emailSignUpInput.classList.add('is-invalid');
        emailSignUpInput.classList.remove('is-valid');
        if (emailAlert) {
            emailAlert.classList.replace('d-none', 'd-block');
        }
        return false;
    }

}

function validationUserName() {
    let regex =
        /^[A-Z][a-z A-z 0-9]{2,}$/;
    if (regex.test(userNameSignUpInput.value) == true) {
        userNameSignUpInput.classList.add('is-valid');
        userNameSignUpInput.classList.remove('is-invalid');
        if (userNameAlert) {
            userNameAlert.classList.replace('d-block', 'd-none');

        }
        return true;
    } else {
        userNameSignUpInput.classList.add('is-invalid');
        userNameSignUpInput.classList.remove('is-valid');
        if (userNameAlert) {
            userNameAlert.classList.replace('d-none', 'd-block');
        }
        return false;
    }

}

function validationPassword() {
    let regex =
        /^[A-Za-z0-9]{5,}$/;
    if (regex.test(passwordSignUpInput.value) == true) {
        passwordSignUpInput.classList.add('is-valid');
        passwordSignUpInput.classList.remove('is-invalid');
        if(passwordAlert)
        {
            passwordAlert.classList.replace('d-block', 'd-none');
        }

        return true;
    } else {
        passwordSignUpInput.classList.add('is-invalid');
        passwordSignUpInput.classList.remove('is-valid');

        if(passwordAlert)
        {
            passwordAlert.classList.replace('d-none', 'd-block');
        }        return false;
    }

}

if(emailSignUpInput)
{
    emailSignUpInput.addEventListener('keyup', validationEmail);

}

if(passwordSignUpInput)
{
    passwordSignUpInput.addEventListener('keyup', validationPassword);

}
if (userNameSignUpInput) {
    userNameSignUpInput.addEventListener('keyup', validationUserName);

}

function validationAllInputs() {
    if (validationPassword() == true && validationEmail() == true && validationUserName() == true) {
        return true;
    } else {
        return false;
    }
}

if (confirmBtn) {
    confirmBtn.addEventListener('click', signUp)
}
if (logInBtn) {
    logInBtn.addEventListener('click', login)
}

function isExit(users) {
    let checkEmailExist = user => user.email === emailSignUpInput.value;

    if (users.some(checkEmailExist)) {
        return true;
    } else {
        return false;
    }
}
if(welcomeBody) {
    welcomeBody.addEventListener('load', function () {
        welcomeToUser();

    }, true)

}
function welcomeToUser()
{
    if(loginName != "")
    {
        welcomeUser.innerHTML = `Welcome ${loginName}`
    }
}
if(logOutBtn)
{
    logOutBtn.addEventListener('click',logOut)
}
function logOut()
{
    location.replace('index.html');
    localStorage.removeItem('UserName')
}