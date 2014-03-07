window.currentArray = new Array(100);
function increaseArray() {
    for( var i=0; i<1000; i++ ) {
        window.currentArray.push(Math.random());
    }
    var e = document.getElementById('acount');
    e.innerHTML = window.currentArray.length;

}

var arrayId;
function onArrayIncrease() {
    if( typeof arrayId == 'undefined' )
        arrayId = setInterval( increaseArray, 100 );
    else {
        clearInterval( arrayId );
        arrayId = null;
    }
}

function getRandomString( len ) {
    var randomContainer = 'abcdefghijklmnopqrstuvwxyz1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
    var outString = "";
    var j;
    var stringLength = Math.random()*len;
    for( j=0; j<stringLength; j++)
    {
        outString += randomContainer[Math.floor( Math.random() * randomContainer.length )];
    }
    return outString;
}


window.fieldContainer = new Object;
var fieldsTotal = 0;
function increaseFields() {
    for( var i=0; i<1000; i++ ) {
        window.fieldContainer[getRandomString(10)] = Math.random();//getRandomString(1  0);
    }
    fieldsTotal += 1000;
    var e = document.getElementById('fcount');
    e.innerHTML = fieldsTotal;

}

var fieldsId;
function onFieldsIncrease() {
    if( typeof fieldsId == 'undefined' )
        fieldsId = setInterval( increaseFields, 100 );
    else {
        clearInterval( fieldsId );
        fieldsId = null;
    }
}
