class CreateSessions < ActiveRecord::Migration[6.1]
  def change
    create_table :sessions do |t|
      t.string :name
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
