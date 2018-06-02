(function () {
    app.service("PagerService", ["$http", "$q",
        function ($http, $q) {

            // Implementação do serviço
            GetPager = function (totalItems, currentPage, pageSize) {
                // Padrão é a primeira página
                currentPage = currentPage || 1;

                // Tamanho padrão da página é 10
                pageSize = pageSize || 10;

                // Calcula o total de páginas
                var totalPages = Math.ceil(totalItems / pageSize);

                var startPage, endPage;
                if (totalPages <= 10) {
                    // Menos de 10 páginas totais, então mostra tudo
                    startPage = 1;
                    endPage = totalPages;
                } else {
                    // Mais de 10 páginas totais, então calcula o inicio e o final
                    if (currentPage <= 6) {
                        startPage = 1;
                        endPage = 10;
                    } else if (currentPage + 4 >= totalPages) {
                        startPage = totalPages - 9;
                        endPage = totalPages;
                    } else {
                        startPage = currentPage - 5;
                        endPage = currentPage + 4;
                    }
                }

                // Calcular indices de items de inicio e fim
                var startIndex = (currentPage - 1) * pageSize;
                var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

                var range = [];
                for (var i = startPage; i <= endPage; i++) {
                    range.push(i);
                }

                // Cria uma série de páginas para repetir no paginador
                var pages = range;

                // Retorna um objeto com todas as propriedades necessárias para a view de paginação
                return {
                    totalItems: totalItems,
                    currentPage: currentPage,
                    pageSize: pageSize,
                    totalPages: totalPages,
                    startPage: startPage,
                    endPage: endPage,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    pages: pages
                };
            }

            // Definição do serviço
            var service = {};

            service.GetPager = GetPager;

            return service;

        }
    ]);
})();