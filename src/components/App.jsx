import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    keyword: '',
  };

  handleFormSubmit = keyword => {
    this.setState({ keyword });
  };

  render() {
    return (
      <Container>
        <Toaster
          toastOptions={{
            position: 'top-right',
            duration: 1500,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery keyword={this.state.keyword} />
      </Container>
    );
  }
}
