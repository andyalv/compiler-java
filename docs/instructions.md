# Proyecto, generador de aplicaciones desde una página web (15 abril)

Proyecto a realizarse en equipo de máximo 3 personas
 
Diseñar un lenguaje para especificar la conformación de una base de datos, es decir, un lenguaje para crear la BD y crear las tablas con sus campos. El siguiente le puede servir para inspirar el diseño del lenguaje, personalice a su gusto las instrucciones, pero mantenga la idea de que sea un lenguaje muy simple, accesible a gente sin conocimientos en computación.

```text
crear empresa
usar empresa
tabla depto
    inicio
       nombre letras
       codigo letras
       num   numeros
       funciones letras
    fin 
  tabla empleado
    inicio
       nombre letras
       edad numeros
       fechanac fecha
       salario numeros
       depende_de depto  
    fin
  cerrar
```

Nótese que el campo "depende_de tabla" intenta modelar una llave foránea para enlazar la tabla empleado con la tabla de depto, es decir, un empleado pertenece a un departamento.
 
A partir de ese lenguaje construya la gramática que compile sus casos de ejemplo, véase el material para el proyecto en la carpeta compartida de este canal.
 
Los casos de prueba del lenguaje de alto nivel deberá introducirse en un IDE en una página web, de la siguiente manera:
1. Una caja de texto para escribir las instrucciones del lenguaje de alto nivel para crear la BD, 
2. Agregar un botón para compilar (EL COMPILADOR DEBE ESTAR DESARROLLADO EN ANTLR) y si hay errores mostrarlos en otra caja de texto de la página web
3. Generar el código SQL equivalente y enviar a un archivo de texto, también generar otro archivo de texto que describa la estructura de la base de datos (este archivo se usará en el proyecto de la unidad 4)
4. (Opcional pero susceptible de mayor calificación) Botón para conectarse al gestor de base de datos y crear la base de datos  

Escribir reporte del proyecto y subirlo a Teams a mas tardar el 14 de abril de 2026