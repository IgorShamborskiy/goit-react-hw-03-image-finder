import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleChange = evt => {
    this.setState({ searchValue: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.searchValue.trim() === '') {
      return toast.error('Add text in search');
    }

    this.props.onSubmit(this.state.searchValue);
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <ImSearch style={{ marginRight: 8 }} />
            <SearchLabel>Search</SearchLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
