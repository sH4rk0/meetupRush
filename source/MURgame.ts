/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/firebase.d.ts"/>
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>
/// <reference path="States/Menu.ts"/>
/// <reference path="States/MenuAbout.ts"/>
/// <reference path="States/GameState.ts"/>
/// <reference path="States/GameOver.ts"/>

module MUR {


    let _newGame: initGame;
    let _newList: initList;
    let _gameState: GameState;
    let _fb: initFb;
    let _currentPlayer: number = 0;
    let _gameStarted: boolean = false;
    let _gameEnded: boolean = false;
    let _startRun: boolean = false;
    let _winner: number = 0;
    let _playerAvatar: number = 0;

    export function setListObj(_val: initList): void { _newList = _val; }
    export function getListObj(): initList { return _newList; }

    export function setGameObj(_val: initGame): void { _newGame = _val; }
    export function getGameObj(): initGame { return _newGame; }

    //check if game is ended
    export function setGameEnded(_val: boolean): void { _gameEnded = _val; }
    export function isGameEnded(): boolean { return _gameEnded; }

    //check if the gameState is created to manage receiving players data
    export function setGameStarted(_val: boolean): void { _gameStarted = _val; }
    export function isGameStarted(): boolean { return _gameStarted; }

    //check if the rush is started to manage updating players positions
    export function setStartRun(val: boolean): void { _startRun = val; }
    export function getStartRun(): boolean { return _startRun; }

    export function setWinner(val: number): void { _winner = val; }
    export function getWinner(): number { return _winner; }

    export function showMemebers(): void { getListObj().rsvpListContainerShow(); }
    export function hideMemebers(): void { getListObj().rsvpListHide(); }

    export function goState(_state: string, _game: Phaser.Game): void {

        var st = <Phaser.Plugin.StateTransition>_game.plugins.add(Phaser.Plugin.StateTransition);
        st.configure({
            duration: 1000,
            ease: Phaser.Easing.Exponential.InOut,
            properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
        });

        st.to(_state);

    }

    export function setAvatar(_val: number): void { _playerAvatar = _val; }
    export function getAvatar(): number { return _playerAvatar; }

    export function setPlayerId(_id: number): void { _currentPlayer = _id; }
    export function getPlayerId(): number { return _currentPlayer; }

    export function setGameState(gameState: GameState): void { _gameState = gameState; }
    export function getGameState(): GameState { return _gameState; }

    export function getFbInstance(): initFb { return _fb }
    export function setFbInstance(val: initFb): void { _fb = val; }

    export function getPlayerObj(): rsvp {

        var _current: number = _currentPlayer;
        var _obj: rsvp;
        getListObj().getrsvpData().forEach(element => { if (element.id === _current) { _obj = new rsvp(element.id, element.name, element.image); } });
        return _obj;

    }

    export function logout(_game: Phaser.Game) {

        localStorage.removeItem("mrLogged");
        getFbInstance().logout(MUR.getPlayerId());
        getListObj().rsvpListShow();
        goState("Preloader", _game);

    }

    export function login(id: number) {

        localStorage.setItem("mrLogged", JSON.stringify({ id: id }));
        getFbInstance().logUser(id, { id: id });
        setPlayerId(id);
        hideMemebers();

    }

    window.onresize = () => { getListObj().getrsvpList().css({ width: window.innerWidth, height: window.innerHeight }); }
    window.onload = () => {


        setFbInstance(new initFb());

        var _obj: any = localStorage.getItem("mrLogged");
        if (_obj != undefined) _obj = JSON.parse(_obj);

        setListObj(new initList());
        setGameObj(new initGame(1024, 600));

        if (_obj.id != undefined) {

            setPlayerId(_obj.id);
            getListObj().rsvpListHide();

        }

    }


}

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
            { name: "about-btn", path: "assets/images/game/about.png" }

        ],

        sounds: [
            //{name:"",paths:["ogg","mp3"]}
        ],

        bitmapfont: [
            { name: "carrier_command", imgpath: "assets/fonts/carrier_command.png", xmlpath: "assets/fonts/carrier_command.xml" }
        ]

    }


}
