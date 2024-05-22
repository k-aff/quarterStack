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

            if (!isset($type)) {
                echo json_encode(new Response("Error", time(), "No type specified"));
                return;
            }

            // if ($type === "signUp") {
            //     $this->signUp($reqbody);
            // }
            else if ($type === "login") {
                $this->login($reqbody);
            }
            // else if($type==="getAllTitles") 
            // {
            //     $this->getAllTitles($reqbody);
            // }
            // else if($type==="search") 
            // {
            //     $this->search($reqbody);
            // }
            // else if($type==="getMovies") 
            // {
            //     $this->getMovies($reqbody);
            // }
            // else if($type==="getSeries") 
            // {
            //     $this->getSeries($reqbody);
            // }
            else if ($type === "setWatchList") {
                $this->setWatchList($reqbody);
            } else if ($type === "getWatchList") {
                $this->setWatchList($reqbody);
            } else if ($type === "getWatchHistory") {
                $this->getWatchHistory($reqbody);
            }
            // else if($type==="getWatchList") 
            // {
            //     $this->getWatchList($reqbody);
            // }
            else if ($type === "setWatchHistory") {
                $this->setWatchHistory($reqbody);
            }
            // else if($type==="getUser") 
            // {
            //     $this->getUser($reqbody);
            // }
            // else if($type==="updateUser") 
            // {
            //     $this->updateUser($reqbody);
            // }
            // else if($type==="updatePassword") 
            // {
            //     $this->updatePassword($reqbody);
            // }
            // else if($type==="deleteUser") 
            // {
            //     $this->deleteUser($reqbody);
            // }
            // else if($type==="getUserPref") 
            // {
            //     $this->getUserPref($reqbody);
            // }
            // else if($type==="setUserPref") 
            // {
            //     $this->setUserPref($reqbody);
            // }
            // else if($type==="setViewPage") 
            // {
            //     $this->setViewPage($reqbody);
            // }
            // else if($type==="getReview") 
            // {
            //     $this->getReview($reqbody);
            // }
            // else if($type==="setReview") 
            // {
            //     $this->setReview($reqbody);
            // }
            // else if($type==="logout") 
            // {
            //     $this->logout($reqbody);
            // }

        }
    }


    public function login($request_body) //by retha
    {
        print_r($request_body);
        $email = $request_body["email"];
        $password = $request_body["password"];
        //hash password
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

            //verify the password if email exsists
            // if (password_verify($password, $user['password'])) {
            if ($password === "varchar") {

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
                    "user_id" => null
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
