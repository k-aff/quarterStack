document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('Search').addEventListener('click', function() {
      const searchText = document.getElementById('SearchText').value;
      // console.log(searchText);
  
      if (searchText === "")
      {
        alert("Please enter a title to search for.")
        return; 
      }
  
      var req = new XMLHttpRequest();  
      req.onreadystatechange = function()
      {
          if(req.readyState == 4 && req.status == 200)
          {
              var titles = JSON.parse(req.responseText);
              console.log(titles);
  
              const heading = document.getElementById('MovieH2');
              const clear = document.getElementById('Clear-Search');
  
              if (titles.status === "error")
              {
                removeMovies();
                heading.innerHTML = "No Movies Availables For: '" + searchText + "'";
                clear.className = 'search-button';
                clear.style.width = '150px';
              } 
              else
              {
                removeMovies();
                heading.innerHTML = "Showing Movies For: '" + searchText + "'";
                clear.className = 'search-button';
                clear.style.width = '150px';

  
                const moviesData = titles.data; 
                const moviesContainer = document.getElementById('action-movies');

                    moviesData.forEach(movie => {
                        const cardContainer = document.createElement("div");
                        cardContainer.classList.add("card-container", "dynamic-movie-card"); 
                        moviesContainer.appendChild(cardContainer);

                        const card = document.createElement("div");
                        card.classList.add("card");
                        card.setAttribute("data-title", movie.title);
                        card.setAttribute("data-genre", "Movie"); 
                        card.setAttribute("data-description", movie.description);

                        card.addEventListener('dblclick', () => {
                            window.location.href = `movie-details.html?movieId=${movie.id}`;
                        });

                        const image = document.createElement("img");
                        image.src = movie.image;
                        image.alt = movie.title + " Cover photo";

                        const overlay = document.createElement("div");
                        overlay.classList.add("overlay");
                        overlay.innerText = movie.title;

                        card.appendChild(image);
                        card.appendChild(overlay);
                        cardContainer.appendChild(card); 
                    });
              }    
          }
      }
      req.open("POST", "hoopAPI.php", true); 
      req.setRequestHeader("Content-Type", "application/json");
  
      const request = 
      {
          "type": "search",
          "page" : "movie",
          "text": searchText
      };
  
      req.send(JSON.stringify(request));   
    
    });
    
  });

function removeMovies() {
    const dynamicElements = document.querySelectorAll('.dynamic-movie-card');
    dynamicElements.forEach(element => {
        element.remove();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('Clear-Search').addEventListener('click', function() {
        const clear = document.getElementById('Clear-Search');
        clear.className = 'clear-search-button';
        const heading = document.getElementById('MovieH2');
        heading.innerHTML = "Movies"; 
        const input = document.getElementById('SearchText');
        input.value = ""; 
        fetchMovies();
    });
});

function fetchMovies() {
    const clear = document.getElementById('Clear-Search');
    clear.className = 'clear-search-button';

    const req = new XMLHttpRequest();
    const requestData = {
        "type": "getMovies"
    };

    req.onreadystatechange = function() {
        if (this.status === 200 && this.readyState == 4) {
            const responseData = JSON.parse(req.responseText);
            console.log(responseData);

            if (responseData.status === 'success') {
                const moviesData = responseData.data;
                const moviesContainer = document.getElementById('action-movies');

                moviesData.forEach(movie => {
                    const cardContainer = document.createElement("div");
                    cardContainer.classList.add("card-container", "dynamic-movie-card"); 
                    moviesContainer.appendChild(cardContainer);

                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.setAttribute("data-title", movie.title);
                    card.setAttribute("data-genre", "Movie"); 
                    card.setAttribute("data-description", movie.description);

                    card.addEventListener('dblclick', () => {
                        window.location.href = `movie-details.html?movieId=${movie.id}`;
                    });

                    const image = document.createElement("img");
                    image.src = movie.image;
                    image.alt = movie.title + " Cover photo";

                    const overlay = document.createElement("div");
                    overlay.classList.add("overlay");
                    overlay.innerText = movie.title;

                    card.appendChild(image);
                    card.appendChild(overlay);
                    cardContainer.appendChild(card); 
                });
            } else {
                console.error("Error: API response status is not 'success'");
            }
        }
    };

    req.onerror = function() {
        console.error("Error loading movies data");
    };

    if (requestData !== null) {
        req.open("POST", "hoopAPI.php", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(requestData));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('filter-button').addEventListener('click', function() {
      const filter = document.getElementById('genre-filter').value;
      console.log(filter);
  
      if (filter === "All")
      {
        alert("Please select a genre to filter by.")
        return; 
      }
  
      var req = new XMLHttpRequest();  
      req.onreadystatechange = function()
      {
          if(req.readyState == 4 && req.status == 200)
          {
              var titles = JSON.parse(req.responseText);
              console.log(titles);
  
              const heading = document.getElementById('MovieH2');
              const clear = document.getElementById('Clear-Filter');
  
              if (titles.status === "error")
              {
                removeMovies();
                heading.innerHTML = "No Movies Availables For Genre: '" + filter + "'";
                clear.className = 'search-button';
                clear.style.width = '150px';
              } 
              else
              {
                removeMovies();
                heading.innerHTML = "Showing Movies For Genre: '" + filter + "'";
                clear.className = 'search-button';
                clear.style.width = '150px';

  
                const moviesData = titles.data; 
                const moviesContainer = document.getElementById('action-movies');

                    moviesData.forEach(movie => {
                        const cardContainer = document.createElement("div");
                        cardContainer.classList.add("card-container", "dynamic-movie-card"); 
                        moviesContainer.appendChild(cardContainer);

                        const card = document.createElement("div");
                        card.classList.add("card");
                        card.setAttribute("data-title", movie.title);
                        card.setAttribute("data-genre", "Movie"); 
                        card.setAttribute("data-description", movie.description);

                        card.addEventListener('dblclick', () => {
                            window.location.href = `movie-details.html?movieId=${movie.id}`;
                        });

                        const image = document.createElement("img");
                        image.src = movie.image;
                        image.alt = movie.title + " Cover photo";

                        const overlay = document.createElement("div");
                        overlay.classList.add("overlay");
                        overlay.innerText = movie.title;

                        card.appendChild(image);
                        card.appendChild(overlay);
                        cardContainer.appendChild(card); 
                    });
              }    
          }
      }
      req.open("POST", "hoopAPI.php", true); 
      req.setRequestHeader("Content-Type", "application/json");
  
      const request = 
      {
          "type": "filter",
          "page" : "movie",
          "genre": filter
      };
  
      req.send(JSON.stringify(request));   
    
    });
    
  });

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('Clear-Filter').addEventListener('click', function() {
        const clear = document.getElementById('Clear-Filter');
        clear.className = 'clear-search-button';
        const heading = document.getElementById('MovieH2');
        heading.innerHTML = "Movies"; 
        const input = document.getElementById('genre-filter');
        input.value = "All"; 
        fetchMovies();
    });
});