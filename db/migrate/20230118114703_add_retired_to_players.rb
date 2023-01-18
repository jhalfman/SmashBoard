class AddRetiredToPlayers < ActiveRecord::Migration[6.1]
  def change
    add_column :players, :retired, :boolean, default: false
  end
end
