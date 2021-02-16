<?php
class TestTable{

	private $conn;
	private $table_name = "test_table";

	public $boolCol;
	public $dateCol;

	public function __construct($db) {
		$database = new Database();
		$db = $database->getConnection();
		$this->conn = $db;
	}

	function read() {
		$query = "SELECT id, boolCol, dateCol
					FROM " . $this->table_name . " ORDER BY id";
		$stmt = mysqli_query($this->conn, $query);
		return $stmt;
	}

    public function count() {
		$database = new Database();
		$db = $database->getConnection();
		$query = "SELECT COUNT(*) as 'total_rows' FROM " . $this->table_name . "";

		$stmt = mysqli_query($db, $query);
		$row = mysqli_fetch_assoc($stmt);

		return $row['total_rows'];
		
	}
}
?>