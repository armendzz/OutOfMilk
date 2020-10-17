<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lista;
use App\Models\User;
use App\Http\Resources\ListaResources;
use Illuminate\Http\Response;

class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = User::find($request->user()['id']);
        $allItems = $user->lista()->get();
        return ListaResources::collection($allItems);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $list = new Lista;
        $list->title = $request['title'];
        $list->store_id = $request['store_id'];
        $list->user_id = $request->user()['id'];
        $list->save();

        return response(['message' => 'item added' ]); 

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
            
        $item = Lista::where('id', $id)->get(); //->update($request->all());
        $match = ($item[0]['user_id'] === $request->user()['id']);
        if($match) {
            Lista::where('id', $id)->update($request->all());
        } else {
            return response()->json([
                'message' => 'You Are not Authorized for this Action!!!',
               
            ]);
        }
        //error_log($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $item = Lista::where('id', $id)->get(); //->update($request->all());
        $match = ($item[0]['user_id'] === $request->user()['id']);
        if($match) {
           Lista::where('id', $id)
        ->delete();
        return response()->json([
            'message' => 'Item Deleted from database succsessfully.',
           
        ]);
        } else {
            return response()->json([
                'message' => 'You Are not Authorized for this Action!!!',
               
            ]);
        }
     
    }
}
