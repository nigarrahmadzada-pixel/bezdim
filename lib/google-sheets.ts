import { google } from "googleapis";
import type { OrderRecord } from "@/lib/orders";
import { formatOrderDate, formatRequiredDate } from "@/lib/orders";

const HEADERS = [
  "Tarix",
  "Ad",
  "Telefon",
  "Hadisə",
  "Dizayn",
  "Ölçü (ədəd)",
  "Lazım olan tarix",
  "Təcili",
  "Mətn",
  "Qeyd",
  "Cəmi (₼)",
];

function getSheetRange(suffix: string): string {
  const sheetName = process.env.GOOGLE_SHEETS_TAB_NAME?.trim();
  if (!sheetName) return suffix;
  return `'${sheetName.replace(/'/g, "''")}'!${suffix}`;
}

function normalizePrivateKey(value: string | undefined): string | undefined {
  if (!value) return undefined;

  const trimmed = value.trim().replace(/^"|"$/g, "");
  return trimmed.includes("\\n")
    ? trimmed.replace(/\\n/g, "\n")
    : trimmed;
}

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = normalizePrivateKey(
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  );
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();

  if (!email || !privateKey || !spreadsheetId) {
    throw new Error("Google Sheets konfiqurasiyası tam deyil.");
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return {
    sheets: google.sheets({ version: "v4", auth }),
    spreadsheetId,
  };
}

async function ensureHeaders(): Promise<void> {
  const { sheets, spreadsheetId } = getSheetsClient();
  const headerRange = getSheetRange("A1:K1");

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  });

  if (existing.data.values?.length) return;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: headerRange,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [HEADERS],
    },
  });
}

function orderToRow(order: OrderRecord): string[] {
  return [
    formatOrderDate(order.createdAt),
    order.name,
    order.phone,
    order.occasionLabel,
    order.designLabel,
    String(order.quantity),
    formatRequiredDate(order.date),
    order.isUrgent ? "Bəli (+30%)" : "Xeyr",
    order.wantsText ? order.customText || "" : "Yox",
    order.note || "",
    order.total.toFixed(2),
  ];
}

export async function appendOrderToSheet(order: OrderRecord): Promise<void> {
  const { sheets, spreadsheetId } = getSheetsClient();

  await ensureHeaders();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: getSheetRange("A:K"),
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [orderToRow(order)],
    },
  });
}
