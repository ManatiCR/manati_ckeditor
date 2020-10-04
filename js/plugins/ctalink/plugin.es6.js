/**
 * @file
 * CTALink CKEditor plugin.
 *
 * Basic plugin inserting anchor elements into the CKEditor editing area.
 *
 */

// eslint-disable-next-line func-names
(function ($, Drupal, CKEDITOR) {
  CKEDITOR.plugins.add('manati_ckeditor_ctalink', {
    icons: 'ctalink',
    init(editor) {
      // Define an editor command that opens our dialog window.
      // eslint-disable-next-line new-cap
      editor.addCommand('ctalink', new CKEDITOR.dialogCommand('ctalinkDialog'));
      // Create a toolbar button that executes the above command.
      editor.ui.addButton('ctalink', {
        label: Drupal.t('Insert link as CTA'),
        command: 'ctalink',
        toolbar: 'insert',
      });
      // eslint-disable-next-line no-shadow
      CKEDITOR.dialog.add('ctalinkDialog', (editor) => {
        // Dialog definition.
        return {
          // Basic properties of the dialog window.
          allowedContent: 'a[href,class]',
          title: Drupal.t('Add CTA link'),
          minWidth: 400,
          minHeight: 100,
          resizable: CKEDITOR.DIALOG_RESIZE_NONE,
          contents: [
            {
              // Definition of the settings dialog tab.
              id: 'tab-settings',
              label: 'Settings',
              // The tab content.
              elements: [
                {
                  type: 'text',
                  id: 'edp-text-display',
                  label: Drupal.t('Text to display'),
                  validate: CKEDITOR.dialog.validate.notEmpty(
                    Drupal.t('The text field cannot be empty.'),
                  ),
                },
                {
                  type: 'text',
                  id: 'edp-url',
                  label: Drupal.t('URL'),
                  validate: CKEDITOR.dialog.validate.notEmpty(
                    Drupal.t('The URL field cannot be empty.'),
                  ),
                },
              ],
            },
          ],
          onOk() {
            const element = editor.document.createElement('a');
            element.setAttributes({
              href: this.getValueOf('tab-settings', 'edp-url'),
              class: 'button button--outline',
            });
            element.setText(
              this.getValueOf('tab-settings', 'edp-text-display'),
            );
            editor.insertElement(element);
          },
          onShow() {
            // Fix the Cannot use CKEditor modals in Layout Builder.
            // @see https://www.drupal.org/node/3063834
            const orgAllowInteraction = $.ui.dialog.prototype._allowInteraction;
            $.ui.dialog.prototype._allowInteraction = (event) => {
              if ($(event.target).closest('.cke_dialog').length) {
                return true;
              }
              // eslint-disable-next-line prefer-rest-params
              return orgAllowInteraction.apply(this, arguments);
            };
          },
        };
      });
    },
  });
})(jQuery, Drupal, CKEDITOR);
