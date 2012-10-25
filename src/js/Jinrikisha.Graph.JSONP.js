Jinrikisha.namespace('Jinrikisha.Graph.JSONP');

Jinrikisha.Graph.JSONP = Jinrikisha.Class.create( Jinrikisha.Graph.Ajax, {

	request: function() {

		$.ajax( {
			url: this.dataURL,
			dataType: 'jsonp',
			success: this.success.bind(this),
			error: this.error.bind(this)
		} );
	}
} );
