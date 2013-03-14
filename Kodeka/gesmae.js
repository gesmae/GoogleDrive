
function sbInicializar() {
var  straux;
var  data, sqlList;
var  dataRecord;
var  arrayCampos;

var  intCampos;
var  blnCambioTabla;

var  intsql;
var  strSql, strSqlInsert;
var  strTablaActual;
var  strCreate;
var  intSqlListIndex;

var  j;

 currentrowppal=-1;
 if(localStorage.comercial != null  && localStorage.comercial != "0" && localStorage.comercial != 'undefined')
    
    {
   $("h3").text('Kodeka <Comercial ' + localStorage.comercial  + '>');
  } 

  else {        
    $("#popupLogin").popup( "open" )
             
 return;

 }
 q=String.fromCharCode(34);
 blnCambioTabla=true;

 document.body.style.cursor = 'wait';
req=fnGetRemoteData(strRemoteDB,"select * from tablas order by tablas.table, orden;");


 data=JSON.parse(req);

List1.Visible=true;

 strSql="";
 sqlList = []; // Contiene las sql a ejecutar
 sqlListIndex=[];
 intSqlListIndex=0;
intsql=0;

 if(DB!=0) {
     arRecord = data[0];
     for   (i=0; i <= UBound(data)-1; i++) {
        if(i >= UBound(data)-1 )  { break  }
         if(i!=0 ) { arRecord = data[0]; }
 //           
            if(i==0 || blnCambioTabla) {
               if(i >= UBound(data)-1 )  { break  }

		   strCreate="";
                   strSql="";
                   strSqlInsert="";
                   strTablaActual= data[i].Table;
                   offset=10000;
                   numeroregistros=0;

                   arrayCampos=[]; //Contiene los campos de cada tabla para formar la insert
                   intCampos=0; // Contiene el numero de campo 
                   strTablaActual=UCase(strTablaActual);

                   sqlList[intsql]=["DROP TABLE IF EXISTS "  +   UCase(strTablaActual)  +  ";"];
                   intsql=intsql+1;
 // MsgBox "" &  sqlList[0]
 // Sql  (DB,  sqlList)



                   strSqlInsert="INSERT INTO "  +   strTablaActual  +  " values (";



                   strCreate="CREATE TABLE IF NOT EXISTS "  +    strTablaActual  +   "(";

                   strCreate=strCreate  +  " '"    +  data[i].Campo  +  "' "  +  data[i].TYPES  +  " ";
                   if(strTablaActual=="tablas") {
                     req=fnGetRemoteData(strRemoteDB,"select * from "  +  strTablaActual  +  "  limit 10000;");
 } else {

                   req=fnGetRemoteData(strRemoteDB,"select * from "  +  strTablaActual  +  "  where codigocomisionista='"  +  (localStorage.comercial)  +  "' limit 10000;");
                }

                   dataRecord=JSON.parse(req);

                   arrayCampos[intCampos]= data[i].Campo;
 //strSqlInsert= strSqlInsert & " "   & data[i].Campo & ", "
                   blnCambioTabla=false;
             }else if (data[i].Table==strTablaActual ) {
		   strCreate=strCreate  +  ", '"    +  data[i].Campo  +  "' "  +  data[i].TYPES  +  " ";

                   arrayCampos[intCampos]= data[i].Campo;
 //INDICES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                   if(data[i].Index==1) {
                      sqlListIndex[intSqlListIndex]=["Create index "  +  data[i].Table  +  "_"  +  data[i].Campo  +  " ON "  +  data[i].Table  +  " ("  +  data[i].Campo  +  ")"];
                      intSqlListIndex=intSqlListIndex+1;
                    }
 //INDICES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!                   

 } else {
		   strCreate= Left(strCreate,Len(strCreate)-0) +  ");";
 // sqlList=[]

                   sqlList[intsql]=[strCreate];
                   intsql=intsql+1;

 //   Sql(DB,  sqlList)	
                   strCreate="";
 //  Exit Sub
 // strSqlInsert=strSqlInsert & ");"
                  j=0;
                  maxregistro=UBound(dataRecord);
                 while (j<= maxregistro -1) {


                       for   (K=0; K <= intCampos -1; K++) {
                         if(K==0) {
                          straux=arrayCampos[K];
                          strSql= strSql  +  "'"  +  dataRecord[j][straux]  +  "' ";
 } else {
                          straux=arrayCampos[K];
                          strSql= strSql  +  ", '"  +  dataRecord[j][straux]  +  "' ";
                         }
 //   lblFoot.value="Cargando " & strTablaActual & " / " & arrayCampos[k]
 // MsgBox strSqlInsert 
                       }
 //    lblFoot.value= "ejecutar " & strSqlInsert & strSql & ");"
 //   sqlList = [] 
                      sqlList[intsql]=[strSqlInsert  +  strSql  +  ");"];
                      intsql=intsql+1;

 //  If j<10 Then MsgBox sqlList[0]
 // 
                      numeroregistros=numeroregistros + 1;
 //     If numeroregistros <3 Or numeroregistros >1997 Then  MsgBox "registros " & numeroregistros  & " offset & " & offset
                      strSql="";
 // If parar=1 And numeroregistros>3997 Then MsgBox "jota " & numeroregistros & " offset " & offset

                      if(numeroregistros == offset -1) {
 //  MsgBox "offset alcanzado en tabla " & strTablaActual  & " " &  offset & " / " &   numeroregistros

                         req=fnGetRemoteData(strRemoteDB,"select * from "  +  strTablaActual  +  " where codigocomisionista='"  +  parseInt(localStorage.comercial)  +  "' limit 10000;");
                         offset=offset + 10000;
 //  lblFoot.value="iniciando " & strTablaActual 
                         dataRecord=JSON.parse(req);
                         maxregistro=UBound(dataRecord);
 //    MsgBox "reg " & numeroregistros & " maximo "  & maxregistro

                         j=0;
 } else {
                         j=j+1;
                  }

                   }

 //     MsgBox " fin " & strSqlInsert
 // Sql(DB,  sqlList)	
                   strSql="";



		   blnCambioTabla=true;
		   i=i-1;
        }
        intCampos=intCampos+1;

    }
}

Sql(DB,  sqlList);
if(intSqlListIndex>0) {
 Sql(DB,  sqlListIndex);
}
 //

 document.body.style.cursor = 'default';


  DB = SqlOpenDatabase ("database.db" ,"1.0" ,"BaseKodeka" );
   if(localStorage.comercial != null  && localStorage.comercial != "0") {
    localStorage.comercial=localStorage.comercial;
    }
_msgbox_confirm("Carga de datos finalizada");

return savethefunction_rvar; }





function fnGetRemoteData(remoteDB, txtSql) 
                            { savethefunction_rvar="";

   req=Ajax(remoteDB,"POST" ,txtSql);
   if(req.status!=200) {

      _msgbox_confirm("Error");
       savethefunction_rvar ="";
 } else {

       savethefunction_rvar = req.responseText;

 }
return savethefunction_rvar; }
        function alerta() {
			alert('Hola');

               
		}

		    function sbBorraLista()
  {
	 //  $('#List1').remove();
            
          //          $('#List1').listview('option', 'filter', fase);
			//		   $('#List1').trigger("listviewcreate");
			//		    $('#List1').listview('option', 'filter', true);
           
         //    $('#List1').html('');
      

   //         $.mobile.changePage($('#dashboard'), { reloadPage: "true" });
    //        $('#dashboard .message').text('Your presentations');
            
		}
   		    function sbCambiarComercial(strAuxComercial)
       {
             

            localStorage.comercial =parseInt( strComercial.value );
             
              $("h3").text('Kodeka <Comercial ' + localStorage.comercial  + '>');
             

      
		} 
          function   sbInicializaComisionista() 
        {
             
             $("#popupLogin").popup( "open" )
           // localStorage.comercial =parseInt( strComercial.value );
             
          //    $("h3").text('Kodeka <Comercial ' + localStorage.comercial  + '>');
             

      
		}  