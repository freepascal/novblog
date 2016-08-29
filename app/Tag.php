<?php

namespace Novblog;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function entries()
    {
        return $this->belongsToMany('Novblog\Entry', 'entries_tags', 'tag', 'entry');
    }
}
