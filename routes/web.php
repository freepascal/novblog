<?php

Route::get('/', 'Controller@index');

Route::group(array('prefix' => 'api'), function() {
    Route::post('auth/register', 'AuthController@register');
    Route::post('auth/login', 'AuthController@login');
    Route::post('auth/user', 'AuthController@user');
    Route::get('auth/verify/{registration_code}', 'AuthController@verifyEmail');

    Route::resource('entry', 'EntryController', ['only' => ['index', 'store', 'destroy', 'update']]);
    Route::get('entry/{id}/{slug?}', 'EntryController@show');
    Route::get('entry/paginate/{page_index}/{page_size}', 'EntryController@paginate');

    Route::resource('tag', 'TagController', ['only' => ['index', 'show']]);
});

//Route::get('tag/{slug}', 'TagController@show2');

Route::get('/test', function() {
    return 'test';
});
