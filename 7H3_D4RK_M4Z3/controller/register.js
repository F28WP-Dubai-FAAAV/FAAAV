const switchContainer = document.querySelector(".switch-container");
const loginSwitch = switchContainer.children[0];
const signupSwitch = switchContainer.children[1];

const formContainer = document.querySelector(".form-container")
const loginForm = formContainer.children[0]
const signupForm = formContainer.children[1]

function loginSwitcher(){
    if(!loginSwitch.classList.contains("active")){
        loginSwitch.classList.add("active")
        loginForm.classList.remove("hide")
        signupSwitch.classList.remove("active")
        signupForm.classList.add("hide")
    }
}

function signupSwitcher(){
    console.log("clikc")
    if(!signupSwitch.classList.contains("active")){
        signupSwitch.classList.add("active")
        signupForm.classList.remove("hide")
        loginSwitch.classList.remove("active")
        loginForm.classList.add("hide")
    }
}

loginSwitch.addEventListener("click", loginSwitcher)

signupSwitch.addEventListener("click", signupSwitcher)