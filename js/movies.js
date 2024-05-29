document.addEventListener('DOMContentLoaded', () => {
    function fetchMovies() {
        const req = new XMLHttpRequest();
        const requestData = {
            "type": "getMovies"
        };

        req.onreadystatechange = function() {
            if (this.status === 200 && this.readyState == 4) {
                const responseData = JSON.parse(req.responseText);
                console.log(responseData);

                if (responseData.status === 'success') {
                    const moviesData = responseData.data;
                    const moviesContainer = document.getElementById('action-movies');

                    moviesData.forEach(movie => {
                        const cardContainer = document.createElement("div");
                        cardContainer.classList.add("card-container"); 
                        moviesContainer.appendChild(cardContainer);

                        const card = document.createElement("div");
                        card.classList.add("card");
                        card.setAttribute("data-title", movie.title);
                        card.setAttribute("data-genre", "Movie"); 
                        card.setAttribute("data-description", movie.description);

                        card.addEventListener('dblclick', () => {
                            
                            window.location.href = `movie-details.html?movieId=${movie.id}`;
                        });

                        const image = document.createElement("img");
                        image.src = movie.image;
                        image.alt = movie.title + " Cover photo";

                        const overlay = document.createElement("div");
                        overlay.classList.add("overlay");
                        overlay.innerText = movie.title;

                        card.appendChild(image);
                        card.appendChild(overlay);
                        cardContainer.appendChild(card); 
                    });
                } else {
                    console.error("Error: API response status is not 'success'");
                }
            }
        };

        req.onerror = function() {
            console.error("Error loading movies data");
        };

        if (requestData !== null) {
            req.open("POST", "http://localhost/quarterStack/hoopAPI.php", true);
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify(requestData));
        }
    }

    fetchMovies();
});
