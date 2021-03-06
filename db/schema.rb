# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141108192841) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "decks", force: true do |t|
    t.integer  "quizlet_deck_id"
    t.string   "title"
    t.integer  "term_count"
    t.integer  "quizlet_modified_date"
    t.json     "cards"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "included_decks", force: true do |t|
    t.string   "title"
    t.integer  "term_count"
    t.json     "cards"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "uid"
    t.string   "profile_img"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
