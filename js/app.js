// ============================================
// worldTech - E-commerce JavaScript
// ============================================

// === Product Data ===
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        category: "smartphones",
        price: 8499.90,
        oldPrice: 9999.90,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
        badge: "sale",
        rating: 4.9,
        reviews: 342
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        category: "smartphones",
        price: 7299.90,
        oldPrice: 8499.90,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
        badge: "hot",
        rating: 4.8,
        reviews: 256
    },
    {
        id: 3,
        name: "MacBook Pro M3 14\" 512GB",
        category: "notebooks",
        price: 14999.90,
        oldPrice: 17999.90,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
        badge: "sale",
        rating: 4.9,
        reviews: 189
    },
    {
        id: 4,
        name: "AirPods Pro 2ª Geração",
        category: "fones",
        price: 1849.90,
        oldPrice: 2299.90,
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
        badge: "new",
        rating: 4.7,
        reviews: 512
    },
    {
        id: 5,
        name: "Sony WH-1000XM5 Headphone",
        category: "fones",
        price: 2199.90,
        oldPrice: 2799.90,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
        badge: "hot",
        rating: 4.8,
        reviews: 328
    },
    {
        id: 6,
        name: "Notebook Gamer ASUS ROG",
        category: "notebooks",
        price: 9799.90,
        oldPrice: 12499.90,
        image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop",
        badge: "sale",
        rating: 4.6,
        reviews: 98
    },
    {
        id: 7,
        name: "Teclado Mecânico RGB Wireless",
        category: "acessorios",
        price: 449.90,
        oldPrice: 599.90,
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop",
        badge: "new",
        rating: 4.5,
        reviews: 743
    },
    {
        id: 8,
        name: "Mouse Gamer Logitech G Pro X",
        category: "acessorios",
        price: 549.90,
        oldPrice: 699.90,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
        badge: null,
        rating: 4.7,
        reviews: 456
    },
    {
        id: 9,
        name: "Apple Watch Series 9 45mm",
        category: "acessorios",
        price: 3499.90,
        oldPrice: 4299.90,
        image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop",
        badge: "sale",
        rating: 4.8,
        reviews: 201
    },
    {
        id: 10,
        name: "Xiaomi Redmi Note 13 Pro",
        category: "smartphones",
        price: 1899.90,
        oldPrice: 2499.90,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
        badge: "hot",
        rating: 4.5,
        reviews: 678
    },
    {
        id: 11,
        name: "Carregador MagSafe Duo Apple",
        category: "acessorios",
        price: 349.90,
        oldPrice: 499.90,
        image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop",
        badge: null,
        rating: 4.3,
        reviews: 156
    },
    {
        id: 12,
        name: "JBL Tune 770NC Bluetooth",
        category: "fones",
        price: 399.90,
        oldPrice: 549.90,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        badge: "new",
        rating: 4.4,
        reviews: 892
    }
];

// === State ===
let cart = JSON.parse(localStorage.getItem('worldtech_cart')) || [];
let currentFilter = 'todos';

// === DOM Elements ===
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// === Initialize ===
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
    initParticles();
    initScrollEffects();
    initNavigation();
    initSearch();
    initCartSidebar();
    initCountdown();
    initNewsletter();
    initFilterButtons();
    init3DCardEffect();
});

// === Render Products ===
function renderProducts(filter = 'todos') {
    const grid = $('#products-grid');
    const filtered = filter === 'todos' ? products : products.filter(p => p.category === filter);

    grid.innerHTML = '';

    filtered.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.style.transitionDelay = `${index * 0.05}s`;
        card.dataset.category = product.category;

        const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 ? '☆' : '');
        const badgeHTML = product.badge
            ? `<span class="product-card-badge badge-${product.badge}">${product.badge === 'sale' ? 'Oferta' : product.badge === 'new' ? 'Novo' : 'Popular'}</span>`
            : '';

        card.innerHTML = `
            ${badgeHTML}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-image-overlay">
                    <div class="product-quick-actions">
                        <button class="quick-action-btn" title="Favoritar"><i class="fas fa-heart"></i></button>
                        <button class="quick-action-btn" title="Visualizar"><i class="fas fa-eye"></i></button>
                        <button class="quick-action-btn" title="Compartilhar"><i class="fas fa-share-alt"></i></button>
                    </div>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span>${product.rating} (${product.reviews})</span>
                </div>
                <div class="product-price-row">
                    <div class="product-price">
                        ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>` : ''}
                        <span class="current-price">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}" title="Adicionar ao carrinho">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    // Add to cart event listeners
    $$('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            addToCart(id);
        });
    });

    // Trigger reveal animation
    setTimeout(() => {
        $$('.product-card.reveal').forEach(el => el.classList.add('active'));
    }, 100);
}

// === Cart Functions ===
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateCart();
    showToast(`${product.name} adicionado ao carrinho!`, 'success');

    // Animate cart count
    const countEl = $('#cart-count');
    countEl.classList.add('bump');
    setTimeout(() => countEl.classList.remove('bump'), 300);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCart();
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCart();
}

function clearCart() {
    cart = [];
    saveCart();
    updateCart();
    showToast('Carrinho limpo!', 'info');
}

function saveCart() {
    localStorage.setItem('worldtech_cart', JSON.stringify(cart));
}

function updateCart() {
    const countEl = $('#cart-count');
    const itemsEl = $('#cart-items');
    const emptyEl = $('#cart-empty');
    const footerEl = $('#cart-footer');
    const totalEl = $('#cart-total-value');

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    countEl.textContent = totalItems;

    if (cart.length === 0) {
        itemsEl.innerHTML = `
            <div class="cart-empty" id="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>Seu carrinho está vazio</p>
                <span>Adicione produtos para começar!</span>
            </div>
        `;
        footerEl.style.display = 'none';
    } else {
        let html = '';
        cart.forEach(item => {
            html += `
                <div class="cart-item">
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <span class="cart-item-price">R$ ${(item.price * item.qty).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        <div class="cart-item-controls">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                            <span class="qty-value">${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
        });
        itemsEl.innerHTML = html;
        footerEl.style.display = 'flex';
        totalEl.textContent = `R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }
}

// === Cart Sidebar ===
function initCartSidebar() {
    const toggle = $('#cart-toggle');
    const close = $('#cart-close');
    const overlay = $('#cart-overlay');
    const sidebar = $('#cart-sidebar');
    const checkoutBtn = $('#checkout-btn');
    const clearBtn = $('#clear-cart-btn');

    const openCart = () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        showToast('Redirecionando para o checkout...', 'success');
        setTimeout(closeCart, 1000);
    });

    clearBtn.addEventListener('click', () => {
        clearCart();
    });
}

// === Navigation ===
function initNavigation() {
    const header = $('#header');
    const hamburger = $('#hamburger');
    const nav = $('#nav');
    const navLinks = $$('.nav-link');
    const backToTop = $('#back-to-top');

    // Scroll effects
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        const sections = ['home', 'categorias', 'produtos', 'ofertas', 'contato'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            }
        });
    });

    // Hamburger
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Back to top
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// === Search ===
function initSearch() {
    const toggleBtn = $('#search-toggle');
    const searchBox = $('#search-box');
    const searchInput = $('#search-input');

    toggleBtn.addEventListener('click', () => {
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length === 0) {
            renderProducts(currentFilter);
            return;
        }

        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );

        const grid = $('#products-grid');
        grid.innerHTML = '';

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:60px; color: var(--text-muted);">
                <i class="fas fa-search" style="font-size:2rem; margin-bottom:12px; display:block;"></i>
                Nenhum produto encontrado para "${e.target.value}"
            </div>`;
            return;
        }

        filtered.forEach(product => {
            const card = createProductCard(product);
            grid.appendChild(card);
        });

        $$('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                addToCart(id);
            });
        });
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;

    const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 ? '☆' : '');
    const badgeHTML = product.badge
        ? `<span class="product-card-badge badge-${product.badge}">${product.badge === 'sale' ? 'Oferta' : product.badge === 'new' ? 'Novo' : 'Popular'}</span>`
        : '';

    card.innerHTML = `
        ${badgeHTML}
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-image-overlay">
                <div class="product-quick-actions">
                    <button class="quick-action-btn" title="Favoritar"><i class="fas fa-heart"></i></button>
                    <button class="quick-action-btn" title="Visualizar"><i class="fas fa-eye"></i></button>
                    <button class="quick-action-btn" title="Compartilhar"><i class="fas fa-share-alt"></i></button>
                </div>
            </div>
        </div>
        <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                <span class="stars">${stars}</span>
                <span>${product.rating} (${product.reviews})</span>
            </div>
            <div class="product-price-row">
                <div class="product-price">
                    ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>` : ''}
                    <span class="current-price">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <button class="add-to-cart-btn" data-id="${product.id}" title="Adicionar ao carrinho">
                    <i class="fas fa-cart-plus"></i>
                </button>
            </div>
        </div>
    `;

    return card;
}

// === Filter Buttons ===
function initFilterButtons() {
    $$('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}

// === Countdown Timer ===
function initCountdown() {
    // Set target date to 7 days from now
    const target = new Date();
    target.setDate(target.getDate() + 7);

    function update() {
        const now = new Date();
        const diff = target - now;

        if (diff <= 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        $('#days').textContent = String(days).padStart(2, '0');
        $('#hours').textContent = String(hours).padStart(2, '0');
        $('#minutes').textContent = String(minutes).padStart(2, '0');
        $('#seconds').textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// === Newsletter ===
function initNewsletter() {
    const form = $('#newsletter-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        if (email) {
            showToast('E-mail cadastrado com sucesso! Obrigado!', 'success');
            form.reset();
        }
    });
}

// === Toast Notification ===
function showToast(message, type = 'info') {
    const container = $('#toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// === Scroll Reveal ===
function initScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements for reveal
    setTimeout(() => {
        $$('.category-card, .feature-card, .promo-content, .newsletter-content').forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }, 300);
}

// === 3D Card Mouse Effect ===
function init3DCardEffect() {
    const heroCard = $('.hero-card-3d');
    if (!heroCard) return;

    document.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = ((e.clientY - centerY) / 20) * -1;
        const rotateY = (e.clientX - centerX) / 20;

        heroCard.querySelector('.floating-product').style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Also add 3D effect to product cards on hover
    document.addEventListener('mousemove', (e) => {
        $$('.product-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / 30) * -1;
                const rotateY = (x - centerX) / 30;
                card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            } else {
                card.style.transform = '';
            }
        });
    });
}

// === Particles Background ===
function initParticles() {
    const canvas = $('#particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            // Move
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 120, 255, ${p.opacity})`;
            ctx.fill();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 120, 255, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        animationId = requestAnimationFrame(drawParticles);
    }

    resize();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
}
