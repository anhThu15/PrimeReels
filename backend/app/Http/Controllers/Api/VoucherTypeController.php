<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VoucherType;
use Illuminate\Http\Request;

class VoucherTypeController extends Controller
{
    public function index()
    {
        return response()->json(VoucherType::all());
    }

    public function show($id)
    {
        $voucherType = VoucherType::find($id);
        return $voucherType ? response()->json($voucherType) : response()->json(['message' => 'Voucher Type not found!'], 404);
    }

    public function store(Request $request)
    {
        $voucherType = VoucherType::create($request->all());
        return response()->json($voucherType, 201);
    }

    public function update(Request $request, $id)
    {
        $voucherType = VoucherType::find($id);
        if ($voucherType) {
            $voucherType->update($request->all());
            return response()->json($voucherType);
        }
        return response()->json(['message' => 'Voucher Type not found!'], 404);
    }

    public function destroy($id)
    {
        $voucherType = VoucherType::find($id);
        if ($voucherType) {
            $voucherType->delete();
            return response()->json(['message' => 'Voucher Type deleted!']);
        }
        return response()->json(['message' => 'Voucher Type not found!'], 404);
    }
}