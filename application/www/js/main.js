var data = '';

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

function setData() {
  var response = JSON.parse(localStorage.getItem('data'));
  data = response.response;
  $.each(response.response, function(key, value) {
    if (key === 0) {
      $('.title-bar-text').html(value.name);
      $('.video-player').html('<source src="' + value.filepath + '"></source>');
    }
    menu.add(value.name, value.filepath, key);
  });
}

function onDeviceReady() {
  setData();
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

$(document).ready(function() { onDeviceReady(); });
//document.addEventListener('deviceready', onDeviceReady, false);
