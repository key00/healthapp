<?php

// Connect to the MySQL database
include("../../includes/conn.php");

if (mysqli_connect_errno()) {
    die("Failed to connect to MySQL: " . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user = mysqli_real_escape_string($conn, $_GET['pat_name']);
    $query = "SELECT * FROM patients WHERE user = '$user'"; // AND token = '$token'";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) == 0) {
        $response = array('message' => 'No patient in database. Try to another name.');
    } else {
        $query = "SELECT * FROM patients WHERE user = '$user'";
        $result = mysqli_query($conn, $query);
        $patient = mysqli_fetch_assoc($result);

        $response = array('patient' => array($patient));
    }

    // Set the response header to JSON and echo the response
    header('Content-Type: application/json');
    echo json_encode($response);
}
// $query = "SELECT * FROM patients WHERE user = 'keyna'";
// $result = mysqli_query($conn, $query);
// $patient = mysqli_fetch_assoc($result);

// $response = array('patient' => array($patient));


// // Set the response header to JSON and echo the response
// header('Content-Type: application/json');
// echo json_encode($response);



// Close the MySQL connection
mysqli_close($conn);
