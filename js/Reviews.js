// Get the review model element
const myQuery= window.location.search;
const Params= new URLSearchParams(myQuery);
const id= Params.get('titleId');

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
  const reqbody = {
    type: "setReview",
    //email: formData.get("username"),
    review: formData.get("reviewText"),
    rating: formData.get("rating"),
    title_id: id // Replace with the actual movie ID!!!!!!!!
  };
  
  
  // Send a POST request to the API to submit the review
  fetch("http://localhost/quarterStack/hoopAPI.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqbody)
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


function fetchMovieReviews() {
    //const tittle_id = '45';
    const requestBody = {
      title_id: id,
      type: "getReview"
    };
  
    // Send a GET request to the API to fetch the movie reviews
    fetch("http://localhost/quarterStack/hoopAPI.php", {
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
          //console.log(data.data);
          const movietitle = document.querySelector(".movie-title");
          movietitle.textContent=data.data[0].title;
          const movieImage = document.querySelector(".movie-image");
          movieImage.src = data.data[0].image;
          // Use a for loop instead of forEach
          for (let i = 0; i < data.data.length; i++) {
            const review = data.data[i];
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
            reviewElement.innerHTML = `
              <h3>${review.name}</h3>
              <p class="review-text">${review.review}</p>
              <div class="rating">
                ${Array.from({ length: review.rating }, (_, i) => `<span class="fa fa-star checked"></span>`).join("")}
                ${Array.from({ length: 5 - review.rating }, (_, i) => `<span class="fa fa-star"></span>`).join("")}
              </div>
            `;
            reviewsContainer.appendChild(reviewElement);
          }
          // if(data.status==="failure")
          // {
          //   const movietitle = document.querySelector(".movie-title");
          //   movietitle.textContent=data.data[0].title;
          //   const movieImage = document.querySelector(".movie-image");
          //   movieImage.src = data.data[0].image;
          //   const reviewElement = document.createElement("div");
          //   reviewElement.textContent="No reviews";
          // }

        } else {
          const reviewsContainer = document.querySelector(".reviews-container");
            const movietitle = document.querySelector(".movie-title");
            movietitle.textContent=data.data[0].title;
            const movieImage = document.querySelector(".movie-image");
            movieImage.src = data.data[0].image;
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
            reviewElement.innerHTML="<h3> No  Reviews </h3>";
            reviewsContainer.appendChild(reviewElement);
        }
      })
     .catch(error => {
        console.error(error);
      });
  }

// Call the fetchMovieReviews function when the page loads
document.addEventListener("DOMContentLoaded", fetchMovieReviews);