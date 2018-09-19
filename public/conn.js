var socket = io('http://localhost:3000');
var porcentagem = 0;
var countID=0;
function renderMessage(message) {
    console.log(message);
    // $('.messages').append('<div class="message"><strong>'+message.author+'</strong>: '+message.message+'</div>');

    // var interval;
    // interval=setInterval(timer, 400);
    // function timer(){
    $(".progress-bar")[0].setAttribute("style", "width:" + porcentagem + "%");
    console.log(porcentagem);
    porcentagem++;
    $(".progress-bar")[0].innerHTML = porcentagem + "%";
    // if(porcentagem==100){
    //clearInterval(interval);
    //  }
    // }   
}

socket.on('recivedMessage', function (message) {
    console.log("a");
    renderMessage(message);
});
socket.on('renderImage', function () {
    console.log("data");
    renderImage();
});

socket.on('clickImage', function (a) {
    console.log("chamou "+a);
    removeImage(a);
});

//CHAT SUBMIT
$('#chat').submit(function (event) {
    event.preventDefault();

    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    //if(author.length && message.length){
    var messageObject = {
        author: author,
        message: message,

    };
   
    socket.emit('sendMessage', messageObject);
    //  }



});
//EU_VI_ROLAS_LAELE SUBMIT

$('#euvirolaslaele').submit(function (event) {
    event.preventDefault();


    renderImage();
    socket.emit('renderImage');
    //  }
});

function removeImage(a) {
    var elemento = document.getElementById(a);
    if(elemento){

        elemento.remove();
    }
}
function renderImage() {

    $('#euvirolaslaeleServidor').append('<img height="190" width="275" id="'+countID+'" src="http://bwshells.com/src/uploads/2012/03/VIROLA-4.jpg" >');
    countID++;
    var list = document.querySelectorAll("img");

    list.forEach(function (a) {

        a.addEventListener("click", function () {
            removeImage(this.getAttribute("id"));
            socket.emit('clickImage', this.getAttribute("id"));
        });
    }
    );


}

