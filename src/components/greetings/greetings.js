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

        $col.addClass('is-active');
        $card.addClass('is-active');
      });
    },
    listenResize: function () {
      _window.on('resize', debounce(this.limitHeight.bind(this), 100));
    },
    limitHeight: function () {
      var $el = $('.js-limit-height');

      if ($el && $el.length) {
        $el.css({
          height: 'auto',
        });
        setTimeout(() => {
          $el.css({
            height: $el.height(),
          });
        }, 50);
      }
    },
  };
})(jQuery, window.APP);
