// main.js
// --- GỘP CODE NGÔN NGỮ ---
// Language system for the application
const languages = {
  vi: {
    // Main navigation
    search: "Tìm kiếm...",
    personalInfo: "Thông tin Cá nhân",
    piano: "Piano",
    flipGame: "Lật Hình",
    puzzle: "Giải Đố",
    imageEditor: "Chỉnh sửa ảnh",
    darkMode: "Chế độ tối",
    lightMode: "Chế độ sáng",
    // ... (giữ nguyên các key khác)
    student: "Sinh viên CNTT | KongLuan",
    greeting: "Hello ! Em ăn cơm chưa ?",
    fullName: "Họ và tên:",
    birthDate: "Ngày sinh:",
    hometown: "Quê quán:",
    education: "Học vấn:",
    major: "Chuyên ngành:",
    interests: "Sở thích:",
    content: "Nội Dung",
    pianoTitle: "Piano Virtual",
    pressKey: "Nhấn phím để chơi",
    flipGameTitle: "Game Lật Hình",
    flipGameInstructions: "Tìm các cặp hình giống nhau",
    puzzleTitle: "Hangman Game",
    gameOver: "Game Over!",
    congrats: "Chúc mừng!",
    correctWord: "Từ đúng là:",
    playAgain: "Chơi lại",
    hint: "Gợi ý:",
    incorrectGuesses: "Đoán sai:",
    imageEditorTitle: "Easy Image Editor",
    filters: "Bộ lọc",
    brightness: "Độ sáng",
    saturation: "Độ bão hòa",
    inversion: "Đảo ngược",
    grayscale: "Xám",
    rotateFlip: "Xoay & Lật",
    resetFilters: "Đặt lại bộ lọc",
    chooseImage: "Chọn ảnh",
    saveImage: "Lưu ảnh",
    loading: "Đang tải...",
    error: "Lỗi",
    success: "Thành công",
    cancel: "Hủy",
    confirm: "Xác nhận",
    close: "Đóng",
    draw: "Vẽ tay"
  },
  en: {
    // Main navigation
    search: "Search...",
    personalInfo: "Personal Info",
    piano: "Piano",
    flipGame: "Flip Game",
    puzzle: "Puzzle",
    imageEditor: "Image Editor",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    // ... (giữ nguyên các key khác)
    student: "IT Student | KongLuan",
    greeting: "Hello! Have you eaten yet?",
    fullName: "Full Name:",
    birthDate: "Birth Date:",
    hometown: "Hometown:",
    education: "Education:",
    major: "Major:",
    interests: "Interests:",
    content: "Content",
    pianoTitle: "Virtual Piano",
    pressKey: "Press key to play",
    flipGameTitle: "Memory Card Game",
    flipGameInstructions: "Find matching pairs",
    puzzleTitle: "Hangman Game",
    gameOver: "Game Over!",
    congrats: "Congratulations!",
    correctWord: "The correct word was:",
    playAgain: "Play Again",
    hint: "Hint:",
    incorrectGuesses: "Incorrect guesses:",
    imageEditorTitle: "Easy Image Editor",
    filters: "Filters",
    brightness: "Brightness",
    saturation: "Saturation",
    inversion: "Inversion",
    grayscale: "Grayscale",
    rotateFlip: "Rotate & Flip",
    resetFilters: "Reset Filters",
    chooseImage: "Choose Image",
    saveImage: "Save Image",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    draw: "Draw"
  }
};

class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'vi';
    this.init();
  }
  init() {
    this.updateLanguage(this.currentLang);
    this.createLanguageToggle();
  }
  updateLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    this.translateAll();
  }
  getText(key) {
    return languages[this.currentLang][key] || key;
  }
  translateAll() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const text = this.getText(key);
      if (element.tagName === 'INPUT' && element.type === 'placeholder') {
        element.placeholder = text;
      } else {
        element.textContent = text;
      }
    });
    document.title = this.getText('personalInfo');
  }
  createLanguageToggle() {
    const sidebarFooter = document.querySelector('.sidebar-footer');
    if (!sidebarFooter) return;
    const languageToggle = document.createElement('button');
    languageToggle.className = 'language-toggle';
    languageToggle.innerHTML = `
      <div class="language-label">
        <span class="language-icon material-symbols-rounded">translate</span>
        <span class="language-text">${this.currentLang === 'vi' ? 'VI' : 'EN'}</span>
      </div>
      <div class="language-toggle-track">
        <div class="language-toggle-indicator">
          <span class="flag-icon">${this.currentLang === 'vi' ? '🇻🇳' : '🇺🇸'}</span>
        </div>
      </div>
    `;
    languageToggle.addEventListener('click', () => {
      const newLang = this.currentLang === 'vi' ? 'en' : 'vi';
      this.updateLanguage(newLang);
      const languageText = languageToggle.querySelector('.language-text');
      const flagIcon = languageToggle.querySelector('.flag-icon');
      languageText.textContent = newLang === 'vi' ? 'VI' : 'EN';
      flagIcon.textContent = newLang === 'vi' ? '🇻🇳' : '🇺🇸';
      languageToggle.classList.add('language-switching');
      setTimeout(() => {
        languageToggle.classList.remove('language-switching');
      }, 300);
    });
    const themeToggle = sidebarFooter.querySelector('.theme-toggle');
    if (themeToggle) {
      sidebarFooter.insertBefore(languageToggle, themeToggle);
    } else {
      sidebarFooter.appendChild(languageToggle);
    }
  }
}
// --- HẾT GỘP CODE NGÔN NGỮ ---

const sidebarToggleBtns = document.querySelectorAll(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");
const searchForm = document.querySelector(".search-form");
const themeToggleBtn = document.querySelector(".theme-toggle");
const themeIcon = themeToggleBtn.querySelector(".theme-icon");
const menuLinks = document.querySelectorAll(".menu-link");
const main = document.getElementById("main-content");

// Initialize language manager
const languageManager = new LanguageManager();

function updateThemeIcon() {
  const isDark = document.body.classList.contains("dark-theme");
  themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
  
  // Update theme text
  const themeText = themeToggleBtn.querySelector('.theme-text');
  if (themeText) {
    themeText.textContent = languageManager.getText(isDark ? 'lightMode' : 'darkMode');
  }
  
  // Update theme symbol
  const themeSymbol = themeToggleBtn.querySelector('.theme-symbol');
  if (themeSymbol) {
    themeSymbol.textContent = isDark ? "☀️" : "🌙";
  }
  
  // Add animation
  themeToggleBtn.classList.add('theme-switching');
  setTimeout(() => {
    themeToggleBtn.classList.remove('theme-switching');
  }, 300);
}

// Theme init
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.classList.toggle("dark-theme", savedTheme === "dark" || (!savedTheme && prefersDark));
updateThemeIcon();

themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
});

// Sidebar toggle
sidebarToggleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const isCollapsed = sidebar.classList.contains("collapsed");
    sidebar.classList.add("sidebar-animating");
    setTimeout(() => {
      sidebar.classList.toggle("collapsed");
      setTimeout(() => sidebar.classList.remove("sidebar-animating"), 500);
    }, 10);
  });
});

searchForm.addEventListener("click", () => {
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    sidebar.classList.add("sidebar-animating");
    setTimeout(() => sidebar.classList.remove("sidebar-animating"), 500);
    searchForm.querySelector("input").focus();
  }
});

import { initFlipGame } from './js/flip-game.js';
import { initPuzzle } from './js/puzzle.js';
import { initProfileSlider } from './js/profile.js';
import { initPiano } from './js/piano.js';
import { initEdit } from './js/edit.js';

function loadSection(name) {
  fetch(`html/${name}.html`)
    .then(res => res.text())
    .then(html => {
      main.innerHTML = html;
      // Translate the loaded content
      languageManager.translateAll();
      
      if (name === 'profile') initProfileSlider();
      if (name === 'piano') initPiano();
      if (name === 'flip-game') initFlipGame();
      if (name === 'puzzle') initPuzzle();
      if (name === 'edit') initEdit();
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".menu-link");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const section = link.getAttribute("data-section");
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      loadSection(section);
    });
  });
  loadSection("profile");
});

// Export để các file khác có thể dùng nếu cần
export { loadSection };
