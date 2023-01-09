# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_01_09_030802) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "games", force: :cascade do |t|
    t.integer "time"
    t.string "notes"
    t.bigint "night_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["night_id"], name: "index_games_on_night_id"
  end

  create_table "nights", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_nights_on_user_id"
  end

  create_table "penalties", force: :cascade do |t|
    t.bigint "player_character_id", null: false
    t.bigint "rule_id", null: false
    t.bigint "game_id", null: false
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_penalties_on_game_id"
    t.index ["player_character_id"], name: "index_penalties_on_player_character_id"
    t.index ["rule_id"], name: "index_penalties_on_rule_id"
  end

  create_table "player_character_games", force: :cascade do |t|
    t.bigint "player_character_id", null: false
    t.bigint "game_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_player_character_games_on_game_id"
    t.index ["player_character_id"], name: "index_player_character_games_on_player_character_id"
  end

  create_table "player_characters", force: :cascade do |t|
    t.bigint "player_id", null: false
    t.bigint "character_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["character_id"], name: "index_player_characters_on_character_id"
    t.index ["player_id"], name: "index_player_characters_on_player_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "rules", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "image"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.boolean "admin"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "games", "nights"
  add_foreign_key "nights", "users"
  add_foreign_key "penalties", "games"
  add_foreign_key "penalties", "player_characters"
  add_foreign_key "penalties", "rules"
  add_foreign_key "player_character_games", "games"
  add_foreign_key "player_character_games", "player_characters"
  add_foreign_key "player_characters", "characters"
  add_foreign_key "player_characters", "players"
end
