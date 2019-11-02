<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiHecoApp extends Controller
{
	
	/*
	JSON object should contain
		License Plate #
		User Satisfaction
	*/
	function postReview(Request $request)
	{

	}

	/*
	JSON object should contain
		License Plate #
		Android_ID
			- Secure.ANDROID_ID on in android sdk | Don't want to have it be possible so that anyone querying the endpoint can figure out how many points someone has
	*/
	function getPoints(Request $request)
	{

	}

}
