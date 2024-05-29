function getWatchHistory() {
    //get session id
    
    const api = "hoopAPI.php";
  
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getWatchHistory",
      }),
    };
  
    fetch(api, requestData)
      .then((response) => response.json)
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });

  }
  getWatchHistory();