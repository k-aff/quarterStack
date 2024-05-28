// Get the review model element
const reviewModel = document.getElementById("reviewModel");
// Function to open the review model
function openReviewModel() {
  reviewModel.style.display = "block";
}

// Function to close the review model
function closeReviewModel() {
  reviewModel.style.display = "none";
}

// Function to submit a review
function submitReview(event) {
  event.preventDefault();

  // Get the form data
  const formData = new FormData(event.target);
  const data = {
    email: formData.get("username"),
    review: formData.get("reviewText"),
    rating: formData.get("rating"),
    title_id: "12" // Replace with the actual movie ID
  };
  console.log(data);

  // Send a POST request to the API to submit the review
  fetch("http://localhost/Practical5_quarterStack/quarterStack-1/hoopAPI.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        // Review submitted successfully
        closeReviewModel();
        // Reload the page to show the new review
        location.reload();
      } else {
        // Review submission failed
        console.error(data.message);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// Function to fetch the movie reviews from the API
function fetchMovieReviews() {
    const tittle_id='45';
    const requestBody = {
        title_id: tittle_id ,
        type: "getReview"
      };
  // Send a GET request to the API to fetch the movie reviews
  fetch("http://localhost/Practical5_quarterStack/quarterStack-1/hoopAPI.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
        console.log(data);
      if (data.status === "success") {
        // Render the movie reviews
        const reviewsContainer = document.querySelector(".reviews-container");
        reviewsContainer.innerHTML = "";
        console.log(data.data)
        data.data.forEach(review => {
          const reviewElement = document.createElement("div");
          reviewElement.classList.add("review");
          reviewElement.innerHTML = `
            <h3>${review.user_id}</h3>
            <p class="review-text">${review.review}</p>
            <div class="rating">
              ${Array.from({ length: review.rating }, (_, i) => `<span class="fa fa-star checked"></span>`).join("")}
              ${Array.from({ length: 5 - review.rating }, (_, i) => `<span class="fa fa-star"></span>`).join("")}
            </div>
          `;
          reviewsContainer.appendChild(reviewElement);
        });
      } else {
        console.error(data.message);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// Call the fetchMovieReviews function when the page loads
document.addEventListener("DOMContentLoaded", fetchMovieReviews);