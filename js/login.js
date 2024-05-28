function Login() {
    console.log("Login");
    //make use of user ID or session id
    const api = "hoopAPI.php";
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;
   
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "login",
        email: email,
        password: password
       
      }),
    };
  
    console.log(requestData["body"]);
  
    fetch(api, requestData)
      .then((response) => response)
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "homepage.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login").onclick = Login;
    
  });