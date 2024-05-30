document.addEventListener('DOMContentLoaded', () => {
    fetchSeries();
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
  
              const heading = document.getElementById('ShowsH2');
              const clear = document.getElementById('Clear-Search');
  
              if (titles.status === "error")
              {
                removeMovies();
                heading.innerHTML = "No Series Availables For: '" + searchText + "'";
                clear.className = 'search-button';
                clear.style.width = '150px';
              } 
              else
              {
                removeMovies();
                heading.innerHTML = "Showing Series For: '" + searchText + "'";
                clear.className = 'search-button';
                clear.style.width = '150px';
  
                const seriesData = titles.data; 
                const seriesContainer = document.getElementById('ourShows');

                seriesData.forEach(series => {
                    const card = document.createElement("div");
                    card.classList.add("card", "dynamic-movie-card");
                    card.setAttribute("data-title", series.title);
                    card.setAttribute("data-genre", "Series"); 
                    card.setAttribute("data-description", series.plot_summary);

                    const image = document.createElement("img");
                    image.src = series.image;
                    image.alt = series.title + " Cover photo";

                    const overlay = document.createElement("div");
                    overlay.classList.add("overlay");
                    overlay.innerText = series.title;

                    card.appendChild(image);
                    card.appendChild(overlay);
                    seriesContainer.appendChild(card); 
                    card.addEventListener('click', (function(series) {
                        return function() {
                        showModal(series);
                        };
                    })(series));

                });
              }    
          }
      }
      req.open("POST", "hoopAPI.php", true); 
      req.setRequestHeader("Content-Type", "application/json");
  
      const request = 
      {
          "type": "search",
          "page" : "series",
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
        const heading = document.getElementById('ShowsH2');
        heading.innerHTML = "Series"; 
        const input = document.getElementById('SearchText');
        input.value = ""; 
        fetchSeries();
    });
});

function fetchSeries() {
    const req = new XMLHttpRequest();
    const requestData = {
        "type": "getSeries"
    };
    req.onreadystatechange = function() {
        if (this.status === 200 && this.readyState == 4) {
            const responseData = JSON.parse(req.responseText);
            console.log(responseData);

            if (responseData.status === 'success') {
                const seriesData = responseData.data; // Corrected variable name
                const seriesContainer = document.getElementById('ourShows');

                seriesData.forEach(series => {
                    const card = document.createElement("div");
                    card.classList.add("card", "dynamic-movie-card");
                    card.setAttribute("data-title", series.title);
                    card.setAttribute("data-genre", "Series"); 
                    card.setAttribute("data-description", series.plot_summary);

                    const image = document.createElement("img");
                    image.src = series.image;
                    image.alt = series.title + " Cover photo";

                    const overlay = document.createElement("div");
                    overlay.classList.add("overlay");
                    overlay.innerText = series.title;

                    card.appendChild(image);
                    card.appendChild(overlay);
                    seriesContainer.appendChild(card); 

                    card.addEventListener('click', (function(series) {
                        return function() {
                        showModal(series);
                        };
                    })(series));

                });
            } else {
                console.error("Error: API response status is not 'success'");
            }
        }
    };

    req.onerror = function() {
        console.error("Error loading tv series data");
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

            const heading = document.getElementById('ShowsH2');
            const clear = document.getElementById('Clear-Filter');

            if (titles.status === "error")
            {
              removeMovies();
              heading.innerHTML = "No Series Availables For Genre: '" + filter + "'";
              clear.className = 'search-button';
              clear.style.width = '150px';
            } 
            else
            {
              removeMovies();
              heading.innerHTML = "Showing Series For Genre: '" + filter + "'";
              clear.className = 'search-button';
              clear.style.width = '150px';

              const seriesData = titles.data; 
              const seriesContainer = document.getElementById('ourShows');

              seriesData.forEach(series => {
                  const card = document.createElement("div");
                  card.classList.add("card", "dynamic-movie-card");
                  card.setAttribute("data-title", series.title);
                  card.setAttribute("data-genre", "Series"); 
                  card.setAttribute("data-description", series.plot_summary);

                  const image = document.createElement("img");
                  image.src = series.image;
                  image.alt = series.title + " Cover photo";

                  const overlay = document.createElement("div");
                  overlay.classList.add("overlay");
                  overlay.innerText = series.title;

                  card.appendChild(image);
                  card.appendChild(overlay);
                  seriesContainer.appendChild(card); 
                  });
            }    
        }
      }
      req.open("POST", "hoopAPI.php", true); 
      req.setRequestHeader("Content-Type", "application/json");
  
      const request = 
      {
          "type": "filter",
          "page" : "series",
          "genre": filter
      };
  
      req.send(JSON.stringify(request));   
    
    });
    
  });

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('Clear-Filter').addEventListener('click', function() {
        const clear = document.getElementById('Clear-Filter');
        clear.className = 'clear-search-button';
        const heading = document.getElementById('ShowsH2');
        heading.innerHTML = "Series"; 
        const input = document.getElementById('genre-filter');
        input.value = "All"; 
        fetchSeries();
    });
});

function showModal(item) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeButton = document.querySelector('.close-button');
  
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.plot_summary;
    modal.style.display = 'block';
  
    const closeModal = () => {
      modal.style.display = 'none';
      closeButton.removeEventListener('click', closeModal);
      window.removeEventListener('click', outsideClick);
    };
  
    const outsideClick = (event) => {
      if (event.target === modal) {
        closeModal();
      }
    };
  
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);
  
    const view = document.getElementById('view');
    view.onclick = function() {
      window.location.href = `view.html?titleId=${item.title_id}`;
    };
}

function showModal(item) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const closeButton = document.querySelector('.close-button');

  modalTitle.textContent = item.title;
  modalDescription.textContent = item.plot_summary;
  modal.style.display = 'block';

  const closeModal = () => {
    modal.style.display = 'none';
    closeButton.removeEventListener('click', closeModal);
    window.removeEventListener('click', outsideClick);
  };

  const outsideClick = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };

  closeButton.addEventListener('click', closeModal);
  window.addEventListener('click', outsideClick);

  const view = document.getElementById('view');
  view.onclick = function() {
    window.location.href = `view.html?titleId=${item.title_id}`;
  };
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