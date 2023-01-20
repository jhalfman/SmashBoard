Rails.application.routes.draw do
  
  resources :penalties, only: [:create, :update, :destroy]
  resources :player_character_games, only: []
  resources :games, only: [:show, :create, :destroy, :update]
  resources :nights, only: [:index, :show, :create, :destroy, :update]
  resources :users, only: [:create, :show, :index, :update]
  resources :rules, only: [:index]
  resources :player_characters, only: [:index]
  resources :players, only: [:index, :create, :update, :show]
  resources :characters, only: [:index]

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/players/retired", to: "players#retired"
  get "/stats", to: "players#stats"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
