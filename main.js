'use strict'

var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='


function init(){
  $('#getQuote').click(getQuote)
  $('.display').on('dblclick','.info',updateQuote)
}

function updateQuote(e){
  var $tr = $(e.target).closest('.info');
  var symbol = $tr.find('.symbol').text();
  console.log(symbol)

  $.ajax( url + symbol, {
    dataType: 'jsonp'
  })
  .done(function(data){
    console.log('retrieved data ', data);
    if (!data.Name) {
      hud('No symbol matches found');
      return; 
    } 
    drawQuote(data,$tr)
  })
  .fail(function(error){
    console.error('error getting ', error);
  }) 

}

function getQuote(symbol){
  var symbol = $('#symbol').val();

  $.ajax( url + symbol, {
    dataType: 'jsonp'
  })
  .done(function(data){
    if (!data.Name) {
      hud('No symbol matches found');
      return; 
    } 
    drawQuote(data)
  })
  .fail(function(error){
    console.error('error getting ', error.message);
  })  
}

function drawQuote(data,$tr){

  var drawNew = !$tr;

  var symbol = data.Symbol;
  var name = data.Name;
  var price = data.LastPrice;
  var time = data.Timestamp;

  if (drawNew){
    var $tr = $('#sample').clone().removeAttr('id');
  }
  $tr.find('.symbol').text(symbol)
  $tr.find('.name').text(name)
  $tr.find('.price').text(price)
  $tr.find('.time').text(time)

  if (drawNew){
    $('.display').prepend($tr)
  }

}

function hud(message){
  var $disp = $('.hud p');
  $disp.text(message)
  $disp.fadeIn();
  $disp.fadeOut();
}



$(document).ready(init);