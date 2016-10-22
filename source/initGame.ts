module MUR {

    export class initGame {


        public game:Phaser.Game;
        constructor(width?:number, height?:number) {
            
            var dpr = devicePixelRatio || 1;

            if (!width) {
                width = screen.width * dpr;
            }
            if (!height) {
                height = screen.height * dpr;
            }
            
            this.game=new Phaser.Game(width, height, Phaser.CANVAS, "",null,false,true);

            this.game.state.add("Boot", Boot,false);
            this.game.state.add("Preloader", Preloader,false);
            this.game.state.add("Menu", Menu,false);
            this.game.state.add("MenuAbout", MenuAbout,false);
            this.game.state.add("Game", GameState,false);
            this.game.state.add("GameOver", GameOver,false);
            this.game.state.start("Boot");
  
        }



}
}