var Jinrikisha = require('../jinrikisha');

exports.load = function(test) {

	test.equal(typeof Jinrikisha.Class, 'object', 'Jinrikisha.Class is a function');
	test.done();
};

exports.instantiation = function(test) {

	Jinrikisha.namespace('Jinrikisha.Sample.Class');

	Jinrikisha.Sample.Class = Jinrikisha.Class.create({
		name: 'sample',
		concat: function(suffix) {
			return [this.name, suffix].join(' ');
		}
	});

	var sample = new Jinrikisha.Sample.Class();
	test.equal(sample.concat('polka'), 'sample polka');

	Jinrikisha.namespace('Jinrikisha.Sample.Class.Prefix');

	Jinrikisha.Sample.Subclass = Jinrikisha.Class.create( Jinrikisha.Sample.Class, {
		name: 'sampler',
	});

	var sampler = new Jinrikisha.Sample.Subclass();
	test.equal(sampler.concat('polka'), 'sampler polka');
	
	test.done();
};

exports.array = function(test) {

	Jinrikisha.namespace('Jinrikisha.Sample.Array');

	Jinrikisha.Sample.Array = Jinrikisha.Class.create(Array, {
		second: function() {
			return this[1];
		}
	});

	var array = new Jinrikisha.Sample.Array();
	array.push('red');
	array.push('blue');

	test.equal(array.second(), 'blue');

	test.done();
};
