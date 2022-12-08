const socketc = io.connect();

socketc.on("nuevoComunidad",(datos)=>
{
    console.log("nuevo comunidad",datos)
})
