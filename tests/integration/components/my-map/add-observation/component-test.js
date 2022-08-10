import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupMapTest, waitForMap } from 'ember-google-maps/test-support';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Acceptance | Component | my-map/add-observation ', function (hooks) {
  setupRenderingTest(hooks);
  setupMapTest(hooks);

  test('check map instance', async function (assert) {
    await render(hbs`<ObservationForm::MapModal
    @onLatLocationChange={{this.onLatLocationChange}}
    @onLngLocationChange={{this.onLngLocationChange}}
    @hideMapModal={{this.hideMapModal}}
    />`);
    const { map } = await waitForMap();
    assert.ok(map);
    assert.dom('[data-test-map]').exists();
  });
});
