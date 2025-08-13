# Shinjan Verma Portfolio

A futuristic, cyberpunk-themed personal portfolio website built with HTML, CSS, and JavaScript. Features a gaming HUD interface with neon aesthetics, smooth animations, and responsive design.

## 🚀 Features

### Visual Design
- **Cyberpunk Theme**: Dark background with neon purple, blue, pink, and cyan accents
- **Futuristic HUD**: Animated scanlines, drifting grid patterns, and glowing corner accents
- **Neon Effects**: Glowing text, buttons, and interactive elements with subtle flicker animations
- **Responsive Layout**: Optimized for mobile, tablet, and desktop devices

### Interactive Elements
- **Animated Hero**: Rotating radar background, drifting HUD icons, and particle canvas
- **Skill Cards**: Interactive progress bars with hover effects and edge flicker
- **Project Showcase**: Holographic scan animations and microchip-style icons
- **Timeline**: Pulsing neon lines with glitch-in animations on scroll
- **Contact Form**: Typing effect heading and glowing input fields

### Audio Features
- **Background Music**: Loops from 13 seconds with volume fade-in
- **Ambient Audio**: Optional synth pad for enhanced atmosphere
- **Sound Effects**: Click feedback for UI interactions
- **Audio Controls**: Toggle buttons for music and ambient sounds

### Performance Optimizations
- **Mobile-First**: Reduced particle density and simplified animations on small screens
- **Canvas Optimization**: Frame rate reduction and simplified rendering for mobile
- **Responsive Design**: Single-column layout on mobile with touch-friendly controls
- **Accessibility**: Reduced motion support and proper ARIA labels

## 🛠️ Technical Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, animations, and responsive design
- **JavaScript ES6+**: Canvas animations, audio management, and scroll effects
- **Web Audio API**: Background music and sound effects
- **Intersection Observer**: Scroll-triggered animations
- **CSS Grid & Flexbox**: Modern layout techniques

## 📱 Responsive Breakpoints

- **Mobile**: < 768px - Single column, simplified animations
- **Tablet**: 768px - 900px - Adaptive grids
- **Desktop**: > 900px - Full multi-column layout

## 🎵 Audio Setup

### Background Music
- File: `bg-music.mp3` (place in same folder as index.html)
- Starts from 13 seconds into the track
- Loops infinitely without gaps
- Volume: 0.3 (30%)
- Autoplay with muted start, fades in after 2 seconds

### Audio Controls
- **Music Toggle** (♪): Controls background music
- **Ambient Toggle** (🔊): Controls synth pad sounds
- Both buttons show active state with glowing indicators

## 🚀 Getting Started

1. **Download Files**: Ensure all files are in the same directory
2. **Add Music**: Place `bg-music.mp3` in the portfolio folder
3. **Open**: Double-click `index.html` or open in a web browser
4. **Enable Audio**: Click anywhere to enable background music (browser requirement)

## 🌐 Browser Support

- **Chrome**: Full support with Web Audio API
- **Firefox**: Full support with Web Audio API
- **Edge**: Full support with Web Audio API
- **Safari**: Limited Web Audio API support
- **Mobile Browsers**: Optimized performance with reduced animations

## 📱 Mobile Performance

- **Particle Count**: Reduced from 120 to 40 on mobile
- **Frame Rate**: 30fps instead of 60fps on small screens
- **Animations**: Simplified radar and HUD elements
- **Touch Targets**: Minimum 44px height for all interactive elements
- **Memory Usage**: Optimized canvas rendering and reduced shadow effects

## 🎨 Customization

### Colors
Edit CSS custom properties in `:root`:
```css
--neon-pink: #ff2bd1;
--neon-cyan: #29ffc6;
--neon-blue: #34a1ff;
--neon-purple: #b039ff;
```

### Animations
Adjust timing in CSS animations:
```css
@keyframes radarSpin { 
    0% { transform: translate(-50%, -50%) rotate(0deg); } 
    100% { transform: translate(-50%, -50%) rotate(360deg); } 
}
```

### Performance
Modify mobile breakpoints in CSS:
```css
@media (max-width: 767px) {
    /* Mobile optimizations */
}
```

## 🔧 Troubleshooting

### Audio Issues
- **No Background Music**: Check if `bg-music.mp3` exists in the folder
- **Autoplay Blocked**: Click anywhere on the page to enable audio
- **Volume Too Low**: Adjust volume in browser or modify JavaScript volume values

### Performance Issues
- **Slow on Mobile**: Ensure device has sufficient RAM and processing power
- **Canvas Lag**: Reduce particle count in JavaScript for lower-end devices
- **Animation Stuttering**: Check if device supports hardware acceleration

### Display Issues
- **Fonts Not Loading**: Ensure internet connection for Google Fonts
- **Layout Broken**: Check browser compatibility and CSS support
- **Responsive Issues**: Test on different screen sizes and orientations

## 📄 License

This portfolio is created for personal use. Feel free to modify and adapt for your own projects.

## 👨‍💻 Author

**Shinjan Verma**
- Frontend Developer
- React JS Enthusiast
- Integrated M.Tech in CSE (AI & ML) from VIT Bhopal

---

*Built with HTML, CSS & JavaScript • Cyberpunk HUD Interface*
