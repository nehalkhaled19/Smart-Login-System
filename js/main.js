// DOM
let userName = document.querySelector("#signinName")
let userEmail = document.querySelector("#signinEmail")
let userPass = document.querySelector("#signinPassword")
let validName = document.querySelector("#validName")
let validEmail = document.querySelector("#validEmail")
let validPass = document.querySelector("#validPass")
var signUp = document.querySelector("#signUp")
var Login = document.querySelector("#Login")
var loginPassword = document.getElementById("loginPassword")
var loginEmail = document.getElementById("loginEmail")
var incorrect = document.querySelector("#incorrect")
var incorrectInfro = document.querySelector("#incorrectInfro")
let welcome = document.getElementById('username')


// LIST
let list = []
if (localStorage.getItem("users") != null) {
    list = JSON.parse(localStorage.getItem("users"))
}
// ADD IN LIST
if (signUp != null) {
    signUp.addEventListener("click", function () {
        if (userName.value == "" || userEmail.value == "" || userPass.value == "") {
            incorrect.style.display = "block"
        }
        else if (valid(/^[a-zA-Z]{1,15}[ ]?[a-zA-Z]{1,15}$/, userName, validName) == true && valid(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, userEmail, validEmail) == true && valid(/^(?=.*[0-9])[0-9a-zA-Z]{5,}$/, userPass, validPass) == true) {
            if (repeat() == true) {
                let e = document.getElementById("exists")
                e.style.display = "block"
            }
            else {
                let user = {
                    name: userName.value,
                    email: userEmail.value,
                    pass: userPass.value
                }
                list.push(user)
                localStorage.setItem("users", JSON.stringify(list))
                let toLogin = document.getElementById("toLogin")
                toLogin.href = "Login.html"
            }
        }
        log
    })
}
// REPEAT
function repeat() {
    for (var i = 0; i < list.length; i++) {
        if (list[i].email.toLowerCase() == userEmail.value.toLowerCase()) {
            return true;
        }
    }
}
// CLEAR
// function clear() {
//     userName.value = ""
//     userEmail.value = ""
//     userPass.value = ""
// }
// VALID NAME
if (userName != null) {
    userName.addEventListener("keyup", function () {
        let regex = /^[a-zA-Z]{1,15}[ ]?[a-zA-Z]{1,15}$/
        valid(regex, userName, validName)
    })
}
// VALID EMAIL
if (userEmail != null) {
    userEmail.addEventListener("keyup", function () {

        let regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        valid(regex, userEmail, validEmail)
    })
}
// VALID PASSWORD
if (userPass != null) {
    userPass.addEventListener("keyup", function () {
        let regex = /^(?=.*[0-9])[0-9a-zA-Z]{5,}$/
        valid(regex, userPass, validPass)
    })
}
// REGEX FUNCTION
function valid(regex, userInfo, alert) {
    incorrect.style.display = "none"
    let test = regex.test(userInfo.value)
    if (test == false) {
        alert.style.display = "block"
        userInfo.classList.add("is-invalid")
        userInfo.classList.remove("is-valid")
        return false
    }
    else {
        alert.style.display = "none"
        userInfo.classList.add("is-valid")
        userInfo.classList.remove("is-invalid")
        return true
    }
}


// LOGIN
function log() {
    if (loginEmail.value == "" || loginPassword.value == "") {
        incorrect.style.display = "block"
    }
    else {
        incorrect.style.display = "none"
        for (let i = 0; i < list.length; i++) {
            if (list[i].email.toLowerCase() == loginEmail.value.toLowerCase() && list[i].pass == loginPassword.value) {
                localStorage.setItem('sessionUsername', list[i].name)
                Login.href = "home.html"
            }
            else {
                incorrectInfro.style.display = "block"
            }

        }
    }
}


// WELCOME
if (welcome != null) {
    var x = localStorage.getItem('sessionUsername')
   
    if (x) {
        welcome.innerHTML = "Welcome " + x
    }
}
// for logout
function logout() {
    localStorage.removeItem('sessionUsername')
}
