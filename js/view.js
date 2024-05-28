const myQuery = window.location.search;
const Params = new URLSearchParams(myQuery);
const id = Params.get('titleId');

function onLoad(){

    const req = new XMLHttpRequest();
    const requestData = {
      "type": "setViewPage",
      "titleId": id
    }
  
    console.log(requestData);
  
    req.onreadystatechange = function() {
    
      if (this.status === 200 && this.readyState==4) {
  
        const titleDetails = JSON.parse(req.responseText);
        console.log(titleDetails);

        const detailsArray = titleDetails.data

        var detailsCont = document.getElementById("detailsContainer")
        // detailsCont.innerHTML = null;

        var image = document.createElement("img");
        image.src = detailsArray.image;
        image.alt = detailsArray.title + " Cover photo";
        image.classList.add("movie-poster-small")

        var title = document.createElement("h1");
        title.innerHTML = detailsArray.title

        var details = document.createElement("div")
        details.classList.add("details-section")

        var plot = document.createElement("p")
        plot.innerHTML = `Plot Summary: ${detailsArray.plot}`
        
        var duration = document.createElement("p")
        duration.innerHTML = `Duration: ${detailsArray.runtime} minutes`

        var genre = document.createElement("p")
        var heading = document.createElement("h2")
        heading.innerHTML = "Genre"
        // heading.style.fontSize = 20
        // heading.style.fontWeight = 20
        genre.innerHTML = heading.innerHTML + `: ${detailsArray.genre}`

        var actors = document.createElement("p")
        actors.innerHTML = `Cast: ${detailsArray.cast}`

        var director = document.createElement("p")
        director.innerHTML = `Director: ${detailsArray.directors}`

        var reviews = document.createElement("a")
        reviews.href = `Reviews.html?titleId=${detailsArray.id}`
        reviews.innerHTML = "View Reviews"
        reviews.classList.add("reviews-link")

        var production = document.createElement("p")
        if(detailsArray.type=='M')
            production.innerHTML = "Production: Movie"
        else
            production.innerHTML = "Production: Series"

        

        // var plot = document.createElement("p")
        // plot.innerHTML = `Plot Summary: ${detailsArray.plot}`
        

        details.appendChild(plot)
        details.appendChild(duration)
        details.appendChild(genre)
        details.appendChild(actors)
        details.appendChild(director)
        details.appendChild(production)
        details.appendChild(reviews)
        // details.appendChild(plot)

        detailsCont.insertBefore(details, detailsCont.firstChild)
        detailsCont.insertBefore(title, detailsCont.firstChild)
        detailsCont.insertBefore(image, detailsCont.firstChild)
        
      }

    }
  
    req.onerror = function() {
      console.error("Error loading API");
    };
  
    if(requestData!==null){
      req.open("POST", "http://localhost/quarterStack/hoopAPI.php",true);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify(requestData));
    }
}
  
