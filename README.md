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
