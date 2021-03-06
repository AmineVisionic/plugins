<?php
/* Generated on 14.02.18 14:28 by globalsync
 * $Id: $
 * $Log: $
 */

require_once 'EbatNs_FacetType.php';

class SellerLevelCodeType extends EbatNs_FacetType
{
	const CodeType_Bronze = 'Bronze';
	const CodeType_Silver = 'Silver';
	const CodeType_Gold = 'Gold';
	const CodeType_Platinum = 'Platinum';
	const CodeType_Titanium = 'Titanium';
	const CodeType_None = 'None';
	const CodeType_CustomCode = 'CustomCode';

	/**
	 * @return 
	 **/
	function __construct()
	{
		parent::__construct('SellerLevelCodeType', 'urn:ebay:apis:eBLBaseComponents');
	}
}
$Facet_SellerLevelCodeType = new SellerLevelCodeType();
?>