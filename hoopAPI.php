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
                //echo "Connected!";
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
                if ($type==="getUserPref")
                {
                    $this->getUserPref();
                }
                if ($type==="setReview")
                {
                    $this->setReview();
                }
                if ($type==="getReview")
                {
                    $this->getReview();
                }
                if ($type==="getMovies")
                {
                    $this->getMovies();
                }
                if ($type==="getSeries")
                {
                    $this->getSeries();
                }


            }
            
        }
        

        public function signUp()
        {

        }

        public function login()
        {
            
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
            echo json_encode(new Response("success", time(), "Review not added "));
        }

        
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

        public function getAllTitles()
        {

        }

        public function search()
        {
            
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
            
        }
        public function getReview()
        {
            $hoop = Hoop::instance();
            $reqbody = json_decode(file_get_contents('php://input'), true);
            $email = $reqbody["email"];
            $id = $hoop->getUserIdByEmail($email);
            $sqlcheckpref = "SELECT * FROM review WHERE user_id='$id'";
            $result = $this->con->query($sqlcheckpref);
            if ($result && $result->num_rows > 0) 
            {
                $pref = $result->fetch_assoc();
                $user_rev = array(
                    "date" => $pref["date_time"],
                    "review" => $pref["review"],
                    "rating" => $pref["rating"],
                    "title_id" => $pref["title_id"]
                );
                echo json_encode(new Response("success", time(), $user_rev));
            }
        }
        
        public function getMovies()
        {
            $hoop = Hoop::instance();
            $sql = "SELECT * FROM movie INNER JOIN title ON movie.title_id = title.title_id";
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

        public function getSeries()
        {
            $hoop = Hoop::instance();
            $sql = "SELECT * FROM tv_series INNER JOIN title ON tv_series.title_id = title.title_id";
            $result = $this->con->query($sql);

            if ($result && $result->num_rows > 0) {
                $series = array();
                while ($row = $result->fetch_assoc()) {
                    $series[] = $row;
                }
                echo json_encode(new Response("success", time(), $series));
            } else {
                echo json_encode(new Response("failure", time(), "no TV series found"));
            }
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
