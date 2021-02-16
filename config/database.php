<?php

class Database{
     public function getConnection() {
          // $serverName = "<server name>";
          // $connectionInfo = array( "Database"=>"<db|catalog name>");
          $this->conn = null;

          try {
               // $this->conn = sqlsrv_connect( $serverName, $connectionInfo);
               $this->conn =new mysqli('localhost', 'josh', 'josh', 'test_db');
          }

          catch (Exception $e) {
               echo 'Caught exception: ',  $e->getMessage(), "\n";
               echo "Unable to connect.\n";  
               throw new RuntimeException('mysqli connection error: ' . $mysqli->connect_error);
               die();
          }
          
          return $this->conn;
     }
}
?>