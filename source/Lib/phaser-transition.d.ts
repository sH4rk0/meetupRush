declare module Phaser {       
            module Plugin {		        
                class StateTransition extends Phaser.Plugin {                           
                    constructor(game:Phaser.Game, parent: any); // not sure what parent type is            
                        configure(options:Object):any;                      
                        to(key:string, clearWorld?:boolean, clearCache?:boolean, parameter?:Object):void;       
                        }    
                    }
        }        
