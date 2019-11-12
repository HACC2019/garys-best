<div align="center">
<h1>HECO Rewards</h1>
</div>
<div align="center">
<h3>Developed by Gary's Best</h3>
</div>

<div align="center">
[Website](https://hecoweb.azurewebsites.net/) | [Devpost](https://devpost.com/software/electric-vehicle-charging-analysis-5dv7mo)
</div>

## Overview
The heart of our solution is to increase the understanding of the current data, and future data that HECO will be able to obtain about their Electrical Vehicle (EV) Charging Stations. By using the current set of data HECO has provided, we identify payment errors that have occurred and note the overall congestion of the charging stations. Using the historical data, we are able to use Machine Learning to forecast when future errors may occur and the expected congestion of the charging stations. Using only payment session data alone provides little insight as to what is happening at the charging stations at it biases the data in two ways:
1. We only see the charging stations that are successful
2. We only see the payment information and nothing about the health of the charging stations.

By creating a mobile application, "HECO Rewards", we are able to obtain information about the charging sessions, successful or unsuccessful, which provides a new set of data that HECO has otherwise had no access to. We supplement this with a license plate reader to ensure that the users who submit data on the application were actually present at the charging station.


## Predictive Forecasting
### Problem
One of the core issues with the challenge is being able to determine if there are issues with a charging station before they occur. The underlying problem could be due to a myriad of factors that are not present in the data; however, using historical data we can forecast the future data.

### Solution
From the historical data, we identify if there are issues occurring with the payment system as well as the congestion of the charging station. The system first performs data validation such as verifying if the amount paid matches the duration and amount of energy drawn during the charging session. Combined with Machine Learning, we can forecast the expected amount of vehicles that will visit a charging station, the overall amount of energy that will be provided throughout the day, and the number of expected errors that will occur at a charging station.


## Mobile Application 
### Problem
One of the core issues with the challenge is a lack of information of what's really happening at each charging station. From the data provided, we only know information about each of the successful charging sessions but nothing about the users who may have encountered problems.
### Solution
To remedy this, we have created a mobile application that is designed to allow users to report if they have had a successful charging session or alternatively report any issues that may have arisen. By allowing users to report incidents from their charging sessions, HECO is able to obtain immediate information about problems with a charging station that are otherwise unobtainable or are left to a predictive forecasting by our system in the back-end. Through user reporting, our system obtains concrete information that there is a problem at the charging station that can be then be further verified by a HECO technician. The incentive of the mobile application for users is by gamifying charging sessions for users to obtain points which they can then redeem for rewards such as free credits on their next charging session. By connecting HECO with the users of their EV charging stations, 

## HECO Rewards Hardware
### Problem
One of the core issues with the challenge is a lack of information of who is at the charging station and what type of vehicle is there. Also an issue that arises with the introduction of our mobile application is that users could game the system by reporting false sessions if there is no way to verify if they are actually using it

### Solution
To solve these problems, we have prototyped a license plate reader using a Raspberry PI mounted with an Arduino Camera. Whenever a new vehicle appears in front of the camera, a picture is taken of the vehicle's license plate. The Raspberry PI then utilizes OpenCV to extract the characters of the license plate in the image and sends it to our database in the back-end in real time. While there is no car or if it is the same car charging, the Raspberry PI will not send the data to the database. The license plate of each vehicle is registered with our HECO Rewards application ensuring that users who send reports for a particular charging station were actually using them.



## BUILD WEB

### Requirements
Cron (optional, see alternative)

PHP Version >= 7.1.3

Composer

Laravel Installer
```
composer global require laravel/installer
```


### Install Dependencies
Navigate to ./web/hecoweb to install dependencies
```
composer install
```

### Server Setup/Environment
Copy or rename the .env.example file to a file named .env

Generate a key
```
php artisan key:generate
```

### START SERVER
```
php artisan serve
```

### Cron Jobs
Note that the project makes uses of scheduled tasks which require cron. If your environment does not have cron installed, you'll need an alternative to run the following command
```
php artisan call_eda:run
```
which is responsible for forecasting data gathered from stations

# Raspberry Pi Setup
Boot your Raspberry Pi and go to the terminal.
 
Most of the Raspberry Pi comes with Raspbian Desktop that has pip install. To check if you have pip install, use the following command:

```
pip --version
```

If you get an error saying that you don't have pip install, use the following command to install pip.

```
sudo apt install python3-pip
```

After checking that pip is installed. Navigate to the pi-src folder and run the setup.sh file.

```
--Navigate to pi-src.

cd ../pi-src

-- Run setup.sh
sh setup.sh
```

After running the setup.sh, run the main.sh file and the Rasberry Pi should start taking pictures and sending the data to the database.

```
-- Be sure that you are in the pi-src directory, if not use the following command.

cd ../pi-src

-- To run the main.sh
sh main.sh
```