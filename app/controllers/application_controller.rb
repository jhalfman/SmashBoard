class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authenticate_user
  before_action :is_admin

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  private

  def authenticate_user
    render json: {errors: {user: "is an unauthorized user"}}, status: :unauthorized unless current_user
  end

  def is_admin
    if current_user
      admin = current_user.admin
      render json: {errors: {user: "does not have admin access"}}, status: :forbidden unless admin
    else
      render json: {errors: {user: "is not logged in"}}, status: :forbidden
    end
  end

  def render_unprocessable_entity invalid
    render json: {errors: invalid.record.errors}, status: :unprocessable_entity
  end

  def render_not_found error
    render json: {errors: {error.model => "Not Found"}}, status: :not_found
  end

end
