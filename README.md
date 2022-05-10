## Routes of General Services:

a)  /api or / : esta rutas te devuelve una bienvenida a la Api.
    --Metodos aceptados: GET.

## Routes of User Services:

a)  /api/users: esta ruta devuelve todos los usuarios registrado.
    --Metodos aceptados: GET.

b)  /api/users/register: esta ruta resive los datos correspondiente del usario (en este caso: {name,rol,password})  y lo registra.
    --Metodos aceptados: POST.

c) /api/users/user/id : esta ruta permite controlar un usuario individualmente.
    --Metodos aceptados: PUT, DELETE, GET.

## Routes of Categoria Services:

a)  /api/categorias: esta ruta devuelve todos las categorias guardadas y permite el guardado de categorias, para el guardado resive los datos correspondiente del usario (en este caso: name).
    --Metodos aceptados: POST,GET.

b) /api/categorias/categoria/id : esta ruta permite controlar las categorias individualmente.
    --Metodos aceptados: PUT, DELETE, GET.

## Routes of menu Services:

a)  /api/menu: esta ruta devuelve todos los menu guardados y permite el guardado de menu, para el guardado resive los datos correspondiente del usario (en este caso: {name, precio, total_likes,categoriaId}).
    --Metodos aceptados: POST,GET.

b) /api/menu/servicio/id : esta ruta permite controlar los menu individualmente.
    --Metodos aceptados: PUT, DELETE, GET.

## Routes of comentarios Services:

a)  /api/comentarios: esta ruta devuelve todos los comentarios guardados y permite el guardado de comentarios, para el guardado resive los datos correspondiente del usario (en este caso: comment, menuId).
    --Metodos aceptados: POST,GET.

b) /api/menu/servicio/id : esta ruta permite controlar los comentarios individualmente.
    --Metodos aceptados: PUT, DELETE, GET.