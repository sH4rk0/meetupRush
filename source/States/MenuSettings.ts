/// <reference path="../Lib/phaser.d.ts"/>


module MUR {
    export class MenuSettings extends Phaser.State {

        private backBtn: Phaser.Sprite;
        private resetBtn: Phaser.Sprite;
        private logoGroup: Phaser.Group;
        private menuBg: Phaser.TileSprite;


        constructor() {

            super();



        }

        preload() {

        }




        create() {


            this.menuBg = this.game.add.tileSprite(0, 0, 1024, 600, 'menu-background');
            this.game.add.sprite(0, 0, "menu-trasparency");


            var _style: any = { font: 'normal 50px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            var _nameTxt = this.game.add.text(this.game.world.centerX, 75, "Settings", _style);
            _nameTxt.font = 'Press Start 2P';
            _nameTxt.anchor.set(.5);



            this.backBtn = this.game.add.sprite(512, 550, this.game.cache.getBitmapData('startBtn'));
            this.backBtn.anchor.setTo(0.5);
            var _spriteText = this.game.add.text(0, 0, 'BACK', { fill: '#ffffff' });
            _spriteText.anchor.set(0.5);
            this.backBtn.addChild(_spriteText);
            this.backBtn.inputEnabled = true;
            this.backBtn.events.onInputDown.add(function () { MUR.goState("Menu", this.game); }, this);





            var _reset = this.game.add.text(10, 200, 'Reset ALL', { fill: '#ffffff' });
            _reset.inputEnabled = true;
            _reset.events.onInputDown.add(function () { getFbInstance().sendReset(); }, this);

            var _resetLogged = this.game.add.text(10, 240, 'Reset Logged', { fill: '#ffffff' });
            _resetLogged.inputEnabled = true;
            _resetLogged.events.onInputDown.add(function () { getFbInstance().removeAllLogged() }, this);

            var _resetPlayers = this.game.add.text(10, 280, 'Reset Players', { fill: '#ffffff' });
            _resetPlayers.inputEnabled = true;
            _resetPlayers.events.onInputDown.add(function () { getFbInstance().removeAllUsers() }, this);

            var _startGame = this.game.add.text(10, 320, 'Start Game', { fill: '#ffffff' });
            _startGame.inputEnabled = true;
            _startGame.events.onInputDown.add(function () { getFbInstance().startGame(); }, this);


        }

        update() {

            if (isGameReset()) { MUR.resetAll(); }
            this.menuBg.tilePosition.x -= 0.5;


        }



    }
}