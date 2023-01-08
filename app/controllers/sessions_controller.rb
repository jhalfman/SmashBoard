class SessionsController < ApplicationController

    def index
        sessions = Session.all
        render json: sessions, status: :ok
    end

    def show
        byebug
    end

end
