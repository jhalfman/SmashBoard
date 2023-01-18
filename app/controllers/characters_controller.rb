class CharactersController < ApplicationController
    skip_before_action :authenticate_user, only: [:index]
    skip_before_action :is_admin
    
    def index
        characters = Character.all
        render json: characters, status: :ok
    end
end
