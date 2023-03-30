var tliste_classe=new Array();
var iclas;
//var vmotcl;
//var lig=0;

function afficher_classe()
{
   enreg_classe=tclasses[iclas].split(';');
   vcode_classe=enreg_classe[0];
   vclasse=enreg_classe[1];
   form_classe.zcode_classe.value=vcode_classe;
   form_classe.zclasse.value=vclasse;
}

function valider_enreg_classe()
{
  if(form_classe.zcode_classe.value!=""&&form_classe.zclasse.value!="") 
    tclasses[iclas]=form_classe.zcode_classe.value+';'+form_classe.zclasse.value;
}

function debut_classe()
 {valider_enreg_classe();
  iclas=0;
  afficher_classe();
 }

function suivant_classe()
{ if (iclas<tclasses.length-1)
    {valider_enreg_classe();
     iclas++;
     afficher_classe();
    }
}

function dernier_classe()
 { valider_enreg_classe();
   iclas=tclasses.length-1;
   afficher_classe();
 }

function precedent_classe()
{ if (iclas>0)
    {valider_enreg_classe();
     iclas--;
     afficher_classe();
    }
}

function suppr_classe()
{
 oui=confirm("Etes-vous sur de supprimer cet enregistrement ?");
 if(oui)
  {	  
    if (iclas==tclasses.length-1) 
     { tclasses.pop();
       iclas--;
	   if(iclas==-1) fermer_maj_classe();
       afficher_classe();  
       valider_enreg_classe();
     }
    if (iclas<tclasses.length-1) 
     { tclasses.splice(iclas,1);
       afficher_classe();  
       valider_enreg_classe();
     }
   }  
}

function ajout_classe() 
  {valider_enreg_classe();
   iclas=tclasses.length;
   tclasses[iclas]=';;;;';
   afficher_classe();  
  }

function fermer_maj_classe()
{ valider_enreg_classe();
  document.getElementById("id_div_outils").style.display='none';
  document.getElementById("id_div_corps").style.display='none';
  encours='non';
}	

function generer_outils_maj_classe()
{
  contenu="<span class=outils_gauche>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=# title='debut' onclick=debut_classe()><img src='debut.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='suivant' onclick=suivant_classe()><img src='suivant.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='precedent' onclick=precedent_classe()><img src='precedent.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='dernier' onclick=dernier_classe()><img src='dernier.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='supprimer' onclick=suppr_classe()><img src='supprimer.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='ajouter' onclick=ajout_classe()><img src='ajouter.png' class=clas_img></a></span>";
 
  contenu+="<span class=outils_droite>";
  contenu+="<a href=# title='fermer' onclick=fermer_maj_classe()><img src='fermer.png'  class=clas_img></a>&nbsp;&nbsp;</span>";
    
 document.getElementById("id_div_outils").innerHTML=contenu;
}

function generer_maj_classe()
{
contenu="<form name='form_classe'>";
contenu+="<table border=0 class=clas_form>";
contenu+="<tr><td colspan=2 align=center bgcolor=#DDDDFF><b>Mise &agrave; jour Classe</b></td></tr>";
contenu+="<tr><td>Code Classe : </td>";
contenu+="<td><input type=text name=zcode_classe></td></tr>";

contenu+="<tr><td>Classe : </td>";
contenu+="<td><input type=text name=zclasse></td></tr>";

contenu+="</table>";

contenu+="</form>";
document.getElementById('id_div_corps').innerHTML=contenu;
iclas=0;
if(tclasses.length>0) afficher_classe();
}	

function maj_classe()
{
 vmotcl="";
 masque_div();
 document.getElementById('id_div_corps').style.display='block';
 document.getElementById('id_div_outils').style.display='block';
 generer_outils_maj_classe();
 generer_maj_classe();
 encours='oui';
}