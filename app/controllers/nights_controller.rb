class NightsController < ApplicationController

    def index
        nights = Night.all
        render json: nights, status: :ok
    end
    
    def show
        night = Night.find(params[:id])
        render json: night.games, status: :ok
    end

end
