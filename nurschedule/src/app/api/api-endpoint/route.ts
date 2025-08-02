import { NextRequest, NextResponse } from "next/server";   
import {parseShiftRequest} from "@/lib/llm-service";

export async function GET(req:NextRequest):Promise<NextResponse> {
    try{
        let message = await parseShiftRequest("i want to add a shift on august 10 at night")
        return NextResponse.json(message)
    } catch (error){
        console.log(error);
        return NextResponse.json({error: error}, {status: 500})
        
    }
    
}