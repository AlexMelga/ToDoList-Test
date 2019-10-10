Descripción y contexto

Se desarrolló una aplicación que sirve para crear una lista de tareas.

Las funcionalidades son las descriptas a continuación:

-Creación de tareas sin limite de cantidad.

-Adjuntar archivo en la creación de la tarea.

-Listado de tareas que contiene columnas de: ID, Descripción, Estado, Acciones (Borrar tarea, Adjuntar archivo, Eliminar archivo, Descargar archivo segun el caso).

-Marcar una tarea como resuelta (o pasarla a pendiente nuevamente).

-Filtrado de tareas por ID, Descripción y/o estado.

------------------------------------------------------------------------------------------------------------------
Guía de usuario

- La pantalla inicial muestra el listado de todas las tareas y posibilita el ingreso de nuevas.

1) Creación de una nueva tarea:
	a) Posicionarse sobre la caja de texto que dice "Nombre de la tarea".
	b) Escribir descripción de la tarea.
	c) Si desea adjuntar un archivo puede hacer click en botón con icono de un clip y seleccionar el archivo de su computadora. En caso de que desee quitar el archivo que seleccionó, debe hacer click en la "x" que aparece junto al nombre del archivo seleccionado previamente.
	d) Presionar botón Enter o hacer click sobre el botón "Agregar tarea".
	e) La tarea se crea y se agrega primera en la lista de tareas. Se muestra mensaje confirmando creación.

2) Eliminación de una tarea
	a) Ubicar en la lista la tarea que se desea eliminar
	b) Presionar el botón con icono de un tacho de basura que se encuentra al lado de la descripción de la tarea.
	c) La tarea se elimina y se muestra mensaje de confirmación.

3) Adjuntar archivo a una tarea (sólo disponible para aquellas que no tienen un archivo)
	a) Ubicar en la lista la tarea a la que se desea adjuntar archivo.
	b) Hacer click en botón con icono de un clip.
	c) Seleccionar archivo de su computadora.
	d) El archivo se adjunta a la tarea y se muestra mensaje de confirmación.

4) Descargar archivo de una tarea (sólo disponible para aquellas que tienen un archivo adjunto)
	a) Ubicar en la lista la tarea de la cual se quiere descargar el archivo.
	b) Hacer click en botón con icono de una flecha hacia abajo.
	c) El archivo comienza a descargar y se guarda en su computadora.
	
5) Eliminar archivo adjunto a tarea (sólo disponible para aquellas que tienen un archivo adjunto)
	a) Ubicar en la lista la tarea de la cual se quiere eliminar el archivo.
	b) Hacer click en botón con icono de una goma de borrar.
	c) El archivo se elimina y se muestra mensaje de confirmación.
	
6) Filtros: Se permite el filtrado por ID, Descripción y/o estado. Tener en cuenta que los filtros pueden ser multiples (Por ej.: se puede filtrar a la vez por ID y Descripción)
	6.1 - Filtro por ID:
		a) Hacer click en encabezado de columna ID. Aparecerá una caja de texto.
		b) Ingresar ID a buscar (Puede ser sólo el primer dígito) y presionar tecla Enter.
		c) Si hay IDs de tarea que comiencen con los dígitos ingresados, se mostrarán en la lista.
		d) Para quitar el filtro se debe volver a hacer click en encabezado de columna ID. Una vez aparece la caja de texto, se debe presionar la "x" que está al costado (o borrar el contenido) y presionar la tecla Enter.
		e) Se puede salir del modo filtro haciendo click en la caja de texto y luego en cualquier otro lado de la pantalla.
	
	6.2 - Filtro por Descripción:
		a) Hacer click en encabezado de columna Descripción. Aparecerá una caja de texto.
		b) Ingresar Descripción a buscar y presionar tecla Enter.
		c) Si hay tareas que en su descripción contengan las letras ingresadas, se mostrarán en la lista.
		d) Para quitar el filtro se debe volver a hacer click en encabezado de columna Descripción. Una vez aparece la caja de texto, se debe presionar la "x" que está al costado (o borrar el contenido) y presionar la tecla Enter.
		e) Se puede salir del modo filtro haciendo click en la caja de texto y luego en cualquier otro lado de la pantalla.
	
	6.3 - Filtro por estado:
		a) Hacer click en encabezado de columna ¿Resuelta?. Aparecerá una selector de opciones que muestra 3 opciones:
			- Todas: muestra todas las tareas.
			- Resueltas: muestra solo las tareas marcadas como resueltas.
			- Pendientes: muestra solo las tareas pendientes.
		b) La opción seleccionada hará que se muestren las tareas que cumplan con la selección.
		c) Se puede salir del modo filtro haciendo click en el selector de opciones y luego en cualquier otro lado de la pantalla.

------------------------------------------------------------------------------------------------------------------
Guía de instalación

La aplicación consta de 2 proyectos:
- Proyecto "TasksApi" que contiene una API REST programada en nodeJS.
- Proyecto "ToDoList" que contiene una aplicación cliente desarrollada con Angular y Typescript.

Requisitos:
- NodeJS 10.16.3 (Npm será instalado tambien).
- Servidor MongoDB local: Debe escuchar en puerto 27017 del localhost.

Pasos para su utilización:
1 - Descargar código fuente de ambos proyectos
2 - Abrir consola en directorio de proyecto "TasksApi" y ejecutar los siguientes comandos (Se instalan las dependencias y se inicia el proyecto en puerto 3000):
npm i
node server.js
Abrir consola en directorio de proyecto "ToDoList" y ejecutar los siguientes comandos (Se instalan las dependencias y se inicia el proyecto en puerto 4200):
npm i
ng serve
3 - La aplicación estará accesible en http://localhost:4200/# ToDoList-Test
