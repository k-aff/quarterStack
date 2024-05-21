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

        // if ($_SERVER["REQUEST_METHOD"] == "POST") {
        //     $type ==   
        // }
    }

    public function signUp()
    {
    }

    public function login(
        $request_body
    ) {
        $email = $request_body["email"];
        $password = $request_body["password"];

        $loginQuery = "SELECT user_id FROM User
        WHERE email = ?";

        $statement = $this->con->prepare($loginQuery);
        $statement->execute([$email]);
        $user = $statement->fetch();


        if ($user === false) {
            // User not found
            $data = [
                "message" => "User not found",
                "user_id" => null
            ];
            return json_encode(new Response("Error", time(), $data));
        } else {
            if (password_verify($password, $user['password'])) {


                $data = [
                    "message" => "User logged in",
                    "user_id" => $user['user_id']
                ];

                //update status to true
                $update = "UPDATE User SET active = ? WHERE user_id = ?";
                $statement = $this->con->prepare($update);
                $statement->execute([1, $user]);
                //unset
                session_start();
                $_SESSION["user_id"];



                return json_encode(new Response("Error", time(), $data));
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
    public function setWatchHistory(
        $request_body
    ) {

        $title_id = $request_body["title_id"];
        $user_id = $request_body["user_id"];

        $historyQuery = "SELECT title_id FROM watch_history
        WHERE user_id = $user_id";

        $statement = $this->con->prepare($historyQuery);
        $statement->execute();
        $hist_id = $statement->fetch();

        if ($hist_id === false) {
            // User not found
            return json_encode([
                "status" => "Error",
                "timestamp" => time(),
                "message" => "Title already entered",
            ]);
        } else {
            $stmt = $this->con->prepare("INSERT INTO watch_history (title_id,user_id) VALUES (?,?)");
            if ($stmt === false) {
                die("Prepare failed: " . $this->con->error);
            }

            $stmt->bind_param("ss", $title_id, $user_id);

            // Execute the statement
            if ($stmt->execute() === false) {
                die("Execute failed: " . $stmt->error);
            } else {
                echo "Watch History inserted successfully.";
            }
        }
    }

    public function getWatchHistory(
        $request_body
    ) {
        $user_id = $request_body["user_id"];
        $histQuery = "SELECT title_id FROM watch_history
        WHERE user_id = $user_id";
    }
}
$hoop = Hoop::instance();

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
