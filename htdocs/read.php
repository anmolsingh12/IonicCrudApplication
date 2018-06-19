<?php
header('Access-Control-Allow-Origin: *');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "UserDetails";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}  

$sql = "SELECT * FROM users";

$result = mysqli_query($conn, $sql); 

if ( mysqli_num_rows($result) > 0) {
    // output data of each row

    $data = array();

    while ($row = mysqli_fetch_all($result,MYSQLI_ASSOC)) {
        echo json_encode($row);
    }
    return json_encode($row);
} else {
    json_encode("0 results");
}

mysqli_close($conn);
?>