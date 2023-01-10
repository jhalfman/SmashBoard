Rails.application.routes.draw do
  
  resources :penalties, only: [:create]
  resources :player_character_games, only: []
  resources :games, only: [:show, :create]
  resources :nights, only: [:index, :show, :create]
  resources :users, only: [:create, :show]
  resources :rules, only: [:index]
  resources :player_characters, only: [:index]
  resources :players, only: [:index, :create]
  resources :characters, only: [:index]

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
