Rails.application.routes.draw do
  
  resources :penalties
  resources :player_character_games
  resources :games
  resources :nights
  resources :users
  resources :rules
  resources :player_characters
  resources :players
  resources :characters

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
