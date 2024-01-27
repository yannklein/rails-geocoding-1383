class Flat < ApplicationRecord
  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?
end

# if not default coord names
# geocoded_by :address, latitude: :lat, longitude: :lon