export function isWebp() {
    function testWebP(callback) {
        let weP = new Image();
        weP.onload = weP.onerror = function() {
            callback(weP.height == 2);
        };
        weP.src = "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==";
    }
    testWebP(function(support){
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}
