//////////
// HEADER
//////////
(function ($, APP) {
  APP.Components.Overlay = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
        this.listenResize();
      }
    },
    closeOverlays: function (withClose) {
      $('.js-open-overlay').removeClass('is-active');
      $('.overlay').removeClass('is-active');
      if (withClose) {
        if ($('.js-hamburger.is-active').length === 0) {
          APP.Plugins.ScrollBlock.enableScroll();
        }
      }
    },
    eventListeners: function () {
      var _this = this;

      _document
        .on('click', '.js-open-overlay', function () {
          var $link = $(this);
          var $target = $('.overlay[data-overlay-id="' + $link.data('id') + '"]');
          if ($target.length === 0) return;

          var targetBound = $link[0].getBoundingClientRect();

          _this.closeOverlays();

          const top = targetBound.top + targetBound.height;

          $target.find('.overlay__content').css({ top: top });

          if ($target.data('set-height') !== undefined) {
            $target.find('.overlay__wrapper').css({ height: window.innerHeight - top });
          }

          $link.addClass('is-active');
          $target.addClass('is-active');

          APP.Plugins.ScrollBlock.disableScroll();
        })
        .on('click', '.overlay__bg, .overlay__close', function () {
          _this.closeOverlays(true);
        });
    },
    listenResize: function () {
      // _window.on('resize', debounce(this.limitHeight.bind(this), 100));
    },
  };
})(jQuery, window.APP);
