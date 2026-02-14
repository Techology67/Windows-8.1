# Windows 8.1 Theme Demo

A fully functional Windows 8.1 themed web application that brings the classic Microsoft Metro design language to your browser.

## Features

✨ **Authentic Windows 8.1 Experience**

- Added a Windows 8.1 theme and a taskbar theme toggle. Click the moon/sun button in the taskbar to switch between the Windows 8.1 theme and a light theme. Theme choice is persisted in `localStorage` under the key `w81-theme`.

🎨 **Interactive Elements**
- Clickable tiles that simulate app launches
- Smooth transitions and animations
- Desktop and Start Screen switching with the Start button
- Keyboard shortcuts (Escape to return to Start, Ctrl+D for desktop)
- System notifications for app launches
- Responsive design for mobile devices

📱 **Supported Browsers**
- Chrome/Chromium
- Firefox
- Safari
- Edge
- Opera

## Getting Started

1. Open `index.html` in your web browser
2. Click on any tile to launch an app and see the desktop view
3. Click the Windows logo at the bottom-left to switch between Start Screen and Desktop
4. Use the Charms bar to access search functionality
5. Click on your user profile (top-right) to view profile info

## Controls

| Action | Result |
|--------|--------|
| Click on tile | Launch app & switch to desktop |
| Click Windows Start button | Toggle between Start Screen and Desktop |
| Press Escape | Return to Start Screen |
| Click user profile | View user information |
| Click search charm | Search Windows (simulated) |
| Right-click on Start Screen | Easter egg! |

## File Structure

```
Windows-8.1/
├── index.html      # Main HTML structure
├── styles.css      # Windows 8.1 styling & Metro design
├── script.js       # Interactive functionality
└── README.md       # This file
```

## Color Palette

The theme uses the authentic Windows 8.1 Metro colors:
- **Windows Blue**: #0078D4
- **Cyan**: #00BCF2
- **Red**: #E74C3C
- **Green**: #27AE60
- **Orange**: #F39C12
- **Purple**: #8E44AD
- **Teal**: #1ABC9C
- **Dark Gray**: #1F1F1F

## Tips & Tricks

- Hover over tiles to see subtle scale animations
- Each tile has a unique color gradient
- The calendar tile displays the current date
- Clock in system tray updates in real-time
- Try double-clicking the Settings tile
- Resize your browser to see responsive design

## Technical Details

- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **Responsive**: Works on desktop and mobile devices
- **Accessible**: Semantic HTML and keyboard shortcuts
- **Modern CSS**: Flexbox, Grid, and CSS Variables used throughout

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Future Enhancements

- [x] Window management system (basic app windows)
- [x] Draggable tiles (reorder tiles on the Start Screen)
- [x] Live tiles (calendar date + mock weather)
- [x] Theme toggle (light / dark)
- [ ] Customizable tile colors
- [ ] More detailed app windows (resizing, snapping)
- [ ] Sound effects
- [ ] Additional keyboard shortcuts

---

**Enjoy your Windows 8.1 experience in the browser!** 🎉

*Made for nostalgia lovers and web developers*
