
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
    export class initList {


        private $rsvpList: any;
        private $rsvpListContainer: any;
        private rsvpData: Array<rsvp>;
        private isVisible:boolean=false;

        constructor() {

            this.rsvpData = null;
            this.$rsvpList = $("#rsvpList");
            this.$rsvpListContainer = $("#rsvpListContainer");
            this.$rsvpList.css({ width: window.innerWidth, height: window.innerHeight });

            var _arr: Array<rsvp>;
            //_arr = JSON.parse(localStorage.getItem("rsvpData"));
            // if (_arr==null) {this.loadRsvp();}else{ this.rsvpData=_arr; this.displayRsvp();}
            this.loadRsvp();

        }


        getrsvpData():Array<rsvp>{ return this.rsvpData;}
        getrsvpList():any{ return this.$rsvpList;}
        rsvpListHide():void{this.$rsvpList.hide();}
        rsvpListShow():void{this.$rsvpList.show();}
        rsvpListContainerHide():void{this.$rsvpListContainer.hide();}
        rsvpListContainerShow():void{this.$rsvpListContainer.show();}
        listIsVisible():boolean{return this.isVisible;}

        joinUser(val:any):void{ $("#member" + val.id).addClass("joined"); }
        showUser(val:any):void{ $("#member" + val.id).removeClass("joined") }

        loadRsvp(): void {


            if (this.rsvpData == null) {
               
                this.rsvpData = new Array;
                
                
                 $.ajax({
                    type: "GET",
                    url: settings.meetupEvent,
                    dataType: 'jsonp',
                    success: (data) => {

                        var m: number;
                        var mName: string;
                        var mImage: string;
                        var mId: number;

                        for (m = 0; m < data.results.length; m++) {

                            mName = data.results[m].member.name;
                            if (data.results[m].member_photo != undefined)
                            { mImage = data.results[m].member_photo.photo_link; }
                            else
                            { mImage = "assets/images/game/avatar.jpg"; }

                            mId = data.results[m].member.member_id;

                            this.rsvpData.push(new rsvp(mId, mName, mImage));

                        }
                        
                       // localStorage.setItem("rsvpData", JSON.stringify(this.rsvpData));

                        this.displayRsvp();



                    }

                });


            }

        }

        displayRsvp(): void {

            var mString: string = "";
            var _id: number;


            this.rsvpData.forEach(element => {

                mString = "<div id='member" + element.id + "' class='mMember'><div style='background-image:url(" + element.image + ");' class='mImage'></div><div class='mName'>" + element.name + "</div></div>";

                this.$rsvpListContainer.append(mString);
                var ele: HTMLElement = document.getElementById("member" + element.id);

                ele.onclick = setUpGame(element.id);

            });

            MUR.showMemebers();
            this.isVisible=true;

            this.$rsvpList.removeClass("loading");

            function setUpGame(id: any) {

                return function () {

                    if($("#member" + id).hasClass("joined")) return;
                    this.isVisible=false;
                    MUR.login(id);
                   
                    


                }

            }



        }

    }

}