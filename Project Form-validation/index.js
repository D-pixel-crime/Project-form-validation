document.addEventListener('DOMContentLoaded', function () {  // Event listener triggered when the DOM content is fully loaded and parsed.
    // Selecting form input elements
    var fullName = document.querySelector("#full-name");
    var email = document.querySelector("#email");
    var phone = document.querySelector("#phone-number");
    var pass = document.querySelector("#password");
    var confirm = document.querySelector("#confirm-password");
    var inputArea = document.querySelectorAll("input");

    // Object to track criteria for each input field
    var isCriteriaMet = {
        name: true,
        mail: true,
        number: true,
        pwd: true,
        confirm_pwd: true
    }

    // Function to set placeholder attribute
    function setPlaceholder(inputElement, placeholderText) {
        inputElement.setAttribute("placeholder", placeholderText);
    }

    // Function to handle focus in on input elements
    function handleFocusIn(inputElement, placeholderText) {
        setPlaceholder(inputElement, placeholderText);
        inputElement.classList.add("increase-width");
        document.querySelector(".form-container").classList.add("form-in-focus");
    }

    // Function to handle focus out on input elements
    function handleFocusOut(inputElement, placeholderText) {
        setPlaceholder(inputElement, placeholderText);
        inputElement.classList.remove("increase-width");
        document.querySelector(".form-container").classList.remove("form-in-focus");
    }

    // Function to check whether all characters are digit or not
    function isAlpha(str) {
        for (let i = 0; i < str.length; i++) {
            if (isNaN(parseInt(str[i]))) {
                return true; // Character is not a digit
            }
        }
        return false; // All characters are digits
    }
    

    // Function to validate email format
    function isEmailFormat(str) {
        if (str.length === 0) return true;   // If the input string is empty, consider the user has not made any inputs
        let i, j = -1, countDot = 0, countAt = 0;
        for (i = 0; i < str.length; i++) {   // Checks for the first '@' symbol
            if (str[i] === '@') {
                j = i;
                break;
            }
        }
        if (j === str.length - 1 || j === -1) {   // Checks if there is no '@' symbol and handles issue if string traversal
            return false;
        }
        else {   // Checks if there is no '.' symbol just after the '@' symbol
            if (str[j + 1] === '.') return false;
        }
        for (i = j + 1; j < str.length; j++) {    // Checks whether there are only alphanumeric characters after '@' symbol
            if (str[j] === '.') countDot++;
            else if (str[j] === '@') countAt++;
            else if ((str[j] >= 0 && str[j] <= 9)) continue;
            else if (isAlpha(str[j])) continue;
            else {
                return false;
            }
        }
        if (countDot > 1 || countAt > 1) return false;    // Checks whether there are only 1 '.' and '@' symbols present
        return true;
    }

    // Function to check criteria for all input fields
    function checkCriteria() {
        isCriteriaMet.name = (fullName.value.trim().length < 5 && fullName.value.trim().length !== 0) ? false : true;
        isCriteriaMet.number = ((phone.value.trim().length !== 10 || phone.value.trim() === "0123456789" || isAlpha(phone.value.trim())) && phone.value.trim().length !== 0) ? false : true;
        isCriteriaMet.pwd = ((pass.value.trim().length < 8 || pass.value.trim().toLowerCase() === "password" || pass.value.trim().toLowerCase() === fullName.value.trim().toLowerCase()) && pass.value.trim().length !== 0) ? false : true;
        isCriteriaMet.confirm_pwd = (confirm.value.trim().length !== 0 && (confirm.value.trim() !== pass.value.trim())) ? false : true;
        isCriteriaMet.mail = isEmailFormat(email.value.trim()) ? true : false;
    }


    // Event listeners for focus in/out on each input field  
    fullName.addEventListener("focusin", () => handleFocusIn(fullName, "Enter your Full Name"));
    fullName.addEventListener("focusout", () => handleFocusOut(fullName, "Name"));

    email.addEventListener("focusin", () => handleFocusIn(email, "Enter your e-mail ID"));
    email.addEventListener("focusout", () => handleFocusOut(email, "Email"));

    phone.addEventListener("focusin", () => handleFocusIn(phone, "Enter your Phone-number"));
    phone.addEventListener("focusout", () => handleFocusOut(phone, "Phone"));

    pass.addEventListener("focusin", () => handleFocusIn(pass, "Enter your password"));
    pass.addEventListener("focusout", () => handleFocusOut(pass, "Password"));

    confirm.addEventListener("focusin", () => handleFocusIn(confirm, "Confirm your password"));
    confirm.addEventListener("focusout", () => handleFocusOut(confirm, "Confirm"));

    for (let i = 0; i < inputArea.length; i++) {
        inputArea[i].addEventListener("focusin", () => handleFocusIn(inputArea[i], inputArea[i].getAttribute("placeholder")));
    }

    for (let i = 0; i < inputArea.length; i++) {
        inputArea[i].addEventListener("focusout", () => handleFocusOut(inputArea[i], inputArea[i].getAttribute("placeholder")));
    }


    // Event listener for change on each input field to check criteria
    // Check criteria when the content of the input changes and give warning when criteria is not met
    fullName.addEventListener("change", () => {
        checkCriteria();
        if (!isCriteriaMet.name) {
            document.querySelector(".name-criteria").classList.add("criteria-not-met");
        } else {
            document.querySelector(".name-criteria").classList.remove("criteria-not-met");
        }
        if (!isCriteriaMet.pwd) {
            document.querySelector(".pass-criteria").classList.add("criteria-not-met");
        } else {
            document.querySelector(".pass-criteria").classList.remove("criteria-not-met");
        }
    });

    email.addEventListener("change", () => {
        checkCriteria();
        if (!isCriteriaMet.mail) {
            document.querySelector(".mail-criteria").classList.add("criteria-not-met");
        } else {
            document.querySelector(".mail-criteria").classList.remove("criteria-not-met");
        }
    });
    phone.addEventListener("change", () => {
        checkCriteria();
        if (!isCriteriaMet.number) {
            document.querySelector(".phone-criteria").classList.add("criteria-not-met");
        } else {
            document.querySelector(".phone-criteria").classList.remove("criteria-not-met");
        }
    });

    pass.addEventListener("change", () => {
        checkCriteria();
        if (!isCriteriaMet.pwd) {
            document.querySelector(".pass-criteria").classList.add("criteria-not-met");
        } else {
            document.querySelector(".pass-criteria").classList.remove("criteria-not-met");
        }
    });

    confirm.addEventListener("change", () => {
        checkCriteria();
        if (!isCriteriaMet.confirm_pwd) {
            document.querySelector(".confirm-criteria").classList.add("criteria-not-met");
        } else {
            document.querySelector(".confirm-criteria").classList.remove("criteria-not-met");
        }
    });


    // Event listener for form submission
    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        var lastCheck = true;
        for (let i of inputArea) {
            if (i.value === "") {
                i.parentElement.lastElementChild.classList.add("criteria-not-met");
                lastCheck = false;
            }
        }
        
        for (let i in isCriteriaMet) {
            if (isCriteriaMet[i] === false) {
                lastCheck = false;
                break;
            }
        }
        if (!lastCheck) {
            var warning = document.createElement("p");
            warning.classList.add("criteria-not-met");
            warning.classList.add("criteria");
            warning.setAttribute("style", "font-size:1.5rem;margin: 0.5rem 0.25rem;word-wrap:break-word;text-align:center;");
            warning.innerHTML = "*Please fulfill all the criterias*";
            document.querySelector(".last-submit").appendChild(warning);
            setTimeout(() => {
                warning.remove();
            }, 3500);
        }
        else{
            var done = document.createElement("h2");
            done.classList.add("all-criterias-met");
            done.setAttribute("style", "font-size:1.5rem;margin: 0.5rem 0.25rem;word-wrap:break-word;text-align:center;");
            done.innerHTML = "*Thank You For filling the form, and experiencing this demo form-validation*.<br>*Your records are not stored.*";
            document.querySelector("body").appendChild(done);
            document.querySelector(".form-validation").classList.add("criteria");
            setTimeout(() => {
                done.remove();
                document.querySelector(".reset").click();
                document.querySelector(".form-validation").classList.remove("criteria");
            }, 4500);
        }
    });

    // Event listener for reset button click
    document.querySelector(".reset").addEventListener("click", () => {
        var allPara = document.querySelectorAll(".criteria");
        for (let i of allPara) {
            i.classList.remove("criteria-not-met");
        }
    });
});