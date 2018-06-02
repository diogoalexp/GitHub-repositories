(function () {
    app
        .directive('pager', function () {
            return {
                restrict: 'E',
                templateUrl: '~/../scripts/directives/pager.html',
                scope: {
                    total: '=',
                    paginada: '=',
                    state: '=',
                    timer: '=',
                    pageSize: '='
                },
                controller: function ($scope, PagerService, $interval) {
                    var self = $scope;

                    $scope.tempItems = $scope.paginada;
                    $scope.pager = {};
                    $scope.setPage = setPage;
                    self.pageLoop = 1;

                    initController();

                    function initController() {
                        // Inicializa para a página 1
                        $scope.setPage(1);
                    }

                    function setPage(page) {
                        if (page < 1 || page > $scope.pager.totalPages) {
                            return;
                        }

                        // Obtém o objeto pager do serviço
                        $scope.pager = PagerService.GetPager($scope.tempItems.length, page, ($scope.pageSize || 15));

                        // Obtém a página atual dos items
                        $scope.paginada = $scope.tempItems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
                    }

                    $scope.$watch('total', function (newValue) {
                        if (newValue != null) {
                            // Reinicia tudo quando for realizada a pesquisa
                            $scope.tempItems = newValue;
                            $scope.pager = {};
                            $scope.setPage = setPage;
                            initController();
                        }
                    });
                    
                    function refreshPagination() {
                        $interval(function () {
                            self.pageLoop = self.pageLoop + 1;
                            var mod = self.pageLoop % $scope.pager.totalPages;
                            setPage(mod > 0 ? mod : $scope.pager.totalPages);
                        }, 30000) /* 30000 equals 30 seconds */
                    };
                    if ($scope.timer) refreshPagination();

                }
            }
        });
})();