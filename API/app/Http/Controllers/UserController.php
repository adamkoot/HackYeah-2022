<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * @return array
     * Returns array of details of logged user
     */
    public function me()
    {
        return ['user' => auth()->user()];
    }

    /**
     * @param $user_id - DB id of user
     * Returns array of details of selected user
     */
    public function user_details($user_id)
    {
        $details = User::where('id', $user_id)->first();

        return response()->json(['user' => $details]);
    }

    /**
     * @param Request $request
     * Edits selected user by id
     */
    public function edit(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required',
            'name' => 'required|max:255',
            'email' => 'email|required',
            'phone' => 'required|max:9'
        ]);

        $edited_user = User::where('id', $request->id)->update(
            [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone
            ]
        );

        return response()->json(['message' => 'User has been successfully edited', 'user' => $edited_user], 201);
    }

    /**
     * @param User $user
     * Deletes user
     */
    public function delete(User $user)
    {
        if ($user->delete())
            return response()->json(['message' => 'User was deleted successfully']);

        return response()->json(['message' => "Couldn't delete this user now"], 404);
    }
}
