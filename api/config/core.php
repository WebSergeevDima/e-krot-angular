<? 
session_start();
$root = $_SERVER['DOCUMENT_ROOT'];
$root_administrator = '/administration/panel';
$uri = $_SERVER["REQUEST_URI"];
$url_login = "/administration/panel/login";
$http = 'https://';

$domen = $_SERVER['SERVER_NAME'];
$http_domen = $http . $domen;

$openserver = true;
//$openserver = false;

include_once   __DIR__ . '/database.php';

$model = [];


$model['breadcrumbs']['child'] = ["" => 'Главная'];   
$model['breadcrumbs']['last'] = ''; 

$model['seo']['title'] = 'Электронный крот';
$model['seo']['description'] = 'Удобный и быстрый инструмент оценки автомобиля';
$model['seo']['keywords'] = 'Автомобиль, оценка, стоимость';

$model['city'] = [
    'BY' => 'Беларусь',
    'RU_MO' => 'Россия (Москва)',
    'RU_SPB' => 'Россия (СПб)',
    'RU_SMO' => 'Россия (Смоленск)'
];







$ini = new Ini();

class Ini {
    
    public $db;
    public $user_role;
    public $user_id;
    
    public function __construct() {
        $this->connectDb();
        $this->definitionRole();
      
    }
 
    public function connectDb(){
         global $db;
         $this->db = $db;
        
    }
 
    public function definitionRole() {
         
        if(isset($_SESSION['user_id'])) {
            $this->user_id = $_SESSION['user_id']; 
        }
         
        $user_select = "
            SELECT
            USERS_PRIVILEGE.PRIVILEGE_NAME PRIVILEGE_NAME, 
            USERS.id USERS_ID, 
            USERS.name USERS_NAME, 
            USERS.login USERS_LOGIN, 
            USERS.surname USERS_SURNAME, 
            USERS.function USERS_FUNCTION, 
            USERS.image_avatar USERS_IMAGE_AVATAR 
            FROM
            users USERS,
            users_roles USERS_ROLES,
            users_privilege USERS_PRIVILEGE
            WHERE
            USERS.id = $this->user_id
            AND
            USERS_ROLES.role_id = USERS.role
            AND
            USERS_ROLES.privilege = USERS_PRIVILEGE.id
            ";

            $query_user_select = $this->db->query($user_select);
            

            if($query_user_select) {

                $db_query_user_select = $query_user_select->fetchAll(PDO::FETCH_ASSOC);

                global $model;
               
                foreach($db_query_user_select as $user) {
                   $this->user_role[$user['PRIVILEGE_NAME']] = true;
                    $model['user'] = $user;  
                }

            }
         
     }
    public function verificationRole($privilege) {
           return isset($this->user_role[$privilege]);
       }
}





function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);
    
    return $value;
}
function check_length($value = "", $min, $max) {
    $result = (mb_strlen($value) < $min || mb_strlen($value) > $max);
    return !$result;
}



$fuelArr = [
    1 => 'бензин',
    2 => 'дизель',
    3 => 'электро',
    4 => 'гибрид',
];

$rateArr = [
    1 => 'USD',
    2 => 'RUB',
    3 => 'EUR',
    4 => 'BYN',
    5 => 'UAH'
];

$cityArr = [
    1 => 'BY',
    2 => 'RU_MO',
    3 => 'RU_SPB',
    4 => 'RU_SMO'
];

$bodyTypeArr = [
    'внедорожник 3',
    'внедорожник 5',
    'кабриолет',
    'купе',
    'легковой фургон',
    'лимузин',
    'лифтбек',
    'микроавтобус',
    'минивэн',
    'пикап',
    'родстер',
    'седан',
    'универсал',
    'хетчбэк 3',
    'хетчбэк 5',
    'другой',
    'кроссовер 3',
    'кроссовер 5',
];

$stmt = $db->query("SELECT 
AP.id AP_ID, 
AP.name AP_NAME, 
AP.name_key AP_NAME_KEY, 
AP.type AP_TYPE 
FROM 
auto_parameter AP 
");
$model['auto-parameter'] = $stmt->fetchAll(\PDO::FETCH_ASSOC);



function postJson() {

    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);
    return $json_obj;
    
}



function getGUID($count = false) {
	
    if($count) {

        $arr = array_merge( range('a','z'), range('A','Z'), range('0','9') );
        $arr = array_flip($arr);
		
		$uid = '';

        for($i = 0; $i < $count; $i++){
            $uid .= array_rand($arr, 1);
        }

        return $uid;

    } 
	
    return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
   
}



?>
