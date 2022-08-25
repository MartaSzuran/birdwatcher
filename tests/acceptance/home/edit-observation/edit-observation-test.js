import { module, test } from 'qunit';
import {
  visit,
  currentURL,
  click,
  fillIn,
  find,
  waitFor,
  findAll,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { Interactor as Pikaday } from 'ember-pikaday/test-support';
import { close as closePikaday } from 'ember-pikaday/test-support';
import moment from 'moment';

module('Acceptance | edit-observation', function (hooks) {
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
      // owner: this.sessionService.currentUser,
    };

    const observation = await this.server.create('observation', observation1);
    const currentObservation = await store.findRecord(
      'observation',
      observation.id
    );

    this.set('currentObservation', currentObservation);

    window.localStorage.setItem(
      'storage:logged-as',
      JSON.stringify({ id: this.sessionService.currentUser.id })
    );
  });

  test('visit edit observation', async function (assert) {
    await visit('/edit-observation/1');
    assert.strictEqual(currentURL(), '/edit-observation/1');

    assert
      .dom('[data-test-input-edit-obser-pikaday]')
      .exists()
      .hasValue(
        moment(this.currentObservation.observationDate).format('YYYY-MM-DD')
      );
    await click('[data-test-input-edit-obser-pikaday]');
    await Pikaday.selectDate(new Date(2021, 7, 28));
    assert.strictEqual(Pikaday.selectedYear(), '2021');
    assert.strictEqual(Pikaday.selectedMonth(), '7');
    assert.strictEqual(Pikaday.selectedDay(), '28');
    await closePikaday('[data-test-input-edit-obser-pikaday]');

    assert
      .dom('[data-test-input-edit-obser-birdname]')
      .hasValue(this.currentObservation.birdname);
    await fillIn('[data-test-input-edit-obser-birdname]', 'kaczka');
    assert.dom('[data-test-input-edit-obser-birdname]').hasValue('kaczka');

    assert
      .dom('[data-test-input-edit-obser-location]')
      .hasNoAttribute('disabled');
    await click('[data-test-input-edit-obser-location]');
    assert
      .dom('[data-test-input-edit-obser-location]')
      .hasAttribute('disabled');
    const { x, y, width, height } = find('iframe').getBoundingClientRect();
    document.elementFromPoint(x + width / 2, y + height / 2).click();
    await waitFor('[data-test-input-edit-obser-location]', { timeout: 5000 });
    const inputArr = findAll('input');
    assert
      .dom('[data-test-input-edit-obser-location]')
      .hasValue(`${inputArr[2].value}`);

    assert
      .dom('[data-test-input-edit-obser-notes]')
      .hasValue(this.currentObservation.notes);
    await fillIn('[data-test-input-edit-obser-notes]', 'bleble');
    assert.dom('[data-test-input-edit-obser-notes]').hasValue('bleble');

    await click('[data-test-edit-obser-button-save]');
    assert.strictEqual(currentURL(), '/user');

    await visit('/edit-observation/1');
    await click('[data-test-edit-obser-button-cancel]');
    assert.strictEqual(currentURL(), '/user');
  });
});
