import { useRef } from 'react';

import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

export default function useHome() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      await ContactsService.createContact(contact);

      contactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso.',
        duration: 3000,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Erro ao cadastrar o contato.',
      });
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  };
}
