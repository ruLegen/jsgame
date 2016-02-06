var shot = false;
var currentAmmo = 6;
var totalAmmo = 18;

$(document).click(function(event){
	
		
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
			if(currentAmmo > 0 && !shot)
			{
				currentAmmo --;
			}
		}
	}
$('#panell3').text(currentAmmo + ' / ' + totalAmmo );
	
});


$(document).ready(function(){
	
	window.setInterval(function(){
		
			if(currentAmmo == 0 && totalAmmo > 0)
			{
				shot = true;
				window.setTimeout(function(){
					
				totalAmmo -= 9;
				currentAmmo += 9;
				shot = false;
				},5000);
			}
	},2);
	
});
			
			