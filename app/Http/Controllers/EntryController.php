<?php

namespace Novblog\Http\Controllers;

use Illuminate\Http\Request;
use Novblog\Entry;
use Novblog\Tag;
use Validator;
use Log;
use DB;

class EntryController extends AuthController
{
    public function index()
    {
        return response()->json(['entries' => Entry::with('author')->with('tags')->get()]);
    }

    public function show($slug)
    {
        $entry = Entry::with(['author', 'tags'])->where('id', '=', $slug)->first();
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

    public function update($id, Request $req)
    {
        $user = $this->user($req, $nullOnFail = true);
        if (!$user) {
            return response()->json(['error' => 'do_not_have_permission'], 403);
        }
        $entry = Entry::with(['author', 'tags'])->where('id', '=', $id)->first();
        $entry->title = $req->input('title');
        $entry->body = $req->input('body');
        $entry->author = $user->id;

        // $entry->tags are old tags
        $old_tags_collection = $entry->tags->map(function($item) {
            return $item->id;
        });

        // $new_tags_collection are new tags need to update
        $new_tags_collection = collect();
        foreach($req->input('tags') as $tag) {
            // new tags will be insert into database
            $new_tags_collection->push(Tag::firstOrCreate(['tag' => $tag]));
        }

        // we only need Id of tag
        $new_tags_collection = $new_tags_collection->map(function($item) {
            return $item->id;
        });

        foreach($new_tags_collection->diff($old_tags_collection)->toArray() as $tag_id) {
            $entry->tags()->attach($tag_id);
        }
        
        foreach($old_tags_collection->diff($new_tags_collection)->toArray() as $tag_id) {
            $entry->tags()->detach($tag_id);
        }

        $entry->save();
        return response()->json(['success' => sprintf("Entry with id %d updated", $id)], 200);
    }

    public function destroy($id, Request $req)
    {
        $user = $this->user($req, $nullOnFail = true);
        if (!$user) {
            return response()->json(['error' => 'do_not_have_permission'], 403);
        }
        $entry = Entry::where('id', '=', $id)->first();
        $entry->delete(); /* this function return NULL */
        return response()->json(['success' => 'delete success'], 200);
    }
}
