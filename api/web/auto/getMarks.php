<? 
//header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config/core.php'; 


        $stmt = $db->query("SELECT 
        A_MARK.id id, 
        A_MARK.title title, 
        A_MARK.priority A_MARK_PRIORITY 
        FROM 
        auto_mark A_MARK 
        ORDER BY A_MARK_PRIORITY ASC 
        " );
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
/*
echo json_encode([
  'v' => '333',
  'request' => 'reewrw' 
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
*/

