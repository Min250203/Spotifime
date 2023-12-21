import SearchMusic from "./searchMusic.js";
import TrackPlaylist from "./trackPlaylist.js";

const searchInput = $('.nav__search-input');
const CLIENT_ID = "5445f83018404e0994fbce9fcfab2bf9";
const CLIENT_SECRET = "1451411bff95447e93212555e8752662";
const musicFor = $('.list__musicForU');
const musicMood = $('.list__musicMood');
const musicHealth = $('.list__musicHealth');
const musicAcoustic = $('.list__musicAcoustic');
const musicTrack = $('.playlistTracks');
const mainContent = $('.desc__contentmain');
const iconHeadLeft = $('.left');
const mainPage = $('.home');
const mainInforList = $('.children__content');
const mainInforPlaylist = $('.children__content-playlist');
const albumSearch = $('.album_search');
const playlistSearch = $('.playlist_search');
const singSearch = $('.sing_search');
const allSearch = $('.all_search');
const tracksInforSearch = $('.content__infor-tracks');
const albumsInforSearch = $('.content__infor-albums');
const allInforSearch = $('.content__infor-all')





const HomePageMusic = {
    contentSearch: '',
    accessToken: "",
    artistID: '',
    albums: [],
    playlistMusicForU: [],
    playlistMusicMoood: [],
    playlistMusicHealth: [],
    playlistAcoustic: [],
    currentIndex: 0,
    type: '',
    handleRenderMusic: async function () {
        let _this = this;
        // Api this.accessToken
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        await fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => {
                _this.accessToken = data.access_token
                console.log(_this.accessToken)
            })
            .catch(error => console.error(error));
        // render type
        var categoriesParameters = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.accessToken
            }
        }
        // data categories
        let categoriesIDMusicForU;
        let categoriesIDMood;
        let categoriesIDHealth;
        let categoriesIDAcoustic;
        await fetch('https://api.spotify.com/v1/browse/categories?country=VN&locale=VN&limit=50', categoriesParameters)
            .then(response => response.json())
            .then(data => {
                categoriesIDMusicForU = data.categories.items[3].id;
                categoriesIDMood = data.categories.items[4].id;
                categoriesIDHealth = data.categories.items[8].id;
                categoriesIDAcoustic = data.categories.items[45].id;
            })
            .catch(error => console.error("e", error))

        // data playlist MusicForU (Pop)
        let playlistIDMusicForU;
        await fetch('https://api.spotify.com/v1/browse/categories/' + categoriesIDMusicForU + '/playlists' + '?limit=6', categoriesParameters)
            .then(response => response.json())
            .then(data => {
                playlistIDMusicForU = data.playlists.items[0].id;
                _this.playlistMusicForU = data.playlists.items;
            })
            .catch(error => console.error("Error", error))
        const listMusicForYou = _this.playlistMusicForU.map((item, index) => {
            return ` 
                <div class="card_box-sing ${index === this.currentIndex ? "active" : ""} playlist__render" data-Index=${index}>
                <img class="img_singgle"
                    src="${item.images[0].url}"
                    alt="">
                <p class="title_singgle">${item.name}</p>
            </div>
                `
        })
        musicFor.innerHTML = listMusicForYou.join("");

        // get tracks musicForU
        await fetch('https://api.spotify.com/v1/playlists/' + playlistIDMusicForU + '/tracks', categoriesParameters)
            .then(response => response.json())
            .then(data => { console.log("data track musicForU", data) })
            .catch(error => console.error("errr", error))


        // data playlist Tâm trạng (Mood)
        let playlistIDMood;
        await fetch('https://api.spotify.com/v1/browse/categories/' + categoriesIDMood + '/playlists' + '?limit=6', categoriesParameters)
            .then(response => response.json())
            .then(data => {
                playlistIDMood = data.playlists.items[0].id;
                _this.playlistMusicMoood = data.playlists.items;
            })
            .catch(error => console.error("Error", error))
        const listMusicMood = _this.playlistMusicMoood.map((item, index) => {
            return `
                <div class="card_box-sing ${index === this.currentIndex ? "active" : ""} playlist__render" data-Index=${index}>
                <img class="img_singgle"
                    src="${item.images[0].url}"
                    alt="">
                <p class="title_singgle">${item.name}</p>
            </div>
                `
        })
        musicMood.innerHTML = listMusicMood.join("");

        // data playlist sức khỏe(Heaalthy)
        let playlistIDHealth;
        await fetch('https://api.spotify.com/v1/browse/categories/' + categoriesIDHealth + '/playlists' + '?limit=6', categoriesParameters)
            .then(response => response.json())
            .then(data => {
                playlistIDHealth = data.playlists.items[0].id;
                _this.playlistMusicHealth = data.playlists.items;
            })
            .catch(error => console.error("error", error))
        const listMusicHealth = _this.playlistMusicHealth.map((item, index) => {
            return `
            <div class="card_box-sing ${index === this.currentIndex ? "active" : ""} playlist__render" data-Index=${index}>
            <img class="img_singgle"
            src="${item.images[0].url}"
            alt="">
            <p class="title_singgle">${item.name}</p>
            </div>
            `
        })
        musicHealth.innerHTML = listMusicHealth.join("");

        // data playlist truyền thống(Acoustic)
        let playlistIDAcoustic;
        await fetch('https://api.spotify.com/v1/browse/categories/' + categoriesIDAcoustic + '/playlists' + '?limit=6', categoriesParameters)
            .then(response => response.json())
            .then(data => {
                playlistIDAcoustic = data.playlists.items[0].id;
                _this.playlistAcoustic = data.playlists.items;
            })
            .catch(error => console.error("error", error))
        const listMusicAcoustic = _this.playlistAcoustic.map((item, index) => {
            return `
            <div class="card_box-sing ${index === this.currentIndex ? "active" : ""} playlist__render" data-Index=${index}>
            <img class="img_singgle"
            src="${item.images[0].url}"
            alt="">
            <p class="title_singgle">${item.name}</p>
            </div>
            `
        })
        musicAcoustic.innerHTML = listMusicAcoustic.join("");

        // 

    },
    handleEventSearch: function () {
        let _this = this;
        // translateSearch
        document.querySelector('.search').onclick = function () {
            $('.search').style.color = "#fff";
            iconHeadLeft.style.color = "#fff";
            mainPage.style.color = "#9c9c9c";
            $('.nav__search').style.display = "flex";
            mainContent.style.display = "none";
            $('.content_search').style.display = "block";
            tracksInforSearch.style.display = "none";
        }
        // return mainContent when search
        iconHeadLeft.onclick = function () {
            $('.search').style.color = "#b3b3b3";
            $('.home').style.color = "#fff";
            iconHeadLeft.style.color = "#9c9c9c";
            $('.nav__search').style.display = "none";
            mainContent.style.display = "block";
            $('.head_search').style.display = "none";
            $('.content_search').style.display = "none";
        }

        // when click homeMain
        mainPage.onclick = function () {
            $('.search').style.color = "#b3b3b3";
            $('.home').style.color = "#fff";
            iconHeadLeft.style.color = "#9c9c9c";
            $('.nav__search').style.display = "none";
            mainContent.style.display = "block";
            // $('.head_search').style.display = "none";
            $('.content_search').style.display = "none";
            mainInforList.style.display = "block";
            mainInforPlaylist.style.display = "none";
        }

        // when enter search
        searchInput.onkeypress = function (e) {
            if (e.key === "Enter") {
                $('.head__search-title').style.display = "none";
                $('.categories_search').style.display = "flex";
                // SearchMusic.handleSearch( e.target.value, _this.accessToken, _this.type='all')
                albumSearch.onclick = function () {
                    _this.type = 'album';
                    albumSearch.classList.add("active");
                    singSearch.classList.remove("active");
                    playlistSearch.classList.remove("active");
                    tracksInforSearch.style.display = "none";
                    albumsInforSearch.style.display = "grid";
                    allInforSearch.style.display = "none";
                    SearchMusic.handleSearch(e.target.value, _this.accessToken, _this.type = 'album')
                }
                playlistSearch.onclick = function () {
                    _this.type = 'playlist';
                    albumSearch.classList.remove("active");
                    singSearch.classList.remove("active");
                    playlistSearch.classList.add("active");
                    tracksInforSearch.style.display = "none";
                    albumsInforSearch.style.display = "none";
                    allInforSearch.style.display = "none";
                    SearchMusic.handleSearch(e.target.value, _this.accessToken, _this.type = 'playlist')
                }
                singSearch.onclick = function () {
                    _this.type = 'sing';
                    playlistSearch.classList.remove("active");
                    albumSearch.classList.remove("active");
                    singSearch.classList.add("active");
                    tracksInforSearch.style.display = "block";
                    albumsInforSearch.style.display = "none";
                    allInforSearch.style.display = "none";
                    SearchMusic.handleSearch(e.target.value, _this.accessToken, _this.type = 'sing')
                }
                allSearch.onclick = function () {
                    _this.type = "all";
                    playlistSearch.classList.remove("active");
                    albumSearch.classList.remove("active");
                    singSearch.classList.remove("active");
                    tracksInforSearch.style.display = "none";
                    albumsInforSearch.style.display = "none";
                    allInforSearch.style.display = "block";
                    SearchMusic.handleSearch(e.target.value, _this.accessToken, _this.type = "all")

                }

            }
        }
    },
    handleEvent: function () {
        let _this = this;
        musicFor.onclick = function (e) {
            const playlistIndex = e.target.closest('.card_box-sing');
            if (playlistIndex) {
                _this.currentIndex = Number(playlistIndex.getAttribute('data-Index'));
                // TrackPlaylist.handleLog();
                mainInforList.style.display = "none";
                mainInforPlaylist.style.display = "block";

            }
        }
    },
    start: function () {
        this.handleEventSearch();
        this.handleRenderMusic();
        this.handleEvent();
    }
}
HomePageMusic.start();