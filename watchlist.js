const myQuery = window.location.search;
const Params = new URLSearchParams(myQuery);
const id = Params.get("titleId");
console.log(id);
document.addEventListener("DOMContentLoaded", () => {
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
});

function getWatchList() {
  //get session id

  const api = "hoopAPI.php";

  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "getWatchList",
      //get session id
    }),
  };

  fetch(api, requestData)
    .then((response) => response.json)
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error
    });
}
getWatchList();
