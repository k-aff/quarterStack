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

// document.addEventListener('DOMContentLoaded', () => {
//     const genreFilter = document.getElementById('genre-filter');
//     const sortButton = document.getElementById('sort-button');
//     const contentItems = document.querySelectorAll('.content');
  
//     // Event listener for genre filter
//     genreFilter.addEventListener('change', () => {
//       const selectedGenre = genreFilter.value;
//       contentItems.forEach(item => {
//         if (selectedGenre === 'all' || item.dataset.genre === selectedGenre) {
//           item.style.display = 'block';
//         } else {
//           item.style.display = 'none';
//         }
//       });
//     });
  
//     // Event listener for sort/filter button
//     filter-button.addEventListener('click', () => {
//       const sortedItems = Array.from(contentItems).sort((a, b) => {
//         const titleA = a.textContent.trim().toLowerCase();
//         const titleB = b.textContent.trim().toLowerCase();
//         return titleA.localeCompare(titleB);
//       });
  
//       const main = document.querySelector('main');
//       main.innerHTML = ''; // Clear existing content
  
//       sortedItems.forEach(item => {
//         main.appendChild(item);
//       });
//     });
//   });

function onLoad(){

  const req = new XMLHttpRequest();
  const requestData = {
    "type": "getAllTitles"
  }

  console.log(requestData);

  req.onreadystatechange = function() {
  
    if (this.status === 200 && this.readyState==4) {

      const hoopTitles = JSON.parse(req.responseText);

      console.log(hoopTitles);

      for(const category in hoopTitles.data){

        let titles = document.getElementById(`${category}`+ "Container");
        titles.innerHTML=null;
  
        console.log(hoopTitles.data.category);

        const itemsArray = hoopTitles.data[category];

        // if(itemsArray.length==0)
        // {
        //   var message = document.createElement("h3");
        //   message = "Nothing Available yet"
        //   titles.appendChild(message)
        // }
  
        for(let i=0; i<itemsArray.length;i++){

         const modal = document.getElementById('modal');
          const modalTitle = document.getElementById('modal-title');
          const modalDescription = document.getElementById('modal-description');
          const closeButton = document.querySelector('.close-button');

          var card = document.createElement("div");
          card.classList.add("card");
          card.setAttribute("data-title", itemsArray[i].title);
          card.setAttribute("data-genre", itemsArray[i].type); // Add genre if available
          card.setAttribute("data-description", itemsArray[i].plot); // Add description if available

          // card.addEventListener('click', () => {
          //   modalTitle.textContent = card.getAttribute('data-title');
          //   modalDescription.textContent = card.getAttribute('data-description');
          //   modal.style.display = 'block';
          // });

          card.addEventListener('dblclick', () => {
            window.location.href = `view.html?titleId=${itemsArray[i].id}`;
          });

          closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
          });

          // Create img element
          var image = document.createElement("img");
          image.src = itemsArray[i].image;
          image.alt = itemsArray[i].title + " Cover photo";

          // Create overlay div
          var overlay = document.createElement("div");
          overlay.classList.add("overlay");
          overlay.innerText = itemsArray[i].title;

          // Append elements
          card.appendChild(image);
          card.appendChild(overlay);
          titles.appendChild(card);

        }
      }
    }
  }

  req.onerror = function() {
    console.error("Error loading API");
  };

  if(requestData!==null){
    req.open("POST", "http://localhost/quarterStack/hoopAPI.php",true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(requestData));
  }
}

  




