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
            includes: [
                'bower_components',
                'node_modules'
            ],
            dest: 'web/assets',
            header: false,
            autoprefixer: {},
            assets: {
                js: {
                    glob:      '/**/[!_]*.js',
                    globWatch: '/**/[!_]*.js',
                    src:       '/js',
                    dest:      '/js',
                    vendor:    {}
                },
                sass: {
                    glob:      '/**/[!_]*.scss',
                    globWatch: '/**/*.scss',
                    src:       '/sass',
                    dest:      '/css',
                    vendor:    {}
                },
                images: {
                    glob:      '/**',
                    globWatch: '/**',
                    src:       '/images',
                    dest:      '/images',
                    vendor:    {}
                },
                fonts: {
                    glob:      '/**',
                    globWatch: '/**',
                    src:       '/fonts',
                    dest:      '/fonts',
                    vendor:    {}
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

            if (typeof sourceProperty === 'object') {
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

            // Initialize assets object
            this.assets[assetType] = {};

            // Search assets groups
            this.options.groups.forEach(function(group) {

                glob.sync(group.pattern + this.options.assets[assetType].src).forEach(function(assetGroupPath) {
                    var
                        assetGroup = (typeof(group.name) == 'function') ? group.name(assetGroupPath) : group.name;

                    this.assets[assetType][assetGroup] = {
                        src:      path.resolve(assetGroupPath + this.options.assets[assetType].glob),
                        srcWatch: path.resolve(assetGroupPath + this.options.assets[assetType].globWatch),
                        dest:     this.getDest(assetType)
                    };

                    if (util.env.verbose) {
                        util.log(
                            'Found', "'" + util.colors.cyan(assetGroup) + "'",
                            'group', "'" + util.colors.grey(assetType) + "'",
                            'at', util.colors.magenta(assetGroupPath + this.options.assets[assetType].glob),
                            'watching', util.colors.magenta(assetGroupPath + this.options.assets[assetType].globWatch)
                        );
                    }
                }.bind(this));
            }.bind(this));

            // Add vendors
            Object.keys(this.options.assets[assetType].vendor).forEach(function(assetGroup) {

                var
                    assetGroupSrc = [this.options.assets[assetType].vendor[assetGroup].src];

                this.options.includes.forEach(function(include) {
                    assetGroupSrc.push(include + '/' + assetGroupSrc[0]);
                });

                assetGroupSrc.forEach(function(src) {
                    if (glob.sync(src).length) {

                        this.assets[assetType][assetGroup] = {
                            src:  path.resolve(src),
                            dest: this.getDest(assetType) + (this.options.assets[assetType].vendor[assetGroup].dest ? this.options.assets[assetType].vendor[assetGroup].dest : '')
                        };

                        if (util.env.verbose) {
                            util.log(
                                'Vendor', "'" + util.colors.cyan(assetGroup) + "'",
                                'group', "'" + util.colors.grey(assetType) + "'",
                                'at', util.colors.magenta(src)
                            );
                        }
                    }
                }.bind(this));
            }.bind(this));
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
        if (assetGroup) {
            return this.get(assetType)[assetGroup].dest;
        }

        return this.options.dest + this.options.assets[assetType].dest;
    },

    // Get header
    getHeader: function() {
        return this.options.header;
    },

    getHeaderMeta: function() {
        if (this.headerMeta === null) {
            this.headerMeta = require('../../package.json');
            this.headerMeta.date = new Date();
        }

        return this.headerMeta;
    }
};

module.exports = new Assets();
