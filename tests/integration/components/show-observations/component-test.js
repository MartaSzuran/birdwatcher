import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | show-observations', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function (assert) {
    assert.expect(2);
    const observations = this.server.createList('observation', 5);

    this.set('observations', observations);

    await render(hbs`<ShowObservations @observations={{this.observations}}/>`);

    this.set('sortArrow', '');

    assert.equal(
      this.element.querySelector('.btn.btn-secondary').textContent.trim(),
      `Sort by birdname${this.sortArrow}`
    );

    // assert.deepEqual('this.sortToggle', (actualSortParam) => {
    //   let expectedSortParam = 'ASC';
    //   assert.deepEqual(actualSortParam, expectedSortParam);
    // });

    // await click('.btn.btn-secondary');
    // this.set('sortArrow', '↓a');
    // this.set('this.args.sortParam', 'ASC');

    // assert.equal(
    //   this.element.querySelector('.btn.btn-secondary').textContent.trim(),
    //   `Sort by birdname ${this.sortArrow}`
    // );

    assert.dom('.reset.btn.btn-danger').hasText('Clear');

    observations.map((observation, index) => {
      // assert
      //   .dom(`[data-observation-observationDate="${index}"]`)
      //   .has(observation.observationDate);
      assert
        .dom(`[data-observation-birdname="${index}"]`)
        .hasText(observation.birdname);
      assert
        .dom(`[data-observation-latLocation="${index}"]`)
        .hasText(JSON.stringify(observation.latLocation));
      assert
        .dom(`[data-observation-lngLocation="${index}"]`)
        .hasText(JSON.stringify(observation.lngLocation));
      assert
        .dom(`[data-observation-notes="${index}"]`)
        .hasText(observation.notes);
    });
  });
});
