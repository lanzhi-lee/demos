/** 兼容各浏览器监听滚动事件，并且阻止默认行为。 */
;(function (window, document) {
  let prefix = ''
  let _addEventListener

  // detect event model
  if (window.addEventListener) {
    _addEventListener = 'addEventListener'
  } else {
    _addEventListener = 'attachEvent'
    prefix = 'on'
  }

  // detect available wheel event
  const support =
    'onwheel' in document.createElement('div')
      ? 'wheel' // 各个厂商的高版本浏览器都支持"wheel"
      : document.onmousewheel !== undefined
      ? 'mousewheel' // Webkit 和 IE一定支持"mousewheel"
      : 'DOMMouseScroll' // 低版本firefox

  window.addWheelListener = function (elem, callback, useCapture) {
    _addWheelListener(elem, support, callback, useCapture)

    // handle MozMousePixelScroll in older Firefox
    if (support === 'DOMMouseScroll') {
      _addWheelListener(elem, 'MozMousePixelScroll', callback, useCapture)
    }
  }

  function _addWheelListener(elem, eventName, callback, useCapture) {
    elem[_addEventListener](
      prefix + eventName,
      support === 'wheel'
        ? callback
        : function (originalEvent) {
            !originalEvent && (originalEvent = window.event)

            // create a normalized event object
            const event = {
              // keep a ref to the original event object
              originalEvent: originalEvent,
              target: originalEvent.target || originalEvent.srcElement,
              type: 'wheel',
              deltaMode: originalEvent.type === 'MozMousePixelScroll' ? 0 : 1,
              deltaX: 0,
              deltaZ: 0,
              preventDefault: function () {
                originalEvent.preventDefault ? originalEvent.preventDefault() : (originalEvent.returnValue = false)
              },
            }

            // calculate deltaY (and deltaX) according to the event
            if (support === 'mousewheel') {
              event.deltaY = (-1 / 40) * originalEvent.wheelDelta
              // Webkit also support wheelDeltaX
              originalEvent.wheelDeltaX && (event.deltaX = (-1 / 40) * originalEvent.wheelDeltaX)
            } else {
              event.deltaY = originalEvent.detail
            }

            // it's time to fire the callback
            return callback(event)
          },
      useCapture || false
    )
  }
})(window, document)
