$( document ).ready(function() {
  // if HTML DOM Element that contains the map is found...
  if (document.getElementById('map-canvas')){
    // Coordinates to center the map
    var myLatlng = new google.maps.LatLng(7.0,-1.5);

    // Other options for the map, pretty much selfexplanatory
    var mapOptions = {
      scrollwheel: false,
      zoom: 7,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    // Attach a map to the DOM Element, with the defined settings
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  }

  if (location.pathname.split('/').slice(-1)[0] == 'staging.html' && $(window).width() > 580) {
    setTimeout(function(){ $( "#top-right-menu" ).fadeTo( "slow", 1 );
    }, 2100);  
  } else {
    //$( "#top-right-menu" ).hide();
    $( "#top-right-menu" ).css('opacity', 1);
  };


  setTimeout(function(){ $( "#big-title" ).fadeTo( "slow", 1 );
  }, 2000);

  setTimeout(function(){ $( "#initial-picture" ).fadeTo( "slow", 1 );
  }, 2200);

  setTimeout(function(){ $( "#second-section" ).fadeTo( "slow", 1 );
  }, 2200);

  function fadeInElement(elementToFade) {
    var elementTopToPageTop = $(elementToFade).offset().top;
    var windowTopToPageTop = $(window).scrollTop();
    var windowInnerHeight = window.innerHeight;
    var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
    var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
    var distanceFromBottomToAppear = 300;

    if(elementTopToWindowBottom > distanceFromBottomToAppear) {
      $(elementToFade).addClass('js-fade-element-show');
    }
    else if(elementTopToWindowBottom < 0) {
      $(elementToFade).removeClass('js-fade-element-show');
      $(elementToFade).addClass('js-fade-element-hide');
    }
  }


  var element = document.getElementById("js-fadeInElement");
  $(element).addClass('js-fade-element-hide');

  var element2 = document.getElementById("js-fadeInElement2");
  $(element2).addClass('js-fade-element-hide');

  var element3 = document.getElementById("js-fadeInElement3");
  $(element3).addClass('js-fade-element-hide');

  $(window).scroll(function() {
    fadeInElement(element);
    fadeInElement(element2);
    fadeInElement(element3);
  });


  $(function() {
    $("#modal-1").on("change", function() {
      if ($(this).is(":checked")) {
        $("body").addClass("modal-open");
      } else {
        $("body").removeClass("modal-open");
      }
    });

    $(".modal-fade-screen, .modal-close").on("click", function() {
      $(".modal-state:checked").prop("checked", false).change();
    });

    $(".modal-inner").on("click", function(e) {
      e.stopPropagation();
    });
  });

  $('#contact-us-form').submit(function(e) {
    e.preventDefault();
    // Get all the forms elements and their values in one step
    var values = $(this).serializeJSON();
    $('#contact-us-form')[0].reset();
    $('#close-contact-us-modal').trigger('click');

    email_html = 'name: ' + values["name"] + '<br><br>email: ' + values["email"] + '<br><br>phone: ' +  values["phone"] + '<br><br>subject: ' + values["subject"] + '<br><br>message: ' + values["message"];

    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'zxQ7fxB2xCeYLCrdVs8lKg',
        'message': {
          'from_email': 'no-reply@coachghana.co',
          'to': [
              {
                'email': 'maxplomer@gmail.com',
                'name': 'Max',
                'type': 'to'
              },
              {
                'email': 'info@coachghana.co',
                'name': 'Coach Ghana',
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'COACH GHANA contact us form',
          'html': email_html
        }
      }
    }).done(function(response) {
     console.log(response); // if you're into that sorta thing
    });



    alert('Your message has succesfully been sent!');
  });

  $('#apply-now-form').submit(function(e) {
    e.preventDefault();
    // Get all the forms elements and their values in one step
    var values = $(this).serializeJSON();
    $('#apply-now-form')[0].reset();
    $('#close-apply-now-modal').trigger('click');

    email_html = 'first name: ' + values["first_name"] + '<br><br>last name: ' + values["last_name"] + '<br><br>gender: ' + values["gender"] + '<br><br>date of birth (DD/MM/YYYY): ' + values["birthday_day"] + '/' + values["birthday_month"] + '/' + values["birthday_year"] + '<br><br>country: ' + values["country"] + '<br><br>address: ' + values["address"] + '<br><br>email: ' + values["email"] + '<br><br>phone: ' +  values["phone"] + '<br><br>weeks/price: ' + values["weeks_price"] + '<br><br>terms and conditions: ' + values["terms_and_conditions"];

    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'zxQ7fxB2xCeYLCrdVs8lKg',
        'message': {
          'from_email': 'no-reply@coachghana.co',
          'to': [
              {
                'email': 'maxplomer@gmail.com',
                'name': 'Max',
                'type': 'to'
              },
              {
                'email': 'info@coachghana.co',
                'name': 'Coach Ghana',
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'COACH GHANA apply now form',
          'html': email_html
        }
      }
    }).done(function(response) {
     console.log(response); // if you're into that sorta thing
    });



    alert('Your application has succesfully been sent!');
  });


  var menuToggle = $('#js-centered-navigation-mobile-menu').unbind();
  $('#js-centered-navigation-menu').removeClass("show");
  
  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-centered-navigation-menu').slideToggle(function(){
      if($('#js-centered-navigation-menu').is(':hidden')) {
        $('#js-centered-navigation-menu').removeAttr('style');
      }
    });
  });




});