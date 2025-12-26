/*
  Generic client-side pagination helper.
  Usage: window.initPaginatedList(containerId, { perPage: 5 })

  This file fixes the original bugs in the old script:
  - always uses radix 10 for parseInt
  - correctly computes total pages
  - robustly parses/updates page numbers
  - exposes an initializer so it can be reused across pages
*/
(function (window, document) {
  'use strict';

  var instances = {};

  function makePageNum(currIdx, totalPages) {
    return (currIdx + 1) + ' / ' + Math.max(1, totalPages);
  }

  function displayPage(items, pageIndex, perPage) {
    for (var i = 0; i < items.length; i++) {
      if (Math.floor(i / perPage) === pageIndex) {
        items[i].style.display = '';
      } else {
        items[i].style.display = 'none';
      }
    }
  }

  function setupControls(container, options) {
    var controls = container.querySelector('.pagination-controls');
    if (!controls) return null;

    var perPageAttr = controls.getAttribute('data-per-page');
    var perPage = (options && options.perPage) || (perPageAttr ? parseInt(perPageAttr, 10) : 5);


    var items = Array.prototype.slice.call(container.getElementsByClassName('paginated-item'));
    // Only show pager if the full list length is > 10
    if (items.length <= 10) {
      // leave the full list visible (no JS pagination)
      return null;
    }

  var totalPages = Math.max(1, Math.ceil(items.length / perPage));

    // reveal JS-only controls (they are hidden by default so no-JS fallback shows full list)
    try {
      controls.style.display = '';
      container.classList.add('js-enabled');
    } catch (e) {
      // ignore if style can't be set
    }

    var state = { current: 0, perPage: perPage, totalPages: totalPages };

    function updateControls() {
  var prevLi = controls.querySelector('li.previous');
  var nextLi = controls.querySelector('li.next');
  var prev = controls.querySelector('.pag-prev');
  var next = controls.querySelector('.pag-next');

  // hide previous completely on first page, hide next on last page
  if (prevLi) prevLi.style.display = (state.current === 0 ? 'none' : 'inline-block');
  if (nextLi) nextLi.style.display = (state.current === state.totalPages - 1 ? 'none' : 'inline-block');
    }

    function goTo(n) {
      if (n < 0) n = 0;
      if (n > state.totalPages - 1) n = state.totalPages - 1;
      state.current = n;
      displayPage(items, state.current, state.perPage);
      updateControls();
    }

    var prevBtn = controls.querySelector('.pag-prev');
    var nextBtn = controls.querySelector('.pag-next');

    function onPrev()  { goTo(state.current - 1); window.scrollTo(0,0); }
    function onNext()  { goTo(state.current + 1); window.scrollTo(0,0); }

    if (prevBtn) prevBtn.addEventListener('click', onPrev);
    if (nextBtn) nextBtn.addEventListener('click', onNext);

    // expose destroy to remove listeners
    return {
      goTo: goTo,
      destroy: function () {
        if (prevBtn) prevBtn.removeEventListener('click', onPrev);
        if (nextBtn) nextBtn.removeEventListener('click', onNext);
      }
    };
  }

  // public init function
  window.initPaginatedList = function (containerId, opts) {
    var container = document.getElementById(containerId);
    if (!container) return null;
    // destroy existing instance if any
    if (instances[containerId] && instances[containerId].destroy) {
      instances[containerId].destroy();
    }
    var inst = setupControls(container, opts || {});
    instances[containerId] = inst || {};
    // initial goTo if present
    if (inst && inst.goTo) inst.goTo(0);
    return inst;
  };

  window.destroyPaginatedList = function (containerId) {
    if (instances[containerId] && instances[containerId].destroy) {
      instances[containerId].destroy();
      delete instances[containerId];
    }
  };

})(window, document);
