Jinrikisha.namespace('Jinrikisha.Graph.Renderer.Line');

Jinrikisha.Graph.Renderer.Line = Jinrikisha.Class.create( Jinrikisha.Graph.Renderer, {

	name: 'line',

	defaults: function($super) {

		return Jinrikisha.extend( $super(), {
			unstack: true,
			fill: false,
			stroke: true
		} );
	},

	seriesPathFactory: function() {

		var graph = this.graph;

		return d3.svg.line()
			.x( function(d) { return graph.x(d.x) } )
			.y( function(d) { return graph.y(d.y) } )
			.interpolate(this.graph.interpolation).tension(this.tension);
	}
} );

