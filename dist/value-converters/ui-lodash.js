define(["require", "exports", "lodash"], function (require, exports, _) {
    "use strict";
    var SplitValueConverter = (function () {
        function SplitValueConverter() {
        }
        SplitValueConverter.prototype.toView = function (object, char) {
            if (char === void 0) { char = ','; }
            return (object || '').split(new RegExp("[" + char + "]"));
        };
        return SplitValueConverter;
    }());
    exports.SplitValueConverter = SplitValueConverter;
    var KeysValueConverter = (function () {
        function KeysValueConverter() {
        }
        KeysValueConverter.prototype.toView = function (object) {
            if (isEmpty(object))
                return [];
            return Object.keys(object);
        };
        return KeysValueConverter;
    }());
    exports.KeysValueConverter = KeysValueConverter;
    var GroupValueConverter = (function () {
        function GroupValueConverter() {
        }
        GroupValueConverter.prototype.toView = function (object, property) {
            var a = [];
            var g = _.groupBy(object, property);
            _.forEach(g, function (v, k) { return a.push({ key: k, items: v }); });
            return a;
        };
        return GroupValueConverter;
    }());
    exports.GroupValueConverter = GroupValueConverter;
    var SortValueConverter = (function () {
        function SortValueConverter() {
        }
        SortValueConverter.prototype.toView = function (value, property) {
            return _.sortBy(value, property);
        };
        return SortValueConverter;
    }());
    exports.SortValueConverter = SortValueConverter;
});
