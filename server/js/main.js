var data = '';
var ajax = {
  get : function(url, query, callback) {
    jQuery.ajax({
      type: 'POST',
      url: url,
      data: query,
      dataType: 'json',
      success: function(response) {
        callback(response);
      }
    });
  },
  send : function(url, query) {
    jQuery.ajax({
      type: 'GET',
      url: url,
      data: query,
      dataType: 'json'
    });
  }
};

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

function init() {
  $('.title-bar').css({
    'left' : $('.video-player').offset().left - 300,
    'top' : $('.blue-bar').offset().top + 20
  });
}

$(document).ready(function() {
  init();
  ajax.get('api/', '', function(response) {
    var count = 0;
    data = response.response;
    $.each(response.response, function(key, value) {
      if (count === 0) {
        $('.title-bar-text').html(value.name);
        $('.video-player').html('<source src="' + value.filepath + '"></source>');
        count++;
      }
      menu.add(value.name, value.filepath, key);
    });
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
});

$(window).resize(function() {
  //init();
});
