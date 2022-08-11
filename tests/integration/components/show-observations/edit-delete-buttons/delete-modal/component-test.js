import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module(
  'Integration | Component | show-observations/edit-delete-buttons/delete-modal',
  function (hooks) {
    setupRenderingTest(hooks);
    setupMirage(hooks);

    test('test delete modal', async function (assert) {
      const observation = this.server.create('observation');

      this.set('observation', observation);

      await render(hbs`
        <ShowObservations::EditDeleteButtons::DeleteModal 
          @hideDeleteModal={{false}}
          @currentObservation={{this.observation}}
        />
      `);

      assert.dom('[data-test-button-confirmation]').exists();
      assert.dom('[data-test-button-denial]').exists();

      assert.dom('[data-test-button-confirmation]').hasText('✔');
      assert.dom('[data-test-button-denial]').hasText('✖');
    });
  }
);
