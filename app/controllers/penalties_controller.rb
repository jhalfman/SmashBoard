class PenaltiesController < ApplicationController
    skip_before_action :is_admin

    def create
        penalty = Penalty.create!(penalty_params)
        render json: penalty, include: ["player_character", "player_character.player", "player_character.character", "rule", "user"], status: :created
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

    def destroy
        penalty = Penalty.find(params[:id])
        penalty.destroy
        head :no_content
    end

        private

    def penalty_params
        params.permit(:player_character_id, :rule_id, :description, :game_id, :user_id)
    end

    def is_owner
        render json: {errors: {user: "unauthorized user"}}, status: :unauthorized unless current_user = penalty.user_id
    end

end
