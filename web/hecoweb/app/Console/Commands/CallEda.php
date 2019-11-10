<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CallEda extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'call_eda:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Calls eda.py script to refresh prediction';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $pathCSV = storage_path('eda/data');
        $pathPy = storage_path('eda/all_forecast.py');
        
        //Get all csv data and write to csv in /eda/data/
        $ex = DB::select('exec HecoStation_Data_Proc');
        $list = array (
            array('header 1', 'header 2', 'header 3', 'header 4', 'header 5','header 6',  'header 7', 'header 8', 'header 9', 'header 10')
        );

        foreach($ex as $output)
        {
            array_push($list, array($output->StationName, $output->SessionInitiated, $output->StartTime, $output->EndTime, $output->Duration, $output->Energy, $output->SessionAmount, $output->SessionID, $output->PortType, $output->PaymentMode));
        }
        
        $fp = fopen($pathCSV, 'w');
        
        foreach ($list as $fields) {
            fputcsv($fp, $fields);
        }
        
        fclose($fp);
        shell_exec('py ' . $pathPy . ' ' . $pathCSV);
    }
}
