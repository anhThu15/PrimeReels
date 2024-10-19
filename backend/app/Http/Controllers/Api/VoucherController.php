<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Voucher;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    public function index()
    {
        return response()->json(Voucher::with('voucherType')->get());
    }

    public function show($id)
    {
        $voucher = Voucher::with('voucherType')->find($id);
        return $voucher ? response()->json($voucher) : response()->json(['message' => 'Voucher not found!'], 404);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:1000',
            'voucher_type_id' => 'required|exists:voucher_types,voucher_type_id',
            'voucher_quantity' => 'required|integer|min:1',
            'expired' => 'required|date',
            'enddate' => 'required|date|after_or_equal:expired',
        ]);

        $voucher = Voucher::create($request->all());
        return response()->json($voucher, 201);
    }

    public function update(Request $request, $id)
    {
        $voucher = Voucher::find($id);
        if ($voucher) {
            $request->validate([
                'name' => 'string|max:1000',
                'voucher_type_id' => 'exists:voucher_types,voucher_type_id',
                'voucher_quantity' => 'integer|min:0',
                'expired' => 'date',
                'enddate' => 'date|after_or_equal:expired',
            ]);

            $voucher->update($request->all());
            return response()->json($voucher);
        }
        return response()->json(['message' => 'Voucher not found!'], 404);
    }

    public function destroy($id)
    {
        $voucher = Voucher::find($id);
        if ($voucher) {
            $voucher->delete();
            return response()->json(['message' => 'Voucher deleted!']);
        }
        return response()->json(['message' => 'Voucher not found!'], 404);
    }
}
