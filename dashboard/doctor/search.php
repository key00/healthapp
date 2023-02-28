<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Connect to the MySQL database
include("../../includes/conn.php");

if (mysqli_connect_errno()) {
    die("Failed to connect to MySQL: " . mysqli_connect_error());
}

$query = "select Name from patients";
$result = mysqli_query($conn, $query);

// Create dropdown options
$options = "";

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $options .= "<option value='" . $row["Name"] . "'>" . $row["Name"] . "</option>";
    }
}

// Close database connection
mysqli_close($conn);

// Return dropdown options
echo $options;
