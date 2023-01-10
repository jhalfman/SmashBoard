class PenaltiesController < ApplicationController

    def create
        penalty = Penalty.create(penalty_params)
        render json: penalty, include: ["player_character", "player_character.player", "player_character.character", "rule"], status: :created
    end

        private

    def penalty_params
        params.permit(:player_character_id, :rule_id, :description, :game_id)
    end

end
