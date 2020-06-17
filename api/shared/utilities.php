<?
class Utilities {

  public function converterPriceUsd($price) {
            
    global $db;
    
    $stmtCurrency = $db->query("SELECT 
    C.id C_ID, 
    C.usd C_USD, 
    C.eur C_EUR, 
    C.byn C_BYN, 
    C.uah C_UAH, 
    C.date_create C_DATE_CREATE 
    FROM 
    currency C 
    WHERE 
    C.date_create = (SELECT MAX(currency.date_create) FROM currency) " );
    $resultCurrency = $stmtCurrency->fetch(\PDO::FETCH_ASSOC);
    
    $USD = $resultCurrency['C_USD'];
    $EUR = $resultCurrency['C_EUR'];
    $BYN = $resultCurrency['C_BYN'];
    $UAH = $resultCurrency['C_UAH'];
    
    $priceUSD = round($price, 0);
    $priceRUB = round($priceUSD * $USD, 0);
    $priceEUR = round($priceRUB / $EUR, 0);
    $priceBYN = round($priceRUB / $BYN, 0);
    $priceUAH = round($priceRUB / $UAH, 0);

    $price = [
    'USD' => $priceUSD,
    'RUB' => $priceRUB,
    'EUR' => $priceEUR,
    'BYN' => $priceBYN,
    'UAH' => $priceUAH,
    ];

    return $price;
    
  }

  public function currencyConverter($currency_from, $currency_to, $currency_input) {
    
    global $db;
   
   $stmtCurrency = $db->query("SELECT 
   C.id C_ID, 
   C.usd C_USD, 
   C.eur C_EUR, 
   C.byn C_BYN, 
   C.uah C_UAH, 
   C.date_create C_DATE_CREATE 
   FROM 
   currency C 
   WHERE 
   C.date_create = (SELECT MAX(currency.date_create) FROM currency) " );
   $resultCurrency = $stmtCurrency->fetch(\PDO::FETCH_ASSOC);
   
   $USD = $resultCurrency['C_USD'];
   $EUR = $resultCurrency['C_EUR'];
   $BYN = $resultCurrency['C_BYN'];
   $UAH = $resultCurrency['C_UAH'];
   
  if($currency_from == 'RUB') {
      $priceUSD = round($currency_input / $USD, 0);
  } 
  if($currency_from == 'EUR') {
      $priceRUB = round($currency_input * $EUR, 0);
      $priceUSD = round($priceRUB / $USD, 0);
  } 
  if($currency_from == 'BYN') {
      $priceRUB = round($currency_input * $BYN, 0);
      $priceUSD = round($priceRUB / $USD, 0);
  } 
  if($currency_from == 'UAH') {
      $priceRUB = round($currency_input * $UAH, 0);
      $priceUSD = round($priceRUB / $USD, 0);
  } 
  if($currency_from == 'USD') {
      $priceUSD = round($currency_input, 0);
  }
  
  return $priceUSD;
  }

  public function numberFormat($num) {
    return number_format($num, 0, '', ' ');
  }

}
?>
