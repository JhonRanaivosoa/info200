var tsaisie_matricule=new Array();
var tsaisie_nb_jours=new Array();
var tsaisie_date_debut=new Array();
var tsaisie_periode=new Array();
var tsaisie_motif=new Array();

var tabsence=new Array();
var nblig_absence=2;
var mm, jj, aa;

function ajouter_ligne_absence()
 {
  nblig_absence++;
  tsaisie_matricule[nblig_absence-1]=""; 
  tsaisie_nb_jours[nblig_absence-1]="";
  tsaisie_date_debut[nblig_absence-1]=jj+"/"+mm+"/"+aa; ; 
  tsaisie_periode[nblig_absence-1]=""; 
  tsaisie_motif[nblig_absence-1]=""; 
  generer_saisie_absence();
 }
 
function supprimer_ligne_absence()
 {
	
  if(nblig_absence>0) 
    { nblig_absence--;
      generer_saisie_absence();
    }
 }

function maj_matricule_absence()
 {
  for(lig=0;lig<nblig_absence;lig++)
   {
    tsaisie_matricule[lig]=form_absence.zmatricule[lig].value; 
   }
}

function maj_nb_jours()
 {
  for(lig=0;lig<nblig_absence;lig++)
   {
    tsaisie_nb_jours[lig]=form_absence.znb_jours[lig].value; 
   }
}

function maj_date_debut()
 {
  for(lig=0;lig<nblig_absence;lig++)
   {
    tsaisie_date_debut[lig]=form_absence.zdate_debut[lig].value; 
   }
}

function maj_periode_absence()
 {
  for(lig=0;lig<nblig_absence;lig++)
   {
    tsaisie_periode[lig]=form_absence.zperiode[lig].value; 
   }
}

function maj_motif()
 {
  for(lig=0;lig<nblig_absence;lig++)
   {
    tsaisie_motif[lig]=form_absence.zmotif[lig].value; 
   }
}

function enregistrer_absence()
 {
  n=tabsence.length;
  if(nblig_absence==1&&form_absence.zmatricule.value!=""&&form_absence.zdate_debut.value!=""&&form_absence.znb_jours.value!=0&&form_absence.zperiode.value!=""&&form_absence.zmotif.value!="")
	 tabsence[n]=form_absence.zmatricule.value+";"+form_absence.zdate_debut.value+";"+form_absence.znb_jours.value+";"+form_absence.zperiode.value+";"+form_absence.zmotif.value;
  else
   {  
    lig=0;  
    for(k=n;k<n+nblig_absence;k++)
      {
       if(form_absence.zmatricule[lig].value!=""&&form_absence.zdate_debut[lig].value!=""&&form_absence.znb_jours[lig].value!=0&&form_absence.zperiode[lig].value!=""&&form_absence.zmotif[lig].value!="")
         tabsence[k]=form_absence.zmatricule[lig].value+";"+form_absence.zdate_debut[lig].value+";"+form_absence.znb_jours[lig].value+";"+form_absence.zperiode[lig].value+";"+form_absence.zmotif[lig].value;
	   lig++;
      }
   }	  
   
 for(k in tabsence)
  {
	enreg_absence=tabsence[k].split(";");
    vmatricule=enreg_absence[0];
    vdate_debut=enreg_absence[1];
    vnb_jour=enreg_absence[2];
    vperiode=enreg_absence[3];
    vmotif=enreg_absence[4];	   
    trouve="non";
	for(j in tabsences)
	 {	
       enreg_absence=tabsences[j].split(";");
       vmatr=enreg_absence[0];
       vdate_deb=enreg_absence[1];
	   if(vmatr==vmatricule&&vdate_deb==vdate_debut)
	     { 
	      tabsences[j]=vmatricule+";"+vdate_debut+";"+vnb_jour+";"+vperiode+";"+vmotif;
		  trouve="oui";
		 }
	 }
	if (trouve=="non")
	  {
		n=tabsences.length;
        tabsences[n]=vmatricule+";"+vdate_debut+";"+vnb_jour+";"+vperiode+";"+vmotif;
	  }	
   }	  
 }

function fermer_saisie_absence()
{
document.getElementById("id_div_outils").style.display="none";
document.getElementById("id_div_corps").style.display="none";
encours="non";
}
         
function generer_outils_saisie_absence()
{
  contenu="<span class=outils_gauche>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="Code Classe : <select name=zcode_classe onchange='vmotcl=this.value;generer_saisie_absence()'>";
    for(k in tclasses)
        {
         enreg_classe=tclasses[k].split(';');
		 vcode_classe=enreg_classe[0];
         contenu+="<option value='"+vcode_classe+"'>"+vcode_classe+"</option>"; 
		 if (k==0) vmotcl=vcode_classe;
        } 
  contenu+="</select>";
  contenu+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick=ajouter_ligne_absence() title='ajouter ligne'><img src='ajouter.png' class=clas_img></a>";
  contenu+="&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href='#' onclick=supprimer_ligne_absence() title='supprimer ligne'><img src='supprimer.png' class=clas_img></a>";
  contenu+="&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href='#' onclick=enregistrer_absence() title='enregistrer'><img src='enregistrer.png' class=clas_img></a></span>";
  contenu+="<span class=outils_droite>";
  contenu+="<a href='#' onclick=fermer_saisie_absence() title='fermer'><img src='fermer.png' class=clas_img></a>&nbsp;&nbsp;</span>";

  document.getElementById("id_div_outils").innerHTML=contenu;
}

function generer_saisie_absence()
{

contenu="<form name=form_absence>";
contenu+="<table border=1 bgcolor=#DDDDDD width=80% align=center>";
contenu+="<tr><th colspan=5 bgcolor=#DDDDFF><font size=3>Saisie Absence</font></th></tr>";
contenu+="<tr align=center><td width=20%>Nom</td><td width=6%>Date debut</td><td width=10%>Nbre de jours</td><td width=20%>Periode</td><td width=20%>Motif</td></tr>";

for(j=0;j<nblig_absence;j++)
  {

   contenu+="<tr><td><select name=zmatricule class=clas_select onclick=maj_matricule_absence()>";
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

    contenu+="<td><input type=text name=zdate_debut value='"+tsaisie_date_debut[j]+"'  class=clas_select onchange=maj_date_debut()></td>";

    contenu+='<td><select name=znb_jours  class=clas_select onclick=maj_nb_jours()>';
	for(k=0;k<=10;k++)
	     if(tsaisie_nb_jours[j]==k) contenu+="<option value="+k+" selected>"+k+"</option>"; 
         else contenu+="<option value="+k+">"+k+"</option>";
    contenu+='</select></td>';

    contenu+="<td><select name=zperiode class=clas_select onclick=maj_periode_absence()>";
    for(k in texamens)
        {
  		  enreg_examen=texamens[k].split(";");
          vcode_examen=enreg_examen[0]; 	  
		  vexamen=enreg_examen[1];
          if(tsaisie_periode[j]==vcode_examen) contenu+="<option value="+vcode_examen+" selected>"+vexamen+"</option>"; 
             else contenu+="<option value="+vcode_examen+">"+vexamen+"</option>"; 
        }			
    contenu+="</select></td>";

    contenu+="<td><input type=text name=zmotif value='"+tsaisie_motif[j]+"' class=clas_select onchange=maj_motif()></td></tr>";
	  
  }
contenu+='</table>';
contenu+='</form>';
document.getElementById('id_div_corps').innerHTML=contenu;
}

function saisie_absence()
{
	daty=new Date();
	aa=daty.getYear();
	mm=daty.getMonth();
	jj=daty.getDate();
 for(k=0;k<nblig_absence;k++)
   {
    tsaisie_matricule[k]=""; 
    tsaisie_nb_jours[k]="";
    tsaisie_date_debut[k]=jj+"/"+mm+"/"+aa; 
	tsaisie_periode[k]=""; 
    tsaisie_motif[k]=""; 
   }
  masque_div();
  document.getElementById('id_div_corps').style.display='block';
  document.getElementById('id_div_outils').style.display='block';
  generer_outils_saisie_absence();
  generer_saisie_absence();
  encours='oui';
}

