<?php

Route::get('/', 'Controller@index');

Route::group(array('prefix' => 'api'), function() {
    Route::post('auth/register', 'AuthController@register');
    Route::post('auth/login', 'AuthController@login');
    Route::post('auth/user', 'AuthController@user');
    Route::get('auth/verify/{registration_code}', 'AuthController@verifyEmail');

    
});
