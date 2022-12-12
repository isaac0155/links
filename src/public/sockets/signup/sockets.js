const input = document.getElementById('user');

input.addEventListener('input', e => {
    const value = input.value;
    if(value.length > 4){
        socket.emit('cliente:verifUser', value);
    }
});