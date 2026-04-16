# Setup Instructions

## Install Dependencies

```bash
cd frontend
npm install
```

## Environment Variables

The `.env.local` file is already configured for development:
- `VITE_API_URL=http://127.0.0.1:8000`

For production, update `.env.production`:
- `VITE_API_URL=https://api.yourdomain.com`

## Run Development Server

```bash
npm run dev
```

The app will be available at http://localhost:5173

## Build for Production

```bash
npm run build
```

## What's New

✅ **Premium UI Components**
- Hero section with animated gradients
- Glassmorphism design throughout
- Dark theme with custom color scheme

✅ **Animations**
- Framer Motion for all interactions
- Smooth transitions and hover effects
- Loading spinner animations
- Fade-in and slide-up effects

✅ **Responsive Design**
- Mobile-first approach
- Tailored for tablet and desktop
- Touch-friendly on all devices

✅ **Better UX**
- Drag-and-drop file upload
- Image preview before submission
- Error handling and messages
- Skeleton/loading states
- Smooth scrolling navigation

✅ **Production Ready**
- Environment variables for API URL
- Error boundaries
- Optimized images
- Clean component structure
- No hardcoded URLs

✅ **Components**
- Hero.jsx - Landing section
- UploadCard.jsx - File upload with drag-drop
- ProductCard.jsx - Reusable product display
- AnalysisSection.jsx - Analysis badges
- ProductSection.jsx - Product grid sections
- OutfitSection.jsx - Combo outfits
- AISuggestions.jsx - AI recommendations
- Loading.jsx - Loading overlay
