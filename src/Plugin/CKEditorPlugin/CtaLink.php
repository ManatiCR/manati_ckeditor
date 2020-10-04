<?php

namespace Drupal\manati_ckeditor\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "CTALink" plugin.
 *
 * @CKEditorPlugin(
 *   id = "manati_ckeditor_ctalink",
 *   label = @Translation("CTALink"),
 *   module = "manati_ckeditor"
 * )
 */
class CtaLink extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return drupal_get_path('module', 'manati_ckeditor') . '/js/plugins/ctalink/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function isInternal() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    $module_path = drupal_get_path('module', 'manati_ckeditor');
    return [
      'ctalink' => [
        'label' => $this->t('CTA link'),
        'image' => $module_path . '/js/plugins/ctalink/icons/ctalink.png',
      ],
    ];
  }

}
