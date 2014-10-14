// Modules
var
    util = require('gulp-util');

// Assets
var
    Assets = function() {

        // Options
        this.options = {
            groups: [
                // Assets
                {
                    name: 'assets',
                    pattern: 'assets'
                },
                // Symfony - App
                {
                    name: 'app',
                    pattern: 'app/Resources/assets'
                },
                // Symfony - Bundles
                {
                    name: function(path) {
                        return path
                            .replace(/^src\//, '')
                            .replace(/\/Resources\/assets(.*)$/, '')
                            .replace(/Bundle/g, '')
                            .replace(/\//g, '') + 'Bundle';
                    },
                    pattern: 'src/**/*Bundle/Resources/assets'
                }
            ],
            dest: 'web/assets',
            vendors: [
                'bower_components',
                'node_modules'
            ],
            header: false,
            autoprefixer: {},
            assets: {
                js: {
                    glob:      '**/[!_]*.js',
                    globWatch: '**/[!_]*.js',
                    src:       'js',
                    dest:      'js',
                    groups:    {},
                    bundles:   {}
                },
                sass: {
                    glob:      '**/[!_]*.scss',
                    globWatch: '**/*.scss',
                    src:       'sass',
                    dest:      'css',
                    groups:    {}
                },
                images: {
                    glob:      '**',
                    globWatch: '**',
                    src:       'images',
                    dest:      'images',
                    groups:    {}
                },
                files: {
                    groups:    {}
                },
                vendors: {
                    src:       'vendors'
                }
            }
        };

        // Assets
        this.assets = {};

        // Header Meta
        this.headerMeta = null;

        // Current asset group
        this.group = util.env.group || null;
    };

// Merges two (or more) objects,
// giving the last one precedence
function merge(target, source) {
    if (typeof target !== 'object') {
        target = {};
    }
    for (var property in source) {
        if (source.hasOwnProperty(property)) {
            var
                sourceProperty = source[property];

            if (sourceProperty instanceof Array) {
                target[property] = sourceProperty;
            } else if (typeof sourceProperty === 'object') {
                target[property] = merge(target[property], sourceProperty);
                continue;
            }

            target[property] = sourceProperty;
        }
    }

    for (var a = 2, l = arguments.length; a < l; a++) {
        merge(target, arguments[a]);
    }

    return target;
};

Assets.prototype = {

    // Configuration
    config: function(options) {
        this.options = merge(this.options, options);
    },

    // Get assets
    get: function(assetType) {
        var
            glob = require('glob'),
            path = require('path');

        if (this.assets[assetType] === undefined) {

            // Initialize asset type array
            this.assets[assetType] = {};

            // Search asset type groups
            if (this.options.assets[assetType].src) {
                this.options.groups.forEach(function(group) {

                    glob.sync(group.pattern + '/' + this.options.assets[assetType].src).forEach(function(assetGroupPath) {
                        var
                            assetGroup = (typeof(group.name) == 'function') ? group.name(assetGroupPath) : group.name;

                        this.assets[assetType][assetGroup] = {
                            src:  path.resolve(assetGroupPath + (this.options.assets[assetType].glob ? '/' + this.options.assets[assetType].glob : '')),
                            dest: this.getDest(assetType)
                        };

                        // Src Watch
                        this.assets[assetType][assetGroup].srcWatch = this.options.assets[assetType].globWatch ? path.resolve(assetGroupPath + '/' + this.options.assets[assetType].globWatch) : this.assets[assetType][assetGroup].src;

                        // Bundles
                        this.assets[assetType][assetGroup].bundles = this.options.assets[assetType].bundles ? this.options.assets[assetType].bundles : {};

                        if (util.env.verbose) {
                            util.log(
                                'Found', util.colors.grey(assetType),
                                'group', "'" + util.colors.cyan(assetGroup) + "'",
                                'at', util.colors.magenta(this.assets[assetType][assetGroup].src),
                                'watching', util.colors.magenta(this.assets[assetType][assetGroup].srcWatch)
                            );
                        }
                    }.bind(this));
                }.bind(this));
            }

            // Add custom groups
            if (this.options.assets[assetType].groups) {
                Object.keys(this.options.assets[assetType].groups).forEach(function(assetGroup) {

                    var
                        assetGroupSrc = [this.options.assets[assetType].groups[assetGroup].src];

                    this.getVendors().forEach(function(vendor) {
                        assetGroupSrc.push(vendor + '/' + assetGroupSrc[0]);
                    });

                    assetGroupSrc.forEach(function(src) {
                        if (glob.sync(src).length) {

                            this.assets[assetType][assetGroup] = {
                                src:    path.resolve(src),
                                dest:   this.getDest(assetType) + (this.options.assets[assetType].groups[assetGroup].dest ? '/' + this.options.assets[assetType].groups[assetGroup].dest : ''),
                                concat: this.options.assets[assetType].groups[assetGroup].concat ? this.options.assets[assetType].groups[assetGroup].concat : false
                            };

                            if (util.env.verbose) {
                                util.log(
                                    'Custom', util.colors.grey(assetType),
                                    'group', "'" + util.colors.cyan(assetGroup) + "'",
                                    'at', util.colors.magenta(src)
                                );
                            }
                        }
                    }.bind(this));
                }.bind(this));
            }
        }

        // Filter on current asset group
        if (this.group) {
            var
                assets = {};

            Object.keys(this.assets[assetType]).forEach(function(assetGroup) {
                if (assetGroup == this.group) {
                    assets[assetGroup] = this.assets[assetType][assetGroup];
                }
            }.bind(this));

            return assets;
        }

        return this.assets[assetType];
    },

    // Set current asset group
    setGroup: function(group) {
        this.group = group;
    },

    // Find asset group by asset type and path
    findGroup: function(assetType, path) {
        var
            minimatch = require('minimatch'),
            group     = null;

        Object.keys(this.assets[assetType]).forEach(function(assetGroup) {
            if (minimatch(path, this.assets[assetType][assetGroup].src)) {
                group = assetGroup;
            }
        }.bind(this));

        return group;
    },

    // Get source
    getSrc: function(assetType, assetGroup) {
        if (assetGroup) {
            return this.get(assetType)[assetGroup].src;
        }

        var
            src = [];

        Object.keys(this.get(assetType)).forEach(function(assetGroup) {
            src.push(this.getSrc(assetType, assetGroup));
        }.bind(this));

        return src;
    },

    // Get watch source
    getSrcWatch: function(assetType, assetGroup) {
        if (assetGroup) {
            return this.get(assetType)[assetGroup].srcWatch;
        }

        var
            src = [];

        Object.keys(this.get(assetType)).forEach(function(assetGroup) {
            src.push(this.getSrcWatch(assetType, assetGroup));
        }.bind(this));

        return src;
    },

    // Get destination
    getDest: function(assetType, assetGroup) {
        // Global dest
        if (!assetType) {
            return this.options.dest;
        }

        // Asset type dest
        if (!assetGroup) {
            return this.options.dest + (this.options.assets[assetType].dest ? '/' + this.options.assets[assetType].dest : '');
        }

        // Asset type & group dest
        return this.get(assetType)[assetGroup].dest;
    },

    // Get bundles
    getBundles: function(assetType, assetGroup) {
        return this.get(assetType)[assetGroup].bundles ? this.get(assetType)[assetGroup].bundles : {};
    },

    // Get concat
    getConcat: function(assetType, assetGroup) {
        return this.get(assetType)[assetGroup].concat ? this.get(assetType)[assetGroup].concat : false;
    },

    // Get vendors
    getVendors: function() {
        return this.options.vendors.concat(this.getSrc('vendors'));
    },

    // Get header
    getHeader: function() {
        return this.options.header;
    },

    getHeaderMeta: function() {
        if (this.headerMeta === null) {
            this.headerMeta = require(require('path').join(process.cwd(), 'package.json'));
            this.headerMeta.date = new Date();
        }

        return this.headerMeta;
    },

    // Get autoprefixer
    getAutoprefixer: function() {
        return this.options.autoprefixer;
    }
};

module.exports = new Assets();
