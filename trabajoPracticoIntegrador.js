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

// 🧪 Prueba opcional
// console.log("👥 Usuarios:", mostrarTodosLosUsuarios());

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

// 🧪 Prueba opcional
// borrarUsuario("Sofía Mendoza", "sofimmendoza@gmail.com");

/**
 * En este punto se desarrollaron las funciones necesarias para la gestión de usuarios del sistema de biblioteca.

 * Se implementaron funciones para:
 * - Registrar nuevos usuarios validando que el email no se repita.
 * - Mostrar el listado completo de usuarios registrados.
 * - Buscar un usuario específico a partir de su email utilizando una búsqueda lineal.
 * - Eliminar un usuario validando previamente que no tenga libros prestados, para mantener la integridad del sistema.

 * Durante el desarrollo se aplicaron conceptos fundamentales de JavaScript como:
 * - Uso de arrays y objetos.
 * - Recorridos con ciclos for.
 * - Manejo de strings (toLowerCase, trim).
 * - Condicionales y control de flujo.
 */
