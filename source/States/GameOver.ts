
/// <reference path="../Lib/phaser.d.ts"/>


module MUR {
    export class GameOver extends Phaser.State {

        private startBtn: Phaser.Sprite;

        constructor() {

            super();


        }


        create() {

            setGameOver(this);
            setGameState(null);
            getFbInstance().getWinners();
            getFbInstance().removeUser(getPlayerId());

            this.game.world.setBounds(0, 0, 1024, 600);
            this.game.add.tileSprite(0, 0, 1024, 600, 'menu-background');
            this.game.add.sprite(0, 0, "menu-trasparency");

            

            var replayBtn: Phaser.Sprite = this.game.add.sprite(512, 550, this.game.cache.getBitmapData('startBtn'));
            replayBtn.anchor.setTo(0.5);
            replayBtn.alpha = 0;

            var _spriteText = this.game.add.text(0, 0, 'RE-PLAY', { fill: '#ffffff' });
            _spriteText.anchor.set(0.5);
            replayBtn.addChild(_spriteText);


            replayBtn.events.onInputDown.add(function () { setGameOver(null); MUR.goState("Menu", this.game); }, this);

            var tween: Phaser.Tween = this.game.add.tween(replayBtn).to({ alpha: 1 }, 1000, Phaser.Easing.Quadratic.In, true, 300);
            tween.onComplete.add(function () {

                replayBtn.inputEnabled = true;
            }, replayBtn)

        }

        setResult(_position:number): void {

            console.log("set result" + _position);

            var _style: any;
            var _result: string = "";
            var _y:number=0;

            if (_position <= settings.winners) {
                _style = { font: 'normal 56px', fill: '#00ff00', stroke: '#ffffff', strokeThickness: 10 };
                _result = "You win!";

                var medal: Phaser.Sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+100, settings.winnersAwards[_position-1]);
                medal.anchor.setTo(0.5);
                medal.alpha = 0;
                _y=100;
                this.game.add.tween(medal).to({ alpha: 1, y:this.game.world.centerY }, 500, Phaser.Easing.Bounce.Out, true, 500);

            } else {
                _style = { font: 'normal 56px', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 10 };
                _result = "You Lose!";
                _y=0;

            }

             var _gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY-_y, _result, _style);
                _gameOverText.fixedToCamera = false;
                _gameOverText.alpha=0;
                _gameOverText.font = 'Press Start 2P';
                _gameOverText.anchor.set(0.5);

            this.game.add.tween(_gameOverText).to({ alpha: 1 }, 500, Phaser.Easing.Quadratic.In, true, 500);


        }

        update() {

            if (isGameReset()) { MUR.resetAll(); }

        }


    }


}