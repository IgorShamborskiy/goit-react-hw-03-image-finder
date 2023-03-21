import PropTypes from 'prop-types';
import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {};

  render() {
    const { imagesList } = this.state;
    return <>{imagesList && <Gallery>{this.props.children}</Gallery>}</>;
  }
}

ImageGallery.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
  onRecordingImagesList: PropTypes.func.isRequired,
  onWriteTotalHits: PropTypes.func.isRequired,
  searchImages: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
