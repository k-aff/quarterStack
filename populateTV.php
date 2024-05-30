<!-- Rapid API_key: 68bd3cbe14mshd6ba6a74e95e878p143061jsn10793b8e845d -->
<?php

$server = "wheatley.cs.up.ac.za";
$user = "u23535793";
$pw = "XSJE56JRFVO4MIIHAMP4QGSUX7M32JED";
$db = "u23535793_HOOP";

$connect = mysqli_connect($server, $user, $pw, $db);

if (!$connect) {
	die("ERROR: cannot connect to db:" . mysqli_connect_error($connect));
}

$curl = curl_init();
curl_setopt_array($curl, [
	CURLOPT_URL => "https://imdb-top-100-movies.p.rapidapi.com/series/",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"X-RapidAPI-Host: imdb-top-100-movies.p.rapidapi.com",
		"X-RapidAPI-Key: f2b106fe64msh29d4eed9101ad06p1d72c9jsna2ff3d0bd7e4"
	],
]);

$response = json_decode(curl_exec($curl), true);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
	echo "RESPONSE";
	echo "<pre>";
	// print_r($response);
	echo "</pre>";
}


// echo "<pre>";
// print_r($response);
// echo "</pre>";
$title = $response[99]["title"];
$image = $response[99]["image"];
$summary = $response[99]["description"];


//movie-tv-show
$curl = curl_init();
// echo $title;
curl_setopt_array($curl, [
	CURLOPT_URL => "https://movies-tv-shows-database.p.rapidapi.com/?title=" . $title,
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"Type: get-shows-by-title",
		"X-RapidAPI-Host: movies-tv-shows-database.p.rapidapi.com",
		"X-RapidAPI-Key: f2b106fe64msh29d4eed9101ad06p1d72c9jsna2ff3d0bd7e4"
	],
]);

$response1 = json_decode(curl_exec($curl), true);
// $response1 = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {


	echo "<pre>";
	print_r($response1);
	echo "</pre>";
}
echo "RESPONSE ONE";
echo "<pre>";
$imdbid = $response1["tv_results"][0]["imdb_id"];
// $imdbid = $response1["tv_results"];
echo "</pre>";
echo $imdbid;
$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://movies-tv-shows-database.p.rapidapi.com/?seriesid=" . $imdbid,
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"Type: get-show-details",
		"X-RapidAPI-Host: movies-tv-shows-database.p.rapidapi.com",
		"X-RapidAPI-Key: f2b106fe64msh29d4eed9101ad06p1d72c9jsna2ff3d0bd7e4"
	],
]);

$response2 = json_decode(curl_exec($curl), true);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {

	echo "<pre>";
	print_r($response2);
	echo "</pre>";
}

echo "<pre>";
print_r($response2["stars"]);
echo "</pre>";
$cast = implode(',', $response2["stars"]);
if (sizeof($response2["creators"]) == 0) {
	echo "empty";
	$crew = "none";
} else {
	$crew = implode(',', $response2["creators"]);
}
$age_cert = $response2["rated"];
$release_date = $response2["release_date"];
$language = implode(',', $response2["language"]);
$genre = $response2["genres"][0];
// find genre 
$genre_sql = "SELECT genre_id FROM genre WHERE genre = ?";

$stmt = $connect->prepare($genre_sql);
if ($stmt === false) {
	die("Prepare failed: " . $connect->error);
}

// Bind the genre parameter (assuming it's a string)
$stmt->bind_param("s", $genre);

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Fetch the genre_id from the result
if ($result->num_rows > 0) {
	$row = $result->fetch_assoc();
	$genre_id = $row['genre_id'];
} else {
	$genre_id = 1;
}

// Free the result and close the statement
$result->free();
$stmt->close();

$type = "S";
// Prepare and bind
//POPULATE TITLE TABLE
$stmt = $connect->prepare("INSERT INTO title (title,cast,crew,age_cert,release_date,plot_summary,language,genre_id,type,image) VALUES (?,?,?,?,?,?,?,?,?,?)");
if ($stmt === false) {
	die("Prepare failed: " . $connect->error);
}

$stmt->bind_param("sssssssiss", $title, $cast, $crew, $age_cert, $release_date, $summary, $language, $genre_id, $type, $image);

// Execute the statement
if ($stmt->execute() === false) {
	die("Execute failed: " . $stmt->error);
} else {
	echo "TV inserted successfully.";
}

//get title

$title_sql = "SELECT title_id FROM title WHERE title = ?";

$stmt = $connect->prepare($title_sql);
if ($stmt === false) {
	die("Prepare failed: " . $connect->error);
}


$stmt->bind_param("s", $title);


$stmt->execute();


$result = $stmt->get_result();


if ($result->num_rows > 0) {
	$row = $result->fetch_assoc();
	$title_id = $row['title_id'];
} else {
	$title_id = 1;
}
echo $title_id;
// Free the result and close the statement
$result->free();
$stmt->close();


//POPULATE TV SERies
$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://movies-tv-shows-database.p.rapidapi.com/?seriesid=" . $imdbid,
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"Type: get-show-seasons",
		"X-RapidAPI-Host: movies-tv-shows-database.p.rapidapi.com",
		"X-RapidAPI-Key: f2b106fe64msh29d4eed9101ad06p1d72c9jsna2ff3d0bd7e4"
	],
]);

$tv_response = json_decode(curl_exec($curl), true);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
	echo "<pre>";
	print_r($tv_response);
	echo "</pre>";
}

$seasons = [];
$episodes = [];

foreach ($tv_response['tv_seasons'] as $season) {
	$seasons[] = $season['season_number'];
	$episodes[] = $season['episode_count'];
}

$seasonsString = implode(", ", $seasons);
$episodesString = implode(", ", $episodes);

echo $seasonsString;
echo $episodesString;
$stmt = $connect->prepare("INSERT INTO tv_series(title_id,no_of_episodes,no_of_seasons) VALUES (?,?,?)");
if ($stmt === false) {
	die("Prepare failed tv: " . $connect->error);
}

$stmt->bind_param("iss", $title_id, $episodesString, $seasonsString);

// Execute the statement
if ($stmt->execute() === false) {
	die("Execute failed: " . $stmt->error);
} else {
	echo "TV series inserted successfully.";
}
// Close the statement and connection
$stmt->close();
$connect->close();

?>