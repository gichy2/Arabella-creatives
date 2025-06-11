// Three.js initialization for 3D elements
function init3DElements() {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('animated-logo').appendChild(renderer.domElement);

    // Gold material
    const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        roughness: 0.1,
        metalness: 1.0
    });

    // Logo geometry
    const logoGeometry = new THREE.TextGeometry('Arabella', {
        font: new THREE.FontLoader().parse(/* font JSON */),
        size: 1,
        height: 0.2
    });
    const logoMesh = new THREE.Mesh(logoGeometry, goldMaterial);
    scene.add(logoMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(ambientLight, directionalLight);

    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        logoMesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// Particle.js initialization
function initParticles() {
    particlesJS('particle-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#D4AF37" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#D4AF37", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });
}

// GSAP Animations
function setupAnimations() {
    // Scroll animations
    gsap.utils.toArray("section").forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });

    // Button hover effects
    document.querySelectorAll(".gold-hover-effect").forEach(button => {
        button.addEventListener("mousemove", (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty("--mouse-x", `${x}px`);
            button.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

// Gallery interaction
function setupGallery() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            // Create 3D modal for the clicked item
            create3DModal(item.dataset.image);
        });
    });
}

// Initialize everything when DOM loads
document.addEventListener("DOMContentLoaded", () => {
    init3DElements();
    initParticles();
    setupAnimations();
    setupGallery();
    
    // Responsive adjustments
    window.addEventListener("resize", () => {
        // Handle resize events
    });
});

