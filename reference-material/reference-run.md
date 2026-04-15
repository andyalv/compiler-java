# Ejecución de prueba con material de referencia

**Input del comando en pseudocódigo:**

```shell
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
    fin
  cerrar
```

## Resultados

Una vez se terminó la línea del stream de input de datos de la compilación del archivo `Test.java` según la entrada anterior, se regresa en terminal los siguientes elemenentos. Todas estas impresiones existen dentro de `T.g`.

> **Nota:** En esta nota se reformateó el resultado según el lenguaje, en una ejecución real el formato se ve distinto.

### SQL

```sql
CREATE DATABASE empresa USE DATABASE empresa
CREATE TABLE
    depto (
        depto_key INTEGER AUTOINCREMENT NOT NULL,
        nombre VARCHAR(300),
        codigo VARCHAR(300),
        num NUMERIC,
        funciones VARCHAR(300)
    );

CREATE TABLE
    empleado (
        empleado_key INTEGER AUTOINCREMENT NOT NULL,
        nombre VARCHAR(300),
        edad NUMERIC,
        fechanac DATE,
        salario NUMERIC
    );
```

### Objetos de Java listados

```shell
Tabla: depto
<Atributo>  nombre      <TipoAtrib> letras
<Atributo>  codigo      <TipoAtrib> letras
<Atributo>  num         <TipoAtrib> numeros
<Atributo>  funciones   <TipoAtrib> letras

Tabla: empleado
<Atributo>  nombre      <TipoAtrib> letras
<Atributo>  edad        <TipoAtrib> numeros
<Atributo>  fechanac    <TipoAtrib> fecha
<Atributo>  salario     <TipoAtrib> numeros
```

### Código de java

#### Tabla `depto`

```java
import java.awt.GridLayout;
import javax.swing.JTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
import javax.swing.JOptionPane;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Principal {
    public static void main(String args[]) {
        JFrame v = new JFrame("Altas para la tabla...depto ");
        v.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        v.setSize(600, 400);
        GridLayout lay = new GridLayout(5, 2);
        v.setLayout(lay);
        JLabel lbl0 = new JLabel("Digita nombre ");
        v.add(lbl0);
        JTextField tf0 = new JTextField();
        v.add(tf0);
        JLabel lbl1 = new JLabel("Digita codigo ");
        v.add(lbl1);
        JTextField tf1 = new JTextField();
        v.add(tf1);
        JLabel lbl2 = new JLabel("Digita num ");
        v.add(lbl2);
        JTextField tf2 = new JTextField();
        v.add(tf2);
        JLabel lbl3 = new JLabel("Digita funciones ");
        v.add(lbl3);
        JTextField tf3 = new JTextField();
        v.add(tf3);
        JLabel lbl = new JLabel("Clik para proceder...");
        v.add(lbl);
        JButton btn = new JButton("Agregar");
        v.add(btn);
        btn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent ae) {
                String mensaje = "";
                Connection connection = null;
                try {

                    try {
                        Class.forName("com.mysql.jdbc.Driver").newInstance();
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (InstantiationException ex) {
                        Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (IllegalAccessException ex) {
                        Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    String url = "jdbc:mysql://localhost:3306/DBCM";
                    connection = DriverManager.getConnection(url, "root", "ttt");

                } catch (SQLException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
                JOptionPane.showMessageDialog(null, mensaje + tf0.getText() + "  \n  " + tf1.getText() + "  \n  "
                        + tf2.getText() + "  \n  " + tf3.getText() + "  \n  ");
            }
        });
        v.pack();
        v.setLocationRelativeTo(null);
        v.setVisible(true);

    }
}
```

#### Tabla `empleado`

```java
import java.awt.GridLayout;
import javax.swing.JTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
import javax.swing.JOptionPane;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Principal {
    public static void main(String args[]) {
        JFrame v = new JFrame("Altas para la tabla...empleado ");
        v.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        v.setSize(600, 400);
        GridLayout lay = new GridLayout(5, 2);
        v.setLayout(lay);
        JLabel lbl0 = new JLabel("Digita nombre ");
        v.add(lbl0);
        JTextField tf0 = new JTextField();
        v.add(tf0);
        JLabel lbl1 = new JLabel("Digita edad ");
        v.add(lbl1);
        JTextField tf1 = new JTextField();
        v.add(tf1);
        JLabel lbl2 = new JLabel("Digita fechanac ");
        v.add(lbl2);
        JTextField tf2 = new JTextField();
        v.add(tf2);
        JLabel lbl3 = new JLabel("Digita salario ");
        v.add(lbl3);
        JTextField tf3 = new JTextField();
        v.add(tf3);
        JLabel lbl = new JLabel("Clik para proceder...");
        v.add(lbl);
        JButton btn = new JButton("Agregar");
        v.add(btn);
        btn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent ae) {
                String mensaje = "";
                Connection connection = null;
                try {

                    try {
                        Class.forName("com.mysql.jdbc.Driver").newInstance();
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (InstantiationException ex) {
                        Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (IllegalAccessException ex) {
                        Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);
                    }
                    String url = "jdbc:mysql://localhost:3306/DBCM";
                    connection = DriverManager.getConnection(url, "root", "ttt");

                } catch (SQLException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
                JOptionPane.showMessageDialog(null, mensaje + tf0.getText() + "  \n  " + tf1.getText() + "  \n  "
                        + tf2.getText() + "  \n  " + tf3.getText() + "  \n  ");
            }
        });
        v.pack();
        v.setLocationRelativeTo(null);
        v.setVisible(true);

    }
}
```
## Resultados "crudos"

```
❯ java Test                                                                                                                                                        
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
    fin
  cerrar
^Z
CREATE DATABASE empresa
USE DATABASE empresa
CREATE TABLE depto

 (depto_key INTEGER AUTOINCREMENT NOT NULL
, nombre VARCHAR(300)
, codigo VARCHAR(300)
, num NUMERIC
, funciones VARCHAR(300)
   );
CREATE TABLE empleado
 (empleado_key INTEGER AUTOINCREMENT NOT NULL
, nombre VARCHAR(300)
, edad NUMERIC
, fechanac DATE
, salario NUMERIC
   );

Tabla: depto
<Atributo>  nombre      <TipoAtrib> letras
<Atributo>  codigo      <TipoAtrib> letras
<Atributo>  num         <TipoAtrib> numeros
<Atributo>  funciones   <TipoAtrib> letras




Tabla: empleado
<Atributo>  nombre      <TipoAtrib> letras
<Atributo>  edad        <TipoAtrib> numeros
<Atributo>  fechanac    <TipoAtrib> fecha
<Atributo>  salario     <TipoAtrib> numeros



import java.awt.GridLayout;
import javax.swing.JTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
import javax.swing.JOptionPane;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Principal{
   public static void main(String args[] ) {
      JFrame v = new JFrame("Altas para la tabla...depto ");
      v.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      v.setSize(600,400);
      GridLayout lay = new GridLayout(5,2);
     v.setLayout(lay);
     JLabel lbl0 = new JLabel("Digita nombre ");
     v.add(lbl0);
     JTextField tf0= new JTextField();
     v.add(tf0);
     JLabel lbl1 = new JLabel("Digita codigo ");
     v.add(lbl1);
     JTextField tf1= new JTextField();
     v.add(tf1);
     JLabel lbl2 = new JLabel("Digita num ");
     v.add(lbl2);
     JTextField tf2= new JTextField();
     v.add(tf2);
     JLabel lbl3 = new JLabel("Digita funciones ");
     v.add(lbl3);
     JTextField tf3= new JTextField();
     v.add(tf3);
 JLabel lbl = new JLabel("Clik para proceder...");  v.add(lbl);
        JButton btn = new JButton("Agregar");    v.add(btn);
       btn.addActionListener(new ActionListener()
        {
               @Override
                 public void actionPerformed(ActionEvent ae) {
                      String mensaje="";
Connection connection=null;
     try {

  try {
     Class.forName("com.mysql.jdbc.Driver").newInstance();
  } catch (ClassNotFoundException ex) {
Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);
}
 catch (InstantiationException ex) {
 Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);
} catch (IllegalAccessException ex) {
   Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);
}
     String url = "jdbc:mysql://localhost:3306/DBCM";
     connection = DriverManager.getConnection(url, "root", "ttt");

     } catch (SQLException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
     }                      JOptionPane.showMessageDialog(null,mensaje+tf0.getText() +"  \n  "  +tf1.getText() +"  \n  "  +tf2.getText() +"  \n  "  +tf3.getText() +"  \n  "  );
                 }
             });
  v.pack();
v.setLocationRelativeTo(null);
v.setVisible(true);

}
}

import java.awt.GridLayout;
import javax.swing.JTextField;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
import javax.swing.JOptionPane;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Principal{
   public static void main(String args[] ) {
      JFrame v = new JFrame("Altas para la tabla...empleado ");
      v.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      v.setSize(600,400);
      GridLayout lay = new GridLayout(5,2);
     v.setLayout(lay);
     JLabel lbl0 = new JLabel("Digita nombre ");
     v.add(lbl0);
     JTextField tf0= new JTextField();
     v.add(tf0);
     JLabel lbl1 = new JLabel("Digita edad ");
     v.add(lbl1);
     JTextField tf1= new JTextField();
     v.add(tf1);
     JLabel lbl2 = new JLabel("Digita fechanac ");
     v.add(lbl2);
     JTextField tf2= new JTextField();
     v.add(tf2);
     JLabel lbl3 = new JLabel("Digita salario ");
     v.add(lbl3);
     JTextField tf3= new JTextField();
     v.add(tf3);
 JLabel lbl = new JLabel("Clik para proceder...");  v.add(lbl);
        JButton btn = new JButton("Agregar");    v.add(btn);
       btn.addActionListener(new ActionListener()
        {
               @Override
                 public void actionPerformed(ActionEvent ae) {
                      String mensaje="";
Connection connection=null;
     try {

  try {
     Class.forName("com.mysql.jdbc.Driver").newInstance();
  } catch (ClassNotFoundException ex) {
Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);
}
 catch (InstantiationException ex) {
 Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);
} catch (IllegalAccessException ex) {
   Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);
}
     String url = "jdbc:mysql://localhost:3306/DBCM";
     connection = DriverManager.getConnection(url, "root", "ttt");

     } catch (SQLException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
     }                      JOptionPane.showMessageDialog(null,mensaje+tf0.getText() +"  \n  "  +tf1.getText() +"  \n  "  +tf2.getText() +"  \n  "  +tf3.getText() +"  \n  "  );
                 }
             });
  v.pack();
v.setLocationRelativeTo(null);
v.setVisible(true);

}
}
```