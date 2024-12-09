
// Создаем элемент для курсора снежинки
const snowflakeCursor = document.createElement('div');
snowflakeCursor.classList.add('snowflake-cursor');
document.body.appendChild(snowflakeCursor);

// Обработчик событий движения мыши
document.addEventListener('mousemove', (event) => {
    snowflakeCursor.style.left = `${event.pageX}px`; // Устанавливаем позицию по оси X
    snowflakeCursor.style.top = `${event.pageY}px`; // Устанавливаем позицию по оси Y
});
document.addEventListener('DOMContentLoaded', () => {  
    const numDots = 60;  
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
        dots.forEach((dot) => {  
            const currentX = dot.style.left ? parseFloat(dot.style.left) : 0;  
            const currentY = dot.style.top ? parseFloat(dot.style.top) : 0;  
            dot.style.left = nextX + "px";  
            dot.style.top = nextY + "px";  
            dot.style.opacity = 1;  
            nextX += (currentX - nextX) * 0.5;  
            nextY += (currentY - nextY) * 0.5;  
        });  
        requestAnimationFrame(moveDots);  
    }  

    document.addEventListener('mousemove', (e) => {  
        mouseX = e.clientX;  
        mouseY = e.clientY;  
    });  

    moveDots();  

    // Music Player Logic 
    const musicPlayer = document.getElementById('music-player-audio'); 
    const playBtn = document.getElementById('play-button');
    const pauseBtn = document.getElementById('pause-button'); // Добавлено
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
            musicSlider.max = musicPlayer.duration; // Установить максимальное значение ползунка
            updateDisplayTime(); // Вызов функции для обновления отображения времени
        };
    }

    function playMusic() {
        if (isPlaying) {
            musicPlayer.pause();
            isPlaying = false;
            playBtn.style.display = 'block'; // Показать кнопку Play
            pauseBtn.style.display = 'none'; // Скрыть кнопку Pause
        } else {
            musicPlayer.play();
            isPlaying = true;
            playBtn.style.display = 'none'; // Скрыть кнопку Play
            pauseBtn.style.display = 'block'; // Показать кнопку Pause
        }
    }
    function updateDisplayTime() {
        const currentTime = musicPlayer.currentTime;
        const duration = musicPlayer.duration;
        const formattedCurrentTime = formatTime(currentTime);
        const formattedDuration = formatTime(duration);
        document.getElementById('current-time').textContent = formattedCurrentTime;
        document.getElementById('total-time').textContent = formattedDuration;
    }

    playBtn.addEventListener('click', playMusic);
    pauseBtn.addEventListener('click', playMusic); // Добавлено
    loadTrack(currentTrackIndex);

    volumeSlider.addEventListener('input', () => { 
        const volume = volumeSlider.value / 100;  
        musicPlayer.volume = volume;  
        document.querySelector('.volume-label').textContent = `Громкость: ${volumeSlider.value}%`;  
    }); 

    musicPlayer.addEventListener('ended', () => { 
        currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length; 
        loadTrack(currentTrackIndex); 
        playMusic(); 
    }); 

    musicPlayer.addEventListener('timeupdate', () => {
        const currentTime = musicPlayer.currentTime;
        const duration = musicPlayer.duration;
        musicSlider.value = currentTime; // Устанавливаем значение ползунка времени
        musicSlider.max = duration; // обновляем максимум ползунка
        
        // Отображение времени (добавьте эти строки):
        const formattedCurrentTime = formatTime(currentTime);
        const formattedDuration = formatTime(duration);
        document.getElementById('current-time').textContent = formattedCurrentTime;
        document.getElementById('total-time').textContent = formattedDuration;
        });
        
        //Функция для форматирования времени
        function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }
        
        musicSlider.addEventListener('input', () => {
        musicPlayer.currentTime = musicSlider.value;
        });
    // Обработка нажатий клавиш
 document.addEventListener('keydown', (e) => { 
    switch (e.code) { 
        case 'KeyN': // следующая мелодия 
            currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length; 
            loadTrack(currentTrackIndex); 
            if (isPlaying) { 
                musicPlayer.play(); 
            } 
            break; 
        case 'KeyR': // случайная мелодия 
            currentTrackIndex = Math.floor(Math.random() * musicTracks.length); 
            loadTrack(currentTrackIndex); 
            if (isPlaying) { 
                musicPlayer.play(); 
            } 
            break; 
        case 'KeyE': // добавить мелодию 
            const newTrack = prompt("Введите название, артиста и URL новой мелодии в формате 'название;артист;ссылка':"); 
            if (newTrack) { 
                const [title, artist, src] = newTrack.split(';'); 
                if (title && artist && src) { 
                    musicTracks.push({ title, artist, src }); 
                    alert(`Добавлена мелодия: ${title} - ${artist}`); 
                } else { 
                    alert('Неправильный формат. Используйте: название;артист;ссылка'); 
                } 
            } 
            break; 
        case 'KeyS': // стандартный набор 
            musicTracks.length = 0;  // Очищаем текущий массив 
            musicTracks.push( 
                { title: 'Дискотека Авария', artist: 'Новогодняя', src: 'Music/A.mp3' },   
                { title: 'Руки Вверх', artist: 'С Новым Годом!', src: 'Music/P.mp3' },   
                { title: 'S.U.27', artist: 'С Новым Годом!', src: 'Music/S.mp3' } 
            ); 
            currentTrackIndex = 0;  // Сбрасываем индекс 
            loadTrack(currentTrackIndex);  // Загружаем первую мелодию 
            break; 
    } 
});
});
