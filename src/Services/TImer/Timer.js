export const Timer = function(callback, delay) {
    let timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= Date.now() - start;
    };

    this.resume = function() {
        start = Date.now();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.start = function(){
        this.resume();
    }
};


/*

Example_____

var timer = new Timer(function() {
    alert("Done!");
}, 3000);


 */