'use strict';

// Document ready
$(document).on('ready', function(){

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  profilePopup();
  uploadImageProfile();
  inputNumber();
  navProfilePopup();

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() { });
$(window).on('resize', function() { });

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function profilePopup(){
  var profile = $('.header__profile');
  var img = profile.find('.header__profile-img');
  var popup = profile.find('.header__profile-popup');

  img.on('click', function(e){
    e.stopPropagation();
    if(popup.hasClass('is-active')) {
      popup.removeClass('is-active')
    } else {
      popup.addClass('is-active')
    }
  });

  popup.on('click', function(e){
    e.stopPropagation();
  });

  $(document).on('click', function(){
    popup.removeClass('is-active');
  });
}

function navProfilePopup(){
  var profile = $('.screen__seven-profile');

  profile.each(function(){
    var _this = $(this);
    var dot = _this.find('.screen__seven-nav-top');
    var popup = _this.find('.screen__seven-nav-popup');

    dot.on('click', function(e){
      e.stopPropagation();
      $('.screen__seven-nav-popup').removeClass('is-active');
      $('.screen__seven-nav-top').removeClass('is-active');

      if(popup.hasClass('is-active')) {
        popup.removeClass('is-active');
        dot.removeClass('is-active');
      } else {
        popup.addClass('is-active');
        dot.addClass('is-active');
      }
    });
  })

  $('.screen__seven-nav-popup').on('click', function(e){
    e.stopPropagation();
  });

  $(document).on('click', function(){
    $('.screen__seven-nav-popup').removeClass('is-active');
    $('.screen__seven-nav-top').removeClass('is-active');
  });
}

floatingLabel.init();

function uploadImageProfile() {
  var readURL = function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.form-group__user-picture').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  $(".form-group__user-upload").on('change', function(){
    readURL(this);
  });
  $(".form-group__user-img").on('click', function() {
     $(".form-group__user-upload").click();
  });
}

$(".intlTelInput").intlTelInput();

function inputNumber(){
  $(document).on('keydown', 'input.onlyNumber', function(evt) {
    var key = evt.charCode || evt.keyCode || 0;

    return (key == 8 ||
            key == 9 ||
            key == 46 ||
            key == 110 ||
            key == 190 ||
            (key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105));
});
}
