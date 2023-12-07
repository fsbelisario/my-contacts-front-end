import PropTypes from 'prop-types';

import { useState } from 'react';

import { Form, ButtonContainer } from './styles';

import isEmailValid from '../../utils/isEmailValid';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'Nome é obrigatório.' },
      ]);
    } else {
      setErrors((prevState) => [
        prevState.filter((error) => error.field !== 'name'),
      ]);
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      const errorAlreadySet = errors.find((error) => error.field === 'email');
      if (!errorAlreadySet) {
        setErrors((prevState) => [
          ...prevState,
          { field: 'email', message: 'E-mail com formato inválido.' },
        ]);
      }
    } else {
      setErrors((prevState) => [
        prevState.filter((error) => error.field !== 'email'),
      ]);
    }
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  function handleSubmit(event) {
    event?.preventDefault();

    console.log({
      name, email, phone, category,
    });
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <Form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
        />
      </FormGroup>
      <FormGroup>
        <Select
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
