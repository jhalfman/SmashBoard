class AddImageToRules < ActiveRecord::Migration[6.1]
  def change
    add_column :rules, :image, :string
  end
end
