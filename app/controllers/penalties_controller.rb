class PenaltiesController < ApplicationController

    def create
        penalty = Penalty.create!(penalty_params)
        render json: penalty, include: ["player_character", "player_character.player", "player_character.character", "rule"], status: :created
    end

    def update
        penalty = Penalty.find(params[:id])
        if session[:user_id] == penalty.user_id
            penalty.update!(penalty_params)
            render json: penalty, status: :ok
        else
            render json:{errors: {user: "unauthorized user"}}, status: :unauthorized
        end        
    end

        private

    def penalty_params
        params.permit(:player_character_id, :rule_id, :description, :game_id, :user_id)
    end

    def is_owner
        render json: {errors: {user: "unauthorized user"}}, status: :unauthorized unless current_user = penalty.user_id
    end

end
