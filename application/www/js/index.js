var data = '';

function jsonpCallback(response) {
  $.each(response.response, function(key, value) {
    download(key);
  });
  localStorage.setItem('data', JSON.stringify(response));
  document.location = 'main.html';
}

function download(num) {
/*
  var ft = new FileTransfer();
  var fs = new FileSystem();
  ft.download(
    'http://dealeradvantage.cars.com/landing/2016.03-Sell-and-Trade-Center/2016.03-st-resolution/video/chapter' + num.toString() + '.mp4',
    //'/sdcard/chapter1.mp4', // this is the filename as well complete url
    fs.root.toURL() + 'chapter' + num.toString() + '.mp4',
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
  if (!localStorage.setItem('data', data)) {
    var url = 'http://clients.voltology.io/cars.com/sellandtrade/api/?callback=?';
    $.ajax({
      type: 'GET',
      url: url,
      async: false,
      jsonpCallback: 'jsonpCallback',
      contentType: 'application/json',
      dataType: 'jsonp'
    });
  } else {
    document.location = 'main.html';
  }
}

function onDeviceReady() {
  //cordova.exec(null, null, "SplashScreen", "hide", [])
  //var networkState = navigator.connection.type;
  $('.title-bar-text').html('Sell & Trade');
  //if (networkState === 'wifi') {
  getData();
  //}
  /*$('.title-bar').css({
    'left' : $('.video-player').offset().left - 50,
    'top' : $('.blue-bar').offset().top + 10
  });*/
}

$(document).ready(function() { onDeviceReady(); });
//document.addEventListener('deviceready', onDeviceReady, false);
