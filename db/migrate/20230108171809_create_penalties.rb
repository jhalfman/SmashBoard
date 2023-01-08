class CreatePenalties < ActiveRecord::Migration[6.1]
  def change
    create_table :penalties do |t|
      t.belongs_to :player_character, null: false, foreign_key: true
      t.belongs_to :rule, null: false, foreign_key: true
      t.belongs_to :game, null: false, foreign_key: true
      t.string :description

      t.timestamps
    end
  end
end
