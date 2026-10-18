# Add MySQL to the AI Code Review project

This version saves each generated review in local MySQL and provides a review-history panel. It does not add authentication; anyone who can reach the local app can see/delete the local history, so do not expose this version publicly.

## 1. Install and start MySQL

Install MySQL Community Server and make sure the MySQL service is running. Remember the local MySQL username and password.

## 2. Create the database and tables

From the project root, run one of these options.

**MySQL command line:**

```bash
mysql -u root -p < BackEnd/database/schema.sql
```

Enter the password when prompted. If your local root account has no password, omit `-p`.

**MySQL Workbench:** open `BackEnd/database/schema.sql`, connect to your local server, and execute the script.

## 3. Configure backend environment variables

Copy `BackEnd/.env.example` to `BackEnd/.env` and set your actual values:

```env
PORT=3000
FRONTEND_ORIGIN=http://localhost:5173
GOOGLE_GEMINI_KEY=your_real_gemini_api_key
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=code_review_db
```

Do not commit `.env` or share the Gemini API key. If MySQL uses a different port or account, update these values.

## 4. Install backend dependencies and run it

```bash
cd BackEnd
npm install
npm run dev
```

The server tests the database connection before listening on port 3000.

## 5. Configure and run frontend

In a second terminal:

```bash
cd Frontend
```

Optionally copy `.env.example` to `.env` (the default API URL is already `http://localhost:3000`), then run:

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

## 6. Test

1. Submit code in the editor and click **Review code**.
2. Confirm the AI response appears and a row appears under **Review history**.
3. Click a history item to reload its code and review.
4. Click **Delete** to remove that submission and its associated review.
5. In MySQL, verify the records:

```sql
USE code_review_db;
SELECT * FROM code_submissions ORDER BY created_at DESC;
SELECT * FROM code_reviews ORDER BY created_at DESC;
```

## API endpoints

- `POST /ai/get-review` — body: `{ "code": "...", "language": "javascript" }`; calls Gemini and saves submission + review.
- `GET /ai/history` — returns the latest 50 saved reviews.
- `GET /ai/history/:id` — returns a saved submission and review by submission ID.
- `DELETE /ai/history/:id` — deletes a submission; MySQL cascades deletion to its review.
- `GET /` — API health-style response.

## Troubleshooting

- **ECONNREFUSED / can't connect to MySQL:** start MySQL and verify host/port.
- **Access denied:** verify `DB_USER` and `DB_PASSWORD`.
- **Unknown database:** run `BackEnd/database/schema.sql`.
- **Gemini error:** check `GOOGLE_GEMINI_KEY` and whether the configured model is available to your account.
- **Frontend cannot connect:** make sure the backend is running and `VITE_API_URL` points to it.

The schema has no users/authentication. It is suitable for local development only until access controls are added.
