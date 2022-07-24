import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { Interactor as Pikaday } from 'ember-pikaday/test-support';
import { close as closePikaday } from 'ember-pikaday/test-support';

module('Integration | Component | observation-form', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<ObservationForm />`);

    await click('[data-test-pikaday]');

    await Pikaday.selectDate(new Date(2022, 8, 28));
    assert.strictEqual(Pikaday.selectedYear(), '2022');
    assert.strictEqual(Pikaday.selectedMonth(), '8');
    assert.strictEqual(Pikaday.selectedDay(), '28');
    await closePikaday('[data-test-pikaday]');
  });
});
