import React, { Component } from 'react';
import './App.css';
import shortid from 'shortid';
import Searchbar from './Components/Searchbar/Searchbar.jsx';
import ImageGallery from './Components/ImageGallery/ImageGallery.jsx';
import ImageGalleryItem from './Components/ImageGalleryItem/ImageGalleryItem.jsx';
import Button from './Components/Button/Button.jsx';
import Loader from './Components/Loader/Loader.jsx';
import Modal from './Components/Modal/Modal.jsx';
import { getImages } from 'api/images';

export default class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    isLoading: false,
    error: null,
    showModal: false,
    bigImg: {},
    maxPage: 1,
  };

  handleSubmit = value => {
    this.setState({ query: value });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.setState({ isLoading: true });
  };

  showImage = img => {
    this.toggleModal();
    this.setState({
      bigImg: {
        src: img.largeImageURL,
        alt: img.tags,
      },
    });
  };

  async setImages() {
    try {
      const { page, query } = this.state;
      const data = await getImages(query, page);
      const images = data.hits;
      const allPages = Math.ceil(data.total / images.length);
      if (!isNaN(allPages)) {
        this.setState({ maxPage: allPages });
      } else {
        this.setState({ maxPage: 0 });
      }
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async loadMore() {
    try {
      const { page, query } = this.state;
      const data = await getImages(query, page);
      const images = data.hits;
      this.setState(prevState => ({
        images: [...prevState.images, ...images.map(img => img)],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    this.setImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.setImages();
    }
    if (this.state.page !== prevState.page) {
      this.loadMore();
    }
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.images.length > 0 && (
          <ImageGallery showImage={this.showImage}>
            {this.state.images.map(img => {
              return (
                <ImageGalleryItem
                  key={shortid.generate()}
                  img={img}
                  showImage={this.showImage}
                />
              );
            })}
            {this.state.showModal && (
              <Modal onClose={this.toggleModal} image={this.state.bigImg} />
            )}
          </ImageGallery>
        )}

        {this.state.isLoading && <Loader />}

        {this.state.maxPage > this.state.page &&
          this.state.images.length > 0 && (
            <Button onClick={this.handleButton} />
          )}
      </>
    );
  }
}
