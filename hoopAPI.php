<?php
    echo "In Class!";
    session_start();

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
                    $this->getAllTitles($reqbody);
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

        public function getAllTitles($data)
        {
            // $email = $_SESSION['email']; //use id instead?  $id = $_SESSION['id']

            $sqlcheckpref = "SELECT * FROM user_preferences WHERE user_id='$id'";
            $result = $this->con->query($sqlcheckpref);
            $sqlReturnTitles = "SELECT * FROM title";

            if($result)
            {
                $pref = $result->fetch_assoc();
                $type = $pref["type"];
                $genre1 = $pref["genre_id_1"];
                $genre2 = $pref["genre_id_2"];
                $genre3 = $pref["genre_id_3"];

                //Assuming users set atleast one genre
                if($type!==null)
                    $sqlReturnTitles = $sqlReturnTitles. " WHERE type=". $type;
                if($genre1!=null)
                    $sqlReturnTitles = $sqlReturnTitles. " AND genre_id=". $genre1;
                if($genre2!=null)
                    $sqlReturnTitles = $sqlReturnTitles. " OR genre_id=". $genre2;
                if($genre3!=null)
                    $sqlReturnTitles = $sqlReturnTitles. " OR genre_id=". $genre3;
            }
            else
            {
                echo "No preferences set";
            }

            $result = $this->con->query($sqlReturnTitles);

            if($result)
            {
                $titlesToRet = array();

                //creating an associative array of what to return for each tuple returned from database

                while($title = $result->fetch_assoc()){

                    $genre_id = $title["genre_id"];
                    $sql1 = "SELECT genre from genre WHERE genre_id='$genre_id'";
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
                    $data['producer'] = (explode(', ', $title["crew"]))[0];
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

                    $titlesToRet[] = $data;
                }

                //creating JSON response
                echo json_encode(new Response("success", time(), $titlesToRet));

            }
            else{
                echo json_encode(new Response("success", time(), "Error occured"));
            }
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
