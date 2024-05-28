// import cors from "cors";

// app.use(cors());

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeButton = document.querySelector(".close-button");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      modalTitle.textContent = card.getAttribute("data-title");
      modalDescription.textContent = card.getAttribute("data-description");
      modal.style.display = "block";
    });
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const leftBtn = carousel.querySelector(".left-btn");
    const rightBtn = carousel.querySelector(".right-btn");
    const cardContainer = carousel.querySelector(".card-container");

    leftBtn.addEventListener("click", () => {
      cardContainer.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    });

    rightBtn.addEventListener("click", () => {
      cardContainer.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const genreFilter = document.getElementById("genre-filter");
  const sortButton = document.getElementById("sort-button");
  const contentItems = document.querySelectorAll(".content");

  // Event listener for genre filter
  genreFilter.addEventListener("change", () => {
    const selectedGenre = genreFilter.value;
    contentItems.forEach((item) => {
      if (selectedGenre === "all" || item.dataset.genre === selectedGenre) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });

  // Event listener for sort/filter button
  filter -
    button.addEventListener("click", () => {
      const sortedItems = Array.from(contentItems).sort((a, b) => {
        const titleA = a.textContent.trim().toLowerCase();
        const titleB = b.textContent.trim().toLowerCase();
        return titleA.localeCompare(titleB);
      });

      const main = document.querySelector("main");
      main.innerHTML = ""; // Clear existing content

      sortedItems.forEach((item) => {
        main.appendChild(item);
      });
    });
});

function setWatchList() {
  console.log("Pressed add to Watchlist");
  //make use of user ID or session id
  const api = "hoopAPI.php";

  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "setWatchList",
      user_id: 4,
      title_id: 5
    }),
  };

  console.log(requestData["body"]);

  fetch(api, requestData)
    .then((response) => response)
    .then((data) => {
      console.log("Success:", data);
      // Handle success
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error
    });
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("add-watchlist").onclick = setWatchList;

});


function getWatchList() {
  console.log("Pressed add to Watchlist");
  //make use of user ID or session id
  const api = "hoopAPI.php";

  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "getWatchList",
      user_id: 4,
     
    }),
  };

  console.log(requestData["body"]);

  fetch(api, requestData)
    .then((response) => response)
    .then((data) => {
      console.log("Success:", data);
      // Handle success
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error
    });
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("add-watchlist").onclick = getWatchList;
  
});
