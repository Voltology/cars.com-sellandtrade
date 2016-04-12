var data = '';

function jsonpCallback(response) {
  var count = 0;
  data = response.response;
  for (var i = 1; i <= 5; i++) {
  }
  $.each(response.response, function(key, value) {
    download(count + 1);
    if (count === 0) {
      $('.title-bar-text').html(value.name);
      $('.video-player').html('<source src="' + value.filepath + '"></source>');
    }
    menu.add(value.name, value.filepath, key);
    count++;
  });
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

var menu = {
  menuIndex : 0,
  menuOpen : false,
  add : function(name, path, key) {
    $('#nav-list').append('<li data-key="' + key + '" data-filepath="' + path + '">' + name + '</li>')
    $('#nav-list li').click(function(){
      $('.title-bar-text').html($(this).html());
      $('.video-player source').remove();
      $('.video-player').html('<source src="' + $(this).data('filepath') + '"></source>');
      $('.title-bar-text').html();
      $('.video-player')[0].load();
      $('.arrow-right').show();
      menu.close();
    });
  },
  close : function() {
    menu.menuOpen = false;
    $('nav').animate({
      left: '-=300'
    }, 300, function() {
      $('nav').css('left', '-300px');
    });
  },
  next : function() {
    menu.menuIndex++;
    $('.arrow-left').css('opacity', .5);
    if (menu.menuIndex >= 4) {
      $('.arrow-right').css('opacity', 0);
      menu.menuIndex = 4;
    }
    $('.title-bar-text').html(data[menu.menuIndex].name);
    $('.video-player source').remove();
    $('.video-player').html('<source src="' + data[menu.menuIndex].filepath + '"></source>');
    $('.title-bar-text').html();
    $('.video-player')[0].load();
  },
  open : function() {
    menu.menuOpen = true;
    $('nav').animate({
      left: '+=300'
    }, 300, function() {
    });
  },
  prev : function() {
    menu.menuIndex--;
    $('.arrow-right').css('opacity', .5);
    if (menu.menuIndex <= 0) {
      $('.arrow-left').css('opacity', 0);
      menu.menuIndex = 0;
    }
    $('.title-bar-text').html(data[menu.menuIndex].name);
    $('.video-player source').remove();
    $('.video-player').html('<source src="' + data[menu.menuIndex].filepath + '"></source>');
    $('.title-bar-text').html();
    $('.video-player')[0].load();
  }
}

function getData() {
  var url = 'http://clients.voltology.io/cars.com/sellandtrade/api/';
  $.ajax({
    type: 'GET',
    url: url,
    async: false,
    jsonpCallback: 'jsonpCallback',
    contentType: 'application/json',
    dataType: 'jsonp'
  });
}

function onDeviceReady() {
  var networkState = navigator.connection.type;
  if (networkState === 'wifi') {
    getData();
  }
  $('.title-bar').css({
    'left' : $('.video-player').offset().left - 50,
    'top' : $('.blue-bar').offset().top + 10
  });
  $('.hamburger').click(function() {
    if (menu.menuOpen) {
      menu.close();
    } else {
      menu.open();
    }
  });
  $('.arrow-right').click(function() {
    menu.next();
  });
  $('.arrow-left').click(function() {
    menu.prev();
  });
}

//$(document).ready(function() { onDeviceReady(); });
document.addEventListener('deviceready', onDeviceReady, false);
