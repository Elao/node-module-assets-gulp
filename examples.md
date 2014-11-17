---
layout: page
title: Examples
permalink: /examples/
---

[jQuery](http://jquery.com/)
----------------------------

Works either for jQuery 1 or jQuery 2

**package.json**:

{% highlight Json %}
"dependencies": {
    "jquery": "1.11.1"
}
{% endhighlight %}

**main.js**:

{% highlight JavaScript %}
// JQuery
var $ = require('jquery');
{% endhighlight %}

[Bootstrap 3 - Sass](http://getbootstrap.com/)
----------------------------------------------

**package.json**:

{% highlight Json %}
"dependencies": {
    "bootstrap-sass": "3.3.1"
},
"browser": {
    "bootstrap.alert"      : "./node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js",
    "bootstrap.collapse"   : "./node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js"
    ...
},
"browserify-shim": {
    "bootstrap.alert"      : {"depends": "jquery:jQuery"},
    "bootstrap.collapse"   : {"depends": "jquery:jQuery"}
    ...
}
{% endhighlight %}

**gulpfile.js**:

{% highlight JavaScript %}
assets.config({
    assets: {
        fonts: {
            groups: {
                'bootstrap': {src: 'bootstrap-sass/assets/fonts/bootstrap/*'}
            }
        }
    }
});
{% endhighlight %}

**main.js**:

{% highlight JavaScript %}
// JQuery
var $ = require('jquery');

// Bootstrap
require('bootstrap.alert');
require('bootstrap.collapse');
// ...
{% endhighlight %}

**main.scss**:

{% highlight Scss %}
// Typography
$icon-font-path: '../fonts/';

// Core variables and mixins
@import 'bootstrap-sass/assets/stylesheets/bootstrap/variables';
@import 'bootstrap-sass/assets/stylesheets/bootstrap/mixins';

// Reset and dependencies
@import 'bootstrap-sass/assets/stylesheets/bootstrap/normalize';
@import 'bootstrap-sass/assets/stylesheets/bootstrap/print';
@import 'bootstrap-sass/assets/stylesheets/bootstrap/glyphicons';

// Core CSS
@import 'bootstrap-sass/assets/stylesheets/bootstrap/scaffolding';
@import 'bootstrap-sass/assets/stylesheets/bootstrap/type';
// ...

// Bootstrap - Components
@import 'bootstrap-sass/assets/stylesheets/bootstrap/component-animations';
@import 'bootstrap-sass/assets/stylesheets/bootstrap/dropdowns';
// ...
{% endhighlight %}


[Bootstrap 3 - Less](http://getbootstrap.com/)
----------------------------------------------

**package.json**:

{% highlight Json %}
"dependencies": {
    "bootstrap": "3.3.1"
},
"browser": {
    "bootstrap.alert"      : "./node_modules/bootstrap/js/alert.js",
    "bootstrap.collapse"   : "./node_modules/bootstrap/js/collapse.js"
    ...
},
"browserify-shim": {
    "bootstrap.alert"      : {"depends": "jquery:jQuery"},
    "bootstrap.collapse"   : {"depends": "jquery:jQuery"}
    ...
}
{% endhighlight %}

**gulpfile.js**:

{% highlight JavaScript %}
assets.config({
    assets: {
        fonts: {
            groups: {
                'bootstrap': {src: 'bootstrap/fonts/*'}
            }
        }
    }
});
{% endhighlight %}

**main.js**:

{% highlight JavaScript %}
// JQuery
var $ = require('jquery');

// Bootstrap
require('bootstrap.alert');
require('bootstrap.collapse');
// ...
{% endhighlight %}

**main.less**:

{% highlight Less %}

// Core variables and mixins
@import 'bootstrap/less/variables.less';
@import 'bootstrap/less/mixins.less';

// Reset and dependencies
@import 'bootstrap/less/normalize.less';
@import 'bootstrap/less/print.less';
@import 'bootstrap/less/glyphicons.less';

// Core CSS
@import 'bootstrap/less/scaffolding.less';
@import 'bootstrap/less/type.less';
// ...

// Bootstrap - Components
@import 'bootstrap/less/component-animations.less';
@import 'bootstrap/less/dropdowns.less';
// ...
{% endhighlight %}
