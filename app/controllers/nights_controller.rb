class NightsController < ApplicationController
    skip_before_action :authenticate_user, only: [:index, :show]
    skip_before_action :is_admin, except: [:destroy]

    def index
        nights = Night.all
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
