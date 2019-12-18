import readlicense
import client
import capture
import time
from datetime import datetime
import cloudinary
import cloudinary.uploader
import cloudinary.api

current_plate = ''

# setup cloudinary account
cloudinary.config( 
  cloud_name = "doj5igtuc", 
  api_key = "458253797986536", 
  api_secret = "Xn_dl4qP9qD9HogKTyyUeEngYKY" 
)

while(1):
    # 5 min delay
    time.sleep(60*5)
    
    # capture image
    capture.capture()
    
    # read plate
    next_plate = readlicense.readlicense('current.jpg')

    # get timestamp
    timestamp = datetime.now().strftime('%m/%d/%Y %H:%M:%S')

    # send image to cloudinary api and perform callback to add to db
    cloudinary.uploader.upload('current.jpg', 
        folder = "pi_surv/", 
        public_id = '+'.join(timestamp.split(' ')),
        overwrite = true, 
        notification_url = "https://hecoweb.azurewebsites.net/api/app/addImage?public_id="+'+'.join(timestamp.split(' ')), 
        resource_type = "image")
    
    # if not same car, then send signal
    if(next_plate != current_plate):
        
        # update current plate
        current_plate = next_plate
        
        # hit rest api
        client.to_svr(current_plate, 'Station_1', timestamp)