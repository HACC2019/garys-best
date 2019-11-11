# for making http request
import requests 
  
endpoint = 'https://hecoweb.azurewebsites.net/api/hardware/licenseplateatstation'
  
def to_svr(plate_no, station_name):

    js_payload = '{LicensePlate: '+plate_no+', StationName: '+station_name+'}'

    req_params = { 'json': js_payload }
    
    r = requests.post(url = endpoint, data = req_params)