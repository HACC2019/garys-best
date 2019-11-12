# garys-best
## https://hecoweb.azurewebsites.net/

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