var tliste_ecolage=new Array();
var tecolage=new Array();
//var lig=0;
var ieco;
var iecos;
//var vmotcl;

var vcode_clas;
var vmoi;
var vdate_pai;

function afficher_ecolage()
{
   enreg_ecolage=tecolage[ieco].split(';');
   vmatricule=enreg_ecolage[0];
   vdate_paie=enreg_ecolage[1];
   vmois=enreg_ecolage[2];
   vmontant=enreg_ecolage[3];
   form_ecolage.zmatricule.value=vmatricule;
   form_ecolage.zdate_paie.value=vdate_paie;
   form_ecolage.zmois.value=vmois;
   form_ecolage.zmontant.value=vmontant;
}

function chercher_iecos()
{
  iecos=tecolages.length;
  for(k in tecolages)
  { enreg_ecolage=tecolages[k].split(";");
    vmatricule=enreg_ecolage[0];
	vdate_paie=enreg_ecolage[1];
	vmois=enreg_ecolage[2];
	if(vmatricule==form_ecolage.zmatricule.value&&vmois==form_ecolage.zmois.value) iecos=k;
  }	
}

function valider_enreg_ecolage()
{
  if(form_ecolage.zmatricule.value!=""&&form_ecolage.zdate_paie.value!=""&&form_ecolage.zmois.value!=""&&form_ecolage.zmontant.value!="") 
  { 
    tecolage[ieco]=form_ecolage.zmatricule.value+";"+form_ecolage.zdate_paie.value+";"+form_ecolage.zmois.value+";"+form_ecolage.zmontant.value;

    if(tecolage.length>0)
	  {	
       chercher_iecos();
	   tecolages[iecos]=tecolage[ieco];
	  } 
  }
}

function debut_ecolage()
 {valider_enreg_ecolage();
  ieco=0;
  afficher_ecolage();
 }

function suivant_ecolage()
{ if (ieco<tecolage.length-1)
    {valider_enreg_ecolage();
     ieco++;
     afficher_ecolage();
    }
}

function dernier_ecolage()
 { valider_enreg_ecolage();
   ieco=tecolage.length-1;
   afficher_ecolage();
 }

function precedent_ecolage()
{ if (ieco>0)
    {valider_enreg_ecolage();
     ieco--;
     afficher_ecolage();
    }
}

function chargement_tecolage()
{
 tecolage.splice(0,tecolage.length);
tecolage[0]=";;;";
 i=0;
 for(k in tecolages)
 {
  enreg_ecolage=tecolages[k].split(";"); 
  vmatricule=enreg_ecolage[0];
  vmois=enreg_ecolage[2];
  for(j in televes)
    {
	 enreg_eleve=televes[j].split(";");
     vmatr=enreg_eleve[0];
     if(vmatricule==vmatr) vcode_classe=enreg_eleve[2];	 
    }
  	
  if(vcode_classe==vcode_clas&&vmois==vmoi) {tecolage[i]=tecolages[k]; i++;}
  }	 
  
}


function fermer_liste_maj_ecolage()
{
  document.getElementById("id_liste").style.display='none';
}	

function suppr_liste_ecolage()
{
 if(lig>0)
    { 
      oui=confirm("Etes-vous sur de supprimer tous les enregistrements de cette liste ?");
      if(oui)
        { tecolages.splice(0,tecolages.length);
          i=0;
          for(k in tliste_ecolage) tecolages[i++]=tliste_ecolage[k];
	      chargement_tecolage();
          afficher_ecolage();
        }
    }
}	

function lister_maj_ecolage()
{valider_enreg_ecolage();
 document.getElementById('id_liste').style.display='block';
 contenu="<table border=1>";
 contenu+="<tr align=center bgcolor=#DDDDFF><th colspan=6>Liste ecolages</th>";
 contenu+="<td><a href=# title='fermer' onclick=fermer_liste_maj_ecolage()><img src='fermer.png'  class=clas_img></a></td></tr>";

 tliste_ecolage.splice(0,tliste_ecolage.length);

 contenu+="<tr align=center><td>Matricule</td><td>Nom</td><td>Classe</td><td>Date paiement</td><td>Mois</td><td>Montant</td><td></td></tr>";
 lig=0;
 for(k in tecolages)
 { 
    enreg_ecolage=tecolages[k].split(';');
    vmatricule=enreg_ecolage[0];
	for(j in televes)
	  {
		enreg_eleve=televes[j].split(";");
        vmatr=enreg_eleve[0]; 		
		if(vmatr==vmatricule) {vnom=enreg_eleve[3]; vcode_classe=enreg_eleve[2];}
		
	  }		
    vdate_paie=enreg_ecolage[1];
    	
    vnum_mois=enreg_ecolage[2];
	if(vnum_mois==1) vmois="Janvier";
	if(vnum_mois==2) vmois="Fevrier";
	if(vnum_mois==3) vmois="Mars";
	if(vnum_mois==4) vmois="Avril";
	if(vnum_mois==5) vmois="Mai";
	if(vnum_mois==6) vmois="Juin";
	if(vnum_mois==7) vmois="Juillet";
	if(vnum_mois==8) vmois="Aout";
	if(vnum_mois==9) vmois="Septembre";
	if(vnum_mois==10) vmois="Octobre";
	if(vnum_mois==11) vmois="Novembre";
	if(vnum_mois==12) vmois="Decembre";
		
    vmontant=enreg_ecolage[3];
    vmotcle=(vmatricule+vnom+vcode_classe+vmois).toLowerCase(); 
	
	vmotcl=vmotcl.toLowerCase();
 
	tmotcle=vmotcl.split(" ");
	if(tmotcle[1]==null) tmotcle[1]="";
	if(tmotcle[2]==null) tmotcle[2]="";
	if (vmotcle.indexOf(tmotcle[0])>=0&&vmotcle.indexOf(tmotcle[1])>=0&&vmotcle.indexOf(tmotcle[2])>=0)
       contenu+="<tr><td align=center>"+vmatricule+"</td><td>"+vnom+"</td><td align=center>"+vcode_classe+"</td><td align=center>"+vdate_paie+"</td><td align=center>"+vmois+"</td><td align=center>"+vmontant+"</td><td></td></tr>";
    else {tliste_ecolage[lig++]=tecolages[k]; vcode_clas=vcode_classe; vmoi=vnum_mois; }
  }
 
 contenu+="</table>";
 document.getElementById('id_liste').innerHTML=contenu;
}

function suppr_tecolages()
{
 for(k in tecolages)
   {
     enreg_ecolage=tecolages[k].split(";");
     vmatricule=enreg_ecolage[0];
	 vdate_paie=enreg_ecolage[1];
	 vmois=enreg_ecolage[2];
	 if(vmatricule==form_ecolage.zmatricule.value&&vdate_paie==form_ecolage.zdate_paie.value&&vmois==form_ecolage.zmois.value) tecolages.splice(k,1);
   }	
}

function suppr_ecolage()
{ oui=confirm("Etes-vous sur de supprimer cet enregistrement ?");
  if(oui)
   {	 
    suppr_tecolages();
 
    if (ieco==tecolage.length-1) 
       { tecolage.pop();
         ieco--;
		 if(ieco==-1) fermer_maj_ecolage();
         afficher_ecolage();  
         valider_enreg_ecolage();
       }
    if (ieco<tecolage.length-1) 
       { tecolage.splice(ieco,1);
         afficher_ecolage();  
         valider_enreg_ecolage();
       }
   }   
}
   
function ajout_ecolage() 
  {valider_enreg_ecolage();
   ieco=tecolage.length;
   tecolage[ieco]=';;;';
   afficher_ecolage();  
  }

function fermer_maj_ecolage()
{ valider_enreg_ecolage();
  document.getElementById("id_div_outils").style.display='none';
  document.getElementById("id_div_corps").style.display='none';
  encours='non';
}	

function generer_outils_maj_ecolage()
{
  contenu="<span class=outils_gauche>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="Classe : <select name=zcode_classe onchange='vcode_clas=this.value;valider_enreg_ecolage();generer_outils_maj_ecolage(); vmoi=form_outils_maj_ecolage.zmois.value; chargement_tecolage();ieco=0;afficher_ecolage()'>";
  for(k in tclasses)
        {
          enreg_classe=tclasses[k].split(";"); 
		  vcode_classe=enreg_classe[0];
		  vclasse=enreg_classe[1];
          if(vcode_classe==vcode_clas) contenu+="<option value='"+vcode_classe+"' selected>"+vclasse+"</option>"; 
		  else  contenu+="<option value='"+vcode_classe+"'>"+vclasse+"</option>"; 
        } 
  contenu+="</select>&nbsp;";	
  
  contenu+="Mois : <select name=zmois onchange='vmoi=this.value;valider_enreg_ecolage();chargement_tecolage();ieco=0;afficher_ecolage()'>";
	contenu+="<option value=1>Janvier</option>";
	contenu+="<option value=2>Fevrier</option>";
	contenu+="<option value=3>Mars</option>";
	contenu+="<option value=4>Avril</option>";
	contenu+="<option value=5>Mai</option>";
	contenu+="<option value=6>Juin</option>";
	contenu+="<option value=7>Juillet</option>";
	contenu+="<option value=8>Aout</option>";
	contenu+="<option value=9>Septembre</option>";
	contenu+="<option value=10>Octobre</option>";
	contenu+="<option value=11>Novembre</option>";
	contenu+="<option value=12>Decembre</option>";

  contenu+="</select>&nbsp;";
    
  contenu+="<a href=# title='debut' onclick=debut_ecolage()><img src='debut.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='suivant' onclick=suivant_ecolage()><img src='suivant.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='precedent' onclick=precedent_ecolage()><img src='precedent.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='dernier' onclick=dernier_ecolage()><img src='dernier.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='supprimer' onclick=suppr_ecolage()><img src='supprimer.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='ajouter' onclick=ajout_ecolage()><img src='ajouter.png' class=clas_img></a></span>";
  
  contenu+="<span class=outils_droite>Rechercher <input type=text name=zmotcle title='Entrer le mot &agrave; rechercher' onchange='vmotcl=this.value;' size=12%>&nbsp;";
  
  contenu+="<a href=# title='rechercher' onclick=lister_maj_ecolage()><img src='rechercher.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='supprimer les enregistrements de la liste' onclick=suppr_liste_ecolage()><img src='supprimer.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='fermer' onclick=fermer_maj_ecolage()><img src='fermer.png'  class=clas_img></a>&nbsp;&nbsp;</span>";
    
 document.getElementById("id_div_outils").innerHTML=contenu;
}

function generer_maj_ecolage()
{
contenu="<form name='form_ecolage'>";
contenu+="<table border=0 width=60% class=clas_form>";
contenu+="<tr><td colspan=2 align=center bgcolor=#DDDDFF><b>Mise &agrave; jour ecolage</b></td></tr>";
contenu+="<tr><td>Nom :</td>";
contenu+="<td><select name=zmatricule>";
for(k in televes)
   {
	enreg_eleve=televes[k].split(";");   
	vmatricule=enreg_eleve[0];	
	vnom=enreg_eleve[3];
	contenu+="<option value='"+vmatricule+"'>"+vnom+"</option>";
   }
contenu+="</select></td></tr>";


contenu+="<tr><td>Date paiement :</td>";
contenu+="<td><input type=text name=zdate_paie></td></tr>";

contenu+="<tr><td>Mois :</td>";
contenu+="<td><select name=zmois>";
	contenu+="<option value=1>Janvier</option>";
	contenu+="<option value=2>Fevrier</option>";
	contenu+="<option value=3>Mars</option>";
	contenu+="<option value=4>Avril</option>";
	contenu+="<option value=5>Mai</option>";
	contenu+="<option value=6>Juin</option>";
	contenu+="<option value=7>Juillet</option>";
	contenu+="<option value=8>Aout</option>";
	contenu+="<option value=9>Septembre</option>";
	contenu+="<option value=10>Octobre</option>";
	contenu+="<option value=11>Novembre</option>";
	contenu+="<option value=12>Decembre</option>";
contenu+="</select></td></tr>";

contenu+="<tr><td>Montant :</td>";
contenu+="<td><input type=text name=zmontant></td></tr>";

contenu+="</table>";

contenu+="<div id=id_liste class=clas_liste>";
contenu+="</div>";

contenu+="</form>";
document.getElementById('id_div_corps').innerHTML=contenu;
document.getElementById('id_liste').style.display='none';
ieco=0;
if (tecolage.length>0) afficher_ecolage();
}	

function maj_ecolage()
{
 if(tecolages.length>0)
 {	 
   enreg_ecolage=tecolages[0].split(";");
   vmatricule=enreg_ecolage[0];
   for(j in televes)
    {
	 enreg_eleve=televes[j].split(";");
     vmatr=enreg_eleve[0];
     if(vmatricule==vmatr) vcode_clas=enreg_eleve[2];	 
    }
   vdate_pai=enreg_ecolage[1];
   vmoi=enreg_ecolage[2];
   chargement_tecolage();
 }
 vmotcl=""; 
 masque_div();
 document.getElementById('id_div_corps').style.display='block';
 document.getElementById('id_div_outils').style.display='block';
 generer_outils_maj_ecolage();
 generer_maj_ecolage();
 encours='oui';
}