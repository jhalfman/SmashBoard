class NightsController < ApplicationController
    skip_before_action :authenticate_user, only: [:index, :show]
    skip_before_action :is_admin, except: [:destroy]

    def index
        nights = Night.all.sort_by(&:created_at)
        render json: nights, status: :ok
    end
    
    def show
        night = Night.find(params[:id])
        render json: night.games, include: ["player_characters", "player_characters.player", "penalties", "penalties.player_character", "night"], status: :ok
    end

    def create
        night = Night.create!(night_params)
        render json: night, status: :created
    end

    def update
        night = Night.find(params[:id])
        if session[:user_id] == night.user_id || current_user.admin
            night.update!(night_params)
            render json: night, status: :ok
        else
            render json:{errors: {user: "unauthorized user"}}, status: :unauthorized
        end       
    end

    def destroy
        night = Night.find(params[:id])
        night.destroy
        head :no_content
    end

    private

    def night_params
        params.permit(:name, :user_id)
    end
end
