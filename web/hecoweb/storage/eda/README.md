# Data Analysis

## Error Analysis
Based on the data, we classify "data errors" into two separate categories:
- Rounding Errors
- Calculation Errors
A rounding error is reported when the listed cost of the session and the calculated cost based on the duration and time of day of the charging session is off by $0.01. If the difference is greater, we classify this as a calculation error. For rounding errors, we suspect that the external provider did not propogate one of the values such as duration properly (duration is off by a second, energy is off by 0.01 kWh) while a calculation error is more dubious. As we cannot directly validate the reason behind these errors, our system flags these into separate SQL tables and reports it on the admin dashboard. 

## Time Series Forecasting
Our setup is ready to ingest the charging session data from each of the charging stations and forecast the expected future usage of the charging stations. For each charging station, we forecast the following quantities for the upcoming week by day:
- Total Energy consumed during the day
- Number of sessions during "On-Peak" (5pm - 10pm), "Mid-Day" (9am - 5pm), and "Off Peak" (10pm - 9am)
- Expected number of "rounding" and "calculation" errors
- Number of vehicles that will use "CHADEMO" and "DCCOMBOTYP1" ports
- Number of payments that will come through a "Credit Card" or "RFID"
- Number of sessions initiated by "Mobile", "Device", or "Web"





