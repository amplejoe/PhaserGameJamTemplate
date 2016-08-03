/**
 * Created by bns on 08/03/2016.
 */
module State
{
    export class Game extends Phaser.State
    {
        game: Phaser.Game;

        bg: Phaser.TileSprite;

        create()
        {
            this.bg = this.game.add.tileSprite(0, 0, this.game.cache.getImage('bg_game').width, this.game.cache.getImage('bg_game').height, 'bg_game');
            this.bg.scale.x = Utils.getProportionalScale(this.game.width, this.game.cache.getImage('bg_game').width);
            this.bg.scale.y = Utils.getProportionalScale(this.game.height, this.game.cache.getImage('bg_game').height);

        }
    }
}