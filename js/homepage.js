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

            const section = document.getElementById('Search-Filter');
            const heading = document.getElementById('SearchFilterH2');
            const carousel = document.getElementById('Search-Carousel');

            if (titles.status === "error")
            {
              heading.className = 'category h2';
              heading.innerHTML = titles.data; 
              section.className = 'carousel';
              carousel.className = 'hidden'; 

            } 
            else
            {
              section.className = 'category';
              heading.innerText = searchText;
              heading.className = 'category h2';
              carousel.className = 'carousel';

              let container = document.getElementById('SearchContainer');
              container.innerHTML = null;

              for (let i = 0; i < titles.data.length; i++) {
                const item = titles.data[i];
                console.log(item); 
        
                var card = document.createElement("div");
                card.classList.add("card");
                card.setAttribute("data-title", item.title);
                card.setAttribute("data-genre", item.type);
                card.setAttribute("data-description", item.plot_summary);
                card.setAttribute("data-url", item.url);
                
                // Creating img element
                var image = document.createElement("img");
                image.src = item.image;
                image.alt = item.title + " Cover photo";
                image.style.height = '100%';
                image.style.width = '100%';
                image.style.objectFit = 'cover'; 
        
                // Creating overlay div
                var overlay = document.createElement("div");
                overlay.classList.add("overlay");
                overlay.innerText = item.title;
        
        
                card.appendChild(image);
                card.appendChild(overlay);
                container.appendChild(card);
        
                card.addEventListener('click', (function(item) {
                  return function() {
                    showModal(item);
                  };
                })(item));
              }
              carouselButtons = document.querySelectorAll('.carousel');
              carouselButtons.forEach(carousel => {
                const leftBtn = carousel.querySelector('.left-btn');
                const rightBtn = carousel.querySelector('.right-btn');
                const cardContainer = carousel.querySelector('.card-container');
          
                leftBtn.addEventListener('click', () => {
                    cardContainer.scrollBy({
                        left: -200,
                        behavior: 'smooth'
                    });
                });
          
                rightBtn.addEventListener('click', () => {
                    cardContainer.scrollBy({
                        left: 200,
                        behavior: 'smooth'
                    });
                });
              });
            }    
        }
    }
    req.open("POST", "hoopAPI.php", true); 
    req.setRequestHeader("Content-Type", "application/json");

    const request = 
    {
        "type": "search",
        "page" : "home",
        "text": searchText
    };

    req.send(JSON.stringify(request));   
  
  });
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('filter-button').addEventListener('click', function() {

      const section = document.getElementById('Search-Filter');
      const heading = document.getElementById('SearchFilterH2');
      const carousel = document.getElementById('Search-Carousel');
      section.className = 'hidden'; 
      carousel.className = 'hidden'; 

      const filter = document.getElementById('genre-filter').value;
      // console.log(filter);
      if (filter === "All") {
        alert("Please select a genre to filter by.")
        return; 
      }
      else if (filter === "Action") {
        document.getElementById('ActionH2').scrollIntoView({ behavior: 'smooth' });
      }
      else if (filter === "Animation") {
        document.getElementById('AnimationH2').scrollIntoView({ behavior: 'smooth' });
      }
      else if (filter === "Sci-Fi") {
        document.getElementById('SciFiH2').scrollIntoView({ behavior: 'smooth' });
      }
      else if (filter === "Horror") {
        document.getElementById('HorrorH2').scrollIntoView({ behavior: 'smooth' });
      }
      else if (filter === "Comedy") {
        document.getElementById('ComedyH2').scrollIntoView({ behavior: 'smooth' });
      }
      else if (filter === "Adventure") {
        document.getElementById('AdventureH2').scrollIntoView({ behavior: 'smooth' });
      }
      else if (filter === "Drama") {
        document.getElementById('DramaH2').scrollIntoView({ behavior: 'smooth' });
      }
      else {
        var req = new XMLHttpRequest();  
        req.onreadystatechange = function()
        {
            if(req.readyState == 4 && req.status == 200)
            {
                var titles = JSON.parse(req.responseText);
                console.log(titles);

                if (titles.status === "error")
                {
                  heading.className = 'category h2';
                  heading.innerHTML = titles.data; 
                  section.className = 'carousel';
                  carousel.className = 'hidden'; 

                } 
                else
                {
                  section.className = 'category';
                  heading.innerText = filter;
                  heading.className = 'category h2';
                  carousel.className = 'carousel';

                  let container = document.getElementById('SearchContainer');
                  container.innerHTML = null;

                  for (let i = 0; i < titles.data.length; i++) {
                    const item = titles.data[i];
            
                    var card = document.createElement("div");
                    card.classList.add("card");
                    card.setAttribute("data-title", item.title);
                    card.setAttribute("data-genre", item.type);
                    card.setAttribute("data-description", item.plot_summary);
                    card.setAttribute("data-url", item.url);
                    
                    // Creating img element
                    var image = document.createElement("img");
                    image.src = item.image;
                    image.alt = item.title + " Cover photo";
                    image.style.height = '100%';
                    image.style.width = '100%';
                    image.style.objectFit = 'cover'; 
            
                    // Creating overlay div
                    var overlay = document.createElement("div");
                    overlay.classList.add("overlay");
                    overlay.innerText = item.title;
            
            
                    card.appendChild(image);
                    card.appendChild(overlay);
                    container.appendChild(card);
            
                    card.addEventListener('click', (function(item) {
                      return function() {
                        showModal(item);
                      };
                    })(item));
                  }
                  carouselButtons = document.querySelectorAll('.carousel');
                  carouselButtons.forEach(carousel => {
                    const leftBtn = carousel.querySelector('.left-btn');
                    const rightBtn = carousel.querySelector('.right-btn');
                    const cardContainer = carousel.querySelector('.card-container');
              
                    leftBtn.addEventListener('click', () => {
                        cardContainer.scrollBy({
                            left: -200,
                            behavior: 'smooth'
                        });
                    });
              
                    rightBtn.addEventListener('click', () => {
                        cardContainer.scrollBy({
                            left: 200,
                            behavior: 'smooth'
                        });
                    });
                  });
                }    
            }
        }
        req.open("POST", "hoopAPI.php", true); 
        req.setRequestHeader("Content-Type", "application/json");

        const request = 
        {
            "type": "filter",
            "page" : "home",
            "genre": filter
        };

        req.send(JSON.stringify(request));   
      }
  });
});

document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const leftBtn = carousel.querySelector('.left-btn');
        const rightBtn = carousel.querySelector('.right-btn');
        const cardContainer = carousel.querySelector('.card-container');

        leftBtn.addEventListener('click', () => {
            cardContainer.scrollBy({
                left: -200,
                behavior: 'smooth'
            });
        });

        rightBtn.addEventListener('click', () => {
            cardContainer.scrollBy({
                left: 200,
                behavior: 'smooth'
            });
        });
    });
});


function onLoad() {
  const req = new XMLHttpRequest();
  const requestData = {
    "type": "getAllTitles"
  };

  req.onreadystatechange = function() {
    if (this.status === 200 && this.readyState == 4) {
      const hoopTitles = JSON.parse(req.responseText);

      for (const category in hoopTitles.data) {
        let titles = document.getElementById(`${category}Container`);
        titles.innerHTML = null;

        const itemsArray = hoopTitles.data[category];

        if (itemsArray.length == 0) {
          var message = document.createElement("h4");
          message.style.color = '#cb6ce6';
          message.style.marginLeft = '20px';
          message.innerHTML = "Nothing Available yet";
          titles.appendChild(message);
        }

        for (let i = 0; i < itemsArray.length; i++) {
          const item = itemsArray[i];

          var card = document.createElement("div");
          card.classList.add("card");
          card.setAttribute("data-title", item.title);
          card.setAttribute("data-genre", item.type);
          card.setAttribute("data-description", item.plot_summary);
          card.setAttribute("data-url", item.url);
          
          // Creating img element
          var image = document.createElement("img");
          image.src = item.image;
          image.alt = item.title + " Cover photo";

          // Creating overlay div
          var overlay = document.createElement("div");
          overlay.classList.add("overlay");
          overlay.innerText = item.title;


          card.appendChild(image);
          card.appendChild(overlay);
          titles.appendChild(card);

          card.addEventListener('click', (function(item) {
            return function() {
              showModal(item);
            };
          })(item));
        }
      }
    }
  };

  req.onerror = function() {
    console.error("Error loading API");
  };

req.open("POST", "hoopAPI.php", true);
req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
req.send(JSON.stringify(requestData));
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

    req.open("POST", "hoopAPI.php", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(requestData));

}
