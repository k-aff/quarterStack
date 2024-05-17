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

            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body,true);
            // $hoop = Hoop::instance();
            
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $reqbody = json_decode(file_get_contents('php://input'), true);
                $type = $reqbody["type"];
                if (!isset($type)) {
                    echo "Error: No Type";
                    return;
                }
    
                if ($type === "SignUp") {
                    $this->signUp();
                }
                if($type==="Login") 
                {
                    $this->login();
                }
                if($type==="GetAllTitles") 
                {
                    $this->getTitles();
                }


            }
            
        }
        

        public function signUp(){

        }

        public function login(){
            
        }
        public function getTitles()
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
