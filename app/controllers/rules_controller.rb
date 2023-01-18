class RulesController < ApplicationController
    skip_before_action :authenticate_user, only: [:index]
    skip_before_action :is_admin

    def index
        rules = Rule.all
        render json: rules, status: :ok
    end
end
