var data = '';

function download(key) {
  alert(key);
/*
  var ft = new FileTransfer();
  var fs = new FileSystem();
  ft.download(
    'http://dealeradvantage.cars.com/landing/2016.03-Sell-and-Trade-Center/2016.03-st-resolution/video/chapter' + key.toString() + '.mp4',
    //'/sdcard/chapter1.mp4', // this is the filename as well complete url
    fs.root.toURL() + 'chapter' + key.toString() + '.mp4',
    function(entry) {
      alert('success');
      alert(JSON.stringify(entry));

    },
    function(err) {
      //alert(JSON.stringify(err));
    }
  );
*/
}

function getData() {
  var url = 'http://clients.voltology.io/cars.com/sellandtrade/api/?callback=?';
  $.ajax({
    type: 'GET',
    url: url,
    async: false,
    jsonpCallback: 'jsonpCallback',
    contentType: 'application/json',
    dataType: 'jsonp'
  });
}

function jsonpCallback(response) {
  localStorage.setItem('data', JSON.stringify(response));
  $.each(response.response, function(key, value) {
    download(key);
  });
  document.location = 'main.html';
}

function onDeviceReady() {
  //cordova.exec(null, null, "SplashScreen", "hide", [])
  //var networkState = navigator.connection.type;
  $('.title-bar-text').html('Sell & Trade');
  var networkState = true;
  //if (networkState === 'wifi') {
  if (networkState) {
    if (!localStorage.getItem('data')) {
      getData();
    } else {
      document.location = 'main.html';
    }
  }
  //}
  /*$('.title-bar').css({
    'left' : $('.video-player').offset().left - 50,
    'top' : $('.blue-bar').offset().top + 10
  });*/
}

$(document).ready(function() { onDeviceReady(); });
//document.addEventListener('deviceready', onDeviceReady, false);
