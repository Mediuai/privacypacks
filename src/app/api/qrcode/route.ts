import api from "@/services/api";
import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const pix = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pix/cashIn`, {
            value: body.value,
            "webhook_url": `http://26.236.128.2:3000/api/webhook-pix`
        }, {
            headers: {
                'Authorization': `Bearer 20979|jbBB0PH8DyLfQASbTdmR8hT3BznqvPGEbci5XhvD166bb92f`
            },
        })

        return NextResponse.json(pix.data)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })
    }

}

