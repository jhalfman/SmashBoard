class CreatePlayerCharacterGames < ActiveRecord::Migration[6.1]
  def change
    create_table :player_character_games do |t|
      t.belongs_to :player_character, null: false, foreign_key: true
      t.belongs_to :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
