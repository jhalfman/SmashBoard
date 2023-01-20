# Smash Board React/Rails API project
This is a dynamic scoreboard created to keep track of games of Super Smash Brothers played while utilizing a custom out-of-game ruleset.  This game was invented to be used while playing a standard game of Super Smash Brothers, with the intent to alter the objectives of the regular game.  The recommended iteration of the Smash series is the original title, "Super Smash Bros." for the Nintendo 64, but the rules are adaptable to any desired version.

To view the current in-use web app, visit: https://smash-board.onrender.com/

## General Use
Anyone is able to view a list of active players, any of the past games/nights, and the lifetime stats page. In order to create a night, game, or update a score, log in by creating a username.

### Nights
* Nights are sessions of multiple games. Create a night to hold all of the games for that session. On a night's page, you can see the running total of points for all games within that night.

### Games
* A game is created each time a smash bros. game is played.  Choose the players and their characters along with a game description to help identify it.  During a game, choose "add event" when a rule is broken.  Select the player and the rule, add an option description, and submit it to update the scoreboard and event log.  If entered incorrectly, the user who created the event can edit/delete the outcome, and the scoreboard will automatically update accordingly.

## Demonstration
![Demonstration gif](demonstration.gif)

## Installation
The Smash board utilizes a react front end and rails back end. To get started, uncomment the 'characters' and 'rules' data from the db/seeds.rb file, and then run:
bundle install
rails db:migrate db:seed
npm install --prefix client

To run the application, run:
rails s (backend server on http://localhost:3000)
npm start --prefix client (frontend server on http://localhost:4000)


## Resources
- This project was created using a template for a react/rails API found here : https://github.com/learn-co-curriculum/project-template-react-rails-api
- [Getting Started with Ruby on Rails on Render](https://render.com/docs/deploy-rails)
- [Render Databases Guide](https://render.com/docs/databases)
- Rule set based on initial rule set created by Chemon