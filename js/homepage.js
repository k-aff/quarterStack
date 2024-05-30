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
          card.setAttribute("data-description", item.plot);
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

  req.open("POST", "http://localhost/quarterStack/hoopAPI.php", true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(requestData));
}

function showModal(item) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const closeButton = document.querySelector('.close-button');

  modalTitle.textContent = item.title;
  modalDescription.textContent = item.plot;
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
    window.location.href = `view.html?titleId=${item.id}`;
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

  req.open("POST", "http://localhost/quarterStack/hoopAPI.php", true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(requestData));

}
