grammar T;

@header {
import java.util.ArrayList;
import java.util.List;
}

@members{   List <Tabla> tablas = new ArrayList<Tabla>();  
             Tabla tablaActual = null;

    public void generator(){

        
   String line = "\n";       
for (int ii=0;ii <tablas.size(); ii++) {        
        Tabla t = tablas.get(ii);
        int noAtributos = t.atributos.size();
        
        
        //////////////////////// GENERAR ARCHIVOS DE CODIGO
           
String imports="import java.awt.GridLayout;\n" +
               "import javax.swing.JTextField;\n" +
               "import javax.swing.JFrame;\n" +
               "import javax.swing.JLabel;\n" +
               "import javax.swing.JButton;\n" +
               "import javax.swing.JOptionPane;\n" +
               "import java.awt.event.ActionEvent;\n" +
               "import java.awt.event.ActionListener;\n" +
               "\n" + 
        "import java.sql.Connection;\n" +
        "import java.sql.DriverManager;\n" +
        "import java.sql.PreparedStatement;\n"+
        "import java.sql.ResultSet;\n"+
        "import java.sql.SQLException;\n"+
            "import java.util.logging.Level; \n" +
            "import java.util.logging.Logger; \n "+
              "\n" ;

 String prog = imports+"public class Principal{ " +line;
       prog+= "   public static void main(String args[] ) {"+"\n" ;
     //  prog+= "      List <MyVector> lv = new ArrayList<MyVector>();     "+"\n";
       prog+= "      JFrame v = new JFrame(\"Altas para la tabla...";
       prog+= ""+  t.nombre+" \");  "+"\n";
        prog+="      v.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);"+"\n";
        prog+="      v.setSize(600,400);"+"\n";
        prog+="      GridLayout lay = new GridLayout("+ (noAtributos+1) + ",2);"+"\n";
        prog+= "     v.setLayout(lay);"+"\n";
        
        for(int i=0; i<t.atributos.size(); i++){
          String name = t.atributos.get(i).nombreAtributo;
          prog+= "     JLabel lbl"+i+" = new JLabel(\"Digita "+name+" \"); "+"\n";
          prog+= "     v.add(lbl"+i+"); "+line;
          prog+= "     JTextField tf"+i+"= new JTextField();"+line;      
          prog+= "     v.add(tf"+i+"); "+line;
        }
        prog+= " JLabel lbl = new JLabel(\"Clik para proceder...\"); "
                + " v.add(lbl);\n" +
             "        JButton btn = new JButton(\"Agregar\");   "
                + " v.add(btn);\n"  ;   
 
        prog+="       btn.addActionListener(new ActionListener()\n" +
 "        {\n" +
 "               @Override\n" +
 "                 public void actionPerformed(ActionEvent ae) {\n" +
 "                      String mensaje=\"\"; \n" ;
   
         String mensajes ="mensaje";
         for(int i=0; i<t.atributos.size(); i++){
             mensajes+= "+tf"+i+".getText()" + " +\"  \\n  \"  " ;
         }
        
 prog+="Connection connection=null;\n" +
      "     try {\n" +
      line +
      "  try { \n"+
      "     Class.forName(\"com.mysql.jdbc.Driver\").newInstance();\n" +
      "  } catch (ClassNotFoundException ex) {\n" +
      "Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);\n" +
      "}\n" +
      " catch (InstantiationException ex) { \n"+
               " Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);\n"+
                          "} catch (IllegalAccessException ex) {\n"+
                           "   Logger.getLogger(Principal.class.getName()).log(Level.SEVERE, null, ex);\n"+
                          "}\n"+
 "     String url = \"jdbc:mysql://localhost:3306/DBCM\";       \n" +
 "     connection = DriverManager.getConnection(url, \"root\", \"ttt\");\n" +
 "\n" +
 "     } catch (SQLException e) {\n" +
 "        // TODO Auto-generated catch block\n" +
 "        e.printStackTrace();\n" +
 "     }";         
 
 prog+="                      JOptionPane.showMessageDialog(null,"+mensajes+");\n" +
 "                 }\n" +
 "             });\n" +
 " ";
        
        prog+=" v.pack(); "+line;
        prog+= "v.setLocationRelativeTo(null);" +line;
        prog+= "v.setVisible(true); "+line;
        prog+="  "+line;
        prog+="}"+line;
        prog+="}"+line;
        
     System.out.println(prog);  
        
    }


    }


}

inicio :  creacion usar tabla+ cerrar;

creacion : CREAR ID {System.out.println("CREATE DATABASE "+$ID.text); 
                    }; 

usar     : USAR  ID {System.out.println("USE DATABASE "+$ID.text); };


// tabla : TABLA ID INICIO {} campo+ FIN {};


tabla    : TABLA ID INICIO 
                  { 
                    //código para generar SQL
      System.out.println("CREATE TABLE "+$ID.text ); 
      System.out.println(" ("+$ID.text+"_key INTEGER AUTOINCREMENT NOT NULL"); 
                     //código para crear estructura de datos
                        Tabla t = new Tabla();
                        t.nombre =$ID.text;
                        tablas.add(t);
                        tablaActual = t;
                     //
                   }
             campo+ 
             FIN  {
                     System.out.println("   );   "); 
                  };

campo   : ID  (t=NUMERICO | t=ALFABETICO | t=FECHA)
                { //aquí hay que agregar código para generar SQL
                    if(($t.text).compareTo("letras")==0) 
                       System.out.println(", "+$ID.text + " VARCHAR(300)" );
                    else if(($t.text).compareTo("fecha")==0)
                       System.out.println(", "+$ID.text + " DATE" ); 
                    else  System.out.println(", "+$ID.text + " " +$t.text );    

                 //el que sigue es código para crear estructura de datos
                  Atributo a  = new Atributo();
                      a.nombreAtributo = $ID.text;
                      a.tipoAtributo = $t.text;
                  tablaActual.atributos.add(a);
                };


cerrar   : CERRAR {
              for (int i=0; i<tablas.size(); i++){ 
                 System.out.println("\nTabla: "+tablas.get(i).nombre);
                 List <Atributo> atribs= tablas.get(i).atributos;
                 
                 for (int j=0; j<atribs.size(); j++){  
                   System.out.print("<Atributo>  "+atribs.get(j).nombreAtributo);
                   System.out.println(" \t<TipoAtrib> "+atribs.get(j).tipoAtributo);
                 }

                  System.out.println("\n\n");   
               }
                generator();
           };

CERRAR   : 'cerrar';
NUMERICO  : 'numeros';
ALFABETICO: 'letras';
FECHA     : 'fecha'  ;
TABLA : 'tabla'  ;
INICIO: 'inicio' ;
FIN   : 'fin'    ;
USAR  : 'usar'   ;
CREAR : 'crear'  ;
ID    : ('a'..'z'|'A'..'Z'|'_') ('a'..'z'|'A'..'Z'|'0'..'9'|'_')* ;  
WS   :(' ' | '\n' | '\t' | '\r')+   {$channel=HIDDEN; } ;  