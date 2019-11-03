<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiHecoApp extends Controller
{
	
	/*
	JSON object should contain
		LicensePlate
		DidTheCarCharge - boolean
		CardDeclined - boolean
		CardReaderBroken - boolean
		IsTesla - boolean
		PortType - string (50 chars)
		AdditionalComments - string (255 chars)
	*/
	function postReview(Request $request)
	{
		if($request->has('json'))
		{
			$json = json_decode($request->input('json'));
			
			$ex = DB::select('exec HecoRewards_InsertSurvey_Proc(?,?,?,?,?,?,?)', array(
					$json['LicensePlate'],
					$json['DidTheCarCharge'],
					$json['CardDeclined'],
					$json['CardReaderBroken'],
					$json['IsTesla'],
					$json['PortType'],
					$json['AdditionalComments']
				)
			);

			//Should only return 1 row
			foreach($ex as $output)
			{
				return json_encode($output);
			}
		}
	}

	/*
	JSON object should contain
		LicensePlate
	*/
	function getPoints(Request $request)
	{
		if($request->has('json'))
		{
			$json = json_decode($request->input('json'));
			
			$ex = DB::select('exec HecoRewards_GetPoints_Proc(?)', array(
					$json['LicensePlate']
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
