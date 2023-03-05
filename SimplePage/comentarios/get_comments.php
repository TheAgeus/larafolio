<?php

$servername = "localhost";
$username = "root";
$password = "root";
$database = "comments";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  echo("Connection failed: " . $conn->connect_error);
}

// Get data
$sql = "SELECT * FROM comment";
$result = $conn->query($sql);
$resultArray = array();

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    array_push($resultArray, $row);
  }
  echo json_encode($resultArray, 128);
  
} else {
  echo "0 results";
}

$conn->close();

?>