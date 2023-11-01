// relojWorker.js
self.onmessage = function(e) {
    if (e.data === 'start') {
        setInterval(function() {
            self.postMessage(new Date());
          }, 1000);
    }
  };
  