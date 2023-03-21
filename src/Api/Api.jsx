import PropTypes from 'prop-types';

import axios from 'axios';

export const getImages = async (nextRequest, prevPage) => {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      q: nextRequest,
      page: prevPage,
      key: '31320989-3ffacd817f0e2729a6f3a30f9',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return data;
};

getImages.propTypes = {
  nextRequest: PropTypes.string.isRequired,
  prevPage: PropTypes.number.isRequired,
};
