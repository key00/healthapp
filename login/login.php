<?php
include("../includes/conn.php");
$username = $_GET['user'];
$password = $_GET['pass'];

// Connect to database


// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if username and password match a user in the database
$sql = "SELECT * FROM patients WHERE user='$username' AND pass='$password'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // Generate token and return it to client
    $token = bin2hex(openssl_random_pseudo_bytes(16));
    echo json_encode(array("token" => $token));
} else {
    // Return error message to client
    echo json_encode(array("error" => "Invalid username or password"));
}

mysqli_close($conn);

?>



