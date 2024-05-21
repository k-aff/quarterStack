<?php
    echo "In Class!";

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
            echo "In handleRequest class"; 

            if ($_SERVER["REQUEST_METHOD"] === "POST") 
            {
                $reqbody = json_decode(file_get_contents('php://input'), true);
                $type = $reqbody["type"];
                if (!isset($type)) {
                    echo "Error: No Type";
                    return;
                }
    
                if ($type === "signUp") {
                    $this->signUp();
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
            echo "In signUp function"; 
            //get all json data
            //get name and surname 
            $fname = $jsonData["name"];
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
                errorResponse("empty name or surname");
                exit();
            }
            $fname = trim($fname);
            $surname = trim($surname);
            $fname = stripslashes($fname);
            $surname = stripslashes($surname);
            $fname = htmlspecialchars($fname);
            $surname = htmlspecialchars($surname);
            if (strlen($fname) > 100 || !preg_match("/^[a-zA-Z-' ]*$/", $fname)) 
            {
                //some error response for invald name
                errorResponse("invalid name");
                exit();
            }
            if (strlen($surname) > 100 || !preg_match("/^[a-zA-Z-' ]*$/", $surname)) 
            {
                //some error response for invald surname
                errorResponse("imvalid surname");
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
                    errorResponse("invalid dob");
                    exit();
                }
            } 

            //check if gender is in [F, M, O, P]
            if (!preg_match('/^[FMOP]$/', $gender))
            {
                errorResponse("gender not in F, M, O, P");
                exit();
            }

            //check if phone number is all numbers and smaller than 16 digits
            if (strlen($phone) > 16 || !preg_match('/^\d+$/', $phone))
            {
                errorResponse("phone number is not all digits");
                exit();   
            }

            //check if email is valid
            $pattern = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
            if (!preg_match($pattern, $email)) 
            {
                errorResponse("invalid email address");
                exit();
            }

            //check if email is unique

            //check if password is valid
            if (!preg_match("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/", $password)) 
            {
                errorResponse("invalid password");
                exit();
            }
            $hashedPassword = hash('sha256', $password);

            //check if country_id in 0-259
            if (!is_numeric($country_id) || $country_id < 0 || $country_id > 259) 
            {
                errorResponse("invalid country_id");
                exit();
            }

            //check if card_no is shorter than 25 characters
            if (strlen($card_no) > 25 || !ctype_digit($card_no)) 
            {
                errorResponse("invalid card_no");
                exit();      
            }
                
            //insertUser($fname, $surname, $email, $hashedPassword, $api_key);
                
            $response = [ "status" => "success",
                          "timestamp" => round(microtime(true) * 1000),
                          "data" => [ "fname" => $fname, 
                                      "surname" => $surname,
                                      "dob" => $dob, 
                                      "gender" => $gender, 
                                      "phone" => $phone, 
                                      "email" => $email, 
                                      "password" => $hashedPassword,
                                      "country_id" => $country_id,
                                      "card_no" => $card_no] ];
            $jsonResponse = json_encode($response, JSON_PRETTY_PRINT);
            echo $jsonResponse;
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

class Response{

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
