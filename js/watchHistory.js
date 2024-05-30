document.addEventListener("DOMContentLoaded", function () {
    function fetchWH() {
      const api = "hoopAPI.php";
  
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "getWatchHistory",
        }),
      };
  
      fetch(api, requestData)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          const moviesContainer = document.getElementById("movies-container");
          if (moviesContainer) {
            moviesContainer.innerHTML = "";
          } // Clear any existing content
  
          var array = data.data;
  
          for (var i = 0; i < array.length; i++) {
            const movie = array[i];
  
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie-div");
  
            const moviePoster = document.createElement("img");
            moviePoster.src = movie.image;
            moviePoster.alt = "Movie Poster";
            moviePoster.classList.add("movie-poster-small");
  
            const movieInfoDiv = document.createElement("div");
  
            const movieTitle = document.createElement("h2");
            movieTitle.textContent = movie.title;
  
            const movieGenre = document.createElement("p");
            movieGenre.textContent = "Genre: " + movie.genre;
  
            const movieReleaseYear = document.createElement("p");
            movieReleaseYear.textContent = "Release Year: " + movie.release_date;
  
            const movieAgeCertification = document.createElement("p");
            movieAgeCertification.textContent =
              "Age certification: " + movie.age_cert;
  
            movieInfoDiv.appendChild(movieTitle);
            movieInfoDiv.appendChild(movieGenre);
            movieInfoDiv.appendChild(movieReleaseYear);
            movieInfoDiv.appendChild(movieAgeCertification);
  
            movieDiv.appendChild(moviePoster);
            movieDiv.appendChild(movieInfoDiv);
  
            moviesContainer.appendChild(movieDiv);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error
        });
    }
  
    // Call fetchWH to populate the movies container
    fetchWH();
  });

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
  
  req.open("POST", "hoopAPI.php", true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(requestData));
  
  }