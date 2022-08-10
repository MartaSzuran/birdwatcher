import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  setupMapTest,
  trigger,
  waitForMap,
} from 'ember-google-maps/test-support';
import { render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import moment from 'moment';

module(
  'Acceptance | Component | my-map/show-all-observations',
  function (hooks) {
    setupRenderingTest(hooks);
    setupMapTest(hooks);
    setupMirage(hooks);

    hooks.beforeEach(async function () {
      const observation1 = {
        id: 1,
        birdname: 'drozd',
        locationId: 1,
        latLocation: 49.664354,
        lngLocation: 19.184909,
        owner: { username: 'Marta' },
      };
      const observation2 = {
        id: 2,
        birdname: 'kos',
        locationId: 2,
        latLocation: 49.800757,
        lngLocation: 19.073113,
        owner: { username: 'Jacek' },
      };
      const observation3 = {
        id: 3,
        birdname: 'sroka',
        locationId: 3,
        latLocation: 49.66306,
        lngLocation: 19.181572,
        owner: { username: 'Placek' },
      };

      const observations = [observation1, observation2, observation3];
      this.set('observations', observations);
    });

    test('main map with markers', async function (assert) {
      await render(hbs`<MyMap::ShowAllObservations 
      @lat='49.668437' 
      @lng='19.189728'
      @zoom={{12}}
      @observations={{this.observations}} />`);

      const { map, components } = await waitForMap();

      assert.ok(map);
      assert.dom('[data-test-main-map]').exists();

      let isOpenObservationId = null;

      this.set('isOpenObservationId', isOpenObservationId);

      const marker1 = components.markers[0].mapComponent;
      trigger(marker1, 'click');
      const infoWindow1 = await waitFor(`[data-test-info-window="${0}"]`);
      assert.dom(infoWindow1).exists();
      assert.dom(infoWindow1).hasText(`${this.observations[0].birdname}`);

      const marker2 = components.markers[1].mapComponent;
      trigger(marker2, 'click');
      const infoWindow2 = await waitFor(`[data-test-info-window="${1}"]`);
      assert.dom(infoWindow2).exists();
      assert.dom(infoWindow2).hasText(`${this.observations[1].birdname}`);

      const marker3 = components.markers[2].mapComponent;
      trigger(marker3, 'click');
      const infoWindow3 = await waitFor(`[data-test-info-window="${2}"]`);
      assert.dom(infoWindow3).exists();
      assert.dom(infoWindow3).hasText(`${this.observations[2].birdname}`);

      const isLoaded = true;
      this.set('isLoaded', isLoaded);

      let currentLatBounds = [49.6, 49.9];
      let currentLngBounds = [18.07, 19.19];
      this.set('currentLatBounds', currentLatBounds);
      this.set('currentLngBounds', currentLngBounds);

      await render(hbs`<MyMap::ShowAllObservations::ObservationsOnMapTable
      @observations={{this.observations}}
      @currentLatBounds={{this.currentLatBounds}}
      @currentLngBounds={{this.currentLngBounds}}
      />`);

      this.observations.map((observation, index) => {
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
          .dom(`[data-test-observation-username="${index}"]`)
          .hasText(observation.owner.username);
      });

      await render(hbs`<MyMap::ShowAllObservations::ObservationsOnMapTable
      @observations={{this.observations}}
      @currentLatBounds={{this.currentLatBounds}}
      @currentLngBounds={{this.currentLngBounds}}
      />`);

      currentLatBounds = [49.664353, 49.664356];
      currentLngBounds = [19.184908, 19.18491];

      const stringDate = moment(this.observations[0].observationDate).format(
        'DD-MM-YYYY'
      );
      assert
        .dom(`[data-test-observation-observationDate="0"]`)
        .hasText(stringDate);
      assert
        .dom(`[data-test-observation-birdname="0"]`)
        .hasText(this.observations[0].birdname);
      assert
        .dom(`[data-test-observation-username="0"]`)
        .hasText(this.observations[0].owner.username);
    });
  }
);
