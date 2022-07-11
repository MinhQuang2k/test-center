<?php

// function functionExample ($parameter1, $parameter2) {
//     echo $parameter1;
//     echo $parameter2;
// }



// $parameter1 = readline();
// $parameter2 = (int)readline();
// $result = functionExample($parameter1, $parameter2);
// echo $result;

$stdin = fopen('php://stdin', 'r');

$json = '';
include 'user_solution.php';
while ($line = fgets($stdin)) {
    $json .= $line;
}
// echo $json;
// $decoded = \json_decode($json);

// $decoded->return_message = 'Hello from PHP';

// print \json_encode($decoded);

exit(0);


// array
// <?php
// function functionExample ($parameter1, $parameter2) {
//    $res = array();
//    foreach ($parameter2 as $p2) {
//       array_push($res, $p2);
//    }   
//    array_push($res, $parameter1);
//    return $res;
// }



// $parameter1 = (int)readline();
// $parameter2_count = intval(trim(fgets(STDIN)));
// $parameter2 = [];
// for ($i = 0; $i < $parameter2_count; $i++) {
// 	$parameter2_item = intval(trim(fgets(STDIN)));
// 	$parameter2[] = $parameter2_item;
// }
// $result = functionExample($parameter1, $parameter2);
// $resultParts = [];
// foreach ($result as $item) {
// 	$resultParts[] = $item;
// }
// echo join("\n",$resultParts);