var tliste_absence=new Array();
var iabs;
//var vmotcl;
//var lig=0;

function afficher_absence()
{
   enreg_absence=tabsences[iabs].split(';');
   vmatricule=enreg_absence[0];
   vdate_debut=enreg_absence[1];
   vnb_jours=enreg_absence[2];
   //vperiode=enreg_absence[3];
   vmotif=enreg_absence[3];
   form_absence.zmatricule.value=vmatricule;
   form_absence.zdate_debut.value=vdate_debut;
   form_absence.znb_jours.value=vnb_jours;
   //form_absence.zperiode.value=vperiode;
   form_absence.zmotif.value=vmotif;
}

function valider_enreg_absence()
{
  if(form_absence.zmatricule.value!=""&&form_absence.zdate_debut.value!=""&&form_absence.znb_jours.value!=""&&form_absence.zmotif.value!="") 
    tabsences[iabs]=form_absence.zmatricule.value+';'+form_absence.zdate_debut.value+';'+form_absence.znb_jours.value+';'+form_absence.zmotif.value;
}

function debut_absence()
 {valider_enreg_absence();
  iabs=0;
  afficher_absence();
 }

function suivant_absence()
{ if (iabs<tabsences.length-1)
    {valider_enreg_absence();
     iabs++;
     afficher_absence();
    }
}

function dernier_absence()
 { valider_enreg_absence();
   iabs=tabsences.length-1;
   afficher_absence();
 }

function precedent_absence()
{ if (iabs>0)
    {valider_enreg_absence();
     iabs--;
     afficher_absence();
    }
}

function fermer_liste_maj_absence()
{ 
  document.getElementById("id_liste").style.display='none';
}	

function suppr_liste_absence()
{
  if(lig>0)
  { 
    oui=confirm("Etes-vous sur de supprimer tous les enregistrements de cette liste ?");
    if(oui)
       { tabsences.splice(0,tabsences.length);
         i=0;
		 for(k in tliste_absence) tabsences[i++]=tliste_absence[k];
		 afficher_absence();
       }
   }
 }	


function lister_maj_absence()
{valider_enreg_absence();
 document.getElementById('id_liste').style.display='block';
 contenu="<table border=1>";
 contenu+="<tr align=center bgcolor=#DDDDFF><th colspan=7>Liste Absenses</th>";
 contenu+="<td><a href=# title='fermer' onclick=fermer_liste_maj_absence()><img src='fermer.png'  class=clas_img></a></td></tr>";
  
 tliste_absence.splice(0,tliste_absence.length);
 
 contenu+="<tr align=center><td>Matricule</td><td>Nom</td><td>Code classe</td><td>Date debut</td><td>Nombre de jours</td><td>Motif</td><td></td></tr>";
 lig=0;
 for(k in tabsences)
 { 
    enreg_absence=tabsences[k].split(';');
    vmatricule=enreg_absence[0];
	for(j in televes)
	  {
		enreg_eleve=televes[j].split(";");
        vmatr=enreg_eleve[0]; 		
		if(vmatr==vmatricule) {vnom=enreg_eleve[3]; vcode_classe=enreg_eleve[2]; }
	  }		
    vdate_debut=enreg_absence[1];
    vnb_jours=enreg_absence[2];
	//vperiode=enreg_absence[3];
    vmotif=enreg_absence[3];
    vmotcle=(vmatricule+vnom+vcode_classe).toLowerCase(); 
	vmotcl=vmotcl.toLowerCase(); 
	tmotcle=vmotcl.split(" ");
	if(tmotcle[1]==null) tmotcle[1]="";
	if(tmotcle[2]==null) tmotcle[2]="";
	if (vmotcle.indexOf(tmotcle[0])>=0&&vmotcle.indexOf(tmotcle[1])>=0&&vmotcle.indexOf(tmotcle[2])>=0)
     contenu+="<tr><td align=center>"+vmatricule+"</td><td>"+vnom+"</td><td align=center>"+vcode_classe+"</td><td align=center>"+vdate_debut+"</td><td align=center>"+vnb_jours+"</td><td>"+vmotif+"</td><td></td></tr>";
    else tliste_absence[lig++]=tabsences[k];
  }
 contenu+='</table>';
 document.getElementById('id_liste').innerHTML=contenu;
 }

function suppr_absence()
{
 oui=confirm("Etes-vous sur de supprimer cet enregistrement ?");
 if(oui)
  {	  
    if (iabs==tabsences.length-1) 
     { tabsences.pop();
       iabs--;
	   if(iabs==-1) fermer_maj_absence();
       afficher_absence();  
       valider_enreg_absence();
     }
    if (iabs<tabsences.length-1) 
     { tabsences.splice(iabs,1);
       afficher_absence();  
       valider_enreg_absence();
     }
   }  
}

function ajout_absence() 
  {valider_enreg_absence();
   iabs=tabsences.length;
   tabsences[iabs]=';;;;';
   afficher_absence();  
  }

function fermer_maj_absence()
{ valider_enreg_absence();
  document.getElementById("id_div_outils").style.display='none';
  document.getElementById("id_div_corps").style.display='none';
  encours='non';
}	

function generer_outils_maj_absence()
{
  contenu="<span class=outils_gauche>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=# title='debut' onclick=debut_absence()><img src='debut.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='suivant' onclick=suivant_absence()><img src='suivant.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='precedent' onclick=precedent_absence()><img src='precedent.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='dernier' onclick=dernier_absence()><img src='dernier.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='supprimer' onclick=suppr_absence()><img src='supprimer.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='ajouter' onclick=ajout_absence()><img src='ajouter.png' class=clas_img></a></span>";
 
  contenu+="<span class=outils_droite>Rechercher <input type=text name=zmotcle title='Entrer le mot &agrave; rechercher' onchange='vmotcl=this.value;' size=26%>&nbsp;";
  
  contenu+="<a href=# title='rechercher' onclick=lister_maj_absence()><img src='rechercher.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='supprimer' onclick=suppr_liste_absence()><img src='supprimer.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='fermer' onclick=fermer_maj_absence()><img src='fermer.png'  class=clas_img></a>&nbsp;</span>";
    
 document.getElementById("id_div_outils").innerHTML=contenu;
}

function generer_maj_absence()
{
contenu="<form name='form_absence'>";
contenu+="<table border=0 width=60% class=clas_form>";
contenu+="<tr><td colspan=2 align=center bgcolor=#DDDDFF><b>Mise &agrave; jour Absence</b></td></tr>";
contenu+="<tr><td>Matricule:</td>";
contenu+="<td><select name=zmatricule>";
for(k in televes)
   {
	enreg_eleve=televes[k].split(";");   
	vmatricule=enreg_eleve[0];	
	vnom=enreg_eleve[3];
	contenu+="<option value='"+vmatricule+"'>"+vmatricule+"-"+vnom+"</option>";
   }
contenu+="</select></td></tr>";

contenu+="<tr><td>Date debut :</td>";
contenu+="<td><input type=text name=zdate_debut></td></tr>";

contenu+="<tr><td>Nombre de jours:</td>";
contenu+="<td><input type=text name=znb_jours>";


contenu+="<tr><td>Motif :</td>";
contenu+="<td><input type=text name=zmotif></td></tr>";

contenu+="</table>";

contenu+="<div id=id_liste class=clas_liste>";
contenu+="</div>";

contenu+="</form>";
document.getElementById('id_div_corps').innerHTML=contenu;
document.getElementById('id_liste').style.display='none';
iabs=0;
afficher_absence();
}	

function maj_absence()
{
 vmotcl="";
 masque_div();
 document.getElementById('id_div_corps').style.display='block';
 document.getElementById('id_div_outils').style.display='block';
 generer_outils_maj_absence();
 generer_maj_absence();
 encours='oui';
}