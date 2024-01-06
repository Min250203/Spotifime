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
const allTracks = $('.active-show');
const iconHeadLeft = $('.left');
const mainPage = $('.home');
// const mainInforList = $('.children__content');
const mainInforTracks = $('.all__tracks-main');
const albumSearch = $('.album_search');
const playlistSearch = $('.playlist_search');
const singSearch = $('.sing_search');
const allSearch = $('.all_search');
const tracksInforSearch = $('.content__infor-tracks');
const albumsInforSearch = $('.content__infor-albums');
const albumRelateWrap = $('.album_relate-wrap');
const albumSearchWrap = $('.album_search-wrap')
const allInforSearch = $('.content__infor-all');
const albumRelateSearch = $('.relate_albums-search');

const HomePageMusic = {
    contentSearch: '',
    accessToken: "",
    artistID: '',
    albums: [],
    playlistMusicForU: [],
    playlistMusicMood: [],
    playlistMusicHealth: [],
    playlistMusicAcoustic: [],
    currentIndex: 0,
    type: '',
    typePlaylists: '',
    categoriesIDMusicForU: "",
    categoriesIDMood: "",
    categoriesIDHealth: "",
    categoriesIDAcoustic: "",
    categoriesParameters: {},
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
        _this.categoriesParameters = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.accessToken
            }
        }
        // data categories
        await fetch('https://api.spotify.com/v1/browse/categories?country=VN&locale=VN&limit=50', _this.categoriesParameters)
            .then(response => response.json())
            .then(data => {
                _this.categoriesIDMusicForU = data.categories.items[3].id;
                _this.categoriesIDMood = data.categories.items[4].id;
                _this.categoriesIDHealth = data.categories.items[8].id;
                _this.categoriesIDAcoustic = data.categories.items[45].id;
            })
            .catch(error => console.error("e", error))

        // data playlist MusicForU (Pop)
        await fetch('https://api.spotify.com/v1/browse/categories/' + _this.categoriesIDMusicForU + '/playlists' + '?limit=6', _this.categoriesParameters)
            .then(response => response.json())
            .then(data => {
                _this.playlistMusicForU = data.playlists.items;
            })
            .catch(error => console.error("Error", error))
        const listMusicForYou = _this.playlistMusicForU.map((item, index) => {
            return ` 
                <div class="card_box-sing playlist__render" data-Index=${index}>
                <img class="img_singgle"
                    src="${item.images[0].url}"
                    alt="">
                <p class="title_singgle">${item.name}</p>
            </div>
                `
        })
        musicFor.innerHTML = listMusicForYou.join("");

        // data playlist Tâm trạng (Mood)
        await fetch('https://api.spotify.com/v1/browse/categories/' + _this.categoriesIDMood + '/playlists' + '?limit=6', _this.categoriesParameters)
            .then(response => response.json())
            .then(data => {
                _this.playlistMusicMood = data.playlists.items;
            })
            .catch(error => console.error("Error", error))
        const listMusicMood = _this.playlistMusicMood.map((item, index) => {
            return `
                <div class="card_box-sing playlist__render" data-Index=${index}>
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
        await fetch('https://api.spotify.com/v1/browse/categories/' + _this.categoriesIDHealth + '/playlists' + '?limit=6', _this.categoriesParameters)
            .then(response => response.json())
            .then(data => {
                playlistIDHealth = data.playlists.items[0].id;
                _this.playlistMusicHealth = data.playlists.items;
            })
            .catch(error => console.error("error", error))
        const listMusicHealth = _this.playlistMusicHealth.map((item, index) => {
            return `
            <div class="card_box-sing playlist__render" data-Index=${index}>
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
        await fetch('https://api.spotify.com/v1/browse/categories/' + _this.categoriesIDAcoustic + '/playlists' + '?limit=6', _this.categoriesParameters)
            .then(response => response.json())
            .then(data => {
                playlistIDAcoustic = data.playlists.items[0].id;
                _this.playlistMusicAcoustic = data.playlists.items;
            })
            .catch(error => console.error("error", error))
        const listMusicAcoustic = _this.playlistMusicAcoustic.map((item, index) => {
            return `
            <div class="card_box-sing playlist__render" data-Index=${index}>
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
            mainInforTracks.style.display = "none";
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
            $('.content_search').style.display = "none";
            mainInforTracks.style.display = "none";

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
            // mainInforList.style.display = "block";
            mainInforTracks.style.display = "none";
        }

        // when enter search
        searchInput.onkeypress = function (e) {
            if (e.key === "Enter") {
                // icon left
                iconHeadLeft.onclick = function () {
                    $('.search').style.color = "#b3b3b3";
                    $('.home').style.color = "#fff";
                    iconHeadLeft.style.color = "#9c9c9c";
                    $('.nav__search').style.display = "none";
                    mainContent.style.display = "block";
                    $('.content_search').style.display = "none";
                    mainInforTracks.style.display = "none";

                }

                $('.head__search-title').style.display = "none";
                $('.categories_search').style.display = "flex";
                // render all when enter search
                playlistSearch.classList.remove("active");
                albumSearch.classList.remove("active");
                singSearch.classList.remove("active");
                allSearch.classList.add("active");
                tracksInforSearch.style.display = "none";
                // albumsInforSearch.style.display = "none";
                // albumsInforSearch.style.display = "none";
                // albumRelateWrap.style.display = "grid";
                albumSearchWrap.style.display = "none";
                allInforSearch.style.display = "block";
                let valueInput = e.target.value;
                let accessToken = _this.accessToken;
                let type = 'all';
                SearchMusic.start({ valueInput, accessToken, type })

                // when click allsearch
                allSearch.onclick = function () {
                    _this.type = "all";
                    playlistSearch.classList.remove("active");
                    albumSearch.classList.remove("active");
                    singSearch.classList.remove("active");
                    allSearch.classList.add("active");
                    tracksInforSearch.style.display = "none";
                    albumSearchWrap.style.display = "none";
                    albumRelateWrap.style.display = "grid";

                    // albumsInforSearch.style.display = "none";
                    allInforSearch.style.display = "block";
                    let valueInput = e.target.value;
                    let accessToken = _this.accessToken;
                    let type = 'all';
                    SearchMusic.start({ valueInput, accessToken, type })

                    // icon left
                    iconHeadLeft.onclick = function () {
                        $('.search').style.color = "#b3b3b3";
                        $('.home').style.color = "#fff";
                        iconHeadLeft.style.color = "#9c9c9c";
                        $('.nav__search').style.display = "none";
                        mainContent.style.display = "block";
                        $('.content_search').style.display = "none";
                        mainInforTracks.style.display = "none";

                    }

                }
                // SearchMusic.start( ='all')
                albumSearch.onclick = function () {
                    _this.type = 'album';
                    albumSearch.classList.add("active");
                    singSearch.classList.remove("active");
                    playlistSearch.classList.remove("active");
                    tracksInforSearch.style.display = "none";
                    // albumsInforSearch.style.display = "grid";
                    albumSearchWrap.style.display = "grid";
                    allSearch.classList.remove("active");
                    allInforSearch.style.display = "none";
                    let valueInput = e.target.value;
                    let accessToken = _this.accessToken;
                    let type = 'album';
                    SearchMusic.start({ valueInput, accessToken, type })

                    // icon left
                    iconHeadLeft.onclick = function () {
                        $('.search').style.color = "#b3b3b3";
                        $('.home').style.color = "#fff";
                        iconHeadLeft.style.color = "#9c9c9c";
                        $('.nav__search').style.display = "none";
                        mainContent.style.display = "block";
                        $('.content_search').style.display = "none";
                        mainInforTracks.style.display = "none";

                    }
                }
                playlistSearch.onclick = function () {
                    albumSearch.classList.remove("active");
                    singSearch.classList.remove("active");
                    allSearch.classList.remove("active");
                    playlistSearch.classList.add("active");
                    tracksInforSearch.style.display = "none";
                    albumsInforSearch.style.display = "none";
                    albumSearchWrap.style.display = "none";
                    albumRelateWrap.style.display = "none";
                    allInforSearch.style.display = "none";
                    let valueInput = e.target.value;
                    let accessToken = _this.accessToken;
                    let type = 'playlist';
                    SearchMusic.start({ valueInput, accessToken, type })

                    // icon left
                    iconHeadLeft.onclick = function () {
                        $('.search').style.color = "#b3b3b3";
                        $('.home').style.color = "#fff";
                        iconHeadLeft.style.color = "#9c9c9c";
                        $('.nav__search').style.display = "none";
                        mainContent.style.display = "block";
                        $('.content_search').style.display = "none";
                        mainInforTracks.style.display = "none";

                    }
                }
                singSearch.onclick = function () {
                    playlistSearch.classList.remove("active");
                    albumSearch.classList.remove("active");
                    singSearch.classList.add("active");
                    tracksInforSearch.style.display = "block";
                    allSearch.classList.remove("active");
                    albumsInforSearch.style.display = "none";
                    albumSearchWrap.style.display = "none";
                    // albumRelateWrap.style.display = "none";
                    allInforSearch.style.display = "none";
                    let valueInput = e.target.value;
                    let accessToken = _this.accessToken;
                    let type = 'sing';
                    SearchMusic.start({ valueInput, accessToken, type })

                    // icon left
                    iconHeadLeft.onclick = function () {
                        $('.search').style.color = "#b3b3b3";
                        $('.home').style.color = "#fff";
                        iconHeadLeft.style.color = "#9c9c9c";
                        $('.nav__search').style.display = "none";
                        mainContent.style.display = "block";
                        $('.content_search').style.display = "none";
                        mainInforTracks.style.display = "none";

                    }
                }
            }
        }

        // when field text
        searchInput.oninput = function (e) {
            // icon left
            iconHeadLeft.onclick = function () {
                $('.search').style.color = "#b3b3b3";
                $('.home').style.color = "#fff";
                iconHeadLeft.style.color = "#9c9c9c";
                $('.nav__search').style.display = "none";
                mainContent.style.display = "block";
                $('.content_search').style.display = "none";
                mainInforTracks.style.display = "none";
            }

            $('.head__search-title').style.display = "none";
            $('.categories_search').style.display = "flex";
            // render all when enter search
            playlistSearch.classList.remove("active");
            albumSearch.classList.remove("active");
            singSearch.classList.remove("active");
            allSearch.classList.add("active");
            tracksInforSearch.style.display = "none";
            // albumsInforSearch.style.display = "none";
            // albumsInforSearch.style.display = "none";
            // albumRelateWrap.style.display = "grid";
            albumSearchWrap.style.display = "none";
            allInforSearch.style.display = "block";
            let valueInput = e.target.value;
            let accessToken = _this.accessToken;
            let type = 'all';
            SearchMusic.start({ valueInput, accessToken, type })

            // when click allsearch
            allSearch.onclick = function () {
                _this.type = "all";
                playlistSearch.classList.remove("active");
                albumSearch.classList.remove("active");
                singSearch.classList.remove("active");
                allSearch.classList.add("active");
                tracksInforSearch.style.display = "none";
                albumSearchWrap.style.display = "none";
                albumRelateWrap.style.display = "grid";

                // albumsInforSearch.style.display = "none";
                allInforSearch.style.display = "block";
                let valueInput = e.target.value;
                let accessToken = _this.accessToken;
                let type = 'all';
                SearchMusic.start({ valueInput, accessToken, type })

                // icon left
                iconHeadLeft.onclick = function () {
                    $('.search').style.color = "#b3b3b3";
                    $('.home').style.color = "#fff";
                    iconHeadLeft.style.color = "#9c9c9c";
                    $('.nav__search').style.display = "none";
                    mainContent.style.display = "block";
                    $('.content_search').style.display = "none";
                    mainInforTracks.style.display = "none";

                }

            }
            // SearchMusic.start( ='all')
            albumSearch.onclick = function () {
                _this.type = 'album';
                albumSearch.classList.add("active");
                singSearch.classList.remove("active");
                playlistSearch.classList.remove("active");
                tracksInforSearch.style.display = "none";
                // albumsInforSearch.style.display = "grid";
                albumSearchWrap.style.display = "grid";
                allSearch.classList.remove("active");
                allInforSearch.style.display = "none";
                let valueInput = e.target.value;
                let accessToken = _this.accessToken;
                let type = 'album';
                SearchMusic.start({ valueInput, accessToken, type })

                // icon left
                iconHeadLeft.onclick = function () {
                    $('.search').style.color = "#b3b3b3";
                    $('.home').style.color = "#fff";
                    iconHeadLeft.style.color = "#9c9c9c";
                    $('.nav__search').style.display = "none";
                    mainContent.style.display = "block";
                    $('.content_search').style.display = "none";
                    mainInforTracks.style.display = "none";

                }
            }
            playlistSearch.onclick = function () {
                albumSearch.classList.remove("active");
                singSearch.classList.remove("active");
                allSearch.classList.remove("active");
                playlistSearch.classList.add("active");
                tracksInforSearch.style.display = "none";
                albumsInforSearch.style.display = "none";
                albumSearchWrap.style.display = "none";
                albumRelateWrap.style.display = "none";
                allInforSearch.style.display = "none";
                let valueInput = e.target.value;
                let accessToken = _this.accessToken;
                let type = 'playlist';
                SearchMusic.start({ valueInput, accessToken, type })

                // icon left
                iconHeadLeft.onclick = function () {
                    $('.search').style.color = "#b3b3b3";
                    $('.home').style.color = "#fff";
                    iconHeadLeft.style.color = "#9c9c9c";
                    $('.nav__search').style.display = "none";
                    mainContent.style.display = "block";
                    $('.content_search').style.display = "none";
                    mainInforTracks.style.display = "none";

                }
            }
            singSearch.onclick = function () {
                playlistSearch.classList.remove("active");
                albumSearch.classList.remove("active");
                singSearch.classList.add("active");
                tracksInforSearch.style.display = "block";
                allSearch.classList.remove("active");
                albumsInforSearch.style.display = "none";
                albumSearchWrap.style.display = "none";
                // albumRelateWrap.style.display = "none";
                allInforSearch.style.display = "none";
                let valueInput = e.target.value;
                let accessToken = _this.accessToken;
                let type = 'sing';
                SearchMusic.start({ valueInput, accessToken, type })

                // icon left
                iconHeadLeft.onclick = function () {
                    $('.search').style.color = "#b3b3b3";
                    $('.home').style.color = "#fff";
                    iconHeadLeft.style.color = "#9c9c9c";
                    $('.nav__search').style.display = "none";
                    mainContent.style.display = "block";
                    $('.content_search').style.display = "none";
                    mainInforTracks.style.display = "none";

                }
            }


        }
    },
    handleEventTracks: function () {
        let _this = this;
        // click playlist to return tracks music for u
        musicFor.onclick = function (e) {
            const playlistIndex = e.target.closest('.playlist__render');
            if (playlistIndex) {
                let titlePlaylist = playlistIndex.querySelector('.title_singgle').innerText;
                _this.currentIndex = Number(playlistIndex.getAttribute('data-Index'));
                let playlistMusicForU = _this.playlistMusicForU;
                let categoriesIDMusicForU = _this.categoriesIDMusicForU;
                let categoriesParameters = _this.categoriesParameters;
                TrackPlaylist.handleRenderTracksForU({ playlistMusicForU, categoriesIDMusicForU, categoriesParameters, titlePlaylist });
                mainContent.style.display = "none";
                allTracks.style.display = "block";
                albumRelateSearch.style.display = "none";
                mainInforTracks.style.display = "block";
                $('.list_Tracks-single').style.display = "none";
            }
        };

        // click playlist to return tracks music mood
        musicMood.onclick = function (e) {
            const playlistIndex = e.target.closest('.playlist__render');
            if (playlistIndex) {
                let titlePlaylist = playlistIndex.querySelector('.title_singgle').innerText;
                _this.currentIndex = Number(playlistIndex.getAttribute('data-Index'));
                let playlistMusicMood = _this.playlistMusicMood;
                let categoriesIDMood = _this.categoriesIDMood;
                let categoriesParameters = _this.categoriesParameters;
                TrackPlaylist.handleRenderTracksMood({ playlistMusicMood, categoriesIDMood, categoriesParameters, titlePlaylist });
                mainContent.style.display = "none";
                allTracks.style.display = "block";
                albumRelateSearch.style.display = "none";
                mainInforTracks.style.display = "block";
                $('.list_Tracks-single').style.display = "none";
            }
        };

        // click playlist to return tracks music health
        musicHealth.onclick = function (e) {
            const playlistIndex = e.target.closest('.playlist__render');
            if (playlistIndex) {
                let titlePlaylist = playlistIndex.querySelector('.title_singgle').innerText;
                _this.currentIndex = Number(playlistIndex.getAttribute('data-Index'));
                let playlistMusicHealth = _this.playlistMusicHealth;
                let categoriesIDHealth = _this.categoriesIDHealth;
                let categoriesParameters = _this.categoriesParameters;
                TrackPlaylist.handleRenderTracksHealth({ playlistMusicHealth, categoriesIDHealth, categoriesParameters, titlePlaylist });
                mainContent.style.display = "none";
                allTracks.style.display = "block";
                albumRelateSearch.style.display = "none";
                mainInforTracks.style.display = "block";
                $('.list_Tracks-single').style.display = "none";
            }
        };

        // click playlist to return tracks music accoustic
        musicAcoustic.onclick = function (e) {
            const playlistIndex = e.target.closest('.playlist__render');
            if (playlistIndex) {
                let titlePlaylist = playlistIndex.querySelector('.title_singgle').innerText;
                _this.currentIndex = Number(playlistIndex.getAttribute('data-Index'));
                let playlistMusicAcoustic = _this.playlistMusicAcoustic;
                let categoriesIDAcoustic = _this.categoriesIDAcoustic;
                let categoriesParameters = _this.categoriesParameters;
                TrackPlaylist.handleRenderTracksAccoustic({ playlistMusicAcoustic, categoriesIDAcoustic, categoriesParameters, titlePlaylist });
                mainContent.style.display = "none";
                allTracks.style.display = "block";
                albumRelateSearch.style.display = "none";
                mainInforTracks.style.display = "block";
                $('.list_Tracks-single').style.display = "none";
            }
        };


    },
    start: function () {
        this.handleEventSearch();
        this.handleRenderMusic();
        this.handleEventTracks();
    }
}
HomePageMusic.start();
// sfhsgdfhgsdjhfgsdjhf