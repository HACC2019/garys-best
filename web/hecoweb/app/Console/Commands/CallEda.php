<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

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
        //Get all csv data and write to csv in /eda/data/
        $ex = DB::select('exec HecoStation_Data_Proc');
        $list = array (
            array('header 1', 'header 2', 'header 3', 'header 4', 'header 5','header 6',  'header 7', 'header 8', 'header 9', 'header 10')
        );
        foreach($ex as $output)
        {
            array_push($list, array($ex[0], $ex[1], $ex[2], $ex[3], $ex[4], $ex[5], $ex[6], $ex[7], $ex[8], $ex[9]));
        }
        
        $fp = fopen('/eda/data/hacc.csv', 'wb');
        
        foreach ($list as $fields) {
            fputcsv($fp, $fields);
        }
        
        fclose($fp);
        shell_exec('py /eda/eda.py');
    }
}
