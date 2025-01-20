const linkStylesheet = document.createElement('link');
linkStylesheet.rel = 'stylesheet';
linkStylesheet.href = 'tree.css';
document.head.appendChild(linkStylesheet);

// Создаем инструкцию
const div = document.createElement('div');
div.id = 'question-mark';
div.textContent = '?';
document.body.appendChild(div);


const linkIcon = document.createElement('link');
linkIcon.rel = 'icon';
linkIcon.type = 'image/x-icon';
linkIcon.href = './frost.ico';
document.head.appendChild(linkIcon);
document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;

    const centerImageDiv = document.createElement("div");
    centerImageDiv.className = "center-image";
    const prevTrackButton = document.createElement("button-p");
    prevTrackButton.id = "prev-track"; 
    prevTrackButton.className = "arrow-button";
    prevTrackButton.textContent = "❮";

    const nextTrackButton = document.createElement("button-p");
    nextTrackButton.id = "next-track"; 
    nextTrackButton.className = "arrow-button";
    nextTrackButton.textContent = "❯";

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
    centerImageDiv.appendChild(prevTrackButton);
    centerImageDiv.appendChild(nextTrackButton);


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
// Функция для отображения инструкции 

const questionMark = document.getElementById('question-mark');
questionMark.addEventListener('click', showInstructions);
function showInstructions() {
    const instructionsDiv = document.getElementById('instructions');
    if (instructionsDiv) {
      instructionsDiv.remove();
    } else {
      const instructions = document.createElement('div');
      instructions.id = 'instructions';
      instructions.classList.add('instructions');
      instructions.innerHTML = `
        <h1>Инструкции по управлению плеером:</h1>
        <ul>
          <li><b>Enter / кнопка на главном экране "?" :</b> Показать /скрыть инструкции</li>
          <li><b> Стрелка вправо на клавиатуре / Кнопка N на клавиатуре:</b> Следующий трек</li>
          <li><b>Стрелка влево на клавиатуре:</b> Предыдущий трек</li>
          <li><b>Стрелка вверх на клавиатуре:</b> Увеличить громкость</li>
          <li><b>Стрелка вниз на клавиатуре:</b> Уменьшить громкость</li>
          <li><b>Кнопка на клавиатуре R:</b> Случайный трек</li>
          <li><b>Кнопка на клавиатуре E:</b> Добавить трек (формат: название;артист;ссылка)</li>
          <li><b>Кнопка на клавиатуре S:</b> Сбросить треки на стандартные</li>
        </ul>
      `;
      document.body.appendChild(instructions);
    }
  }
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
// Инициализация музыкального плеера
    const musicPlayer = document.getElementById('music-player-audio');
    const playBtn = document.getElementById('play-button');
    const pauseBtn = document.getElementById('pause-button');
    const musicSlider = document.getElementById('music-slider');
    const volumeSlider = document.getElementById('volume-slider');
    const trackTitle = document.querySelector('.track-name');
    const trackArtist = document.querySelector('.track-artist');
    const currentTimeElem = document.getElementById('current-time');
    const totalTimeElem = document.getElementById('total-time');
    const prevTrackButton = document.getElementById('prev-track');
    const nextTrackButton = document.getElementById('next-track');

    let isPlaying = false;
    let currentTrackIndex = 0;

    const musicTracks = [
        { title: 'Дискотека Авария', artist: 'Новогодняя', src: 'Music/A.mp3' },
        { title: 'Руки Вверх', artist: 'С Новым Годом!', src: 'Music/P.mp3' },
        { title: 'S.U.27', artist: 'С Новым Годом!', src: 'Music/S.mp3' },
    ];

    // Обработчики событий для кнопок
    prevTrackButton.addEventListener('click', () => changeTrack(-1));
    nextTrackButton.addEventListener('click', () => changeTrack(1));
    playBtn.addEventListener('click', togglePlayPause);
    pauseBtn.addEventListener('click', togglePlayPause);
    volumeSlider.addEventListener('input', updateVolume);
    musicSlider.addEventListener('input', () => {
        musicPlayer.currentTime = musicSlider.value;
    });

    musicPlayer.addEventListener('timeupdate', updateDisplayTime);
    musicPlayer.addEventListener('ended', () => changeTrack(1));

    // Инициализация
    loadTrack(currentTrackIndex);

    // Функции
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

    function togglePlayPause() {
        isPlaying ? musicPlayer.pause() : musicPlayer.play();
        isPlaying = !isPlaying;
        playBtn.style.display = isPlaying ? 'none' : 'block';
        pauseBtn.style.display = isPlaying ? 'block' : 'none';
    }

    function changeTrack(direction) {
        currentTrackIndex = (currentTrackIndex + direction + musicTracks.length) % musicTracks.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) musicPlayer.play();
    }

    function updateDisplayTime() {
        currentTimeElem.textContent = formatTime(musicPlayer.currentTime);
        musicSlider.value = musicPlayer.currentTime;
    }

    function updateVolume() {
        musicPlayer.volume = volumeSlider.value / 100;
        document.querySelector('.volume-label').textContent = `Громкость: ${volumeSlider.value}%`;
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    })
