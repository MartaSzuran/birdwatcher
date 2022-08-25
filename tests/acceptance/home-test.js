import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | Home', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    this.sessionService = this.owner.lookup('service:session');
    const store = await this.owner.lookup('service:store');

    const loggedUser = await this.server.create('user');
    const loggedUserModel = await store.findRecord('user', loggedUser.id);

    this.set('store', store);
    this.set('sessionService.currentUser', loggedUserModel);

    window.localStorage.setItem(
      'storage:logged-as',
      JSON.stringify({ id: loggedUserModel.id })
    );
  });

  test('navigating using the navbar', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-navbar-bird-image]')
      .hasAttribute('src', '/assets/images/bird.png');

    assert.dom('[data-test-navbar-profile]').hasText('Profile');
    await click('[data-test-navbar-profile]');
    assert.strictEqual(currentURL(), '/user');

    assert.dom('[data-test-navbar-observations]').hasText('Observations');
    await click('[data-test-navbar-observations]');
    assert.strictEqual(currentURL(), '/observations');

    assert.dom('[data-test-navbar-add-observation]').hasText('Add observation');
    await click('[data-test-navbar-add-observation]');
    assert.strictEqual(currentURL(), '/add-observation');

    assert.dom('[data-test-navbar-home]').hasText('Home');
    await click('[data-test-navbar-home]');
    assert.strictEqual(currentURL(), '/');

    assert.dom('[data-test-navbar-logout]').hasText('Logout');
  });
});
