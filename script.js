// Windows 8.1 Demo Script

// State Management
const state = {
    isStartScreen: true,
    currentApp: null,
    openApps: new Set()
};

// DOM Elements
const startScreen = document.getElementById('startScreen');
const desktop = document.getElementById('desktop');
const startBtn = document.getElementById('startBtn');
const tiles = document.querySelectorAll('.tile');
const charmsBar = document.getElementById('charmsBar');
const userProfile = document.getElementById('userProfile');
const clockDisplay = document.getElementById('clockDisplay');
const appWindows = document.getElementById('appWindows');
const themeToggle = document.getElementById('themeToggle');
const startThemeToggle = document.getElementById('startThemeToggle');

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    initializeEventListeners();
    updateClock();
    setInterval(updateClock, 1000);
    enableTileDrag();
    initializeTheme();
    updateLiveTiles();
});

function initializeEventListeners() {
    // Start button click
    startBtn.addEventListener('click', toggleStartScreen);

    // Tile clicks
    tiles.forEach(tile => {
        tile.addEventListener('click', function (e) {
            const app = this.getAttribute('data-app');
            openApp(app);
        });
    });

    // Desktop click to show start screen
    desktop.addEventListener('click', function (e) {
        if (e.target === this) {
            showStartScreen();
        }
    });

    // User profile click
    userProfile.addEventListener('click', function () {
        alert('User: Administrator\nWindows 8.1');
    });

    // Charms bar search
    const searchCharm = document.getElementById('searchCharm');
    if (searchCharm) {
        searchCharm.addEventListener('click', function () {
            const query = prompt('Search Windows:');
            if (query) {
                alert('Searching for: ' + query);
            }
        });
    }

    // Settings tile
    const settingsTile = document.querySelector('[data-app="settings"]');
    if (settingsTile) {
        settingsTile.addEventListener('dblclick', function (e) {
            e.stopPropagation();
            alert('Windows Settings\n\nDisplay Settings\nSound Settings\nNetwork Settings\nPower Options');
        });
    }

    // Easter egg: Right-click on start screen
    startScreen.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        alert('Windows 8.1 Start Screen\n🎨 Metro Design™\n© Microsoft Corporation');
    });

    // Theme toggle (cycles between Windows8 theme and light)
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const current = document.body.getAttribute('data-theme') || 'windows8';
            const next = current === 'light' ? 'windows8' : 'light';
            document.body.setAttribute('data-theme', next);
            localStorage.setItem('w81-theme', next);
            themeToggle.textContent = next === 'light' ? '☀️' : '🌙';
            if (startThemeToggle) startThemeToggle.textContent = themeToggle.textContent;
        });
    }

    // Start screen theme toggle (mirrors taskbar toggle)
    if (startThemeToggle) {
        startThemeToggle.addEventListener('click', function () {
            if (themeToggle) themeToggle.click();
        });
    }
}

function toggleStartScreen() {
    if (state.isStartScreen) {
        showDesktop();
    } else {
        showStartScreen();
    }
}

function showStartScreen() {
    state.isStartScreen = true;
    startScreen.classList.add('active');
    startScreen.classList.remove('hidden');
    desktop.classList.add('hidden');
    desktop.classList.remove('active');
}

function showDesktop() {
    state.isStartScreen = false;
    startScreen.classList.remove('active');
    startScreen.classList.add('hidden');
    desktop.classList.remove('hidden');
    desktop.classList.add('active');
}

function openApp(appName) {
    // Show desktop when opening an app
    showDesktop();

    const appMessages = {
        'mail': {
            title: '✉ Mail',
            content: 'Outlook Mail\n\nNo new messages\n\nConnecting to:\n📧 your.email@outlook.com'
        },
        'calendar': {
            title: '📅 Calendar',
            content: 'Windows Calendar\n\nFebruary 14, 2026\nNo events scheduled'
        },
        'photos': {
            title: '🖼 Photos',
            content: 'Photos App\n\nYour Libraries:\n📁 Pictures\n📁 OneDrive Photos'
        },
        'weather': {
            title: '☁ Weather',
            content: 'Weather\n\nLoading weather data...\nBased on your location'
        },
        'store': {
            title: '🛒 Store',
            content: 'Windows Store\n\nApps, Games & Entertainment\nDownload the latest apps'
        },
        'music': {
            title: '🎵 Music',
            content: 'Windows Media Player\n\nLibrary:\n🎵 Songs\n💿 Albums\n🎤 Artists'
        },
        'video': {
            title: '🎬 Video',
            content: 'Windows Video\n\nLibrary:\n🎬 Videos\n📺 Recent'
        },
        'explorer': {
            title: '📁 File Explorer',
            content: 'File Explorer\n\nQuick Access:\n📁 Desktop\n📁 Documents\n📁 Pictures\n📁 Music\n📁 Videos\n💾 This PC'
        },
        'internet': {
            title: '🌐 Internet Explorer',
            content: 'Internet Explorer\n\nURL: about:blank\n\nEmbracing the web!'
        },
        'games': {
            title: '🎮 Games',
            content: 'Games\n\nAvailable Games:\n🎮 Solitaire\n🎮 Minesweeper\nFree Windows Games'
        },
        'settings': {
            title: '⚙ Settings',
            content: 'Settings\n\nPC Settings:\n🔧 Personalization\n🔧 Devices\n🔧 Network\n🔧 Update & Recovery'
        },
        'control': {
            title: '🖥 Control Panel',
            content: 'Control Panel\n\nSystem & Security\nUser Accounts\nPrograms\nClock & Region'
        }
    };

    const appInfo = appMessages[appName] || { title: appName, content: 'Opening ' + appName };
    
    // Show app notification
    showNotification(appInfo.title, appInfo.content);

    // Create a simple app window
    createAppWindow(appName, appInfo);

    // Add to open apps
    state.openApps.add(appName);
    state.currentApp = appName;

    // Animate open app
    animateAppOpen();
}

function createAppWindow(appName, appInfo) {
    if (!appWindows) return;

    const win = document.createElement('div');
    win.className = 'app-window';
    win.style.left = (60 + Math.random() * 200) + 'px';
    win.style.top = (100 + Math.random() * 120) + 'px';

    const header = document.createElement('div');
    header.className = 'app-header';
    header.textContent = appInfo.title || appName;

    const controls = document.createElement('div');
    controls.className = 'app-controls';
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', () => {
        win.remove();
        state.openApps.delete(appName);
    });
    controls.appendChild(closeBtn);

    const headerWrap = document.createElement('div');
    headerWrap.className = 'app-header';
    const titleSpan = document.createElement('div');
    titleSpan.style.flex = '1';
    titleSpan.style.fontWeight = '600';
    titleSpan.style.color = 'var(--text)';
    titleSpan.textContent = appInfo.title || appName;
    headerWrap.appendChild(titleSpan);
    headerWrap.appendChild(controls);

    const body = document.createElement('div');
    body.className = 'app-body';
    body.textContent = appInfo.content || '';

    win.appendChild(headerWrap);
    win.appendChild(body);
    appWindows.appendChild(win);

    // Make window draggable by header
    makeWindowDraggable(win, headerWrap);
}

function makeWindowDraggable(win, handle) {
    let offsetX = 0, offsetY = 0, dragging = false;

    handle.style.cursor = 'move';
    handle.addEventListener('mousedown', (e) => {
        dragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = 30;
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        win.style.left = (e.clientX - offsetX) + 'px';
        win.style.top = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', () => {
        dragging = false;
        document.body.style.userSelect = '';
        win.style.zIndex = 25;
    });
}

function initializeTheme() {
    const saved = localStorage.getItem('w81-theme') || 'windows8';
    document.body.setAttribute('data-theme', saved);
    const icon = saved === 'light' ? '☀️' : '🌙';
    if (themeToggle) themeToggle.textContent = icon;
    if (startThemeToggle) startThemeToggle.textContent = icon;
}

function updateLiveTiles() {
    // Calendar tile shows current date
    const tileDateEl = document.getElementById('tileDate');
    const tileMonthEl = document.querySelector('.tile-month');
    if (tileDateEl && tileMonthEl) {
        const now = new Date();
        tileDateEl.textContent = now.getDate();
        tileMonthEl.textContent = now.toLocaleString(undefined, { month: 'short' });
    }

    // Weather tile mock
    const weatherTile = document.querySelector('[data-app="weather"] .tile-content');
    if (weatherTile) {
        const temp = Math.floor(10 + Math.random() * 18);
        weatherTile.innerHTML = `<div class="tile-icon">☁</div><div class="tile-label">${temp}°C</div>`;
    }
}

function enableTileDrag() {
    const container = document.querySelector('.tiles-container');
    if (!container) return;
    let dragged = null;

    tiles.forEach(tile => {
        tile.setAttribute('draggable', 'true');

        tile.addEventListener('dragstart', (e) => {
            dragged = tile;
            tile.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        tile.addEventListener('dragend', () => {
            dragged = null;
            tile.classList.remove('dragging');
        });
    });

    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientX, e.clientY);
        if (afterElement == null) {
            container.appendChild(dragged);
        } else {
            container.insertBefore(dragged, afterElement);
        }
    });

    function getDragAfterElement(container, x, y) {
        const elements = [...container.querySelectorAll('.tile:not(.dragging)')];
        return elements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = Math.hypot(x - (box.left + box.width / 2), y - (box.top + box.height / 2));
            if (closest === null || offset < closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, null)?.element || null;
    }
}

function showNotification(title, content) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 2px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        z-index: 20;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        font-family: 'Segoe UI', sans-serif;
        font-size: 13px;
        line-height: 1.5;
        cursor: pointer;
        border-left: 4px solid #0078d4;
    `;

    const titleElement = document.createElement('div');
    titleElement.style.cssText = `
        font-weight: 600;
        margin-bottom: 8px;
        font-size: 14px;
    `;
    titleElement.textContent = title;

    const contentElement = document.createElement('div');
    contentElement.style.cssText = `
        opacity: 0.9;
        white-space: pre-wrap;
        word-wrap: break-word;
    `;
    contentElement.textContent = content;

    notification.appendChild(titleElement);
    notification.appendChild(contentElement);
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function animateAppOpen() {
    // Subtle desktop animation
    desktop.style.opacity = '0.95';
    setTimeout(() => {
        desktop.style.opacity = '1';
    }, 150);
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    clockDisplay.textContent = hours + ':' + minutes + ' ' + ampm;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Windows key + D shows desktop
    if (e.key === 'd' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        showDesktop();
    }
    // Windows key goes to start screen
    if (e.key === 'Meta' || (e.ctrlKey && e.key === '.')) {
        e.preventDefault();
        showStartScreen();
    }
    // Escape to go back to start
    if (e.key === 'Escape' && !state.isStartScreen) {
        showStartScreen();
    }
});

// Prevent accidental page reload
window.addEventListener('beforeunload', function (e) {
    // Comment this out if you want normal page reload behavior
    // e.preventDefault();
    // e.returnValue = '';
});

// Log startup
console.log('%cWindows 8.1 Demo', 'font-size: 20px; font-weight: bold; color: #0078d4;');
console.log('%cBuilt for Web Browsers', 'font-size: 12px; color: #666;');
console.log('%cTip: Press Escape to return to Start Screen', 'font-size: 11px; color: #999;');
