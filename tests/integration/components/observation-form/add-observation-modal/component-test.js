import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | observation-form/add-observation-modal',
  function (hooks) {
    setupRenderingTest(hooks);

    test('test modal', async function (assert) {
      await render(hbs`<ObservationForm::AddObservationModal />`);
      assert.dom('[data-test-button-add-another-observation]').exists();
      assert.dom('[data-test-button-go-to-observation-list]').exists();

      assert
        .dom('[data-test-button-add-another-observation]')
        .hasText('Add another observation');
      assert
        .dom('[data-test-button-go-to-observation-list]')
        .hasText('My observations list');
    });
  }
);
