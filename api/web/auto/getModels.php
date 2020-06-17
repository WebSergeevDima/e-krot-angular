<? 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config/core.php';
$postJson = postJson();

$id = $postJson['id'];


/*
echo json_encode([
  'v' => $postJson['id'] ?? '(' 
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
*/


        $A_MARK_ID = $_POST['id']; 

        $stmt = $db->query("SELECT 
        A_MODEL.id id, 
        A_MODEL.title title, 
        A_MODEL.auto_mark_id mark_id, 
        A_MODEL.priority A_MODEL_PRIORITY 
        FROM 
        auto_model A_MODEL 
        WHERE A_MODEL.auto_mark_id = $id 
        ORDER BY A_MODEL_PRIORITY ASC 
        " );
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);       
  
  
$json = array(
    'html' => $result
    );

echo json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
