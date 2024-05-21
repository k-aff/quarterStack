<?php
    //echo "In Class!";

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
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
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
                if ($type==="setUserPref")
                {
                    $this->setUserPref();
                }


            }
            
        }
        

        public function signUp()
        {

        }

        public function login()
        {
            
        }

        public function setUserPref()
    {
        $hoop = Hoop::instance();
        $reqbody = json_decode(file_get_contents('php://input'), true);

        $email = $reqbody["email"];
        $user_id = $hoop->getUserIdByEmail($email);

        if (!$user_id) {
            echo "Error: User not found";
            return;
        }

        $type = $reqbody["titleType"] ?? null;
        $genre1 = $reqbody["genre1"] ?? null;
        $genre2 = $reqbody["genre2"] ?? null;
        $genre3 = $reqbody["genre3"] ?? null;

        $stmt = $hoop->con->prepare("INSERT INTO user_preference (user_id, type, genre_id_1, genre_id_2, genre_id_3) VALUES (?, ?, ?, ?,?)");
        $stmt->bind_param("issss",$user_id, $type, $genre1, $genre2,$genre3);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo "Preferences added successfully";
        } else {
            echo "Error: Preferences not added";
        }
        echo $genre3;
        
    }

    private function getUserIdByEmail($email)
    {
        $stmt = $this->con->prepare("SELECT user_id FROM user WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0 ? $result->fetch_assoc()["user_id"] : null;
    }

        public function getAllTitles()
        {

        }

        public function search()
        {
            
        }
        

        
    }

    $hoop = Hoop::instance();
    $hoop->handleRequest();

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
