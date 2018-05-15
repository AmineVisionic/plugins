<?php
/**
 * Booster for WooCommerce - Settings Meta Box - Product Availability by Date
 *
 * @version 3.4.0
 * @since   2.9.1
 * @author  Algoritmika Ltd.
 * @todo    (maybe) Direct Date: all products
 * @todo    (maybe) Direct Date: option to disable months in admin product edit page
 * @todo    (maybe) Direct Date: add time also
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

$settings = array(
	array(
		'title'    => __( 'Enable/Disable per Product Settings', 'woocommerce-jetpack' ),
		'name'     => 'wcj_product_by_date_enabled',
		'default'  => 'no',
		'type'     => 'select',
		'options'  => array(
			'no'  => __( 'Disabled', 'woocommerce-jetpack' ),
			'yes' => __( 'Enabled', 'woocommerce-jetpack' ),
		),
//		'tooltip'  => __( 'Date formats:', 'woocommerce-jetpack' ) . ' ' . '<code>DD-DD</code>' . ', ' . '<code>DD-DD,DD-DD</code>' . ', ' . '<code>-</code>' . '.',
	),
	array(
		'title'    => __( 'Direct Date', 'woocommerce-jetpack' ),
		'name'     => 'wcj_product_by_date_direct_date',
		'default'  => '',
		'type'     => 'date',
		'tooltip'  => __( 'Fill this if you want to set one date from which the product will be available.', 'woocommerce-jetpack' ) . ' ' .
			__( 'If this field is filled in, monthly settings fields are ignored.', 'woocommerce-jetpack' ),
	),
);
$_timestamp = 1; //  January 1 1970
for ( $i = 1; $i <= 12; $i++ ) {
	$settings = array_merge( $settings, array(
		array(
			'title'    => date_i18n( 'F', $_timestamp ),
			'name'     => 'wcj_product_by_date_' . $i,
			'default'  => '',
			'type'     => 'text',
			'css'      => 'width:300px;',
		),
	) );
	$_timestamp = strtotime( '+1 month', $_timestamp );
}
return $settings;