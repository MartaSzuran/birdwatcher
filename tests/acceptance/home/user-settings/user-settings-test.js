import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance || user-settings', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.sessionService = this.owner.lookup('service:session');
    const store = await this.owner.lookup('service:store');

    const loggedUser = await this.server.create('user');
    const loggedUserModel = await store.findRecord('user', loggedUser.id);

    this.set('sessionService.currentUser', loggedUserModel);
    this.set('store', store);

    window.localStorage.setItem(
      'storage:logged-as',
      JSON.stringify({ id: this.sessionService.currentUser.id })
    );
  });

  test('visit user-settings', async function (assert) {
    await visit('/user-settings');
    assert.strictEqual(currentURL(), '/user-settings');

    assert.dom('[data-test-input-username]').exists();
    assert
      .dom('[data-test-input-username]')
      .hasAttribute('placeholder', this.sessionService.currentUser.username);
    await fillIn('[data-test-input-username]', 'Marta');
    assert.dom('[data-test-input-username]').hasValue('Marta');

    assert.dom('[data-test-input-email]').exists();
    assert
      .dom('[data-test-input-email]')
      .hasAttribute('placeholder', this.sessionService.currentUser.email);
    await fillIn('[data-test-input-email]', 'marta@o2.pl');
    assert.dom('[data-test-input-email]').hasValue('marta@o2.pl');

    assert.dom('[data-test-input-info]').exists();
    assert
      .dom('[data-test-input-info]')
      .hasAttribute('placeholder', this.sessionService.currentUser.info);
    await fillIn('[data-test-input-info]', 'super important');
    assert.dom('[data-test-input-info]').hasValue('super important');

    assert.dom('[data-test-input-password]').exists();
    assert
      .dom('[data-test-input-password]')
      .hasAttribute('placeholder', this.sessionService.currentUser.password);
    await fillIn('[data-test-input-password]', 'abc123');
    assert.dom('[data-test-input-password]').hasValue('abc123');

    assert.dom('[data-test-input-photoURL]').exists();

    assert.dom('[data-test-choose-photo-button]').exists();
    assert.dom('[data-test-choose-photo-button]').hasText('Choose photo');
    await click('[data-test-choose-photo-button]');

    assert.dom('[data-test-photo-owl]').exists();
    assert.dom('[data-test-photo-parrot]').exists();
    assert.dom('[data-test-photo-robin]').exists();
    await click('[data-test-photo-robin]');

    assert.dom('[data-test-input-photoURL]').hasValue('robin.jpg');

    assert.dom('[ data-test-save-button]').exists();
    await click('[data-test-save-button]');
    await visit('/user');
    assert.strictEqual(currentURL(), '/user');

    await visit('/user-settings');
    assert.strictEqual(currentURL(), '/user-settings');

    assert.dom('[ data-test-cancel-button]').exists();
    await click('[data-test-cancel-button]');
    await visit('/user');
    assert.strictEqual(currentURL(), '/user');
  });
});
