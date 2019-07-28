// JavaScript File

// Code adapted from https://en.wikipedia.org/wiki/Luhn_algorithm

var Luhn = (function () {

    function digits_of(number,step,init) {
        number = number.toString();
        var len = number.length;
        var digits = [];
        for( var i = init; i < len; i += step ) {
            digits.push(parseInt(number.charAt(len-i-1),10));
        }
        return digits;
    }
    
    function plus(x,y) {
        return x+y;
    }
    
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    function sum(array) {
        return array.reduce(plus,0);
    }

    function checksum(card_number) {
        var odd_digits = digits_of(card_number,2,0);
        var even_digits = digits_of(card_number,2,1);
        var total = sum(odd_digits);
        for ( var i in even_digits) {
            var digit = even_digits[i];
            total += sum(digits_of(2 * digit, 1, 0));
        }
        return total % 10;
    }   

    function is_valid(card_number) {
        return checksum(card_number) == 0;
    }
    
    function test() {
        console.log('should be true:  '+is_valid('79927398713'));
        console.log('should be false: '+is_valid('79927398714'));
        console.log(checksum(79927398713));
    }
    
    test();
    // here are the exported values.
    return { sum: sum, checksum: checksum, is_valid: is_valid, test: test};
})();