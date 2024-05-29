const skipButton = document.getElementById('skipButton');
skipButton.addEventListener('click', function() {
    if (skipButton.textContent === "Skip") {
        window.location.replace('homepage.html');
    } else {
        window.location.href = 'personalInfo.html';
    }
});

//---------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------//

//code from boity's branch - 29/05 @ 8:47
document.addEventListener('DOMContentLoaded', function() {
    // const skipButton = document.getElementById('skipButton');
    // skipButton.addEventListener('click', function() {
    //     window.location.href = 'personalInfo.html'});
  
    // Fetch user preferences from the server
    fetchUserPreferences();
  });

  function fetchUserPreferences() {
    // const email = localStorage.getItem("email"); // Retrieve email from local storage
    const email="beverly@gmail.com";
    
    if (email) {
      const requestBody = {
        email: email ,
        type: "getUserPref"
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
          // Populate the form with existing preferences
          populateForm(data.data);
        } else {
          console.error("Error fetching preferences:", data.data);
          // Handle error appropriately (e.g., show an error message to the user)
        }
      })
      .catch(error => {
        console.error("Error fetching preferences:", error);
        // Handle error appropriately (e.g., show an error message to the user)
      });
    } else {
      // Handle case where email is not available (e.g., redirect to login)
      console.error("User email not found in local storage.");
    }
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
    // genre1= getGenre(genre1);
    // genre2= getGenre(genre2);
    // genre3= getGenre(genre3);
    console.log(genre1);
    console.log(genre2);

  
    //const email = localStorage.getItem("email"); // Retrieve email from local storage
    const email="beverly@gmail.com";
  
    if (email) {
      const requestBody = {
        email: email,
        type: 'setUserPref',
        titleType: type === 'Type1' ? 'M' : 'S', // Use titleType instead of type
        genre1: genre1,
        genre2: genre2,
        genre3: genre3
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
          // Preferences saved successfully
          // Redirect or display a success message
          console.log("Preferences saved successfully:", data.data);
          //window.location.href = "homepage.html"; // Redirect to homepage
        } else {
          // Handle error appropriately (e.g., show an error message to the user)
          console.error("Error saving preferences:", data.data);
        }
      })
      .catch(error => {
        console.error("Error saving preferences:", error);
        // Handle error appropriately (e.g., show an error message to the user)
      });
    } else {
      // Handle case where email is not available (e.g., redirect to login)
      console.error("User email not found in local storage.");
    }
    
  }
  function getGenre(genre)
  {
    var id=null;
    if (genre=="Action")
      {
        id=1;
      }
    else if (genre=="Action & Adventure")
      {
        id=2;
      }
    else if (genre=="Adventure")
      {
        id=3;
      }
    else if (genre=="Animation")
      {
        id=4;
      }
    else if (genre=="Anime")
      {
        id=5;
      }
    else if (genre=="Comedy")
      {
        id=6;
      }
    else if (genre=="Crime")
      {
        id=7;
      }
    else if (genre=="Documentary")
      {
        id=8;
      }
    else if (genre=="Drama")
      {
        id=9;
      }
    else if (genre=="Family")
      {
        id=10;
      }
    else if (genre=="Fantasy")
      {
        id=11;
      }
    else if (genre=="Horror")
      {
        id=12;
      }
    else if (genre=="Kids")
      {
        id=13;
      }
    else if (genre=="Musical")
      {
        id=14;
      }
    else if (genre=="Mystery")
      {
        id=15;
      }
    else if (genre=="News")
      {
        id=16;
      }
    else if (genre=="Reality")
      {
        id=17;
      }
    else if (genre=="Romance")
      {
        id=18;
      }
    else if (genre=="Romantic Comedy")
      {
        id=19;
      }
    else if (genre=="Sci-Fi")
      {
        id=20;
      }
    else if (genre=="Sci-Fi & Fantasy")
      {
        id=21;
      }
    else if (genre=="Soap")
      {
        id=22;
      }
    else if (genre=="Talk")
      {
        id=23;
      }
    else if (genre=="Thriller")
      {
        id=24;
      }
    else if (genre=="War")
      {
        id=25;
      }
    return id;
  }
  function getGenreName(id)
{
  var genre=null;
  if (id==1)
    {
      genre="Action";
    }
  else if (id==2)
    {
      genre="Action & Adventure";
    }
  else if (id==3)
    {
      genre="Adventure";
    }
  else if (id==4)
    {
      genre="Animation";
    }
  else if (id==5)
    {
      genre="Anime";
    }
  else if (id==6)
    {
      genre="Comedy";
    }
  else if (id==7)
    {
      genre="Crime";
    }
  else if (id==8)
    {
      genre="Documentary";
    }
  else if (id==9)
    {
      genre="Drama";
    }
  else if (id==10)
    {
      genre="Family";
    }
  else if (id==11)
    {
      genre="Fantasy";
    }
  else if (id==12)
    {
      genre="Horror";
    }
  else if (id==13)
    {
      genre="Kids";
    }
  else if (id==14)
    {
      genre="Musical";
    }
  else if (id==15)
    {
      genre="Mystery";
    }
  else if (id==16)
    {
      genre="News";
    }
  else if (id==17)
    {
      genre="Reality";
    }
  else if (id==18)
    {
      genre="Romance";
    }
  else if (id==19)
    {
      genre="Romantic Comedy";
    }
  else if (id==20)
    {
      genre="Sci-Fi";
    }
  else if (id==21)
    {
      genre="Sci-Fi & Fantasy";
    }
  else if (id==22)
    {
      genre="Soap";
    }
  else if (id==23)
    {
      genre="Talk";
    }
  else if (id==24)
    {
      genre="Thriller";
    }
  else if (id==25)
    {
      genre="War";
    }
  return genre;
}
