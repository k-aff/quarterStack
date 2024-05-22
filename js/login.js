document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const requestBody = {
      type: "login",
      email: email,
      password: password,
    };

    fetch("http://localhost:3000/hoopAPI.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status === "Success") {
          // Handle successful login
          alert("Login successful! User ID: " + data.data.user_id);
        } else {
          // Handle error
          alert("Error: " + data.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred during login.");
      });
  });
