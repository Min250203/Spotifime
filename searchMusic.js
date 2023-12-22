
const albumsInforSearch = $('.content__infor-albums');
const tracksInforSearch = $('.tracks-search');
const allInforSearch = $('.content__infor-all');
const singleWrapSearch = $('.single_wrap-search');
const singWrapSearch = $('.sing_wrap-search');
const artistRelateWrap = $('.artist_box-wrap');
const albumsWrap = $('.album_box-wrap');

// const trackInforSearch = $('.')
const SearchMusic = {
    tracksInfor: [],
    allInfor: [],
    tracksInforAllSearch: [],
    artistRelate: [],
    handleSearch: async function (valueInput, accessToken, type) {
        let _this = this;
        //    get Artist ID
        var artistParameters = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        };

        await fetch('https://api.spotify.com/v1/search?q=' + valueInput + '&type=artist', artistParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                _this.artistID = data.artists.items[0].id;
                return _this.artistID;
            })
            .catch(error => console.error('Error:', error));

        // get with Artist IA all albums from that artist
        if (type === "album") {
            await fetch('https://api.spotify.com/v1/artists/' + _this.artistID + '/albums' + '?market=VN&limit=50', artistParameters)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    return _this.albums = data.items;
                })
                .catch(error => console.error('Error:', error))
            const htmlsAlbumSearch= _this.albums.map((album, i) => {
                let yearAlbum = album.release_date.split("-", 1);
                return `
                <div class="card_box-sing playlist__search">
                    <img class="img_singgle"
                        src="${album.images[0].url}"
                        alt="">
                        <div class="descr">
                        <p class="title_singgle">${album.name}</p>
                        <p class="desc_Singgle">${yearAlbum + " • " + album.artists[0].name}</p>
                        </div>
                </div>
                    `
            })
            albumsInforSearch.innerHTML = htmlsAlbumSearch.join("");
        } else if (type === "playlist") {
            console.log("playlistttttttttttt")

        } else if (type === "sing") {
            await fetch('https://api.spotify.com/v1/artists/' + _this.artistID + '/top-tracks' + '?market=VN&limit=50', artistParameters)
                .then(response => response.json())
                .then(data => {
                    console.log(data.tracks)
                    return _this.tracksInfor = data.tracks;

                })
                .catch(error => console.error('Error:', error))
            const htmlsTracks = _this.tracksInfor.map((item, index) => {
                return `
                                <div class="content__sing-wrap-search">
                                    <div class="descr_sing-single-search">
                                        <div class="list__title_sing">
                                            <div class="order_number">${index + 1}</div>
                                            <div class="img_title_sing">
                                                <img src="${item.album.images[0].url}"
                                                    alt="">
                                            </div>
                                            <div class="list__sing-singgle">
                                                <p class="name_sing">${item.name}</p>
                                                <p class="name_single">${item.artists[0].name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="list_album">
                                        <div class="name_album">${item.album.name}</div>

                                    </div>
                                    <div class="list_clock">
                                        <div class="time-clock">2 phút</div>
                                    </div>
                                </div>
                `
            })
            tracksInforSearch.innerHTML = htmlsTracks.join("");
        } else {
            // infor of sing and single
            await fetch('https://api.spotify.com/v1/artists/' + _this.artistID + '/top-tracks' + '?market=VN&limit=1', artistParameters)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    return _this.tracksInforAllSearch = data.tracks;
                })
                .catch(error => console.error(error))

            // inforSingle when search
            let itemSingle = _this.tracksInforAllSearch[0];
            const htmlsInforSinglelSearch =
                `
                <div class="single-wrap">
                    <div class="img_single-search">
                        <img src="${itemSingle.album.images[0].url}"
                        alt="">
                    </div>
                    <p class="single-search">${itemSingle.artists[0].name}</p>
                    <p class="artist-search">Nghệ sĩ</p>
                 </div>
                `
            singleWrapSearch.innerHTML = htmlsInforSinglelSearch;

            // top tracks when search single
            const htmlsTracksInforAllSearch = _this.tracksInforAllSearch.slice(5, 9).map((item) => {
                return `
                <div class="sing_wrap">
                    <div class="list__title_sing">
                        <div class="img_title_sing">
                            <img src="${item.album.images[0].url}" alt="">
                        </div>
                        <div class="list__sing-search">
                            <p class="name_sing">${item.name}</p>
                            <p class="name_single">${item.artists[0].name}</p>
                        </div>
                    </div>
                    <div class="list_clock">
                        <i class="fa-regular fa-heart"></i>
                        <div class="time-clock">2 phút</div>
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
                `
            })
            singWrapSearch.innerHTML = htmlsTracksInforAllSearch.join('');

            // infor artist relate
            await fetch('https://api.spotify.com/v1/artists/' + _this.artistID + '/related-artists' + '?market=VN', artistParameters)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    return _this.artistRelate = data.artists
                })
                .catch(error => console.error("error", error))

            const htmlArtistRelate = _this.artistRelate.slice(10, 15).map((item, index) => {
                return `
                <div class="card_box-sing playlist__search">
                    <img class="img_singgle" src="${item.images[0].url}" alt="">
                     <p class="title_singgle">${item.name}</p>
                </div>
                `
            })

            const htmlArtistSearch = `
            <div class="card_box-sing playlist__search">
            <img class="img_singgle" src="${itemSingle.album.images[0].url}" alt="">
                <p class="title_singgle">${itemSingle.artists[0].name}</p>
              </div>
            `
            artistRelateWrap.innerHTML = htmlArtistSearch + htmlArtistRelate.join("");

            // infor album when search
            await fetch('https://api.spotify.com/v1/artists/' + _this.artistID + '/albums' + '?market=VN&limit=6', artistParameters)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    return _this.albums = data.items;
                })
                .catch(error => console.error('Error:', error))
            const htmlsAlbumSearch= _this.albums.map((album, i) => {
                let yearAlbum = album.release_date.split("-", 1);
                return `
            <div class="card_box-sing playlist__search">
                <img class="img_singgle"
                    src="${album.images[0].url}"
                    alt="">
                    <div class="descr">
                    <p class="title_singgle">${album.name}</p>
                    <p class="desc_Singgle">${yearAlbum + " • " + album.artists[0].name}</p>
                    </div>
            </div>
                `
            })
            albumsWrap.innerHTML = htmlsAlbumSearch.join('');
        }
    },

    // start: function() {
    //     this.handleSearch();
    // }
}

// SearchMusic.start();

export default SearchMusic;