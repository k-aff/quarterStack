<?php
    // echo "In Class!";

    class Hoop
    {
        protected $con;
        public static function instance() 
        {
            static $instance = null; 
            if($instance === null)
                $instance = new Hoop();
            return $instance; 
        }

        private function __construct() 
        {
            $con = new mysqli("wheatley.cs.up.ac.za","u23535793","XSJE56JRFVO4MIIHAMP4QGSUX7M32JED","u23535793_HOOP");
            if ($con->connect_error) 
            {
                die("Connection failed: ".$con->connect_error);
            }
            else
            {
                $this->con = $con;
                echo "Connected!";
            }

            return $con;
        }

        public function __destruct() 
        { 
            mysqli_close($this->con);
        }

        public function handleRequest()
        {
            // echo "In handleRequest class"; 

            if ($_SERVER["REQUEST_METHOD"] === "POST") 
            {
                $reqbody = json_decode(file_get_contents('php://input'), true);
                $type = $reqbody["type"];
                if (!isset($type)) {
                    echo "Error: No Type";
                    return;
                }
    
                if ($type === "signUp") {
                    $this->signUp($reqbody);
                }
                if($type==="login") 
                {
                    $this->login();
                }
                if($type==="getAllTitles") 
                {
                    $this->getAllTitles();
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

            //check if name and surname are valid
            if (empty($fname) || empty($surname)) 
            {
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
            if (strlen($fname) > 100 || !preg_match("/^[a-zA-ZÀ-ÿ-' ]*$/u", $fname)) 
            {
                //some error response for invald name
                echo json_encode(new Response("error", time(), "invalid name"));
                exit();
            }
            if (strlen($surname) > 100 || !preg_match("/^[a-zA-ZÀ-ÿ-' ]*$/u", $surname)) 
            {
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

            if ($dobDateTime && $dobDateTime->format('Y-m-d') === $dob) 
            {
                if (!$dobDateTime || $dobDateTime->format('Y-m-d') !== $dob || $dobDateTime <= $minDate || $dobDateTime >= $currentDate)
                {
                    // some error message for invalid dob
                    echo json_encode(new Response("error", time(), "invalid dob"));
                    exit();
                }
            } 

            //check if gender is in [F, M, O, P]
            if (!preg_match('/^[FMOP]$/', $gender))
            {
                echo json_encode(new Response("error", time(), "gender not in F, M, O, P"));
                exit();
            }

            //check if phone number is all numbers and smaller than 16 digits
            if (strlen($phone) > 16 || !preg_match('/^\d+$/', $phone))
            {
                echo json_encode(new Response("error", time(), "phone number is not all digits"));
                exit();   
            }

            //check if email is valid
            $pattern = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
            if (!preg_match($pattern, $email)) 
            {
                echo json_encode(new Response("error", time(), "invalid email address"));
                exit();
            }

            //check if email is unique
            $sql = "SELECT COUNT(*) FROM user WHERE email = ?";
            $stmt = $this->con->prepare($sql);
            if (!$stmt) 
            {
                echo "Error: " . $this->con->error;
                return;
            }
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            $count = $result->fetch_assoc()['COUNT(*)'];
            if ($count > 0) 
            {
                echo json_encode(new Response("error", time(),"email already in use"));
                exit(); 
            }

            //check if password is valid
            if (!preg_match("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/", $password)) 
            {
                echo json_encode(new Response("error", time(), "invalid password"));
                exit();
            }
            $hashedPassword = hash('sha256', $password);

            //check if country_id in 0-259
            if (!is_numeric($country_id) || $country_id < 0 || $country_id > 259) 
            {
                echo json_encode(new Response("error", time(), "invalid country_id"));
                exit();
            }

            //check if card_no is shorter than 25 characters
            if (strlen($card_no) > 25 || !ctype_digit($card_no)) 
            {
                echo json_encode(new Response("error", time(), "invalid card_no"));
                exit();      
            }
                
            //insertUser
            $sql = "INSERT INTO user (fname, surname, dob, gender, phone, email, password, active, country_id) VALUES (?,?,?,?,?,?,?,true,?)";
            $stmt = $this->con->prepare($sql);
            if (!$stmt) 
            {
                echo "Error: " . $this->con->error;
                return;
            }
            $stmt->bind_param("sssssssi", $fname, $surname, $dob, $gender, $phone, $email, $hashedPassword, $country_id);
            $stmt->execute();

            // $data = [ "fname" => $fname, "surname" => $surname, "dob" => $dob, "gender" => $gender, "phone" => $phone, "email" => $email, "password" => $hashedPassword, "country_id" => $country_id, "card_no" => $card_no];  
            echo json_encode(new Response("success", time(), "user added to database"));

        }

        public function login()
        {
            
        }

        public function setUserPref()
        {

        }

        public function getAllTitles()
        {

        }

        public function search()
        {
            
        }

        public function getMovies()
        {

        }

        public function getSeries()
        {

        }
        
        public function getWatchHistory()
        {

        }

        public function getWatchList()
        {

        }

        public function setWatchHistory()
        {

        }

        public function setWatchList()
        {

        }

        public function getUser()
        {

        }

        public function updateUser()
        {

        }

        public function deleteUser()
        {

        }

        public function getUserPref()
        {

        }

        public function setViewPage()
        {

        }

        public function getReview()
        {

        }

        public function setReview()
        {

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
?>
