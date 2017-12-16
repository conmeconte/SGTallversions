

 <?php
 header('Access-Control-Allow-Origin: *');
$result = [
    "success" => true,
    "data"=>[[
        "id" => "17",
        "name" => "John",
        "grade" => "99",
        "course" => "whatever"
    ]]
];

$result = json_encode($result);
echo $result;

?>

