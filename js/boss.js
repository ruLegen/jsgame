function Boss ()
{
	this.stepLength = 4;
	this.boss = $(boss);
	this.isDead = false;
	this.hittedCount = 0;
	this.maxHits = 50;
	this.x = 0;
	this.y = $('.human').position().top;
	this.walkSpeed = 5;
	this.img = "";
	this.dir = 1;
	this.imgDir = "img/";
	this.width = 500;
	this.height = 500;
	
	this.startFunction = function(){
		this.boss.css({
			"position":"absolution",
			"width": this.width,
			"height": this.height,
			"left":this.x,
			"top":this.y,
			"background":"url("+this.imgDir+this.img+")"
			
		});
	}
	
	this.updatePos = function(){
		this.boss.css("left",this.x);
	}
	this.setImg= function setImage(img){
		this.img = this.imgDir + img;
		this.boss.css({"background":"url("+this.img+")"});			//“ут будет блок босса
	}
	this.kill = function(){
		this.isDead = true;
		this.setImg('');									//“”т люба€ картинка при смерти
	}
	
	this.hitted = function (){
		if(this.hittedCount < this.maxHits)
		{
			this.hittedCount++;
		}
		else
		{
			this.kill();
		}
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
	
	this.startFunction();
}

