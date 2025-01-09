const linkStylesheet = document.createElement('link');
linkStylesheet.rel = 'stylesheet';
linkStylesheet.href = 'tree.css';
document.head.appendChild(linkStylesheet);

const linkIcon = document.createElement('link');
linkIcon.rel = 'icon';
linkIcon.type = 'image/x-icon';
linkIcon.href = './frost.ico';
document.head.appendChild(linkIcon);
document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;

    const centerImageDiv = document.createElement("div");
    centerImageDiv.className = "center-image";

    const trackTitleDiv = document.createElement("div");
    trackTitleDiv.className = "track-title";

    const trackName = document.createElement("p");
    trackName.className = "track-name";
    trackName.textContent = "Дискотека Авария";

    const trackArtist = document.createElement("p");
    trackArtist.className = "track-artist";
    trackArtist.textContent = "Новогодняя";

    trackTitleDiv.appendChild(trackName);
    trackTitleDiv.appendChild(trackArtist);
    centerImageDiv.appendChild(trackTitleDiv);

    const controlsDiv = document.createElement("div");
    controlsDiv.className = "controls";

    const ballButtonContainer = document.createElement("div");
    ballButtonContainer.className = "ball-button-container";

    const playButton = document.createElement("button");
    playButton.className = "button play-button";
    playButton.id = "play-button";
    playButton.textContent = "▶";

    const pauseButton = document.createElement("button");
    pauseButton.className = "button pause-button";
    pauseButton.id = "pause-button";
    pauseButton.style.display = "none";
    pauseButton.textContent = "▐▐";

    ballButtonContainer.appendChild(playButton);
    ballButtonContainer.appendChild(pauseButton);
    controlsDiv.appendChild(ballButtonContainer);

    const sliderContainer = document.createElement("div");
    sliderContainer.className = "slider-container";

    const musicSlider = document.createElement("input");
    musicSlider.type = "range";
    musicSlider.className = "slider";
    musicSlider.id = "music-slider";
    musicSlider.min = "0";
    musicSlider.max = "100";
    musicSlider.value = "0";

    const currentTime = document.createElement("span");
    currentTime.className = "current-time";
    currentTime.id = "current-time";
    currentTime.textContent = "0:00";

    const totalTime = document.createElement("span");
    totalTime.className = "total-time";
    totalTime.textContent = "0:00";

    sliderContainer.appendChild(musicSlider);
    sliderContainer.appendChild(currentTime);
    sliderContainer.appendChild(document.createTextNode(" / "));
    sliderContainer.appendChild(totalTime);

    const volumeSlider = document.createElement("input");
    volumeSlider.type = "range";
    volumeSlider.className = "slider";
    volumeSlider.id = "volume-slider";
    volumeSlider.min = "0";
    volumeSlider.max = "100";
    volumeSlider.value = "50";

    const volumeLabel = document.createElement("span");
    volumeLabel.className = "volume-label";
    volumeLabel.textContent = "Громкость: 50%";

    sliderContainer.appendChild(volumeSlider);
    sliderContainer.appendChild(volumeLabel);
    controlsDiv.appendChild(sliderContainer);
    centerImageDiv.appendChild(controlsDiv);
    body.appendChild(centerImageDiv);
});

document.addEventListener('DOMContentLoaded', () => {


    // Обработчик касаний для мобильных устройств
    document.addEventListener('touchmove', (event) => {
        const touch = event.touches[0];
        snowflakeCursor.style.left = `${touch.pageX}px`;
        snowflakeCursor.style.top = `${touch.pageY}px`;
    });

    // Создание неоновой змейки
    const numDots = 20;
    const dots = [];
    let mouseX = 0, mouseY = 0;

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'neon-dot';
        document.body.appendChild(dot);
        dots.push(dot);
    }

    function moveDots() {
        let nextX = mouseX, nextY = mouseY;
        dots.forEach((dot, index) => {
            const currentX = parseFloat(dot.style.left) || 0;
            const currentY = parseFloat(dot.style.top) || 0;

            dot.style.left = `${currentX + (nextX - currentX) * 0.2}px`;
            dot.style.top = `${currentY + (nextY - currentY) * 0.2}px`;
            dot.style.opacity = `${1 - index / numDots}`;

            nextX = currentX;
            nextY = currentY;
        });
        requestAnimationFrame(moveDots);
    }

    document.addEventListener('mousemove', (event) => {
        mouseX = event.pageX;
        mouseY = event.pageY;
    });

    document.addEventListener('touchmove', (event) => {
        const touch = event.touches[0];
        mouseX = touch.pageX;
        mouseY = touch.pageY;
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
    const currentTimeElem = document.getElementById('current-time');
    const totalTimeElem = document.getElementById('total-time');
    let isPlaying = false;
    let currentTrackIndex = 0;

    const musicTracks = [
        { title: 'Дискотека Авария', artist: 'Новогодняя', src: 'Music/A.mp3' },
        { title: 'Руки Вверх', artist: 'С Новым Годом!', src: 'Music/P.mp3' },
        { title: 'S.U.27', artist: 'С Новым Годом!', src: 'Music/S.mp3' },
    ];

    function loadTrack(trackIndex) {
        const track = musicTracks[trackIndex];
        musicPlayer.src = track.src;
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        musicPlayer.load();

        musicPlayer.onloadedmetadata = () => {
            musicSlider.max = musicPlayer.duration;
            totalTimeElem.textContent = formatTime(musicPlayer.duration);
        };
    }

    function playMusic() {
        if (isPlaying) {
            musicPlayer.pause();
        } else {
            musicPlayer.play();
        }
        isPlaying = !isPlaying;
        playBtn.style.display = isPlaying ? 'none' : 'block';
        pauseBtn.style.display = isPlaying ? 'block' : 'none';
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function updateDisplayTime() {
        currentTimeElem.textContent = formatTime(musicPlayer.currentTime);
        musicSlider.value = musicPlayer.currentTime;
    }

    musicPlayer.addEventListener('timeupdate', updateDisplayTime);
playBtn.addEventListener('click', playMusic);
    pauseBtn.addEventListener('click', playMusic);

    volumeSlider.addEventListener('input', () => {
        musicPlayer.volume = volumeSlider.value / 100;
        document.querySelector('.volume-label').textContent = `Громкость: ${volumeSlider.value}%`;
    });

    musicSlider.addEventListener('input', () => {
        musicPlayer.currentTime = musicSlider.value;
    });

    musicPlayer.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
        loadTrack(currentTrackIndex);
        playMusic();
    });

    // Обработка нажатий клавиш
    document.addEventListener('keydown', (event) => {
        switch (event.code) {

            case 'ArrowRight': // Следующий трек
                currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
                loadTrack(currentTrackIndex);
                if (isPlaying) musicPlayer.play();
                break;
            case 'ArrowLeft': // Предыдущий трек
                currentTrackIndex = (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length;
                loadTrack(currentTrackIndex);
                if (isPlaying) musicPlayer.play();
                break;
            case 'ArrowUp': // Увеличение громкости
                volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 10);
                volumeSlider.dispatchEvent(new Event('input'));
                break;
            case 'ArrowDown': // Уменьшение громкости
                volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 10);
                volumeSlider.dispatchEvent(new Event('input'));
                break;
            case 'KeyR': // Случайный трек
                currentTrackIndex = Math.floor(Math.random() * musicTracks.length);
                loadTrack(currentTrackIndex);
                if (isPlaying) musicPlayer.play();
                break;
            case 'KeyN': // Добавить трек
                const newTrack = prompt("Введите название, исполнителя и URL трека (через ;):");
                if (newTrack) {
                    const [title, artist, src] = newTrack.split(';');
                    if (title && artist && src) {
                        musicTracks.push({ title, artist, src });
                        alert(`Трек добавлен: ${title} - ${artist}`);
                    } else {
                        alert('Неверный формат! Используйте: Название;Исполнитель;URL');
                    }
                }
                break;
            case 'KeyS': // Сброс треков
                musicTracks.splice(0, musicTracks.length, 
                    { title: 'Дискотека Авария', artist: 'Новогодняя', src: 'Music/A.mp3' },
                    { title: 'Руки Вверх', artist: 'С Новым Годом!', src: 'Music/P.mp3' },
                    { title: 'S.U.27', artist: 'С Новым Годом!', src: 'Music/S.mp3' }
                );
                currentTrackIndex = 0;
                loadTrack(currentTrackIndex);
                break;
        }
    });

    // Инициализация
    loadTrack(currentTrackIndex);
});
