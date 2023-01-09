class PenaltiesController < ApplicationController
    def create
        penalty = Penalty.create(penalty_params)
        render json: penalty, status: :created
    end

        private

    def penalty_params
        params.permit(:player_character_id, :rule_id, :description, :game_id)
    end

end
