
const albumsInforSearch = $('.content__infor-albums');
const tracksInforSearch = $('.tracks-search');
const allInforSearch = $('.content__infor-all');

// const trackInforSearch = $('.')
const SearchMusic = {
    tracksInfor: [],
    allInfor: [],
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
            const htmls = _this.albums.map((album, i) => {
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
            albumsInforSearch.innerHTML = htmls.join("");
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
                                            <div class="order_number">${index+1}</div>
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
        //     const htmlsAll = _this.allInfor.map((item, index) => {
        //    return  `
        //     <div class="all-wrap-search">
        //     <!-- header -->
        //     <div class="header__infor-allsearch">
        //         <div class="result-single">
        //             <h2>Kết quả hàng đầu</h2>
        //             <div class="single_wrap-search head_wrap">
        //                 <div class="single-wrap">
        //                     <div class="img_single-search">
        //                         <img src="https://toquoc.mediacdn.vn/280518851207290880/2022/9/15/laz1172-166324522974472590661.jpg"
        //                             alt="">
        //                     </div>
        //                     <p class="single-search">HIEUTHUHAI</p>
        //                     <p class="artist-search">Nghệ sĩ</p>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="result-tracks">
        //             <h2>Bài hát</h2>
        //             <div class="sing_wrap-search head_wrap">
        //                 <div class="sing_wrap">
        //                     <div class="list__title_sing">
        //                         <div class="img_title_sing">
        //                             <img src="https://toquoc.mediacdn.vn/280518851207290880/2022/9/15/laz1172-166324522974472590661.jpg"
        //                                 alt="">
        //                         </div>
        //                         <div class="list__sing-search">
        //                             <p class="name_sing">Không thể say</p>
        //                             <p class="name_single">HIEUTHUHAI</p>
        //                         </div>
        //                     </div>
        //                     <div class="list_clock">
        //                         <i class="fa-regular fa-heart"></i>
        //                         <div class="time-clock">2 phút</div>
        //                         <i class="fa-solid fa-ellipsis"></i>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div class="relate__single-search">
        //         <h2>Có sự xuất hiện của HIEUTHUHAI</h2>
        //         <div class="box_relate-wrap">
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg"
        //                     alt="">
        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg"
        //                     alt="">

        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg"
        //                     alt="">

        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg"
        //                     alt="">

        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg"
        //                     alt="">

        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg"
        //                     alt="">

        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg"
        //                     alt="">

        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg"
        //                     alt="">

        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg"
        //                     alt="">

        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg"
        //                     alt="">

        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //         </div>

        //     </div>
        //     <div class="result-artist">
        //         <h2>Nghệ Sĩ</h2>
        //         <div class="artist_box-wrap">
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <p class="title_singgle">HIEUTHUHAI</p>
        //             </div>
                    
        //         </div>
        //     </div>
        //     <div class="result-album">
        //         <h2>Album</h2>
        //         <div class="album_box-wrap">
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <div class="descr">
        //                     <p class="title_singgle">Ai cũng phải bắ đầu từ đâu đó</p>
        //                     <p class="desc_Singgle">2023 • HIEUTHUHAI</p>
        //                 </div>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <div class="descr">
        //                     <p class="title_singgle">Ai cũng phải bắ đầu từ đâu đó</p>
        //                     <p class="desc_Singgle">2023 • HIEUTHUHAI</p>
        //                 </div>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <div class="descr">
        //                     <p class="title_singgle">Ai cũng phải bắ đầu từ đâu đó</p>
        //                     <p class="desc_Singgle">2023 • HIEUTHUHAI</p>
        //                 </div>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <div class="descr">
        //                     <p class="title_singgle">Ai cũng phải bắ đầu từ đâu đó</p>
        //                     <p class="desc_Singgle">2023 • HIEUTHUHAI</p>
        //                 </div>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <div class="descr">
        //                     <p class="title_singgle">Ai cũng phải bắ đầu từ đâu đó</p>
        //                     <p class="desc_Singgle">2023 • HIEUTHUHAI</p>
        //                 </div>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <div class="descr">
        //                     <p class="title_singgle">Ai cũng phải bắ đầu từ đâu đó</p>
        //                     <p class="desc_Singgle">2023 • HIEUTHUHAI</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div class="playlists-search">
        //         <h2>Playlist</h2>
        //         <div class="playlist_box-wrap">
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <div class="descr">
        //                     <p class="title_singgle">HIEUTHUHAI</p>
        //                 </div>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <div class="descr">
        //                     <p class="title_singgle">HIEUTHUHAI</p>
        //                 </div>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <div class="descr">
        //                     <p class="title_singgle">HIEUTHUHAI</p>
        //                 </div>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <div class="descr">
        //                     <p class="title_singgle">HIEUTHUHAI</p>
        //                 </div>
        //             </div>
        //             <div class="card_box-sing playlist__search">
        //                 <img class="img_singgle" src="https://kenh14cdn.com/thumb_w/620/2020/8/3/hieuthuhai900899132295728048946645036623459053383323n-1596459565405673824797.jpg" alt="">
        //                 <div class="descr">
        //                     <p class="title_singgle">HIEUTHUHAI</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        //     `
        //     })
        //     allInforSearch.innerHTML = htmlsAll.join("");
        }
    },

    // start: function() {
    //     this.handleSearch();
    // }
}

// SearchMusic.start();

export default SearchMusic;