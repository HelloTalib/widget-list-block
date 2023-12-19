/* eslint-disable jsx-a11y/anchor-is-valid */
const Save = ({ attributes }) => {
	const widgets = attributes.widgets || [];
	return (
		<div>
			<h3 className="heading">Element Pack Widget List</h3>
			<div className="zolo-container">
				<div className="zolo-blocks-list-wrap zolo-blocks__grid">
					{widgets.map((widget) => (
						<a
							href={widget.demo_link}
							className="zolo-block-list-item"
							key={widget.id}
						>
							<span className="zolo-block-list-icon">
									{/* Render the fetched SVG HTML */}
									<div
										dangerouslySetInnerHTML={{
											__html: widget.load_svg,
										}}
									/>
							</span>
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
		</div>
	);
};

export default Save;
