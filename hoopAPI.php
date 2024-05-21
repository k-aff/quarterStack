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
                else if ($type === "signUp") {
                    $this->signUp();
                }
                else if($type==="login") 
                {
                    $this->login();
                }
                else if($type==="getAllTitles") 
                {
                    $this->getAllTitles($reqbody);
                }
                else if($type==="search") 
                {
                    $this->search($reqbody);
                }
                else if($type==="setViewPage") 
                {
                    $this->setViewPage($reqbody);
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
                        // $data['type'] = $title["type"];
                        // $data['age_cert'] = $title["age_cert"];
                        // $data['plot'] = $title["plot_summary"];
                        // $data['languages'] = (explode(', ', $title["language"]))[0];
                        // $data['release date'] = $title["release_date"];
                        // $data['genre'] = $carousel;
                        // $data['directors'] = (explode(', ', $title["crew"]))[0]; //Add more?
                        // $data['cast'] = $title["cast"];
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
                    $returnObject[$carousel] = $titlesToRet;

                }
                else{
                    echo json_encode(new Response("failed", time(), "Error occured"));
                }
            }
            echo json_encode(new Response("success", time(), $returnObject));
        }

        public function search()
        {
            
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
