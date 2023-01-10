class PlayerCharactersController < ApplicationController
    skip_before_action :authenticate_user, only: [:index]
    
    def index
        pcs = PlayerCharacter.all
        render json: pcs, status: :ok
    end
end
