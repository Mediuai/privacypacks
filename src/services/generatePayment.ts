import axios from "axios"
import api from "./api"

export const generatePayment = async (value: number) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pix/cashIn`, {
        value: value,
        "webhook_url": ``
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        },
    })
    return response.data
}

export const qrCodeStatus = async (transactionId: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${transactionId}`, {
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        },
    })
    return response.data
}