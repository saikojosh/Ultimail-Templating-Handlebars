'use strict';

/*
 * ULTIMAIL TEMPLATING HANDLEBARS
 */

const extender = require(`object-extender`);
const Handlebars = require(`handlebars`);

/*
 * Parses the variables in the templates and combines with the layout template if one is given.
 */
function parseTemplates (property, actualTemplate, layoutTemplate, variables) {

	let output;

	// Render the actual template.
	try {
		const template = Handlebars.compile(actualTemplate[property]);
		output = template(variables);
	}
	catch (err) {
		throw new Error(`Failed to render the actual template: ${err}.`);
	}

	// Render the layout template?
	if (layoutTemplate) {
		try {
			const template = Handlebars.compile(layoutTemplate[property]);

			// Merge the actual template into the layout, without mutating the variables object.
			const clonedVariables = extender.merge(variables, { template: output });
			output = template(clonedVariables);
		}
		catch (err) {
			throw new Error(`Failed to render the layout template: "${err}".`);
		}
	}

	return output;

}

/*
 * Returns the middleware function.
 */
module.exports = function ultimailTemplatingHandlebars () {

	// The actual middleware to return.
	return (email, actualTemplate, layoutTemplate, variables, options, next) => {

		Promise.resolve()
			.then(() => parseTemplates(`htmlBody`, actualTemplate, layoutTemplate, variables))
			.then(htmlBody => email.htmlBody(htmlBody))
			.then(() => parseTemplates(`plainBody`, actualTemplate, layoutTemplate, variables))
			.then(plainBody => email.plainBody(plainBody))
			.then(() => parseTemplates(`subject`, actualTemplate, null, variables))
			.then(subject => email.subject(subject))
			.then(() => next(null))
			.catch(err => next(err));

	};

};
