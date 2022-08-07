import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | registration-photos', function (hooks) {
  setupRenderingTest(hooks);

  test('test registration photos', async function (assert) {
    const photo1 = 'owl.jpg';
    const photo2 = 'parrot.jpg';
    const photo3 = 'robin.jpg';

    this.set('photo1', photo1);
    this.set('photo2', photo2);
    this.set('photo3', photo3);

    await render(hbs`<RegistrationPhotos @setChosenPhoto={{this.photo1}} /> `);

    assert.dom('[data-test-photo-owl]').exists();
    assert
      .dom('[data-test-photo-owl]')
      .hasAttribute(
        'src',
        `/assets/images/images-for-user-registration/${this.photo1}`
      );
    assert.dom('[data-test-photo-owl]').hasValue(`${this.photo1}`);

    await render(hbs`<RegistrationPhotos @setChosenPhoto={{this.photo2}} /> `);

    assert.dom('[data-test-photo-parrot]').exists();
    assert
      .dom('[data-test-photo-parrot]')
      .hasAttribute(
        'src',
        `/assets/images/images-for-user-registration/${this.photo2}`
      );
    assert.dom('[data-test-photo-parrot]').hasValue(`${this.photo2}`);

    await render(hbs`<RegistrationPhotos @setChosenPhoto={{this.photo3}} /> `);
    assert.dom('[data-test-photo-robin]').exists();
    assert
      .dom('[data-test-photo-robin]')
      .hasAttribute(
        'src',
        `/assets/images/images-for-user-registration/${this.photo3}`
      );
    assert.dom('[data-test-photo-robin]').hasValue(`${this.photo3}`);
  });
});
