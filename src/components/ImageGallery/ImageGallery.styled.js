import styled from 'styled-components';

export const ListGallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const Text = styled.p`
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  color: rgba(214, 5, 5, 0.98);
`;
