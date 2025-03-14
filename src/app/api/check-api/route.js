import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        const body = await request.json()
        const {name, email, mobile} = body

        if (!name || !email || !mobile ) {
            return NextResponse.json(
            { success: false, message: 'Name, email, and mobile are required fields' },
            { status: 400 }
            );
        }

        return NextResponse.json(
            {success: true,  message: 'data received', body},
            { status: 200}
        )
    } catch(error){
        console.log('Error at api side: ', error)
    }
}