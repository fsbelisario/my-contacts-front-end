import {
  useCallback,
  useEffect,
  // useMemo,
  useState,
  useTransition,
} from 'react';

import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

export default function useHome() {
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const [isPending, startTransition] = useTransition();

  // const filteredContacts = useMemo(() => contacts.filter((contact) => (
  //   contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  // )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
      setFilteredContacts(contactsList);
    } catch {
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }, []);

  function handleChangeSearchTerm(event) {
    const { value } = event.target;

    setSearchTerm(value);

    startTransition(() => {
      setFilteredContacts(contacts.filter((contact) => (
        contact.name.toLowerCase().includes(value.toLowerCase())
      )));
    });
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      toast({
        type: 'success',
        text: 'Contato removido com sucesso.',
      });

      setContacts((prevState) => prevState.filter((contact) => contact.id !== contactBeingDeleted.id));

      handleCloseDeleteModal();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao remover o contato.',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isPending,
    isLoading,
    isDeleteModalVisible,
    isLoadingDelete,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  };
}
