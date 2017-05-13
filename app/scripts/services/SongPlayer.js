(function() {
    function SongPlayer() {

        /**
         * @desc The song player object to be modified and returned
         * @type {Object}
         */
        var SongPlayer = {};

        /**
         * @desc Contains current song and all of its attributes
         * @type {Object}
         */
        var currentSong = null;

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
                currentBuzzObject.stop();
                currentSong.playing=null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        }

        /** 
         * @function playSong
         * @desc Plays current song and makes currentSong playing true
         */
        var playSong = function() {
            currentBuzzObject.play();
            currentSong.playing=true;
        }

        /**
         * @function Songplayer.play
         * @desc If song and currentSong are the same, it'll pause currentSong. 
         *       If song and currentSong are different, it'll play new song.
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong();
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                };
            };
        };

        /**
         * @function Songplayer.pause
         * @desc Pauses currently playing song and sets song playing as false
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();