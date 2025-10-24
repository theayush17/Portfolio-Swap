# Portfolio Backend Server

Node.js Express server with Nodemailer for handling portfolio contact form submissions.

## Features

- Express.js REST API
- Nodemailer email integration
- CORS support for Netlify frontend
- Environment variable configuration
- Input validation
- Error handling

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-netlify-site.netlify.app
GMAIL_USER=your.email@gmail.com
GMAIL_PASS=your-app-password
```

### 3. Gmail App Password Setup

To use Gmail with Nodemailer, you need to create an App Password:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. Navigate to Security > 2-Step Verification > App passwords
4. Select "Mail" and your device
5. Copy the generated 16-character password
6. Use this password in your `.env` file (without spaces)

### 4. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## Deployment

### Deploy to Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set the following:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables in Render dashboard:
   - `GMAIL_USER`
   - `GMAIL_PASS`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
5. Deploy!

### Deploy to Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Add environment variables
5. Deploy automatically

### Deploy to Heroku

```bash
cd backend
heroku create your-app-name
heroku config:set GMAIL_USER=your.email@gmail.com
heroku config:set GMAIL_PASS=your-app-password
heroku config:set FRONTEND_URL=https://your-netlify-site.netlify.app
git push heroku main
```

## API Endpoints

### GET /
Health check endpoint
- **Response**: `{ "message": "Portfolio Contact API is running" }`

### POST /send-email
Send contact form email
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I'd like to discuss a project..."
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Email sent successfully"
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "Error description"
  }
  ```

## Frontend Integration

Update the fetch URL in your frontend `Contact.tsx`:

```javascript
const response = await fetch('https://your-backend-url.com/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});
```

Replace `https://your-backend-url.com` with your deployed backend URL.

## Security

- CORS is configured to only allow requests from your frontend URL
- Environment variables keep sensitive data secure
- Input validation prevents malformed requests
- Gmail App Passwords are more secure than regular passwords

## Troubleshooting

**Email not sending:**
- Verify Gmail credentials are correct
- Ensure 2-Step Verification is enabled
- Check that App Password is properly formatted (no spaces)
- Review server logs for specific error messages

**CORS errors:**
- Verify `FRONTEND_URL` matches your Netlify domain exactly
- Include protocol (https://) in the URL
- Check browser console for specific CORS error details
