class CharactersController < ApplicationController
    def index
        characters = Character.all
        render json: characters, status: :ok
    end
end
