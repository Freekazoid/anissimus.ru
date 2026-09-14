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

if ($isAllowed && isset($images[intval($_GET['part'])]))
{    
  $img_path = __DIR__ . "/" . $images[intval($_GET['part'])]['file_name'];
  $image = @imagecreatefromjpeg($img_path);
  if ($image === false) {
    $image = imagecreatefromjpeg(__DIR__ . "/galleries/no-image.jpeg");
  }
  header("Content-Type: image/jpeg");
  imagejpeg($image);
} else {
  $image = imagecreatefromjpeg(__DIR__ . "/galleries/no-image.jpeg");
  header("Content-Type: image/jpeg");
  imagejpeg($image);
}
?>
