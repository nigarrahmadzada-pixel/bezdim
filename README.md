# Aurea

Xonça, ad günü, toy, nişan və xüsusi günlər üçün şirniyyat sifariş saytı.

## Başlatmaq

```bash
npm install
npm run dev
```

Brauzerdə açın: [http://localhost:3000](http://localhost:3000)

## Səhifələr

- **/** — Ana səhifə (brend, CTA düyməsi)
- **/sifaris** — Dizayn, forma və tarix seçimi
- **/sifaris/ugrurlu** — Sifariş uğurla göndərildikdən sonra

## Sifariş bildirişləri (Telegram + Google Sheets)

Sifariş gələndə eyni anda Telegram mesajı və Google cədvəlinə yazılır.

### 1. Telegram bot

1. Telegram-da `@BotFather` açın
2. `/newbot` yazın və bot yaradın
3. Verilən **token**-i `.env.local` faylına yazın: `TELEGRAM_BOT_TOKEN`
4. `@userinfobot` ilə öz **chat ID**-nizi öyrənin
5. Botunuza `/start` yazın (mesaj göndərə bilməsi üçün)
6. `.env.local`-a yazın: `TELEGRAM_CHAT_ID`

### 2. Google Sheets

1. [Google Cloud Console](https://console.cloud.google.com/) açın
2. Yeni layihə yaradın
3. **Google Sheets API**-ni aktiv edin
4. **Service Account** yaradın və JSON key endirin
5. Yeni Google cədvəli yaradın
6. Cədvəli service account email ilə **Editor** kimi paylaşın
7. `.env.local` faylına yazın:
   - `GOOGLE_SHEETS_SPREADSHEET_ID` — cədvəlin URL-indəki ID
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` — JSON-dakı `client_email`
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` — JSON-dakı `private_key`

### 3. `.env.local` nümunəsi

`.env.example` faylını `.env.local` kimi kopyalayın və dəyərləri doldurun.

```bash
cp .env.example .env.local
```

Serveri yenidən başladın: `npm run dev`

