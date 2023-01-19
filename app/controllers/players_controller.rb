class PlayersController < ApplicationController
    skip_before_action :authenticate_user, only: [:index, :update]
    before_action :is_admin, only: [:update, :retired]

    def index
        players = Player.where('retired': false)
        render json: players, include: ["player_characters", "player_characters.player_character_games"], status: :ok
    end

    def create
        player = Player.create!(player_params)
        render json: player, status: :created
    end

    def update
        player = Player.find(params[:id])
        player.update!(player_params)
        render json: player, include: ["player_characters", "player_characters.player_character_games"], status: :ok
    end

    def retired
        players = Player.where('retired': true)
        render json: players, status: :ok
    end

    def stats
        players = Player.all
        render json: players, include: ["characters", "player_characters", "player_characters.penalties", "player_characters.player_character_games"], status: :ok
    end

    private

    def player_params
        params.permit(:name, :retired)
    end
end
