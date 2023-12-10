
import SearchMusic from "./searchMusic.js";
const searchInput = $('.nav__search-input');
const CLIENT_ID = "5445f83018404e0994fbce9fcfab2bf9";
const CLIENT_SECRET = "1451411bff95447e93212555e8752662";
const musicFor = $('.list__musicForU');
const musicMood = $('.list__musicMood');
const musicHealth = $('.list__musicHealth');
const musicAcoustic = $('.list__musicAcoustic');


const HomePageMusic = {
    contentSearch: '',
    accessToken: "",
    artistID: '',
    albums: [],
    playlistMusicForU: [],
    playlistMusicMoood: [],
    playlistMusicHealth: [],
    playlistAcoustic: [],
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
        console.log(this.accessToken)
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
                console.log(data)
                categoriesIDMusicForU = data.categories.items[3].id;
                categoriesIDMood = data.categories.items[4].id;
                categoriesIDHealth = data.categories.items[8].id;
                categoriesIDAcoustic = data.categories.items[45].id;
                // console.log(_this.playlistMusicForU)
            })
            .catch(error => console.error("e", error))

        // data playlist MusicForU (Pop)
        let playlistIDMusicForU;
        await fetch('https://api.spotify.com/v1/browse/categories/' + categoriesIDMusicForU + '/playlists' + '?limit=6', categoriesParameters)
            .then(response => response.json())
            .then(data => {
                console.log("data playlist musicForU", data)
                playlistIDMusicForU = data.playlists.items[0].id;
                _this.playlistMusicForU = data.playlists.items;
                console.log(_this.playlistMusicForU);
            })
            .catch(error => console.error("Error", error))
        const listMusicForYou = _this.playlistMusicForU.map((item) => {
            return ` 
                <div class="card_box-sing playlist__render">
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
        const listMusicMood = _this.playlistMusicMoood.map((item) => {
            return `
                <div class="card_box-sing playlist__render">
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
        const listMusicHealth = _this.playlistMusicHealth.map((item) => {
            return `
            <div class="card_box-sing playlist__render">
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
        const listMusicAcoustic = _this.playlistAcoustic.map((item) => {
            return `
            <div class="card_box-sing playlist__render">
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
        }

        // when enter search
        searchInput.onkeypress = function (e) {
            if (e.key === "Enter") {
                console.log("hello key code 13")
                // _this.handleSearch(e.target.value);
                SearchMusic.handleSearch( e.target.value, _this.accessToken)
            }
        }
    },
    start: function () {
        this.handleEventSearch();
        this.handleRenderMusic();
    }
}
HomePageMusic.start();