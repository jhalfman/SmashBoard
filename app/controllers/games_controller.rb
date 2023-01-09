class GamesController < ApplicationController

    def show
        game = Game.find(params[:id])
        render json: game, include: ["player_characters", "player_characters.player", "player_characters.character", "penalties", "penalty.player"], status: :ok
    end
end
