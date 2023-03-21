import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { AppStyled } from './App.styled';
import { Loader } from './Loader/Loader';
import { ButtonLoadMore } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { getImages } from '../Api/Api';
import { toast } from 'react-toastify';
const STATUS = {
  idle: 'idle',
  loading: 'loading',
  succes: 'succes',
  error: 'error',
};
export class App extends Component {
  state = {
    imagesList: null,
    page: 1,
    search: '',
    status: '',
    imagesList: null,
    showModal: false,
    largeImage: null,
    totalhits: 0,
  };
  async componentDidUpdate(prevState) {
    // const nextRequest = this.props.searchImages;
    // const prevRequest = prevProps.searchImages;
    // const prevPage = this.props.page;
    // const nextPage = prevProps.page;
    const { onStatusChange } = this.props;
    const { search, page } = this.state;
    if (prevState.page !== page || prevState.search !== search) {
      onStatusChange(STATUS.loading);
      try {
        const data = await getImages(page, prevState.search);
        if (data.hits.length === 0) {
          toast.warn(`Sorry! We didn't find anything, change your request`);
          return;
        }
        onStatusChange(STATUS.succes);
        this.setState({ imagesList: data });
        this.props.onRecordingImagesList(data.hits);
        this.props.onWriteTotalHits(data.totalHits);
        if (prevState.search !== search) {
          return;
        }
        toast.success(`Hooray! We found ${data.totalHits} images.`);
      } catch (error) {
        onStatusChange(STATUS.error);
        toast.error('Opps! Something went wrong');
      }
    }
  }
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  changeStatus = value => {
    this.setState({ status: value });
  };

  handleFormSubmit = search => {
    this.setState({ page: 1, search, imagesList: null });
  };

  recordingImagesList = data => {
    if (!this.state.imagesList) {
      this.setState({ imagesList: data });
      return;
    }
    if (this.state.imagesList) {
      this.setState(prevState => ({
        imagesList: [...prevState.imagesList, ...data],
      }));
      return;
    }
  };

  writeLargeImage = largeImage => {
    this.setState({ largeImage });
  };

  writeTotalHits = totalhits => {
    this.setState({ totalhits });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const {
      page,
      search,
      status,
      imagesList,
      showModal,
      largeImage,
      totalhits,
    } = this.state;
    return (
      <AppStyled>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {!!imagesList?.length && <ImageGallery imagesList={imagesList} />}

        {status === 'loading' && <Loader />}
        <ToastContainer autoClose={2000} />
        {showModal && (
          <Modal largeImg={largeImage} onToggle={this.toggleModal} />
        )}
        {imagesList && status !== 'loading' && totalhits > 12 && (
          <ButtonLoadMore loadMore={this.loadMore} />
        )}
      </AppStyled>
    );
  }
}
