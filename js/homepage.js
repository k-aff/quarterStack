document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeButton = document.querySelector(".close-button");
  const viewButton = document.getElementById("View");
  let currentCardUrl = "";

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      modalTitle.textContent = card.getAttribute("data-title");
      modalDescription.textContent = card.getAttribute("data-description");
      currentCardUrl = card.getAttribute("data-url");
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

  viewButton.addEventListener("click", () => {
    if (currentCardUrl) {
      window.location.href = currentCardUrl;
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
  sortButton.addEventListener("click", () => {
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
  
  const api = "hoopAPI.php";

  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "setWatchList",
      title_id: 170,
      user_id: 8,
    }),
  };

  

  fetch(api, requestData)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error
    });
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("add-watchlist").onclick = setWatchList;
});
