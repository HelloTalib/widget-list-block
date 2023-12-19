/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable @wordpress/no-unsafe-wp-apis */
/* eslint-disable jsx-a11y/anchor-is-valid */

const { useState, useEffect } = wp.element;
// editor style
import './editor.scss';
const { Fragment } = wp.element;
const { __ } = wp.i18n;

import buildURL from '../../utilities/buildURL';
import ShadowRootComponent from '../../utilities/shadowRoot';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	__experimentalNumberControl as NumberControl,
	PanelBody,
} from '@wordpress/components';

const HEADING_LAYOUT_LABEL = __('Heading Layout', 'gutenberg-tech');
const PER_PAGE_LABEL = __('Per Page', 'gutenberg-tech');

const LoadingMessage = () => <div className="loading-message">Loading...</div>;

const fetchWidgetList = async (attributes, setAttributes, setIsLoading) => {
	try {
		setIsLoading(true);
		const response = await fetch(
			buildURL(
				'https://dashboard.bdthemes.io/wp-json/bdthemes/v1/widget-list',
				{
					page: 1,
					per_page: attributes.perPage,
					search: '',
					orderby: 'title',
					order: 'desc',
					widget_categories: 'element-pack',
					widget_tag: '',
					widget_author: '',
					widget_author_role: '',
				}
			)
		);

		const data = await response.json();
		setAttributes({ widgets: data });
	} catch (error) {
		// Handle error as needed
	} finally {
		setIsLoading(false);
	}
};



export default function Edit({ attributes, setAttributes }) {
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		fetchWidgetList(attributes, setAttributes, setIsLoading);
	}, [attributes.perPage]);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={HEADING_LAYOUT_LABEL}>
					<NumberControl
						label={PER_PAGE_LABEL}
						value={attributes.perPage}
						onChange={(perPage) => setAttributes({ perPage })}
						min={1}
						max={100}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<h3 className="heading">Element Pack Widget List</h3>
				{isLoading ? (
					<LoadingMessage />
				) : (
					<div className="zolo-container">
						<div className="zolo-blocks-list-wrap zolo-blocks__grid">
							{attributes.widgets.map((widget) => (
								<a
									href={widget.demo_link}
									className="zolo-block-list-item"
									key={widget.id}
								>
										<ShadowRootComponent image={widget.load_svg}/>
									<div className="zolo-block-list-title">
										{widget.title}
									</div>
									<div className="zolo-block-list-badge">
										<span className="zolo-block-type zolo-free">
											Free
										</span>
										<span className="zolo-block-type zolo-popular">
											Popular
										</span>
									</div>
								</a>
							))}
						</div>
					</div>
				)}
			</div>
		</Fragment>
	);
}
