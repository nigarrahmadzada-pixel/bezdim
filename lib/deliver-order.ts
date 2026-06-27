import { appendOrderToSheet } from "@/lib/google-sheets";
import type { OrderRecord } from "@/lib/orders";
import { sendTelegramOrder } from "@/lib/telegram";

export async function deliverOrder(order: OrderRecord): Promise<string[]> {
  const results = await Promise.allSettled([
    sendTelegramOrder(order),
    appendOrderToSheet(order),
  ]);

  const failures = results
    .filter(
      (result): result is PromiseRejectedResult => result.status === "rejected"
    )
    .map((result) =>
      result.reason instanceof Error ? result.reason.message : "Naməlum xəta"
    );

  if (failures.length > 0) {
    console.error("Order delivery failure:", failures);
  }

  return failures;
}
