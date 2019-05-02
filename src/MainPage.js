import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import $ from 'jquery';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './css/MainPage.css';


const giphyApiKey = 'MQtk7jpyfvaC6Ys0v6mpsUoQVIrIjfBC';
const requestUrl = '//api.giphy.com/v1/gifs/trending?';
const searchUrl = '//api.giphy.com/v1/gifs/search?';
const randomUrl = '//api.giphy.com/v1/gifs/random?';
const pageLimit = 25;
const rating = 'pg';
export default class ImageLibrary extends Component {

    constructor(props) {
        super(props);
         this.images =  this.getImagesFromGiphy();

        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    render() {

        const { photoIndex, isOpen } = this.state;
        return (
            <div className = "library-open-wrapper">
                <div className="Giphy-image-holder"> </div>

                <div className = "Open-library-button">
                    <button  id = "OpenLibrary" type="button" onClick={() =>
                    {
                        this.libraryImages = this.images;

                        this.setState({ isOpen: true });
                    }
                    }>
                        Open trending GIFS
                    </button>
                </div>

                <div className=" giphy-api-input">
                    <input id = "Giphy-search-field" type="text" placeholder="Search.."></input>
                </div>
                <div className="giphy-search-button-holder">
                    <button  id = "searchGiphy" type="button" onClick={() =>
                    {

                        let images = this.searchRequest();
                           let checkIfImagesExist = setInterval(() =>{
                               if (images.length !== 0) {
                                   this.libraryImages = images;
                                   this.setState({ isOpen: true });
                                   clearInterval(checkIfImagesExist);
                               }
                            },100);

                    }
                    }>
                        Search gifs!
                    </button>

                </div>

                {isOpen && (
                    <Lightbox
                        mainSrc={this.libraryImages[photoIndex]}
                        nextSrc={this.libraryImages[(photoIndex + 1) % this.libraryImages.length]}
                        prevSrc={this.libraryImages[(photoIndex + this.libraryImages.length - 1) % this.libraryImages.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + this.libraryImages.length - 1) % this.libraryImages.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % this.libraryImages.length,
                            })
                        }
                    />
                )}
                <div className="giphy-api-input">
                    <input id = "Giphy-upload-field" type="text" placeholder="Enter video url.."></input>
                </div>

                <div className = "Open-library-button">
                    <button  id = "uploadGiphy" type="button" onClick={() =>
                    {
                        this.uploadRequest();
                    }
                    }>
                        Upload video
                    </button>
                </div>
                <div className = "Download-button">
                    <button  id = "donwload-gif" type="button" onClick={() =>
                    {
                        this.downloadGif();
                    }
                    }>
                        I am feeling lucky
                    </button>
                </div>
            </div>
        );
    }

    getImagesFromGiphy(){
        let giphyImages = [];
        axios.get(requestUrl
            + '&limit='+ pageLimit
            + '&rating='
            + rating
            + '&api_key='
            + giphyApiKey)
             .then((res) => {
                 _.forEach(res.data.data,  image => {
                    giphyImages.push(image.images.original.url);
                 });
             });
        return giphyImages;
    }

    uploadRequest(){
        let url = $('#Giphy-upload-field').val();

        if(url.length > 0){
            this.setLoadingGif();
            axios.post("http://upload.giphy.com/v1/gifs?api_key=" + giphyApiKey +'&source_image_url=' + url).then(res => {
                let responseId = res['data']['data']['id'];
                axios.get('http://api.giphy.com/v1/gifs?api_key='+giphyApiKey +'&ids=' + responseId).then( response =>{
                    let imageUrl = response['data']['data'][0]['images']['original']['url'];
                    if(!imageUrl){
                    this.setErrorGif();
                    }
                    $('.Giphy-image-holder').css('background-image', 'url(' + imageUrl + ')');
                });
            }).catch( errors =>{
            this.setErrorGif();
           });
        }
    }

    searchRequest(){
        let searchInputValue = $('#Giphy-search-field').val();
        let giphyImages = [];
        axios.get(searchUrl
            + 'q=' + searchInputValue
            + '&limit='+ pageLimit
            + '&rating='
            + rating
            + '&api_key='
            + giphyApiKey)
             .then((res) => {
                 _.forEach(res.data.data,  image => {
                     giphyImages.push(image.images.original.url);
                 });
             });
        return giphyImages;
    }

    downloadGif(){

        this.setLoadingGif();

        axios.get(randomUrl + '&api_key=' + giphyApiKey).then((res) => {
             let imageUrl = res.data.data.image_original_url;
             if(!imageUrl){this.setErrorGif(); return;}
                 let xhr = new XMLHttpRequest();
                 xhr.responseType = 'blob';
                 xhr.onload = function () {
                     let a = document.createElement('a');
                     a.href = window.URL.createObjectURL(xhr.response);
                     a.download = "I_felt_lucky.gif";
                     a.style.display = 'none';
                     document.body.appendChild(a);
                     a.click();
                     a.remove()
                 };
                 xhr.open('GET', imageUrl);
                 xhr.send();
             }).then(() => {
                   setTimeout( () => {
                       $('.Giphy-image-holder').css('background-image', 'url(https://giphy.com/static/img/giphy_logo_square_social.png)');
                   }, 1000);
                   }).catch(() => {this.setErrorGif();});
    }

    setErrorGif(){
        let errorImage = 'https://media.tenor.com/images/64156bc4312d2460a34b16352a70db47/tenor.gif';
        $('.Giphy-image-holder').css('background-image', 'url(' + errorImage + ')');
    }

    setLoadingGif(){
        let loadingGif = 'https://media1.tenor.com/images/556e9ff845b7dd0c62dcdbbb00babb4b/tenor.gif?itemid=5300368';
        $('.Giphy-image-holder').css('background-image', 'url(' + loadingGif + ')');
    }
}
