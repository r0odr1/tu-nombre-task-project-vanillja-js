const CLAVE_LOCALSTORAGE ="lista_tareas";
document.addEventListener("DOMContentLoaded", () => {
    let listaTareas = [];
    const $tareas = document.querySelector("#tareas"),
            $guardarTarea = document.querySelector("#agregarTarea"),
            $inputNueva = document.querySelector("#inputNueva");

    $guardarTarea.onclick = () => {
        const listatarea = $inputNueva.value;
        if(!listatarea){
            return;
        }
        listaTareas.push({
            listatarea: listatarea,
            terminada: false
        });
        $inputNueva.value = "";
        guardarTareaAlmacenamiento();
        refrescarListaTareas();
    };

    const obtenerTareasAlmacenamiento = () => {
        const posibleList = JSON.parse(localStorage.getItem( CLAVE_LOCALSTORAGE));
        if(posibleList){
            return posibleList;
        }else {
            return [];
        }
    };

    const guardarTareaAlmacenamiento = () => {
        localStorage.setItem( CLAVE_LOCALSTORAGE, JSON.stringify(listaTareas));
    };

    const refrescarListaTareas = () => {
        $tareas.innerHTML = "";
        for(const [indice, listatarea] of listaTareas.entries()) {
            const $enlaceEliminar = document.createElement("a");
            $enlaceEliminar.classList.add("enlace-eliminar");
            $enlaceEliminar.innerHTML = "&times;";
            $enlaceEliminar.href = "";
            $enlaceEliminar.onclick = (evento) => {
                evento.preventDefault();
                if(!confirm("¿Eliminar tareas?")){
                    return;
                }
                listaTareas.splice(indice, 1);
                guardarTareaAlmacenamiento();
                refrescarListaTareas();
            };

            const $checkbox = document.createElement("input");
            $checkbox.type = "checkbox";
            $checkbox.onchange = function (){
                if(this.checked){
                    listaTareas[indice].terminada = true;
                }else{
                    listaTareas[indice].terminada = false;
                }
                guardarTareaAlmacenamiento();
                refrescarListaTareas();
            }


            const $span = document.createElement("span");
            $span.textContent = listatarea.listatarea;

            const $li = document.createElement("li");

            if (listatarea.terminada){
                $checkbox.checked = true;
                $span.classList.add("tachado");
            }
            $li.appendChild($checkbox);
            $li.appendChild($span);
            $li.appendChild($enlaceEliminar);
            $tareas.appendChild($li);
        }
    };

});