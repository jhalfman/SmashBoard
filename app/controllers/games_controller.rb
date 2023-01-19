class GamesController < ApplicationController
    skip_before_action :authenticate_user, only: [:show]
    skip_before_action :is_admin, except: [:destroy]

    def show
        game = Game.find(params[:id])
        render json: game, include: ["player_characters", "player_characters.player", "player_characters.character", "penalties", "penalty.player", "night"], status: :ok
    end

    def create
        if (params[:p1p] == "" || params[:p1c] == "" || params[:p2p] == "" || params[:p2c] == "" || params[:p3p] == "" || params[:p3c] == "" || params[:p4p] == "" || params[:p4c] == "")
            render json: {errors: {Game: "incomplete game form"}}, status: :not_acceptable
        else
            game = Game.create!(games_params)
            
            pc1 = PlayerCharacter.find_or_create_by!({player_id: params[:p1p], character_id: params[:p1c]})
            pc2 = PlayerCharacter.find_or_create_by!({player_id: params[:p2p], character_id: params[:p2c]})
            pc3 = PlayerCharacter.find_or_create_by!({player_id: params[:p3p], character_id: params[:p3c]})
            pc4 = PlayerCharacter.find_or_create_by!({player_id: params[:p4p], character_id: params[:p4c]})

            pcg1 = PlayerCharacterGame.create!(player_character: pc1, game: game)
            pcg2 = PlayerCharacterGame.create!(player_character: pc2, game: game)
            pcg3 = PlayerCharacterGame.create!(player_character: pc3, game: game)
            pcg4 = PlayerCharacterGame.create!(player_character: pc4, game: game)

            render json: game, status: :ok
        end
    end

    def update
        game = Game.find(params[:id])
        game.update!(games_params)
        render json: game, status: :ok
    end

    def destroy
        game = Game.find(params[:id])
        game.destroy
        head :no_content
    end

    private

    def games_params
        params.permit(:time, :notes, :night_id)
    end
end
