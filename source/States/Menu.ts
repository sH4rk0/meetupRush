/// <reference path="../Lib/phaser.d.ts"/>


module MUR {
    export class Menu extends Phaser.State {

        private startBtn: Phaser.Sprite;
        private aboutBtn: Phaser.Sprite;
        private settingsBtn:Phaser.Sprite;
        private logoGroup: Phaser.Group;

        private player1: Phaser.Sprite;
        private player2: Phaser.Sprite;
        private player3: Phaser.Sprite;
        private player4: Phaser.Sprite;

        private players: Array<Phaser.Sprite>;
        private menuBg: Phaser.TileSprite;
      

        private avatarsGroup: Phaser.Group;

        constructor() {

            super();

        }

        preload() {}

        create() {




            this.players = new Array;
            this.game.world.setBounds(0, 0, 1024, 600);

            this.menuBg = this.game.add.tileSprite(0, 0, 1024, 600, 'menu-background');
            this.menuBg.fixedToCamera = true;
            this.game.add.sprite(0, 0, "menu-trasparency");

            var bigLogo: Phaser.Sprite = this.game.add.sprite(this.game.world.centerX, 10, "meetup-big");
            bigLogo.scale.set(0.75);
            bigLogo.anchor.set(0.5, 0);
            bigLogo.alpha = 0;
            this.game.add.tween(bigLogo).to({ alpha: 1 }, 1000, Phaser.Easing.Quadratic.In, true, 300);

            let band: Phaser.Sprite = this.game.add.sprite(0, 330, this.game.cache.getBitmapData('band'));
            band.alpha = 0;
            this.game.add.tween(band).to({ alpha: 0.3 }, 1000, Phaser.Easing.Quadratic.In, true, 0);

            let band2: Phaser.Sprite = this.game.add.sprite(0, 440, this.game.cache.getBitmapData('band2'));
            band2.alpha = 0;
            this.game.add.tween(band2).to({ alpha: 0.3 }, 1000, Phaser.Easing.Quadratic.In, true, 0);


            var _style: any = { font: 'normal 50px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            var _nameTxt = this.game.add.text(0, 160, "RUSH", _style);
            _nameTxt.alpha = 0;
            _nameTxt.font = 'Press Start 2P';

            this.game.add.tween(_nameTxt).to({ alpha: 1, x: 520 }, 1000, Phaser.Easing.Bounce.Out, true, 1000);

            _style = { font: 'normal 20px', fill: '#ffffff', stroke: '#000000', strokeThickness: 0 };
            var _nameTxt2: Phaser.Text = this.game.add.text(335, 275, "Choose your avatar", _style);
            _nameTxt2.setShadow(1, 1, 'rgba(0,0,0,0.75)', 2);
            _nameTxt2.font = 'Press Start 2P';
            _nameTxt2.alpha = 1;

            var _logoutTxt = this.game.add.text(10, 10, "logout", _style);
            _logoutTxt.alpha = 1;
            _logoutTxt.setShadow(1, 1, 'rgba(0,0,0,0.75)', 2);
            _logoutTxt.font = 'Press Start 2P';
            _logoutTxt.inputEnabled = true;
            _logoutTxt.events.onInputDown.add(function () {

                MUR.logout(this.game);


            }, this);


            var pframes: any = [
                [[0, 1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13]],
                [[14, 15, 16, 17, 18, 19, 20, 21], [22, 23, 24, 25, 26, 27]],
                [[28, 29, 30, 31, 32, 33, 34, 35], [36, 37, 38, 39]],
                [[42, 43, 44, 45, 46, 47, 48, 49], [50, 51, 52, 53]]
            ];
            var positions: any = [150, 350, 550, 750]

            this.avatarsGroup = this.game.add.group();
            for (var _p: number = 0; _p < 4; _p++) {


                this.players.push(this.game.add.sprite(positions[_p], 330, "players"));

                this.players[_p].scale.set(2);
                this.players[_p].animations.add("idle", pframes[_p][1], 8, true);
                this.players[_p].animations.add("run", pframes[_p][0], 12, true);
                this.players[_p].play("idle");
                this.players[_p].inputEnabled = true;
                this.players[_p].alpha = 0;
                this.players[_p].angle = _p;

                this.game.add.tween(this.players[_p]).to({ alpha: 0.5 }, 1000, Phaser.Easing.Quadratic.In, true, 300 * _p);

                this.players[_p].events.onInputDown.add(function (_sprite: Phaser.Sprite) {



                    this.setPlayerAlpha();
                    _sprite.alpha = 1;
                    _sprite.play("run");
                    MUR.setAvatar(_sprite.angle);
                    this.startBtn.alpha = 1;
                    this.startBtn.inputEnabled = true;

                }, this);

                this.avatarsGroup.add(this.players[_p]);

            }


            this.startBtn = this.game.add.sprite(512, 550, this.game.cache.getBitmapData('startBtn'));
            this.startBtn.anchor.setTo(0.5);
            var _spriteText = this.game.add.text(0, 0, 'PLAY', { fill: '#ffffff' });
            this.startBtn.alpha = 0.5;

            _spriteText.anchor.set(0.5);
            this.startBtn.addChild(_spriteText);

            this.startBtn.inputEnabled = false;
            this.startBtn.events.onInputDown.add(function () { 

                getFbInstance().removeAllWinners();
               // getFbInstance().setWinner(0);      
                goState("Game", this.game); 
            
        }, this);


            this.aboutBtn = this.game.add.sprite(994, 30, "about-btn");
            this.aboutBtn.anchor.setTo(0.5);
            this.aboutBtn.inputEnabled = true;
            this.aboutBtn.events.onInputDown.add(function () { MUR.goState("MenuAbout", this.game); }, this);

            this.settingsBtn = this.game.add.sprite(950, 30, "settings-btn");
            this.settingsBtn.anchor.setTo(0.5);
            this.settingsBtn.inputEnabled = true;
            this.settingsBtn.events.onInputDown.add(function () { MUR.goState("MenuSettings", this.game); }, this);

         


   

        }

        update() {

           
            if(isGameReset()){ MUR.resetAll(); }
            this.menuBg.tilePosition.x -= 0.5;


        }


        setPlayerAlpha() {

            for (var _p: number = 0; _p < 4; _p++) {
                this.players[_p].alpha = 0.5;
                this.players[_p].play("idle");
            }

        }






    }
}