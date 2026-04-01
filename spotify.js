// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    var myAudio = document.getElementById('myAudio');
    var playPauseBtn = document.getElementById('playPauseBtn');
    var progressCurrent = document.getElementById('progressCurrent');
    var progressTrack = document.getElementById('progressTrack');
    var currentTimeEl = document.getElementById('currentTime');
    var totalTimeEl = document.getElementById('totalTime');
    var volumeCurrent = document.getElementById('volumeCurrent');
    var volumeTrack = document.getElementById('volumeTrack');
    
    var isPlaying = false;
    var currentVolume = 0.7;
    
    // Set volume
    if (myAudio) {
        myAudio.volume = currentVolume;
    }
    
    // PLAY/PAUSE
    function togglePlay() {
        if (!myAudio || !playPauseBtn) {
            console.log('Elements not found');
            return;
        }
        
        if (isPlaying) {
            myAudio.pause();
            playPauseBtn.innerHTML = '▶';
            isPlaying = false;
        } else {
            myAudio.play().then(function() {
                playPauseBtn.innerHTML = '⏸';
                isPlaying = true;
            }).catch(function(error) {
                console.log('Error:', error);
                alert('MP3 file nahi mili! Naam check karo.');
            });
        }
    }
    
    // PLAY SONG
    function playThisSong(index) {
        var allSongs = document.querySelectorAll('.song-row');
        for (var i = 0; i < allSongs.length; i++) {
            allSongs[i].classList.remove('active');
        }
        allSongs[index].classList.add('active');
        
        if (myAudio) {
            myAudio.play();
            playPauseBtn.innerHTML = '⏸';
            isPlaying = true;
        }
    }
    
    // UPDATE PROGRESS
    if (myAudio) {
        myAudio.addEventListener('timeupdate', function() {
            if (myAudio.duration && progressCurrent && currentTimeEl) {
                var percent = (myAudio.currentTime / myAudio.duration) * 100;
                progressCurrent.style.width = percent + '%';
                
                var mins = Math.floor(myAudio.currentTime / 60);
                var secs = Math.floor(myAudio.currentTime % 60);
                if (secs < 10) {
                    secs = '0' + secs;
                }
                currentTimeEl.innerHTML = mins + ':' + secs;
                
                if (totalTimeEl) {
                    var totalMins = Math.floor(myAudio.duration / 60);
                    var totalSecs = Math.floor(myAudio.duration % 60);
                    if (totalSecs < 10) {
                        totalSecs = '0' + totalSecs;
                    }
                    totalTimeEl.innerHTML = totalMins + ':' + totalSecs;
                }
            }
        });
    }
    
    // JUMP TO POSITION
    function jumpTo(event) {
        if (!progressTrack || !myAudio || !myAudio.duration) return;
        
        var rect = progressTrack.getBoundingClientRect();
        var clickX = event.clientX - rect.left;
        var width = rect.width;
        var newTime = (clickX / width) * myAudio.duration;
        myAudio.currentTime = newTime;
    }
    
    // CHANGE VOLUME
    function changeVolume(event) {
        if (!volumeTrack || !myAudio) return;
        
        var rect = volumeTrack.getBoundingClientRect();
        var clickX = event.clientX - rect.left;
        var width = rect.width;
        currentVolume = clickX / width;
        
        if (currentVolume < 0) currentVolume = 0;
        if (currentVolume > 1) currentVolume = 1;
        
        myAudio.volume = currentVolume;
        
        if (volumeCurrent) {
            volumeCurrent.style.width = (currentVolume * 100) + '%';
        }
        
        var volumeIcon = document.querySelector('.volume-icon');
        if (volumeIcon) {
            if (currentVolume === 0) {
                volumeIcon.innerHTML = '🔇';
            } else if (currentVolume < 0.5) {
                volumeIcon.innerHTML = '🔉';
            } else {
                volumeIcon.innerHTML = '🔊';
            }
        }
    }
    
    // PREVIOUS
    function goPrevious() {
        if (myAudio) {
            myAudio.currentTime = 0;
            myAudio.play();
            playPauseBtn.innerHTML = '⏸';
            isPlaying = true;
        }
    }
    
    // NEXT
    function goNext() {
        if (myAudio) {
            myAudio.currentTime = 0;
            myAudio.play();
            playPauseBtn.innerHTML = '⏸';
            isPlaying = true;
        }
    }
    
    // SHUFFLE
    function doShuffle() {
        alert('Shuffle button clicked!');
    }
    
    // REPEAT
    function doRepeat() {
        if (myAudio) {
            myAudio.currentTime = 0;
            myAudio.play();
            playPauseBtn.innerHTML = '⏸';
            isPlaying = true;
        }
    }
    
    // SONG ENDED
    if (myAudio) {
        myAudio.addEventListener('ended', function() {
            playPauseBtn.innerHTML = '▶';
            isPlaying = false;
        });
        
        // CHECK IF LOADED
        myAudio.addEventListener('loadedmetadata', function() {
            console.log('✅ Audio loaded! Duration:', myAudio.duration);
        });
        
        // CHECK ERRORS
        myAudio.addEventListener('error', function(e) {
            console.log('❌ Audio error:', e);
        });
    }
    
    // ADD EVENT LISTENERS
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlay);
    }
    
    if (progressTrack) {
        progressTrack.addEventListener('click', jumpTo);
    }
    
    if (volumeTrack) {
        volumeTrack.addEventListener('click', changeVolume);
    }
    
    console.log('🎵 Music player ready!');
});