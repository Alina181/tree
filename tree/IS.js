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
        const cursorFollower = document.getElementById('cursor-follower');  
        cursorFollower.style.left = e.clientX + "px";  
        cursorFollower.style.top = e.clientY + "px";  
    });  

    moveDots();  

    // Music Player Logic 
    const musicPlayer = document.getElementById('music-player-audio'); 
    const playBtn = document.getElementById('play-pause');  
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
    }  

    function playMusic() {  
        if (isPlaying) {  
            musicPlayer.pause();  
            isPlaying = false;  
            playBtn.textContent = '▶';  
        } else {  
            musicPlayer.play();  
            isPlaying = true;  
            playBtn.textContent = '▐▐';  
        }  
    }  

    playBtn.addEventListener('click', playMusic); 
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
        const progressPercent = (musicPlayer.currentTime / musicPlayer.duration) * 100;  
        musicSlider.value = progressPercent;  
    });
    
    musicSlider.addEventListener('input', () => { 
        const seekTime = (musicSlider.value / 100) * musicPlayer.duration;  
        musicPlayer.currentTime = seekTime;  
    }); 
});
