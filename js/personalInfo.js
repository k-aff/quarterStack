<<<<<<< HEAD
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
  
=======
function openDiv() {
    document.getElementById('changePassword').style.display = 'block';
    document.getElementById('userInfo').style.display = 'none';
}

function closeDiv() {
    document.getElementById('changePassword').style.display = 'none';
    document.getElementById('userInfo').style.display = 'block';
}

function openDeleteConfirmationModel() {
    document.getElementById('deleteConfirmationModel').style.display = 'flex';
}

function closeDeleteConfirmationModel() {
    document.getElementById('deleteConfirmationModel').style.display = 'none';
}

window.onclick = function(event) {
    const model = document.getElementById('deleteConfirmationModel');
    if (event.target == model) {
        closeDeleteConfirmationModel();
    }
}




//functions for API connection
function updateDetails(event) {
    event.preventDefault();
    const form = document.getElementById('accountDetailsForm');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/api/update-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



function changePassword(event) {
    event.preventDefault();
    const form = document.getElementById('passwordChangeForm');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/api/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Password changed successfully:', data);
        closePasswordModel();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


window.onclick = function(event) {
    const changing = document.getElementById('changePassword');
    if (event.target == changing) {
        changing.style.display = "none";
    }
>>>>>>> d18d09b210eb580446e8aa93f64f4fd2ff985089
}