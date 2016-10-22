/// <reference path="../Lib/phaser.d.ts"/>

module MUR{
    export class Boot extends Phaser.State{

        preload(){
         var bmd : Phaser.BitmapData = this.game.add.bitmapData(200,50);
			
            bmd.ctx.fillStyle="#ed1c40";
			
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('loadingBar', bmd);


			bmd = this.game.add.bitmapData(200,200);
			bmd.ctx.beginPath();
            bmd.ctx.fillStyle="#FFFFFF";
            bmd.ctx.strokeStyle="#FFF";
            bmd.ctx.lineWidth = 20;
            bmd.ctx.arc(bmd.width/2,bmd.height/2,50,0,2*Math.PI);
            bmd.ctx.closePath();
            bmd.ctx.fill();
            bmd.ctx.stroke();
			this.game.cache.addBitmapData('circleBtn', bmd);
			
			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#ed1c40';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('startBtn', bmd);
			
			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#ed1c40';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('button', bmd);


			bmd = this.game.add.bitmapData(1024,150);
			bmd.ctx.fillStyle = '#ed1c40';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 1024, 150);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('band', bmd);

			bmd = this.game.add.bitmapData(1024,40);
			bmd.ctx.fillStyle = '#ed1c40';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 1024, 40);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('band2', bmd);


        }

     create(){
           
           //console.log("boot create")
            this.game.stage.backgroundColor = '#000000';
			this.game.stage.disableVisibilityChange = true;
		    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		    this.game.stage.smoothed=false;
		    this.game.scale.pageAlignHorizontally = true;
    	    this.game.scale.pageAlignVertically = true;
		    this.game.state.start('Preloader');
            
           
        }
    }
}