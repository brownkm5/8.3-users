
var $ = require('jquery');

$.ajaxSetup({
  beforeSend: function(xhr){
    xhr.setRequestHeader('X-Parse-Application-Id', 'tiygvl');
    xhr.setRequestHeader('X-Parse-REST-API-Key', 'slumber');
  }
});


var url = 'https://tiny-parse-server.herokuapp.com/classes/Kevin'
$.ajax(url).then(function(data){
  console.log(data);
});


$('#signup').on('submit', function(e){
  e.preventDefault();

var data = {
  'username': $('#email').val(),
  'password': $('#password').val()
}

  $.post('https://tiny-parse-server.herokuapp.com/users', data).then(function(response){
    console.log(response);
  });
});

$('#login').on('submit', function(e){
  e.preventDefault();

  var url = 'https://tiny-parse-server.herokuapp.com/';

  var username = $('#email-login').val();
  var password = $('#password-login').val();

  $.ajax(url + 'login?username=' + encodeURI(username) + '&password=' + encodeURI(password),{
    success: function(response){
      alert('you logged in');
      //run route to next page
    },
    error: function(response){
      alert('invalid username/password');
    }
  }).then(function(response){
    console.log(response);
  })
});
