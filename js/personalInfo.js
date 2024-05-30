document.addEventListener('DOMContentLoaded', function() {
  // Fetch user details from the server
  fetchUserDetails();
});

function fetchUserDetails() {
  // Retrieve email from local storage
  //const email = localStorage.getItem("email");
  //const email="beverly@gmail.com";

  // if (email) {
    const requestBody = {
      //email: email,
      type: "getUser"
    };

    fetch('hoopAPI.php', {
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
  // 
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
  phoneInput.value = user.phone;
  emailInput.value = user.email;
  countrySelect.value = user.country_id;
  cardNumberInput.value = user.card_no;
  expiryInput.value = user.expiry_date;

  if (user.gender == 'F')
    genderSelect.value = "Female";
  else if (user.gender == 'M')
    genderSelect.value = "Male";
  else if (user.gender == 'O')
    genderSelect.value = "Other";
  else if (user.gender == 'P')
    genderSelect.value = "Prefer not to say";
}

//CODE FROM THENDO'S BRANCH
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

// functions for API requests 

function updateDetails(event) {
  event.preventDefault();

    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let country_id = document.getElementById('country').value;
    let card_no =  document.getElementById('accountNumber').value;
    let expiry_date = document.getElementById('expiry_').value ;
  
    var req = new XMLHttpRequest();  
    req.onreadystatechange = function()
    {
        if(req.readyState == 4 && req.status == 200)
        {
            var updated = JSON.parse(req.responseText);
            console.log(updated);

            if (updated.status == "error")
              alert(updated.data); 
            else 
              fetchUserDetails();
              alert("User details updated");
        }
    }
    req.open("POST", "hoopAPI.php", false); 
    req.setRequestHeader("Content-Type", "application/json");

    const request = 
    {
            "type": "updateUser",
            "phone" : phone,
            "email":  email,     
            "country_id": country_id,
            "card_no": card_no,
            "expiry_date": expiry_date
    }

    req.send(JSON.stringify(request));     
}

function deleteUser() {
  var req = new XMLHttpRequest();  
    req.onreadystatechange = function()
    {
        if(req.readyState == 4 && req.status == 200)
        {
            var updated = JSON.parse(req.responseText);
            console.log(updated);

            logout();
            window.location.replace("welcome.html");
        }
    }
    req.open("POST", "hoopAPI.php", false); 
    req.setRequestHeader("Content-Type", "application/json");

    const request = 
    {
            "type": "deleteUser",
    }
    req.send(JSON.stringify(request));     
}

function changePassword(event) {
  event.preventDefault();

  let oldPass = document.getElementById('oldPassword').value;
  let newPass = document.getElementById('newPassword').value;

  var req = new XMLHttpRequest();  
    req.onreadystatechange = function()
    {
        if(req.readyState == 4 && req.status == 200)
        {
            var updated = JSON.parse(req.responseText);
            console.log(updated);

            alert(updated.data); 
        }
    }
    req.open("POST", "hoopAPI.php", false); 
    req.setRequestHeader("Content-Type", "application/json");

    const request = 
    {
            "type": "updatePassword",
            "oldPassword": oldPass,
            "newPassword": newPass
    }

    req.send(JSON.stringify(request));    
}

window.onclick = function(event) {
  const changing = document.getElementById('changePassword');
  if (event.target == changing) {
      changing.style.display = "none";
  }
}

function logout(){

  const req = new XMLHttpRequest();
  
  const requestData ={
    "type": "logout"
  }
  
  req.onreadystatechange = function() {
    if (this.status === 200 && this.readyState == 4) {
      const response = JSON.parse(req.responseText);
      console.log(response)
    }
  }
  
  req.onerror = function() {
    console.error("Error loading API");
  };
  
  req.open("POST", "hoopAPI.php", true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(requestData));
  
  }