document.addEventListener("DOMContentLoaded", () =>{
    const form = document.querySelector("form");
    const mensajeExito = document.getElementById("mensaje-exito");


  form.addEventListener("submit",(Event) =>{
    Event.preventDefault() //Evitamos el envío real, no hay backend
  

    if(form.checkValidity()) {
        //mostrar el mensaje
        mensajeExito.classList.remove("hide");
        mensajeExito.classList.add("show");
        mensajeExito.setAttribute("aria-hidden", "false");

        //Limpiamos el campo    
        form.reset();
    
    setTimeout(() =>{
        mensajeExito.classList.remove("show");
        mensajeExito.classList.add("hide");

    setTimeout(() =>{
        mensajeExito.setAttribute("aria-hidden", "true");
        mensajeExito.classList.remove("hide");
    },400);    
    },5000);
    }else{
        form.reportValidity();
    }
});  
});