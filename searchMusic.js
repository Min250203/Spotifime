
const contentInforSearch = $('.content__infor');
const SearchMusic = {
    handleSearch: async function (valueInput,accessToken) {
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
                _this.artistID = data.artists.items[0].id;
                console.log(_this.artistID)
                return _this.artistID;
            })
            .catch(error => console.error('Error:', error));

        // get with Artist IA all albums from that artist
        await fetch('https://api.spotify.com/v1/artists/' + _this.artistID + '/albums' + '?include_groups=album&market=US&limit=50', artistParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return _this.albums = data.items;
            })
            .catch(error => console.error('Error:', error))
        console.log(_this.albums)
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
        contentInforSearch.innerHTML = htmls.join("");
        // display albums to the user
    },
    // start: function() {
    //     this.handleSearch();
    // }
}

// SearchMusic.start();

export default SearchMusic;