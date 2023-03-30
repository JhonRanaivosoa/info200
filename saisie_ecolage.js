var tsaisie_matricule=new Array();
var tsaisie_date_paiement=new Array();
var tsaisie_mois=new Array();
var tsaisie_montant=new Array();

var tecolage=new Array();
var nblig_ecolage=2;
var mm, jj, aa;

function ajouter_ligne_ecolage()
 {
  nblig_ecolage++;
  tsaisie_matricule[nblig_ecolage-1]=""; 
  tsaisie_date_paiement[nblig_ecolage-1]=jj+"/"+mm+"/"+aa;  
  tsaisie_mois[nblig_ecolage-1]=""; 
  tsaisie_montant[nblig_ecolage-1]=""; 
  generer_saisie_ecolage();
 }
 
function supprimer_ligne_ecolage()
 {
	
  if(nblig_ecolage>0) 
    { nblig_ecolage--;
      generer_saisie_ecolage();
    }
 }

function maj_matricule_ecolage()
 {
  for(lig=0;lig<nblig_ecolage;lig++)
   {
    tsaisie_matricule[lig]=form_ecolage.zmatricule[lig].value; 
   }
}

function maj_date_paiement_ecolage()
 {
  for(lig=0;lig<nblig_ecolage;lig++)
   {
    tsaisie_date_paiement[lig]=form_ecolage.zdate_paiement[lig].value; 
   }
}

function maj_mois_ecolage()
 {
  for(lig=0;lig<nblig_ecolage;lig++)
   {
    tsaisie_mois[lig]=form_ecolage.zmois[lig].value; 
   }
}

function maj_montant_ecolage()
 {
  for(lig=0;lig<nblig_ecolage;lig++)
   {
    tsaisie_montant[lig]=form_ecolage.zmontant[lig].value; 
   }
}

function enregistrer_ecolage()
 {
  n=tecolage.length;
  if(nblig_ecolage==1&&form_ecolage.zmatricule.value!=""&&form_ecolage.zdate_paiement.value!=""&&form_ecolage.zmois.value!=""&&form_ecolage.zmontant.value!="")
	 tecolage[n]=form_ecolage.zmatricule.value+";"+form_ecolage.zdate_paiement.value+";"+";"+form_ecolage.zmois.value+";"+form_ecolage.zmontant.value;
  else
   {  
    lig=0;  
    for(k=n;k<n+nblig_ecolage;k++)
      {
        if(form_ecolage.zmatricule[lig].value!=""&&form_ecolage.zdate_paiement[lig].value!=""&&form_ecolage.zmois[lig].value!=""&&form_ecolage.zmontant[lig].value!="")
           tecolage[k]=form_ecolage.zmatricule[lig].value+";"+form_ecolage.zdate_paiement[lig].value+";"+form_ecolage.zmois[lig].value+";"+form_ecolage.zmontant[lig].value;
	    lig++;
      }
   }	  
   
 for(k in tecolage)
  {
	enreg_ecolage=tecolage[k].split(";");
    vmatricule=enreg_ecolage[0];
    vdate_paiement=enreg_ecolage[1];
    vmois=enreg_ecolage[2];
    vmontant=enreg_ecolage[3];	   
    trouve="non";
	for(j in tecolages)
	 {	
       enreg_ecolage=tecolages[j].split(";");
       vmatr=enreg_ecolage[0];
       vmoi=enreg_ecolage[2];
	   if(vmatr==vmatricule&&vmoi==vmois)
	     { 
	      tecolages[j]=vmatricule+";"+vdate_paiement+";"+vmois+";"+vmontant;
		  trouve="oui";
		 }
	 }
	if (trouve=="non")
	  {
		n=tecolages.length;
        tecolages[n]=vmatricule+";"+vdate_paiement+";"+vmois+";"+vmontant;
	  }	
   }	  
 }

function fermer_saisie_ecolage()
{
document.getElementById("id_div_outils").style.display="none";
document.getElementById("id_div_corps").style.display="none";
encours="non";
}
         
function generer_outils_saisie_ecolage()
{
  contenu="<span class=outils_gauche>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="Code Classe : <select name=zcode_classe onchange='vmotcl=this.value;generer_saisie_ecolage()'>";
    for(k in tclasses)
        {
         enreg_classe=tclasses[k].split(';');
		 vcode_classe=enreg_classe[0];
         contenu+="<option value='"+vcode_classe+"'>"+vcode_classe+"</option>"; 
		 if (k==0) vmotcl=vcode_classe;
        } 
  contenu+="</select>";
  contenu+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick=ajouter_ligne_ecolage() title='ajouter ligne'><img src='ajouter.png' class=clas_img></a>";
  contenu+="&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href='#' onclick=supprimer_ligne_ecolage() title='supprimer ligne'><img src='supprimer.png' class=clas_img></a>";
  contenu+="&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href='#' onclick=enregistrer_ecolage() title='enregistrer'><img src='enregistrer.png' class=clas_img></a></span>";
  contenu+="<span class=outils_droite>";
  contenu+="<a href='#' onclick=fermer_saisie_ecolage() title='fermer'><img src='fermer.png' class=clas_img></a>&nbsp;&nbsp;</span>";

  document.getElementById("id_div_outils").innerHTML=contenu;
}

function generer_saisie_ecolage()
{

contenu="<form name=form_ecolage>";
contenu+="<table border=1 bgcolor=#DDDDDD width=60% align=center>";
contenu+="<tr><th colspan=4 bgcolor=#DDDDFF><font size=3>Saisie Ecolage</font></th></tr>";
contenu+="<tr align=center><td width=28%>Nom</td><td width=16%>Date paiement</td><td width=6%>Mois</td><td width=10%>Montant</td></tr>";

for(j=0;j<nblig_ecolage;j++)
  {

   contenu+="<tr><td><select name=zmatricule class=clas_select onclick=maj_matricule_ecolage()>";
    for(k in televes)
        {
  		  enreg_eleve=televes[k].split(";");
          vmatricule=enreg_eleve[0]; 	  
		  vcode_classe=enreg_eleve[2];
		  vnom=enreg_eleve[3];
 	      if (vcode_classe==vmotcl)
 		     {
             if(tsaisie_matricule[j]==vmatricule) contenu+="<option value="+vmatricule+" selected>"+vnom+"</option>"; 
             else contenu+="<option value="+vmatricule+">"+vnom+"</option>"; 
            }
        }			
    contenu+='</select></td>';

    contenu+="<td><input type=text name=zdate_paiement value='"+tsaisie_date_paiement[j]+"'  class=clas_select onchange=maj_date_paiement_ecolage()></td>";
    
    contenu+="<td><select name=zmois class=clas_select onclick=maj_mois_ecolage()>";
    for(k=1;k<=12;k++)
        {
  		  if(tsaisie_mois[j]==k) contenu+="<option value="+k+" selected>"+k+"</option>"; 
          else contenu+="<option value="+k+">"+k+"</option>"; 
        }			
    contenu+="</select></td>";

    contenu+="<td><input type=text name=zmontant value='"+tsaisie_montant[j]+"' class=clas_select onchange=maj_montant_ecolage()></td></tr>";
	  
  }
contenu+='</table>';
contenu+='</form>';
document.getElementById('id_div_corps').innerHTML=contenu;
}

function saisie_ecolage()
{
	daty=new Date();
	aa=daty.getYear();
	mm=daty.getMonth()+1;
	jj=daty.getDate();
 for(k=0;k<nblig_ecolage;k++)
   {
    tsaisie_matricule[k]=""; 
    tsaisie_date_paiement[k]=jj+"/"+mm+"/"+aa; 
	tsaisie_mois[k]=""; 
    tsaisie_montant[k]=""; 
   }
  masque_div();
  document.getElementById('id_div_corps').style.display='block';
  document.getElementById('id_div_outils').style.display='block';
  generer_outils_saisie_ecolage();
  generer_saisie_ecolage();
  encours='oui';
}

