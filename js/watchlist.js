document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const leftButton = document.querySelector('.carousel-button.left');
    const rightButton = document.querySelector('.carousel-button.right');
    
    let currentIndex = 0;
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * (carouselItems[0].offsetWidth + 20)}px)`;
    }

    leftButton.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
    });

    rightButton.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, carouselItems.length - 1);
        updateCarousel();
    });

    updateCarousel();
});

function logout(){

    const req = new XMLHttpRequest();
    
    const requestData ={
      "type": "logout"
    }
    
    req.onreadystatechange = function() {
      if (this.status === 200 && this.readyState == 4) {
        const response = JSON.parse(req.responseText);
        console.log(response)
      }
    }
    
    req.onerror = function() {
      console.error("Error loading API");
    };
    
    req.open("POST", "hoopAPI.php", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(requestData));
    
    }
