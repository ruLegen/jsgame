var stop = false; 
var _left=0 ;  
var _top; 
var _height; 
var step = 9; 
var borderCam = 350; 
var camOffset = 0; 
var camOffsetRight = 0; 
var dir; // ����������� ��� �������� 
var name = ""; 
var divsLng = 0; // ����������� DIV �� ��� 
var ids = []; // idDivo� 
var divs; // ��� DIV� 
var shift = false; 
var isOnPortal = false; 
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
  var humanPosition = parseInt($('.human').position().left) + parseInt($('.human').css("width"))/2; //��������� �������� + �������� ������ 
   for(var i = 0; i < ids.length; i++) 
   { 

var portalPos = $('div[id='+ids[i]+']').position().left //���� ��������� ������� 
    var portalWidth = parseInt( $('div[id='+ids[i]+']').css("width")); //������ ������� 
    if(humanPosition > portalPos && humanPosition < portalPos + portalWidth) 
    { 
     window.location.href = ids[i] + '.html'; 
     return true; 
    } 
   } 
} 


function portalCheck() 
{ 
  var humanPosition = parseInt($('.human').position().left) + parseInt($('.human').css("width"))/2; //��������� �������� + �������� ������ 
   for(var i = 0; i < ids.length; i++) 
   { 

   var portalPos = parseInt($('div[id='+ids[i]+']').position().left); //���� ��������� ������� 
    var portalWidth = parseInt( $('div[id='+ids[i]+']').css("width")); //������ ������� 
   
   if(humanPosition > portalPos && humanPosition < portalPos + portalWidth) 
     return true; 
   } 
} 

$(document).ready(function() { 
   
 document.body.style.overflow = "hidden"; 
    window.scrollTo(window.pageXOffset,document.documentElement.clientHeight/3,5); 

    checkDivs(); 
 // ��� �����.. ��� 
  $(document).keyup(function(e){ 
  var key = e.keyCode; 

switch(key) 
  { 
   case 16: shift = !shift;break; 
  } 
  if(shift) 
  {  
   step = 20;  
   $('#panell').css('background-image', "url('img/run.bmp')");  
  }  
  else 
  {  
   step = 9;  
   $('#panell').css('background-image', "url('')");  
  }  

}); 
     
  
  $(document).keydown(function(e){ 
 var key = e.keyCode; 
  if(!stop) 
	{ 
		switch(key) 
		{ 
			case 68: _left+=step; dir = 1;break; 
			case 65: 
			if($('.human').position().left > 0) 
			{_left-= step;} 
			dir = 0; 
			$('.human').css('background-image', "url('img/walk_revers.gif')");break; 
		
			} 
		
		if(key == 68 || key == 65) 
		switch(dir) 
		{ 
			case 1:$('.human').css('background-image', "url('img/walk.gif')");break; 
			case 0:$('.human').css('background-image', "url('img/walk_revers.gif')");break 
		} 
		
		var _clientWidth = document.documentElement.clientWidth; //������ ���������� ����� 
		
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
		
		isOnPortal = portalCheck(); 
		
		if(isOnPortal) 
		{ 
		$('#panell2').css('background-image',"url('img/dor.bmp')") 
		} 
		else 
		{ 
		$('#panell2').css('background-image',"url('*')") 
		} 
		// ������� �� �� ������� 
		if(key == 69) 
		{ 
		goToPortal(); 
		} 

}); 

$(document).keyup(function(e){ 
 stop = false; 
 $('.human').css('background-image', "url('img/1.png')"); 
 }); 

}); 


function parallax(){ 
    var scrolled = $(window).scrollLeft(); 
$('.back1').css('left', +(scrolled) + 'px'); 
 } 

function parallax(){ 
    var scrolled = $(window).scrollLeft(); 
    $('.back1').css('left', +(scrolled * 0.5) + 'px'); 
 } 
$(window).scroll(function(e){ 
    parallax(); 
 window.scrollTo(window.pageXOffset,document.documentElement.clientHeight/3,5); 

});