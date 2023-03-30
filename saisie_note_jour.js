var tnote_jour=new Array();
var tsaisie_matricule=new Array();
var tsaisie_note_jour=new Array();

var nblig_note;
var vcode_clas;
var vcode_exam;
var vcode_mati;

function calcul_nblig_note_jour()
 {
  i=0; 
  for(k in televes)
   {
    enreg_eleve=televes[k].split(';');
    vcode_classe=enreg_eleve[2];
    if(vcode_classe==vcode_clas) i++;
   }
  nblig_note=i;  
 }

function ajouter_ligne_note_jour()
 {
  nblig_note++;
  tsaisie_matricule[nblig_note-1]=""; 
  tsaisie_note_jour[nblig_note-1]=""; 
  generer_saisie_note_jour();
 }
 
function supprimer_ligne_note_jour()
 {
	
  if(nblig_note>0) 
    { nblig_note--;
      generer_saisie_note_jour();
    }
 }

function maj_matricule_note_jour()
 {
  for(lig=0;lig<nblig_note;lig++)
   {
    tsaisie_matricule[lig]=form_note.zmatricule[lig].value; 
   }
}

function maj_note_jour()
 {
  for(lig=0;lig<nblig_note;lig++)
   {
    tsaisie_note_jour[lig]=form_note.znote_jour[lig].value; 
   }
}


function enregistrer_note_jour()
 {vcode_mati=form_outils_bult.zcode_matiere.value;
  n=tnote_jour.length;
  if(nblig_note==1)
	 tnote_jour[n]=form_note.zmatricule.value+";"+vcode_mati+";"+vcode_exam+";"+form_note.znote_jour.value;
  else
   {  
    lig=0;  
    for(k=n;k<n+nblig_note;k++)
      {
       tnote_jour[k]=form_note.zmatricule[lig].value+";"+vcode_mati+";"+vcode_exam+";"+form_note.znote_jour[lig].value;
	   lig++;
      }
   }	
 
 for(k in tnote_jour)
  {
	enreg_note_jour=tnote_jour[k].split(";");
    vmatr=enreg_note_jour[0];
    vcode_mati=enreg_note_jour[1];
    vcode_exam=enreg_note_jour[2];
	vnote_j=enreg_note_jour[3];
	trouve="non"; 
	for(j in tnotes)
	 {	
       enreg_note=tnotes[j].split(";");
	   vmatricule=enreg_note[0];
	   vcode_matiere=enreg_note[1];
	   vcode_examen=enreg_note[2];
	   vnote_jour=enreg_note[3];
	   vnote_comp=enreg_note[4];
	   if(vmatr==vmatricule&&vcode_mati==vcode_matiere&&vcode_exam==vcode_examen)
	     { 
	      tnotes[j]=vmatricule+";"+vcode_matiere+";"+vcode_examen+";"+vnote_j+";"+vnote_comp;
		  trouve="oui";
		 } 
	 }
	if (trouve=="non")
	  {
		n=tnotes.length;
        tnotes[n]=vmatr+";"+vcode_mati+";"+vcode_exam+";"+vnote_j+";"+0;
	  }		
  }	  
 }

function fermer_saisie_note_jour()
{
document.getElementById("id_div_outils").style.display="none";
document.getElementById("id_div_corps").style.display="none";
encours="non";
}
         
function generer_outils_saisie_note_jour()
{
  contenu="<form name=form_outils_bult><span class=outils_gauche2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="Classe : <select name=zcode_classe onchange='vcode_clas=this.value;generer_outils_saisie_note_jour();calcul_nblig_note_jour();generer_saisie_note_jour()'>";
    for(k in tclasses)
        {
         enreg_classe=tclasses[k].split(';');
		 vcode_classe=enreg_classe[0];
		 vclasse=enreg_classe[1];
         if(vcode_classe==vcode_clas) contenu+="<option value='"+vcode_classe+"' selected>"+vclasse+"</option>"; 
         else  contenu+="<option value='"+vcode_classe+"'>"+vclasse+"</option>"; 
        } 
  contenu+="</select>&nbsp;&nbsp;";

  contenu+="Examen : <select name=zcode_examen onchange='vcode_exam=this.value'>";
    for(k in texamens)
        {
         enreg_examen=texamens[k].split(';');
		 vcode_examen=enreg_examen[0];
		 vexamen=enreg_examen[1];
         contenu+="<option value='"+vcode_examen+"'>"+vexamen+"</option>"; 
        } 
  contenu+="</select>&nbsp;&nbsp;";

  contenu+="Matiere : <select name=zcode_matiere onchange='vcode_mati=this.value'>";
    for(k in tmatieres)
        {
         enreg_matiere=tmatieres[k].split(';');
		 vcode_matiere=enreg_matiere[0];
		 vmatiere=enreg_matiere[1];
		 vcode_classe=enreg_matiere[3];
		 if(vcode_classe==vcode_clas)  contenu+="<option value='"+vcode_matiere+"'>"+vmatiere+"</option>"; 
        } 
  contenu+="</select>&nbsp;&nbsp;";

  contenu+="&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick=ajouter_ligne_note_jour() title='ajouter ligne'><img src='ajouter.png' class=clas_img></a>";
  contenu+="&nbsp;&nbsp;&nbsp;";
  contenu+="<a href='#' onclick=supprimer_ligne_note_jour() title='supprimer ligne'><img src='supprimer.png' class=clas_img></a>";
  contenu+="&nbsp;&nbsp;&nbsp;";
  contenu+="<a href='#' onclick=enregistrer_note_jour() title='enregistrer'><img src='enregistrer.png' class=clas_img></a></span>";
  contenu+="<span class=outils_droite2>";
  contenu+="<a href='#' onclick=fermer_saisie_note_jour() title='fermer'><img src='fermer.png' class=clas_img></a>&nbsp;&nbsp;</span></form>";

  document.getElementById("id_div_outils").innerHTML=contenu;
}

function generer_saisie_note_jour()
{

contenu="<form name=form_note>";
contenu+="<table border=1 width=40% bgcolor=#DDDDDD align=center>";
contenu+="<tr><th colspan=2 bgcolor=#DDDDFF><font size=3>Saisie des notes journali&egrave;res</font></th></tr>";
contenu+="<tr align=center><td width=16%>Nom</td><td width=4%>Note Jour.</td></tr>";

for(j=0;j<nblig_note;j++)
  {

    contenu+="<tr><td><select name=zmatricule class=clas_select onclick=maj_matricule_note_jour()>";
    for(k in televes)
        {
  		  enreg_eleve=televes[k].split(";");
          vmatricule=enreg_eleve[0]; 	  
		  vcode_classe=enreg_eleve[2];
		  vnom=enreg_eleve[3];
 	      if (vcode_classe==vcode_clas)
 		     {
             if(tsaisie_matricule[j]==vmatricule) contenu+="<option value="+vmatricule+" selected>"+vnom+"</option>"; 
             else contenu+="<option value="+vmatricule+">"+vnom+"</option>"; 
            }
        }			
    contenu+='</select></td>';
 
    contenu+='<td><select name=znote_jour  class=clas_select onclick=maj_note_jour()>';
	for(k=0;k<=20;k++)
	     if(tsaisie_note_jour[j]==k) contenu+="<option value="+k+" selected>"+k+"</option>"; 
         else contenu+="<option value="+k+">"+k+"</option>"; 
    contenu+='</select></td>';
  
  }
contenu+='</table>';
contenu+='</form>';
document.getElementById('id_div_corps').innerHTML=contenu;
}

function saisie_note_jour()
{
 enreg_classe=tclasses[0].split(';');
 vcode_clas=enreg_classe[0];
 enreg_examen=texamens[0].split(';');
 vcode_exam=enreg_examen[0];
 enreg_matiere=tmatieres[0].split(';');
 vcode_mati=enreg_matiere[0];

 calcul_nblig_note_jour(); 
 
 for(k=0;k<nblig_note;k++)
   {
    tsaisie_matricule[k]=""; 
    tsaisie_note_jour[k]=""; 
   }
   masque_div();
   document.getElementById('id_div_corps').style.display='block';
   document.getElementById('id_div_outils').style.display='block';
   generer_outils_saisie_note_jour();
   generer_saisie_note_jour();
   encours='oui';
}

