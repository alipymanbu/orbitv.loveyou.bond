(function () {
  'use strict';

  /* 按钮链接统一注入：只认 links.js 里的取值 */
  var links = window.SITE_LINKS || {};
  var nodes = document.querySelectorAll('[data-link]');
  for (var i = 0; i < nodes.length; i++) {
    var el = nodes[i];
    var key = el.getAttribute('data-link');
    if (links[key]) {
      el.setAttribute('href', links[key]);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener nofollow');
    }
  }

  /* 移动端导航：点击展开 / 收起 */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    var navLinks = nav.querySelectorAll('a');
    for (var j = 0; j < navLinks.length; j++) {
      navLinks[j].addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /* 右下角：返回顶部（下滚后出现） */
  var toTop = document.getElementById('to-top');
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 420) { toTop.classList.add('show'); }
      else { toTop.classList.remove('show'); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* 滚动渐显（遵循系统减弱动效设置） */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    for (var k = 0; k < items.length; k++) { items[k].classList.add('in'); }
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    for (var m = 0; m < items.length; m++) { io.observe(items[m]); }
  }
})();
