var data = '';

function downloadFile(key) {
  var filePath = 'chapter' + key + '.mp4';
  // 'http://dealeradvantage.cars.com/landing/2016.03-Sell-and-Trade-Center/2016.03-st-resolution/video/chapter' + key.toString() + '.mp4'
  return filePath;
}

function getData() {
  $.ajax({
    url: 'http://clients.voltology.io/cars.com/sellandtrade/api/?method=mobile',
    dataType: 'jsonp',
    success: function(data) {
      jsonpCallback(data);
    }
  });
}

function jsonpCallback(response) {
  data = response;
  if (!localStorage.getItem('data') || data.version !== JSON.parse(localStorage.getItem('data')).version) {
    $.each(response.response, function(key, value) {
      data.response[key].filepath = downloadFile(key + 1);
    });
  }
  localStorage.setItem('data', JSON.stringify(data));
  document.location = 'main.html';
}

function onDeviceReady() {
  var fileTransfer = new FileTransfer();
  var uri = encodeURI("http://clients.voltology.io/cars.com/sellandtrade/video/chapter1.mp4");
/*
  fileTransfer.download(
      uri,
      'cdvfile://localhost/persistent/',
      function(entry) {
          alert("download complete: " + entry.fullPath);
      },
      function(error) {
          alert("download error source " + error.source);
          alert("download error target " + error.target);
          alert("upload error code" + error.code);
      },
      false,
      {
          headers: {
              "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
          }
      }
  );
*/
  //cordova.exec(null, null, "SplashScreen", "hide", [])
  //var networkState = navigator.connection.type;
  $('.title-bar-text').html('Sell & Trade');
  var networkState = true;
  //if (networkState === 'wifi') {
  if (networkState) {
    getData();
  } else if (!localStorage.setItem('data')) {
    alert('You must be connected to the internet when running this application for the first time.');
  } else {
    document.location = 'main.html';
  }
  //}
  /*$('.title-bar').css({
    'left' : $('.video-player').offset().left - 50,
    'top' : $('.blue-bar').offset().top + 10
  });*/
}

//$(document).ready(function() { onDeviceReady(); });
document.addEventListener('deviceready', onDeviceReady, false);
