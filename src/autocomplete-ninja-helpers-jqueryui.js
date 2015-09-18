
autocomplete_ninja.jquery_ui = {

    _convert: function(data, value_lookup)  {
        var pluck = autocomplete_ninja._create_plucker(value_lookup);
        for (var i = 0; i < data.length; i++) {
            data[i].label = data[i].name;
            data[i].value = pluck(data[i]);
        }
        return data
    },

    _get_config: function(path, extra_params, value_lookup) {
        var self = this;
        var options = autocomplete_ninja.options;
        return {
            delay: options.delay,
            minLength: options.min_chars,
            source: function(request, response) {
                $.get(
                    options.base_uri + path, 
                    $.extend({term: request.term, apikey: options.apikey}, 
                             autocomplete_ninja._resolve(extra_params)),
                    function(data) {
                        response(self._convert(data, value_lookup));
                    }
                );
            }
        };
    },

    countries: function() {
        return this._get_config('countries/', {}, 'codes.iso');
    },

    regions: function(country) {
        return this._get_config('regions/', {country: country}, 'code');
    },

    cities: function(country, region) {
        return this._get_config('cities/', {country: country, region: region}, 'name');
    }

}