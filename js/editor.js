var state;
var selected;
var _width;
var _height;
var _x;
var _y;

$(document).ready(function(){
	
	$('input[name=blck]').click(function(){
	
		var r =$('input[name=blck]');
		
		if(r[0].checked)
			state = 'block';
		else
			state = 'picture';
		
		if(state == 'block')
		{
			$('div[id=choose]').html(
			"Ширина <input id='_width' size='6' type='textbox'/></h1></br></br>"+
			"Высота <input id='_height' size='6' type='textbox'/></h1></br></br>"+
			"Цвет <input id='_color' type='color'/>"+
			""
			);
		}
		if(state == 'picture')
		{
			$('div[id=choose]').html(
			"Ширина <input id='_width' size='6' type='textbox'/></h1></br></br>"+
			"Высота <input id='_height' size='6' type='textbox'/></h1></br></br>"+
			"Картинка <input id='_picture' type='file'/>"+
			""
			);
		}
		
	});
		
		$('#ok').click(function(){
			
			alert($('#_picture').val());
		
		});
});