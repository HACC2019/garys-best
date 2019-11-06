# for making http request
import requests 
  
endpoint = '/api/hardware/licenseplateatstation.php'
  
def to_svr(plate_no, station_name):

    js_payload = '{LicensePlate: '+plate_no+', StationName: '+station_name+'}'

    req_params = { 'json': js_payload }
    
    r = requests.post(url = endpoint, data = req_params) 