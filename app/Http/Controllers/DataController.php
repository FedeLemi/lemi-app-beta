<?php

namespace App\Http\Controllers;

use App\Models\FinancialInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DataController extends Controller
{
    /**
     * Handle the incoming request to save data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employeeCount' => 'required|integer|min:0',
            'businessExplanation' => 'required|string',
            'selectedActivity' => 'required|string'
        ]);
        
        $user = Auth::user();

        if (!$user->company) {
            return response()->json([
                'message' => 'User does not have an associated company.',
            ], 400);
        }

        $companyId = $user->company->id;

        FinancialInformation::updateOrCreate(
            ['company_id' => $companyId],
            [
                'number_of_employees' => $validated['employeeCount'],
                'business_description' => $validated['businessExplanation'],
                'company_activity' => $validated['selectedActivity']
            ]
        );

        return response()->json([
            'message' => 'Data saved successfully',
            'data' => $validated,
        ], 200);
    }
    
    public function getCompanyData()
    {
        $user = Auth::user();
        
        // Return default values if no company exists
        if (!$user->company) {
            return response()->json([
                'number_of_employees' => 0,
                'business_description' => '',
                'company_activity' => ''
            ]);
        }

        $financialInfo = FinancialInformation::where('company_id', $user->company->id)->first();

        return response()->json([
            'number_of_employees' => $financialInfo->number_of_employees ?? 0,
            'business_description' => $financialInfo->business_description ?? '',
            'company_activity' => $financialInfo->company_activity ?? ''
        ]);
    }
}