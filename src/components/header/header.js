//////////
// HEADER
//////////
(function ($, APP) {
  APP.Components.Header = {
    data: {
      classes: {
        fixedClass: 'is-fixed',
        visibleClass: 'is-fixed-visible',
        bodyFixedVisible: 'is-header-fixed-visible',
      },
      header: {
        container: undefined,
        bottomPoint: undefined,
      },
    },
    init: function (fromPjax) {
      if (!fromPjax) {
        this.getHeaderParams();
        this.clickListeners();
        // this.listenScroll();
        // this.listenResize();
      }

      this.closeMobileMenu();
      this.setMenuClass();
      this.controlHeaderClass();
    },
    getHeaderParams: function () {
      var $header = $('.header');
      var headerOffsetTop = 0;
      var headerHeight = $header.outerHeight() + headerOffsetTop;

      this.data.header = {
        container: $header,
        bottomPoint: headerHeight,
      };
    },
    closeMobileMenu: function () {
      $('.js-hamburger').removeClass('is-active');
      $('.mobile-navi').removeClass('is-active');

      APP.Plugins.ScrollBlock.enableScroll();
    },
    clickListeners: function () {
      _document
        .on('click', '.js-hamburger', function () {
          $(this).toggleClass('is-active');
          $('.mobile-navi').toggleClass('is-active');

          if ($(this).is('.is-active')) {
            APP.Plugins.ScrollBlock.disableScroll();
          } else {
            APP.Plugins.ScrollBlock.enableScroll();

            APP.Components.Events.closeFilters();
            APP.Components.Overlay.closeOverlays();
          }
        })
        .on('click', '.mobile-navi__menu .has-ul', function (e) {
          e.preventDefault();
          e.stopPropagation();

          var $link = $(this);
          var $ul = $link.find('ul');

          if ($link.is('.is-active')) {
            $link.removeClass('is-active');
            $ul.slideUp();
          } else {
            $link.addClass('is-active');
            $ul.slideDown();
          }
        });
    },
    // listenScroll: function () {
    //   _window.on('scroll', this.scrollHeader.bind(this));
    //   _window.on('scroll', debounce(this.scrollHeaderDebouce.bind(this), 1250, { trailing: true }));
    // },
    // listenResize: function () {
    //   _window.on('resize', debounce(this.getHeaderParams.bind(this), 100));
    // },
    // makeHeaderVisible: function () {
    //   this.data.header.container.addClass(this.data.classes.visibleClass);
    //   $('body').addClass(this.data.classes.bodyFixedVisible);
    //   this.data.header.isFixedVisible = true;
    // },
    // makeHeaderHidden: function () {
    //   this.data.header.container.removeClass(this.data.classes.visibleClass);
    //   $('body').removeClass(this.data.classes.bodyFixedVisible);
    //   this.data.header.isFixedVisible = false;
    // },
    // scrollHeaderDebouce: function () {
    //   // always show header after user stop scrolling
    //   if (this.data.header.container !== undefined) {
    //     this.makeHeaderVisible();
    //   }
    // },
    // scrollHeader: function () {
    //   if (this.data.header.container !== undefined) {
    //     var fixedClass = 'is-fixed';
    //     var visibleClass = 'is-fixed-visible';

    //     // get scroll params from blocker function
    //     var scroll = APP.Plugins.ScrollBlock.getData();

    //     if (scroll.blocked) return;

    //     if (scroll.y > this.data.header.bottomPoint) {
    //       this.data.header.container.addClass(fixedClass);

    //       if (scroll.y > this.data.header.bottomPoint * 2 && scroll.direction === 'up') {
    //         this.makeHeaderVisible();
    //       } else {
    //         this.makeHeaderHidden();
    //       }
    //     } else {
    //       // emulate position absolute by giving negative transform on initial scroll
    //       var normalized = Math.floor(normalize(scroll.y, this.data.header.bottomPoint, 0, 0, 100));
    //       var reverseNormalized = (100 - normalized) * -1;
    //       reverseNormalized = reverseNormalized * 1.2; // a bit faster transition

    //       this.data.header.container.css({
    //         transform: 'translate3d(0,' + reverseNormalized + '%,0)',
    //       });

    //       this.data.header.container.removeClass(fixedClass);
    //     }
    //   }
    // },
    setMenuClass: function () {
      // SET ACTIVE CLASS IN HEADER
      var headerMenuList = $('.header__menu li');
      if (headerMenuList.length === 0) return;

      headerMenuList.each(function (i, val) {
        if ($(val).find('a').attr('href') === window.location.pathname.split('/').pop()) {
          $(val).addClass('is-active');
        } else {
          $(val).removeClass('is-active');
        }
      });
    },
    controlHeaderClass: function () {
      this.data.header.container.attr('data-modifier', false);

      var $modifierElement = $('.page').last().find('.js-header-class');

      if ($modifierElement.length > 0) {
        this.data.header.container.attr('data-modifier', $modifierElement.data('class'));
      }
    },
  };
})(jQuery, window.APP);
