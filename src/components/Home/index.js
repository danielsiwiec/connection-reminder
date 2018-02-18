import React from 'react';
import styles from './styles.scss';
import ContactList from '../ContactList'
import AddContact from '../AddContact'

function Home() {
  return (
    <section>
      <AddContact />
      <ContactList />
    </section>
  );
}

export default Home;
