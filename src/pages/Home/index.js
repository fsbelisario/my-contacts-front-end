import { useEffect, useMemo, useState } from 'react';

import { Link } from 'react-router-dom';

import {
  Container, InputSearchContainer, Header, ListHeader, Card,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

import formatPhone from '../../utils/formatPhone';

import ContactsService from '../../services/ContactsService';

import Loader from '../../components/Loader';

import APIError from '../../errors/APIError';

// import Modal from '../../components/Modal';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  // const filteredContacts = contacts.filter((contact) => (
  //   contact.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  // ));

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(orderBy);

        setContacts(contactsList);
      } catch (error) {
        if (error instanceof APIError) {
          console.log({ error });
          // Mostrar mensagem de erro para o usuário
        } else {
          console.log({ error });
          // Mostrar mensagem de erro para o usuário
          // Enviar os dados do erro para um serviço de log
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      {/* <Modal danger /> */}
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          type="text"
          placeholder="Pesquise pelo nome..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>
      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">
          Novo contato
        </Link>
      </Header>
      {filteredContacts.length > 0
        && (
          <ListHeader orderBy={orderBy}>
            <button
              type="button"
              onClick={handleToggleOrderBy}
            >
              <span>Nome</span>
              <img
                src={arrow}
                alt="Arrow icon"
              />
            </button>
          </ListHeader>
        )}
      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name
                && <small>{contact.category_name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{formatPhone(contact.phone)}</span>
          </div>
          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit icon" />
            </Link>
            <button type="button">
              <img src={trash} alt="Trash icon" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
