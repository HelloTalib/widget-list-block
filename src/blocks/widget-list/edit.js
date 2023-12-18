/* eslint-disable @wordpress/no-unsafe-wp-apis */
/* eslint-disable jsx-a11y/anchor-is-valid */

const { useState } = wp.element;
const { useEffect } = wp.element;
// editor style
import './editor.scss';
const { Fragment } = wp.element;
const { __ } = wp.i18n;

import buildURL from '../../utilities/buildURL';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	__experimentalNumberControl as NumberControl,
	PanelBody,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const [isLoading, setIsLoading] = useState(false);
	// const [widgets, setWidgets] = useState([]);
	const getWidgetList = async () => {
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
						// 'widget_type': 'pro',
						widget_categories: 'element-pack',
						widget_tag: '',
						widget_author: '',
						widget_author_role: '',
					}
				)
			);

			const data = await response.json();
			// setWidgets(data);
			setAttributes({ widgets: data });
		} catch (error) {
			// console.error('Error fetching widget list:', error);
			// Handle error as needed
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		getWidgetList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [attributes.perPage]);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Heading Layout', 'gutenberg-tech')}>
					<NumberControl
						label={__('Per Page', 'gutenberg-tech')}
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
					<div className="loading-message">Loading...</div>
				) : (
					<div className="grid-container">
						{attributes.widgets.map((widget) => (
							<div className="grid-item" key={widget.id}>
								<a
									href={widget.demo_link}
									className="bdt-widget-list-item"
								>
									<div className="bdt-widget-list-icon">
										<img
											src={widget.image}
											width="100"
											height="100"
											alt=""
										/>
									</div>
									<div className="bdt-widget-list-title">
										{widget.title}
									</div>
									<div className="bdt-widget-list-badge">
										<span className="bdt-widget-type">
											{widget.pro_widget === '1'
												? 'pro'
												: 'free'}
										</span>
									</div>
								</a>
							</div>
						))}
					</div>
				)}
			</div>
		</Fragment>
	);
}
