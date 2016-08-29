<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        define('name',      'name');
        define('email',     'email');
        define('password',  'password');
        define('is_active', 'is_active');

        DB::table('users')->insert(array(
            array(
                name        => 'Injury',
                email       => 'magicalmoon17@gmail.com',
                password    => bcrypt('12345678'),
                is_active   => 1
            )
        ));
    }
}
