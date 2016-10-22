
/// <reference path="../Lib/phaser.d.ts"/>


module MUR {
        export class GameState extends Phaser.State {


                private introSky: Phaser.TileSprite;
                private introCloud1: Phaser.TileSprite;
                private introCloud2: Phaser.TileSprite;
                private introRocks: Phaser.TileSprite;
                public introRoad: Phaser.TileSprite;

                private playerObj: rsvp;

                public ground: Phaser.Sprite;
                public player: Player;

                public playerGroup: Phaser.Group;
                public backGroup: Phaser.Group;


                private readyText: Phaser.Text;
                private readyOnce: boolean = true;
                private readyOnceEnd: boolean = true;
                private currentPlayerExist: boolean = false;
                private startBtn: Phaser.Sprite;

                private startX: number;
                private startY: number;

                public goal: number = settings.goalDistance;
                public fb: initFb;

                constructor() {

                        super();

                }

                preload() { }

                create() {


                        this.startX = this.game.rnd.integerInRange(50, 60);
                        this.startY = this.game.rnd.integerInRange(320, 440);
                        this.game.world.setBounds(0, 0, this.goal, 600);

                        this.playerObj = MUR.getPlayerObj();

                        MUR.setGameState(this);
                        MUR.setGameStarted(true);

                        this.game.physics.startSystem(Phaser.Physics.ARCADE);

                        this.backGroup = this.game.add.group();

                        this.introSky = this.game.add.tileSprite(0, -50, 1024, 650, 'introSky');
                        this.introSky.fixedToCamera = true;

                        this.introCloud1 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud1');
                        this.introCloud1.fixedToCamera = true;
                        this.introCloud1.tilePosition.x = 0;

                        this.introCloud2 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud2');
                        this.introCloud2.fixedToCamera = true;
                        this.introCloud2.tilePosition.x = 0;

                        this.introRocks = this.game.add.tileSprite(0, 298, 1024, 96, 'introRocks');
                        this.introRocks.fixedToCamera = true;

                        this.introRoad = this.game.add.tileSprite(0, 331, 20000, 269, 'introRoad');
                        this.introRoad.fixedToCamera = false;
                        this.backGroup.addMultiple([this.introSky, this.introCloud1, this.introCloud2, this.introRocks, this.introRoad]);

                        var _style: any = { font: 'normal 30px', fill: '#ffffff', stroke: '#1d5779', strokeThickness: 5 };
                        var _nameTxt = this.game.add.text(10, 10, this.playerObj.name, _style);
                        _nameTxt.font = 'Press Start 2P';
                        _nameTxt.fixedToCamera = true;

                        _style = { font: 'normal 56px', fill: '#ffff00', stroke: '#fd8708', strokeThickness: 10 };
                        this.readyText = this.game.add.text(530, this.game.world.height / 2, 'GET READY!', _style);
                        this.readyText.font = 'Press Start 2P';
                        this.readyText.anchor.set(0.5);
                        this.readyText.alpha = 0;
                        this.game.add.tween(this.readyText).to({ alpha: 1 }, 500, Phaser.Easing.Quadratic.In, true, 300);


                        this.playerGroup = this.game.add.group();

                        //this.game.add.sprite(1200,300,this.game.cache.getBitmapData('circleBtn'));

                        this.fb = MUR.getFbInstance();

                        this.fb.setUserData(this.playerObj.id, { active:true, id: this.playerObj.id, name: this.playerObj.name, x: this.startX, y: this.startY, avatar: MUR.getAvatar() });
                        this.fb.getAll();

                }

                update() {

                        this.introCloud1.tilePosition.x -= 0.27;
                        this.introCloud2.tilePosition.x -= 0.13;

                        //make it only one time                
                        if (MUR.getStartRun() && this.readyOnce) {

                                this.readyOnce = false;
                                this.readyText.text = "GO!!!!";
                                this.readyText.fill = "#00ff00";
                                this.readyText.stroke = "#1d9a00"
                                this.game.add.tween(this.readyText).to({ alpha: 0 }, 1000, Phaser.Easing.Quadratic.In, true, 1000);

                                if (this.startBtn != undefined) this.startBtn.destroy();


                        }

                        if (MUR.isGameEnded() && this.readyOnceEnd) {

                                this.gameOver();
                        }


                }


                gameOver() {


                        this.currentPlayerExist = false;
                        this.readyOnceEnd = true;
                        this.readyOnce = true;
                        this.startBtn = undefined;

                        MUR.setGameStarted(false);
                        MUR.setGameEnded(false);
                        MUR.setStartRun(false);
                        MUR.goState("GameOver", this.game);


                };


                addStartBtn() {

                        //check for me
                        //if (this.playerObj.id != 199420979) return;
                        // if settings.playerIdStarter is set with a valid meetup user id attach the start only to this user
                        if(settings.playerIdStarter!=-1 && this.playerObj.id!=settings.playerIdStarter) return;

                        //if(this.playerGroup.length>1) return;

                        this.startBtn = this.game.add.sprite(800, 100, this.game.cache.getBitmapData('startBtn'));
                        this.startBtn.anchor.setTo(0.5);

                        var _spriteText = this.game.add.text(0, 0, 'START', { fill: '#ffffff' });

                        _spriteText.anchor.set(0.5);
                        this.startBtn.addChild(_spriteText);

                        this.startBtn.inputEnabled = true;
                        this.backGroup.add(this.startBtn);
                        this.startBtn.events.onInputDown.add(function (context: Phaser.Sprite) {

                                var fb: initFb = MUR.getFbInstance();
                                fb.startGame();
                                context.kill();
                                context.destroy();

                        }, this.startBtn);


                }


                render() {

                        // this.game.debug.cameraInfo(this.game.camera, 500, 32);
                        // this.game.debug.spriteCoords(this.player, 32, 32);


                }






                public manageData(data: any): void {


                        if (data.id === this.player.id) return;
                        var _sprite: Player = this.playerGroup.iterate("id", data.id, 2);

                        _sprite.anim[PlayerStates.IDLE].stop();
                        _sprite.anim[PlayerStates.RUNNING].next(1);
                        _sprite.currentState = PlayerStates.RUNNING;
                        _sprite.x = data.x;
                        _sprite.checkIdle(this.game);

                }


                public addPlayer(data: any): void {

                        if(!data.active) return;

                        var _plId = MUR.getPlayerId();
                        // console.log(_plId,this.currentPlayerExist)
                        if (data.id == _plId) {

                                if (!this.currentPlayerExist) {
                                        this.currentPlayerExist = true;
                                        //console.log("add Player c",data);
                                        this.player = new Player(this.game, this, data.id, data.name, true, this.startX, this.startY, MUR.getAvatar());
                                        this.game.camera.follow(this.player);

                                        //console.log(this.currentPlayerExist)
                                        this.playerGroup.add(this.player)
                                        //console.log("groupPlayer length:" + this.playerGroup.length);  
                                        if (this.startBtn == undefined) { this.addStartBtn(); }

                                }
                        } else {
                                //console.log("add Player o",data);
                                var _new: Player = new Player(this.game, this, data.id, data.name, false, data.x, data.y, data.avatar);
                                this.playerGroup.add(_new)
                                //console.log("groupPlayer length:" + this.playerGroup.length);

                                if (this.startBtn == undefined) { this.addStartBtn(); }

                        }

                        this.resortGroup();

                        console.log("groupPlayer length:" + this.playerGroup.length);
                }




                public addPlayers(data: any): void {

                        if(!data.active) return;

                        var _plId = MUR.getPlayerId();
                        //console.log(_plId,this.currentPlayerExist)
                        if (data.id == _plId) {
                                //current player

                                if (!this.currentPlayerExist) {
                                        console.log("add Players c", data)
                                        this.player = new Player(this.game, this, data.id, data.name, true, this.startX, this.startY, MUR.getAvatar());
                                        this.game.camera.follow(this.player);
                                        this.currentPlayerExist = true;

                                        this.playerGroup.add(this.player)
                                        //console.log("groupPlayer length:" + this.playerGroup.length);
                                        if (this.startBtn == undefined) { this.addStartBtn(); }
                                }

                        } else {
                                //other player
                                //console.log("add Players o",data)

                                var _new: Player = new Player(this.game, this, data.id, data.name, false, data.x, data.y, data.avatar);
                                this.playerGroup.add(_new)
                                //console.log("groupPlayer length:" + this.playerGroup.length);
                                if (this.startBtn == undefined) { this.addStartBtn(); }
                        }

                        this.resortGroup();
                        console.log("groupPlayer length:" + this.playerGroup.length);
                }

                resortGroup(): void {

                        this.playerGroup.customSort(

                                function (a: Player, b: Player) {

                                        if (a.y < b.y) { return -1 } else if (a.y > b.y) { return 1 } else { return 0 }

                                }, this)

                }



        }//end class

}//end module