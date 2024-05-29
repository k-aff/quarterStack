document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("loginForm");

    form.addEventListener("submit", function(event) {
    event.preventDefault();
  
    //make use of user ID or session id
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // email pattern
    if (!emailPattern.test(email)) {
        alert('Email is incorrect');
        return; 
    }

    //check if password is valid
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/; // password pattern
    if (!passwordPattern.test(password)) {
        alert('Password is incorrect');
        return; 
    }

    var req = new XMLHttpRequest();  
    req.onreadystatechange = function()
    {
        if(req.readyState == 4 && req.status == 200)
        {
            var login = JSON.parse(req.responseText);
            console.log(login);

            if (login.status == "Error")
                alert('Invalid credentials'); 
            else 
                window.location.replace('homepage.html');
        }
    }
    req.open("POST", "http://localhost/quarterStack/hoopAPI.php", false); 
    req.setRequestHeader("Content-Type", "application/json");

    const request = 
    {
        "type": "login",
        "email":  email,
        "password":  password
    };

    req.send(JSON.stringify(request));       
}); 
});
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginForm").addEventListener("submit", Login);
});

document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("loginForm");

  form.addEventListener("submit", function(event) {
  event.preventDefault();

  //make use of user ID or session id
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // email pattern
  if (!emailPattern.test(email)) {
      alert('Email is incorrect');
      return; 
  }

  //check if password is valid
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/; // password pattern
  if (!passwordPattern.test(password)) {
      alert('Password is incorrect');
      return; 
  }

  var req = new XMLHttpRequest();  
  req.onreadystatechange = function()
  {
      if(req.readyState == 4 && req.status == 200)
      {
          var login = JSON.parse(req.responseText);
          console.log(login);

          if (login.status == "Error")
              alert('Invalid credentials'); 
          else 
              window.location.replace('homepage.html');
      }
  }
  req.open("POST", "hoopAPI.php", false); 
  req.setRequestHeader("Content-Type", "application/json");

  const request = 
  {
      "type": "login",
      "email":  email,
      "password":  password
  };

  req.send(JSON.stringify(request));       
}); 
});