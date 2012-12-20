define({

	// Load a basic theme. This is just a CSS file, and since a moduleLoader is
	// configured in run.js, curl knows to load this as CSS.
	theme: { module: 'theme/basic.css' },

	controller: {
		create: 'welcome/controller',
		on: {
			theForm: {
				// Handle the form submit. Transform the form into
				// an object hash for easier consumption
				'submit': 'formParser.getValues | doStuff'
			}
		}
	},

	formParser: { module: 'cola/dom/form' },

	// Create a cola Model to which we'll bind data and a form
	thing: { create: 'cola/Model' },

	// Create a simple view by rendering html, replacing some i18n strings
	// and loading CSS.  Then, insert into the DOM
	theForm: {
		render: {
			template: { module: 'text!welcome/template.html' },
			css: { module: 'css!welcome/structure.css' }
		},
		insert: { at: 'dom.first!body' },
		bind: {
			to: { $ref: 'thing' }
		}
	},

	// Use a simple object literal as the data source.
	// cola will automatically wrap this in an Object adapter
	thingData: {
		literal: {
			firstName: "Jane",
			lastName: "Doe",
			gender: "f"
		},
		bind: {
			to: { $ref: 'thing' }
		}
	},

	// Wire.js plugins
	plugins: [
		{ module: 'wire/debug' },
		{ module: 'cola' },
		{ module: 'wire/on' },
		{ module: 'wire/dom', classes: { init: 'loading' } },
		{ module: 'wire/dom/render' }
	]
});