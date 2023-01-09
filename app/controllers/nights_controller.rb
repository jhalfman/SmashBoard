class NightsController < ApplicationController

    def index
        nights = Night.all
        render json: nights, status: :ok
    end
    
    def show
        night = Night.find(params[:id])
        render json: night.games, status: :ok
    end

    def create
        night = Night.create(night_params)
        render json: night, status: :created
    end

    private

    def night_params
        params.permit(:name, :user_id)
    end
end
