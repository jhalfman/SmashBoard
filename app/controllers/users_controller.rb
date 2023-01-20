class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:create, :show]
    skip_before_action :is_admin

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        currentUser = User.find(session[:user_id])
        render json: currentUser, status: :ok
    end

    def index
        if is_username_admin
            users = User.all
            render json: users, status: :ok
        else
            render json:{errors: {user: "unauthorized user"}}, status: :unauthorized
        end
    end

    def update
        if is_username_admin
            user = User.find(params[:id])
            user.update(user_params)
            render json: user, status: :ok
        else
            render json:{errors: {user: "unauthorized user"}}, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :password, :admin)
    end

    def is_username_admin
        currentUser = User.find(session[:user_id])
        currentUser.username == "admin"
    end

end
