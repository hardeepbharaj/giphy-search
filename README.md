# Giphy Search Application

A modern, performant GIF search application built with Next.js 14, React, and the Giphy API. This application provides a seamless experience for searching and viewing GIFs with advanced features like caching, debounced search, and responsive design.

## Features

- 🔍 Real-time GIF search using the Giphy API
- 🎯 Trending GIFs display
- ⚡ Optimized performance with caching
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔄 Debounced search to prevent API rate limiting
- 📱 Mobile-friendly design
- 🖼️ Optimized image loading with Next.js Image component

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Giphy API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/giphy-search.git
cd giphy-search
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Giphy API key:
```env
NEXT_PUBLIC_GIPHY_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technical Implementation

### Performance Optimizations

#### 1. Caching Strategy

The application implements a sophisticated caching mechanism to optimize performance and user experience:

- **Initial Load Caching**:
  - Uses React's `useRef` to cache the initial set of trending GIFs
  - Prevents unnecessary API calls during development and production
  - Implementation in `src/app/page.js`:
  ```javascript
  const mounted = useRef(false);
  
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      fetchGifs();
    }
  }, []);
  ```

- **Search Results Caching**:
  - Caches trending GIFs for empty search queries
  - Reuses cached results when returning to the trending view
  - Reduces API calls and improves response time

#### 2. Search Optimization

- **Debounced Search**:
  - Custom `useDebounce` hook to prevent excessive API calls
  - Configurable delay (default: 500ms)
  - Implementation in `src/hooks/useDebounce.js`


#### 3. Image Optimization

- **Next.js Image Component**:
  - Automatic image optimization
  - Responsive image loading
  - Priority loading for above-the-fold content
  - Lazy loading for off-screen images

- **Loading States**:
  - Skeleton loading states for better perceived performance
  - Smooth transitions between states
  - Responsive grid layout for consistent display

### UI/UX Features

- **Responsive Grid Layout**:
  - Dynamic grid system using Tailwind CSS
  - Adapts to different screen sizes
  - Maintains aspect ratios for consistent display

- **Search Experience**:
  - Modern, accessible search input
  - Clear visual feedback
  - Smooth animations and transitions

- **Error Handling**:
  - Graceful error states
  - User-friendly error messages
  - Fallback UI components

## Development

### Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── styles/          # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Giphy API](https://developers.giphy.com/)
- [Tailwind CSS](https://tailwindcss.com/)



