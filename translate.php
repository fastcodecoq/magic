<?php 

header("Content-type: application/json ; charset = UTF-8");

class ioTranslateException extends Exception { }

try{


 $lf = (!isset($_GET["lf"])) ? "auto|es" : strip_tags($_GET["lf"]) . '';
 $text = (!isset($_GET["text"])) ? "Hello world" : strip_tags($_GET["text"] . '');
 $text = urldecode($text);



 $query = "http://google.com/translate_t?langpair={$lf}&text=";
 $query .= urlencode($text);

 if(!preg_match("/([a-zA-Z]\|[a-zA-Z])/", $lf))
 	  throw new ioTranslateException("Error Processing Request");

 
 	  


$html = file_get_contents($query);

libxml_use_internal_errors(true); 
$doc = new DomDocument();
$doc->loadHTML($html);
$xpath = new DOMXPath($doc);

$rs = $xpath->query('//*/span[@id="result_box"]');
$rs = $rs->item(0)->nodeValue;

$json = array(
	"http_code" => 200,
	"rs" => array(
			"text" => $text,
			"translation" => $rs
		)
	);

 if(!isset($_GET["callback"])){
    echo json_encode($json);
   }
 else
 	{
 		if($_GET["callback"] != "?")
 		echo "{$_GET["callback"]}(" . json_encode($json) . ")";
 	    else
        echo json_encode($json);

 	}



}catch(ioTranslateException $e){


	$json = array(
	"http_code" => 400,
	"rs" => array(
			"error_message" => "Bad request: " . $e->getMessage()			
		)
	);

 if(!isset($_GET["callback"])){
    echo json_encode($json);
   }
 else
 	{
 		if($_GET["callback"] != "?")
 		echo "{$_GET["callback"]}(" . json_encode($json) . ")";
 	    else
        echo json_encode($json);

 	}	

}

catch(Exception $e){


	$json = array(
	"http_code" => 400,
	"rs" => array(
			"error_message" => "Bad request: Malformed URL"			
		)
	);

 if(!isset($_GET["callback"])){
    echo json_encode($json);
   }
 else
 	{
 		if($_GET["callback"] != "?")
 		echo "{$_GET["callback"]}(" . json_encode($json) . ")";
 	    else
        echo json_encode($json);

 	}	

}
