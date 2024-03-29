class DevicePixelRatio {
    constructor() {
    }
    _getSystem() {
        var agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf('windows') >= 0) {
            return true;
        }
    }
    _addHandler(element, type, handler) {
        if (element.addEventListener) {
          element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
          element.attachEvent('on' + type, handler);
        } else {
          element['on' + type] = handler;
        }
      }

    init() {
        document.getElementsByTagName('body')[0].style.zoom =
            (1 / window.devicePixelRatio) ;
            // (1 / window.devicePixelRatio) * (window.screen.width / 1920);
            console.log("---", window.devicePixelRatio)
    }
}
export default DevicePixelRatio;
