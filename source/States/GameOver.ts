
/// <reference path="../Lib/phaser.d.ts"/>


module MUR {
    export class GameOver extends Phaser.State {

        private startBtn: Phaser.Sprite;

        constructor() {

            super();


        }


        create() {

            this.game.world.setBounds(0, 0, 1024, 600);
            this.game.add.tileSprite(0, 0, 1024, 600, 'menu-background');
            this.game.add.sprite(0, 0, "menu-trasparency");

            var _style: any;
            var _result: string = "";

            if (MUR.getWinner() === MUR.getPlayerId()) {
                _style = { font: 'normal 56px', fill: '#00ff00', stroke: '#ffffff', strokeThickness: 10 };
                _result = "You win!"

            } else {
                _style = { font: 'normal 56px', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 10 };
                _result = "You Lose!"

            }


            var _gameOverText = this.game.add.text(512, this.game.world.height / 2, _result, _style);
            _gameOverText.fixedToCamera = false;
            _gameOverText.font = 'Press Start 2P';
            _gameOverText.anchor.set(0.5);


            var replayBtn: Phaser.Sprite = this.game.add.sprite(512, 550, this.game.cache.getBitmapData('startBtn'));
            replayBtn.anchor.setTo(0.5);
            replayBtn.alpha = 0;

            var _spriteText = this.game.add.text(0, 0, 'RE-PLAY', { fill: '#ffffff' });
            _spriteText.anchor.set(0.5);
            replayBtn.addChild(_spriteText);


            replayBtn.events.onInputDown.add(function () { MUR.goState("Menu", this.game); }, this);

            var tween: Phaser.Tween = this.game.add.tween(replayBtn).to({ alpha: 1 }, 1000, Phaser.Easing.Quadratic.In, true, 300);
            tween.onComplete.add(function () {

                replayBtn.inputEnabled = true;
            }, replayBtn)



            var fb = MUR.getFbInstance();
            fb.resetGame();









        }












    }


}