var state;
var selected;
var blockCount = 0;
var _width;
var _height;
var _color;
var _file;
var _layer;
var _opacity = 0;
var _x;
var _y;
function createDiv(e)
{
	_x = e.clientX;
			_y = e.clientY;
				
			if(state == 'block')
			{
				$('div[id=editorField]').append("<div id=block" + blockCount + "></div>");
				var obj = $("div[id=block"+blockCount+']');
				obj.css({
					"width" : _width,
					"height" : _height,
					"left": _x,
					"top":_y,
					"position":"absolute",
					"backgroundColor": _color,
					"opacity": _opacity,
					"z-index": _layer
					});
				obj.addClass("ef")
			}
			
			if(state == 'picture')
			{
				
			}
			blockCount++;
}
function cursorEveryFrame(e)
{
			_x = e.clientX;
			_y = e.clientY;
				
			if(state == 'block')
			{
				
				var obj = $("div[id=cursor]");
				obj.css({"width" : _width,"height" : _height,"left": _x,"top":_y,"position":"absolute","backgroundColor": _color,"background-blend-mode":"overlay","opacity":"0.5"});
			}
			
			if(state == 'picture')
			{
				
			}
}

$(document).ready(function(){
	
	$('input[name=blck]').change(function(){
	
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
			"Цвет <input id='_color' type='color'/></br></br>"+
			"Непрозрачность <input id='opacity' type='number' min = '0' max = '100'/></br></br>"+
			"Слой <input id='index' type='number'/>"
			);
		}
		if(state == 'picture')
		{
			$('div[id=choose]').html(
			"Ширина <input id='_width' size='6' type='textbox'/></h1></br></br>"+
			"Высота <input id='_height' size='6' type='textbox'/></h1></br></br>"+
			"Картинка <input id='_picture' accept='image/*' type='file'/></br></br>"+
			"Непрозрачность <input id='opacity' type='number' min = '0' max = '100'/></br></br>"+
			"Слой <input id='index' type='number'/>"
			);
		}
		
	});
	
		
		$('#ok').click(function(){
			
			_width = parseInt($('#_width').val());
			_height = parseInt($('#_height').val());
			_color = $('#_color').val();
			try{_file = document.getElementById("_picture").files['0'].name;}
			catch(e){}
			
			_opacity = parseInt($('input[id=opacity]').val());
				if(isNaN(_opacity))
					_opacity = 100;
				if(_opacity > 100)
					_opacity = 100;
			_opacity = _opacity/100;
			
			_layer = parseInt($('input[id=index]').val());
			if(isNaN(_layer))
					_layer = 0;
			alert(_width + ' ' +_height + ' ' + _color + ' '+ _file);
		});
		
		$('div[id=cursor]').click(function(e){
			createDiv(e);
		});
		
		$('div[class=ef]').click(function(e){
			createDiv(e);
		});
		
		$('div[id=editorField]').mousemove(function(e){
			cursorEveryFrame(e);
		});
		
		$('div[id=cursor').mousemove(function(e){
			cursorEveryFrame(e);
			
		});
		
});