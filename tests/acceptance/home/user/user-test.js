import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import moment from 'moment';

module('Acceptance | user', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.sessionService = this.owner.lookup('service:session');
    const store = await this.owner.lookup('service:store');

    const loggedUser = await this.server.create('user');
    const loggedUserModel = await store.findRecord('user', loggedUser.id);

    this.set('store', store);
    this.set('sessionService.currentUser', loggedUserModel);

    const observation1 = {
      id: 1,
      birdname: 'drozd',
      latLocation: 49.664354,
      lngLocation: 19.184909,
      observationDate: moment('2022-06-10').toDate(),
      notes: 'some informations that are important to user/others.',
      owner: this.sessionService.currentUser,
    };

    const observation2 = {
      id: 2,
      birdname: 'kos',
      latLocation: 49.800757,
      lngLocation: 19.073113,
      observationDate: moment('2022-06-05').toDate(),
      notes: 'some informations that are important to user/others.',
      owner: this.sessionService.currentUser,
    };
    const observation3 = {
      id: 3,
      birdname: 'sroka',
      latLocation: 49.66306,
      lngLocation: 19.181572,
      observationDate: moment('2022-06-15').toDate(),
      notes: 'some informations that are important to user/others.',
      owner: this.sessionService.currentUser,
    };

    this.store.createRecord('observation', observation1);
    this.store.createRecord('observation', observation2);
    this.store.createRecord('observation', observation3);

    const observations = this.store.findAll('observation');
    this.set('observations', observations);

    window.localStorage.setItem(
      'storage:logged-as',
      JSON.stringify({ id: this.sessionService.currentUser.id })
    );
  });

  test('visiting user', async function (assert) {
    await visit('user');
    assert.strictEqual(currentURL(), 'user');

    assert.dom('[data-test-button-settings]').exists();
    await click('[data-test-button-settings]');
    await visit('/user-settings');
    assert.strictEqual(currentURL(), '/user-settings');

    await visit('user');
    assert.strictEqual(currentURL(), 'user');
    assert.dom('[data-test-add-observation-button]').exists();
    await click('[data-test-add-observation-button]');
    await visit('/add-observation');
    assert.strictEqual(currentURL(), '/add-observation');

    await visit('user');
    assert.strictEqual(currentURL(), 'user');

    this.observations.map(() => {
      assert.dom('[data-test-delete-button]').exists();
      assert.dom('[data-test-edit-button]').exists();
    });
  });
});
