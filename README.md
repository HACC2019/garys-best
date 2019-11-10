# garys-best
## https://hecoweb.azurewebsites.net/

## BUILD WEB

### Requirements
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
