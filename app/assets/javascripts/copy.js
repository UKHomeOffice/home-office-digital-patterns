function Copy ($module) {
  this.$module = $module
}
Copy.prototype.init = function () {
  var $module = this.$module
  if (!$module) {
    return
  }
  var $button = document.createElement('button')
  $button.className = 'app-copy-button js-copy-button'
  $button.setAttribute('aria-live', 'assertive')
  $button.textContent = 'Copy code'

  $module.insertBefore($button, $module.firstChild)
  this.copyAction()
}
Copy.prototype.copyAction = function () {
  // Copy to clipboard
  try {
    new ClipboardJS('.js-copy-button', {
      target: function (trigger) {
        return trigger.nextElementSibling
      }
    }).on('success', function (e) {
      e.trigger.textContent = 'Code copied'
      e.clearSelection()
      e.trigger.nextElementSibling.focus()
      setTimeout(function () {
        e.trigger.textContent = 'Copy code'
      }, 5000)
    })
  } catch (err) {
    if (err) {
      console.log(err.message)
    }
  }
}

var $codeBlocks = document.querySelectorAll('pre');
$codeBlocks.forEach((item, i) => {
  new Copy(item).init();
});
