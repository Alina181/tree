document.addEventListener("DOMContentLoaded", () => {
    // Ссылки на DOM элементы
    const body = document.body;

    // Добавление стилей
    const linkStylesheet = document.createElement("link");
    linkStylesheet.rel = "stylesheet";
    linkStylesheet.href = "tree.css";
    document.head.appendChild(linkStylesheet);

    // Иконка сайта
    const linkIcon = document.createElement("link");
    linkIcon.rel = "icon";
    linkIcon.type = "image/x-icon";
    linkIcon.href = "./frost.ico";
    document.head.appendChild(linkIcon);

    // Создаем аудиоплеер
    const audioElement = document.createElement("audio");
    audioElement.id = "music-player-audio";
    audioElement.controls = false;
    audioElement.preload = "metadata";
    body.appendChild(audioElement);

    // Интерфейс плеера
    const centerImageDiv = document.createElement("div");
    centerImageDiv.className = "center-image";

    const trackTitleDiv = document.createElement("div");
    trackTitleDiv.className = "track-title";

    const trackName = document.createElement("p");
    trackName.className = "track-name";

    const trackArtist = document.createElement("p");
    trackArtist.className = "track-artist";

    trackTitleDiv.appendChild(trackName);
    trackTitleDiv.appendChild(trackArtist);
    centerImageDiv.appendChild(trackTitleDiv);

    // Добавление кнопки "?"
    const questionMark = document.createElement("div");
    questionMark.id = "question-mark";
    questionMark.textContent = "?";
    centerImageDiv.appendChild(questionMark); // Добавляем в center-image

    // Элементы управления
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

    // Скрытая инструкция
    const instructionDiv = document.createElement("div");
    instructionDiv.id = "instruction";
    instructionDiv.style.display = "none";
    instructionDiv.innerHTML = `
        <div class="instruction-buttons">
            <button id="next-track-btn">N - Следующая мелодия</button>
            <button id="random-track-btn">R - Случайная мелодия</button>
            <button id="default-set-btn">S - Стандартный набор</button>
            <button id="add-track-btn">E - Добавить мелодию</button>
        </div>
    `;
    body.appendChild(instructionDiv);

    // Логика плеера
    let isPlaying = false;
    let currentTrackIndex = 0;

    const musicTracks = [
        { title: "Дискотека Авария", artist: "Новогодняя", src: "Music/A.mp3" },
        { title: "Руки Вверх", artist: "С Новым Годом!", src: "Music/P.mp3" },
        { title: "S.U.27", artist: "С Новым Годом!", src: "Music/S.mp3" },
    ];

    const musicPlayer = audioElement;

    function loadTrack(index) {
        const track = musicTracks[index];
        if (!track) return alert("Трек не найден");
        musicPlayer.src = track.src;
        trackName.textContent = track.title;
        trackArtist.textContent = track.artist;
    }

    function togglePlayPause() {
        isPlaying ? musicPlayer.pause() : musicPlayer.play();
        isPlaying = !isPlaying;
        playButton.style.display = isPlaying ? "none" : "block";
        pauseButton.style.display = isPlaying ? "block" : "none";
    }

    playButton.addEventListener("click", togglePlayPause);
    pauseButton.addEventListener("click", togglePlayPause);

    // Изменение трека (вперед или назад)
    function changeTrack(direction) {
        currentTrackIndex = (currentTrackIndex + direction + musicTracks.length) % musicTracks.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) musicPlayer.play();
    }

    // Обновление времени трека
    function updateDisplayTime() {
        currentTime.textContent = formatTime(musicPlayer.currentTime);
        musicSlider.value = musicPlayer.currentTime;
    }

    // Обновление громкости
    function updateVolume() {
        musicPlayer.volume = volumeSlider.value / 100;
        volumeLabel.textContent = `Громкость: ${volumeSlider.value}%`;
    }

    // Форматирование времени
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    // Обработчики событий
    playButton.addEventListener("click", togglePlayPause);
    pauseButton.addEventListener("click", togglePlayPause);
    volumeSlider.addEventListener("input", updateVolume);
    musicSlider.addEventListener("input", () => {
        musicPlayer.currentTime = musicSlider.value;
    });

    musicPlayer.addEventListener("timeupdate", updateDisplayTime);
    musicPlayer.addEventListener("ended", () => changeTrack(1));

   // Добавление кнопок инструкции
   instructionDiv.id = "instruction";
   instructionDiv.style.display = "none"; // Скрыто по умолчанию
   instructionDiv.innerHTML = `
       <div class="instruction-buttons">
           <button id="next-track-btn">N - Следующая мелодия</button>
           <button id="random-track-btn">R - Случайная мелодия</button>
           <button id="default-set-btn">S - Стандартный набор</button>
           <button id="add-track-btn">E - Добавить мелодию</button>
       </div>
   `;
   body.appendChild(instructionDiv);

   // Показ инструкции
   function showInstructions() {
       instructionDiv.style.display = "block";
   }

   // Функция выбора случайного трека
   function playRandomTrack() {
       const randomIndex = Math.floor(Math.random() * musicTracks.length);
       currentTrackIndex = randomIndex;
       loadTrack(currentTrackIndex);
       if (isPlaying) musicPlayer.play();
   }

   function setDefault() {
    currentTrackIndex = 0; // Устанавливаем первый трек
    loadTrack(currentTrackIndex); // Загружаем трек
    musicPlayer.volume = 0.5; // Устанавливаем стандартную громкость
    volumeSlider.value = 50;
    volumeLabel.textContent = "Громкость: 50%";

    // Если музыка не воспроизводится, запускаем её
    if (!isPlaying) {
        togglePlayPause(); // Автоматически меняем кнопку на воспроизведение
    } else {
        musicPlayer.play(); // Продолжаем воспроизведение
    }
}
   // Функция добавления трека
   function addTrack() {
       const userInput = prompt("Введите название, артиста и URL новой мелодии в формате 'название;артист;ссылка':");
       if (userInput) {
           const [title, artist, src] = userInput.split(";");
           if (title && artist && src) {
               musicTracks.push({ title: title.trim(), artist: artist.trim(), src: src.trim() });
               alert("Мелодия успешно добавлена!");
           } else {
               alert("Некорректный формат данных. Убедитесь, что вы ввели данные в формате 'название;артист;ссылка'.");
           }
       }
   }

   // Обработчики кнопок инструкции
   const nextTrackBtn = document.getElementById("next-track-btn");
   const randomTrackBtn = document.getElementById("random-track-btn");
   const defaultSetBtn = document.getElementById("default-set-btn");
   const addTrackBtn = document.getElementById("add-track-btn");

   nextTrackBtn.addEventListener("click", () => changeTrack(1));
   randomTrackBtn.addEventListener("click", playRandomTrack);
   defaultSetBtn.addEventListener("click", setDefault);
   addTrackBtn.addEventListener("click", addTrack);

   // Обработка клавиш
   document.addEventListener("keydown", (event) => {
       switch (event.key.toUpperCase()) {
           case "N": // Следующий трек
               changeTrack(1);
               break;
           case "R": // Случайный трек
               playRandomTrack();
               break;
           case "S": // Стандартный набор
               setDefault();
               break;
           case "E": // Добавить трек
               addTrack();
               break;
       }
   });

   // Инициализация
   loadTrack(currentTrackIndex);
   // showInstructions(); // Показываем инструкции

   // Обработчик клика по знаку вопроса для отображения/скрытия инструкции
   document.getElementById("question-mark").addEventListener("click", () => {
       const instructionDiv = document.getElementById("instruction");
       instructionDiv.style.display = instructionDiv.style.display === "none" ? "block" : "none";
   });
});

