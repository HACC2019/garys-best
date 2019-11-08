<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;


class ApiHeco extends Controller
{

	/*
	JSON object should contain
		License Plate #
		Station #

		For station checkin
	*/
	function licensePlateAtStation(Request $request)
	{
		if($request->has('json'))
		{
			$json = json_decode($request->input('json'), true);
			
			$ex = DB::select('exec HecoStation_CheckinCar_Proc ?,?', array(
					$json['LicensePlate'],
					$json['StationName']
				)
			);

			//Should only return 1 row
			foreach($ex as $output)
			{
				return json_encode($output);
			}
		}
	}

}
