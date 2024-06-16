import { useEffect, useRef, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';

import ContactsService from '../../services/ContactsService';

import useIsMounted from '../../hooks/useIsMounted';

import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();

  const history = useHistory();

  const isMounted = useIsMounted();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        if (isMounted()) {
          contactFormRef.current.setFieldsValues(contact);

          setContactName(contact.name);

          setIsLoading(false);
        }
      } catch {
        if (isMounted()) {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado.',
          });
        }
      }
    }

    loadContact();
  }, [id, history, isMounted]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const updatedContactData = await ContactsService.updateContact(id, contact);

      setContactName(updatedContactData.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso.',
        duration: 3000,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Erro ao editar o contato.',
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando' : `Editar ${contactName}`} />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
