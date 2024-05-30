<?php
     $conn = new mysqli("localhost","root","Naturalscience1","hoop_group11");
     if ($conn->connect_error) {
         die("Connection failed: ".$con->connect_error);
     }
     else
     {
        echo "Connected";

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://movies-tv-shows-database.p.rapidapi.com/?movieid=tt4477536",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "Type: get-movie-details",
                "X-RapidAPI-Host: movies-tv-shows-database.p.rapidapi.com",
                "X-RapidAPI-Key: fa7b40889fmshc2b4fd320302bbbp1e676cjsn0696215b05e8"
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            echo $response;
        }

        $dataArray = json_decode($response, true);

        $title = $dataArray['title'];
        $description = $dataArray['description'];
        $release_date = str_replace("-", "", $dataArray['release_date']);
        $language = implode(', ', $dataArray['language']); // Convert array to string
        $genres = $dataArray['genres'];
        $cast = implode(', ', $dataArray['stars']); // Convert array to string
        $age_cert = $dataArray['rated'];
        $runtime = $dataArray['runtime'];
        $producers = implode(', ', $dataArray['directors']); // Convert array to string
     
        //Insert into genre table

        $genre = $genres[0];
        $sql1 = "SELECT genre_id from genre WHERE genre=?";
        $stmt = $conn->prepare($sql1);

        if ($stmt) {
            // Bind parameter
            $stmt->bind_param("s", $genre);
            
            // Execute the statement
            $stmt->execute();
            
            // Bind the result variable
            $stmt->bind_result($genre_id);
            
            // Fetch the result
            $stmt->fetch();
            
            // Check if genre_id is fetched successfully
            if ($genre_id !== null) {
                echo "Genre ID for genre '$genre' is: " . $genre_id;
            } else {
                echo "No genre found for genre '$genre'.";
            }
            
            // Close the statement
            $stmt->close();
        } else {
            // Handle prepare() failure
            echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
        }

        // Insert title information into the title table

        $sql4 = "SELECT title_id FROM title WHERE title = '$title'";
        $result = $conn->query($sql4);
        
        if ($result) {
            // Check the number of rows returned
            if ($result->num_rows > 0) {
                echo "Title '$title' found in the database.";
                return;
                
                // You can fetch and process the rows here if needed
            } else {
                echo "Title '$title' not found in the database.";
            }
        } else {
            echo "Error executing query: " . $conn->error;
        }

        $sql = "INSERT INTO title (title, plot_summary, release_date, language, cast, crew, age_cert, genre_id, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'M')";

        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            "Failed to prepare";
            echo $conn->error;
        }

        $stmt->bind_param("sssssssi", $title, $description, $release_date, $language, $cast, $producers, $age_cert, $genre_id);
        
        echo json_encode($stmt);

        if ($stmt->execute()) {
            $title_id = $conn->insert_id; // Get the auto-generated ID of the inserted title

            echo "New record created successfully in title";
        } else {
            echo "Error: ". "<br>" . $conn->error;
        }

        $sql2 = "INSERT INTO movie (title_id, runtime) 
                VALUES ('$title_id', '$runtime')";

        if ($conn->query($sql2) === TRUE) {
            echo "New record created successfully in movie";
        } else {
            echo "Error: " . $sql2 . "<br>" . $conn->error;
            return;
        }

        $stmt->close();

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://movies-tv-shows-database.p.rapidapi.com/?movieid=tt4477536",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "Type: get-movies-images-by-imdb",
                "X-RapidAPI-Host: movies-tv-shows-database.p.rapidapi.com",
                "X-RapidAPI-Key: fa7b40889fmshc2b4fd320302bbbp1e676cjsn0696215b05e8"
            ],
        ]);

        $response = curl_exec($curl);
        $dataArray = json_decode($response, true);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            echo $response;
        }

        $title = $dataArray['title'];
        $image = $dataArray['poster'];
        $sql = "UPDATE title SET image = '$image' WHERE title = '$title'";

        if ($conn->query($sql) === TRUE) {
            echo "Movie updated successfully.";
        } else {
            echo "Error updating record: " . $conn->error;
        }

        $conn->close();
        
        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            echo $response;
        }
    }
?>
