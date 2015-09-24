/* *
 * Bundle para mensagens e textos.
 *
 * @author renantdesouza.
 * @since 22/09/2015.
 **/
var UpGrowth = UpGrowth || {};

UpGrowth.bundle = {};

// Línguas disponíveis.
UpGrowth.bundle.languages = {
    _pt : 'pt-BR',
    _en : 'en-US'
};

var _defaultLanguage = UpGrowth.bundle.languages._pt;

// Língua selecionada.
UpGrowth.bundle._language = _defaultLanguage;

var init = function(deferred) {
    $.i18n.properties({
        name:'message', 
        path:'message/', 
        mode:'map',
        callback: deferred.resolve,
        language: UpGrowth.bundle._language
    });
    return $i18n.prop;
};

UpGrowth.bundle.apply = function(container, language) {
    return load(language ? language : _defaultLanguage)
    .done(function() {
		$(container).find("[data-bundle]").each(function(i, obj) {
			obj = $(obj)
			obj.removeClass('bundle');
			var string = this.getValue(obj.attr('data-bundle'));

            if (obj.is('input[type=text]')) {
                obj.attr("placeholder", string);
            } else if (obj.is('optgroup')) {
                obj.attr('label', string);
            } else if (obj.is('input')) {
				obj.val(string);
			} else {
				obj.html(string);
			}
		});
	});
};

// Devolve o valor do atributo registrado no bundle
UpGrowth.bundle.getValue = function(name) {
    return init($Deferred)(name);
}

var load = function(newLanguage) {
    var deferred = $.Deferred();
	if($.isEmptyObject($.i18n.map) 
       || (UpGrowth.bundle._language != newLanguage 
           && UpGrowth.bundle.languageExist(newLanguage))) 
    {
        UpGrowth.bundle._language = newLanguage;
        init(deferred);
	} else {
		deferred.resolve();
	}
	return deferred.promise();
};

UpGrowth.bundle.changeLanguage = function(language)  {
    UpGrowth.bundle.apply('html', language);
};

// verifica se a linguagem existe entre os bundles.
UpGrowth.bundle.languageExist = function(language)  {
    var languages = UpGrowth.bundle.languages;
    for(var k in languages) {
        if(language === languages[k]) return true;
    }
    return false;
};

UpGrowth.bundle.getDefaultLanguage = function() {
    return _defaultLanguage;
}