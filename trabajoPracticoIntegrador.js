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

/**
 * ======================================================
 * ✅ 5) REPORTES
 * ======================================================
 * 5a) generarReporteLibros()
 * Usamos métodos avanzados de arrays:
 * - filter() para seleccionar libros según condición
 * - reduce() para acumular cantidades / agrupar
 * - map() para transformar datos
 *
 * El reporte debe incluir:
 * ✔ Cantidad total de libros
 * ✔ Cantidad de libros prestados
 * ✔ Cantidad de libros por género
 * ✔ Libro más antiguo y más nuevo
 */

function generarReporteLibros() {
    // ✅ 1) Cantidad total de libros
    let totalLibros = libros.length;

    // ✅ 2) Cantidad de libros prestados (no disponibles)
    let librosPrestados = libros.filter(libro => libro.disponible === false);
    let cantidadPrestados = librosPrestados.length;

    // ✅ 3) Cantidad de libros por género
    // reduce crea un objeto donde cada clave es el género y el valor es la cantidad
    let cantidadPorGenero = libros.reduce((acumulador, libro) => {
        let genero = libro.genero;

        // Si ese género todavía no existe en el acumulador, lo inicializamos en 0
        if (!acumulador[genero]) {
            acumulador[genero] = 0;
        }

        // Sumamos 1 por cada libro encontrado en ese género
        acumulador[genero] += 1;

        return acumulador;
    }, {});

    // ✅ 4) Libro más antiguo y más nuevo (por año)
    // Usamos reduce para comparar años
    let libroMasAntiguo = libros.reduce((min, libro) => {
        return libro.anio < min.anio ? libro : min;
    }, libros[0]);

    let libroMasNuevo = libros.reduce((max, libro) => {
        return libro.anio > max.anio ? libro : max;
    }, libros[0]);

    // ✅ 5) Armamos el objeto "reporte" con toda la info
    let reporte = {
        totalLibros: totalLibros,
        cantidadPrestados: cantidadPrestados,
        cantidadPorGenero: cantidadPorGenero,
        libroMasAntiguo: {
            titulo: libroMasAntiguo.titulo,
            autor: libroMasAntiguo.autor,
            anio: libroMasAntiguo.anio
        },
        libroMasNuevo: {
            titulo: libroMasNuevo.titulo,
            autor: libroMasNuevo.autor,
            anio: libroMasNuevo.anio
        }
    };

    // ✅ 6) Mostramos el reporte en consola de forma clara
    console.log("📊 REPORTE DE LIBROS");
    console.log("📚 Total de libros:", reporte.totalLibros);
    console.log("📕 Libros prestados:", reporte.cantidadPrestados);
    console.log("🗂️ Libros por género:", reporte.cantidadPorGenero);
    console.log("⏳ Libro más antiguo:", reporte.libroMasAntiguo);
    console.log("🚀 Libro más nuevo:", reporte.libroMasNuevo);

    // ✅ 7) Devolvemos el reporte
    return reporte;
}

/**
 * En este punto se generó un reporte general del estado de los libros usando métodos avanzados de arrays.
 *
 * Se utilizó:
 * - filter() para contar libros prestados (no disponibles).
 * - reduce() para agrupar y contar libros por género.
 * - reduce() también para encontrar el libro más antiguo y el más nuevo según el año.
 *
 * La función devuelve un objeto con toda la información y además la muestra por consola.
 */

/**
 * ======================================================
 * ✅ 8) MANEJO DE CADENAS
 * ======================================================
 * normalizarDatos()
 * Normaliza títulos de libros, nombres de autores y emails de usuarios.
 */

function normalizarDatos() {
    // ✅ 1) Normalizamos datos de libros
    for (let i = 0; i < libros.length; i++) {
        // Títulos a mayúsculas
        libros[i].titulo = libros[i].titulo.toUpperCase();

        // Eliminamos espacios en autores
        libros[i].autor = libros[i].autor.trim();
    }

    // ✅ 2) Normalizamos emails de usuarios
    for (let i = 0; i < usuarios.length; i++) {
        usuarios[i].email = usuarios[i].email.toLowerCase().trim();
    }

    // ✅ 3) Confirmación
    console.log("🔧 Datos normalizados correctamente.");
}

/**
 * En este punto se desarrolló una función para normalizar los datos
 * del sistema de biblioteca.
 *
 * Se realizaron las siguientes acciones:
 * - Conversión de los títulos de libros a mayúsculas.
 * - Eliminación de espacios innecesarios en los nombres de autores.
 * - Normalización de los emails de los usuarios a minúsculas.
 *
 * Se aplicaron métodos de strings como toUpperCase(), trim() y toLowerCase(),
 * recorriendo los arrays correspondientes.
 */

/**
 * ======================================================
 * ✅ 9) INTERFAZ DE USUARIO POR CONSOLA
 * ======================================================
 * menuPrincipal()
 * Muestra un menú de opciones y permite interactuar con el sistema.
 */

function menuPrincipal() {
    let opcion = "";

    // El menú se repite hasta que el usuario elija salir
    while (opcion !== "0") {
        console.log("\n📚 SISTEMA DE GESTIÓN DE BIBLIOTECA");
        console.log("1️⃣ Registrar usuario");
        console.log("2️⃣ Mostrar todos los usuarios");
        console.log("3️⃣ Buscar usuario por email");
        console.log("4️⃣ Borrar usuario");
        console.log("5️⃣ Prestar libro");
        console.log("6️⃣ Devolver libro");
        console.log("7️⃣ Generar reporte de libros");
        console.log("8️⃣ Normalizar datos");
        console.log("0️⃣ Salir");

        opcion = prompt("👉 Elegí una opción: ");

        switch (opcion) {
            case "1": {
                let nombre = prompt("Nombre del usuario: ");
                let email = prompt("Email del usuario: ");
                registrarUsuario(nombre, email);
                break;
            }

            case "2": {
                console.log("👥 Usuarios registrados:");
                console.log(mostrarTodosLosUsuarios());
                break;
            }

            case "3": {
                let email = prompt("Ingresá el email a buscar: ");
                buscarUsuario(email);
                break;
            }

            case "4": {
                let nombre = prompt("Nombre del usuario a borrar: ");
                let email = prompt("Email del usuario a borrar: ");
                borrarUsuario(nombre, email);
                break;
            }

            case "5": {
                let idLibro = Number(prompt("ID del libro a prestar: "));
                let idUsuario = Number(prompt("ID del usuario: "));
                prestarLibro(idLibro, idUsuario);
                break;
            }

            case "6": {
                let idLibro = Number(prompt("ID del libro a devolver: "));
                let idUsuario = Number(prompt("ID del usuario: "));
                devolverLibro(idLibro, idUsuario);
                break;
            }

            case "7": {
                generarReporteLibros();
                break;
            }

            case "8": {
                normalizarDatos();
                break;
            }

            case "0": {
                console.log("👋 Saliendo del sistema. ¡Gracias!");
                break;
            }

            default: {
                console.log("❌ Opción inválida. Intentá nuevamente.");
            }
        }
    }
}

// ▶️ Para iniciar el sistema
menuPrincipal();

/**
 * En este punto se desarrolló un menú interactivo por consola
 * que permite al usuario utilizar las distintas funcionalidades
 * del sistema de gestión de biblioteca.
 *
 * El menú se ejecuta dentro de un ciclo while y utiliza una
 * estructura switch para manejar las opciones seleccionadas.
 *
 * Se utilizó la librería prompt-sync para la interacción con el usuario
 * y se integraron las funciones desarrolladas en los puntos anteriores.
 */

/**
 * ======================================================
 * 📝 PUNTO 10: COMENTANDO MI CÓDIGO
 * ======================================================
 *
 * A lo largo de este trabajo práctico integrador se desarrolló
 * un sistema de gestión de biblioteca aplicando los conceptos
 * fundamentales de JavaScript vistos durante el curso.
 *
 * El código fue organizado por puntos, respetando la consigna
 * y aplicando buenas prácticas de nomenclatura, indentación
 * y comentarios explicativos.
 *
 * Cada funcionalidad fue implementada de manera modular,
 * utilizando funciones claras y reutilizables, estructuras
 * de control, arrays, objetos, métodos de strings y métodos
 * avanzados de arrays.
 *
 * Se priorizó que el código sea legible, entendible y fácil
 * de mantener, explicando paso a paso qué se realiza en cada
 * sección, tal como se trabajó durante las clases.
 *
 * Este trabajo fue realizado de forma grupal por:
 * ✔ Sofía Macarena Mendoza
 * ✔ Yamila Valdez Aguilar
 */





