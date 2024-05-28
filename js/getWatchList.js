//storage

function getWatchList() {
  //get session id
  console.log("Pressed add to Watchlist");
    //make use of user ID or session id
    const api = "hoopAPI.php";
  
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "getWatchList",
        //get session id
        user_id: 4,
       
      }),
    };
  
    console.log(requestData["body"]);
  
    fetch(api, requestData)
      .then((response) => response)
      .then((data) => {
        console.log("Success:", data);
        
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  }
  getWatchList()