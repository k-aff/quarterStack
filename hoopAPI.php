<?php
echo "In Class!";

class Hoop
{

    protected $con;
    public static function instance()
    {
        static $instance = null;
        if ($instance === null)
            $instance = new Hoop();
        return $instance;
    }

    private function __construct()
    {
        $this->con = new mysqli("wheatley.cs.up.ac.za", "u23535793", "XSJE56JRFVO4MIIHAMP4QGSUX7M32JED", "u23535793_HOOP");
        if ($this->con->connect_error) {
            die("Connection failed: " . $this->con->connect_error);
        } else {
            $this->con = $this->con;
            echo "Connected!";
        }

        return $this->con;
    }

    public function __destruct()
    {
        mysqli_close($this->con);
    }

    public function handleRequest()
    {

        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body, true);
        $hoop = Hoop::instance();


        if ($_SERVER["REQUEST_METHOD"] === "POST") {

            $reqbody = json_decode(file_get_contents('php://input'), true);

            $type = $reqbody["type"];

                if (!isset($type)) 
                {
                    echo json_encode(new Response("Error", time(), "No type specified"));
                    return;
                }
                if ($type === "signUp") 
                {
                    $this->signUp($reqbody);
                }
                else if($type==="login") 
                {
                    $this->login($reqbody);
                }
                else if($type==="getAllTitles") 
                {
                    $this->getAllTitles($reqbody);
                }
                else if($type==="search") 
                {
                    $this->search($reqbody);
                }
                else if($type==="getMovies") 
                {
                    $this->getMovies($reqbody);
                }
                else if($type==="getSeries") 
                {
                    $this->getSeries($reqbody);
                }
                else if($type==="getWatchHistory") 
                {
                    $this->getWatchHistory($reqbody);
                }
                else if($type==="getWatchList") 
                {
                    $this->getWatchList($reqbody);
                }
                else if($type==="getUser") 
                {
                    $this->getUser($reqbody);
                }
                else if($type==="updateUser") 
                {
                    $this->updateUser($reqbody);
                }
                else if($type==="updatePassword") 
                {
                    $this->updatePassword($reqbody);
                }
                else if($type==="deleteUser") 
                {
                    $this->deleteUser($reqbody);
                }
                else if($type==="getUserPref") 
                {
                    $this->getUserPref($reqbody);
                }
                else if($type==="setUserPref") 
                {
                    $this->setUserPref($reqbody);
                }
                else if($type==="setViewPage") 
                {
                    $this->setViewPage($reqbody);
                }
                else if($type==="getReview") 
                {
                    $this->getReview($reqbody);
                }
                else if($type==="setReview") 
                {
                    $this->setReview($reqbody);
                }
                else if($type==="logout") 
                {
                    $this->logout($reqbody);
                }

            }
        }
    


    public function signUp($jsonData)
    {
        //get all json data
        //get name and surname 
        $fname = $jsonData["fname"];
        $surname = $jsonData["surname"];
        //get dob from data
        $dob = $jsonData["dob"];
        //get gender from data
        $gender = $jsonData["gender"];
        //get phone from data
        $phone = $jsonData["phone"];
        //get email from data
        $email = $jsonData["email"];
        //get password from data
        $password = $jsonData["password"];
        //get country_id from data
        $country_id = $jsonData["country_id"];
        //get card_no from data
        $card_no = $jsonData["card_no"];
        //get expiry date from data
        $expiry_date = $jsonData["expiry_date"];

        //check if name and surname are valid
        if (empty($fname) || empty($surname)) {
            //some error response
            echo json_encode(new Response("error", time(), "empty name or surname"));
            exit();
        }
        $fname = trim($fname);
        $surname = trim($surname);
        $fname = stripslashes($fname);
        $surname = stripslashes($surname);
        $fname = htmlspecialchars($fname);
        $surname = htmlspecialchars($surname);
        if (strlen($fname) > 100 || !preg_match("/^[a-zA-ZÀ-ÿ-' ]*$/u", $fname)) {
            //some error response for invald name
            echo json_encode(new Response("error", time(), "invalid name"));
            exit();
        }
        if (strlen($surname) > 100 || !preg_match("/^[a-zA-ZÀ-ÿ-' ]*$/u", $surname)) {
            //some error response for invald surname
            echo json_encode(new Response("error", time(), "invalid surname"));
            exit();
        }
        ucwords($fname);
        ucwords($surname);

        //check if dob is greater than 1900 and smaller than  current date 
        $dobDateTime = DateTime::createFromFormat('Y-m-d', $dob);
        $minDate = DateTime::createFromFormat('Y', '1900');
        $currentDate = new DateTime();

        if (!$dobDateTime || $dobDateTime->format('Y-m-d') !== $dob || $dobDateTime <= $minDate || $dobDateTime >= $currentDate) {
            // some error message for invalid dob
            echo json_encode(new Response("error", time(), "invalid dob"));
            exit();
        }

        //check if gender is in [F, M, O, P]
        if (!preg_match('/^[FMOP]$/', $gender)) {
            echo json_encode(new Response("error", time(), "gender not in F, M, O, P"));
            exit();
        }

        //check if phone number is all numbers and smaller than 16 digits
        if (strlen($phone) > 16 || !preg_match('/^\d+$/', $phone)) {
            echo json_encode(new Response("error", time(), "phone number is not all digits"));
            exit();
        }

        //check if email is valid
        $pattern = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
        if (!preg_match($pattern, $email)) {
            echo json_encode(new Response("error", time(), "invalid email address"));
            exit();
        }

        //check if email is unique
        $sql = "SELECT COUNT(*) FROM user WHERE email = ?";
        $stmt = $this->con->prepare($sql);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->fetch_assoc()['COUNT(*)'];
        if ($count > 0) {
            echo json_encode(new Response("error", time(), "email already in use"));
            exit();
        }

        //check if password is valid
        if (!preg_match("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/", $password)) {
            echo json_encode(new Response("error", time(), "invalid password"));
            exit();
        }
        $hashedPassword = hash('sha256', $password);

        //check if country_id in 0-259
        if (!is_numeric($country_id) || $country_id < 0 || $country_id > 259) {
            echo json_encode(new Response("error", time(), "invalid country_id"));
            exit();
        }

        //check if card_no is shorter than 25 characters
        if (strlen($card_no) > 25 || !ctype_digit($card_no)) {
            echo json_encode(new Response("error", time(), "invalid card_no"));
            exit();
        }

        //check if expiry_date is bigger than current date
        $expiryDateTime = DateTime::createFromFormat('Y-m-d', $expiry_date);
        $currentDate = new DateTime();

        if (!$expiryDateTime || $expiryDateTime <= $currentDate) {
            // some error message for invalid dob
            echo json_encode(new Response("error", time(), "invalid expiry_date"));
            exit();
        }

        //insertUser
        $sqlUser = "INSERT INTO user (fname, surname, dob, gender, phone, email, password, active, country_id) VALUES (?,?,?,?,?,?,?,true,?)";
        $stmt = $this->con->prepare($sqlUser);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("sssssssi", $fname, $surname, $dob, $gender, $phone, $email, $hashedPassword, $country_id);
        $stmt->execute();

        $sqlGetID = "SELECT user_id FROM user WHERE email = ?";
        $stmt = $this->con->prepare($sqlGetID);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $user_id = $result->fetch_assoc()['user_id'];
        } else {
            echo json_encode(new Response("error", time(), "user_id not found"));
        }

        $sqlBilling = "INSERT INTO billing (user_id, card_no, expiry_date) VALUES (?,?,?)";
        $stmt = $this->con->prepare($sqlBilling);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("iss", $user_id, $card_no, $expiry_date);
        $stmt->execute();

        // $data = [ "fname" => $fname, "surname" => $surname, "dob" => $dob, "gender" => $gender, "phone" => $phone, "email" => $email, "password" => $hashedPassword, "country_id" => $country_id, "card_no" => $card_no];  
        echo json_encode(new Response("success", time(), "user added to database"));
        session_start();
        $_SESSION["user_id"] = $user_id;
    }

    public function updateUser($jsonData)
    {
        //get all json data
        //get phone from data
        $phone = $jsonData["phone"];
        //get email from data
        $email = $jsonData["email"];
        //get country_id from data
        $country_id = $jsonData["country_id"];
        //get card_no from data
        $card_no = $jsonData["card_no"];
        //get expiry date from data
        $expiry_date = $jsonData["expiry_date"];

        //check if phone number is all numbers and smaller than 16 digits
        if (strlen($phone) > 16 || !preg_match('/^\d+$/', $phone)) {
            echo json_encode(new Response("error", time(), "phone number is not all digits"));
            exit();
        }

        //check if email is valid
        $pattern = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
        if (!preg_match($pattern, $email)) {
            echo json_encode(new Response("error", time(), "invalid email address"));
            exit();
        }

        //check if email is unique
        $sql = "SELECT user_id, COUNT(*) FROM user WHERE email = ?";
        $stmt = $this->con->prepare($sql);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->fetch_assoc()['COUNT(*)'];
        $id = $result->fetch_assoc()['user_id'];
        if ($count > 0) {
            session_start();
            if ($id != $_SESSION["user_id"]) {
                echo json_encode(new Response("error", time(), "email already in use"));
                exit();
            }
        }

        //check if country_id in 0-259
        if (!is_numeric($country_id) || $country_id < 0 || $country_id > 259) {
            echo json_encode(new Response("error", time(), "invalid country_id"));
            exit();
        }

        //check if card_no is shorter than 25 characters
        if (strlen($card_no) > 25 || !ctype_digit($card_no)) {
            echo json_encode(new Response("error", time(), "invalid card_no"));
            exit();
        }

        //check if expiry_date is bigger than current date
        $expiryDateTime = DateTime::createFromFormat('Y-m-d', $expiry_date);
        $currentDate = new DateTime();

        if (!$expiryDateTime || $expiryDateTime <= $currentDate) {
            // some error message for invalid dob
            echo json_encode(new Response("error", time(), "invalid expiry_date"));
            exit();
        }

        //update user info and billing info 
        $sqlUser = "UPDATE user SET phone=?, email=?, country_id=? WHERE user_id=?";
        $stmt = $this->con->prepare($sqlUser);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        session_start();
        $stmt->bind_param("ssii", $phone, $email, $country_id, $_SESSION["user_id"]);
        $stmt->execute();

        $sqlBilling = "UPDATE billing SET card_no=?, expiry_date=? WHERE user_id=?";
        $stmt = $this->con->prepare($sqlBilling);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("ssi", $card_no, $expiry_date, $_SESSION["user_id"]);
        $stmt->execute();

        // $data = [ "fname" => $fname, "surname" => $surname, "dob" => $dob, "gender" => $gender, "phone" => $phone, "email" => $email, "password" => $hashedPassword, "country_id" => $country_id, "card_no" => $card_no];  
        echo json_encode(new Response("success", time(), "user details updated"));
    }

    public function deleteUser($jsonData)
    {
        $sql = "DELETE FROM user WHERE id = ?";
        $stmt = $this->con->prepare($sql);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("i", $_SESSION["user_id"]);
        $stmt->execute();

        echo json_encode(new Response("success", time(), "user deleted from database"));

        if (isset($_SESSION["user_id"]))
            session_destroy();
    }
 

    public function setReview()
    {
        $hoop = Hoop::instance();
        $reqbody = json_decode(file_get_contents('php://input'), true);

        $email = $reqbody["email"];
        $user_id = $hoop->getUserIdByEmail($email);

        if (!$user_id) {
            echo "Error: User not found";
            return;
        }

        $title_id = $reqbody["title_id"];
        $rating = $reqbody["rating"];
        $review = $reqbody["review"] ?? null;
        $date_time = date('Y-m-d');

        $stmt = $hoop->con->prepare("INSERT INTO review (user_id, title_id, date_time, review, rating) VALUES (?, ?, ?, ?,?)");
        $stmt->bind_param("issss",$user_id, $title_id, $date_time, $review,$rating);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(new Response("success", time(), "Review added successfully"));
        } else {
            echo json_encode(new Response("failure", time(), "Review not added "));
        }

        
    }
public function setUserPref()
{
    $hoop = Hoop::instance();
    $reqbody = json_decode(file_get_contents('php://input'), true);

    $email = $reqbody["email"];
    $user_id = $hoop->getUserIdByEmail($email);

    if (!$user_id) {
        //echo "Error: User not found";
        echo json_encode(new Response("failure", time(), "user not found"));
        return;
    }

    $type = $reqbody["titleType"] ?? null;
    $genre1 = $reqbody["genre1"] ?? null;
    $genre2 = $reqbody["genre2"] ?? null;
    $genre3 = $reqbody["genre3"] ?? null;

    // Check if the user already has a preference record
    $stmt = $hoop->con->prepare("SELECT pref_id FROM user_preference WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $pref_id = $result->num_rows > 0 ? $result->fetch_assoc()["pref_id"] : null;

    // Update the existing record or insert a new one
    if ($pref_id) {
        $stmt = $hoop->con->prepare("UPDATE user_preference SET type = ?, genre_id_1 = ?, genre_id_2 = ?, genre_id_3 = ? WHERE pref_id = ?");
        $stmt->bind_param("ssssi", $type, $genre1, $genre2, $genre3, $pref_id);
        $stmt->execute();
        //echo "Preferences updated successfully";
        echo json_encode(new Response("success", time(), "Preferences updated successfully"));
    } else {
        $stmt = $hoop->con->prepare("INSERT INTO user_preference (user_id, type, genre_id_1, genre_id_2, genre_id_3) VALUES (?, ?, ?, ?,?)");
        $stmt->bind_param("issss", $user_id, $type, $genre1, $genre2, $genre3);
        $stmt->execute();
        //echo "Preferences added successfully";
        echo json_encode(new Response("success", time(), "Preferences added successfully"));
    }
}

    private function getUserIdByEmail($email)
    {
        $stmt = $this->con->prepare("SELECT user_id FROM user WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0 ? $result->fetch_assoc()["user_id"] : null;
    }


        public function getUserPref()
        {
            $hoop = Hoop::instance();
            $reqbody = json_decode(file_get_contents('php://input'), true);
            $email = $reqbody["email"];
            $id = $hoop->getUserIdByEmail($email);
            $sqlcheckpref = "SELECT * FROM user_preference WHERE user_id='$id'";
            $result = $this->con->query($sqlcheckpref);
         
            // if($result)
            // {
            //     $pref = $result->fetch_assoc();
            //     $type = $pref["type"];
            //     $genre1 = $pref["genre_id_1"];
            //     $genre2 = $pref["genre_id_2"];
            //     $genre3 = $pref["genre_id_3"];}
            if ($result && $result->num_rows > 0) 
            {
                $pref = $result->fetch_assoc();
                $user_pref = array(
                    "type" => $pref["type"],
                    "genre_id_1" => $pref["genre_id_1"],
                    "genre_id_2" => $pref["genre_id_2"],
                    "genre_id_3" => $pref["genre_id_3"]
                );
                //echo json_encode($user_pref);
                echo json_encode(new Response("success", time(), $user_pref));
            }
            else
            {
                echo json_encode(new Response("success", time(), "user doesn't have preferences"));
            }
            
        }
        public function getReview()
        {
            $hoop = Hoop::instance();
            $reqbody = json_decode(file_get_contents('php://input'), true);
            $title_id = $reqbody["title_id"];
            // $id = $hoop->getUserIdByEmail($email);
            $sqlcheckpref = "SELECT * FROM review WHERE title_id='$title_id'";
            $result = $this->con->query($sqlcheckpref);
            if ($result && $result->num_rows > 0) 
            {
                $pref = $result->fetch_assoc();
                $user_rev = array(
                    "date" => $pref["date_time"],
                    "review" => $pref["review"],
                    "rating" => $pref["rating"],
                    "user_id" => $pref["user_id"]
                );
                echo json_encode(new Response("success", time(), $user_rev));
            }
            else
            {
                echo json_encode(new Response("failure", time(), "title has no reviews"));
            }

        }
        
        public function getMovies()
        {
            $hoop = Hoop::instance();
            $sql = "SELECT title,image  FROM movie INNER JOIN title ON movie.title_id = title.title_id";
            $result = $this->con->query($sql);

            if ($result && $result->num_rows > 0) {
                $movies = array();
                while ($row = $result->fetch_assoc()) {
                    $movies[] = $row;
                }
                echo json_encode(new Response("success", time(), $movies));
            } else {
                echo json_encode(new Response("failure", time(), "no movies found"));
            }
        }

    public function updatePassword($jsonData)
    {
        //get all json data
        //get phone from data
        $oldPassword = $jsonData["oldPassword"];
        $hashedOldPassword = hash('sha256', $oldPassword);
        //get email from data
        $newPassword = $jsonData["newPassword"];

        //check if oldPassword is in the database and belonds to the current user
        $sqlOldPassword = "SELECT password FROM user WHERE user_id = ?";
        $stmt = $this->con->prepare($sqlOldPassword);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        session_start();
        $stmt->bind_param("s", $_SESSION["user_id"]);
        $stmt->execute();
        $result = $stmt->get_result();
        $password = $result->fetch_assoc()['password'];
        if ($hashedOldPassword != $password) {
            echo json_encode(new Response("error", time(), "old password is incorrect"));
        }

        //check if new password is valid
        if (!preg_match("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/", $newPassword)) {
            echo json_encode(new Response("error", time(), "new password is invalid"));
            exit();
        }
        $hashedNewPassword = hash('sha256', $newPassword);

        //update password in database
        $sql = "UPDATE user SET password=? WHERE user_id=?";
        $stmt = $this->con->prepare($sql);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        session_start();
        $stmt->bind_param("si", $hashedNewPassword, $_SESSION["user_id"]);
        $stmt->execute();

        echo json_encode(new Response("success", time(), "user password updated"));
    }

    public function search($jsonData)
    {
        //get all json data
        //get phone from data
        $searchText = $jsonData["text"];

        $sql = "SELECT title, image FROM title WHERE title LIKE ? OR genre_id IN (SELECT genre_id from genre WHERE genre LIKE ?)";
        $stmt = $this->con->prepare($sql);
        if (!$stmt) {
            echo "Error: " . $this->con->error;
            return;
        }
        $stmt->bind_param("ss", $searchText, $searchText);
        $stmt->execute();

        // echo 
    }

    public function logout()
    {
        if (isset($_SESSION["user_id"]))
            session_destroy();
    }
    
    public function login($request_body) //by retha
    {
        print_r($request_body);
        $email = $request_body["email"];
        $password = $request_body["password"];

        //check if email exits in db
        $loginQuery = "SELECT user_id FROM user
        WHERE email = ?";

        if (!$statement = $this->con->prepare($loginQuery)) {
            die('Prepair failed');
        }

        $statement->bind_param('s', $email);
        $statement->execute();

        $statement->bind_result($user_id);

        // Fetch the result
        if ($statement->fetch()) {
            echo 'User ID: ' . $user_id;
        } else {
            echo 'No user found with the given email.';
        }
        $user = $statement->fetch();

        $statement->close();

        if ($user === false) {
            $data = [
                "message" => "User not found",
                "user_id" => null
            ];
            return json_encode(new Response("Error", time(), $data));
        } else {
            //hash passed in password
            $hashpass = hash('SHA 256', $password);
            //verify the password if email exsists
            //check if email exits in db
            $loginQuery = "SELECT password FROM user
        WHERE password = ?";

            if (!$statement = $this->con->prepare($loginQuery)) {
                die('Prepair failed');
            }

            $statement->bind_param('s', $hashpass);
            $statement->execute();

            $statement->bind_result($password);

            if ($statement->fetch()) {
                $statement->close();

                $data = [
                    "message" => "User logged in",
                    "user_id" => $user_id

                ];

                //if password && email update status to true and start session
                $update = "UPDATE user SET active = ? WHERE user_id = ?";
                $stmt = $this->con->prepare($update);
                if (!$stmt) {
                    echo $this->con->error;
                }
                $act = 1;
                $userID = $user_id;

                $stmt->bind_param('ii', $act, $userID);
                $stmt->execute();
                $stmt->close();
                //unset
                session_start();
                $_SESSION["user_id"];

                // {"status":"Success","timestamp":1716362405,"data":{"message":"User logged in","user_id":26}}

                echo json_encode(new Response("Success", time(), $data));
            } else {
                // Password is incorrect
                $data = [
                    "message" => "Invalid credentials",

                ];
                return json_encode(new Response("Error", time(), $data));
            }
        }
    }
    public function setWatchHistory($request_body)
    {

        $titleID = $request_body["title_id"];
        $user_id = $request_body["user_id"];
        //check if the title is already in the watch hist table
        $historyQuery = "SELECT title_id FROM watch_history
        WHERE user_id = ?";


        if (!$statement = $this->con->prepare($historyQuery)) {
            die('Prepair failed');
        }
        $statement->bind_param('s', $user_id);
        $statement->execute();
        $statement->bind_result($title_id);
        $hist_id = $statement->fetch();
        $statement->close();
        if ($hist_id) {

            $data = [
                "message" => "Title already in Watch History",
            ];
            return json_encode(new Response("Error", time(), $data));
        } else {
            //insert title into watchHistory

            $historyQuery = "SELECT title_id FROM title
            WHERE title_id = ?";

            if (!$statement = $this->con->prepare($historyQuery)) {
                die('Prepair failed');
            }
            $statement->bind_param('s', $titleID);
            $statement->execute();
            $statement->bind_result($titleID);
            $hist_id = $statement->fetch();
            $statement->close();


            $stmt = $this->con->prepare("INSERT INTO watch_history (title_id,user_id) VALUES (?,?)");
            if ($stmt === false) {
                die("Prepare failed: " . $this->con->error);
            }

            $stmt->bind_param("ss", $titleID, $user_id);

            // Execute the statement
            if ($stmt->execute() === false) {
                die("Execute failed: " . $stmt->error);
            } else {
                echo "Watch History inserted successfully.";
            }
            $stmt->close();
        }
    }

    public function getWatchHistory($request_body)
    {
        $user_id = $request_body["user_id"];
        $histQuery = "SELECT title_id FROM watch_history
        WHERE user_id = $user_id";


        if (!$statement = $this->con->prepare($histQuery)) {
            die('Prepair failed');
        }
        $statement->bind_param('s', $user_id);
        $statement->execute();
        $statement->bind_result($title_id);
        $hist_titles = [];
        while ($statement->fetch()) {
            $hist_titles[] = $title_id;
        }

        $statement->close();

        //carousel
        $data = [];
        for ($i = 0; $i < sizeof($hist_titles); $i++) {
            $data[] = $hist_titles[$i];
        }

        return json_encode(new Response("Success", time(), $data));
    }

    public function setWatchList($request_body)
    {
        $titleID = $request_body["title_id"];
        $user_id = $request_body["user_id"];
        //check if the title is already in the watch hist table
        $historyQuery = "SELECT title_id FROM watch_list
        WHERE user_id = ?";


        if (!$statement = $this->con->prepare($historyQuery)) {
            die('Prepair failed');
        }
        $statement->bind_param('s', $user_id);
        $statement->execute();
        $statement->bind_result($title_id);
        $hist_id = $statement->fetch();
        $statement->close();
        if ($hist_id) {

            $data = [
                "message" => "Title already in Watch History",
            ];
            return json_encode(new Response("Error", time(), $data));
        } else {
            //insert title into watchHistory

            $historyQuery = "SELECT title_id FROM title
            WHERE title_id = ?";

            if (!$statement = $this->con->prepare($historyQuery)) {
                die('Prepair failed');
            }
            $statement->bind_param('s', $titleID);
            $statement->execute();
            $statement->bind_result($titleID);
            $hist_id = $statement->fetch();
            $statement->close();


            $stmt = $this->con->prepare("INSERT INTO watch_list (title_id,user_id) VALUES (?,?)");
            if ($stmt === false) {
                die("Prepare failed: " . $this->con->error);
            }

            $stmt->bind_param("ss", $titleID, $user_id);

            // Execute the statement
            if ($stmt->execute() === false) {
                die("Execute failed: " . $stmt->error);
            } else {
                echo "Watch List inserted successfully.";
            }
            $stmt->close();
        }
    }

    public function getWatchList($request_body)
    {
        $user_id = $request_body["user_id"];
        $histQuery = "SELECT title_id FROM watch_list
        WHERE user_id = $user_id";


        if (!$statement = $this->con->prepare($histQuery)) {
            die('Prepair failed');
        }
        $statement->bind_param('s', $user_id);
        $statement->execute();
        $statement->bind_result($title_id);
        $hist_titles = [];
        while ($statement->fetch()) {
            $hist_titles[] = $title_id;
        }

        $statement->close();

        //carousel
        $data = [];
        for ($i = 0; $i < sizeof($hist_titles); $i++) {
            $data[] = $hist_titles[$i];
        }


        return json_encode(new Response("Success", time(), $data));
    }


    public function getAllTitles($data)
    {
        // $email = $_SESSION['email']; //use id instead?  $id = $_SESSION['id']

        $sqlcheckpref = "SELECT * FROM user_preference WHERE user_id=1";
        $result = $this->con->query($sqlcheckpref);

        if($result)
        {
            $pref = $result->fetch_assoc();
            $type = $pref["type"];
            $genre1 = $pref["genre_id_1"];
            $genre2 = $pref["genre_id_2"];
            $genre3 = $pref["genre_id_3"];

            //Assuming users set atleast one genre
            if($type!==null)
                $whereClause = " WHERE type=". "'". $type."'";
            if($genre1!=null)
                $whereClause = $whereClause. " AND (genre_id=". $genre1;
            if($genre2!=null)
                $whereClause = $whereClause. " OR genre_id=". $genre2;
            if($genre3!=null)
                $whereClause = $whereClause. " OR genre_id=". $genre3;
            
            if($genre1!=null)
                $whereClause = $whereClause. ")";

            echo $whereClause;
        }
        else
        {
            echo "No preferences set";
        }
        
        $carousels = ["Movies", "Series", "Action", "Animation", "Sci-fi", "Horror", "Comedy", "Adventure", "Drama", "Preferences"];//add preferences;
        $returnObject = array();

        foreach($carousels as $carousel){

            if($carousel === 'Movies')
                $sqlReturnTitles ="SELECT * FROM title WHERE type='M' LIMIT 20";
            else if($carousel === 'Series')
                $sqlReturnTitles ="SELECT * FROM title WHERE type='S' LIMIT 20";
            else if(isset($pref) && $carousel === "Preferences"){
                $sqlReturnTitles ="SELECT * FROM title".$whereClause. "LIMIT 20" ;
                echo $sqlReturnTitles;
            }
            else
                $sqlReturnTitles ="SELECT * FROM title WHERE genre_id IN(SELECT genre_id from genre WHERE genre ='$carousel') LIMIT 20" ;

            // echo $sqlReturnTitles;
            $result = $this->con->query($sqlReturnTitles);

            if($result)
            {
                $titlesToRet = array();

                //creating an associative array of what to return for each tuple returned from database

                while($title = $result->fetch_assoc()){

                    $data = array();
                    $data['title'] = $title["title"];
                    $data['image'] = $title["image"];

                    //obtaining additonal movie or series data 

                    $titlesToRet[] = $data;
                }
                $returnObject[$carousel] = $titlesToRet;

            }
            else{
                echo json_encode(new Response("failed", time(), "Error occured"));
            }
        }
        echo json_encode(new Response("success", time(), $returnObject));
    }

    public function setViewPage($data)
    {
        $titleId = $data["titleId"];
        //need to put the title in the url;

        //get the record 
        $sqlReturnInfo ="SELECT * FROM title WHERE title_id=$titleId" ;
        echo $sqlReturnInfo;
        $result = $this->con->query($sqlReturnInfo);

        //check genre in genre table
        $title = $result->fetch_assoc();
        $genre_id = $title["genre_id"];
        $sql1 = "SELECT genre from genre WHERE genre_id=$genre_id";
        $result1 = $this->con->query($sql1);
        $titleGenre = $result1->fetch_assoc();
        $genre = $titleGenre["genre"];

        $data = array();
        $data['title'] = $title["title"];
        $data['type'] = $title["type"];
        $data['age_cert'] = $title["age_cert"];
        $data['plot'] = $title["plot_summary"];
        $data['languages'] = (explode(', ', $title["language"]))[0];
        $data['release date'] = $title["release_date"];
        $data['genre'] = $genre;
        $data['directors'] = (explode(', ', $title["crew"]))[0]; //Add more?
        $data['cast'] = $title["cast"];
        $data['image'] = $title["image"];

        //obtaining additonal movie or series data 
        if($title["type"] == 'M')
        {
            $title_id = $title["title_id"];
            $sql2 = "SELECT runtime FROM movie WHERE title_id = '$title_id'";
            $result2 = $this->con->query($sql2);
            $titleRuntime = $result2->fetch_assoc();
            $data['runtime'] = $titleRuntime["runtime"];
        }
        else if($title["type"] == 'S'){ 

            $title_id = $title["title_id"];
            $sql2 = "SELECT * FROM tv_series WHERE title_id = '$title_id'";
            $result2 = $this->con->query($sql2);
            $titleEps = $result2->fetch_assoc();
            $data['number of seasons'] = $titleEps["no_of_seasons"];
            $data['total of episodes'] = $titleEps["no_of_episodes"];
        }

        echo json_encode(new Response("success", time(), $data));
    }    
}

    $hoop = Hoop::instance();
    $hoop->handleRequest();

class Response
{

    public $status;
    public $timestamp;
    public $data;


    function __construct($status, $timestamp, $data)
    {
        $this->status = $status;
        $this->timestamp = $timestamp;
        $this->data = $data;
    }
}
