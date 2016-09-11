<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEntriesTagsTable extends Migration
{
    public function up()
    {
        Schema::create('entries_tags', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('entry')->references('id')->on('entries')->onDelete('cascade');
            $table->integer('tag')->references('id')->on('tags')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('entries_tags');
    }
}
