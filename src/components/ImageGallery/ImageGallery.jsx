import { Component } from 'react';
import { ImagesApi } from '../../Api/Api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import ButtonLoadMore from '../Button/Button';
import Loader from '../Loader/Loader';
import { ListGallery, Text } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    listImages: [],
    page: 1,
    status: 'empty',
    loadLastPage: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevKeyword = prevProps.keyword;
    const nextKeyword = this.props.keyword;
    let page = this.state.page;
    const per_page = 12;

    if (prevKeyword !== nextKeyword) {
      page = 1;
      this.setState({ page, listImages: [] });
    }
    if (
      prevKeyword !== nextKeyword ||
      (prevState.page !== page && page !== 1)
    ) {
      this.setState({ status: 'loading' });

      ImagesApi(nextKeyword, page, per_page)
        .then(result => {
          if (result.total === 0) {
            return Promise.reject(new Error('Відсутні дані'));
          }
          this.setState({
            listImages: [...this.state.listImages, ...result.hits],
            loadLastPage: Math.ceil(result.totalHits / per_page) <= page,
            status: 'success',
          });
        })
        .catch(error => {
          this.setState({ status: 'error', error });
        });
    }
  }

  loadNextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { listImages, status, loadLastPage } = this.state;

    if (status === 'empty') {
      return;
    }

    if (status === 'error') {
      return (
        <Text>The entered value "{this.props.keyword}" was not found</Text>
      );
    }

    if (status === 'success' || status === 'loading') {
      return (
        <>
          <ListGallery>
            {listImages.length > 0 &&
              listImages.map(item => (
                <ImageGalleryItem
                  key={item.id}
                  imageURL={item.webformatURL}
                  imageModalURL={item.largeImageURL}
                  description={item.tags}
                />
              ))}
          </ListGallery>
          {status === 'loading' && <Loader />}
          {listImages.length !== 0 && status !== 'loading' && !loadLastPage && (
            <ButtonLoadMore funcLoadMore={this.loadNextPage} />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  keyword: PropTypes.string.isRequired,
};
