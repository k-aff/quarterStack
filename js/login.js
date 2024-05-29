function Login(event) {
  event.preventDefault();

  //make use of user ID or session id
  const api = "hoopAPI.php";
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "login",
      email: email,
      password: password,
    }),
  };

  fetch(api, requestData)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "Error") {
        //if error display error message
      } else {
        console.log("Success:", data);
        window.location.href = "homepage.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error
    });
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginForm").addEventListener("submit", Login);
});
