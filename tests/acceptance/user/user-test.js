import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Acceptance | user', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    const sessionService = this.owner.lookup('service:session');
    const store = this.owner.lookup('sercie:store');

    this.set('store', store);
    const user = this.server.create('user');

    sessionService.currentUser = user;

    const currentObservation = this.server.create('observation', {
      owner: user,
    });

    this.set('currentObservation', currentObservation);
  });

  test('visiting /user', async function (assert) {
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

    assert.dom('[data-test-delete-button]').exists();
    await click('[data-test-delete-button]');

    assert.dom('[data-test-button-confirmation]').exists();
    assert.dom('[data-test-button-denial]').exists();
    await click('[data-test-button-denial]');

    assert.dom('[data-test-edit-button]').exists();
    await click('[data-test-edit-button]');
    await visit(`/edit-observation/1`);
  });
});
