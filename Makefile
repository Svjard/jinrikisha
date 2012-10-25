NODE_PREFIX=.
NODE_MODULES=$(NODE_PREFIX)/node_modules

CSS_MIN=$(NODE_MODULES)/.bin/cleancss
JS_MIN=$(NODE_MODULES)/.bin/uglifyjs

CSS_FILES=\
	src/css/detail.css\
	src/css/graph.css\
	src/css/legend.css\

JS_FILES=\
	src/js/Jinrikisha.js\
	src/js/Jinrikisha.Class.js\
	src/js/Jinrikisha.Compat.ClassList.js\
	src/js/Jinrikisha.Graph.js\
	src/js/Jinrikisha.Fixtures.Color.js\
	src/js/Jinrikisha.Fixtures.RandomData.js\
	src/js/Jinrikisha.Fixtures.Time.js\
	src/js/Jinrikisha.Fixtures.Number.js\
	src/js/Jinrikisha.Color.Palette.js\
	src/js/Jinrikisha.Graph.Ajax.js\
	src/js/Jinrikisha.Graph.Annotate.js\
	src/js/Jinrikisha.Graph.Axis.Time.js\
	src/js/Jinrikisha.Graph.Axis.Y.js\
	src/js/Jinrikisha.Graph.Behavior.Series.Highlight.js\
	src/js/Jinrikisha.Graph.Behavior.Series.Order.js\
	src/js/Jinrikisha.Graph.Behavior.Series.Toggle.js\
	src/js/Jinrikisha.Graph.HoverDetail.js\
	src/js/Jinrikisha.Graph.JSONP.js\
	src/js/Jinrikisha.Graph.Legend.js\
	src/js/Jinrikisha.Graph.Renderer.js\
	src/js/Jinrikisha.Graph.Renderer.Line.js\
	src/js/Jinrikisha.Graph.Renderer.Stack.js\
	src/js/Jinrikisha.Graph.Renderer.Bar.js\
	src/js/Jinrikisha.Graph.Renderer.Area.js\
	src/js/Jinrikisha.Graph.Renderer.ScatterPlot.js\
	src/js/Jinrikisha.Graph.Smoother.js\
	src/js/Jinrikisha.Graph.Unstacker.js\
	src/js/Jinrikisha.Series.js\
	src/js/Jinrikisha.Series.FixedDuration.js\

.PHONY: clean build

build: jinrikisha.min.css jinrikisha.min.js

clean:
	rm -rf jinrikisha.css jinrikisha.js jinrikisha.min.*

$(CSS_MIN):
	npm install clean-css

$(JS_MIN):
	npm install uglify-js

jinrikisha.css:
	cat $(CSS_FILES) > jinrikisha.css

jinrikisha.js:
	cat $(JS_FILES) > jinrikisha.js

jinrikisha.min.css: $(CSS_MIN) jinrikisha.css
	$(CSS_MIN) jinrikisha.css > jinrikisha.min.css

jinrikisha.min.js: $(JS_MIN) jinrikisha.js
	$(JS_MIN) --reserved-names "\$$super" jinrikisha.js > jinrikisha.min.js
