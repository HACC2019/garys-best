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

	function getStationHealth(Request $request)
	{
		if($request->has('json'))
		{
			$json = json_decode($request->input('json'), true);
			
			$ex = DB::select('exec HecoStation_GetStationHealth_Proc ?', array(
					$json['StationID']
				)
			);
			
			return json_encode($ex);
		}
	}

	function getStationHealthStats(Request $request)
	{
		if($request->has('json'))
		{
			$json = json_decode($request->input('json'), true);
			
			$ex = DB::select('exec HecoStation_GetStationHealthStats_Proc');
			
			return json_encode($ex);
		}
	}

	function getForecastedData(Request $request)
	{
		$ex = DB::select('SELECT [Timestamp], Energy, ErrorRounding, ErrorCalculation, OnPeak, MidDay, OffPeak, PortType_CHADEMO, PortType_DCCOMBOTYP1, PaymentMode_CreditCard, PaymentMode_RFID FROM HecoDB.dbo.ForecastOutputEnergyTbl');

		return json_encode($ex);
	}

}
