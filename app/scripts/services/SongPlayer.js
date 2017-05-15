(function() {
    function SongPlayer(Fixtures) {

        /**
         * @desc The song player object to be modified and returned
         * @type {Object}
         */
        var SongPlayer = {};

        var currentAlbum = Fixtures.getAlbum();

        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };        

        /**
         * @desc Contains current song and all of its attributes
         * @type {Object}
         */
        SongPlayer.currentSong = null;

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        }

        /** 
         * @function playSong
         * @desc Plays current song and makes currentSong playing true
         */
        var playSong = function() {
            currentBuzzObject.play();
            SongPlayer.currentSong.playing=true;
        }

        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing=null;
        }

        /**
         * @function Songplayer.play
         * @desc If song and currentSong are the same, it'll pause currentSong. 
         *       If song and currentSong are different, it'll play new song.
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong();
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong();
                };
            };
        };

        /**
         * @function Songplayer.pause
         * @desc Pauses currently playing song and sets song playing as false
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }

        };

         SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > currentAlbum.songs.length) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }

        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures',SongPlayer]);
})();