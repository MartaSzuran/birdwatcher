import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | user/details', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function (assert) {
    const user = this.server.create('user');
    console.log(user);

    this.set('user', user);

    await render(hbs`<User::Details @user={{this.user}}/>`);
    assert
      .dom('[data-test-photoURL]')
      .hasAttribute('src', 'https://loremflickr.com/640/480/people');
    assert.dom('[data-test-username]').hasText(user.username);
    assert.dom('[data-test-info]').hasText(user.info);
  });
});
