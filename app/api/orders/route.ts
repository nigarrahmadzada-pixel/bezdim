import { NextResponse } from "next/server";
import { deliverOrder } from "@/lib/deliver-order";
import { parseOrderInput } from "@/lib/orders";

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseOrderInput(body);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const order = parsed.order;
    const deliveryFailures = await deliverOrder(order);

    if (deliveryFailures.length === 2) {
      return NextResponse.json(
        {
          error:
            "Sifariş qəbul olundu, amma bildiriş göndərilmədi. Bizimlə əlaqə saxlayın.",
          ok: true,
          total: order.total,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, total: order.total });
  } catch {
    return NextResponse.json(
      { error: "Sifariş göndərilərkən xəta baş verdi." },
      { status: 500 }
    );
  }
}
