document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            document.querySelector(targetId).classList.add('active');
            
            // Play audio if available
            const audioSrc = this.getAttribute('data-audio');
            if (audioSrc) {
                playAudio(audioSrc);
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
    
    // Start Journey Button
    const startJourneyBtn = document.getElementById('start-journey');
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', function() {
            document.querySelector('#home').classList.remove('active');
            document.querySelector('#explore').classList.add('active');
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('a[href="#explore"]').classList.add('active');
            
            // Play welcome audio
            playAudio('sounds/narasi/selamat-datang.mp3');
        });
    }
    
    // Culture Cards
    const cultureCards = document.querySelectorAll('.culture-card');
    cultureCards.forEach(card => {
        card.addEventListener('click', function() {
            const target = this.querySelector('.learn-more').getAttribute('data-target');
            loadDetailContent(target);
            
            // Play audio if available
            const audioSrc = this.getAttribute('data-audio');
            if (audioSrc) {
                playAudio(audioSrc);
            }
        });
        
        // Keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Play audio buttons
    const playAudioButtons = document.querySelectorAll('.play-audio');
    playAudioButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.culture-card');
            const audioSrc = card.getAttribute('data-audio');
            if (audioSrc) {
                playAudio(audioSrc);
            }
        });
    });
    
    // Learn More buttons
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const target = this.getAttribute('data-target');
            loadDetailContent(target);
        });
    });
    
    // Play Game buttons
    const playGameButtons = document.querySelectorAll('.play-game');
    playGameButtons.forEach(button => {
        button.addEventListener('click', function() {
            const game = this.getAttribute('data-game');
            alert(Permainan ${game} akan dimulai! (Fitur ini dalam pengembangan));
        });
    });
    
    // Audio player function
    function playAudio(src) {
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = src;
        audioPlayer.play().catch(e => console.log('Autoplay prevented:', e));
    }
    
    // Load detail content
    function loadDetailContent(topic) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show detail section
        const detailSection = document.getElementById('detail-content');
        detailSection.classList.add('active');
        
        // Simulate loading content (in a real app, this would be an AJAX call)
        detailSection.innerHTML = `
            <div class="detail-header">
                <button class="back-button" id="back-button"><i class="fas fa-arrow-left"></i> Kembali</button>
                <h2 class="detail-title">${getTopicTitle(topic)}</h2>
            </div>
            <div class="detail-body">
                ${getTopicContent(topic)}
            </div>
        `;
        
        // Add back button functionality
        document.getElementById('back-button').addEventListener('click', function() {
            detailSection.classList.remove('active');
            document.querySelector('#explore').classList.add('active');
        });
        
        // Play topic audio
        playAudio(sounds/narasi/${topic}.mp3);
    }
    
    // Helper functions for detail content
    function getTopicTitle(topic) {
        const titles = {
            'tarian': 'Tarian Tradisional Indonesia',
            'alat-musik': 'Alat Musik Tradisional',
            'pakaian-adat': 'Pakaian Adat Indonesia',
            'makanan': 'Makanan Tradisional Indonesia'
        };
        return titles[topic] || 'Budaya Indonesia';
    }
    
    function getTopicContent(topic) {
        const contents = {
            'tarian': `
                <div class="topic-content">
                    <div class="topic-image">
                        <img src="images/budaya/tari-kecak.jpg" alt="Tari Kecak">
                        <p class="image-caption">Tari Kecak dari Bali</p>
                    </div>
                    <div class="topic-text">
                        <h3>Keindahan Tarian Nusantara</h3>
                        <p>Indonesia memiliki lebih dari 3000 tarian tradisional yang tersebar di seluruh wilayah. Setiap tarian memiliki makna dan cerita yang unik.</p>
                        
                        <h4>Beberapa Tarian Populer:</h4>
                        <ul class="culture-list">
                            <li>
                                <img src="images/budaya/tari-saman.jpg" alt="Tari Saman">
                                <div>
                                    <h5>Tari Saman</h5>
                                    <p>Dari Aceh, dikenal dengan gerakan tepuk tangan yang cepat dan harmonis.</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/budaya/tari-pendet.jpg" alt="Tari Pendet">
                                <div>
                                    <h5>Tari Pendet</h5>
                                    <p>Tarian penyambutan dari Bali yang penuh gerakan anggun.</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/budaya/tari-tor-tor.jpg" alt="Tari Tor-Tor">
                                <div>
                                    <h5>Tari Tor-Tor</h5>
                                    <p>Tarian tradisional Batak dari Sumatera Utara dengan gerakan yang khas.</p>
                                </div>
                            </li>
                        </ul>
                        
                        <div class="interactive-element">
                            <button class="cta-button" id="watch-video"><i class="fas fa-play"></i> Tonton Video Tarian</button>
                            <button class="cta-button secondary" id="try-dance"><i class="fas fa-child"></i> Coba Gerakan Dasar</button>
                        </div>
                    </div>
                </div>
            `,
            'alat-musik': `
                <div class="topic-content">
                    <div class="topic-image">
                        <img src="images/budaya/gamelan.jpg" alt="Alat musik gamelan">
                        <p class="image-caption">Gamelan dari Jawa</p>
                    </div>
                    <div class="topic-text">
                        <h3>Alat Musik Tradisional</h3>
                        <p>Setiap daerah di Indonesia memiliki alat musik khas yang menghasilkan bunyi dan melodi unik.</p>
                        
                        <h4>Alat Musik Populer:</h4>
                        <ul class="culture-list">
                            <li>
                                <img src="images/budaya/angklung.jpg" alt="Angklung">
                                <div>
                                    <h5>Angklung</h5>
                                    <p>Alat musik bambu dari Jawa Barat yang dimainkan dengan digoyangkan.</p>
                                    <button class="play-sound" data-sound="angklung.mp3"><i class="fas fa-volume-up"></i> Dengarkan Suara</button>
                                </div>
                            </li>
                            <li>
                                <img src="images/budaya/sasando.jpg" alt="Sasando">
                                <div>
                                    <h5>Sasando</h5>
                                    <p>Alat musik petik dari Nusa Tenggara Timur dengan bentuk yang unik.</p>
                                    <button class="play-sound" data-sound="sasando.mp3"><i class="fas fa-volume-up"></i> Dengarkan Suara</button>
                                </div>
                            </li>
                            <li>
                                <img src="images/budaya/kolintang.jpg" alt="Kolintang">
                                <div>
                                    <h5>Kolintang</h5>
                                    <p>Alat musik pukul dari Sulawesi Utara yang terbuat dari kayu.</p>
                                    <button class="play-sound" data-sound="kolintang.mp3"><i class="fas fa-volume-up"></i> Dengarkan Suara</button>
                                </div>
                            </li>
                        </ul>
                        
                        <div class="interactive-element">
                            <button class="cta-button" id="virtual-instrument"><i class="fas fa-guitar"></i> Coba Mainkan Virtual</button>
                        </div>
                    </div>
                </div>
            `,
            'pakaian-adat': `
                <div class="topic-content">
                    <div class="topic-image">
                        <img src="images/budaya/pakaian-adat.jpg" alt="Berbagai pakaian adat">
                        <p class="image-caption">Beragam pakaian adat Indonesia</p>
                    </div>
                    <div class="topic-text">
                        <h3>Pakaian Adat Indonesia</h3>
                        <p>Setiap provinsi di Indonesia memiliki pakaian tradisional yang unik dan penuh makna filosofis.</p>
                        
                        <h4>Contoh Pakaian Adat:</h4>
                        <ul class="culture-list">
                            <li>
                                <img src="images/budaya/baju-bodo.jpg" alt="Baju Bodo">
                                <div>
                                    <h5>Baju Bodo</h5>
                                    <p>Pakaian tradisional wanita Sulawesi Selatan yang berwarna-warni.</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/budaya/ulos.jpg" alt="Ulos">
                                <div>
                                    <h5>Ulos</h5>
                                    <p>Kain tradisional Batak dari Sumatera Utara yang sering digunakan dalam upacara adat.</p>
                                </div>
                            </li>
                            <li>
                                <img src="images/budaya/kebaya.jpg" alt="Kebaya">
                                <div>
                                    <h5>Kebaya</h5>
                                    <p>Pakaian tradisional wanita Jawa yang elegan dan anggun.</p>
                                </div>
                            </li>
                        </ul>
                        
                        <div class="interactive-element">
                            <button class="cta-button" id="dress-up"><i class="fas fa-tshirt"></i> Coba Virtual Dress Up</button>
                            <button class="cta-button secondary" id="color-costume"><i class="fas fa-palette"></i> Warnai Kostum</button>
                        </div>
                    </div>
                </div>
            `,
            'makanan': `
                <div class="topic-content">
                    <div class="topic-image">
                        <img src="images/b
