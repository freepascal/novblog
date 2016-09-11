<?php

namespace Novblog;

use Illuminate\Database\Eloquent\Model;
use Novblog\Entry;
use DB;

class Entry extends Model
{
    public function author()
    {
        return $this->belongsTo('Novblog\User', 'author');
    }

    public function tags()
    {
        return $this->belongsToMany('Novblog\Tag', 'entries_tags', 'entry', 'tag');
    }

    public function delete()
    {
        DB::select(DB::raw("DELETE FROM entries_tags WHERE entry = :id"), array(
            'id'    => $this->id
        ));
        parent::delete();
    }
}
