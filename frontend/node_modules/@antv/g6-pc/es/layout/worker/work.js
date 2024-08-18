var WebWorker = /** @class */function () {
  function WebWorker(worker, workerScirptURL) {
    var code = worker.toString();
    var blob = new Blob(["importScripts('".concat(workerScirptURL, "');(").concat(code, ")()")], {
      type: 'text/javascript'
    });
    return new Worker(URL.createObjectURL(blob));
  }
  return WebWorker;
}();
export default WebWorker;