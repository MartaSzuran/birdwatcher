import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module(
  'Integration | Component | show-observations/edit-delete-buttons',
  function (hooks) {
    setupRenderingTest(hooks);
    setupMirage(hooks);

    test('test edit-delete buttons', async function (assert) {
      const user = this.server.create('user');

      const currentUserObservation = this.server.create('observation', {
        owner: user,
      });

      const sessionService = this.owner.lookup('service:session');

      sessionService.currentUser = user;

      this.set('currentUserObservation', currentUserObservation);

      await render(hbs`<ShowObservations::EditDeleteButtons @observationOwner={{this.currentUserObservation.owner.username}}
            @currentObservation={{this.currentUserObservation}} />`);

      assert.dom('[data-test-edit-button]').exists();
      assert.dom('[data-test-delete-button]').exists();

      assert.dom('[data-test-edit-button]').hasText('✎');
      assert.dom('[data-test-delete-button]').hasText('✖');
    });
  }
);
