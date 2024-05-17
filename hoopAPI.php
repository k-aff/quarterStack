<?php
    echo "In Class!";

    class Hoop{
        protected $con;
        public static function instance() {
            static $instance = null; 
            if($instance === null)
                $instance = new Hoop();
            return $instance; 
        }

        private function __construct() {
            $con = new mysqli("wheatley.cs.up.ac.za","u23535793","XSJE56JRFVO4MIIHAMP4QGSUX7M32JED","u23535793_HOOP");
            if ($con->connect_error) {
                die("Connection failed: ".$con->connect_error);
            }
            else{
                $this->con = $con;
                echo "Connected!";
            }

            return $con;
        }

        public function __destruct() { 
            mysqli_close($this->con);
        }

        public function handleRequest(){

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


            }
            
        }
        

        public function signUp(){

        }

        public function login(){
            
        }
        public function getAllTitles()
        {

        }
        public function setUserPref()
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
