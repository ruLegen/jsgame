var human =""
var bossStart = 3300;
var whenBossSpawn = 1000;
var bossClass = "";
var i = 0;
var allowShot = true;
var timeoutID = 0;
var timerID = -6;
var boss = "";
function onLoadDocument()
{
	var human = $('.human');
}
function Boss ()
{	bossClass = this;
	this.allowMove = true;
	this.killed = false;
	this.width = 330;
	this.height = 410;
	this.stepLength = 0.5;
	this.boss = $('boss');
	this.isDead = false;
	this.hittedCount = 0;
	this.maxHits = 30;
	this.x = bossStart;
	this.y = parseInt($('.human').position().top -(this.height-$('.human').height()));
	this.walkSpeed = 5;
	this.damagePersent = this.width / (this.maxHits + 1);
	this.dir = 1;
	this.canMove = true;
	this.img = "bossAppear.png";
	this.imgDir = "img/";
	this.fullDir = this.imgDir+this.img;
	
	this.deathImg = "bossDeath.gif?" + Math.random(0,999);
	this.deathFullDir = this.imgDir+this.deathImg;
	
	this.updatePos = function(){
		this.boss.css("left",this.x);
		this.boss.css("top",this.y);
		
	}

	this.leftPos = function(){
		return $('boss').position().left;
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
		this.allowMove = false;
		clearInterval(timerID);
		this.setImg(this.deathFullDir);									//“”т люба€ картинка при смерти
		this.killed  = true;
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
				tempBoss.allowMove = false;
				tempBoss.hittedCount++;
				tempBoss.setImg("img/bossAppear.png");
				var tmID = setTimeout(function(){tempBoss.allowMove = true;clearTimeout(tmID)},400);
				
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
		if(this.dir == 1 && this.allowMove)
		{
			this.x -= this.stepLength;
			
		}
		else if(this.dir == 0 && this.allowMove)
		{
			this.x += this.stepLength;
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
				"top": -20,
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

			"z-index": 8,
			"background-repeat":"norepeat",
			"background":"url("+this.fullDir+")"
		});
		
		 timerID = setInterval(function(){
		
				if($('.human').position().left + $('.human').width() > boss.leftPos() && !boss.killed && !humanDead)
				{
					humanDead = true;
					
					$('.human').hide();
					$('boss').css("width",463);
					bossClass.setImg('img/humanDeathBoss.gif');
					bossClass.allowMove = false;
					clearInterval(timerID);
					
				}
				else if(!boss.killed && boss.allowMove && !humanDead)
				{
					if(bossClass.allowMove == false)
						bossClass.allowMove = true;
					boss.moveBy();
					boss.setImg("img/boss_walk.gif");
				}
				else if(humanDead)
				{
					bossClass.setImg('img/bossAppear.png');
					bossClass.allowMove = false;
					//clearInterval(timerID);
				}
				
			},2);
	}
	this.startFunction();
	
	var tempBoss = this;  	// для того что бы можно было делать
	
	$('boss').click(function(){
		
		if(mouse == 1 && currentAmmo > 0 && !humanDead && allowShot)							
			{
				allowShot = false;
				tempBoss.hitted();
				timeoutID = setTimeout(function(){
					allowShot = true;
					clearTimeout(timeoutID);
				},700);
			}
	});
}

$(document).ready(function(){
	onLoadDocument();
	var intervalID = setInterval(function(){
		if($('.human').position().left > whenBossSpawn )// && (maxEnemy - countKilledEnemy) <= 0) //shot
		{
			boss = new Boss();
			setTimeout(function(){},300);		//просто ждем чуть чуть
			clearInterval(intervalID);
			
		}
	},2);
});