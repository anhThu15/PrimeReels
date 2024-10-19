<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;
use App\Models\Invoice;
use App\Models\Package;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PackageController extends Controller
{
    // API tạo gói dịch vụ
    public function createPackage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'duration' => 'required|integer',
            'price' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $package = Package::create($validator->validated());

        return response()->json($package, 201);
    }

    // API lấy danh sách gói dịch vụ
    public function index()
    {
        $packages = Package::all();
        return response()->json($packages);
    }

    // API lấy thông tin gói dịch vụ theo ID
    public function show($package_id)
    {
        $package = Package::find($package_id);

        if (!$package) {
            return response()->json(['error' => 'Gói dịch vụ không tồn tại.'], 404);
        }

        return response()->json($package);
    }

    // API cập nhật gói dịch vụ
    public function update(Request $request, $package_id)
    {
        $package = Package::find($package_id);

        if (!$package) {
            return response()->json(['error' => 'Gói dịch vụ không tồn tại.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'duration' => 'sometimes|required|integer',
            'price' => 'sometimes|required|decimal:0,2',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $package->update($validator->validated());

        return response()->json($package);
    }

    // API xóa gói dịch vụ
    public function destroy($package_id)
    {
        $package = Package::find($package_id);

        if (!$package) {
            return response()->json(['error' => 'Gói dịch vụ không tồn tại.'], 404);
        }

        $package->delete();

        return response()->json(['message' => 'Gói dịch vụ đã được xóa.']);
    }

}