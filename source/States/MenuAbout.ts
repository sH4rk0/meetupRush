/// <reference path="../Lib/phaser.d.ts"/>


module MUR{
    export class MenuAbout extends Phaser.State{

        private backBtn:Phaser.Sprite;
        private logoGroup:Phaser.Group;
        private menuBg:Phaser.TileSprite;
      

        constructor(){

            super();

	
				
        }

        preload(){

        }




        create(){

             
           this.menuBg= this.game.add.tileSprite(0,0,1024,600, 'menu-background');
            this.game.add.sprite(0,0,"menu-trasparency");


            var _style:any={font: 'normal 50px', fill: '#ffffff', stroke:'#000000', strokeThickness:5};
            var _nameTxt = this.game.add.text(this.game.world.centerX,75, "ABOUT", _style);
                _nameTxt.font='Press Start 2P';
                _nameTxt.anchor.set(.5);


             _style={font: 'normal 18px', fill: '#ffffff', stroke:'#000000', strokeThickness:0};
            var _aboutTxt = this.game.add.text(this.game.world.centerX,160, "This game was made using the following technologies", _style);
                _aboutTxt.font='Press Start 2P';
                _aboutTxt.anchor.set(.5);

          
                var _logo1:Phaser.Sprite = this.game.add.sprite(0,0,"logo-meetup");
                _logo1.anchor.set(0);
               
                 var _logo2:Phaser.Sprite = this.game.add.sprite(150,0,"logo-js");
                 _logo2.anchor.set(0);
                 
                  var _logo3:Phaser.Sprite = this.game.add.sprite(300,0,"logo-firebase");
                  _logo3.anchor.set(0);
                  
                   var _logo4:Phaser.Sprite = this.game.add.sprite(450,0,"logo-typescript");
                   _logo4.anchor.set(0);
                   
                    var _logo5:Phaser.Sprite = this.game.add.sprite(600,0,"logo-vscode");
                    _logo5.anchor.set(0);
                    
                     var _logo6:Phaser.Sprite = this.game.add.sprite(750,0,"logo-phaser");
                     _logo6.anchor.set(0);
                    
                    
                    this.logoGroup= this.game.add.group();
                     this.logoGroup.addMultiple([_logo1,_logo2,_logo3,_logo4,_logo5,_logo6]);

                     this.logoGroup.y=250;
                     this.logoGroup.x=80;


            this.backBtn=this.game.add.sprite(this.game.world.centerX,550,this.game.cache.getBitmapData('startBtn'));
		    this.backBtn.anchor.setTo(0.5);
	   			
	   		var _spriteText=this.game.add.text(0,0, 'BACK', { fill: '#ffffff'});
			   
			_spriteText.anchor.set(0.5);
			this.backBtn.addChild(_spriteText);
			   
	   		this.backBtn.inputEnabled = true;
			this.backBtn.events.onInputDown.add(function(){ MUR.goState("Menu",this.game); }, this);



            
  }

 update() {

            if(isGameReset()){ MUR.resetAll(); }
            this.menuBg.tilePosition.x -= 0.5;


        }


		
    }
}