
function afficher_matiere()
{
   enreg_matiere=tmatieres[imati].split(';');
   vcode_matiere=enreg_matiere[0];
   vmatiere=enreg_matiere[1];
   vcoef=enreg_matiere[2];
   vcode_classe=enreg_matiere[3];
   form_matiere.zcode_matiere.value=vcode_matiere;
   form_matiere.zmatiere.value=vmatiere;
   form_matiere.zcoef.value=vcoef;
   form_matiere.zcode_classe.value=vcode_classe;
}

function valider_enreg_matiere()
{
  if(form_matiere.zcode_matiere.value!=""&&form_matiere.zmatiere.value!=""&&form_matiere.zcoef.value!=""&&form_matiere.zcode_classe.value!="") 
    tmatieres[imati]=form_matiere.zcode_matiere.value+';'+form_matiere.zmatiere.value+';'+form_matiere.zcoef.value+';'+form_matiere.zcode_classe.value;
}

function debut_matiere()
 {valider_enreg_matiere();
  imati=0;
  afficher_matiere();
 }

function suivant_matiere()
{ if (imati<tmatieres.length-1)
    {valider_enreg_matiere();
     imati++;
     afficher_matiere();
    }
}

function dernier_matiere()
 { valider_enreg_matiere();
   imati=tmatieres.length-1;
   afficher_matiere();
 }

function precedent_matiere()
{ if (imati>0)
    {valider_enreg_matiere();
     imati--;
     afficher_matiere();
    }
}

function suppr_matiere()
{
 oui=confirm("Etes-vous sur de supprimer cet enregistrement ?");
 if(oui)
  {	  
    if (imati==tmatieres.length-1) 
     { tmatieres.pop();
       imati--;
	   if(imati==-1) fermer_maj_matiere();
       afficher_matiere();  
       valider_enreg_matiere();
     }
    if (imati<tmatieres.length-1) 
     { tmatieres.splice(imati,1);
       afficher_matiere();  
       valider_enreg_matiere();
     }
   }  
}

function ajout_matiere() 
  {valider_enreg_matiere();
   imati=tmatieres.length;
   tmatieres[imati]=';;;;';
   afficher_matiere();  
  }

function fermer_maj_matiere()
{ valider_enreg_matiere();
  document.getElementById("id_div_outils").style.display='none';
  document.getElementById("id_div_corps").style.display='none';
  encours='non';
}	

function generer_outils_maj_matiere()
{
  contenu="<span class=outils_gauche>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=# title='debut' onclick=debut_matiere()><img src='debut.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='suivant' onclick=suivant_matiere()><img src='suivant.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='precedent' onclick=precedent_matiere()><img src='precedent.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='dernier' onclick=dernier_matiere()><img src='dernier.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='supprimer' onclick=suppr_matiere()><img src='supprimer.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='ajouter' onclick=ajout_matiere()><img src='ajouter.png' class=clas_img></a></span>";
 
  contenu+="<span class=outils_droite>";
  
  contenu+="<a href=# title='fermer' onclick=fermer_maj_matiere()><img src='fermer.png'  class=clas_img></a>&nbsp;</span>";
    
 document.getElementById("id_div_outils").innerHTML=contenu;
}

function generer_maj_matiere()
{
contenu="<form name='form_matiere'>";
contenu+="<table border=0 class=clas_form>";
contenu+="<tr><td colspan=2 align=center bgcolor=#DDDDFF><b>Mise &agrave; jour Matiere</b></td></tr>";

contenu+="<tr><td>Code Matiere :</td>";
contenu+="<td><input type=text name=zcode_matiere></td></tr>";

contenu+="<tr><td>Matiere :</td>";
contenu+="<td><input type=text name=zmatiere></td></tr>";

contenu+="<tr><td>Coefficient :</td>";
contenu+="<td><input type=text name=zcoef></td></tr>";

contenu+="<tr><td>Code Classe :</td>";
contenu+="<td><select name=zcode_classe>";
for(k in tclasses)
   {
	enreg_classe=tclasses[k].split(";");   
	vcode_classe=enreg_classe[0];	
	contenu+="<option value='"+vcode_classe+"'>"+vcode_classe+"</option>";
   }
contenu+="</select></td></tr>";

contenu+="</table>";


contenu+="</form>";
document.getElementById('id_div_corps').innerHTML=contenu;
imati=0;
if(tmatieres.length>0) afficher_matiere();
}	

function maj_matiere()
{
 vmotcl="";
 masque_div();
 document.getElementById('id_div_corps').style.display='block';
 document.getElementById('id_div_outils').style.display='block';
 generer_outils_maj_matiere();
 generer_maj_matiere();
 encours='oui';
}