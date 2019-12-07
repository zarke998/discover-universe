var hasError;

$(document).ready(function () {
    $(".sidenav").sidenav();

    $("#registerBtn").click(validateRegister);
    $("#loginBtn").click(login);
})

function validateRegister() {
    var error = false;
    hasError = false;

    error = checkEmailError();
    if (error){
        addErrorMessageToElement($("#registerEmail"), "Email can only use lowercase letters, numbers and '.'");
        hasError = true;
    }
    else
        removeErrorMessageFromElement($("#registerEmail"));


    error = false;

    error = checkUsernameError();
    if (error){
        addErrorMessageToElement($("#registerUsername"), "Username can only contain lowercase letters and numbers.");
        hasError = true;
    }
    else
        removeErrorMessageFromElement($("#registerUsername"));


    error = false

    error = checkPasswordError();
    if (error){
        addErrorMessageToElement($("#registerPassword"), "Password can contain only letters and numbers and must be 8 characters or longer.");
        hasError = true;
    }
    else {
        removeErrorMessageFromElement($("#registerPassword"));
        if (confirmPassword($("#registerPassword").val()))
            removeErrorMessageFromElement($("#registerConfirmPassword"));
        else{
            addErrorMessageToElement($("#registerConfirmPassword"), "Passwords do not match.");
            hasError = true;
        }
    }

    if (checkEducationError()){
        addErrorMessageToElement($("#registerEducation"), "Please select an option.");
        hasError = true;
    }
    else
        removeErrorMessageFromElement($("#registerEducation"));

    if(!hasError && localStorage){
        var email = $("#registerEmail").val();
        var username = $("#registerUsername").val();
        var password = $("#registerPassword").val();
        if(localStorage.getItem(email) != null && localStorage.getItem(username) != null)
            alert("You have already registered.");
        else if(localStorage.getItem(email) == null && localStorage.getItem(username) != null)
            alert("Username is already taken.");
        else{
            localStorage.setItem(username, password);
            localStorage.setItem(email, password);
            alert("Registration successful");
        }
            
    }
}

function checkEmailError() {
    var email = $("#registerEmail").val();
    if (email == "")
        return true;
    var regEx = /^[a-z][a-z\d]+@[a-z]+(\.[a-z]+)+$/;

    if (regEx.test(email))
        return false;
    else
        return true;
}
function checkUsernameError() {
    var username = $("#registerUsername").val();

    if (username == "")
        return true;

    var regEx = /^[a-z\d]+$/

    if (regEx.test(username))
        return false;
    else
        return true;
}
function checkPasswordError() {
    var password = $("#registerPassword").val();

    if (password == "")
        return true;

    var regEx = /^[A-Za-z\d]{8,}$/

    if (regEx.test(password))
        return false;
    else
        return true;
}
function confirmPassword(password) {
    var confirmedPassword = $("#registerConfirmPassword").val();

    if (confirmedPassword == password)
        return true;
    else
        return false;
}
function checkEducationError() {
    var educationSelectValue = $("#registerEducation").val();

    if (educationSelectValue == 0)
        return true;
    else
        return false;
}

function addErrorMessageToElement(element, message) {
    $(element).addClass("input-invalid");

    if ($(element).parent().find(".input-invalid-tooltip").length == 0) {
        var errorTag = $("<p></p>");
        errorTag.addClass("input-invalid-tooltip");

        errorTag.append(document.createTextNode(message));

        $(element).parent().append(errorTag);
    }
}
function removeErrorMessageFromElement(element) {
    $(element).removeClass("input-invalid");
    $(element).addClass("input-valid");

    var parentElement = $(element).parent();
    parentElement.find(".input-invalid-tooltip").remove();
}
function login(){
    var emailUsername = $("#loginEmailUsername").val();
    var password = $("#loginPassword").val();

    if(localStorage){
        if(localStorage.getItem(emailUsername) == null)
            addErrorMessageToElement($("#loginEmailUsername"), "You have not registered yet.");
        else{
            removeErrorMessageFromElement($("#loginEmailUsername"));

            var loginPass = localStorage.getItem(emailUsername);
            if(password != loginPass) 
                addErrorMessageToElement($("#loginPassword"), "Incorrect password.");
            else{
                removeErrorMessageFromElement($("#loginPassword"));
                alert("Login successful");
            }
        }
    }
}