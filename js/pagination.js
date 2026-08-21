/*
  Generic client-side pagination helper.
  Usage: window.initPaginatedList(containerId, { perPage: 10 })

  This file fixes the original bugs in the old script:
  - always uses radix 10 for parseInt
  - correctly computes total pages
  - robustly parses/updates page numbers
  - exposes an initializer so it can be reused across pages
*/
(function (window, document) {
  'use strict';

  var instances = {};

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
    // Only show pager when the list actually spans more than one page.
    if (items.length <= perPage) {
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

  window.initGroupedPaginatedList = function (containerId, opts) {
    var container = document.getElementById(containerId);
    if (!container) return null;

    var options = opts || {};
    var controls = container.querySelector('[data-grouped-pagination-controls]');
    if (!controls) return null;

    var perPageAttr = controls.getAttribute('data-per-page');
    var perPage = options.perPage || (perPageAttr ? parseInt(perPageAttr, 10) : 20);
    var groupSelector = options.groupSelector || '.one-tag-list, .one-year-list';
    var groups = Array.prototype.slice.call(container.querySelectorAll(groupSelector));
    var items = Array.prototype.slice.call(container.getElementsByClassName('paginated-item'));
    var totalPages = Math.max(1, Math.ceil(items.length / perPage));
    var current = 0;

    if (items.length <= perPage) return null;

    controls.style.display = '';
    container.classList.add('js-enabled');

    function updateGroups() {
      groups.forEach(function (group) {
        var groupItems = Array.prototype.slice.call(group.getElementsByClassName('paginated-item'));
        group.style.display = groupItems.some(function (item) {
          return item.style.display !== 'none';
        }) ? '' : 'none';
      });
    }

    function updateControls() {
      var prevLi = controls.querySelector('li.previous');
      var nextLi = controls.querySelector('li.next');
      if (prevLi) prevLi.style.display = current === 0 ? 'none' : 'inline-block';
      if (nextLi) nextLi.style.display = current === totalPages - 1 ? 'none' : 'inline-block';
    }

    function goTo(pageIndex, shouldScroll) {
      current = Math.max(0, Math.min(pageIndex, totalPages - 1));
      displayPage(items, current, perPage);
      updateGroups();
      updateControls();
      if (shouldScroll) {
        window.scrollTo(0, container.getBoundingClientRect().top + window.pageYOffset - 20);
      }
    }

    function goToHash() {
      if (!window.location.hash) return;
      var hashId;
      try {
        hashId = decodeURIComponent(window.location.hash.slice(1));
      } catch (e) {
        hashId = window.location.hash.slice(1);
      }
      var target = document.getElementById(hashId);
      if (!target || !container.contains(target)) return;
      var group = target.closest ? target.closest(groupSelector) : null;
      if (!group) return;
      var firstItem = group.getElementsByClassName('paginated-item')[0];
      var itemIndex = items.indexOf(firstItem);
      if (itemIndex >= 0) goTo(Math.floor(itemIndex / perPage), false);
    }

    var prevBtn = controls.querySelector('.pag-prev');
    var nextBtn = controls.querySelector('.pag-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1, true); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1, true); });
    window.addEventListener('hashchange', goToHash);

    goTo(0, false);
    goToHash();
    return { goTo: goTo };
  };

})(window, document);
