import delay from '../utils/delay';

class ContactsService {
  async listContacts(orderBy = 'asc') {
    const response = await fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`);

    await delay(500);// Delay forçado para simular o Loader

    return response.json();
  }
}

export default new ContactsService();
