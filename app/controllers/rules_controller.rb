class RulesController < ApplicationController
    def index
        rules = Rule.all
        render json: rules, status: :ok
    end
end
