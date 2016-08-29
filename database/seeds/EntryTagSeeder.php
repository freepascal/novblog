<?php

use Illuminate\Database\Seeder;

class EntryTagSeeder extends Seeder
{
    public function run()
    {
        define('entry', 'entry');
        define('tag',   'tag');

        DB::table('entries_tags')->insert(array(
            array(
                entry   => 1,
                tag     => 1
            ),
            array(
                entry   => 2,
                tag     => 1
            ),
            array(
                entry   => 2,
                tag     => 2
            )
        ));
    }
}
