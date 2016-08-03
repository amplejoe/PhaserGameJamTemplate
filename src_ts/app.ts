/// <reference path="../resources/d_ts/phaser.d.ts"/>
module Main
{
    export class GameTemplate
    {
        constructor(width:number, height:number)
        {
            if (width > Config.MAX_WIDTH) width = Config.MAX_WIDTH;
            if (height > Config.MAX_HEIGHT) height = Config.MAX_HEIGHT;

            // create game in div with 'content' id
            this.game = new Phaser.Game(width, height, Phaser.AUTO, 'content', {create: this.create, preload: this.preload });
        }

        game: Phaser.Game;

        preload()
        {

            /** LOADING MSG **/
            var text: Phaser.Text = this.game.add.text(10, 10, "Loading...", { font: "48px Arial", fill: "#ff0000", textAlign: "center"});
            text.anchor.set(0.5,0.5);
            text.position.set(this.game.width/2,this.game.height/2);


            /** FONTS **/
            //this.game.load.bitmapFont('gamefont', Config.FONTS_PATH+'nokia.png', Config.FONTS_PATH+'nokia.xml'); // load a bitmap font
            // ttf font defined in css/app.css

            /** GFX **/
            this.game.load.image('bg_title', Config.GFX_PATH+'bg_title.png'); // background
            this.game.load.image('bg_menu', Config.GFX_PATH+'bg_menu.png');
            this.game.load.image('bg_game', Config.GFX_PATH+'bg_game.png');
            this.game.load.image('bg_end', Config.GFX_PATH+'bg_end.png');
            this.game.load.image('cc', Config.GFX_PATH+'by-nc-sa.jpg'); // cc logo
            this.game.load.atlasJSONHash("BIRD_FLYING",  Config.SPRITE_SHEETS_PATH+"bird.png",  Config.SPRITE_SHEETS_PATH+"bird_flying.json"); // sprite sheets

            /** AUDIO **/

            this.game.load.audio("music", Config.AUDIO_PATH+"music.mp3"); // music
            this.game.load.audio("ding", Config.SFX_PATH+"ding.mp3"); // sfx



        }

        create()
        {

            // game states
            this.game.state.add("TitleState", State.Title, true); // start with title
            this.game.state.add("MenuState", State.Menu, false);
            this.game.state.add("GameState", State.Game, false);
            this.game.state.add("EndState", State.End, false);

            // scale according to window
            this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

            if (Config.DEBUG)
            {
                var titleButton = this.game.input.keyboard.addKey(Phaser.Keyboard.F1);
                titleButton.onDown.add(() => this.game.state.start("TitleState"));
                var menuButton = this.game.input.keyboard.addKey(Phaser.Keyboard.F2);
                menuButton.onDown.add(() => this.game.state.start("MenuState"));
                var gameButton = this.game.input.keyboard.addKey(Phaser.Keyboard.F3);
                gameButton.onDown.add(() => this.game.state.start("GameState"));
                var endButton = this.game.input.keyboard.addKey(Phaser.Keyboard.F4);
                endButton.onDown.add(() => this.game.state.start("EndState"));

                this.game.input.resetLocked = true; // with this input does not get reset on state change
            }
            
        }




        public getGame()
        {
            return this.game;
        }

    }
}


// Create game class = starting game
var gameTemplate: Main.GameTemplate;

window.onload = () =>
{
    var height = window.innerHeight;
    var width = window.innerWidth;
    gameTemplate = new Main.GameTemplate(width, height); // create game

};

var resizeId;

// reloads game when resizing (for adjusting dimensions)
window.onresize = function(event)
{
    // timeout for window resizing
    clearTimeout(resizeId);
    resizeId = setTimeout(finishedResize, 500);

};

function finishedResize()
{
    //console.log("window was resized!");
    location.reload(); // reload page to adjust to resolution
}
