// Shared floating behavior for page sidebars and post catalogs.
(function () {
    'use strict';

    var sidebars = document.querySelectorAll('.home-sidebar > .side-catalog, .post-catalog-column > .side-catalog');
    if (!sidebars.length) return;

    var landscape = window.matchMedia('(orientation: landscape)');
    var pending = false;

    function update() {
        pending = false;
        sidebars.forEach(function (sidebar) {
            var column = sidebar.parentElement;
            var content = column.parentElement.querySelector('.post-content-column, .postlist-container');

            // Measure in normal flow so resizing and content changes cannot
            // leave stale fixed dimensions or a collapsed sidebar column.
            sidebar.classList.remove('fixed');
            sidebar.style.top = '';
            sidebar.style.height = '';
            column.style.minHeight = '';
            if (!content || !landscape.matches || !column.getClientRects().length) return;

            var naturalHeight = sidebar.getBoundingClientRect().height;
            var contentRect = content.getBoundingClientRect();
            var sidebarTop = sidebar.getBoundingClientRect().top;
            var fixedTop = -21;
            var height = Math.min(naturalHeight, window.innerHeight - fixedTop);

            // Short pages stay in normal flow; long sidebars can scroll inside
            // the viewport while their column retains its original height.
            // Enter fixed positioning exactly where normal scrolling places
            // the sidebar, so the transition has no vertical jump.
            if (contentRect.height <= height || sidebarTop > fixedTop) return;
            column.style.minHeight = naturalHeight + 'px';
            sidebar.classList.add('fixed');
            sidebar.style.height = height + 'px';
            sidebar.style.top = Math.min(fixedTop, contentRect.bottom - height) + 'px';
        });
    }

    function schedule() {
        if (pending) return;
        pending = true;
        window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    window.addEventListener('hashchange', schedule);

    // Pagination, language switching and loaded images can change page height.
    if (window.ResizeObserver) {
        var observer = new ResizeObserver(schedule);
        document.querySelectorAll('.post-content-column, .postlist-container').forEach(function (content) {
            observer.observe(content);
        });
    }
    update();
}());
