/* eslint-disable react/jsx-one-expression-per-line */

import emptyBox from '../../../../assets/images/empty-box.svg';

import { Container } from './styles';

export default function EmptyList() {
  return (
    <Container>
      <img
        src={emptyBox}
        alt="Empty box"
      />
      <p>
        Você ainda não tem nenhum contato cadastrado!
        Clique no botão <strong>Novo contato</strong> acima para cadastrar o seu primeiro!
      </p>
    </Container>
  );
}
