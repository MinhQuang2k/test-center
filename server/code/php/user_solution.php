<?php
function functionName ($param1, $param2, $param3) {
   //code here
   return [[1,2,3],[2,3,4]];
}


$param1 = (bool)readline();
$param2_count = intval(trim(fgets(STDIN)));
$parameter1 = [];
for ($i = 0; $i < $param2_count; $i++) {
    $param2_item = trim(fgets(STDIN));
$param2[] = $param2_item;
}

$param3_rows = intval(trim(fgets(STDIN)));
$param3_columns = intval(trim(fgets(STDIN)));
$param3 = array();
for ($i = 0; $i < $param3_rows; $i++) {
    $param3_temp = rtrim(fgets(STDIN));
    $param3[] = preg_split('/ /', $param3_temp, -1, PREG_SPLIT_NO_EMPTY);
}

$result = functionName($param1, $param2, $param3);
$resultParts = [];
foreach ($result as $row) {
    $resultsParts[] = implode(' ', $row);
}
echo implode('PHP_EOL', $resultParts);