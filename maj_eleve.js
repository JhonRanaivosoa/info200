//var tliste_eleve=new Array();
//var televe=new Array();
var vcode_clas;
//var ielev;
var ieleves;
//var lig=0;

function afficher_eleve()
{
   enreg_eleve=televes[ielev].split(';');
   vmatricule=enreg_eleve[0];
   vnumero=enreg_eleve[1];
   vcode_classe=enreg_eleve[2];
   vnom=enreg_eleve[3];
   vdate_naiss=enreg_eleve[4];
   vlieu_naiss=enreg_eleve[5];
   vsexe=enreg_eleve[6];
   vdomicile=enreg_eleve[7];
   vphoto=enreg_eleve[8];

   form_eleve.zmatricule.value=vmatricule;
   form_eleve.znumero.value=vnumero;
   form_eleve.zcode_classe.value=vcode_classe;
   form_eleve.znom.value=vnom;
   form_eleve.zdate_naiss.value=vdate_naiss;
   form_eleve.zlieu_naiss.value=vlieu_naiss;
   form_eleve.zsexe.value=vsexe;
   form_eleve.zdomicile.value=vdomicile;
   form_eleve.zphoto.value=vphoto;
   document.getElementById("id_photo").src=vphoto;

}


function valider_enreg_eleve()
{
   if(form_eleve.zmatricule.value!=""&&form_eleve.znumero.value!=""&&form_eleve.zcode_classe.value!=""&&form_eleve.znom.value!="") 
      televes[ielev]=form_eleve.zmatricule.value+';'+form_eleve.znumero.value+';'+form_eleve.zcode_classe.value+';'+form_eleve.znom.value+';'+form_eleve.zdate_naiss.value+';'+form_eleve.zlieu_naiss.value+';'+form_eleve.zsexe.value+';'+form_eleve.zdomicile.value+';'+form_eleve.zphoto.value+';';
}

function debut_eleve()
 {valider_enreg_eleve();
  ielev=0;
  afficher_eleve();
 }

function suivant_eleve()
{ if (ielev<televes.length-1)
    {valider_enreg_eleve();
     ielev++;
     afficher_eleve();
    }
}

function dernier_eleve()
 { valider_enreg_eleve();
   ielev=televes.length-1;
   afficher_eleve();
 }

function precedent_eleve()
{ if (ielev>0)
    {valider_enreg_eleve();
     ielev--;
     afficher_eleve();
    }
}


function suppr_eleve()
{
 oui=confirm("Etes-vous sur de supprimer cet enregistrement ?");
 if(oui)
  {	  
    if (ielev==televes.length-1) 
     { televes.pop();
       ielev--;
	   if(ielev==-1) fermer_maj_eleve();
       afficher_eleve();  
       valider_enreg_eleve();
     }
    if (ielev<televes.length-1) 
     { televes.splice(ielev,1);
       afficher_eleve();  
       valider_enreg_eleve();
     }
   }  
}

function ajout_eleve() 
  {valider_enreg_eleve();
   ielev=televe.length;
   televe[ielev]=';;;';
   afficher_eleve();
   
  }


function valider_eleve()
{
 valider_enreg_eleve();
 contenu='';
 valider_enreg_eleve();
 contenu='';
  for(i in televes)
   {
    enreg_eleve=televes[i].split(';');
    vmatricule=enreg_eleve[0];
    vnum_en_classe=enreg_eleve[1];
    vcode_classe=enreg_eleve[2];  
    vnom=enreg_eleve[3];
    vdate_naiss=enreg_eleve[4];
    vlieu_naiss=enreg_eleve[5];
    vsexe=enreg_eleve[6];
    vdomicile=enreg_eleve[7];
    vphoto=enreg_eleve[8];
    for(j=0;j<enreg_eleve.length-1;j++)  contenu+=enreg_eleve[j]+";";
    contenu+="\n";

  }
 
 contenu=contenu.substring(0,contenu.length-1);
 form_eleve.zsave.value=contenu;
 }

function fermer_maj_eleve()
{ 
  valider_enreg_eleve();
  document.getElementById("id_div_outils").style.display='none';
  document.getElementById("id_div_corps").style.display='none';
  encours='non';
}	

function generer_outils_maj_eleve()
{
  contenu="<span class=outils_gauche>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='debut' onclick=debut_eleve()><img src='debut.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='suivant' onclick=suivant_eleve()><img src='suivant.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='precedent' onclick=precedent_eleve()><img src='precedent.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='dernier' onclick=dernier_eleve()><img src='dernier.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='supprimer' onclick=suppr_eleve()><img src='supprimer.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='ajouter' onclick=ajout_eleve()><img src='ajouter.png' class=clas_img></a></span>";
 
  contenu+="<span class=outils_droite>";
  contenu+="<a href=# title='fermer' onclick=fermer_maj_eleve()><img src='fermer.png'  class=clas_img></a>&nbsp;&nbsp;</span>";
 
 document.getElementById("id_div_outils").innerHTML=contenu;
}

function generer_maj_eleve()
{
 contenu="<form name='form_eleve'  method=post action='save.php'>";
 contenu+="<table border=0 class=clas_form>";
 contenu+="<tr><td colspan=2 align=center bgcolor=#DDDDFF><b>Mise &agrave; jour El&egrave;ve</b></td></tr>";

 contenu+="<tr align=center><td colspan=2><img id='id_photo' width=100 height=100></td></tr>";
 
 contenu+="<tr><td>Matricule:</td>";
 contenu+="<td><input type=text name=zmatricule></td></tr>";
 
 contenu+="<tr><td>Num en classe:</td>";
 contenu+="<td><input type=text name=znumero></td></tr>";

 contenu+="<tr><td>Classe:</td>";
 contenu+="<td><select name='zcode_classe'>";

 for(k in tclasses)
   {
	enreg_classe=tclasses[k].split(";");   
	vcode_classe=enreg_classe[0];	
	vdesi_classe=enreg_classe[1];
    contenu+="    <option value='"+vcode_classe+"'>"+vdesi_classe+"</option>";
   }
 contenu+="</select></td></tr>";
 contenu+="<tr><td>Nom:</td>";
 contenu+="<td><input type=text name=znom></td></tr>";
 contenu+="<tr><td>Date de naissance:</td>";
 contenu+="<td><input type=text name=zdate_naiss></td></tr>";
 contenu+="<tr><td>Lieu de naissance:</td>";
 contenu+="<td><input type=text name=zlieu_naiss></td></tr>";
 contenu+="<tr><td>Sexe:</td>";
 contenu+="<td><select name=zsexe>";
 contenu+="<option value='M'>M</option>"; 
 contenu+="<option value='F'>F</option>"; 
 contenu+="</select></td></tr>";
 contenu+="<tr><td>Domicile:</td>";

 contenu+="<td><textarea name=zdomicile  rows=4></textarea></td></tr>";
 contenu+="<td><input type=text name=zphoto></td></tr>";

 contenu+="<input type=hidden name=zdonnee_source value='eleves.txt'>";
 contenu+="<input type=hidden name=zprogramme_source value='maj_eleve.php'>";
 contenu+="<input type=hidden name=zsave>";
 contenu+="</table>";

 contenu+="</form>";

 document.getElementById('id_div_corps').innerHTML=contenu;

 ielev=0;
 if(televes.length>0) afficher_eleve();
}	

function maj_eleve()
{ 
  if(televes.length>0)
   {	
    enreg_eleve=televes[0].split(";");
    vcode_clas=enreg_eleve[2];
   // chargement_televe();
   }
   vmotcl=""; 
   masque_div();
   document.getElementById('id_div_corps').style.display='block';
   document.getElementById('id_div_outils').style.display='block';
   generer_outils_maj_eleve();
   generer_maj_eleve();
   encours='oui';
 }