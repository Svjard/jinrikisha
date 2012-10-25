Jinrikisha.namespace('Jinrikisha.Graph.Renderer.Stack');

Jinrikisha.Graph.Renderer.Stack = Jinrikisha.Class.create( Jinrikisha.Graph.Renderer, {

	name: 'stack',

	defaults: function($super) {

		return Jinrikisha.extend( $super(), {
			fill: true,
			stroke: false,
			unstack: false
		} );
	},

	seriesPathFactory: function() {

		var graph = this.graph;

		return d3.svg.area()
			.x( function(d) { return graph.x(d.x) } )
			.y0( function(d) { return graph.y(d.y0) } )
			.y1( function(d) { return graph.y(d.y + d.y0) } )
			.interpolate(this.graph.interpolation).tension(this.tension);
	}
} );

