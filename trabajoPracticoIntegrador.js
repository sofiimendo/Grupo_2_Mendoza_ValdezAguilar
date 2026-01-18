/**
 * Curso: Introducción a JavaScript
 * TP Integrador: Sistema de Gestión de Biblioteca
 * Profesor/a: Mariana Guadalupe Miño
 *
 * Integrantes:
 * - Sofía Macarena Mendoza
 * - Yamila Valdez Aguilar
 *
 * Nota: Este archivo está organizado por puntos según la consigna.
 */

// 📥 Importación de librería
const prompt = require("prompt-sync")({ sigint: true });

/**
 * ======================================================
 * ✅ 3) GESTIÓN DE USUARIOS
 * ======================================================
 */

/**
 * 3a) registrarUsuario(nombre, email)
 * Agrega un nuevo usuario al array "usuarios".
 */
function registrarUsuario(nombre, email) {
    // 1) Normalizamos el email (para evitar "SOFI@..." vs "sofi@...")
    let emailNormalizado = email.toLowerCase().trim();

    // 2) Validamos que ese email no exista ya
    let existe = usuarios.some(usuario => usuario.email === emailNormalizado);

    if (existe) {
        console.log("❌ Ya existe un usuario con ese email.");
        return;
    }

    // 3) Creamos un ID nuevo (buscamos el mayor id y le sumamos 1)
    let maxId = 0;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id > maxId) {
            maxId = usuarios[i].id;
        }
    }
    let nuevoId = maxId + 1;

    // 4) Creamos el nuevo usuario con la estructura pedida
    let nuevoUsuario = {
        id: nuevoId,
        nombre: nombre.trim(),
        email: emailNormalizado,
        librosPrestados: [] // ✅ siempre inicia vacío
    };

    // 5) Lo agregamos al array
    usuarios.push(nuevoUsuario);

    // 6) Confirmación
    console.log("✅ Usuario registrado con éxito:", nuevoUsuario);
}

/**
 * 3b) mostrarTodosLosUsuarios()
 * Devuelve el array completo de usuarios.
 */
function mostrarTodosLosUsuarios() {
    return usuarios;
}

/**
 * 3c) buscarUsuario(email)
 * Busca un usuario dentro del array "usuarios" a partir
 * de su email y devuelve su información.
 */
function buscarUsuario(email) {
    // 1) Normalizamos el email recibido
    let emailBuscado = email.toLowerCase().trim();

    // 2) Recorremos el array de usuarios (búsqueda lineal)
    for (let i = 0; i < usuarios.length; i++) {
        let usuario = usuarios[i];

        // 3) Comparamos emails
        if (usuario.email.toLowerCase().trim() === emailBuscado) {
            console.log("🔍 Usuario encontrado:");
            console.log(usuario);
            return usuario;
        }
    }

    // 4) Si no se encuentra
    console.log("❌ No se encontró ningún usuario con ese email.");
    return null;
}

// 🧪 Prueba opcional
// buscarUsuario("sofimmendoza@gmail.com");

/**
 * 3d) borrarUsuario(nombre, email)
 * Elimina un usuario del array "usuarios".
 * Se valida que no tenga libros prestados.
 */
function borrarUsuario(nombre, email) {
    // 1) Normalizamos datos
    let nombreBuscado = nombre.trim().toLowerCase();
    let emailBuscado = email.trim().toLowerCase();

    let indice = -1;

    // 2) Buscamos el usuario
    for (let i = 0; i < usuarios.length; i++) {
        let usuario = usuarios[i];

        let nombreActual = usuario.nombre.trim().toLowerCase();
        let emailActual = usuario.email.trim().toLowerCase();

        if (emailActual === emailBuscado && nombreActual === nombreBuscado) {
            indice = i;
            break;
        }
    }

    // 3) Si no existe
    if (indice === -1) {
        console.log("❌ No se encontró un usuario con ese nombre y email.");
        return;
    }

    // 4) Verificamos préstamos
    if (usuarios[indice].librosPrestados.length > 0) {
        console.log("⚠️ No se puede borrar el usuario porque tiene libros prestados.");
        console.log("📚 Libros prestados:", usuarios[indice].librosPrestados);
        return;
    }

    // 5) Eliminamos el usuario
    let usuarioEliminado = usuarios.splice(indice, 1);

    // 6) Confirmación
    console.log("🗑️ Usuario eliminado con éxito:", usuarioEliminado[0]);
}

/**
 * En este punto se desarrollaron las funciones necesarias para la gestión de usuarios del sistema de biblioteca.
 *
 * Se implementaron funciones para:
 * - Registrar nuevos usuarios validando que el email no se repita.
 * - Mostrar el listado completo de usuarios registrados.
 * - Buscar un usuario específico a partir de su email utilizando una búsqueda lineal.
 * - Eliminar un usuario validando previamente que no tenga libros prestados, para mantener la integridad del sistema.
 *
 * Durante el desarrollo se aplicaron conceptos fundamentales de JavaScript como:
 * - Uso de arrays y objetos.
 * - Recorridos con ciclos for.
 * - Manejo de strings (toLowerCase, trim).
 * - Condicionales y control de flujo.
 */

/**
 * ======================================================
 * ✅ 4) SISTEMA DE PRÉSTAMOS
 * ======================================================
 * En este punto implementamos:
 * 4a) prestarLibro(idLibro, idUsuario)
 * 4b) devolverLibro(idLibro, idUsuario)
 *
 * Reglas básicas:
 * - Un libro solo se presta si está disponible.
 * - Al prestar: disponible = false y se agrega el id del libro al usuario.
 * - Al devolver: disponible = true y se elimina el id del libro del usuario.
 */

/**
 * 4a) prestarLibro(idLibro, idUsuario)
 * Marca un libro como no disponible y lo agrega al array de librosPrestados del usuario.
 */
function prestarLibro(idLibro, idUsuario) {
    // 1) Buscar el libro por ID
    let libro = null;
    for (let i = 0; i < libros.length; i++) {
        if (libros[i].id === idLibro) {
            libro = libros[i];
            break;
        }
    }

    if (libro === null) {
        console.log("❌ No existe un libro con ese ID.");
        return;
    }

    // 2) Verificar disponibilidad
    if (libro.disponible === false) {
        console.log("⚠️ El libro no está disponible para préstamo.");
        return;
    }

    // 3) Buscar el usuario por ID
    let usuario = null;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === idUsuario) {
            usuario = usuarios[i];
            break;
        }
    }

    if (usuario === null) {
        console.log("❌ No existe un usuario con ese ID.");
        return;
    }

    // 4) Marcar libro como prestado
    libro.disponible = false;

    // 5) Agregar el ID del libro a librosPrestados del usuario
    usuario.librosPrestados.push(idLibro);

    console.log(`✅ Préstamo realizado: "${libro.titulo}" fue prestado a ${usuario.nombre}`);
}

/**
 * 4b) devolverLibro(idLibro, idUsuario)
 * Marca un libro como disponible y lo elimina del array de librosPrestados del usuario.
 */
function devolverLibro(idLibro, idUsuario) {
    // 1) Buscar el libro por ID
    let libro = null;
    for (let i = 0; i < libros.length; i++) {
        if (libros[i].id === idLibro) {
            libro = libros[i];
            break;
        }
    }

    if (libro === null) {
        console.log("❌ No existe un libro con ese ID.");
        return;
    }

    // 2) Buscar el usuario por ID
    let usuario = null;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === idUsuario) {
            usuario = usuarios[i];
            break;
        }
    }

    if (usuario === null) {
        console.log("❌ No existe un usuario con ese ID.");
        return;
    }

    // 3) Verificar si el usuario realmente tiene ese libro prestado
    let indiceLibroPrestado = usuario.librosPrestados.indexOf(idLibro);

    if (indiceLibroPrestado === -1) {
        console.log("⚠️ Ese usuario no tiene registrado ese libro como prestado.");
        return;
    }

    // 4) Marcar el libro como disponible nuevamente
    libro.disponible = true;

    // 5) Eliminar el libro del array librosPrestados del usuario
    usuario.librosPrestados.splice(indiceLibroPrestado, 1);

    console.log(`✅ Devolución realizada: "${libro.titulo}" fue devuelto por ${usuario.nombre}`);
}

/**
 * En este punto se desarrolló el sistema de préstamos de libros de la biblioteca,
 * permitiendo registrar la entrega y devolución de libros a los usuarios.
 *
 * Se implementaron las siguientes funciones:
 * - prestarLibro(idLibro, idUsuario): verifica que el libro exista, que esté disponible y que el usuario exista.
 *   Luego marca el libro como no disponible y agrega su ID al listado de libros prestados del usuario.
 *
 * - devolverLibro(idLibro, idUsuario): verifica que el libro y el usuario existan y que el usuario tenga ese libro prestado.
 *   Luego marca el libro como disponible y elimina su ID del array librosPrestados del usuario.
 *
 * Durante el desarrollo se aplicaron conceptos como:
 * - Búsqueda manual en arrays.
 * - Uso de condicionales para validaciones.
 * - Métodos de arrays (push, indexOf, splice).
 * - Manipulación de objetos y estados (disponible).
 */


