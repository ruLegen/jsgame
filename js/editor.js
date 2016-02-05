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
var _path;
var _y;
var canDelete=false;
function createDiv(e)
{	
		
			_x = e.pageX;
			_y = e.pageY;
				
			if(state == 'block')
			{
				$('div[id=editorField]').append("<div id=block" + blockCount + "></div>" + "\n");
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
				$('div[id=editorField]').append("<div id=block" + blockCount + "></div>" + "\n");
				var obj = $("div[id=block"+blockCount+']');
				obj.css({
					"width" : _width,
					"height" : _height,
					"left": _x,
					"top":_y,
					"position":"absolute",
					"background-image": "url("+_path+"/"+_file+")",
					"background-size": "contain",
					"opacity": _opacity,
					"z-index": _layer
					});
				obj.addClass("ef")
			}
			blockCount++;
			

}


function cursorEveryFrame(e)
{
			_x = e.pageX;
			_y = e.pageY;
				
			if(state == 'block')
			{
				
				var obj = $("div[id=cursor]");
				obj.css({
					"width" : _width,
					"height" : _height,
					"left": _x,
					"top":_y,
					"position":"absolute",
					"backgroundColor": _color,
					"background-blend-mode":"overlay",
					"opacity":"0.5"
					});
			}
			
			if(state == 'picture')
			{
				var obj = $("div[id=cursor]");
					
				obj.css({
					"width" : _width,
					"height" : _height,
					"left": _x,
					"top":_y,
					"position":"absolute",
					"background":"",
					"background-image": "url("+_path+"/"+_file+")",
					"background-blend-mode":"overlay",
					"background-size":"contain",
					"opacity":"0.5"
					});

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
			"Ширина <input id='_width' size='6' type='textbox' value='250'/></h1></br></br>"+
			"Высота <input id='_height' size='6' type='textbox'value='250'/></h1></br></br>"+
			"Путь <input id='path' size='10' type='textbox'value='img'/></br></br>"+
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
					_layer = 1;
			_path = $('input[id=path]').val();
				//alert(_width + ' ' +_height + ' ' + _color + ' '+ _file);
		});
		
		$('div[id=cursor]').mousedown(function(e){
			
		
		});
		
		$('#editorField').mousedown(function(e){
			if(!canDelete)
			createDiv(e);
		
			$('div[class=ef]').mousedown(function(event){
				if(canDelete)
				{
				 $(this).remove();		
				}
				/* else
				{
					createDiv(event);
				} */
			});
			
		});
	
	
		$('div[id=editorField]').mousemove(function(e){
			cursorEveryFrame(e);
		});
		
		$('div[id=cursor').mousemove(function(e){
			cursorEveryFrame(e);
			
		});
		
		$(document).keyup(function(e){
			var key = e.keyCode;
			canDelete = !canDelete;
			if(canDelete)
			{
				$('div[id=cursor]').hide();
				$('#del').show();
			}
			else
			{
				$('div[id=cursor]').show();
				$('#del').hide();
			}
		});
	
	
		$('#exportBtn').click(function(){
			
			var newWin = window.open("http://www.w3schools.com");
			newWin.document.write($('div[id=editorField]').html());
			
		});
});