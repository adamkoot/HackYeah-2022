<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AnnouncementController extends Controller
{
    /**
     * Get announcements
     */
    public function index()
    {
        $announcements = Announcement::where('user_id', '!=', auth()->id())->where('status', 0)->orderBy('id', 'DESC')->get();
        return response()->json(['announcements' => $announcements]);
    }

    /**
     * @param Announcement $announcement
     * Get announcement by id
     */
    public function get(Announcement $announcement)
    {
        return response()->json($announcement->load(['user']), 200);
    }

    /**
     * @param Request $request - [categories, title, content, status, adress, lat, lon]
     * Creates new announcement
     */
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'address' => 'required',
            'status' => 'required',
            'available_now' => 'required',
            'lat' => 'required',
            'lon' => 'required',
            'categories' => 'required'
        ]);

        $validatedData['user_id'] = auth()->id();

        $announcement = Announcement::create($validatedData);

        return response()->json(['message' => 'Annoucement has been created', 'annoucement' => $announcement], 201);

    }


    /**
     * @param Announcement $announcement
     * Deletes announcement by announcement_id
     */
    public function delete(Announcement $announcement)
    {
        if ($announcement->delete())
            return response()->json(['message' => 'Annoucement was deleted successfully'], 200);

        return response()->json(['message' => "Couldn't delete annoucement now"], 404);
    }

    /**
     * @param $announcement_id - DB id of announcement
     * @param $status - 0 or 1
     */
    public function change_status($announcement_id, $status)
    {
        Announcement::where('id', $announcement_id)->update(
            array('status' => $status)
        );

        return response()->json(['message' => "Suucessfully changed status of id:".$announcement_id.' for:'.$status]);
    }

    /**
     * @param $announcement_id - DB id of announcement
     * @param $availability - 0 or 1
     */
    public function change_availability($announcement_id, $availability)
    {
        Announcement::where('id', $announcement_id)->update(
            array('available_now', $availability)
        );

        return response()->json(['message' => "Suucessfully changed availability of id:".$announcement_id.' for:'.$availability]);
    }

    public function my_announcements()
    {
        return response()->json(['announcements' => Announcement::where('user_id', auth()->id())->get()]);
    }

}
