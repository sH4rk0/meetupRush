/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../MURgame.ts"/>
/// <reference path="../States/GameState.ts"/>

module MUR {
//
    export enum PlayerStates { IDLE, RUNNING, JUMPING }

    export class Player extends Phaser.Sprite {

        game: Phaser.Game;
        gameState: GameState;


        private playerSpeed: number;
        currentState: PlayerStates;

        private lastRate: number;
        private timer: Phaser.Timer;
        private lastSpeed: number;
        private leftButton: Phaser.Key;
        private rightButton: Phaser.Key;
        private upButton: Phaser.Key;

        private btnLeft: Phaser.Sprite;
        private btnRight: Phaser.Sprite;

        private cursors: Phaser.CursorKeys;
        private lastX: number;
        private lastTap: number;

        id: number;

        anim: Array<Phaser.Animation>;

        private isPlayer: boolean;
        pAvatar: number;
        pFrames: number;

        constructor(game: Phaser.Game, gameState: GameState, id: number, name: string, isPlayer: boolean, startX: number, startY: number, avatar: number) {


            super(game, startX, startY, "players");

            this.game = game;
            this.id = id;
            this.name = name;
            this.gameState = gameState;
            this.isPlayer = isPlayer;
            this.lastRate = 0;
            this.playerSpeed = 0;

            this.anim = new Array;


            this.scale.set(2);

            this.game.physics.arcade.enable(this);
            //var avatar:number=MURgame.getAvatar();

            //console.log("avatar:" + avatar);
            var frames: any = [
                [[0, 1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13]],
                [[14, 15, 16, 17, 18, 19, 20, 21], [22, 23, 24, 25, 26, 27]],
                [[28, 29, 30, 31, 32, 33, 34, 35], [36, 37, 38, 39]],
                [[42, 43, 44, 45, 46, 47, 48, 49], [50, 51, 52, 53]]
            ];
            var anim = this.animations.add("idle", frames[avatar][1], 5 + (game.rnd.integerInRange(1, 3)), true);
            this.anim.push(anim);
            anim = this.animations.add("run", frames[avatar][0], 0, true);
            this.anim.push(anim);

            this.anim[PlayerStates.IDLE].play();
            this.currentState = PlayerStates.IDLE;

            if (this.isPlayer) {

                this.alpha = 1;
                //if mobile adapt controls
                if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {

                    this.gameState.introRoad.inputEnabled = true;
                    this.gameState.introRoad.events.onInputDown.add(this.tapInput, this);

                }
                else {

                    this.cursors = this.game.input.keyboard.createCursorKeys();

                    this.leftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                    this.leftButton.onDown.add(this.arrowLeft, this);

                    this.rightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                    this.rightButton.onDown.add(this.arrowRight, this);

                }

            }
            else {

                this.alpha = 0.3;

            }

            //console.log("groupPlayer length:" + gameState.playerGroup.length);
            if (gameState.playerGroup.length) { }
            game.add.existing(this);

        }



        update() {

            if(this.isPlayer){

                 if (this.x > this.gameState.goal-150) {

                getFbInstance().setWinner(this.id);
                this.gameState.gameOver();
                }

            }
           

        }

        arrowLeft() {

            if (!MUR.getStartRun()) return;
            this.clickRate(0);

        }

        arrowRight() {
            if (!MUR.getStartRun()) return;
            this.clickRate(1);

        }


        tapInput(tile, point) {

            if (!MUR.getStartRun()) return;

            if (this.lastTap == undefined) {

                this.lastTap = point.x;
                this.clickRate(0);

            } else {

                if (point.x > this.lastTap) {

                    if ((point.x - this.lastTap) > 80) { this.clickRate(this.nextRate()) } else { this.clickRate(this.lastRate) }

                } else {

                    if ((this.lastTap - point.x) > 80) { this.clickRate(this.nextRate()) } else { this.clickRate(this.lastRate) }

                }

                this.lastTap = point.x;

            }



        }

        nextRate(): number {

            if (this.lastRate == 0) { return 1 } else { return 0 }

        }



        clickRate(key) {
            //console.log(key);
            if (this.lastRate != key) {

                this.lastRate = key;
                this.increaseSpeed(this.game);
                this.anim[PlayerStates.IDLE].stop();
                this.anim[PlayerStates.RUNNING].next(1);
                this.currentState = PlayerStates.RUNNING;

            } else if (this.lastRate == key) {

                this.resetSpeed();

            }

        }



        resetSpeed() {

            this.playerSpeed = 0;
            //this.lastTap=undefined;
            this.lastSpeed == null
            this.anim[PlayerStates.RUNNING].stop();
            this.anim[PlayerStates.IDLE].play();
            this.currentState = PlayerStates.IDLE;

        }

        increaseSpeed(game) {
            if (this.lastSpeed == null) {

                this.lastSpeed = 0;

            } else {

                var speed = this.game.time.time - this.lastSpeed;
                this.lastSpeed = this.game.time.time;

                if (speed < 99) { this.playerSpeed = 5; }
                if (speed < 149 && speed >= 100) { this.playerSpeed = 4 }
                if (speed < 199 && speed >= 150) { this.playerSpeed = 3 }
                if (speed < 249 && speed >= 200) { this.playerSpeed = 2 }
                if (speed < 299 && speed >= 250) { this.playerSpeed = 1 }
                if (speed >= 300) { this.playerSpeed = 0 }

                this.checkIdle(game);
                this.checkSpeed();

            }
        }


        checkSpeed() {

            if (this.playerSpeed == 0) { }
            else if (this.playerSpeed == 1) { this.x += 12; }
            else if (this.playerSpeed == 2) { this.x += 14; }
            else if (this.playerSpeed == 3) { this.x += 16; }
            else if (this.playerSpeed == 4) { this.x += 18; }
            else if (this.playerSpeed == 5) { this.x += 20; }


            if (this.lastX != this.x) {
                this.lastX = this.x;
                var _obj: any = { active:true, id: this.id, name: this.name, x: this.x, y: this.y }
                getFbInstance().setUserData(this.id, _obj);
            }



        }

        checkIdle(game) {

            if (this.timer != undefined) this.timer.destroy();
            this.timer = this.game.time.create(false);
            this.timer.add(150, this.resetSpeed, this);
            this.timer.start();

        }



    }

}