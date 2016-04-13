<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
define("HOST", "http://" . $_SERVER['HTTP_HOST']);
?>
<?php if ($_GET['method'] === "mobile") { echo $_GET['callback'] . "("; } ?>{
  "response" : [
    {
      "name" : "Sell & Trade from Cars.com",
      "filepath" : "<?php echo HOST; ?>/cars.com/sellandtrade/video/chapter1.mp4"
    },
    {
      "name" : "The Seller Experience",
      "filepath" : "<?php echo HOST; ?>/cars.com/sellandtrade/video/chapter2.mp4"
    },
    {
      "name" : "The Dealer Experience",
      "filepath" : "<?php echo HOST; ?>/cars.com/sellandtrade/video/chapter3.mp4"
    },
    {
      "name" : "The Sell & Trade Report",
      "filepath" : "<?php echo HOST; ?>/cars.com/sellandtrade/video/chapter4.mp4"
    },
    {
      "name" : "...That's All There Is To It!",
      "filepath" : "<?php echo HOST; ?>/cars.com/sellandtrade/video/chapter5.mp4"
    }
  ],
  "version" : 1
}<?php if ($_GET['method'] === "mobile") { echo ")"; } ?>
