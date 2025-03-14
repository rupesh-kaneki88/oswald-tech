import { NextResponse } from "next/server";
import { corsHeaders } from "@/lib/cors";

export async function POST(request) {
    try{
        const body = await request.json()
        const {name, email, mobile} = body

        if (!name || !email || !mobile ) {
            return NextResponse.json(
            { success: false, message: 'Name, email, and mobile are required fields' },
            { status: 400, headers: corsHeaders() }
            );
        }

        return NextResponse.json(
            {success: true,  message: 'data received', body},
            { status: 200, headers: corsHeaders()}
        )
    } catch(error){
        console.log('Error at api side: ', error)
    }
}

export async function OPTIONS() {
    return new Response(null, { 
        status: 204, 
        headers: corsHeaders()
    });
}