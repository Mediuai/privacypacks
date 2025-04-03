import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

function savePaymentStatus(id: string, status: string) {
  let data: Record<string, string> = {};
  if (fs.existsSync(dbPath)) {
    data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  }
  data[id] = status;
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (status === "paid") {
      console.log(`Pagamento confirmado! ID: ${id}`);
      savePaymentStatus(id, status);
    }

    return NextResponse.json({ message: "Webhook processado" }, { status: 200 });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
