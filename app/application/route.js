import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ApplicationRoute extends Route {
  @service store;

  async beforeModel() {
    const user1 = {
      id: 1,
      username: 'Pan Drozd',
      email: 'pan.drozd@gmail.com',
      info: 'informacje o użytkowaniku 1',
      password: 'drozd123',
      photoURL:
        'https://upload.wikimedia.org/wikipedia/commons/6/6e/Song_Thrush_Turdus_philomelos.jpg',
    };

    const user2 = {
      id: 2,
      username: 'Pan Kos',
      email: 'pan.kos@gmail.com',
      info: 'informacje o użytkowaniku 2',
      password: 'kos123',
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
      observationDate: moment('2022-06-01').toDate(),
      notes: 'some informations that are important to user/others.',
      owner: user1Model,
    };

    const obser2 = {
      id: 2,
      birdname: 'Sieweczka obrożna',
      location: 'Żywiec',
      observationDate: moment('2022-06-02').toDate(),
      notes: 'some informations that are important to user/others.',
      owner: user1Model,
    };
    const obser3 = {
      id: 3,
      birdname: 'Czapla siwa',
      location: 'Bielsko-Biała',
      observationDate: moment('2022-06-05').toDate(),
      notes: 'some informations that are important to user/others.',
      owner: user2Model,
    };

    const obser1Model = this.store.createRecord('observation', obser1);
    const obser2Model = this.store.createRecord('observation', obser2);
    const obser3Model = this.store.createRecord('observation', obser3);

    await obser1Model.save();
    await obser2Model.save();
    await obser3Model.save();

    const location1 = {
      id:1,
      lat: '49.664354',
      lng: '19.184909',
      observation: obser1Model,
    }

    const location2 = {
      id:2,
      lat: '49.663062',
      lng: '19.181572',
      observation: obser2Model,
    }

    const location3 = {
      id:3,
      lat: '49.800757',
      lng: '19.073113',
      observation: obser3Model,
    }

    const location1Model = this.store.createRecord('location', location1)
    const location2Model = this.store.createRecord('location', location2)
    const location3Model = this.store.createRecord('location', location3)

    await location1Model.save();
    await location2Model.save();
    await location3Model.save();
  }
}
