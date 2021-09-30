//////////
// Events
//////////
(function ($, APP) {
  APP.Components.Events = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
        this.closeFilters();
      }
    },
    closeFilters: function () {
      var $form = $('.filters__form');

      $form.removeClass('is-active');

      APP.Plugins.ScrollBlock.enableScroll();
    },
    eventListeners: function () {
      var _this = this;

      _document
        .on('click', '.eventCard__like', function (e) {
          e.preventDefault();
          e.stopPropagation();

          $(this).toggleClass('is-active');
        })
        .on('click', '.js-filters-toggle', function () {
          var $link = $(this);
          var $form = $('.filters__form');

          $form.addClass('is-active');

          APP.Plugins.ScrollBlock.disableScroll();
        })
        .on('click', '.js-filters-close', function () {
          _this.closeFilters();
        });
    },
  };
})(jQuery, window.APP);
