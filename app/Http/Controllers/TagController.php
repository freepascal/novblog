<?php

namespace Novblog\Http\Controllers;

use Illuminate\Http\Request;
use Novblog\Tag;
use Novblog\Entry;
use DB;

class TagController extends Controller
{
    public function index()
    {
        $query = "SELECT count(entries_tags.entry) as total, tags.tag "
                ."FROM entries_tags, tags "
                ."WHERE entries_tags.tag = tags.id "
                ."GROUP BY entries_tags.tag, tags.tag";
        $tags = DB::select(DB::raw($query));
        return response()->json(['tags' => $tags]);
    }

    public function show($tag)
    {
        $entries = Entry::with('author', 'tags')
                        ->join('entries_tags', 'entries_tags.entry', '=', 'entries.id')
                        ->join('tags', 'tags.id', '=', 'entries_tags.id')
                        ->where('tags.tag', '=', $tag)
                        ->get();
        if ($entries) {
            return response()->json(['entries' => $entries]);
        }
        return response()->json(['error' => 'Page not found'], 404);
    }
}
