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


    export class initFb {


        private config: any = settings.fbConfig;

        private fb: firebase.FirebaseApplication = null;

        constructor() {

            this.fb = firebase.initializeApp(this.config);

            //remove all user - to remove
            //this.removeUsers();

            var start = this.fb.database().ref('start');
            start.set(false);
            start.on('value', function (data) { setStartRun(data.val()); });

            var end = this.fb.database().ref('end');
            end.set(false);
            end.on('value', function (data) { setGameEnded(data.val()); });

            var win = this.fb.database().ref('winner');
            win.set(0);
            win.on('value', function (data) { setWinner(data.val()); });

            var players = this.fb.database().ref('players');
            players.on('child_added', function (data) {

                if (isGameStarted()) getGameState().addPlayer(data.val());

            });

            players.on('child_changed', function (data) {

                if (isGameStarted()) getGameState().manageData(data.val());

            });


            var logged = this.fb.database().ref('logged');
            logged.on('child_added', function (data) {
                
                if(getListObj().listIsVisible()){ getListObj().hideUser(data.val()); } 

            });

            var logged = this.fb.database().ref('logged');
            logged.on('child_removed', function (data) {
                
                if(getListObj().listIsVisible()){ getListObj().showUser(data.val()); } 

            });


        }

        resetGame(): void {

            this.removeUsers();
            var start = this.fb.database().ref('start');
            start.set(false);
            var end = this.fb.database().ref('end');
            end.set(false);
            var winner = this.fb.database().ref('winner');
            winner.set(0);

        }

        removeUsers(): void {

            var rem = this.fb.database().ref('players');
            rem.remove();

        }

        removeUser(id: number): void {

            var rem = this.fb.database().ref('players/'+id);
            rem.remove();

        }

        removeLogged(id: number): void {

            var rem = this.fb.database().ref('logged/'+id);
            rem.remove();

        }

        logUser(user: number,data: any): void {

            this.fb.database().ref("/logged/" + user).set(data);
        }

        logout(id: number): void {

            this.removeUser(id);
            this.removeLogged(id);

        }

        setUserData(user: number, data: any): void {

            this.fb.database().ref("/players/" + user).set(data);
        }

        startGame(): void {

            this.fb.database().ref("/start").set(true);

        }

        setWinner(val: number): void {

            if (MUR.getWinner() > 0) return;
            this.fb.database().ref("/winner").set(val);

        }


        endGame(): void {

            this.fb.database().ref("/end").set(true);

        }

        getAll(): void {
            var _all = this.fb.database().ref('players');

            _all.once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) { if (isGameStarted()) getGameState().addPlayers(childSnapshot.val()); });
            });

        }

        /*
            getWinner(){
        
            var _all = this.fb.database().ref('users').orderByChild("score").limitToLast(1);
            
                _all.once('value', function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
        
                        //console.log(childSnapshot.val())
                    
                    });
                });
        
            }
         
        */


    }






}
