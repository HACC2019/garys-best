<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Views web
Route::get('/', function () {
    return view('welcome');
});

//API web

//API app
Route::post('/api/app/postsurvey', 'ApiHecoApp@postSurvey');
Route::get('/api/app/getpoints', 'ApiHecoApp@getPoints');

//API hardware -- Checkin
Route::post('/api/hardware/licenseplateatstation', 'ApiHeco@licensePlateAtStation');
