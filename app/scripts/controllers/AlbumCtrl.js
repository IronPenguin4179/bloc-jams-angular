(function() {
    function AlbumCtrl() {
        this.albumSongs = [];
        this.albumData = [angular.copy(albumPicasso)];
        for (var i=0; i < 5; i++) {
            this.albumSongs.push(albumPicasso.songs[i])
        }
    }
 
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();