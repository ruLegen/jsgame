//window.history.replaceState(null,"э22","game.html");
var globalID = 0;
var Enemyes = new Array();
var mouse = 0;
var position = 0;
var stop = false; 
var _left=0 ;  
var humanDead = false;
var _top; 
var _height; 
var step = 9; 
var borderCam = 650; 
var camOffset = 0; 
var camOffsetRight = 0; 
var dir; // направление для анимации 
var name = ""; 
var divsLng = 0; // колличество DIV на стр 
var ids = []; // idDivoв 
var divs; // все DIVы 
var shift = false; 
var isOnPortal = false; 
var borderLeft = 0;
var state = 0;
var countEnemy = 0;

var countKilledEnemy = 0;
var maxEnemy = 0;
var availableNextLvl = false;

////////////////////////////////////////////////////////// Ниже для боевой системы
var shot = false;
var currentAmmo = 6;
var totalAmmo = '&infin;';
var maxAmmo = 6;
var seqOfInput = new Array();
var isReload = false;
var rightCombination = new Array('R','J','Z');

function findEnemy(mas,id)
{
	for(var i = 0; i < mas.length;i++)
	{
		
		if(mas[i].id == id)
		{
			var enemy = mas[i];
			
			if(enemy.direction == dir)
				$("#gameover").remove();
				mas[i].kill();
				humanDead = false;
				
		}
	}
}
///////////////////////////////////////////////////////////класс врага

function Enemy(){
	this.x = 882;
	this.y = $('.human').position().top;
	this._id = globalID;
	this.id = 'enemy'+ this._id;
	
//	this.number = _id;
	this.attack = false;
	this.stop = false;
	this.imgDir = "img/";
	this.image = this.imgDir + "huileft.gif";
	this.direction = 0;
	this.width =190;
	this.isDead = false;
	
	
	this.setImg= function setImage(img){
		this.image = this.imgDir + img;
		$('#enemy'+this._id).css({"background":"url("+this.image+")"});
	}
	this.kill = function(){
	
		if(!this.isDead)
		{
		if(this.direction == 0)
		this.setImg('death1.gif?' + Math.random(0,999));
		if(this.direction == 1)
		this.setImg('death.gif?'  + Math.random(0,999));
		var posY = $('#enemy' + this._id).position().top;
		$('#enemy' + this._id).css("top",posY + 5) ;
		}
			this.isDead = true;
		countKilledEnemy++;
		$('#panell5').text('Осталось врагов ' + (maxEnemy - countKilledEnemy));
		
	}
	this.setPos = function pos(_x){
		this.x = _x;
		//this.y = _y;	
	}
	
	this.setRandLeft = function randLeft(){
		var maxLeft = 0;
		var minLeft = window.pageXOffset;
		this.direction = 0;
		this.setImg('huiright.gif');
		return Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
	}
	
	this.setRandRight = function randRight(){
		var maxRight = parseInt($('#floor').css("width")) + borderCam + 50;
		var minRight =  window.pageXOffset + document.body.clientHeight;
		this.direction = 1;
		this.setImg('huileft.gif');
		return Math.floor(Math.random() * (maxRight - minRight + 1)) + minRight;
	}
	
	this.posBy = function mvBy(x){
		this.x += x;
		$('#enemy' + this._id).css("left",this.x);
	}
	
	
	this.add = function _add(){
		var rand = Math.random();		
		if(rand > 0.5)					// случайно спавним либо левее игрока либо правее
			{
				var leftPos = this.setRandLeft();		//лево
				this.setPos(leftPos);
			}
		if(rand < 0.5)
			{
				var rightPos = this.setRandRight();
				this.setPos(rightPos);
			}
		this._id = globalID;
		globalID++;
		$('div[class=enemy]').append("<div id="+'enemy' + this._id+"></div>");
		$('#enemy' + this._id).css({
			"left": this.x,
			"top" : this.y-85,
			"width": this.width+50,
			"height": "378",
			"position":"absolute",
			"background": "url("+this.image+")",
			"z-index": "9"});
	}
	this.add();
	
	this.move = function(){
		
		if(!this.isDead && !humanDead)
		{
				if(this.direction == 0)
				{
					if(this.x + this.width < $('.human').position().left)
					{
						this.posBy(15);
					}		
				}
			
				if(this.direction == 1)
				{
					
					if(this.x > $('.human').position().left + parseInt($('.human').css("width")))
					{
						this.posBy(-15);
					}
				}
				
		}
	}
	
}

function fight(){
step = 9;
$('#panell').css('background-image', "url('')");
	if(mouse == 0)
	{
		$('body').css({"cursor":'crosshair'});
		mouse = 1;
	}
		else
	{	
		$('body').css({"cursor":'auto'});
		mouse = 0;
	}

} 
$(window).resize(function(){ 

  //window.scrollTo(window.pageXOffset,document.documentElement.clientHeight/3); 
   // alert(""); 
}); 

function checkDivs() 
{ 
  divsLng =  $('div').length; 
  divs = $('div'); 

	for(var i = 0; i < divsLng; i++) 
	{ 
	 var did = divs[i].id; 
	 if(did[0] == 'P') 
		{ 
			ids.push(did);
		} 
	// alert("ok " + i +"  "+ did + "  " + $('div[id='+did+']').position().left); 
	} 

} 

function goToPortal() 
{ 
  var humanPosition = parseInt($('.human').position().left) + parseInt($('.human').css("width"))/2; //положение человека + половина ширины 
   for(var i = 0; i < ids.length; i++) 
   { 

		var portalPos = $('div[id='+ids[i]+']').position().left //край положения портала 
		var portalWidth = parseInt( $('div[id='+ids[i]+']').css("width")); //ширина портала 
		if(humanPosition > portalPos && humanPosition < portalPos + portalWidth) 
		{ 
			window.location.href = ids[i] + '.html'; 
			return true; 
		} 
   } 
} 


function portalCheck() 
{ 
  var humanPosition = parseInt($('.human').position().left) + parseInt($('.human').css("width"))/2; //положение человека + половина ширины 
   for(var i = 0; i < ids.length; i++) 
   { 

	var portalPos = parseInt($('div[id='+ids[i]+']').position().left); //край положения портала 
	var portalWidth = parseInt( $('div[id='+ids[i]+']').css("width")); //ширина портала 
	
	if(humanPosition > portalPos && humanPosition < portalPos + portalWidth) 
		return true; 
   } 
} 
function createBorder()
{
	borderLeft = parseInt($('#floor').css("width")) - (borderCam+30);
}

function gameOver()
{
	humanDead = true;
	$('body').append("<div id='gameover'></div>");
	$('#gameover').hide();
	$('#gameover').css({
		"position":"absolute",
		"width": 400,
		"height": 75,
		"background": 'rgba(2, 142, 155, 0.41)',
		"left":$('.human').position().left -180,
		"top":$('.human').position().top -120,//+parseInt($('.human').css('height'))+ 120,//document.documentElement.clientHeight/2,
		"z-index":9999999,
		"border-radius":'5px',
		'border-style' :'outset',
		'border-color':'rgba(115, 203, 189, 0.870588)'
	},500);
	$('#gameover').append("<p class='txt' id = 'yes'>Заново?</p>");
	$('#gameover').append("<p class='txt' id = 'no'>Нет!</p>");
	
	$('#yes').css({
		"left":"25",
		'width': 25*8,
	});
	
	$('#no').css({
		"left":"260",
		'width': 25*4,
	});
	
	
		
	$('.txt').css({
		"position": 'inherit',
		"font-size": '48',
		"color": "rgba(0, 255, 106, 0.84)",
		'top':"-42",
		'text-align':'center'
		});
	
	$('.txt').mouseover(function(){
		$(this).css({
			"background":"rgba(39, 174, 176, 0.34)",
			'cursor':'cell',
			"border-radius":'5px',
			'border-style' :'outset',
			'border-color':'rgba(39, 174, 176, 0.34)'
		});

	});
	
	$('.txt').mouseleave(function(){
		$(this).css({
			"background":"",
			'cursor':'default',
			"border-radius":'0',
			'border-style' :'none',
			'border-color':''
		});
	});
	$('#yes').click(function(){
		$(this).css('border-color','rgba(39, 174, 176, 1)');
		setTimeout(function(){
			window.location = '/PIndex.html';
		},100);
	});
	
	$('#no').click(function(){
		$(this).css('border-color','rgba(39, 174, 176, 1)');
		setTimeout(function(){
			alert("Ну и зря");
			window.location = 'gameover.html';
		},100);
	});
	
	$('#gameover').show("slow");	
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() { 
	
	maxEnemy = parseInt($('#numberOfEnemies').val());
	$('#panell5').text('Осталось врагов ' + (maxEnemy - countKilledEnemy));
	createBorder();
	document.body.style.overflow = "hidden"; 
	window.scrollTo(window.pageXOffset,document.documentElement.clientHeight/3.5); 

    checkDivs(); 
 // для шифта.. Бег 
  $(document).keyup(function(e){ 
  var key = e.keyCode; 

	switch(key) 
	{ 
	case 16: shift = !shift; break; 
	} 
	if(shift) 
	{
		if(mouse == 1){
			step = 9;
			$('#panell').css('background-image', "url('')");
		}
		
		else{  
		step = 20;  
		$('#panell').css('background-image', "url('img/run.bmp')");
		}  
	}  
	else 
	{  
		step = 9;  
		$('#panell').css('background-image', "url('')");  
	}  
	
}); 
     
  
  $(document).keydown(function(e){ 
  if(!humanDead){
	  
  
 var key = e.keyCode; 
 if(key==70)
	{
		fight();
	}
  if(!stop) 
	{ 
		switch(key) 
		{ 
			case 68: 
			if($('.human').position().left < borderLeft)
				_left+=step; 
			dir = 1; 
			position = 0; 
			break; 
			
			
			case 65: position = 1; 
			if($('.human').position().left > 0) 
				_left-= step;
			dir = 0; 
			$('.human').css('background-image', "url('img/walk_revers.gif')");
			break; 
		
			} 
		
		if(key == 68 || key == 65) 
		switch(dir) 
		{ 
			case 1: if(mouse==0)
				$('.human').css('background-image', "url('img/walk.gif')");
				else
				$('.human').css('background-image', "url('img/gun.gif')");
				break; 
			case 0: if(mouse==1)
				$('.human').css('background-image', "url('img/gunr.gif')");
				else
				$('.human').css('background-image', "url('img/walk_revers.gif')");break 
		} 
		
		var _clientWidth = document.documentElement.clientWidth; //Ўирина клиентской частм 
		
		//$().scrollTo(document); 
		if($('.human').position().left >(_clientWidth + window.pageXOffset - borderCam)) 
		{ 
		
			window.scrollBy(step,0); 
		} 
		
		if($('.human').position().left <(window.pageXOffset + borderCam)) 
		{ 
			window.scrollBy(-step,0); 
		} 
		
		$('.human').offset({left:_left}); 
	} 
		
		isOnPortal = portalCheck() * availableNextLvl; 
		
		if(isOnPortal) 
		{ 
			$('#panell2').css('background-image',"url('img/dor.bmp')") 
		} 
		else 
		{ 
			$('#panell2').css('background-image',"url('*')") 
		} 
		// переход на др локацию 
		if(key == 69 && availableNextLvl) 
		{ 
		goToPortal(); 
		} 
}
}); 

$(document).keyup(function(e){ 

 stop = false; 
var key = String.fromCharCode(e.keyCode);

 if(mouse==1)
{
	if(position==0)
	{
		$('.human').css('background-image', "url('img/2.png')");
	}
	else
	{
		$('.human').css('background-image', "url('img/3.png')");
	}
}
else
 $('.human').css('background-image', "url('img/1.png')"); 
/* 
 
	if(seqOfInput.length != 3) // если в массиве больше 3 Инпутов
	{
	
		if(key == 'R' || key == 'J' || key == 'Z') // если нажата одна из этих клавиш
		{
		seqOfInput.push(key); 						//то записываем в массив
		}
		else
			seqOfInput = new Array();				//иначе обнуляем его

		//иначе обнуляем его
	}
	
	if(seqOfInput.length == 3)
	{
		for(var i = 0; i < seqOfInput.length; i++)
		{
			if(seqOfInput[i] == rightCombination[i] && i == 2)
			{*/
		if(mouse == 1 && currentAmmo < maxAmmo) // если дробовик
			{ 
				switch(key)
				{
					case 'R':state = 1;break;
					case 'J':if(state == 1) state = 2; else state = 0;break;
					case 'Z':if(state == 2){isReload = true;currentAmmo++;} else state = 0; break;
					default:state = 0;
					
				}
			}/* 	
			}

		}
		seqOfInput = new Array();
	} */

 }); 

 
 
 
                                                                                               
 
 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Боевая часть //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$(document).click(function(event){
	
	
if(currentAmmo > 0 && !humanDead) // если патронов больше 0
{
				
	if(mouse == 1)				//если дробовик
	{
		stop = true;  //остановить персонажа
		if(!shot)			//если не стреляет
		{
			var audio = new Audio(); // Создаём новый элемент Audio 
			audio.src = 'sound/shot2.wav'; // Указываем путь к звуку "клика" 
			audio.autoplay = true; // Автоматически запускаем 
			shot = true;
			if(dir == 0) //и смотрит влево
			{
	
				$('.human').css('width', parseInt($('.human').css('width')) + 20 );
				$('.human').css('background-image', "url('img/shot_left.gif')");
				
				
				
				window.setTimeout(function()
				{
					$('.human').css('width', parseInt($('.human').css('width')) - 20);
					
					if(dir == 0)
						$('.human').css('background-image', "url('img/3.png')");
					if(dir == 1)
						$('.human').css('background-image', "url('img/2.png')");
					
					shot = false; //стрелять закончил
					stop = false; // остановился
				},700);
	
				
			}
			////////////////////////////////////////////////////////////////////////////////
			if(dir == 1) //и смотрит влево
			{
				
				$('.human').css('width', parseInt($('.human').css('width')) + 20 );
				$('.human').css('background-image', "url('img/shot_right.gif')");
				
				
				window.setTimeout(function()
				{
					$('.human').css('width', parseInt($('.human').css('width')) - 20);
					
					if(dir == 0)
						$('.human').css('background-image', "url('img/3.png')");
				        if(dir == 1)
						$('.human').css('background-image', "url('img/2.png')");
					shot = false;		
					stop = false;
				},700);
			}
			currentAmmo --;
		}
	/////////////////////////////////////////////////////////////////////////////////////
	}
}
	
});


$(document).ready(function(){
		
		window.setInterval(function(){
		/*
			if(currentAmmo == 0 && totalAmmo > 0)
			{
				shot = true;
				window.setTimeout(function(){
					
				totalAmmo -= 6;
				currentAmmo += 6;
				shot = false;
				},5000);
			}
			*/
			
			$('#panell4').html(seqOfInput[seqOfInput.length - 1]);
			
			
			$('#panell3').html(currentAmmo + ' / ' + totalAmmo );
			
				if(isReload) // если перезарядка 
				{
					isReload = false;
					shot = true;
					stop = true;
					$('.human').css('background-image', "url('img/res.gif')");
					window.setTimeout(function(){
						if(dir == 1)
							$('.human').css('background-image', "url('img/2.png')");
						if(dir == 0)
							$('.human').css('background-image', "url('img/3.png')");
						
					shot = false;
					stop = false;
					
					},700);
					
				}
		//////////////////////////////////////////////////////GAME OVER
		 	if(Enemyes.length !=0 && !humanDead)
			{
				for(var i = 0; i < Enemyes.length; i++)
				{
					var enemy = Enemyes[i];
					if(!enemy.isDead && !humanDead)
					{
						
						if(enemy.direction == 0)
							if($('#'+enemy.id).position().left + enemy.width>= $('.human').position().left)
							{
								gameOver();
							}
							
						if(enemy.direction == 1)
							if($('#'+enemy.id).position().left <= $('.human').position().left + parseInt($('.human').css('width')))
							{
								gameOver();
							}
					}
				}
			} 
	},2);
	

	window.setInterval(function(){
		
		if(countEnemy < 7 && !humanDead && countKilledEnemy != maxEnemy)
		{
			Enemyes[Enemyes.length] = new Enemy();
			countEnemy++;
			
			$('div[id ^= enemy]').on("click",function(){
				var thisEnemy = this;
				if(mouse == 1 && currentAmmo > 0 && !humanDead)
				{
					window.setTimeout(function(){ 
				
					
					countEnemy --;
					findEnemy(Enemyes,thisEnemy.id);
					if(countKilledEnemy == maxEnemy)
					{
						availableNextLvl = true;
					}
					thisEnemy.unbind("click");
					},400); 
				}
			});
 			
		}
		
					
					
	},9000);
	
	
	
	window.setInterval(function(){
		
				if(Enemyes.length != 0)
					{ 
						for(var i = 0; i < Enemyes.length;i++)
						{					
							Enemyes[i].move();
						}
					}
	},40);
	
});
			
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 
 
}); 


function parallax(){ 
    var scrolled = $(window).scrollLeft(); 
$('.back1').css('left', +(scrolled) + 'px'); 
$('#floory2').css('left', +(scrolled) + 'px');
 } 

function parallax(){ 
    var scrolled = $(window).scrollLeft(); 
    $('.back1').css('left', +(scrolled * 0.5) + 'px');
    $('#floory2').css('left', +(scrolled * 0.1) + 'px'); 
 } 
$(window).scroll(function(e){ 
    parallax(); 
 window.scrollTo(window.pageXOffset,Math.floor(document.documentElement.clientHeight/3));
});

