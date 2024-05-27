document.addEventListener("DOMContentLoaded", function() {

    var form = document.getElementById("signup-form");

    form.addEventListener("submit", function(event) {

        event.preventDefault();
        // console.log("Submit button clicked!");

        // Get the input values by their element IDs
        const fname = document.getElementById('fullname').value;
        const surname = document.getElementById('surname').value;
        const dob = document.getElementById('dob').value;
        const gender = document.getElementById('gender').value;
        const country = document.getElementById('country').value;
        const phone = document.getElementById('phone').value;
        const cardNumber = document.getElementById('card-number').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Check if the full name and surname is valid
        const namePattern = /^[a-zA-ZÀ-ÿ-' ]*$/u; //consists of letters, accented letters, dashes, single quotes, and spaces
        if (fname.length > 100 || !namePattern.test(fname)) {
            alert('Invalid name. Please enter a valid name.');
            return; 
        }
        if (surname.length > 100 || !namePattern.test(surname)) {
            alert('Invalid surname. Please enter a valid surname.');
            return;
        }

        //check if phone number is valid
        const phonePattern = /^\d{1,16}$/; // digits and length <= 16
        if (!phonePattern.test(phone)) {
            alert('Invalid phone number. Please enter a valid phone number.');
            return; 
        }

        //check if card number is valid
        const cardPattern = /^\d{1,25}$/; // digits and length <= 25
        if (!cardPattern.test(cardNumber)) {
            alert('Invalid card number. Please enter a valid card number.');
            return; 
        }

        //check if email is valid
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // email pattern
        if (!emailPattern.test(email)) {
            alert('Invalid email address. Please enter a valid email.');
            return; 
        }

        //check if password is valid
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/; // password pattern
        if (!passwordPattern.test(password)) {
            alert('Invalid password. Please enter a valid password that is min 8 chars, incl. numbers, upper, lower & special char.');
            return; 
        }

        console.log('Full Name:', fname);
        console.log('Surname:', surname);
        console.log('Date of Birth:', dob);
        console.log('Gender:', gender);
        console.log('Country:', country);
        console.log('Phone:', phone);
        console.log('Card Number:', cardNumber);
        console.log('Email:', email);
        console.log('Password:', password);

    });
});