var UpGrowth = UpGrowth || {};

UpGrowth.security = {};

UpGrowth.security.passwordLevel = function(pass) {
    var lvl = 0;
    
    if(pass.length > 6) {
        lvl++;
    } else if(pass.lenght > 8) {
        lvl++;
    } else if(pass.lenght > 10) {
        lvl++;
    }
    
    return lvl;
};

UpGrowth.security.encoding = function(pass) {
    return UpGrowth.http().get({url: UpGrowth.constants.url + '/encoding', data: pass});
};

UpGrowth.security.decoding = function(pass) {
    return UpGrowth.http().get({url: UpGrowth.constants.url + '/decoding', data: pass});
};

UpGrowth.security.login = function(user, pass) {
    var p = encoding(pass);
    UpGrowth.http().get({url: UpGrowth.constants.url + '/login', data: {user: user, pass: pass})
    .success(function() {
        UpGrowth.page.init('.main', UpGrowth.constants.url+ "/home");
    })
    .error(
        UpGrowth.page.init('.main', UpGrowth.constants.url + "/error");
    );
};