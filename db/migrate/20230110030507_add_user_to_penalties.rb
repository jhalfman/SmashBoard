class AddUserToPenalties < ActiveRecord::Migration[6.1]
  def change
    add_column :penalties, :user_id, :integer, null: false, foreign_key: true
  end
end
