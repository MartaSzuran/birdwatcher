import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import moment from 'moment';

module('Integration | Component | show-observations', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('show observation', async function (assert) {
    const observations = this.server.createList('observation', 5);
    const user = this.server.create('user');
    const currentUserObservation = this.server.create('observation', {
      owner: user,
    });
    observations.push(currentUserObservation);

    const sessionService = this.owner.lookup('service:session');

    sessionService.currentUser = user;

    this.set('observations', observations);

    await render(hbs`<ShowObservations @observations={{this.observations}}/>`);

    observations.map((observation, index) => {
      const stringDate = moment(observation.observationDate).format(
        'DD-MM-YYYY'
      );
      assert
        .dom(`[data-test-observation-observationDate="${index}"]`)
        .hasText(stringDate);
      assert
        .dom(`[data-test-observation-birdname="${index}"]`)
        .hasText(observation.birdname);
      assert
        .dom(`[data-test-observation-latLocation="${index}"]`)
        .hasText(`${observation.latLocation}`);
      assert
        .dom(`[data-test-observation-lngLocation="${index}"]`)
        .hasText(`${observation.lngLocation}`);
      assert
        .dom(`[data-test-observation-notes="${index}"]`)
        .hasText(observation.notes);
      if (index === observations.length - 1) {
        assert.dom('[data-test-delete-button]').exists();
        assert.dom('[data-test-edit-button]').exists();
      }
    });
  });
});
