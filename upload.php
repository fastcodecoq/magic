<?php 




$img = $_FILES["pic"]["tmp_name"];
$key = "DGHIJSVW87c07d721a42827adc4a9d7a9890a65c";
$format = "JSON";
$okey = "yvOIuLQvd4W6Y0nQ7eD7j";


$url = "https://post.imageshack.us/upload_api.php";
$data = array (
	"key" => $key,
	"format" => "json",
	"fileupload" => '@' . $img,
);


$ch = curl_init ($url);
curl_setopt ($ch, CURLOPT_POST, true);
curl_setopt ($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);

$rs = json_decode(curl_exec ($ch));

curl_close($ch);

header("Content-type: application/json; charset=utf-8");



$short = $rs->links->image_link;

$rs->links->image_link = $short;



echo json_encode($rs);


