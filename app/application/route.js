import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;

  async beforeModel() {
    const user1 = {
      id: 1,
      username: 'Pan Drozd',
      email: 'pan.drozd@gmail.com',
      info: 'informacje o użytkowaniku 1',
      photoURL:
        'https://upload.wikimedia.org/wikipedia/commons/6/6e/Song_Thrush_Turdus_philomelos.jpg',
    };

    const user2 = {
      id: 2,
      username: 'Pan Kos',
      email: 'pan.kos@gmail.com',
      info: 'informacje o użytkowaniku 2',
      photoURL: 'https://janadamski.eu/wp-content/uploads/2016/10/Kos_01.jpg',
    };

    const user1Model = this.store.createRecord('user', user1);
    const user2Model = this.store.createRecord('user', user2);

    await user1Model.save();
    await user2Model.save();

    const obser1 = {
      id: 1,
      birdname: 'Brodziec piskliwy',
      location: 'Żywiec',
      date: '29-05-2022',
    };

    const obser2 = {
      id: 2,
      birdname: 'Sieweczka obrożna',
      location: 'Żywiec',
      date: '30-05-2022',
    };
    const obser3 = {
      id: 3,
      birdname: 'Czapla siwa',
      location: 'Bielsko-Biała',
      date: '31-05-2022',
    };

    const obser1Model = this.store.createRecord('observation', obser1);
    const obser2Model = this.store.createRecord('observation', obser2);
    const obser3Model = this.store.createRecord('observation', obser3);

    await obser1Model.save();
    await obser2Model.save();
    await obser3Model.save();
  }
}
