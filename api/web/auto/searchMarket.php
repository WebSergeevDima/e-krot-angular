<? 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");

require_once $_SERVER['DOCUMENT_ROOT'] . '/api/config/core.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/api/shared/utilities.php';
$postJson = postJson();
$utilities = new Utilities();



//################################ USER SEARCH
$time_start = microtime(true);
$middleCarPrice = '';
$html = '';

$user_id = $_SESSION['user_id'] ?? null;

$allFactors = 0;
$cars = [];
$carsPriceArr = [];
$query = [];
$query_debug = '';
$priceAvg = 0;

$log = date('Y-m-d H:i:s');

$rate = $_POST['rate'] ?? 1;

if($rate >= 1 && $rate <= 5) {
    $rate = $_POST['rate'] ?? 1;
} else {
    $rate = 1;
}

if(!isset($_POST['city'])) {
  $city = 1;
}

if($city >= 1 && $rate <= 5) {
    $city = $_POST['city'] ?? 1;
} else {
    $city = 1;
}

$lang = $cityArr[$city];




if(!empty($lang)) {  
    foreach($model['auto-parameter'] as $itemParameter) {   

        if($itemParameter['AP_TYPE'] == 'lang') {       

            if(strpos($itemParameter['AP_NAME'], $lang) !== false) {
                
                $parameterLangKey = $itemParameter['AP_NAME_KEY'];
                break;

            }
            
        }
    }
}
           


$userCarMark = $postJson['mark'] ?? 25;
$userCarModel = $postJson['model'] ?? 206;
$userCarYear = $postJson['year'] ?? 2008;

$error = [];
if(empty($userCarMark)) {
    $error[] = 'mark';
}
if(empty($userCarModel)) {
    $error[] = 'model';
}

if(empty($userCarYear)) {
    $error[] = 'year';
}

    if(empty($error)) {
    
    $query['query_year'] = $userCarYear ?? '';
    $query['query_id_mark'] = $userCarMark ?? '';
    $query['query_id_model'] = $userCarModel ?? '';
    
    $userCarYearMax = $userCarYear + 1;
    $userCarYearMin = $userCarYear - 1;
    

    //Все факторы
    $stmt = $db->query("SELECT 
            AF.id AF_ID, 
            AF.title AF_TITLE, 
            AF.count AF_COUNT, 
            AF.unit AF_UNIT, 
            AF.name AF_NAME 
            FROM 
            auto_factor AF ");
            $allFactors = $stmt->fetchAll(\PDO::FETCH_ASSOC); 
    
    $factors = [];
    foreach($allFactors as $item) {
        $factors[$item['AF_NAME']] = $item['AF_COUNT'];
    }
    
    
    $factorMillage = $factors['millage'] / 100;
    $factorMillageVal = 10000;
    $factorYear = $factors['year'] / 100;
    $factorFuel = $factors['fuel'] / 100;
    $factorValume = $factors['valume'] / 100;
    $factorTransmission = $factors['transmission'] / 100;
    $factorGear = $factors['gear'] / 100;
    $factorAvgMarket = 1 - (20 / 100);
    $factorEquipment = $factors['equipment'] / 100;
    $factorShape = $factors['shape'] / 100;
    $factorGeneration = $factors['generation'] / 100;
    $factorRestyling = $factors['restyling'] / 100;
    $factorBargain = $factors['bargain'] / 100;

    
    $dateOldCar = new DateTime();
    $dateOldCar->modify('-6 month');
    $dateOld = $dateOldCar->format('Y-m-d H:i:s');
    
    
    
    //Выбираем все машины ИЗ АРХИВА под запрос пользователя
    $stmt = $db->query("SELECT 
    AD.id AD_ID, 
    AD.mark_id AD_MARK_ID, 
    AD.model_id AD_MODEL_ID, 
    AD.url AD_URL, 
    AD.price AD_PRICE, 
    AD.year AD_YEAR, 
    AD.millage AD_MILLAGE, 
    AD.fuel AD_FUEL, 
    AD.valume AD_VALUME, 
    AD.transmission AD_TRANSMISSION, 
    AD.gear AD_GEAR, 
    AD.body_type AD_BODY_TYPE, 
    AD.lang AD_LANG, 
    AD.date_update AD_DATE_UPDATE 
    FROM 
    auto_data_old AD 
    WHERE 
    AD.mark_id = $userCarMark 
    AND 
    AD.model_id = $userCarModel 
    AND 
    AD.year < $userCarYearMax 
    AND 
    AD.year > $userCarYearMin 
    AND 
    AD.date_update >= '$dateOld' 
    AND 
    AD.lang = $parameterLangKey 
    ORDER BY AD.price ASC 
    ");
    $allCarsOld = $stmt->fetchAll(\PDO::FETCH_ASSOC); 

    
    //Выбираем все машины под запрос польщователя

    $stmt = $db->query("SELECT 
    AD.id AD_ID, 
    AD.mark_id AD_MARK_ID, 
    AD.model_id AD_MODEL_ID, 
    AD.url AD_URL, 
    AD.price AD_PRICE, 
    AD.year AD_YEAR, 
    AD.millage AD_MILLAGE, 
    AD.fuel AD_FUEL, 
    AD.valume AD_VALUME, 
    AD.transmission AD_TRANSMISSION, 
    AD.gear AD_GEAR, 
    AD.body_type AD_BODY_TYPE, 
    AD.lang AD_LANG, 
    AD.date_update AD_DATE_UPDATE 
    FROM 
    auto_data AD 
    WHERE 
    AD.mark_id = $userCarMark 
    AND 
    AD.model_id = $userCarModel 
    AND 
    AD.year < $userCarYearMax 
    AND 
    AD.year > $userCarYearMin 
    AND 
    AD.lang = $parameterLangKey 
    ORDER BY AD.price ASC 
    ");
    $allCars = $stmt->fetchAll(\PDO::FETCH_ASSOC); 




            
            if(count($allCars) < 2) { // Если в базе нет машин то сообщаем пользователю об этом
                
                $html = '<div class="error-input-block">К сожалению, оценка не может быть выполнена. Возможно, автомобиль имеет уникальные для выбранного региона характеристики, либо параметры внесены некорректно.</div>';
                
             
                echo json_encode([                 
                  'data' => $html,               
                  'xxx' => '1',
                'result' => '',
                'error' => $error, 
                'error-count' => true,
                  'v' => $postJson ?? '(' 
                ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                
            
                die;
            }
            
            //Среднее значение
            $middleCarCount = floor(count($allCars) / 2);
            $middleCar = $allCars[$middleCarCount];
          
            $middleCarPrice = round($middleCar['AD_PRICE']);
            $query['query_price_ascending'] = $middleCarPrice;
            $carsPriceMax = round($middleCarPrice * 1.5);
            $carsPriceMin = round($middleCarPrice * 0.5);
            
           
            $stmt = $db->query("SELECT 
            A_MARK.id A_MARK_ID, 
            A_MARK.title A_MARK_TITLE, 
            A_MODEL.id A_MODEL_ID, 
            A_MODEL.auto_mark_id A_MODEL_AUTO_MARK_ID, 
            A_MODEL.title A_MODEL_TITLE, 
            A_MODEL.additionally_factor A_MODEL_ADDITIONALLY_FACTOR, 
            A_MODEL.additionally_factor_years A_MODEL_ADDITIONALLY_FACTOR_YEARS 
            FROM 
            auto_mark A_MARK 
            INNER JOIN 
            auto_model A_MODEL 
            ON 
            A_MODEL.auto_mark_id = A_MARK.id 
            WHERE 
            A_MODEL.auto_mark_id = $userCarMark 
            AND 
            A_MODEL.id = $userCarModel ");
            $queryCar = $stmt->fetch(\PDO::FETCH_ASSOC); 
            
            $query['query_title_mark'] = $queryCar['A_MARK_TITLE'] ?? '';
            $query['query_title_model'] = $queryCar['A_MODEL_TITLE'] ?? '';
            
            
            //Дополнительные факторы для определённых моделей определённых лет
            $additionally_factor = $queryCar['A_MODEL_ADDITIONALLY_FACTOR'];
            $additionally_factor_years = explode(',', str_replace(' ', '', $queryCar['A_MODEL_ADDITIONALLY_FACTOR_YEARS']));
            
            $rAdditionallyFactor = 1;
            
            if(!empty($queryCar['A_MODEL_ADDITIONALLY_FACTOR']) && !empty($queryCar['A_MODEL_ADDITIONALLY_FACTOR_YEARS'])) {
               
                foreach($additionally_factor_years as $itemFY) {
                    
                    if($userCarYear == $itemFY) {
                
                        if($additionally_factor > 0) {
                            
                           $rAdditionallyFactor = 1 + ($additionally_factor / 100);
                           
                        } else {
                            
                           $rAdditionallyFactor = 1 - abs(($additionally_factor / 100));
                           
                        }
                    
                    }
                    
                }
            
            }
            
            
            //Фильтруем от очень маленьких и больших цен
            $stmt = $db->query("SELECT 
            AD.id AD_ID, 
            AD.mark_id AD_MARK_ID, 
            AD.model_id AD_MODEL_ID, 
            AD.url AD_URL, 
            AD.price AD_PRICE, 
            AD.year AD_YEAR, 
            AD.millage AD_MILLAGE, 
            AD.fuel AD_FUEL, 
            AD.valume AD_VALUME, 
            AD.transmission AD_TRANSMISSION, 
            AD.gear AD_GEAR, 
            AD.body_type AD_BODY_TYPE, 
            AD.lang AD_LANG, 
            AD.date_update AD_DATE_UPDATE 
            FROM 
            auto_data AD 
            WHERE 
            AD.mark_id = $userCarMark 
            AND 
            AD.model_id = $userCarModel 
            AND 
            AD.year < $userCarYearMax 
            AND 
            AD.year > $userCarYearMin 
            AND 
            AD.price < $carsPriceMax 
            AND 
            AD.price > $carsPriceMin 
            AND 
            AD.lang = $parameterLangKey 
            ORDER BY AD.price ASC 
            ");
            $allCars = $stmt->fetchAll(\PDO::FETCH_ASSOC); 
            
            //Второй такой блок
            
            if(count($allCars) < 2) { // Если в базе нет машин то сообщаем пользователю об этом
                
                $html = '<div class="error-input-block">К сожалению, оценка не может быть выполнена. Возможно, автомобиль имеет уникальные для выбранного региона характеристики, либо параметры внесены некорректно.</div>';

                echo json_encode([                 
                  'data' => $html,
                  'result' => '',
                  'error' => $error, 
                  'error-count' => true,
                    'v' => $postJson ?? '(' 
                  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
         
                die;
            }
            
    $carsBasePriceArr = [];
    $carsMillageArr = [];
    $counter = 0;
    $allCarsClear = $allCars;
    

    
    foreach($allCars as $carItem) {
        $carsBasePriceArr[] = $carItem['AD_PRICE'];
        $carsMillageArr[] = $carItem['AD_MILLAGE'];
        
    
            
            //Года    
            $rYear = abs($userCarYear - $carItem['AD_YEAR']) * $factorYear;
            
            if($userCarYear > $carItem['AD_YEAR']) {
               $rYear = 1 + $rYear;
            } else {
               $rYear = 1 - $rYear;
            }
            
           
          $priceWithFactors = $carItem['AD_PRICE'] + ($carItem['AD_PRICE'] * ($rYear -1));
            
            
            
           $cars[$counter]['AD_ID'] = $carItem['AD_ID'];
           $cars[$counter]['AD_PRICE'] = $priceWithFactors;
           
           $carsPriceArr[] = $priceWithFactors;
            
            $classGray = '';
            if($priceWithFactors < $carsPriceMin || $priceWithFactors > $carsPriceMax) {
                 $classGray = 'query_color-gray';
                 unset($allCarsClear[$counter]);
                 array_pop($carsMillageArr);
            }
            
            $counter++; 
    }   
    
            $summPrice = 0;
            $counter = 0;
            
            foreach($carsPriceArr as $priceItem) {
                
                if($priceItem >= $carsPriceMin && $priceItem <= $carsPriceMax) {
                    $summPrice += $priceItem;
                    $counter++;
                }
                
            }
            
            $query['query_quantity'] = $counter ?? '';
            
         
            //Итоговая цена машины с учетом всех параметров + дополнительное оборудование
            $carPrice = $summPrice / $counter;
    
        


       
       $price = $utilities->converterPriceUsd($carPrice);
            
    
                $result = true;
               
       
            //Вычисляем среднюю цену по возрастанию после фильтрации
            $allCarsClearArr = [];
            
            foreach($allCarsClear as $item) {
                array_push($allCarsClearArr, $item['AD_PRICE']);
            }
            
            sort($allCarsClearArr);
            
            $middleCarCount = floor(count($allCarsClearArr) / 2);
            $middleCarPrice = round($allCarsClearArr[$middleCarCount]);
            $query['query_price_ascending'] = $middleCarPrice;  
            
            $priceAvg = round(array_sum($allCarsClearArr) / count($allCarsClearArr));
           
                        
           $query['query_price'] = $carPrice ?? '';
           $query['query_price_avg'] = $priceAvg ?? '';
           $query['query_price_min'] = $carsPriceMin ?? '';
           $query['query_price_max'] = $carsPriceMax ?? '';
        
               
               $query_title_mark = $query['query_title_mark'];
               $query_title_model = $query['query_title_model'];
               $query_id_mark = $query['query_id_mark'];
               $query_id_model = $query['query_id_model'];
               $query_year = $query['query_year'];
               $query_price = $query['query_price'];
               $query_price_ascending = $query['query_price_ascending'];
               $query_price_avg = $query['query_price_avg'];
               $query_price_min = round(min($carsBasePriceArr));
               $query_price_max = round(max($carsBasePriceArr));
               $query_quantity = $query['query_quantity'];
               $query_quantity_all = count($allCars);
                $time_end = microtime(true);
                $time_request = $time_end - $time_start;
               
               
                $differencePriceAndMiddle = round(100 - ($query_price * 100 / $query_price_avg), 1); //Процент расхождения цены от среднерыночной цены
               
               
                $query_millage_avg = round(array_sum($carsMillageArr)/count($carsMillageArr)); // Среднее значение миль
               
               
               
               //Список проданных машин

            $oldCars = [];

            foreach($allCarsOld as $carOld) {   

                $oldCars[] = [
                  "year" => $carOld["AD_YEAR"],
                  "millage" => $carOld['AD_MILLAGE'],
                  "price" => $utilities->converterPriceUsd($carOld['AD_PRICE'])[$rateArr[1]]
                ];

            }
            $htmlCarsOld = json_encode($oldCars);
               
                $query_old_quantity = count($allCarsOld);
                $query_old_list = $htmlCarsOld;
               
                // уникальный url 
                $uniqid = getGUID(24); 
               
                // END 
               

    $query = $db->prepare("
        INSERT INTO auto_query 
        (id, uniqid, user, title_mark, title_model, id_mark, id_model, year, price, price_ascending, millage, millage_avg, fuel, valume, transmission, gear, body_type, price_avg, price_min, price_max, difference_price, equipment, shape, generation, generation_text, restyling, restyling_text, additionally_equipment, quantity, quantity_all, old_quantity, old_list, lang, debug, date_create, time_request) 
        VALUES 
        (NULL, :query_uniqid, :query_user, :query_title_mark, :query_title_model, :query_id_mark, :query_id_model, :query_year, NULL, :query_price_ascending, NULL, :query_millage_avg, NULL, NULL, NULL, NULL, NULL, :query_price_avg, :query_price_min, :query_price_max, :query_difference_price, NULL, NULL, NULL, NULL, NULL, NULL, NULL, :query_quantity, :query_quantity_all, :query_old_quantity, :query_old_list, :query_lang, :query_debug, now(), :time_request)
    ");


    $params = [
      ':query_uniqid' => $uniqid,
      ':query_user' => $user_id,
      ':query_title_mark' => $query_title_mark,
      ':query_title_model' => $query_title_model,
      ':query_id_mark' => $query_id_mark,
      ':query_id_model' => $query_id_model,
      ':query_year' => $query_year,
      ':query_price_ascending' => $query_price_ascending,
      ':query_millage_avg' => $query_millage_avg,
      ':query_price_avg' => $query_price_avg,
      ':query_price_min' => $query_price_min,
      ':query_price_max' => $query_price_max,
      ':query_difference_price' => $differencePriceAndMiddle,
      ':query_quantity' => $query_quantity,
      ':query_quantity_all' => $query_quantity_all,
      ':query_old_quantity' => $query_old_quantity,
      ':query_old_list' => $query_old_list,
      ':query_lang' => $lang,
      ':query_debug' => $query_debug,
      ':time_request' => $time_request,
    ];

    $query->execute($params);

    $_SESSION['query_id'] = $db->lastInsertId();

    $data = [
    'priceMinUsd' => $utilities->numberFormat($utilities->converterPriceUsd($query_price_min)[$rateArr[1]]),
    'priceMin' => $utilities->numberFormat($utilities->converterPriceUsd($query_price_min)[$rateArr[$rate]]),
    'priceAvgUsd' => $utilities->numberFormat($utilities->converterPriceUsd($query_price_avg)[$rateArr[1]]),
    'priceAvg' => $utilities->numberFormat($utilities->converterPriceUsd($query_price_avg)[$rateArr[$rate]]),
    'priceMaxUsd' => $utilities->numberFormat($utilities->converterPriceUsd($query_price_max)[$rateArr[1]]),
    'priceMax' => $utilities->numberFormat($utilities->converterPriceUsd($query_price_max)[$rateArr[$rate]]),
    'millageAvg' => $utilities->numberFormat($query_millage_avg),
    'titleMark' => $query_title_mark,
    'titleModel' => $query_title_model,
    'year' => $query_year,
    'quantity' => $query_quantity,
    'rate' => $rateArr[$rate],
    'oldCars' => $oldCars
    ];             
   
    

         
              //$log .= 'One Price: ' . $carItem['AD_PRICE'] . '
           //';
            
    //file_put_contents(__DIR__ . '/logs.txt', $log . PHP_EOL, FILE_APPEND);    
         
                

    echo json_encode([
      'data' => $data,                    
      'xxx' => '2',     
      'error' => $error 
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
   
} else {

  echo json_encode([
    'data' => $objResult,
    'xxx' => '3',
    'result' => '',
    'error' => $error,
    'v' => $postJson ?? '(' 
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    

    
} 
 //############################### end USER SEARCH

 