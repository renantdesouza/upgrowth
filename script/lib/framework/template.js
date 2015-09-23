/* *
 * Controlador para templates.
 * 
 * @author renantdesouza
 * @since 22/09/2015
 **/
var UpGrowth = UpGrowth || {};

UpGrowth.template = {};

// Carrega página dentro de um container (data não é necessário).
UpGrowth.template.load = function(url, container, data) {
    var deferred = $.Deferred();
	
    getTemplate(url)    
    .done(function(template) {
        // Coloca no cache o objeto para ser apresentado na tela.
        var html = template(data);
		$(container).html(html);
		
        UpGrowth.bundle.apply(container, UpGrowth.bundle._language)
        .done(function() {
			deferred.resolve();
		});
	});
	
	return deferred.promise();
};

// Mantém o objeto em cache.
var _cache = {};

// Captura o template pela url.
var getTemplate = function (url) {
	var deferred = $.Deferred();
	if(_cache[url]) {
		deferred.resolve(ICTS.Template._cache[url]);
	} else {
		$.get(url)
        .done(function(result) {
			var compiled = Handlebars.compile(result);
			_cache[url] = compiled;
			deferred.resolve(compiled);
		});
	}
	
	return deferred.promise();
};