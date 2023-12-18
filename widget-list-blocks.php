<?php

/**
 * Plugin Name: Widget List Block
 * Plugin URI: https://github.com/HelloTalib/widget-list-block
 * Description: Gutenberg widget-list plugins for create new blocks
 * Version: 1.0.0
 * Author: TALIB
 * Author URI: https://bdthemes.com
 * License: GPLv3
 * Text Domain: widget-list-block
 * Domain Path: /languages/
 */

// Stop Direct Access
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Blocks Final Class
 */

final class WIDGET_LIST_BLOCK {
	public function __construct() {

		// define constants
		$this->gutenberg_block_define_constants();

		// block initialization
		add_action('init', [$this, 'widget_list_block_init']);

		// blocks category
		if (version_compare($GLOBALS['wp_version'], '5.7', '<')) {
			add_filter('block_categories', [$this, 'gutenberg_block_register_category'], 10, 2);
		} else {
			add_filter('block_categories_all', [$this, 'gutenberg_block_register_category'], 10, 2);
		}

		// enqueue block assets
		add_action('enqueue_block_assets', [$this, 'gutenberg_block_external_libraries']);
	}

	/**
	 * Initialize the plugin
	 */

	public static function init() {
		static $instance = false;
		if (!$instance) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Define the plugin constants
	 */
	private function gutenberg_block_define_constants() {
		define('WLB_VERSION', '1.0.0');
		define('WLB_URL', plugin_dir_url(__FILE__));
		define('WLB_LIB_URL', WLB_URL . 'library/');
	}

	/**
	 * Blocks Registration
	 */

	public function gutenberg_block_register($name, $options = array()) {
		register_block_type(__DIR__ . '/build/blocks/' . $name, $options);
	}

	/**
	 * Blocks Initialization
	 */
	public function widget_list_block_init() {
		// register single block
		$this->gutenberg_block_register('widget-list');
	}

	/**
	 * Register Block Category
	 */

	public function gutenberg_block_register_category($categories, $post) {
		return array_merge(
			array(
				array(
					'slug'  => 'widget-list-block',
					'title' => __('Widget List Blockt', 'widget-list-block'),
				),
			),
			$categories,
		);
	}

	/**
	 * Enqueue Block Assets
	 */
	public function gutenberg_block_external_libraries() {
		// enqueue JS
		wp_enqueue_script('external-js', WLB_LIB_URL . 'js/plugin.js', array(), WLB_VERSION, true);
	}
}

/**
 * tech
 */

WIDGET_LIST_BLOCK::init();
