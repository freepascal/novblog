<?php

namespace Novblog\Http\Controllers;

use Illuminate\Http\Request;
use Novblog\Entry;

class EntryController extends Controller
{
    public function index()
    {
        return response()->json(['entries' => Entry::with('author')->with('tags')->get()]);
    }

    public function show($slug)
    {
        $entry = Entry::with('tags')->where('id', '=', $slug)->first();
        if ($entry) {
            return response()->json(['entry' => $entry]);
        }
        return response()->json(['error' => 'Page not found'], 404);
    }
}
