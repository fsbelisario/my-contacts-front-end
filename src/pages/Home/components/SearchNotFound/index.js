/* eslint-disable react/jsx-one-expression-per-line */

import PropTypes from 'prop-types';

import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

import { Container } from './styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img
        src={magnifierQuestion}
        alt="Magnifier question"
      />
      <span>
        Nenhum resultado foi encontrato para <strong>{searchTerm}</strong>
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
