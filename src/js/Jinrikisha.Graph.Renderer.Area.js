Jinrikisha.namespace('Jinrikisha.Graph.Renderer.Area');

Jinrikisha.Graph.Renderer.Area = Jinrikisha.Class.create( Jinrikisha.Graph.Renderer, {

	name: 'area',

	defaults: function($super) {

		return Jinrikisha.extend( $super(), {
			unstack: false,
			fill: false,
			stroke: false
		} );
	},

	seriesPathFactory: function() {

		var graph = this.graph;

		return d3.svg.area()
			.x( function(d) { return graph.x(d.x) } )
			.y0( function(d) { return graph.y(d.y0) } )
			.y1( function(d) { return graph.y(d.y + d.y0) } )
			.interpolate(graph.interpolation).tension(this.tension);
	},

	seriesStrokeFactory: function() {

		var graph = this.graph;

		return d3.svg.line()
			.x( function(d) { return graph.x(d.x) } )
			.y( function(d) { return graph.y(d.y + d.y0) } )
			.interpolate(graph.interpolation).tension(this.tension);
	},

	render: function() {

		var graph = this.graph;

		graph.vis.selectAll('*').remove();

		var nodes = graph.vis.selectAll("path")
			.data(this.graph.stackedData)
			.enter().insert("svg:g", 'g');

		nodes.append("svg:path")
			.attr("d", this.seriesPathFactory())
			.attr("class", 'area');

		if (this.stroke) {
			nodes.append("svg:path")
				.attr("d", this.seriesStrokeFactory())
				.attr("class", 'line');
		}

		var i = 0;
		graph.series.forEach( function(series) {
			if (series.disabled) return;
			series.path = nodes[0][i++];
			this._styleSeries(series);
		}, this );
	},

	_styleSeries: function(series) {

		if (!series.path) return;

		d3.select(series.path).select('.area')
			.attr('fill', series.color);

		if (this.stroke) {
			d3.select(series.path).select('.line')
				.attr('fill', 'none')
				.attr('stroke', series.stroke || d3.interpolateRgb(series.color, 'black')(0.125))
				.attr('stroke-width', this.strokeWidth);
		}

		if (series.className) {
			series.path.setAttribute('class', series.className);
		}
	}
} );

