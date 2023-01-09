class User < ApplicationRecord
    has_many :nights
    validates :username, uniqueness: true
    validates :password, length: {in: 7..15}

    has_secure_password
end
