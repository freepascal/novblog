<?php

namespace Novblog;

use Illuminate\Database\Eloquent\Model;
use Novblog\Entry;

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
}
