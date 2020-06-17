<?
class Database {

  // укажите свои учетные данные базы данных 
  private $host = "localhost";
  private $db_name = "glukstc1_ekrot";
  private $username = "root";
  private $password = "";
  public $conn;

  // получаем соединение с БД 
  public function getConnection(){

      $this->conn = null;

      try {
          $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
          $this->conn->exec("set names utf8");
      } catch(PDOException $exception){
          echo "Connection error: " . $exception->getMessage();
      }

      return $this->conn;
  }
}

$database = new Database();
$db = $database->getConnection();
$db->query('set session wait_timeout=28800');

?>

<?
/*
function connectDb() {
    
    global $openserver;
    
    if($openserver) {
    $dbInfo = [
    'host' => 'localhost',
    'name' => 'glukstc1_ekrot',
    'user' => 'root',
    'password' => '',
    'options' => array(
        \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    )
];
    } else {

        $dbInfo = [
            'host' => 'localhost',
            'name' => 'glukstc1_ekrot',
            'user' => 'glukstc1_ekrot',
            'password' => '3aF%Cb4c',
            'options' => array(
                \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
            )
        ];

    }

    if($_SERVER['HTTP_HOST'] == 'etalonocenki.com') {
        
        $dbInfo = [
            'host' => 'localhost',
            'name' => 'glukstc1_ocenka',
            'user' => 'glukstc1_ocenka',
            'password' => 'A%AvEQ0a',
            'options' => array(
                \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
            )
        ];
    }
    
   return new PDO('mysql:host=' . $dbInfo['host'] .';dbname=' . $dbInfo['name'] . '', $dbInfo['user'], $dbInfo['password'], $dbInfo['options']);

}
*/

?>