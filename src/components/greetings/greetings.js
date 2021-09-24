//////////
// HEADER
//////////
(function ($, APP) {
  APP.Components.Greetings = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
        this.listenResize();
      }
      this.limitHeight();
    },
    eventListeners: function () {
      _document.on('click', '.js-greetings .greetings__col', function () {
        var $col = $(this);
        var $card = $col.find('.greetingCard');

        $('.js-greetings .greetings__col').removeClass('is-active');
        $('.js-greetings .greetingCard').removeClass('is-active');

        setTimeout(() => {
          $col.addClass('is-active');
          $card.addClass('is-active');
        }, 250);
      });
    },
    listenResize: function () {
      _window.on('resize', debounce(this.limitHeight.bind(this), 100));
    },
    limitHeight: function () {
      var $el = $('.js-limit-height');

      if ($el && $el.length) {
        $el.css({
          height: $el.height(),
        });
      }
    },
  };
})(jQuery, window.APP);
