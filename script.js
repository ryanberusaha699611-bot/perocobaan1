
// Fungsi untuk mendeteksi scroll dan memunculkan elemen
function reveal() {
    var reveals = document.querySelectorAll("section");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150; // Jarak munculnya elemen

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Menjalankan fungsi saat scroll
window.addEventListener("scroll", reveal);

// Menambahkan class 'reveal' ke semua section secara otomatis
document.querySelectorAll("section").forEach((section) => {
    section.classList.add("reveal");
});

// Jalankan sekali saat loading untuk mengecek posisi awal
reveal();

// Navbar scroll enhancement - make it more visible when scrolled
function handleNavbarScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// --- MODAL FUNCTIONS ---
function openModal(title, image, description, price) {
    document.getElementById('menuModal').style.display = 'block';
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalPrice').textContent = price.toLocaleString('id-ID');
}

function closeModal() {
    document.getElementById('menuModal').style.display = 'none';
}

// Fungsi untuk modal layanan
function openServicesModal() {
    document.getElementById('servicesModal').style.display = 'block';
}

function closeServicesModal() {
    document.getElementById('servicesModal').style.display = 'none';
}

// Fungsi untuk toggle hamburger menu
function toggleMenu() {
    var menu = document.getElementById('nav-menu');
    menu.classList.toggle('show');
}

// Tutup modal saat diklik di luar konten
window.onclick = function(event) {
    var menuModal = document.getElementById('menuModal');
    var servicesModal = document.getElementById('servicesModal');
    if (event.target == menuModal) {
        menuModal.style.display = 'none';
    }
    if (event.target == servicesModal) {
        servicesModal.style.display = 'none';
    }
}

// --- CHATBOT FUNCTIONS ---
function toggleChatbot() {
    var chatbotBox = document.getElementById('chatbot-box');
    chatbotBox.classList.toggle('chatbot-hidden');
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    var input = document.getElementById('user-input');
    var message = input.value.trim();
    if (message === '') return;

    // Tambah pesan user
    addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    var typingDiv = showTypingIndicator();

    // Respons bot with typing delay
    setTimeout(function() {
        hideTypingIndicator(typingDiv);
        var response = getBotResponse(message.toLowerCase());
        addMessage(response, 'bot');
    }, 1500); // Increased delay for typing effect
}

function addMessage(text, sender) {
    var messagesDiv = document.getElementById('chatbot-messages');
    var messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + sender;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTypingIndicator() {
    var messagesDiv = document.getElementById('chatbot-messages');
    var typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.innerHTML = '<span class="typing-dots">Sedang mengetik...</span>';
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return typingDiv;
}

function hideTypingIndicator(typingDiv) {
    if (typingDiv && typingDiv.parentNode) {
        typingDiv.parentNode.removeChild(typingDiv);
    }
}

function getBotResponse(message) {
    if (message.includes('jam') || message.includes('buka') || message.includes('operasional')) {
        return 'Kafe buka setiap hari dari pukul 11:00 sampai 21:00. Kami siap menyambut Anda!';
    } else if (message.includes('menu') || message.includes('kopi') || message.includes('makan')) {
        return 'Menu spesial kami: Ice Americano, Long Coffee, Cappuccino, Latte Macchiato, Espresso, dan Kopi Tubruk. Semua dengan diskon spesial! Gunakan fitur pencarian untuk menemukan favorit Anda.';
    } else if (message.includes('lokasi') || message.includes('alamat') || message.includes('tempat')) {
        return 'Kami berada di Jl. Contoh Kopi No. 123, Kota Tangerang. Mudah dijangkau dengan transportasi umum dan parkir luas tersedia.';
    } else if (message.includes('kontak') || message.includes('telepon') || message.includes('email')) {
        return 'Hubungi kami di telepon 085-123-4567 atau email cofferyan@gmail.com. Follow Instagram @cofferyan untuk update terbaru!';
    } else if (message.includes('wifi') || message.includes('internet')) {
        return 'Ya, kami menyediakan WiFi gratis dengan koneksi stabil dan colokan listrik untuk kebutuhan kerja Anda.';
    } else if (message.includes('reservasi') || message.includes('pesan')) {
        return 'Untuk reservasi meja, isi form di bagian Kontak dengan tanggal, waktu, dan jumlah orang. Kami akan konfirmasi dalam 1 jam!';
    } else if (message.includes('katering') || message.includes('acara') || message.includes('event')) {
        return 'Kami melayani catering untuk acara spesial! Hubungi kami untuk paket ulang tahun, gathering, atau event perusahaan.';
    } else if (message.includes('member') || message.includes('diskon')) {
        return 'Bergabung member gratis! Dapatkan diskon hingga 20%, poin reward, dan penawaran eksklusif setiap bulan.';
    } else if (message.includes('halo') || message.includes('hi') || message.includes('hai')) {
        return 'Halo! Selamat datang di Ryan\'s Caffe. Apa yang bisa saya bantu hari ini?';
    } else {
        return 'Maaf, saya belum paham pertanyaan Anda. Coba tanya tentang menu, reservasi, jam buka, atau layanan kami ya!';
    }
}

// Form validation
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    // Clear previous errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('dateError').textContent = '';
    document.getElementById('timeError').textContent = '';
    document.getElementById('peopleError').textContent = '';
    document.getElementById('messageError').textContent = '';
    document.getElementById('successMessage').textContent = '';

    // Validate name
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        document.getElementById('nameError').textContent = 'Nama wajib diisi.';
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email wajib diisi.';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Format email tidak valid.';
        isValid = false;
    }

    // Validate phone
    const phone = document.getElementById('phone').value.trim();
    if (phone === '') {
        document.getElementById('phoneError').textContent = 'Telepon wajib diisi.';
        isValid = false;
    }

    // Validate date
    const date = document.getElementById('date').value;
    if (date === '') {
        document.getElementById('dateError').textContent = 'Tanggal reservasi wajib diisi.';
        isValid = false;
    }

    // Validate time
    const time = document.getElementById('time').value;
    if (time === '') {
        document.getElementById('timeError').textContent = 'Waktu reservasi wajib diisi.';
        isValid = false;
    }

    // Validate people
    const people = document.getElementById('people').value;
    if (people === '') {
        document.getElementById('peopleError').textContent = 'Jumlah orang wajib dipilih.';
        isValid = false;
    }

    // Message is optional, no validation needed

    if (isValid) {
        // Simulate form submission
        document.getElementById('successMessage').textContent = 'Reservasi berhasil dikirim! Kami akan segera menghubungi Anda untuk konfirmasi.';
        document.getElementById('contactForm').reset();
    }
});

// Category filter & search - enhanced for full-menu.html
document.addEventListener('DOMContentLoaded', function() {
    // Category tabs
    const categoryBtns = document.querySelectorAll('.menu-category-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterMenu(category);
        });
    });

    function filterMenu(category = 'all') {
        let visibleCount = 0;
        menuCards.forEach(card => {
            const cardCategory = card.dataset.category || 'all';
            
            let matchesCategory = category === 'all' || cardCategory === category;
            
            if (matchesCategory) {
                card.style.display = 'block';
                card.style.opacity = '1';
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });

        // No results message (category only)
        const noResults = document.querySelector('.no-results');
        if (visibleCount === 0 && category !== 'all') {
            if (!noResults) {
                const msg = document.createElement('div');
                msg.className = 'no-results';
                msg.textContent = 'Menu tidak ditemukan.';
                msg.style.cssText = 'grid-column: 1 / -1; text-align: center; color: #999; font-style: italic; padding: 2rem; background: rgba(255,255,255,0.8); border-radius: 12px; margin: 1rem;';
                document.querySelector('.menu-grid').appendChild(msg);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }
});


// Gallery slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto-slide
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Set minimum date for reservation
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});

// ==================== DISCOUNT SCRATCH CARD ====================
let isScratchRevealed = false;
let timerInterval;
let timeLeft = 0;
let discountCode = '';

function openDiscountModal() {
    document.getElementById('discountModal').style.display = 'block';
    initScratchCard();
}

function closeDiscountModal() {
    document.getElementById('discountModal').style.display = 'none';
    // Reset for next time
    isScratchRevealed = false;
    document.getElementById('revealContent').classList.add('hidden');
    if (timerInterval) clearInterval(timerInterval);
}

// Initialize scratch canvas
function initScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 200;
    
    // Scratch layer
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add gradient scratch effect
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(1, '#ccc');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Text overlay
    ctx.fillStyle = '#666';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Gosok di sini untuk', canvas.width/2, 60);
    ctx.fillText('lihat keberuntunganmu!', canvas.width/2, 90);
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Gunakan mouse/jari', canvas.width/2, 140);
    
    // Setup scratch events
    canvas.onmousedown = startScratch;
    canvas.ontouchstart = startScratch;
    
    isScratchRevealed = false;
}

// Scratch logic
let isDrawing = false;

function startScratch(e) {
    e.preventDefault();
    isDrawing = true;
    
    canvas.onmousemove = scratch;
    canvas.onmouseup = stopScratch;
    canvas.ontouchmove = scratch;
    canvas.ontouchend = stopScratch;
}

function scratch(e) {
    if (!isDrawing) return;
    
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    let x, y;
    if (e.touches) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    
    // Check if 50% revealed
    if (ctx.getImageData(0, 0, canvas.width, canvas.height).data.filter(p => p[3] === 0).length > canvas.width * canvas.height * 0.5) {
        revealPrize();
    }
}

function stopScratch() {
    isDrawing = false;
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.ontouchmove = null;
    canvas.ontouchend = null;
}

function revealPrize() {
    isScratchRevealed = true;
    const revealContent = document.getElementById('revealContent');
    revealContent.classList.remove('hidden');
    
    // Generate daily discount code
    const days = ['SUNDAYCAFFE', 'MONDAYCAFFE', 'TUESDAYCAFFE', 'WEDNESDAYCAFFE', 'THURSDAYCAFFE', 'FRIDAYCAFFE', 'SATURDAYCAFFE'];
    const today = new Date().getDay();
    discountCode = days[today];
    document.getElementById('discountCode').textContent = discountCode;
}

function startTimer() {
    timeLeft = 15 * 60; // 15 minutes
    document.getElementById('useNowBtn').style.display = 'none';
    document.getElementById('timerSection').classList.remove('hidden');
    
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    timeLeft--;
    
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        document.getElementById('timerSection').innerHTML = '<p>Voucher telah hangus. Coba lagi besok!</p>';
    }
}

// Close modal click outside
window.onclick = function(event) {
    var discountModal = document.getElementById('discountModal');
    if (event.target == discountModal) {
        closeDiscountModal();
    }
}

function setFullHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setFullHeight();
window.addEventListener('resize', setFullHeight);