// Создание элемента курсора снежинки 
const snowflakeCursor = document.createElement('div'); 
snowflakeCursor.classList.add('snowflake-cursor'); 
document.body.appendChild(snowflakeCursor); 

// Обработчик события движения мыши 
document.addEventListener('mousemove', (event) => { 
    snowflakeCursor.style.left = `${event.pageX}px`; // Установка позиции X 
    snowflakeCursor.style.top = `${event.pageY}px`; // Установка позиции Y 
}); 

document.addEventListener('DOMContentLoaded', () => { 
    const numDots = 60; 
    const dots = []; 
    let mouseX = 0, mouseY = 0; 

    // Создание неоновых точек 
    for (let i = 0; i < numDots; i++) { 
        const dot = document.createElement('div'); 
        dot.className = 'neon-dot'; 
        document.body.appendChild(dot); 
        dots.push(dot); 
    } 

    // Функция для перемещения точек 
    function moveDots() { 
        let nextX = mouseX, nextY = mouseY; 
        dots.forEach((dot) => { 
            const currentX = parseFloat(dot.style.left) || 0; 
            const currentY = parseFloat(dot.style.top) || 0; 
            dot.style.left = `${nextX}px`; 
            dot.style.top = `${nextY}px`; 
            dot.style.opacity = 1; 
            nextX += (currentX - nextX) * 0.5; 
            nextY += (currentY - nextY) * 0.5; 
        }); 
        requestAnimationFrame(moveDots); 
    } 

    // Обновление координат мыши при движении 
    document.addEventListener('mousemove', (e) => { 
        mouseX = e.clientX; 
        mouseY = e.clientY; 
    }); 

    moveDots(); 

    // Логика музыкального плеера 
    const musicPlayer = document.getElementById('music-player-audio'); 
    const playBtn = document.getElementById('play-button'); 
    const pauseBtn = document.getElementById('pause-button'); 
    const musicSlider = document.getElementById('music-slider'); 
    const volumeSlider = document.getElementById('volume-slider'); 
    const trackTitle = document.querySelector('.track-name'); 
    const trackArtist = document.querySelector('.track-artist'); 

    let isPlaying = false; 
    let currentTrackIndex = 0; 
    const musicTracks = [ 
        { title: 'Дискотека Авария', artist: 'Новогодняя', src: 'Music/A.mp3' }, 
        { title: 'Руки Вверх', artist: 'С Новым Годом!', src: 'Music/P.mp3' }, 
        { title: 'S.U.27', artist: 'С Новым Годом!', src: 'Music/S.mp3' } 
    ]; 

    function loadTrack(trackIndex) { 
        const track = musicTracks[trackIndex]; 
        musicPlayer.src = track.src; 
        trackTitle.textContent = track.title; 
        trackArtist.textContent = track.artist; 
        musicPlayer.load(); 

        musicPlayer.onloadedmetadata = () => { 
            musicSlider.max = musicPlayer.duration; 
            updateDisplayTime(); 
        }; 
    } 

    function playMusic() {
try { 
            isPlaying ? musicPlayer.pause() : musicPlayer.play(); 
            isPlaying = !isPlaying; 
            playBtn.style.display = isPlaying ? 'none' : 'block'; // Переключение кнопки воспроизведения 
            pauseBtn.style.display = isPlaying ? 'block' : 'none'; // Переключение кнопки паузы 
        } catch (error) { 
            console.error('Ошибка воспроизведения музыки:', error); 
        } 
    } 

    function updateDisplayTime() { 
        const currentTime = musicPlayer.currentTime; 
        const duration = musicPlayer.duration; 
        document.getElementById('current-time').textContent = formatTime(currentTime); 
        document.getElementById('total-time').textContent = formatTime(duration); 
    } 

    playBtn.addEventListener('click', playMusic); 
    pauseBtn.addEventListener('click', playMusic); 
    loadTrack(currentTrackIndex); 

    volumeSlider.addEventListener('input', () => { 
        musicPlayer.volume = volumeSlider.value / 100; 
        document.querySelector('.volume-label').textContent = `Громкость: ${volumeSlider.value}%`; 
    }); 

    musicPlayer.addEventListener('ended', () => { 
        currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length; 
        loadTrack(currentTrackIndex); 
        playMusic(); 
    }); 

    musicPlayer.addEventListener('timeupdate', () => { 
        musicSlider.value = musicPlayer.currentTime; 
    }); 

    // Обработка нажатий клавиш 
    document.addEventListener('keydown', (event) => { 
        if (event.code === 'Space') { 
            event.preventDefault();
            playMusic();  
        } else if (event.code === 'Enter') { 
            alert('Инструкция: Нажмите пробел для паузы/воспроизведения музыки.'); 
        } 
    }); 

    document.addEventListener('keydown', (e) => { 
        switch (e.code) { 
            case 'KeyN': // Следующий трек 
                currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length; 
                loadTrack(currentTrackIndex); 
                if (isPlaying) musicPlayer.play(); 
                break; 
            case 'KeyR': // Случайный трек 
                currentTrackIndex = Math.floor(Math.random() * musicTracks.length); 
                loadTrack(currentTrackIndex); 
                if (isPlaying) musicPlayer.play(); 
                break; 
            case 'KeyE': // Добавить трек 
                const newTrack = prompt("Введите название, исполнителя и URL в формате 'название;исполнитель;url':"); 
                if (newTrack) { 
                    const [title, artist, src] = newTrack.split(';'); 
                    if (title && artist && src) { 
                        musicTracks.push({ title, artist, src }); 
                        alert`(Трек добавлен: ${title} - ${artist})`; 
                    } else { 
                        alert('Неверный формат. Используйте: название;исполнитель;url'); 
                    } 
                } 
                break; 
            case 'KeyS': // Сброс к стандартным трекам 
                musicTracks.length = 0; // Очистка текущего массива 
                musicTracks.push( 
                    { title: 'Дискотека Авария', artist: 'Новогодняя', src: 'Music/A.mp3' }, 
                    { title: 'Руки Вверх', artist: 'С Новым Годом!', src: 'Music/P.mp3' }, 
                    { title: 'S.U.27', artist: 'С Новым Годом!', src: 'Music/S.mp3' } 
                ); 
                currentTrackIndex = 0; // Сброс индекса 
                loadTrack(currentTrackIndex); // Загрузка первого трека 
                break; 
        } 
    }); 

    // Обработка касаний для мобильных устройств
    document.addEventListener('touchmove', (event) => {
        const touch = event.touches[0];
        snowflakeCursor.style.left = `${touch.pageX}px`;
        snowflakeCursor.style.top = `${touch.pageY}px`;
    });
// Проверка наличия интернет-соединения
    window.addEventListener('offline', () => {
        alert('Вы в оффлайне. Некоторые функции могут быть недоступны.');
    });

    window.addEventListener('online', () => {
        alert('Вы снова в сети!');
    });
});