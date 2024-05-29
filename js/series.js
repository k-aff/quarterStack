
document.addEventListener('DOMContentLoaded', () => {
    function fetchSeries() {
        const req = new XMLHttpRequest();
        const requestData = {
            "type": "getSeries"
        };
        req.onreadystatechange = function() {
            if (this.status === 200 && this.readyState == 4) {
                const responseData = JSON.parse(req.responseText);
                console.log(responseData);

                if (responseData.status === 'success') {
                    const seriesData = responseData.data; // Corrected variable name
                    const seriesContainer = document.getElementById('ourShows');

                    seriesData.forEach(series => {
                        const card = document.createElement("div");
                        card.classList.add("card");
                        card.setAttribute("data-title", series.title);
                        card.setAttribute("data-genre", "Series"); 
                        card.setAttribute("data-description", series.description);

                        card.addEventListener('dblclick', () => {
                            window.location.href = `series-details.html?seriesID=${series.id}`;
                        });

                        const image = document.createElement("img");
                        image.src = series.image;
                        image.alt = series.title + " Cover photo";

                        const overlay = document.createElement("div");
                        overlay.classList.add("overlay");
                        overlay.innerText = series.title;

                        card.appendChild(image);
                        card.appendChild(overlay);
                        seriesContainer.appendChild(card); 
                    });
                } else {
                    console.error("Error: API response status is not 'success'");
                }
            }
        };

        req.onerror = function() {
            console.error("Error loading tv series data");
        };

        if (requestData !== null) {
            req.open("POST", "http://localhost/quarterStack/hoopAPI.php", true);
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify(requestData));
        }
    }

    fetchSeries();
});