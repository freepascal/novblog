<?php

use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    public function run()
    {
        define('tag', 'tag');
        DB::table('tags')->insert(array(
            [tag     => 'Javascript'],
            [tag     => 'Backbone'],
            [tag     => 'Angular'],
            [tag     => 'Knockout'],
            [tag     => 'React'],
            [tag     => 'Ember'],
            [tag     => 'PHP'],
            [tag     => 'Laravel'],
        ));
    }
}
