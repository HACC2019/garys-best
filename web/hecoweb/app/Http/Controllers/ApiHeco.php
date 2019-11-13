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
				return response()->json($output);
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
			
			return response()->json($ex);
		}
	}

	function getStationHealthStats(Request $request)
	{
		$ex = DB::select('exec HecoStation_GetStationHealthStats_Proc');
		
		return response()->json($ex);
	}

	function getData(Request $request)
	{
		$ex = DB::select('SELECT StationName, SessionInitiated, StartTime, EndTime, Duration, Energy, SessionAmount, SessionID, PortType, PaymentMode FROM HecoDB.dbo.StationDataTbl');

		return response()->json($ex);
	}

	function getForecastedData(Request $request)
	{
		$ex = DB::select('SELECT [Timestamp], Energy, ErrorRounding, ErrorCalculation, OnPeak, MidDay, OffPeak, PortType_CHADEMO, PortType_DCCOMBOTYP1, PaymentMode_CreditCard, PaymentMode_RFID FROM HecoDB.dbo.ForecastOutputEnergyTbl');

		return response()->json($ex);
	}

	/*
	JSON object should contain
		Periodicity - integer
			- 0: day
			- 1: week
			- 2: month
			- 3: year
	*/
	function getCheckinData(Request $request)
	{
		if($request->has('json'))
		{
			$json = json_decode($request->input('json'), true);

			$ex = DB::select('exec HecoStation_GetStationCheckin_Proc ?', array(
					$json['Periodicity']
				)
			);

			return response()->json($ex);
		}
	}

	function getHistoricalData(Request $request)
	{
		$ex = DB::select('SELECT [StationName]
      ,[Timestamp]
      ,[Energy]
      ,[Amount]
      ,[OnPeak]
      ,[MidDay]
      ,[OffPeak]
      ,[CorrectAmount]
      ,[ErrorRounding]
      ,[ErrorCalculation]
      ,[SessionTypeDevice]
      ,[SessionTypeMobile]
      ,[SessionTypeWeb]
      ,[PortType_CHADEMO]
      ,[PortType_DCCOMBOTYP1]
      ,[PaymentMode_CreditCard]
      ,[PaymentMode_RFID]
      ,[CorrectDuration] FROM HecoDB.dbo.[StationDataHistoricalTbl]');

		return response()->json($ex);
	}

}
