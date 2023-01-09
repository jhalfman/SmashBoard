class PlayersController < ApplicationController
    def index
        players = Player.all
        render json: players, status: :ok
    end

    def create
        player = Player.create(player_params)
        render json: player, status: :created
    end

    private

    def player_params
        params.permit(:name)
    end
end
