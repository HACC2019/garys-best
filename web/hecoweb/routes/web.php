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

//API web
//CHANGE TO ACTUAL GULPED FILE NAME AFTER
Route::get('/', function() {
	return view('index');
});
Route::get('/api/web/getstationhealth', 'ApiHeco@getStationHealth');
Route::get('/api/web/getstationhealthstats', 'ApiHeco@getStationHealthStats');
Route::get('/api/web/getforecast', 'ApiHeco@getForecastedData');

//API app
Route::get('/api/app/postsurvey', 'ApiHecoApp@postSurvey');
Route::get('/api/app/getpoints', 'ApiHecoApp@getPoints');

//API hardware -- Checkin
Route::get('/api/hardware/licenseplateatstation', 'ApiHeco@licensePlateAtStation');
