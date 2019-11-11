# for making http request
import requests 
  
endpoint = 'https://hecoweb.azurewebsites.net/api/hardware/licenseplateatstation'
  
def to_svr(plate_no, station_name, date):

    js_payload = '{LicensePlate: '+plate_no+', StationName: '+station_name+', Date: '+date+'}'

    req_params = { 'json': js_payload }
    
    r = requests.post(url = endpoint, data = req_params)