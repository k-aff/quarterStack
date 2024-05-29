document.addEventListener('DOMContentLoaded', function() {
  // Fetch user details from the server
  fetchUserDetails();
});
function fetchUserDetails() {
  // Retrieve email from local storage
  //const email = localStorage.getItem("email");
  const email="beverly@gmail.com";

  if (email) {
    const requestBody = {
      email: email,
      type: "getUser"
    };

    fetch('http://localhost/Practical5_quarterStack/quarterStack-1/hoopAPI.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      // Check for errors in the response
      if (data.status === 'success') {
        // Populate the form with existing user details
        
        populateForm(data.data);
      } else {
        console.error("Error fetching user details:", data.data);
        // Handle error appropriately (e.g., show an error message to the user)
      }
    })
    .catch(error => {
      console.error("Error fetching user details:", error);
      // Handle error appropriately (e.g., show an error message to the user)
    });
  } else {
    // Handle case where email is not available (e.g., redirect to login)
    console.error("User email not found in local storage.");
  }
}

function populateForm(user) {
  const fullNameInput = document.getElementById('fullName');
  const surnameInput = document.getElementById('surname');
  const dobInput = document.getElementById('dob');
  const genderSelect = document.getElementById('gender');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const countrySelect = document.getElementById('country');
  const cardNumberInput = document.getElementById('accountNumber');
  const expiryInput = document.getElementById('expiry_');
  // Set the input values
  fullNameInput.value = user.fname;
  surnameInput.value = user.surname;
  dobInput.value = user.dob;
  genderSelect.value = user.gender;
  phoneInput.value = user.phone;
  emailInput.value = user.email;
  countrySelect.value = user.name;
  cardNumberInput.value = user.card_no;
  expiryInput.value = user.expiry_date;
  
}