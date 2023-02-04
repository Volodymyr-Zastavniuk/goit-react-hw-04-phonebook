import { nanoid } from 'nanoid';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.css';

export default function ContactForm({ contacts, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('No case for this event');
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const normalizedName = name.toLowerCase().trim();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      return alert(`${name} is already in contacts.`);
    }

    onSubmit(newContact);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="contact__form">
      <label className="contact__label">
        Name{' '}
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleInputChange}
          className="contact__input"
        />
      </label>

      <label className="contact__label">
        Number{' '}
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInputChange}
          className="contact__input"
        />
      </label>

      <button type="submit" className="contact__btn">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = { contacts: PropTypes.array, onSubmit: PropTypes.func };
