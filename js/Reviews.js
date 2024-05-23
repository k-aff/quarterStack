function openReviewModel() {
    document.getElementById('reviewModel').style.display = 'flex';
}

function closeReviewModel() {
    document.getElementById('reviewModel').style.display = 'none';
}
function submitReview(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    // Create a new review element
    const review = document.createElement('div');
    review.classList.add('review');

    const usernameH3 = document.createElement('h3');
    usernameH3.textContent = username;
    review.appendChild(usernameH3);

    const reviewTextP = document.createElement('p');
    reviewTextP.classList.add('review-text');
    reviewTextP.textContent = reviewText;
    review.appendChild(reviewTextP);

    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add('rating');
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.classList.add('fa', 'fa-star');
        if (i < rating) {
            star.classList.add('checked');
        }
        ratingDiv.appendChild(star);
    }
    review.appendChild(ratingDiv);

    document.querySelector('.reviews-container').appendChild(review);

    // Reset the form
    document.getElementById('reviewForm').reset();

    // Close the modal
    closeReviewModel();
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const model = document.getElementById('reviewModel');
    if (event.target == model) {
        closeReviewModel();
    }
}
