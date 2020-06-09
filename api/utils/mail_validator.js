function ValidateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (email.value.match(mailformat)) {
        //change the input tag to focus
        document.form.text.focus();
        return true;
    } else {
        alert("You have entered an invalid email address!");
        document.form.text.focus();
        return false;
    }
}