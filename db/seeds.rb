# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
characters = Character.create([{name: "Luigi"}, {name: "Mario"}, {name: "DK"}, {name: "Link"}, {name: "Samus"}, {name: "Captain Falcon"}, {name: "Ness"}, {name: "Yoshi"}, {name: "Kirby"}, {name: "Fox"}, {name: "Pikachu"}, {name: "Jigglypuff"}])

players = Player.create([{name: "Jordan"}, {name: "Joe"}, {name: "Trey"}, {name: "Matt"}])

pcs = PlayerCharacter.create([{player_id: 1, character_id: 1}, {player_id: 2, character_id: 8}, {player_id: 3, character_id: 7}, {player_id: 4, character_id: 6}, {player_id: 1, character_id: 6}, {player_id: 2, character_id: 9}])

rules = Rule.create([{name: "Preme", description: "Player cannot drop early from the angel platform"}, {name: "Screen Clear", description: "All players but one are currently dead"}, {name: "Bob-omb Death", description: "A player has died from a bob-omb explosion"}, {name: "Bob-omb Miss", description: "A player has picked up a bob-omb and failed to kill a player with it"}, {name: "Pokeball Miss", description: "A player has picked up a pokeball and thrown it off the edge"}, {name: "Goldeen", description: "A player has thrown a pokeball and released Goldeen"}, {name: "Mew", description: "A player has thrown a pokeball and released Mew"}, {name: "Home-run Bat", description: "A player has died from a home-run bat swing, where the direction launched matches the direction the tree is facin "}])

users = User.create(username: "Jordan")

nights = Night.create(name: "Friday Night", user_id: 1)

games = Game.create(time: 8, night_id: 1, notes: "First game of night")

player_character_games = PlayerCharacterGame.create([{game_id: 1, player_character_id: 1}, {game_id: 1, player_character_id: 2}, {game_id: 1, player_character_id: 3}, {game_id: 1, player_character_id: 4}])

penalties = Penalty.create([{game_id: 1, player_character_id: 1, rule_id: 1, description: "preme in first 10 seconds??"}, {game_id: 1, player_character_id: 2, rule_id: 3, description: "kaboom"}, {game_id: 1, player_character_id: 1, rule_id: 2, description: "not doing so hot"}, {game_id: 1, player_character_id: 2, rule_id: 2, description: "matt screen clear??"}])