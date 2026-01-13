// === DOM ELEMENTS (safe selection) ===

const textarea = document.getElementById('prompt');
const slider = document.getElementById('slider');
const suggestions = document.getElementById('suggestions');
const label = document.getElementById('floating-label');
const spans = slider.querySelectorAll('span'); // Added: get all spans
const imageUpload = document.getElementById('image-upload');
const previewContainer = document.getElementById('image-preview');
const overlay = document.getElementById("mobile-overlay");
const button = document.getElementById("mobile-menu-button");
const icon = document.getElementById("mobile-menu-icon");
const sidebar = document.getElementById("mobile-sidebar");

let index = 0;
const height = 32;
const total = 6; // number of unique prompts

function rotate() {
  index = (index + 1) % total;
  slider.style.transform = `translateY(-${index * height}px)`;
  
  // Added: opacity control — remove from all, add to current
  spans.forEach(span => span.classList.remove('visible'));
  spans[index].classList.add('visible');
}

let interval = setInterval(rotate, 3800);

// Added: show first prompt immediately
spans.forEach(span => span.classList.remove('visible'));
spans[0].classList.add('visible');

function showFloatingLabel() {
  label.style.transform = 'translateY(-28px) scale(0.85)';
  label.style.opacity = '0.6';
}

function hideFloatingLabel() {
  if (!textarea.value) {
    label.style.transform = 'translateY(0) scale(1)';
    label.style.opacity = '1';
  }
}

textarea.addEventListener('focus', () => {
  clearInterval(interval);
  suggestions.style.opacity = '0';
  showFloatingLabel();
});

textarea.addEventListener('input', () => {
  if (textarea.value) {
    suggestions.style.opacity = '0';
    showFloatingLabel();
  } else {
    suggestions.style.opacity = '1';
    interval = setInterval(rotate, 3800);
    hideFloatingLabel();
  }
});

textarea.addEventListener('blur', () => {
  if (textarea.value.trim() === '') {
    suggestions.style.opacity = '1';           // show the rotating prompts again
    interval = setInterval(rotate, 3800);      // restart the animation
    hideFloatingLabel();                       // move label back down
    // make sure the current prompt is visible
    spans.forEach(span => span.classList.remove('visible'));
    spans[index].classList.add('visible');
  }
});

// Force cursor to always start at the beginning when clicking anywhere
textarea.addEventListener('click', (e) => {
  if (document.activeElement !== textarea) {
    textarea.focus();
  }
  
  // Move cursor to position 0 (start of text)
  textarea.setSelectionRange(0, 0);
  textarea.scrollTop = 0; // also make sure we’re scrolled to top
});

// Optional: also do it on focus (covers tab navigation, mobile tap, etc.)
textarea.addEventListener('focus', () => {
  textarea.setSelectionRange(0, 0);
  textarea.scrollTop = 0;
});

function autoGrow() {
  textarea.style.height = 'auto';                    // reset
  textarea.style.height = textarea.scrollHeight + 'px';  // grow to fit content
}

// Run on every input
textarea.addEventListener('input', autoGrow);

// Also run once on load (in case there's pre-filled text)
autoGrow();

// Init
suggestions.style.transition = 'opacity 0.4s ease';
slider.style.transition = 'transform 0.7s cubic-bezier(0.4,0,0.2,1)';

imageUpload.addEventListener('change', (e) => {
  previewContainer.innerHTML = ''; // clear old
  Array.from(e.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const div = document.createElement('div');
      div.className = 'relative group';
      div.innerHTML = `<img src="${ev.target.result}" class="h-12 rounded-lg object-cover border border-neutral-700">
                   <button class="absolute top-1 right-1 p-1 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition">
                     <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                     </svg>
                   </button>`;
      previewContainer.appendChild(div);

      // Remove image on X click
      div.querySelector('button').addEventListener('click', () => div.remove());
    };
    reader.readAsDataURL(file);
  });
});

imageUpload.addEventListener('change', (e) => {
  if (!e.target.files.length) return; // safety

  previewContainer.innerHTML = ''; // clear old previews

  Array.from(e.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      // … your existing preview code …
    };
    reader.readAsDataURL(file);
  });

  // THIS LINE FIXES IT:
  e.target.value = ''; // resets the input so you can pick the same image again or cancel properly
});

  const glassNav = document.querySelector('.js-glass-nav');

  if (glassNav) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const shouldGlass = window.scrollY > 50;

        glassNav.classList.toggle('nav-glass-active', shouldGlass);
        glassNav.classList.toggle('nav-glass-dark', shouldGlass);
        glassNav.dataset.scrolled = shouldGlass ? 'true' : 'false';

        ticking = false;
      });
    });
  }


   let isOpen = false;

  function openMenu() {
    isOpen = true;
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
    icon.textContent = "close";
    document.body.classList.add("overflow-hidden");
  }

  function closeMenu() {
    isOpen = false;
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    icon.textContent = "menu";
    document.body.classList.remove("overflow-hidden");
  }

  button.addEventListener("click", () => {
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

 document.getElementById('footer-year').textContent = new Date().getFullYear() 
