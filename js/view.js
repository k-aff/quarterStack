const myQuery = window.location.search;
const Params = new URLSearchParams(myQuery);
const id = Params.get("titleId");

function onLoad() {
  const req = new XMLHttpRequest();
  const requestData = {
    type: "setViewPage",
    titleId: id,
  };

  console.log(requestData);

  req.onreadystatechange = function () {
    if (this.status === 200 && this.readyState == 4) {
      const titleDetails = JSON.parse(req.responseText);
      console.log(titleDetails);

      const detailsArray = titleDetails.data;

      var detailsCont = document.getElementById("detailsContainer");
      // detailsCont.innerHTML = null;

      var image = document.createElement("img");
      image.src = detailsArray.image;
      image.alt = detailsArray.title + " Cover photo";
      image.classList.add("movie-poster-small");

      var title = document.createElement("h1");
      title.innerHTML = detailsArray.title;

      var details = document.createElement("div");
      details.classList.add("details-section");

      var plot = document.createElement("p");
      var headingP = document.createElement("span");

      headingP.innerHTML = "Plot Summary";
      headingP.style.fontSize = "18px";
      headingP.style.fontWeight = "bold";

      var plotText = document.createElement("span");
      plotText.innerHTML = `: ${detailsArray.plot}`;

      plot.appendChild(headingP);
      plot.appendChild(plotText);

      if (detailsArray.type == "M") {
        var duration = document.createElement("p");
        var headingD = document.createElement("span");

        headingD.innerHTML = "Duration ";
        headingD.style.fontSize = "18px";
        headingD.style.fontWeight = "bold";

        var durationText = document.createElement("span");
        durationText.innerHTML = `: ${detailsArray.runtime} minutes`;

        duration.appendChild(headingD);
        duration.appendChild(durationText);
      } else {
        var duration = document.createElement("p");
        var headingD = document.createElement("span");

        headingD.innerHTML = "Number of Seasons ";
        headingD.style.fontSize = "18px";
        headingD.style.fontWeight = "bold";

        var durationText = document.createElement("span");
        durationText.innerHTML = `: ${detailsArray["number of seasons"]}`;

        duration.appendChild(headingD);
        duration.appendChild(durationText);
      }

      var genre = document.createElement("p");
      var headingG = document.createElement("span");

      headingG.innerHTML = "Genre ";
      headingG.style.fontSize = "18px";
      headingG.style.fontWeight = "bold";

      var genreText = document.createElement("span");
      genreText.innerHTML = `: ${detailsArray.genre}`;

      genre.appendChild(headingG);
      genre.appendChild(genreText);

      var actors = document.createElement("p");
      var headingA = document.createElement("span");

      headingA.innerHTML = "Cast ";
      headingA.style.fontSize = "18px";
      headingA.style.fontWeight = "bold";

      var actorsText = document.createElement("span");
      actorsText.innerHTML = `: ${detailsArray.cast}`;

      actors.appendChild(headingA);
      actors.appendChild(actorsText);

      var crew = document.createElement("p");
      var headingC = document.createElement("span");

      headingC.innerHTML = "Crew ";
      headingC.style.fontSize = "18px";
      headingC.style.fontWeight = "bold";

      var crewText = document.createElement("span");
      crewText.innerHTML = `: ${detailsArray.directors}`;

        crew.appendChild(headingC);
        crew.appendChild(crewText);

        var age = document.createElement("p")
        var headingR = document.createElement("span")

        headingR.innerHTML = "Age certification "
        headingR.style.fontSize = "18px"
        headingR.style.fontWeight = "bold"

        var ageText = document.createElement("span")
        ageText.innerHTML = `: ${detailsArray.age_cert}`

        age.appendChild(headingR);
        age.appendChild(ageText);

        
        var date = document.createElement("p")
        var headingD = document.createElement("span")

        headingD.innerHTML = "Release date "
        headingD.style.fontSize = "18px"
        headingD.style.fontWeight = "bold"

        var dateText = document.createElement("span")
        dateText.innerHTML = `: ${detailsArray['release date']}`

        date.appendChild(headingD);
        date.appendChild(dateText);

        var reviews = document.createElement("button")
        reviews.onclick = function() {
          window.location.href = `Reviews.html?titleId=${detailsArray.id}`;
        };
        reviews.innerHTML = "View or Post Reviews"
        reviews.classList.add("reviews-button")
        reviews.style.textDecoration = "none"

        var production = document.createElement("p")
        if(detailsArray.type=='M'){

          var production = document.createElement("p")
          var headingP = document.createElement("span")
  
          headingP.innerHTML = "Production "
          headingP.style.fontSize = "18px"
          headingP.style.fontWeight = "bold"
  
          var productionText = document.createElement("span")
          productionText.innerHTML = ": Movie"
  
          production.appendChild(headingP);
          production.appendChild(productionText);

        }
        else{
          var production = document.createElement("p")
          var headingP = document.createElement("span")
  
          headingP.innerHTML = "Production "
          headingP.style.fontSize = "18px"
          headingP.style.fontWeight = "bold"
  
          var productionText = document.createElement("span")
          productionText.innerHTML = ": Series"
  
          production.appendChild(headingP);
          production.appendChild(productionText);
        }

        details.appendChild(plot)
        details.appendChild(duration)
        details.appendChild(genre)
        details.appendChild(actors)
        details.appendChild(crew)
        details.appendChild(production)
        details.appendChild(age)
        details.appendChild(date)
        details.appendChild(reviews)
       

        detailsCont.insertBefore(details, detailsCont.firstChild)
        detailsCont.insertBefore(title, detailsCont.firstChild)
        detailsCont.insertBefore(image, detailsCont.firstChild)

      }

    }
  
    req.onerror = function() {
      console.error("Error loading API");
    };
  
    if(requestData!==null){
      req.open("POST", "hoopAPI.php",true);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify(requestData));
    }
}
