class RulesController < ApplicationController
    skip_before_action :authenticate_user, only: [:index]

    def index
        rules = Rule.all
        render json: rules, status: :ok
    end
end
