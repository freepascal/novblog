<?php

namespace Novblog\Http\Controllers;

use Illuminate\Http\Request;
use Novblog\Entry;
use Novblog\Tag;
use Validator;
use Log;

class EntryController extends AuthController
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

    public function store(Request $req)
    {
        $user = $this->user($req, $nullOnFail = true);
        if (!$user) {
            return response()->json(['error' => 'do_not_have_permission'], 403);
        }

        $validator = Validator::make($req->all(), array(
            'title' => 'required|min:10',
            'body'  => 'required|min:200'
        ));

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $entry = new Entry;

        $entry->title = $req->input('title');
        $entry->body = $req->input('body');
        $entry->author = $user->id;

        if ($id = $entry->save()) {
            // retrieve or insert new tags
            $tags = $req->input('tags');
            foreach($tags as $tag) {
                $entry->tags()->save(Tag::firstOrCreate(['tag' => $tag]));
            }
            return response()->json(['success' => sprintf("Entry with id %d created", $id)], 200);
        }

        return response()->json(['error' => 'An error occurs while saving entry'], 500);
    }

    public function destroy($id, Request $req)
    {
        $user = $this->user($req, $nullOnFail = true);
        if (!$user) {
            return response()->json(['error' => 'do_not_have_permission'], 403);
        }
        Entry::destroy($id);
        return response()->json(['success' => 'delete success']);
    }
}
