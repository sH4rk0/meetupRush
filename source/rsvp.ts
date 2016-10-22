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
  
    export class rsvp {

         id:number;
         name:string;
         image:string;
         played:boolean;

          constructor (id:number,name:string,image:string){

             this.id=id;
             this.name=name;
             this.image=image;
             this.played=false;

         }

     }

}
