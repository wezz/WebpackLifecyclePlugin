module.exports = class LifecyclePlugin
{
	constructor(options)
	{
		this.options = options ? options :
		{};
	}
	apply(compiler)
	{
		const pluginOptions = this.options;
		// https://webpack.js.org/api/compiler/#event-hooks
		const hooksWithOneParam = [
			"after-plugins",
			"after-resolvers",
			"before-run",
			"run",
			"watch-run",
			"normal-module-factory",
			"context-module-factory",
			"before-compile",
			"compile",
			"this-compilation",
			"compilation",
			"make",
			"after-compile",
			"should-emit",
			"emit",
			"after-emit",
			"done",
			"failed"
		];
		const hooksWithTwoParams = ["invalid"]

		const hooksWithoutParam = [
			"entry-option",
			"environment",
			"after-environment",
			"need-additional-pass",
			"watch-close"
		];


		hooksWithOneParam
		.filter(x => typeof pluginOptions[x] === "function")
		.forEach((hook) =>
		{
			compiler.plugin(hook, function(paramOne, callback)
			{
				pluginOptions[hook](paramOne, this.options, pluginOptions);
				(typeof callback === "function") && callback();
			});
		});

		hooksWithTwoParams
		.filter(x => typeof pluginOptions[x] === "function")
		.forEach((hook) =>
		{
			compiler.plugin(hook, function(paramOne, paramTwo, callback)
			{
				pluginOptions[hook](paramOne, paramTwo, this.options, pluginOptions);
				(typeof callback === "function") && callback();
			});
		});

		hooksWithoutParam
		.filter(x => typeof pluginOptions[x] === "function")
		.forEach((hook) =>
		{
			compiler.plugin(hook, function(callback)
			{
				pluginOptions[hook](this.options, pluginOptions);
				(typeof callback === "function") && callback();
			});
		});
	}
}
