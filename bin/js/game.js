var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../Lib/phaser.d.ts"/>
var MUR;
(function (MUR) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.call(this);
        }
        Menu.prototype.preload = function () { };
        Menu.prototype.create = function () {
            this.players = new Array;
            this.game.world.setBounds(0, 0, 1024, 600);
            this.menuBg = this.game.add.tileSprite(0, 0, 1024, 600, 'menu-background');
            this.menuBg.fixedToCamera = true;
            this.game.add.sprite(0, 0, "menu-trasparency");
            var bigLogo = this.game.add.sprite(this.game.world.centerX, 10, "meetup-big");
            bigLogo.scale.set(0.75);
            bigLogo.anchor.set(0.5, 0);
            bigLogo.alpha = 0;
            this.game.add.tween(bigLogo).to({ alpha: 1 }, 1000, Phaser.Easing.Quadratic.In, true, 300);
            var band = this.game.add.sprite(0, 330, this.game.cache.getBitmapData('band'));
            band.alpha = 0;
            this.game.add.tween(band).to({ alpha: 0.3 }, 1000, Phaser.Easing.Quadratic.In, true, 0);
            var band2 = this.game.add.sprite(0, 440, this.game.cache.getBitmapData('band2'));
            band2.alpha = 0;
            this.game.add.tween(band2).to({ alpha: 0.3 }, 1000, Phaser.Easing.Quadratic.In, true, 0);
            var _style = { font: 'normal 50px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            var _nameTxt = this.game.add.text(0, 160, "RUSH", _style);
            _nameTxt.alpha = 0;
            _nameTxt.font = 'Press Start 2P';
            this.game.add.tween(_nameTxt).to({ alpha: 1, x: 520 }, 1000, Phaser.Easing.Bounce.Out, true, 1000);
            _style = { font: 'normal 20px', fill: '#ffffff', stroke: '#000000', strokeThickness: 0 };
            var _nameTxt2 = this.game.add.text(335, 275, "Choose your avatar", _style);
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
            var pframes = [
                [[0, 1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13]],
                [[14, 15, 16, 17, 18, 19, 20, 21], [22, 23, 24, 25, 26, 27]],
                [[28, 29, 30, 31, 32, 33, 34, 35], [36, 37, 38, 39]],
                [[42, 43, 44, 45, 46, 47, 48, 49], [50, 51, 52, 53]]
            ];
            var positions = [150, 350, 550, 750];
            this.avatarsGroup = this.game.add.group();
            for (var _p = 0; _p < 4; _p++) {
                this.players.push(this.game.add.sprite(positions[_p], 330, "players"));
                this.players[_p].scale.set(2);
                this.players[_p].animations.add("idle", pframes[_p][1], 8, true);
                this.players[_p].animations.add("run", pframes[_p][0], 12, true);
                this.players[_p].play("idle");
                this.players[_p].inputEnabled = true;
                this.players[_p].alpha = 0;
                this.players[_p].angle = _p;
                this.game.add.tween(this.players[_p]).to({ alpha: 0.5 }, 1000, Phaser.Easing.Quadratic.In, true, 300 * _p);
                this.players[_p].events.onInputDown.add(function (_sprite) {
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
                MUR.getFbInstance().removeAllWinners();
                // getFbInstance().setWinner(0);      
                MUR.goState("Game", this.game);
            }, this);
            this.aboutBtn = this.game.add.sprite(994, 30, "about-btn");
            this.aboutBtn.anchor.setTo(0.5);
            this.aboutBtn.inputEnabled = true;
            this.aboutBtn.events.onInputDown.add(function () { MUR.goState("MenuAbout", this.game); }, this);
            this.settingsBtn = this.game.add.sprite(950, 30, "settings-btn");
            this.settingsBtn.anchor.setTo(0.5);
            this.settingsBtn.inputEnabled = true;
            this.settingsBtn.events.onInputDown.add(function () { MUR.goState("MenuSettings", this.game); }, this);
        };
        Menu.prototype.update = function () {
            if (MUR.isGameReset()) {
                MUR.resetAll();
            }
            this.menuBg.tilePosition.x -= 0.5;
        };
        Menu.prototype.setPlayerAlpha = function () {
            for (var _p = 0; _p < 4; _p++) {
                this.players[_p].alpha = 0.5;
                this.players[_p].play("idle");
            }
        };
        return Menu;
    }(Phaser.State));
    MUR.Menu = Menu;
})(MUR || (MUR = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="Menu.ts"/>
var MUR;
(function (MUR) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.update = function () {
            if (MUR.isGameReset()) {
                MUR.resetAll();
            }
        };
        Preloader.prototype.preload = function () {
            this.game.load.onLoadStart.add(function () { }, this);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(function () {
                this.loadingBar.visible = false;
                this.loadingPerc.visible = false;
                this.startBtn.visible = true;
            }, this);
            //start button
            //--------------------------
            this.startBtn = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, this.game.cache.getBitmapData('startBtn'));
            this.startBtn.anchor.setTo(0.5);
            var _spriteText = this.game.add.text(0, 0, 'START', { fill: '#ffffff' });
            _spriteText.anchor.set(0.5);
            this.startBtn.addChild(_spriteText);
            this.startBtn.inputEnabled = true;
            this.startBtn.events.onInputDown.add(function () {
                MUR.goState("Menu", this.game);
            }, this);
            this.startBtn.visible = false;
            // this.loadingContainer.addChild(this.startBtn);
            //Loading container
            //--------------------------
            this.game.load.script('webfont', 'http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            //this.game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Marble.js');
            this.loadingBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, this.game.cache.getBitmapData('loadingBar'));
            this.loadingBar.anchor.setTo(0.5);
            this.loadingPerc = this.game.add.text(0, 0, '0%', { wordWrap: true, wordWrapWidth: this.loadingBar.width, fill: '#ffffff', stroke: '#ff0000', strokeThickness: 5 });
            this.loadingPerc.anchor.set(0.5);
            this.loadingBar.addChild(this.loadingPerc);
            this.game.load.setPreloadSprite(this.loadingBar);
            //Assets Load
            //--------------------------	
            // IMAGES		
            for (var i = 0; i < gameData.assets.images.length; i++) {
                this.game.load.image(gameData.assets.images[i].name, gameData.assets.images[i].path);
            }
            // SPRITESHEETS		
            for (var i = 0; i < gameData.assets.spritesheets.length; i++) {
                this.game.load.spritesheet(gameData.assets.spritesheets[i].name, gameData.assets.spritesheets[i].path, gameData.assets.spritesheets[i].width, gameData.assets.spritesheets[i].height, gameData.assets.spritesheets[i].frames);
            }
            //bitmap fonts
            for (var i = 0; i < gameData.assets.bitmapfont.length; i++) {
                this.game.load.bitmapFont(gameData.assets.bitmapfont[i].name, gameData.assets.bitmapfont[i].imgpath, gameData.assets.bitmapfont[i].xmlpath);
            }
            // SOUNDS		
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                this.game.load.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].paths);
            }
        };
        Preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) { this.loadingPerc.text = progress + "%"; };
        return Preloader;
    }(Phaser.State));
    MUR.Preloader = Preloader;
})(MUR || (MUR = {}));
/// <reference path="../Lib/phaser.d.ts"/>
var MUR;
(function (MUR) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            var bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = "#ed1c40";
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('loadingBar', bmd);
            bmd = this.game.add.bitmapData(200, 200);
            bmd.ctx.beginPath();
            bmd.ctx.fillStyle = "#FFFFFF";
            bmd.ctx.strokeStyle = "#FFF";
            bmd.ctx.lineWidth = 20;
            bmd.ctx.arc(bmd.width / 2, bmd.height / 2, 50, 0, 2 * Math.PI);
            bmd.ctx.closePath();
            bmd.ctx.fill();
            bmd.ctx.stroke();
            this.game.cache.addBitmapData('circleBtn', bmd);
            bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#ed1c40';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('startBtn', bmd);
            bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#ed1c40';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('button', bmd);
            bmd = this.game.add.bitmapData(1024, 150);
            bmd.ctx.fillStyle = '#ed1c40';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 150);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('band', bmd);
            bmd = this.game.add.bitmapData(1024, 40);
            bmd.ctx.fillStyle = '#ed1c40';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 40);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('band2', bmd);
            bmd = this.game.add.bitmapData(20, 189);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 20, 189);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('goal', bmd);
        };
        Boot.prototype.create = function () {
            this.game.stage.backgroundColor = '#000000';
            var _stillFocus = MUR.getUrlParameter("stillFocus") ? true : false;
            this.game.stage.disableVisibilityChange = _stillFocus;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.stage.smoothed = false;
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
        };
        Boot.prototype.gameResized = function (width, height) { };
        Boot.prototype.enterIncorrectOrientation = function () { };
        Boot.prototype.leaveIncorrectOrientation = function () { };
        return Boot;
    }(Phaser.State));
    MUR.Boot = Boot;
})(MUR || (MUR = {}));
/// <reference path="../Lib/phaser.d.ts"/>
var MUR;
(function (MUR) {
    var MenuAbout = (function (_super) {
        __extends(MenuAbout, _super);
        function MenuAbout() {
            _super.call(this);
        }
        MenuAbout.prototype.preload = function () {
        };
        MenuAbout.prototype.create = function () {
            this.menuBg = this.game.add.tileSprite(0, 0, 1024, 600, 'menu-background');
            this.game.add.sprite(0, 0, "menu-trasparency");
            var _style = { font: 'normal 50px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            var _nameTxt = this.game.add.text(this.game.world.centerX, 75, "ABOUT", _style);
            _nameTxt.font = 'Press Start 2P';
            _nameTxt.anchor.set(.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#000000', strokeThickness: 0 };
            var _aboutTxt = this.game.add.text(this.game.world.centerX, 160, "This game was made using the following technologies", _style);
            _aboutTxt.font = 'Press Start 2P';
            _aboutTxt.anchor.set(.5);
            var _logo1 = this.game.add.sprite(0, 0, "logo-meetup");
            _logo1.anchor.set(0);
            var _logo2 = this.game.add.sprite(150, 0, "logo-js");
            _logo2.anchor.set(0);
            var _logo3 = this.game.add.sprite(300, 0, "logo-firebase");
            _logo3.anchor.set(0);
            var _logo4 = this.game.add.sprite(450, 0, "logo-typescript");
            _logo4.anchor.set(0);
            var _logo5 = this.game.add.sprite(600, 0, "logo-vscode");
            _logo5.anchor.set(0);
            var _logo6 = this.game.add.sprite(750, 0, "logo-phaser");
            _logo6.anchor.set(0);
            this.logoGroup = this.game.add.group();
            this.logoGroup.addMultiple([_logo1, _logo2, _logo3, _logo4, _logo5, _logo6]);
            this.logoGroup.y = 250;
            this.logoGroup.x = 80;
            this.backBtn = this.game.add.sprite(this.game.world.centerX, 550, this.game.cache.getBitmapData('startBtn'));
            this.backBtn.anchor.setTo(0.5);
            var _spriteText = this.game.add.text(0, 0, 'BACK', { fill: '#ffffff' });
            _spriteText.anchor.set(0.5);
            this.backBtn.addChild(_spriteText);
            this.backBtn.inputEnabled = true;
            this.backBtn.events.onInputDown.add(function () { MUR.goState("Menu", this.game); }, this);
        };
        MenuAbout.prototype.update = function () {
            if (MUR.isGameReset()) {
                MUR.resetAll();
            }
            this.menuBg.tilePosition.x -= 0.5;
        };
        return MenuAbout;
    }(Phaser.State));
    MUR.MenuAbout = MenuAbout;
})(MUR || (MUR = {}));
/// <reference path="../Lib/phaser.d.ts"/>
var MUR;
(function (MUR) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.call(this);
            this.readyOnce = true;
            this.readyOnceEnd = true;
            this.currentPlayerExist = false;
            this.goal = settings.goalDistance;
        }
        GameState.prototype.preload = function () { };
        GameState.prototype.create = function () {
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
            var _goal = this.game.add.sprite(this.goal - 100, 411, this.game.cache.getBitmapData('goal'));
            _goal.alpha = 0.5;
            this.introRoad = this.game.add.tileSprite(0, 331, 20000, 269, 'introRoad');
            this.introRoad.fixedToCamera = false;
            this.backGroup.addMultiple([this.introSky, this.introCloud1, this.introCloud2, this.introRocks, this.introRoad, _goal]);
            var _style = { font: 'normal 30px', fill: '#ffffff', stroke: '#1d5779', strokeThickness: 5 };
            var _nameTxt = this.game.add.text(10, 10, this.playerObj.name, _style);
            _nameTxt.font = 'Press Start 2P';
            _nameTxt.fixedToCamera = true;
            _style = { font: 'normal 56px', fill: '#ffff00', stroke: '#fd8708', strokeThickness: 10 };
            this.readyText = this.game.add.text(530, this.game.world.centerY, 'GET READY!', _style);
            this.readyText.font = 'Press Start 2P';
            this.readyText.anchor.set(0.5);
            this.readyText.alpha = 0;
            this.game.add.tween(this.readyText).to({ alpha: 1 }, 500, Phaser.Easing.Quadratic.In, true, 300);
            this.playerGroup = this.game.add.group();
            var totTime = (Phaser.Timer.MINUTE * settings.timer.minute) + (Phaser.Timer.SECOND * settings.timer.second);
            var totTimeText = (60 * settings.timer.minute) + (settings.timer.second);
            _style = { font: 'normal 56px', fill: '#ffffff', stroke: '#0000ff', strokeThickness: 10 };
            this.timerText = this.game.add.text(700, 50, this.formatTime(totTimeText), _style);
            this.timerText.font = 'Press Start 2P';
            this.timerText.fixedToCamera = true;
            this.playerTimer = this.game.time.create();
            this.timerEvent = this.playerTimer.add(totTime, this.gameOver, this);
            MUR.getFbInstance().setUserData(this.playerObj.id, { active: true, id: this.playerObj.id, name: this.playerObj.name, x: this.startX, y: this.startY, avatar: MUR.getAvatar() });
            MUR.getFbInstance().getAll();
        };
        GameState.prototype.update = function () {
            if (MUR.isGameReset()) {
                MUR.resetAll();
            }
            this.introCloud1.tilePosition.x -= 0.27;
            this.introCloud2.tilePosition.x -= 0.13;
            //make it only one time                
            if (MUR.getStartRun() && this.readyOnce) {
                this.playerTimer.start();
                this.readyOnce = false;
                this.playerTimer.start();
                this.readyText.text = "GO!!!!";
                this.readyText.fill = "#00ff00";
                this.readyText.stroke = "#1d9a00";
                this.game.add.tween(this.readyText).to({ alpha: 0 }, 1000, Phaser.Easing.Quadratic.In, true, 1000);
                if (this.startBtn != undefined)
                    this.startBtn.destroy();
            }
            if (this.playerTimer.running) {
                this.timerText.text = this.formatTime(Math.round((this.timerEvent.delay - this.playerTimer.ms) / 1000));
            }
            /*if (isGameEnded() && this.readyOnceEnd) {

                    this.readyOnceEnd=false;
                    this.gameOver();
            }*/
        };
        GameState.prototype.formatTime = function (s) {
            var minutes = "0" + Math.floor(s / 60);
            var seconds = "0" + (s - minutes * 60);
            return minutes.substr(-2) + ":" + seconds.substr(-2);
        };
        GameState.prototype.gameOver = function () {
            console.log("game over");
            var _time = this.playerTimer.ms;
            this.playerTimer.stop();
            MUR.getFbInstance().setWinners(this.playerObj.id, { id: this.playerObj.id, time: _time });
            this.currentPlayerExist = false;
            this.readyOnceEnd = true;
            this.readyOnce = true;
            this.startBtn = undefined;
            //setGameStarted(false);
            //setGameEnded(false);
            //setStartRun(false);
            MUR.goState("GameOver", this.game);
        };
        ;
        GameState.prototype.addStartBtn = function () {
            return;
            //check for me
            //if (this.playerObj.id != 199420979) return;
            // if settings.playerIdStarter is set with a valid meetup user id attach the start only to this user
            if (settings.playerIdStarter != -1 && this.playerObj.id != settings.playerIdStarter)
                return;
            //if(this.playerGroup.length>1) return;
            this.startBtn = this.game.add.sprite(512, this.game.world.centerY + 80, this.game.cache.getBitmapData('startBtn'));
            this.startBtn.anchor.setTo(0.5);
            var _spriteText = this.game.add.text(0, 0, 'START', { fill: '#ffffff' });
            _spriteText.anchor.set(0.5);
            this.startBtn.addChild(_spriteText);
            this.startBtn.inputEnabled = true;
            this.backGroup.add(this.startBtn);
            this.startBtn.events.onInputDown.add(function (context) {
                MUR.getFbInstance().startGame();
                context.kill();
                context.destroy();
            }, this.startBtn);
        };
        GameState.prototype.render = function () {
            // this.game.debug.cameraInfo(this.game.camera, 500, 32);
            // this.game.debug.spriteCoords(this.player, 32, 32);
        };
        GameState.prototype.manageData = function (data) {
            if (data.id === this.player.id)
                return;
            var _sprite = this.playerGroup.iterate("id", data.id, 2);
            _sprite.anim[MUR.PlayerStates.IDLE].stop();
            _sprite.anim[MUR.PlayerStates.RUNNING].next(1);
            _sprite.currentState = MUR.PlayerStates.RUNNING;
            _sprite.x = data.x;
            _sprite.checkIdle(this.game);
        };
        GameState.prototype.addPlayer = function (data) {
            if (!data.active)
                return;
            var _plId = MUR.getPlayerId();
            // console.log(_plId,this.currentPlayerExist)
            if (data.id == _plId) {
                if (!this.currentPlayerExist) {
                    this.currentPlayerExist = true;
                    //console.log("add Player c",data);
                    this.player = new MUR.Player(this.game, this, data.id, data.name, true, this.startX, this.startY, MUR.getAvatar());
                    this.game.camera.follow(this.player);
                    //console.log(this.currentPlayerExist)
                    this.playerGroup.add(this.player);
                    //console.log("groupPlayer length:" + this.playerGroup.length);  
                    if (this.startBtn == undefined) {
                        this.addStartBtn();
                    }
                }
            }
            else {
                //console.log("add Player o",data);
                var _new = new MUR.Player(this.game, this, data.id, data.name, false, data.x, data.y, data.avatar);
                this.playerGroup.add(_new);
                //console.log("groupPlayer length:" + this.playerGroup.length);
                if (this.startBtn == undefined) {
                    this.addStartBtn();
                }
            }
            this.resortGroup();
            //console.log("groupPlayer length:" + this.playerGroup.length);
        };
        GameState.prototype.addPlayers = function (data) {
            if (!data.active)
                return;
            var _plId = MUR.getPlayerId();
            //console.log(_plId,this.currentPlayerExist)
            if (data.id == _plId) {
                //current player
                if (!this.currentPlayerExist) {
                    console.log("add Players c", data);
                    this.player = new MUR.Player(this.game, this, data.id, data.name, true, this.startX, this.startY, MUR.getAvatar());
                    this.game.camera.follow(this.player);
                    this.currentPlayerExist = true;
                    this.playerGroup.add(this.player);
                    //console.log("groupPlayer length:" + this.playerGroup.length);
                    if (this.startBtn == undefined) {
                        this.addStartBtn();
                    }
                }
            }
            else {
                //other player
                //console.log("add Players o",data)
                var _new = new MUR.Player(this.game, this, data.id, data.name, false, data.x, data.y, data.avatar);
                this.playerGroup.add(_new);
                //console.log("groupPlayer length:" + this.playerGroup.length);
                if (this.startBtn == undefined) {
                    this.addStartBtn();
                }
            }
            this.resortGroup();
            // console.log("groupPlayer length:" + this.playerGroup.length);
        };
        GameState.prototype.resortGroup = function () {
            this.playerGroup.customSort(function (a, b) {
                if (a.y < b.y) {
                    return -1;
                }
                else if (a.y > b.y) {
                    return 1;
                }
                else {
                    return 0;
                }
            }, this);
        };
        return GameState;
    }(Phaser.State));
    MUR.GameState = GameState; //end class
})(MUR || (MUR = {})); //end module
/// <reference path="../Lib/phaser.d.ts"/>
var MUR;
(function (MUR) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.call(this);
        }
        GameOver.prototype.create = function () {
            MUR.setGameOver(this);
            MUR.setGameState(null);
            MUR.getFbInstance().getWinners();
            MUR.getFbInstance().removeUser(MUR.getPlayerId());
            this.game.world.setBounds(0, 0, 1024, 600);
            this.game.add.tileSprite(0, 0, 1024, 600, 'menu-background');
            this.game.add.sprite(0, 0, "menu-trasparency");
            var replayBtn = this.game.add.sprite(512, 550, this.game.cache.getBitmapData('startBtn'));
            replayBtn.anchor.setTo(0.5);
            replayBtn.alpha = 0;
            var _spriteText = this.game.add.text(0, 0, 'RE-PLAY', { fill: '#ffffff' });
            _spriteText.anchor.set(0.5);
            replayBtn.addChild(_spriteText);
            replayBtn.events.onInputDown.add(function () { MUR.setGameOver(null); MUR.goState("Menu", this.game); }, this);
            var tween = this.game.add.tween(replayBtn).to({ alpha: 1 }, 1000, Phaser.Easing.Quadratic.In, true, 300);
            tween.onComplete.add(function () {
                replayBtn.inputEnabled = true;
            }, replayBtn);
        };
        GameOver.prototype.setResult = function (_position) {
            console.log("set result" + _position);
            var _style;
            var _result = "";
            var _y = 0;
            if (_position <= settings.winners) {
                _style = { font: 'normal 56px', fill: '#00ff00', stroke: '#ffffff', strokeThickness: 10 };
                _result = "You win!";
                var medal = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, settings.winnersAwards[_position - 1]);
                medal.anchor.setTo(0.5);
                medal.alpha = 0;
                _y = 100;
                this.game.add.tween(medal).to({ alpha: 1, y: this.game.world.centerY }, 500, Phaser.Easing.Bounce.Out, true, 500);
            }
            else {
                _style = { font: 'normal 56px', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 10 };
                _result = "You Lose!";
                _y = 0;
            }
            var _gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - _y, _result, _style);
            _gameOverText.fixedToCamera = false;
            _gameOverText.alpha = 0;
            _gameOverText.font = 'Press Start 2P';
            _gameOverText.anchor.set(0.5);
            this.game.add.tween(_gameOverText).to({ alpha: 1 }, 500, Phaser.Easing.Quadratic.In, true, 500);
        };
        GameOver.prototype.update = function () {
            if (MUR.isGameReset()) {
                MUR.resetAll();
            }
        };
        return GameOver;
    }(Phaser.State));
    MUR.GameOver = GameOver;
})(MUR || (MUR = {}));
/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/firebase.d.ts"/>
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>
/// <reference path="States/Menu.ts"/>
/// <reference path="States/MenuAbout.ts"/>
/// <reference path="States/GameState.ts"/>
/// <reference path="States/GameOver.ts"/>
var MUR;
(function (MUR) {
    var _newGame;
    var _newList;
    var _gameState;
    var _gameOver;
    var _fb;
    var _currentPlayer = 0;
    var _gameStarted = false;
    var _gameEnded = false;
    var _startRun = false;
    var _winner = 0;
    var _playerAvatar = 0;
    var _reset = false;
    function setListObj(_val) { _newList = _val; }
    MUR.setListObj = setListObj;
    function getListObj() { return _newList; }
    MUR.getListObj = getListObj;
    function setGameObj(_val) { _newGame = _val; }
    MUR.setGameObj = setGameObj;
    function getGameObj() { return _newGame; }
    MUR.getGameObj = getGameObj;
    //check if game is reset
    function setReset(_val) { _reset = _val; }
    MUR.setReset = setReset;
    function isGameReset() { return _reset; }
    MUR.isGameReset = isGameReset;
    //check if game is ended
    function setGameEnded(_val) { _gameEnded = _val; }
    MUR.setGameEnded = setGameEnded;
    function isGameEnded() { return _gameEnded; }
    MUR.isGameEnded = isGameEnded;
    //check if the gameState is created to manage receiving players data
    function setGameStarted(_val) { _gameStarted = _val; }
    MUR.setGameStarted = setGameStarted;
    function isGameStarted() { return _gameStarted; }
    MUR.isGameStarted = isGameStarted;
    //check if the rush is started to manage updating players positions
    function setStartRun(val) { _startRun = val; }
    MUR.setStartRun = setStartRun;
    function getStartRun() { return _startRun; }
    MUR.getStartRun = getStartRun;
    function setWinner(val) { _winner = val; }
    MUR.setWinner = setWinner;
    function getWinner() { return _winner; }
    MUR.getWinner = getWinner;
    function showMemebers() { getListObj().rsvpListContainerShow(); }
    MUR.showMemebers = showMemebers;
    function hideMemebers() { getListObj().rsvpListHide(); }
    MUR.hideMemebers = hideMemebers;
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split('&'), sParameterName, i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
    MUR.getUrlParameter = getUrlParameter;
    ;
    function goState(_state, _game) {
        var st = _game.plugins.add(Phaser.Plugin.StateTransition);
        st.configure({
            duration: 1000,
            ease: Phaser.Easing.Exponential.InOut,
            properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
        });
        st.to(_state);
    }
    MUR.goState = goState;
    function setAvatar(_val) { _playerAvatar = _val; }
    MUR.setAvatar = setAvatar;
    function getAvatar() { return _playerAvatar; }
    MUR.getAvatar = getAvatar;
    function setPlayerId(_id) { _currentPlayer = _id; }
    MUR.setPlayerId = setPlayerId;
    function getPlayerId() { return _currentPlayer; }
    MUR.getPlayerId = getPlayerId;
    function setGameState(gameState) { _gameState = gameState; }
    MUR.setGameState = setGameState;
    function getGameState() { return _gameState; }
    MUR.getGameState = getGameState;
    function setGameOver(gameState) { _gameOver = gameState; }
    MUR.setGameOver = setGameOver;
    function getGameOver() { return _gameOver; }
    MUR.getGameOver = getGameOver;
    function getFbInstance() { return _fb; }
    MUR.getFbInstance = getFbInstance;
    function setFbInstance(val) { _fb = val; }
    MUR.setFbInstance = setFbInstance;
    function getPlayerObj() {
        var _current = _currentPlayer;
        var _obj;
        getListObj().getrsvpData().forEach(function (element) { if (element.id === _current) {
            _obj = new MUR.rsvp(element.id, element.name, element.image);
        } });
        return _obj;
    }
    MUR.getPlayerObj = getPlayerObj;
    function logout(_game) {
        localStorage.removeItem("mrLogged");
        getFbInstance().logout(MUR.getPlayerId());
        getListObj().rsvpListShow();
        goState("Preloader", _game);
    }
    MUR.logout = logout;
    function login(id) {
        localStorage.setItem("mrLogged", JSON.stringify({ id: id }));
        getFbInstance().logUser(id, { id: id });
        setPlayerId(id);
        hideMemebers();
    }
    MUR.login = login;
    function resetAll() {
        localStorage.removeItem("mrLogged");
        getFbInstance().resetGame();
        getFbInstance().removeAllLogged();
        window.location.reload();
    }
    MUR.resetAll = resetAll;
    window.onresize = function () { getListObj().getrsvpList().css({ width: window.innerWidth, height: window.innerHeight }); };
    window.onload = function () {
        setFbInstance(new MUR.initFb());
        setListObj(new MUR.initList());
        setGameObj(new MUR.initGame(1024, 600));
        var _obj = localStorage.getItem("mrLogged");
        if (_obj != null) {
            _obj = JSON.parse(_obj);
            setPlayerId(_obj.id);
            getListObj().rsvpListHide();
        }
    };
})(MUR || (MUR = {}));
// when the page has finished loading, create our game
var WebFontConfig = {
    active: function () { },
    google: {
        families: ['Press Start 2P']
    }
};
var gameData = {
    assets: {
        spritesheets: [
            { name: "players", path: "assets/images/game/players2.png", width: 52, height: 70, frames: 84 },
        ],
        images: [
            { name: "introSky", path: "assets/images/game/sky.png" },
            { name: "introRocks", path: "assets/images/game/rocks.png" },
            { name: "introRoad", path: "assets/images/game/road.png" },
            { name: "cloud1", path: "assets/images/game/cloud1.png" },
            { name: "cloud2", path: "assets/images/game/cloud2.png" },
            { name: "meetup-big", path: "assets/images/game/meetup-big.png" },
            { name: "logo-meetup", path: "assets/images/game/logo-meetup.png" },
            { name: "logo-js", path: "assets/images/game/logo-js.png" },
            { name: "logo-firebase", path: "assets/images/game/logo-firebase.png" },
            { name: "logo-phaser", path: "assets/images/game/logo-phaser.png" },
            { name: "logo-typescript", path: "assets/images/game/logo-typescript.png" },
            { name: "logo-vscode", path: "assets/images/game/logo-vscode.png" },
            { name: "menu-background", path: "assets/images/game/menu-background.jpg" },
            { name: "menu-trasparency", path: "assets/images/game/menu-trasparency.png" },
            { name: "settings-btn", path: "assets/images/game/settings.png" },
            { name: "about-btn", path: "assets/images/game/about.png" },
            { name: "medal-gold", path: "assets/images/game/medal-gold.png" },
            { name: "medal-silver", path: "assets/images/game/medal-silver.png" },
            { name: "medal-bronze", path: "assets/images/game/medal-bronze.png" }
        ],
        sounds: [],
        bitmapfont: [
            { name: "carrier_command", imgpath: "assets/fonts/carrier_command.png", xmlpath: "assets/fonts/carrier_command.xml" }
        ]
    }
};
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../MURgame.ts"/>
/// <reference path="../States/GameState.ts"/>
var MUR;
(function (MUR) {
    //
    (function (PlayerStates) {
        PlayerStates[PlayerStates["IDLE"] = 0] = "IDLE";
        PlayerStates[PlayerStates["RUNNING"] = 1] = "RUNNING";
        PlayerStates[PlayerStates["JUMPING"] = 2] = "JUMPING";
    })(MUR.PlayerStates || (MUR.PlayerStates = {}));
    var PlayerStates = MUR.PlayerStates;
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, gameState, id, name, isPlayer, startX, startY, avatar) {
            _super.call(this, game, startX, startY, "players");
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
            var frames = [
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
        Player.prototype.update = function () {
            if (this.isPlayer) {
                if (this.x > this.gameState.goal - 150) {
                    // getFbInstance().setWinner(this.id);
                    this.gameState.gameOver();
                }
            }
        };
        Player.prototype.arrowLeft = function () {
            if (!MUR.getStartRun())
                return;
            this.clickRate(0);
        };
        Player.prototype.arrowRight = function () {
            if (!MUR.getStartRun())
                return;
            this.clickRate(1);
        };
        Player.prototype.tapInput = function (tile, point) {
            if (!MUR.getStartRun())
                return;
            if (this.lastTap == undefined) {
                this.lastTap = point.x;
                this.clickRate(0);
            }
            else {
                if (point.x > this.lastTap) {
                    if ((point.x - this.lastTap) > 80) {
                        this.clickRate(this.nextRate());
                    }
                    else {
                        this.clickRate(this.lastRate);
                    }
                }
                else {
                    if ((this.lastTap - point.x) > 80) {
                        this.clickRate(this.nextRate());
                    }
                    else {
                        this.clickRate(this.lastRate);
                    }
                }
                this.lastTap = point.x;
            }
        };
        Player.prototype.nextRate = function () {
            if (this.lastRate == 0) {
                return 1;
            }
            else {
                return 0;
            }
        };
        Player.prototype.clickRate = function (key) {
            //console.log(key);
            if (this.lastRate != key) {
                this.lastRate = key;
                this.increaseSpeed(this.game);
                this.anim[PlayerStates.IDLE].stop();
                this.anim[PlayerStates.RUNNING].next(1);
                this.currentState = PlayerStates.RUNNING;
            }
            else if (this.lastRate == key) {
                this.resetSpeed();
            }
        };
        Player.prototype.resetSpeed = function () {
            this.playerSpeed = 0;
            //this.lastTap=undefined;
            this.lastSpeed == null;
            this.anim[PlayerStates.RUNNING].stop();
            this.anim[PlayerStates.IDLE].play();
            this.currentState = PlayerStates.IDLE;
        };
        Player.prototype.increaseSpeed = function (game) {
            if (this.lastSpeed == null) {
                this.lastSpeed = 0;
            }
            else {
                var speed = this.game.time.time - this.lastSpeed;
                this.lastSpeed = this.game.time.time;
                if (speed < 99) {
                    this.playerSpeed = 5;
                }
                if (speed < 149 && speed >= 100) {
                    this.playerSpeed = 4;
                }
                if (speed < 199 && speed >= 150) {
                    this.playerSpeed = 3;
                }
                if (speed < 249 && speed >= 200) {
                    this.playerSpeed = 2;
                }
                if (speed < 299 && speed >= 250) {
                    this.playerSpeed = 1;
                }
                if (speed >= 300) {
                    this.playerSpeed = 0;
                }
                this.checkIdle(game);
                this.checkSpeed();
            }
        };
        Player.prototype.checkSpeed = function () {
            if (this.playerSpeed == 0) { }
            else if (this.playerSpeed == 1) {
                this.x += 12;
            }
            else if (this.playerSpeed == 2) {
                this.x += 14;
            }
            else if (this.playerSpeed == 3) {
                this.x += 16;
            }
            else if (this.playerSpeed == 4) {
                this.x += 18;
            }
            else if (this.playerSpeed == 5) {
                this.x += 20;
            }
            if (this.lastX != this.x) {
                this.lastX = this.x;
                var _obj = { active: true, id: this.id, name: this.name, x: this.x, y: this.y };
                MUR.getFbInstance().setUserData(this.id, _obj);
            }
        };
        Player.prototype.checkIdle = function (game) {
            if (this.timer != undefined)
                this.timer.destroy();
            this.timer = this.game.time.create(false);
            this.timer.add(150, this.resetSpeed, this);
            this.timer.start();
        };
        return Player;
    }(Phaser.Sprite));
    MUR.Player = Player;
})(MUR || (MUR = {}));
/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/firebase.d.ts"/>
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>
/// <reference path="States/Menu.ts"/>
/// <reference path="States/MenuAbout.ts"/>
/// <reference path="States/GameState.ts"/>
/// <reference path="States/GameOver.ts"/>
var MUR;
(function (MUR) {
    var initFb = (function () {
        function initFb() {
            this.config = settings.fbConfig;
            this.fb = null;
            this.fb = firebase.initializeApp(this.config);
            //remove all user - to remove
            //this.removeUsers();
            var start = this.fb.database().ref('start');
            start.set(false);
            start.on('value', function (data) { MUR.setStartRun(data.val()); });
            var end = this.fb.database().ref('end');
            end.set(false);
            end.on('value', function (data) {
                // if(data.val()){setGameEnded(data.val());}
            });
            var win = this.fb.database().ref('winner');
            win.set(0);
            win.on('value', function (data) { MUR.setWinner(data.val()); });
            var reset = this.fb.database().ref('reset');
            reset.set(false);
            reset.on('value', function (data) { MUR.setReset(data.val()); });
            var players = this.fb.database().ref('players');
            players.on('child_added', function (data) {
                if (MUR.isGameStarted())
                    MUR.getGameState().addPlayer(data.val());
            });
            players.on('child_changed', function (data) {
                if (MUR.isGameStarted() && MUR.getGameState() != null)
                    MUR.getGameState().manageData(data.val());
            });
            var logged = this.fb.database().ref('logged');
            logged.on('child_added', function (data) {
                if (MUR.getListObj().listIsVisible()) {
                    MUR.getListObj().hideUser(data.val());
                }
            });
            var logged = this.fb.database().ref('logged');
            logged.on('child_removed', function (data) {
                if (MUR.getListObj().listIsVisible()) {
                    MUR.getListObj().showUser(data.val());
                }
            });
        }
        initFb.prototype.sendReset = function () {
            var reset = this.fb.database().ref('reset');
            reset.set(true);
        };
        initFb.prototype.resetGame = function () {
            this.removeAllUsers();
            var start = this.fb.database().ref('start');
            start.set(false);
            var end = this.fb.database().ref('end');
            end.set(false);
            var winner = this.fb.database().ref('winner');
            winner.set(0);
            // var reset = this.fb.database().ref('reset');
            // reset.set(false);
        };
        initFb.prototype.removeAllUsers = function () {
            var rem = this.fb.database().ref('players');
            rem.remove();
        };
        initFb.prototype.removeAllWinners = function () {
            var rem = this.fb.database().ref('winners');
            rem.remove();
        };
        initFb.prototype.removeAllLogged = function () {
            var rem = this.fb.database().ref('logged');
            rem.remove();
        };
        initFb.prototype.removeUser = function (id) {
            var rem = this.fb.database().ref('players/' + id);
            rem.remove();
        };
        initFb.prototype.removeLogged = function (id) {
            var rem = this.fb.database().ref('logged/' + id);
            rem.remove();
        };
        initFb.prototype.logUser = function (user, data) {
            this.fb.database().ref("/logged/" + user).set(data);
        };
        initFb.prototype.logout = function (id) {
            this.removeUser(id);
            this.removeLogged(id);
        };
        initFb.prototype.setUserData = function (user, data) {
            this.fb.database().ref("/players/" + user).set(data);
        };
        initFb.prototype.setWinners = function (user, data) {
            this.fb.database().ref("/winners/" + user).set(data);
        };
        initFb.prototype.startGame = function () {
            this.fb.database().ref("/start").set(true);
        };
        initFb.prototype.setWinner = function (val) {
            this.fb.database().ref("/winner").set(val);
        };
        /* endGame(): void {
 
             this.fb.database().ref("/end").set(true);
 
         }
         */
        initFb.prototype.getAll = function () {
            var _all = this.fb.database().ref('players');
            _all.once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) { if (MUR.isGameStarted())
                    MUR.getGameState().addPlayers(childSnapshot.val()); });
            });
        };
        initFb.prototype.getWinners = function () {
            var _all = this.fb.database().ref('winners').orderByChild("time").limitToFirst(settings.winners);
            var _counter = 0;
            var _winner = false;
            _all.once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    _counter++;
                    console.log(childSnapshot.val().id + " == " + MUR.getPlayerId());
                    if (childSnapshot.val().id == MUR.getPlayerId()) {
                        _winner = true;
                        MUR.getGameOver().setResult(_counter);
                    }
                });
                if (!_winner) {
                    MUR.getGameOver().setResult(settings.winners + 1);
                }
            });
        };
        return initFb;
    }());
    MUR.initFb = initFb;
})(MUR || (MUR = {}));
var MUR;
(function (MUR) {
    var initGame = (function () {
        function initGame(width, height) {
            var dpr = devicePixelRatio || 1;
            if (!width) {
                width = screen.width * dpr;
            }
            if (!height) {
                height = screen.height * dpr;
            }
            this.game = new Phaser.Game(width, height, Phaser.AUTO, "", null, false, true);
            this.game.state.add("Boot", MUR.Boot, false);
            this.game.state.add("Preloader", MUR.Preloader, false);
            this.game.state.add("Menu", MUR.Menu, false);
            this.game.state.add("MenuAbout", MUR.MenuAbout, false);
            this.game.state.add("MenuSettings", MUR.MenuSettings, false);
            this.game.state.add("Game", MUR.GameState, false);
            this.game.state.add("GameOver", MUR.GameOver, false);
            this.game.state.start("Boot");
        }
        return initGame;
    }());
    MUR.initGame = initGame;
})(MUR || (MUR = {}));
/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/firebase.d.ts"/>
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>
/// <reference path="States/Menu.ts"/>
/// <reference path="States/MenuAbout.ts"/>
/// <reference path="States/GameState.ts"/>
/// <reference path="States/GameOver.ts"/>
var MUR;
(function (MUR) {
    var initList = (function () {
        function initList() {
            this.isVisible = false;
            this.rsvpData = null;
            this.$rsvpList = $("#rsvpList");
            this.$rsvpListContainer = $("#rsvpListContainer");
            this.$rsvpList.css({ width: window.innerWidth, height: window.innerHeight });
            var _arr;
            _arr = JSON.parse(localStorage.getItem("rsvpData"));
            // if (_arr==null) {this.loadRsvp();}else{ this.rsvpData=_arr; this.displayRsvp();}
            this.loadRsvp();
        }
        initList.prototype.getrsvpData = function () { return this.rsvpData; };
        initList.prototype.getrsvpList = function () { return this.$rsvpList; };
        initList.prototype.rsvpListHide = function () { this.$rsvpList.hide(); };
        initList.prototype.rsvpListShow = function () { this.$rsvpList.show(); };
        initList.prototype.rsvpListContainerHide = function () { this.$rsvpListContainer.hide(); };
        initList.prototype.rsvpListContainerShow = function () { this.$rsvpListContainer.show(); };
        initList.prototype.listIsVisible = function () { return this.isVisible; };
        initList.prototype.hideUser = function (val) { $("#member" + val.id).fadeOut(); };
        initList.prototype.showUser = function (val) { $("#member" + val.id).fadeIn(); };
        initList.prototype.loadRsvp = function () {
            var _this = this;
            if (this.rsvpData == null) {
                this.rsvpData = new Array;
                $.ajax({
                    type: "GET",
                    url: settings.meetupEvent,
                    dataType: 'jsonp',
                    success: function (data) {
                        var m;
                        var mName;
                        var mImage;
                        var mId;
                        for (m = 0; m < data.results.length; m++) {
                            mName = data.results[m].member.name;
                            if (data.results[m].member_photo != undefined) {
                                mImage = data.results[m].member_photo.photo_link;
                            }
                            else {
                                mImage = "assets/images/game/avatar.jpg";
                            }
                            mId = data.results[m].member.member_id;
                            _this.rsvpData.push(new MUR.rsvp(mId, mName, mImage));
                        }
                        localStorage.setItem("rsvpData", JSON.stringify(_this.rsvpData));
                        _this.displayRsvp();
                    }
                });
            }
        };
        initList.prototype.displayRsvp = function () {
            var _this = this;
            var mString = "";
            var _id;
            this.rsvpData.forEach(function (element) {
                mString = "<div id='member" + element.id + "' class='mMember'><div style='background-image:url(" + element.image + ");' class='mImage'></div><div class='mName'>" + element.name + "</div></div>";
                _this.$rsvpListContainer.append(mString);
                var ele = document.getElementById("member" + element.id);
                ele.onclick = setUpGame(element.id);
            });
            MUR.showMemebers();
            this.isVisible = true;
            this.$rsvpList.removeClass("loading");
            function setUpGame(id) {
                return function () {
                    this.isVisible = false;
                    MUR.login(id);
                };
            }
        };
        return initList;
    }());
    MUR.initList = initList;
})(MUR || (MUR = {}));
/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/firebase.d.ts"/>
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>
/// <reference path="States/Menu.ts"/>
/// <reference path="States/MenuAbout.ts"/>
/// <reference path="States/GameState.ts"/>
/// <reference path="States/GameOver.ts"/>
var MUR;
(function (MUR) {
    var rsvp = (function () {
        function rsvp(id, name, image) {
            this.id = id;
            this.name = name;
            this.image = image;
            this.played = false;
        }
        return rsvp;
    }());
    MUR.rsvp = rsvp;
})(MUR || (MUR = {}));
var settings = {
    fbConfig: {
        apiKey: "AIzaSyDhsh567YIHL1EHfBtHaWKQZt38A6TWfn8",
        authDomain: "firsttest-79dd5.firebaseapp.com",
        databaseURL: "https://firsttest-79dd5.firebaseio.com",
        storageBucket: "",
    },
    meetupEvent: "https://api.meetup.com/2/rsvps?offset=0&format=json&event_id=234497065&photo-host=public&page=100&fields=&order=name&desc=false&sig_id=199420979&sig=88ec44e6df450a40b3ee0314dd7bf21086a23ccf&key=7c4e4e1e49637797153e102a78283f&sign=true",
    goalDistance: 10000,
    playerIdStarter: -1,
    timer: { minute: 2, second: 30 },
    winners: 3,
    winnersAwards: ["medal-gold", "medal-silver", "medal-bronze"]
};
/// <reference path="../Lib/phaser.d.ts"/>
var MUR;
(function (MUR) {
    var MenuSettings = (function (_super) {
        __extends(MenuSettings, _super);
        function MenuSettings() {
            _super.call(this);
        }
        MenuSettings.prototype.preload = function () {
        };
        MenuSettings.prototype.create = function () {
            this.menuBg = this.game.add.tileSprite(0, 0, 1024, 600, 'menu-background');
            this.game.add.sprite(0, 0, "menu-trasparency");
            var _style = { font: 'normal 50px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
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
            _reset.events.onInputDown.add(function () { MUR.getFbInstance().sendReset(); }, this);
            var _resetLogged = this.game.add.text(10, 240, 'Reset Logged', { fill: '#ffffff' });
            _resetLogged.inputEnabled = true;
            _resetLogged.events.onInputDown.add(function () { MUR.getFbInstance().removeAllLogged(); }, this);
            var _resetPlayers = this.game.add.text(10, 280, 'Reset Players', { fill: '#ffffff' });
            _resetPlayers.inputEnabled = true;
            _resetPlayers.events.onInputDown.add(function () { MUR.getFbInstance().removeAllUsers(); }, this);
            var _startGame = this.game.add.text(10, 320, 'Start Game', { fill: '#ffffff' });
            _startGame.inputEnabled = true;
            _startGame.events.onInputDown.add(function () { MUR.getFbInstance().startGame(); }, this);
        };
        MenuSettings.prototype.update = function () {
            if (MUR.isGameReset()) {
                MUR.resetAll();
            }
            this.menuBg.tilePosition.x -= 0.5;
        };
        return MenuSettings;
    }(Phaser.State));
    MUR.MenuSettings = MenuSettings;
})(MUR || (MUR = {}));
