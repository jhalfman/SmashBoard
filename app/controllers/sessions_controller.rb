class SessionsController < ApplicationController
    skip_before_action :authenticate_user, only: [:create]
    skip_before_action :is_admin

    def create
        user = User.find_by_username(params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :ok
        elsif user
            render json: {errors: {"Error: ": "Incorrect password"}}, status: :unauthorized
        else
            render json: {errors: {"Error: ": "No such user exists"}}, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

end
