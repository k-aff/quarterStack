const skipButton = document.getElementById('skipButton');
skipButton.addEventListener('click', function() {
    if (skipButton.textContent === "Skip") {
        window.location.replace('homepage.html');
    } else {
        window.location.href = 'personalInfo.html';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // const skipButton = document.getElementById('skipButton');
    // skipButton.addEventListener('click', function() {
    //     window.location.href = 'personalInfo.html'});
  
    // Fetch user preferences from the server
    fetchUserPreferences();
  });

  function fetchUserPreferences() {
    // const email = localStorage.getItem("email"); // Retrieve email from local storage
    //const email="beverly@gmail.com";
    
    // if (email) {
      const requestBody = {
        //email: email ,
        type: "getUserPref"
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
          // Populate the form with existing preferences
          populateForm(data.data);
        } else {
          // console.error("Error fetching preferences:", data.data);
          // Handle error appropriately (e.g., show an error message to the user)
        }
      })
      .catch(error => {
        // console.error("Error fetching preferences:", error);
        // Handle error appropriately (e.g., show an error message to the user)
      });
  //   } else {
  //     // Handle case where email is not available (e.g., redirect to login)
  //     console.error("User email not found in local storage.");
  //   }
  }
  
  function populateForm(preferences) {
    const typeSelect = document.getElementById('type1');
    const genre1Select = document.getElementById('genre1');
    const genre2Select = document.getElementById('genre2');
    const genre3Select = document.getElementById('genre3');
  
    // Set the type selection
    if (preferences.type === 'M') {
      typeSelect.value = 'Type1';
    } else if (preferences.type === 'S') {
      typeSelect.value = 'Type2';
    }
  
    // Set the genre selections
    
    genre1Select.value = preferences.genre_id_1;
    genre2Select.value = preferences.genre_id_2;
    genre3Select.value = preferences.genre_id_3;


  }
  
  function submitPreferences(event) {
    event.preventDefault(); // Prevent form from submitting normally
  
    const type = document.getElementById('type1').value;
    var genre1 = document.getElementById('genre1').value;
    var genre2 = document.getElementById('genre2').value;
    var genre3 = document.getElementById('genre3').value;
    console.log(type);

    //const email = localStorage.getItem("email"); // Retrieve email from local storage
    //const email="beverly@gmail.com";
  
    // if (email) {
      const requestBody = {
        //email: email,
        type: 'setUserPref',
        titleType: type === 'Type1' ? 'M' : 'S', // Use titleType instead of type
        genre1: genre1,
        genre2: genre2,
        genre3: genre3
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
          // Preferences saved successfully
          // Redirect or display a success message
          console.log("Preferences saved successfully:", data.data);
          window.location.replace('homepage.html');
        } else {
          // Handle error appropriately (e.g., show an error message to the user)
          console.error("Error saving preferences:", data.data);
        }
      })
      .catch(error => {
        console.error("Error saving preferences:", error);
        // Handle error appropriately (e.g., show an error message to the user)
      });

    // } else {
    //   // Handle case where email is not available (e.g., redirect to login)
    //   console.error("User email not found in local storage.");
    // }
    
  }
  