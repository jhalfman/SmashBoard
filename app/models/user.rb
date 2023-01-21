class User < ApplicationRecord
    has_many :nights
    has_many :penalties
    validates :username, uniqueness: {case_sensitive: false}
    validates :password, length: {in: 7..15}, allow_blank: true
    

    has_secure_password
end
