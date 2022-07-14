import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | show-observations', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function (assert) {
    const observations = this.server.createList('observation', 5);
    console.log(observations);

    this.set('observations', observations);

    await render(hbs`<ShowObservations @observations={{this.observations}}/>`);

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
