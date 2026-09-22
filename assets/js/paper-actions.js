(function(document) {
  'use strict';

  var groups = document.querySelectorAll('[data-paper-actions]');

  Array.prototype.forEach.call(groups, function(group) {
    var buttons = group.querySelectorAll('.paper-action-button[aria-controls]');

    function closeAll() {
      Array.prototype.forEach.call(buttons, function(button) {
        var panel = document.getElementById(button.getAttribute('aria-controls'));

        button.setAttribute('aria-expanded', 'false');
        if (panel) {
          panel.hidden = true;
        }
      });
    }

    Array.prototype.forEach.call(buttons, function(button) {
      button.addEventListener('click', function() {
        var panel = document.getElementById(button.getAttribute('aria-controls'));
        var shouldOpen = button.getAttribute('aria-expanded') !== 'true';

        closeAll();

        if (panel && shouldOpen) {
          button.setAttribute('aria-expanded', 'true');
          panel.hidden = false;
        }
      });
    });

    group.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        var openButton = group.querySelector('.paper-action-button[aria-expanded="true"]');

        if (openButton) {
          closeAll();
          openButton.focus();
        }
      }
    });
  });
})(document);
