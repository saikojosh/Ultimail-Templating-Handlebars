# Ultimail-Templating-Handlebars
Templating middleware for [Ultimail](https://www.npmjs.org/package/ultimail) that adds support for parsing Handlebars templates.

## Included by Default
This module is included by default in [Ultimail](https://www.npmjs.org/package/ultimail) so there's no need to require and configure it manually.

## Quick Start
You need to configure this middleware as "templating" middleware using `mailer.configure()` method:

```javascript
const Ultimail = require(`ultimail`);
const ultimailTemplatingHandlebars = require(`ultimail-templating-handlebars`);

const mailer = new Ultimail({
	from: `some@email.com`,
	styles: true,
});

mailer.configure(`templating`, ultimailTemplatingHandlebars());
```
