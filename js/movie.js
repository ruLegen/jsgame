var mouse = 0;
var position = 0;
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
var borderLeft = 0;


////////////////////////////////////////////////////////// ���� ��� ������ �������
var shot = false;
var currentAmmo = 6;
var totalAmmo = '&infin;';
var maxAmmo = 6;
var seqOfInput = new Array();
var isReload = false;
var rightCombination = new Array('R','J','Z');



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
function createBorder()
{
	borderLeft = parseInt($('#floor').css("width")) - (borderCam+30);
}






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() { 

	createBorder();
	document.body.style.overflow = "hidden"; 
	window.scrollTo(window.pageXOffset,document.documentElement.clientHeight/3.5); 

    checkDivs(); 
 // ��� �����.. ��� 
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

 
	if(seqOfInput.length != 3) // ���� � ������� ������ 3 �������
	{
	
		if(key == 'R' || key == 'J' || key == 'Z') // ���� ������ ���� �� ���� ������
		{
		seqOfInput.push(key); 						//�� ���������� � ������
		}
		else
			seqOfInput = new Array();				//����� �������� ���

		//����� �������� ���
	}
	
	if(seqOfInput.length == 3)
	{
		for(var i = 0; i < seqOfInput.length; i++)
		{
			if(seqOfInput[i] == rightCombination[i] && i == 2)
			{
				if(mouse == 1 && currentAmmo < maxAmmo) // ���� ��������
				{
					isReload = true;
					currentAmmo++;
				}
			}

		}
		seqOfInput = new Array();
	}

 }); 

 
 
 
 
 
 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//������ ����� //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

$(document).click(function(event){
	
	
if(currentAmmo > 0) // ���� �������� ������ 0
{
				
	if(mouse == 1)				//���� ��������
	{
		stop = true;  //���������� ���������
		if(!shot)			//���� �� ��������
		{
			var audio = new Audio(); // ������ ����� ������� Audio 
			audio.src = 'sound/shot2.wav'; // ��������� ���� � ����� "�����" 
			audio.autoplay = true; // ������������� ��������� 
			shot = true;
			if(dir == 0) //� ������� �����
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
					
					shot = false; //�������� ��������
					stop = false; // �����������
				},700);
	
				
			}
			////////////////////////////////////////////////////////////////////////////////
			if(dir == 1) //� ������� �����
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
			
				if(isReload) // ���� ����������� 
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
					
					},400);
					
				}
				
	},2);
	
});
			
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 
 
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