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

            if ($_SERVER["REQUEST_METHOD"] === "POST") {

                $reqbody = json_decode(file_get_contents('php://input'), true);

                $type = $reqbody["type"];

                if (!isset($type)) {
                    echo json_encode(new Response("Error", time(), "No type specified"));
                    return;
                }
    
                if ($type === "signUp") {
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
        

        public function signUp()
        {

        }

        public function login()
        {
            
        }

        public function setUserPref()
        {

        }

        public function getAllTitle()
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
