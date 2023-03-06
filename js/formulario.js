const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
//se utilizara expresiones regulares 
const expresiones = {
   alias: /^[a-zA-Z0-9]{5,16}$/, // Letras y numeros
   nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
   correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
   rut: /^[0-9]{7,8}[-|‐]{1}[0-9kK]{1}$/   // formato xxxxxxxx-x
}

const campos = {
   nombre: false,
   alias: false,
   correo: false,
   rut: false
}

const validarFormulario = (e) => {
   switch (e.target.name) {
       case "nombre":
           validarCampo(expresiones.nombre, e.target, 'nombre');
       break;
       case "alias":
           validarCampo(expresiones.alias, e.target, 'alias');
       break;
       case "rut":
           validarCampo(expresiones.rut, e.target, 'rut');
           validarRut(expresiones.rut, e.target, 'rut');
       break;
       case "correo":
           validarCampo(expresiones.correo, e.target, 'correo');
       break;
   } 
}

const validarCampo = (expresion, input, campo) => {
   if (expresion.test(input.value)){
       document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
       document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
       document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
       document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
       document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
       campos[campo] = true;
   } else {
       document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
       document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
       document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
       document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
       document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
       campos[campo] = false;
   }

}

const validarRut = (expresion, input, campo) =>{

   if (expresion.test(input.value)){
       var ruts 	= (input.value).split('-');
       var digv	= ruts[1]; 
       var rut 	= ruts[0];
       if ( digv == 'K' ) digv = 'k' ;
       if (digitoV(rut) == digv ){
       document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
       document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
       document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
       document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
       document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
       campos[campo] = true;
       } else {
       document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
       document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
       document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
       document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
       document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
       campos[campo] = false;
       }
           
   }
   function digitoV (T) {
       var M=0,S=1;
       for(;T;T=Math.floor(T/10))
           S=(S+T%10*(9-M++%6))%11;
       return S?S-1:'k';
   }
   
}

inputs.forEach((input) => {
   input.addEventListener('keyup', validarFormulario);
   input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
e.preventDefault();

if (campos.nombre && campos.alias && campos.rut && campos.correo ) {
   formulario.reset();


   document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
   setTimeout(() => {
       document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
       
   }, 3000);
   document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
       icono.classList.remove('formulario__grupo-correcto');
   });
} else {
   document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
}

});