<?php
include_once "images_db.php";

$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
$isAllowed = (
  strpos($referer, 'anissimus.ru') !== false ||
  strpos($referer, 'web-23.online') !== false ||
  strpos($referer, 'localhost') !== false ||
  strpos($referer, '127.0.0.1') !== false ||
  strpos($referer, 'dev.anissimus') !== false
);

$img_path = __DIR__ . "/galleries/no-image.jpeg";

if ($isAllowed && isset($images[intval($_GET['part'])])) {
  $candidate = __DIR__ . "/" . $images[intval($_GET['part'])]['file_name'];
  if (is_file($candidate)) {
    $img_path = $candidate;
  }
}

if (!is_file($img_path)) {
  http_response_code(404);
  exit;
}

header("Content-Type: image/jpeg");
header("Content-Length: " . filesize($img_path));
readfile($img_path);
?>
