class User < ApplicationRecord
    has_many :nights
    validates :username, uniqueness: {case_sensitive: false}
    validates :password, length: {in: 7..15}

    has_secure_password
end
