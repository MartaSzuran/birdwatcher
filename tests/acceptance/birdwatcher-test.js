import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | birdwatcher', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('ul').exists();
  });

  test('navigating using the navbar', async function (assert) {
    await visit('/');

    assert.dom('ul').exists();
    assert.dom('li a.nav-link').hasText('Home');
  });
});
