document.addEventListener("DOMContentLoaded", function () {
  function fetchWL() {
    const api = "hoopAPI.php";

    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getWatchList",
      }),
    };

    fetch(api, requestData)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        const carouselContainer = document.getElementById("carousel");
        if (carouselContainer) {
          carouselContainer.innerHTML = "";
        }
        var array = data.data;

        for (var i = 0; i < array.length; i++) {
          const movie = array[i];

          const carouselItem = document.createElement("div");
          carouselItem.classList.add("carousel-item");

          const movieImg = document.createElement("img");
          movieImg.src = movie.image;
          movieImg.alt = movie.title;

          const movieInfo = document.createElement("div");
          movieInfo.classList.add("info");

          const movieTitle = document.createElement("h2");
          movieTitle.textContent = movie.title;

          const movieGenre = document.createElement("p");
          movieGenre.textContent = "Genre: " + movie.genre;

          const movieReleaseYear = document.createElement("p");
          movieReleaseYear.textContent = "Release Date: " + movie.release_date;

          movieInfo.appendChild(movieTitle);
          movieInfo.appendChild(movieGenre);
          // movieInfo.appendChild(movieDirector);
          movieInfo.appendChild(movieReleaseYear);

          carouselItem.appendChild(movieImg);
          carouselItem.appendChild(movieInfo);

          carouselContainer.appendChild(carouselItem);
        }
        const carousel = document.querySelector(".carousel");
        const carouselItems = document.querySelectorAll(".carousel-item");
        const leftButton = document.querySelector(".carousel-button.left");
        const rightButton = document.querySelector(".carousel-button.right");

        let currentIndex = 0;

        function updateCarousel() {
          carousel.style.transform = `translateX(-${
            currentIndex * (carouselItems[0].offsetWidth + 20)
          }px)`;
        }

        leftButton.addEventListener("click", () => {
          currentIndex = Math.max(currentIndex - 1, 0);
          updateCarousel();
        });

        rightButton.addEventListener("click", () => {
          currentIndex = Math.min(currentIndex + 1, carouselItems.length - 1);
          updateCarousel();
        });

        updateCarousel();
      })

      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  }
  fetchWL();
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