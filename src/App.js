import React, { useState, useEffect } from 'react';
import './App.css';
import shortid from 'shortid';
import Searchbar from './Components/Searchbar/Searchbar.jsx';
import ImageGallery from './Components/ImageGallery/ImageGallery.jsx';
import ImageGalleryItem from './Components/ImageGalleryItem/ImageGalleryItem.jsx';
import Button from './Components/Button/Button.jsx';
import Loader from './Components/Loader/Loader.jsx';
import Modal from './Components/Modal/Modal.jsx';
import { getImages } from 'api/images';

export default function App() {
  // state = {
  //   page: 1,
  //   query: '',
  //   images: [],
  //   isLoading: false,
  //   error: null,
  //   showModal: false,
  //   bigImg: {},
  //   maxPage: 1,
  // };
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [bigImg, setBigImg] = useState({});
  const [maxPage, setMaxPage] = useState(1);

  const handleSubmit = value => {
    setQuery(value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleButton = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  const showImage = img => {
    toggleModal();
    setBigImg({ src: img.largeImageURL, alt: img.tags });
  };

  const setImagesToState = async () => {
    try {
      const data = await getImages(query, page);
      const images = data.hits;
      const allPages = Math.ceil(data.total / images.length);
      if (!isNaN(allPages)) {
        setMaxPage(allPages);
      } else {
        setMaxPage(0);
      }
      setImages(images);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const data = await getImages(query, page);
      const images = data.hits;
      setImages(prevState => [...prevState, ...images.map(img => img)]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  //---------------------------------------------------------------------------
  // не разобралась с useEffect - написала методом проб и ошибок!!!
  //---------------------------------------------------------------------------
  useEffect(() => {
    setIsLoading(true);
    setImagesToState();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    loadMore();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery showImage={showImage}>
          {images.map(img => {
            return (
              <ImageGalleryItem
                key={shortid.generate()}
                img={img}
                showImage={showImage}
              />
            );
          })}
          {showModal && <Modal onClose={toggleModal} image={bigImg} />}
        </ImageGallery>
      )}

      {isLoading && <Loader />}

      {maxPage > page && images.length > 0 && <Button onClick={handleButton} />}
    </>
  );
}
