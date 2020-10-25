const fs = require('fs');

let listadoToDo = [];

const crear = (descripcion) => {
    cargarDB();
    let todo = {
        descripcion,
        completado: false
    }
    listadoToDo.push(todo);

    guardarDB();

    return todo;
}

const guardarDB = () => {
    let data = JSON.stringify(listadoToDo); //Esto convierte un objeto a un JSON
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar en DB', err);
    });
}

const cargarDB = () => {
    try {
        listadoToDo = require('../db/data.json');
    } catch (error) {
        listadoToDo = [];
    }
}

const getListado = () => {
    cargarDB();
    return listadoToDo;
}

const actualizar = (descripcion, completado) => {
    cargarDB();
    let index = listadoToDo.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) { //Si encontramos el index con la descripcion: 
        listadoToDo[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoToDo.filter(tarea => { //Filter regresa un arreglo
        return tarea.descripcion !== descripcion; //Regresamos todas las pos del array excepto la q coincide con la desc 
    });

    if (listadoToDo.length === nuevoListado.length) {
        return false;
    } else {
        listadoToDo = nuevoListado;
        guardarDB();
        return true;
    }
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}