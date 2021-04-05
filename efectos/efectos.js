jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    var name = $('#name').val();
    var name = $('#email').val();
    var subjectOption = $('#subject').children('option:selected').val();
    var email = $('#email').val();
    var message = $('#message').val();
    $.ajax({
      type: "POST",
      url: '',
      data: JSON.stringify({ 
        to: "",
        from: "",
        subject: subjectOption,
        replyTo: email.trim(),
        data: {
          name: name.trim(),
          subject: subjectOption,
          message: message
        }
      }),
      dataType: 'json',
      crossDomain: true,
      timeout: 40000,
      success: function(msg) {
        // alert(msg);
        if (msg == 'OK') {
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val("");
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html(msg);
        }

      }
    });
    return false;
  });

});



//*boton de home reproducion video
$('#play-video').on('click', function(e){
  e.preventDefault();
  $('#video-overlay').addClass('open');
  $("#video-overlay").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/0ih0aNcNd5g" frameborder="0" allowfullscreen></iframe>');
});

$('.video-overlay, .video-overlay-close').on('click', function(e){
  e.preventDefault();
  close_video();
});

$(document).keyup(function(e){
  if(e.keyCode === 27) { close_video(); }
});

function close_video() {
  $('.video-overlay.open').removeClass('open').find('iframe').remove();
};

$(window).scroll(function() {
  if ($(this).scrollTop() > 300) {
      $('a.scroll-top').fadeIn('slow');
  } else {
      $('a.scroll-top').fadeOut('slow');
  }
});
$('a.scroll-top').click(function(event) {
  event.preventDefault();
  $('html, body').animate({scrollTop: 0}, 300);
});


//CHAT WHATSAPP
document.getElementById('whats-chat').addEventListener("mouseover", showchatbox);
        document.getElementById('chat-top-right').addEventListener("click", closechatbox);
        document.getElementById('send-btn').addEventListener("click", sendmsg);
        window.addEventListener("load", showchatboxtime);
        function showchatbox(){
        document.getElementById('chat-box').style.right='8%'
        }
        function closechatbox(){
        document.getElementById('chat-box').style.right='-500px'
        
        
        }
        function showchatboxtime(){
        setTimeout(launchbox,5000)
        }
        function launchbox(){
        document.getElementById('chat-box').style.right='8%'
        
        }
        function sendmsg(){
        var msg = document.getElementById('whats-in').value;
        var relmsg = msg.replace(/ /g,"%20");
         window.open('https://api.whatsapp.com/send?phone=59893638274&text='+relmsg,'_blank');
        }