<?php

namespace App\Http\Controllers;
use App\Models\Lista;
use App\Http\Resources\ListaResources;
use Illuminate\Http\Request;
use App\Models\Store;
use App\Models\User;
use App\Http\Resources\StoreResources;
use Illuminate\Http\Response;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $user = User::find($request->user()['id']);
        $store = $user->storee()->get();
        return StoreResources::collection($store);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $store = new Store;
        $store->name = $request['name'];
        $store->user_id = $request->user()['id'];
        $store->save();
     //   Store::create($request->all());

        return response(['message' => 'store created' ]);  //add ->status(); 
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $user = User::find($request->user()['id']);
        $store = $user->lista()->where('store_id','=',$id)->get(); 
        return ListaResources::collection($store);

      }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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

       
        $store = Store::where('id', $id)->get(); //->update($request->all());
        $match = ($store[0]['user_id'] === $request->user()['id']);
        if($match) {
            Store::where('id', $id)->update(['name' => $request['name']]);
            return response()->json([
                'message' => 'Store Name updated sucssessfully!!!',
               
            ]);
        } else {
            return response()->json([
                'message' => 'You Are not Authorized for this Action!!!',
               
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $store = Store::where('id', $id)->get(); //->update($request->all());
        $match = ($store[0]['user_id'] === $request->user()['id']);
        if($match) {
            Store::where('id', $id)
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
