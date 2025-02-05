/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { __experimentalUseNavigator as useNavigator } from '@wordpress/components';

/**
 * Internal dependencies
 */
import SidebarNavigationScreen from '../sidebar-navigation-screen';
import { store as editSiteStore } from '../../store';
import {
	TEMPLATE_POST_TYPE,
	TEMPLATE_PART_POST_TYPE,
} from '../../utils/constants';

const config = {
	[ TEMPLATE_POST_TYPE ]: {
		title: __( 'All templates' ),
		description: __(
			'Create new templates, or reset any customizations made to the templates supplied by your theme.'
		),
	},
	[ TEMPLATE_PART_POST_TYPE ]: {
		title: __( 'All template parts' ),
		description: __(
			'Create new template parts, or reset any customizations made to the template parts supplied by your theme.'
		),
		backPath: '/patterns',
	},
};

export default function SidebarNavigationScreenTemplatesBrowse() {
	const {
		params: { postType },
	} = useNavigator();

	const isTemplatePartsMode = useSelect( ( select ) => {
		const settings = select( editSiteStore ).getSettings();

		return !! settings.supportsTemplatePartsMode;
	}, [] );

	return (
		<SidebarNavigationScreen
			isRoot={ isTemplatePartsMode }
			title={ config[ postType ].title }
			description={ config[ postType ].description }
			backPath={ config[ postType ].backPath }
		/>
	);
}
