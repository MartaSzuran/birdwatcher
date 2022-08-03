import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | registration-photos', function (hooks) {
  setupRenderingTest(hooks);

  test('check if photos exists', async function (assert) {
    await render(hbs`<RegistrationPhotos/>`);

    assert.dom('[data-test-photo1]').exists();
    assert.dom('[data-test-photo2]').exists();
    assert.dom('[data-test-photo3]').exists();
  });

  test('check if photos has proper atrribute src', async function (assert) {
    await render(hbs`<RegistrationPhotos/>`);
    assert
      .dom('[data-test-photo1]')
      .hasAttribute(
        'src',
        '/assets/images/images-for-user-registration/owl.jpg'
      );
    assert
      .dom('[data-test-photo2]')
      .hasAttribute(
        'src',
        '/assets/images/images-for-user-registration/parrot.jpg'
      );
    assert
      .dom('[data-test-photo3]')
      .hasAttribute(
        'src',
        '/assets/images/images-for-user-registration/robin.jpg'
      );
  });

  test('check photos value', async function (assert) {
    await render(hbs`<RegistrationPhotos/>`);
    assert.dom('[data-test-photo1]').hasValue('owl.jpg');
    assert.dom('[data-test-photo2]').hasValue('parrot.jpg');
    assert.dom('[data-test-photo3]').hasValue('robin.jpg');
  });
});
