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

			bmd = this.game.add.bitmapData(20,189);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 20, 189);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('goal', bmd);

			


        }

     create(){
           
           
            this.game.stage.backgroundColor = '#000000';
			let _stillFocus = MUR.getUrlParameter("stillFocus") ? true : false;
			
			this.game.stage.disableVisibilityChange = _stillFocus;

		    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		    this.game.stage.smoothed=false;
		    this.game.scale.pageAlignHorizontally = true;
    	    this.game.scale.pageAlignVertically = true;
		    this.game.state.start('Preloader');


/*
			this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
   

		
			var fragmentSrc = [
            "precision mediump float;",
            // Incoming texture coordinates. 
            'varying vec2 vTextureCoord;',
            // Incoming vertex color
            'varying vec4 vColor;',
            // Sampler for a) sprite image or b) rendertarget in case of game.world.filter
            'uniform sampler2D uSampler;',

            "uniform vec2      resolution;",
            "uniform float     time;",
            "uniform vec2      mouse;",

            "void main( void ) {",
            //"colorRGBA = (y % 2) * texel(u,v);",
           // "gl_FragColor = mod(gl_FragCoord.y,2.0) * texture2D(uSampler, vTextureCoord);",

		   "gl_FragColor = vColor(0.0, 0.58, 0.86, 1.0);",
            "}"
        ];

        var filter = new Phaser.Filter(this.game, null, fragmentSrc);
        this.game.stage.filters = [filter];
     
    */       
        }
	
	 gameResized(width:number, height:number) {}

     enterIncorrectOrientation () {}

     leaveIncorrectOrientation () {}



    }





}