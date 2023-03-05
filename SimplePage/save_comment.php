<?php

$requestPayload = file_get_contents("php://input");
$payload = json_decode($requestPayload);

if ($payload->comment != null && $payload->date != null) {
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
  
  // Insert data
  $sql = "INSERT INTO comment VALUES ('" . $payload->comment . "', '" .$payload->date. "')";
  
  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
}
else {
  echo "Error al salvar comentario";
}

?>