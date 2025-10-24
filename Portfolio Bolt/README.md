# Modern Portfolio Website

A stunning, fully-featured personal portfolio website with 3D Earth visualization, smooth animations, dark/light mode, and contact form integration.

## Features

### Frontend
- **3D Earth Animation**: Realistic rotating Earth with Three.js
  - Interactive rotation responding to mouse movement
  - Twinkling city lights effect
  - Animated stars with parallax motion
  - Meteors with repulsive mouse interaction
- **Dark/Light Mode**: Smooth theme transition with localStorage persistence
- **Smooth Animations**: Scroll-triggered animations and section transitions
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Beautiful gradient effects, hover animations, and micro-interactions
- **Sections**:
  - Hero with orbital animation
  - Featured projects grid with hover effects
  - Interactive skills with progress bars
  - Timeline-based achievements
  - Contact form with validation

### Backend
- **Node.js + Express**: RESTful API server
- **Nodemailer**: Email integration for contact form
- **CORS Support**: Configured for Netlify frontend
- **Input Validation**: Server-side form validation
- **Error Handling**: Comprehensive error management

## Tech Stack

### Frontend
- React 18 + TypeScript
- Three.js (3D graphics)
- Tailwind CSS
- Lucide React (icons)
- Vite (build tool)

### Backend
- Node.js
- Express
- Nodemailer
- CORS
- dotenv

## Quick Start

### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
PORT=5000
GMAIL_USER=your.email@gmail.com
GMAIL_PASS=your-gmail-app-password
FRONTEND_URL=https://your-site.netlify.app
```

4. **Start server:**
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Gmail Setup

To enable email functionality:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Navigate to "App passwords"
4. Generate a new app password for Mail
5. Copy the 16-character password
6. Add it to your `.env` file as `GMAIL_PASS`

## Deployment

### Frontend (Netlify)

1. **Connect your repository** to Netlify
2. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Deploy!**

### Backend (Render/Railway/Heroku)

#### Render
1. Create a new Web Service
2. Connect your repository
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables
7. Deploy

#### Railway
1. Create new project
2. Connect repository
3. Set root directory to `backend`
4. Add environment variables
5. Auto-deploy

#### Heroku
```bash
cd backend
heroku create your-app-name
heroku config:set GMAIL_USER=your.email@gmail.com
heroku config:set GMAIL_PASS=your-app-password
heroku config:set FRONTEND_URL=https://your-site.netlify.app
git push heroku main
```

## Customization

### Update Personal Information

1. **Hero Section** (`src/components/Hero.tsx`):
   - Change "Your Name" to your actual name
   - Update the description text

2. **Projects** (`src/components/Projects.tsx`):
   - Replace project data with your own projects
   - Update images, titles, descriptions, and links

3. **Skills** (`src/components/Skills.tsx`):
   - Modify the skills array with your technologies
   - Adjust proficiency levels

4. **Achievements** (`src/components/Achievements.tsx`):
   - Add your certifications and achievements
   - Update dates and descriptions

5. **Contact** (`src/components/Contact.tsx`):
   - Update email address
   - Change backend API URL to your deployed backend

6. **Social Links** (`src/components/Navbar.tsx`):
   - Update GitHub, LinkedIn, and Twitter URLs

### Color Scheme

Edit `src/styles/theme.css` to change colors:
- `--accent-primary`: Primary theme color
- `--accent-secondary`: Secondary theme color
- Adjust light/dark mode color schemes

### Background

The Earth scene is customizable in `src/components/EarthScene.tsx`:
- Adjust rotation speed
- Modify mouse interaction sensitivity
- Change star count and meteor behavior
- Customize colors and lighting

## Performance Optimization

- Three.js assets load asynchronously
- Compressed textures for 3D Earth
- Lazy loading for images
- Code splitting with dynamic imports
- RequestAnimationFrame for smooth animations
- GPU-optimized rendering

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

WebGL is required for 3D Earth visualization. Fallback could be implemented for unsupported browsers.

## File Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── EarthScene.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Achievements.tsx
│   │   └── Contact.tsx
│   ├── styles/
│   │   ├── theme.css
│   │   ├── navbar.css
│   │   ├── hero.css
│   │   ├── earth.css
│   │   ├── projects.css
│   │   ├── skills.css
│   │   ├── achievements.css
│   │   └── contact.css
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── index.html
├── package.json
└── README.md
```

## Troubleshooting

**3D Earth not rendering:**
- Check browser WebGL support
- Verify Three.js is installed
- Check console for errors

**Contact form not working:**
- Verify backend URL is correct
- Check backend environment variables
- Ensure CORS is properly configured
- Verify Gmail credentials

**Dark mode not persisting:**
- Check browser localStorage permissions
- Clear browser cache and try again

## License

MIT License - feel free to use this for your own portfolio!

## Credits

- 3D Earth visualization powered by Three.js
- Stock images from Pexels
- Icons from Lucide React

---

Built with React, Three.js, and Node.js
