import readlicense
import client
import capture
import time
from datetime import datetime

current_plate = ''

while(1):
    # 5 min delay
    time.sleep(60*5)
    
    # capture image
    capture.capture()
    
    # read plate
    next_plate = readlicense.readlicense('current.jpg')
    
    # if not same car, then send signal
    if(next_plate != current_plate):
        
        # update current plate
        current_plate = next_plate
        
        # get timestamp
        timestamp = datetime.now().strftime('%m/%d/%Y %H:%M:%S')
        
        # hit rest api
        client.to_svr(current_plate, 'Station_1', timestamp)