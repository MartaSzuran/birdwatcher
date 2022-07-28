import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  fillIn,
  findAll,
  find,
  waitFor,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { Interactor as Pikaday } from 'ember-pikaday/test-support';
import { close as closePikaday } from 'ember-pikaday/test-support';
import moment from 'moment';
import { setupMapTest } from 'ember-google-maps/test-support';

module('Integration | Component | observation-form', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);
  setupMapTest(hooks);

  hooks.beforeEach(async function () {
    const observation = this.server.create('observation');
    this.set('observation', observation);

    await render(hbs`<ObservationForm />`);
  });

  test('inputs renders', async function (assert) {
    assert.dom('[data-test-input-pikaday]').exists();
    assert.dom('[data-test-input-birdname]').exists();
    assert.dom('[data-test-input-location]').exists();
    assert.dom('[data-test-input-notes]').exists();
    assert.dom('[data-test-button-cancel]').exists();
    assert.dom('[data-test-button-clear]').exists();
    assert.dom('[data-test-button-save]').exists();
  });

  test('pikaday input', async function (assert) {
    await click('[data-test-input-pikaday]');
    await Pikaday.selectDate(new Date(2022, 8, 28));
    assert.strictEqual(Pikaday.selectedYear(), '2022');
    assert.strictEqual(Pikaday.selectedMonth(), '8');
    assert.strictEqual(Pikaday.selectedDay(), '28');
    await closePikaday('[data-test-input-pikaday]');
  });

  test('location input disabled', async function (assert) {
    assert.dom('[data-test-input-location]').hasNoAttribute('disabled');
  });

  test('location input change to disabled', async function (assert) {
    await click('[data-test-input-location]');
    assert.dom('[data-test-input-location]').hasAttribute('disabled');
  });

  test('fill in the form', async function (assert) {
    assert.dom('[data-test-button-save]').hasAttribute('disabled');

    const stringDate = moment(this.observation.observationDate).format(
      'YYYY-MM-DD'
    );
    await click('[data-test-input-pikaday]');
    await Pikaday.selectDate(new Date(stringDate));

    await closePikaday('[data-test-input-pikaday]');

    await fillIn('[data-test-input-birdname]', `${this.observation.birdname}`);
    await fillIn('[data-test-input-notes]', `${this.observation.notes}`);
    await click('[data-test-input-location]');

    const { x, y, width, height } = find('iframe').getBoundingClientRect();
    document.elementFromPoint(x + width / 2, y + height / 2).click();

    assert.dom('[data-test-input-pikaday]').hasValue(stringDate);
    assert
      .dom('[data-test-input-birdname]')
      .hasValue(`${this.observation.birdname}`);
    await waitFor('[data-test-input-location]', { timeout: 5000 });
    const inputArr = findAll('input');
    assert.dom('[data-test-input-location]').hasValue(`${inputArr[2].value}`);
    assert.dom('[data-test-input-notes]').hasValue(`${this.observation.notes}`);
  });

  test('clear the form', async function (assert) {
    await click('[data-test-button-clear]');
    assert.dom('[data-test-input-pikaday]').hasNoValue()
    assert.dom('[data-test-input-birdname]').hasNoValue()
    assert.dom('[data-test-input-location]').hasNoValue()
    assert.dom('[data-test-input-notes]').hasNoValue()
  });
});
