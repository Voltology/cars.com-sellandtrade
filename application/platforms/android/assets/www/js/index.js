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
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function pause(count) {
  $('.loading-text').html('Retrieving Files... (' + count + ' of 5)');
  count++;
  if (count <= 5) {
    setTimeout(function() { pause(count); }, 3000);
  } else {
  }
}

function onDeviceReady() {
  cordova.exec(null, null, "SplashScreen", "hide", [])
  $('.title-bar').css({
    'top' : $('.blue-bar').offset().top + 10
  });
  var networkState = navigator.connection.type;
  if (networkState === 'wifi') {
    getData();
  } else if (localStorage.getItem('data') == null) {
    alert('You must be connected to the internet when running this application for the first time. Please connect to WiFi and reopen the application.');
    navigator.app.exitApp();
  } else {
    //document.location = 'main.html';
  }
}




var downloadCount = 0;
function gotFS(fileSystem) {
  fileSystem.root.getDirectory("vids", {create: true}, gotDir);
}

function gotDir(dirEntry) {
  dirEntry.getFile("chapter" + downloadCount + ".mp4", {create: true, exclusive: false}, gotFile);
}

function gotFile(fileEntry) {
    var localPath = fileEntry.fullPath;
    var localUrl = fileEntry.toURL();

    //alert('Loaded local path: ' + localPath);
    //alert('Loaded local url: ' + localUrl);

    var fileTransfer = new FileTransfer();
    //var uri = encodeURI('http://dealeradvantage.cars.com/landing/2016.03-Sell-and-Trade-Center/2016.03-st-resolution/video/chapter' + downloadCount + '.mp4');
    var uri = encodeURI(data.response[downloadCount].filepath);
    $('.loading-text').html('Retrieving Files... (' + (downloadCount + 1).toString() + ' of ' + data.response.length + ')');
    //alert('Downloading ' + uri + ' to ' + localPath);

    fileTransfer.download(
        uri,
        localUrl,
        function(entry) {
            //alert('download complete (path): ' + entry.fullPath); // Returns '/vids/some_video.mp4'
            //alert('download complete (url): ' + entry.toURL()); // Returns 'cdvfile://localhost/persistent/vids/some_video.mp4'
            /*
            document.getElementById('video_container').innerHTML = 
            'Downloaded Video path: ' + entry.fullPath + '<br />'
            + 'Downloaded Video url: ' + entry.toURL() + '<br />'
            + '<video width="100%" height="300" controls>' 
            + '<source src="' + entry.toURL() + '" type="video/mp4">'
            + '</video>';
            */
            data.response[downloadCount].filepath = entry.toURL();
            downloadCount++;
            if (downloadCount < data.response.length) {
              window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
            } else {
              localStorage.setItem('data', JSON.stringify(data));
              alert(localStorage.getItem('data'));
              alert('Videos successfully downloaded!');
              document.location = 'main.html';
            }
        },
        function(error) {
            //alert('download error source ' + error.source);
            //alert('download error target ' + error.target);
            alert('There was an error while downloading the videos.  Please reopen the application and try again.');
            navigator.app.exitApp();
        }
    );
}

function fail(error) {
    alert('Error creating file [' + error.name + ']: ' + error.message);
}








//$(document).ready(function() { onDeviceReady(); });
document.addEventListener('deviceready', onDeviceReady, false);
