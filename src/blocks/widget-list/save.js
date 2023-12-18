/* eslint-disable jsx-a11y/anchor-is-valid */

const Save = ({ attributes }) => {
	const widgets = attributes.widgets || [];
	return (
		<div>
			<h3 className="heading">Element Pack Widget List</h3>
			<div className="grid-container">
				{widgets.map((widget) => (
					<div className="grid-item" key={widget.id}>
						<a href="#" className="bdt-widget-list-item">
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
									{widget.pro_widget === '1' ? 'pro' : 'free'}
								</span>
							</div>
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default Save;
