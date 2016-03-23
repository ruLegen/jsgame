var human =""
var bossStart = 3300;
var whenBossSpawn = 3000;
var boss = "";
var i = 0;
var allowShot = true;
function onLoadDocument()
{
	var human = $('.human');
}
function Boss ()
{
	
	this.width = 500;
	this.height = 500;
	this.stepLength = 4;
	this.boss = $('boss');
	this.isDead = false;
	this.hittedCount = 0;
	this.maxHits = 3;
	this.x = bossStart;
	this.y = parseInt($('.human').position().top -(this.height-$('.human').height()));
	this.walkSpeed = 5;
	this.damagePersent = this.width / (this.maxHits + 1);
	this.dir = 1;
	
	this.img = "huileft.gif";
	this.imgDir = "img/";
	this.fullDir = this.imgDir+this.img;
	
	this.deathImg = "death.gif?" + Math.random(0,999);
	this.deathFullDir = this.imgDir+this.deathImg;
	
	this.updatePos = function(){
		this.boss.css("left",this.x);
		this.boss.css("top",this.y);
		
	}

	
	this.setPos = function(x)
	{
		this.x = x;
		this.updatePos();
		//this.y = y;   //пока не надо
	}
	
	
	
		this.setImg= function setImage(img){
		this.boss.css({"background":"url("+img+")"});			//“ут будет блок босса
	}
	this.kill = function(){
		this.isDead = true;
		this.setImg(this.deathFullDir);									//“”т люба€ картинка при смерти
	}
	
	this.hitted = function (){														///при попадании
		var tempBoss = this;
		var timeID = setTimeout(function(){
			if(!tempBoss.isDead)
			{
				$("#green").animate(
				{
					width : $("#green").width() - tempBoss.damagePersent
				},100);
			}
			if(tempBoss.hittedCount < tempBoss.maxHits)
			{
				tempBoss.hittedCount++;
			}
			else
			{
				tempBoss.kill();
				$("#health").hide(500);
			}
			
			clearTimeout(timeID);
			},400);
	}
	
	this.moveBy = function(){
		if(this.dir == 1)
		{
			this.x -= this.stepLength;
			
		}
		else
		{
			this.y += this.stepLength;
		}
		this.updatePos();
	}
	this.startFunction = function ff(){
	
		if($('boss').length == 0)
		{
			$('body').append('<boss></boss>');
			$('boss').append("<div id ='health'></div>");
			$('#health').append("<div id ='red'></div>");
			$('#health').append("<div id ='green'></div>");
			$('#health').css({
				"position" : "relative",
				"width" : this.width,
				"height" : "20px",
				"border-radius" : "4px"
			});
			$('#red').css({
				"position":"inherit",
				"width" : this.width,
				"height" : "20px",
				"border-radius" : "4px",
				"background" : "#DE0D0D"
			});
			$('#green').css({
				"position":"inherit",
				"width" : this.width,
				"height" : "20px",
				"top":-20,
				"border-radius" : "4px",
				"background" : "#19CC49"
			});
			this.boss = $('boss');
		}
		else
			alert("пожалуйста удалите из html документа все теги <boss></boss>");
		
		this.boss.css({
			"position":"absolute",
			"width": this.width,
			"height": this.height,
			"left":this.x,
			"top":this.y,
			"z-index":8,
			"background":"url("+this.fullDir+")"
		});
	}
	this.startFunction();
	
	var tempBoss = this;  	// для того что бы можно было делать
	
	$('boss').click(function(){
		//var timeID = setTimeout(function(){allowShot = true;},500);
	
				if(mouse == 1 && currentAmmo > 0 && !humanDead)							///////////застрял здесь
					{
						allowShot = false;
						tempBoss.hitted();
						//clearTimeout(timeID);
					}
			});
	
}

$(document).ready(function(){
	onLoadDocument();
	var intervalID = setInterval(function(){
		if($('.human').position().left > whenBossSpawn )// && (maxEnemy - countKilledEnemy) <= 0) //shot
		{
			boss = new Boss();
			clearInterval(intervalID);
		}
	},2);
});