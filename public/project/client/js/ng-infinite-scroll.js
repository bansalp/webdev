/* ng-infinite-scroll - v1.0.0 - 2013-02-23 */
var mod;
mod = angular.module("infinite-scroll", []), mod.directive("infiniteScroll", ["$rootScope", "$window", "$timeout", function (i, n, e) {
    return {
        link: function (t, l, o) {
            var r, c, f, a;
            return n = angular.element(n), f = 0, null != o.infiniteScrollDistance && t.$watch(o.infiniteScrollDistance, function (i) {
                return f = parseInt(i, 10)
            }), a = !0, r = !1, null != o.infiniteScrollDisabled && t.$watch(o.infiniteScrollDisabled, function (i) {
                return a = !i, a && r ? (r = !1, c()) : void 0
            }), c = function () {
                var e, c, u, d;
                return d = n.height() + n.scrollTop(), e = l.offset().top + l.height(), c = e - d, u = n.height() * f >= c, u && a ? i.$$phase ? t.$eval(o.infiniteScroll) : t.$apply(o.infiniteScroll) : u ? r = !0 : void 0
            }, n.on("scroll", c), t.$on("$destroy", function () {
                return n.off("scroll", c)
            }), e(function () {
                return o.infiniteScrollImmediateCheck ? t.$eval(o.infiniteScrollImmediateCheck) ? c() : void 0 : c()
            }, 0)
        }
    }
}]);