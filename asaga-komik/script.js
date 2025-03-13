let currentScene = 'start';
const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const storyImage = document.querySelector('.story-image img');
const storyTitle = document.getElementById('story-title');
let isAnimating = false;

// Audio elements
const bgm = document.getElementById('bgm');
const pageFlipSound = document.getElementById('page-flip');
const clickSound = document.getElementById('click-sound');
const bgmToggle = document.getElementById('bgm-toggle');
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.querySelector('.volume-value');

let isMusicPlaying = false;
let userInteracted = false;

// Inisialisasi volume
const initialVolume = volumeSlider.value / 100;
[bgm, pageFlipSound, clickSound].forEach(audio => {
    if (audio) {
        audio.volume = initialVolume;
    }
});

// Fungsi untuk mengatur musik
function initializeAudio() {
    if (!userInteracted) {
        userInteracted = true;
        if (bgm) {
            bgm.play().then(() => {
                isMusicPlaying = true;
                updateMusicButton();
            }).catch(err => {
                console.log('Autoplay prevented:', err);
                isMusicPlaying = false;
                updateMusicButton();
            });
        }
    }
}

function toggleMusic() {
    if (!bgm) return;

    if (bgm.paused) {
        const fadeIn = setInterval(() => {
            if (bgm.volume < volumeSlider.value / 100) {
                bgm.volume = Math.min(volumeSlider.value / 100, bgm.volume + 0.05);
            } else {
                clearInterval(fadeIn);
            }
        }, 50);

        bgm.play()
            .then(() => {
                isMusicPlaying = true;
                updateMusicButton();
            })
            .catch(err => {
                console.log('Music playback failed:', err);
                isMusicPlaying = false;
                updateMusicButton();
            });
    } else {
        const fadeOut = setInterval(() => {
            if (bgm.volume > 0) {
                bgm.volume = Math.max(0, bgm.volume - 0.05);
            } else {
                bgm.pause();
                clearInterval(fadeOut);
            }
        }, 50);

        isMusicPlaying = false;
        updateMusicButton();
    }
}

// Update tampilan tombol musik
function updateMusicButton() {
    if (!bgmToggle) return;

    if (isMusicPlaying) {
        bgmToggle.innerHTML = '<i class="fas fa-volume-up"></i> Musik';
        bgmToggle.classList.add('playing');
    } else {
        bgmToggle.innerHTML = '<i class="fas fa-volume-mute"></i> Musik';
        bgmToggle.classList.remove('playing');
    }
}

// Fungsi untuk memainkan efek suara dengan fade
function playSound(audio, maxVolume = volumeSlider.value / 100) {
    if (!audio) return;

    // Set volume awal ke 0 untuk fade in
    audio.volume = 0;
    audio.currentTime = 0;
    
    // Tentukan volume maksimum berdasarkan jenis suara
    let targetVolume = maxVolume;
    if (audio === pageFlipSound) {
        targetVolume = Math.min(0.8, maxVolume * 1.5); // Volume flip 50% lebih keras
    } else if (audio === clickSound) {
        targetVolume = Math.min(0.7, maxVolume * 1.3); // Volume klik 30% lebih keras
    }
    
    const fadeIn = setInterval(() => {
        if (audio.volume < targetVolume) {
            audio.volume = Math.min(targetVolume, audio.volume + 0.08); // Fade in lebih cepat
        } else {
            clearInterval(fadeIn);
            
            // Fade out setelah suara selesai
            setTimeout(() => {
                const fadeOut = setInterval(() => {
                    if (audio.volume > 0) {
                        audio.volume = Math.max(0, audio.volume - 0.08);
                    } else {
                        clearInterval(fadeOut);
                    }
                }, 40); // Fade out lebih cepat
            }, audio.duration * 1000 - 150);
        }
    }, 40);

    audio.play().catch(err => console.log('Audio play failed:', err));
}

// Fungsi untuk animasi membalik halaman
function animatePageFlip(book, callback) {
    if (isAnimating) return;
    isAnimating = true;

    // Mainkan suara membalik halaman dengan volume yang lebih keras
    if (pageFlipSound) {
        pageFlipSound.volume = 0;
        const fadeIn = setInterval(() => {
            if (pageFlipSound.volume < 0.8) { // Volume maksimum dinaikkan
                pageFlipSound.volume += 0.15; // Step size lebih besar
            } else {
                clearInterval(fadeIn);
                // Fade out yang lebih natural
                setTimeout(() => {
                    const fadeOut = setInterval(() => {
                        if (pageFlipSound.volume > 0) {
                            pageFlipSound.volume = Math.max(0, pageFlipSound.volume - 0.1);
                        } else {
                            clearInterval(fadeOut);
                        }
                    }, 40);
                }, 200);
            }
        }, 40);
        playSound(pageFlipSound);
    }

    // Dapatkan posisi tengah buku
    const bookRect = book.getBoundingClientRect();
    const centerX = bookRect.width / 2;

    // Persiapkan animasi
    book.style.willChange = 'transform, filter';
    const pages = book.querySelectorAll('.page-left, .page-right');
    pages.forEach(page => {
        page.style.willChange = 'transform, opacity, filter';
    });

    // Tambahkan kelas untuk animasi
    book.classList.add('page-flip');
    book.style.transformOrigin = `${centerX}px center`;
    
    // Tambahkan kelas untuk animasi konten
    pages.forEach(page => {
        page.classList.add('page-content');
    });

    // Hapus kelas animasi dan cleanup setelah selesai
    setTimeout(() => {
        book.classList.remove('page-flip');
        book.style.transformOrigin = '';
        book.style.willChange = 'auto';
        
        pages.forEach(page => {
            page.classList.remove('page-content');
            page.style.willChange = 'auto';
        });

        isAnimating = false;
        if (callback) callback();
    }, 1000); // Sesuaikan dengan durasi animasi CSS
}

// Fungsi untuk memuat gambar dengan penanganan error
function loadImage(src, fallback = 'images/default.jpg') {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => {
            console.warn(`Failed to load image: ${src}, using fallback`);
            resolve(fallback);
        };
        img.src = src;
    });
}

// Fungsi untuk menampilkan scene dengan animasi yang lebih halus
async function showScene(sceneId, isUndo = false) {
    if (isAnimating) return;
    
    const scene = storyData[sceneId];
    if (!scene) return;

    const book = document.querySelector('.book');
    
    if (!isUndo && currentHistoryIndex === storyHistory.length - 1) {
        addToHistory(sceneId);
    }

    // Pre-load gambar dengan loading indicator
    const loadingPromises = [loadImage(scene.image)];
    scene.choices.forEach(choice => {
        loadingPromises.push(loadImage(choice.image));
    });

    // Mainkan suara klik dengan volume yang lebih halus
    if (clickSound) {
        clickSound.volume = 0.2;
        playSound(clickSound);
    }

    try {
        const [mainImage, ...choiceImages] = await Promise.all(loadingPromises);
        
        // Animasikan halaman
        animatePageFlip(book, () => {
            // Update konten dengan transisi yang halus
            requestAnimationFrame(() => {
                storyTitle.textContent = scene.title || 'Cerita Interaktif';
                storyText.innerHTML = scene.text;
                storyImage.src = mainImage;
                storyImage.alt = scene.title || 'Scene illustration';
                
                // Update choices dengan animasi bertahap
                choicesContainer.innerHTML = '';
                
                scene.choices.forEach((choice, index) => {
                    const choiceCard = document.createElement('div');
                    choiceCard.className = 'choice-card';
                    choiceCard.style.opacity = '0';
                    choiceCard.style.transform = 'translateY(30px)';
                    
                    // Struktur choice card
                    const choiceNumber = document.createElement('div');
                    choiceNumber.className = 'choice-number';
                    choiceNumber.textContent = index + 1;
                    
                    const choiceImage = document.createElement('div');
                    choiceImage.className = 'choice-image';
                    const img = document.createElement('img');
                    img.src = choiceImages[index];
                    img.alt = choice.text;
                    choiceImage.appendChild(img);
                    
                    const choiceContent = document.createElement('div');
                    choiceContent.className = 'choice-text';
                    choiceContent.innerHTML = `
                        <h3>${choice.text}</h3>
                        ${choice.description ? `<p>${choice.description}</p>` : ''}
                    `;
                    
                    choiceCard.appendChild(choiceNumber);
                    choiceCard.appendChild(choiceImage);
                    choiceCard.appendChild(choiceContent);
                    
                    // Event listener dengan animasi yang lebih halus
                    choiceCard.onclick = () => {
                        if (!isAnimating) {
                            choiceCard.style.willChange = 'transform, opacity, filter';
                            choiceCard.classList.add('selected');
                            
                            // Fade out sound effect
                            if (clickSound) {
                                const fadeOut = setInterval(() => {
                                    if (clickSound.volume > 0.1) {
                                        clickSound.volume -= 0.1;
                                    } else {
                                        clearInterval(fadeOut);
                                    }
                                }, 50);
                            }
                            
                            setTimeout(() => {
                                showScene(choice.nextScene);
                                choiceCard.style.willChange = 'auto';
                            }, 800);
                        }
                    };
                    
                    choicesContainer.appendChild(choiceCard);
                    
                    // Animate fade in dengan timing yang lebih halus
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            choiceCard.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                            choiceCard.style.opacity = '1';
                            choiceCard.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                });
                
                updateProgress();
            });
        });
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

// Fungsi untuk memperbarui progress bar
function updateProgress() {
    const totalScenes = Object.keys(storyData).length;
    const visitedScenes = new Set(storyHistory);
    const progress = Math.round((visitedScenes.size / totalScenes) * 100);
    document.querySelector('.progress').style.width = `${progress}%`;
    document.getElementById('progress-percentage').textContent = `${progress}%`;
}

// History management
let storyHistory = [];
let currentHistoryIndex = -1;
const maxHistorySize = 50;

// Event Listeners
window.onload = function() {
    const book = document.querySelector('.book');
    
    // Add navigation controls if they don't exist
    if (!document.querySelector('.navigation-controls')) {
        const nav = document.createElement('div');
        nav.className = '';
      
        ;
        document.body.appendChild(nav);
    }

    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');

    // Event listener untuk toggle musik
    if (bgmToggle) {
        bgmToggle.addEventListener('click', () => {
            toggleMusic();
        });
    }

    // Coba mainkan musik otomatis dengan user interaction pertama
    document.body.addEventListener('click', function initAudio() {
        initializeAudio();
        document.body.removeEventListener('click', initAudio);
    }, { once: true });

    // Navigation button listeners
    if (undoBtn) {
        undoBtn.addEventListener('click', () => {
            if (canUndo()) {
                undo();
            }
        });
    }

    if (redoBtn) {
        redoBtn.addEventListener('click', () => {
            if (canRedo()) {
                redo();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isAnimating) return;
        
        switch(e.key) {
            case 'ArrowLeft':
            case 'Backspace':
                if (canUndo()) undo();
                break;
            case 'ArrowRight':
                if (canRedo()) redo();
                break;
        }
    });

    // Update 3D hover effect
    document.addEventListener('mousemove', (e) => {
        if (isAnimating) return;
        const book = document.querySelector('.book');
        const { left, top, width, height } = book.getBoundingClientRect();
        const centerX = width / 2;
        const x = (e.clientX - left - centerX) / width;
        const y = (e.clientY - top - height / 2) / height;
        
        book.style.transform = `
            rotateY(${x * 10}deg)
            rotateX(${-y * 10}deg)
            translateZ(0)
        `;
    });

    document.addEventListener('mouseleave', () => {
        if (!isAnimating) {
            book.style.transform = 'rotateY(0) rotateX(0)';
        }
    });

    // Tambahkan event listener untuk visibilitychange
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (bgm && !bgm.paused) {
                const fadeOut = setInterval(() => {
                    if (bgm.volume > 0) {
                        bgm.volume = Math.max(0, bgm.volume - 0.05);
                    } else {
                        bgm.pause();
                        clearInterval(fadeOut);
                    }
                }, 50);
            }
        } else {
            if (bgm && isMusicPlaying) {
                bgm.play().then(() => {
                    const fadeIn = setInterval(() => {
                        if (bgm.volume < volumeSlider.value / 100) {
                            bgm.volume = Math.min(volumeSlider.value / 100, bgm.volume + 0.05);
                        } else {
                            clearInterval(fadeIn);
                        }
                    }, 50);
                });
            }
        }
    });

    // Start the story
    showScene('start');
    updateNavigationButtons();
}

function addToHistory(sceneId) {
    if (currentHistoryIndex < storyHistory.length - 1) {
        storyHistory = storyHistory.slice(0, currentHistoryIndex + 1);
    }

    storyHistory.push(sceneId);
    currentHistoryIndex++;

    if (storyHistory.length > maxHistorySize) {
        storyHistory.shift();
        currentHistoryIndex--;
    }

    updateNavigationButtons();
}

function canUndo() {
    return currentHistoryIndex > 0;
}

function canRedo() {
    return currentHistoryIndex < storyHistory.length - 1;
}

function undo() {
    if (!canUndo()) return;
    
    currentHistoryIndex--;
    const previousScene = storyHistory[currentHistoryIndex];
    showScene(previousScene, true);
    updateNavigationButtons();
}

function redo() {
    if (!canRedo()) return;
    
    currentHistoryIndex++;
    const nextScene = storyHistory[currentHistoryIndex];
    showScene(nextScene);
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');
    
    if (undoBtn) {
        undoBtn.disabled = !canUndo();
    }
    if (redoBtn) {
        redoBtn.disabled = !canRedo();
    }
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value / 100;
        volumeValue.textContent = `${volumeSlider.value}%`;
        
        // Sesuaikan volume untuk setiap jenis audio
        if (bgm) {
            bgm.volume = volume;
        }
        if (pageFlipSound) {
            pageFlipSound.volume = Math.min(0.8, volume * 1.5); // Volume flip 50% lebih keras
        }
        if (clickSound) {
            clickSound.volume = Math.min(0.7, volume * 1.3); // Volume klik 30% lebih keras
        }
    });
} 