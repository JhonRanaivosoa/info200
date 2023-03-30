
var tliste_code_classe=new Array();
var vcode_clas;
var vmatr;
var vdate_deb;
var vmoti;

function fermer_liste_absence()
{
 document.getElementById("id_div_etats").innerHTML="";
 encours="non";
}

function generer_outils_liste_absence()
{
 contenu="<span class=outils_gauche2>";
 contenu+="<table><tr><td><a href=# onclick=fermer_liste_note() title='fermer'><img src='fermer.png'  class=clas_img></a>";
 contenu+="&nbsp;&nbsp;Classe :</td><td><select name=zcode_classe onchange='vcode_clas=this.value;generer_outils_liste_note(); generer_liste_note()'>";
 contenu+="<option value='Tous'>Tous</option>"; 
    for(k in tclasses)
        {
          enreg_classe=tclasses[k].split(";"); 
		  vcode_classe=enreg_classe[0];
		  vclasse=enreg_classe[1];
          if(vcode_classe==vcode_clas) contenu+="<option value='"+vcode_classe+"' selected>"+vclasse+"</option>"; 
		  else  contenu+="<option value='"+vcode_classe+"'>"+vclasse+"</option>"; 
        } 
 contenu+="</select></td></tr>";
 
 contenu+="<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nom :</td><td><select name=znom onchange='vmatr=this.value;generer_liste_note()'>";
 contenu+="<option value='Tous'>Tous</option>"; 
    for(k in televes)
        {
          enreg_eleve=televes[k].split(';');
		  vmatricule=enreg_eleve[0];
		  vcode_classe=enreg_eleve[2];
		  vnom=enreg_eleve[3];
		  if(vcode_classe==vcode_clas||vcode_clas=='Tous') contenu+="<option value='"+vmatricule+"'>"+vnom+"</option>"; 
        } 
 contenu+="</select></td></tr>"; 	

 contenu+="<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Motif :</td><td><input type=text name=zmotif onchange='vmoti=this.value;generer_liste_absence()'>";
 contenu+="</td></tr></table></span>";
 
 document.getElementById('id_div_etats').innerHTML=contenu;
}

function generer_liste_absence()
{
 generer_outils_liste_absence();
 contenu+="<table border=1 align=center>";
 contenu+="<tr align=center bgcolor=#DDDDFF><th colspan=6>Liste Absence</th></tr>";
 contenu+="<tr align=center><td width=8%>Classe</td><td width=14%>Nom</td><td width=5%>Date debut</td><td width=6%>Nb jours</td><td width=16%>Motif</td></tr>";
 
 for(k in tabsences)
 { 
    enreg_absence=tabsences[k].split(';');
    vmatricule=enreg_absence[0];
	for(j in televes)
       {enreg_eleve=televes[j].split(";");
        vmat=enreg_eleve[0];
		if(vmat==vmatricule)
		  {
           vnom=enreg_eleve[3];
		   vcode_classe=enreg_eleve[2];
		  } 
	   }
	
	for(j in tclasses)
	 { 
      enreg_classe=tclasses[j].split(";");
	  vcode_cla=enreg_classe[0];
	  if(vcode_cla==vcode_classe) vclasse=enreg_classe[1];
	 } 
	    
    vdate_debut=enreg_absence[1];
	vnb_jours=enreg_absence[2];
	vmotif=enreg_absence[3];
	
	if((vcode_clas=='Tous'||vcode_classe.indexOf(vcode_clas)>=0)&&(vmatr=='Tous'||vmatricule.indexOf(vmatr)>=0)&&(vmotif.indexOf(vmoti)>=0))
      contenu+="<tr><td align=center>"+vclasse+"</td><td>"+vnom+"</td><td align=center>"+vdate_debut+"</td><td align=center>"+vnb_jours+"</td><td align=center>"+vmotif+"</td></tr>";
  }
 contenu+='</table>';
 document.getElementById('id_div_etats').innerHTML=contenu;
}	

function charger_tliste_code_classe()
{
 for(k in televes)
 { enreg_eleve=televes[k].split(';');
   vmatricule=enreg_eleve[0];
   vcode_classe=enreg_eleve[2];
   tliste_code_classe[vmatricule]=vcode_classe;   
 }
}	

function liste_absence()
{
 charger_tliste_code_classe(); 
 vcode_clas='Tous';
 vmatr='Tous';
 vper='Tous';
 vmoti='';
 masque_div();
 document.getElementById('id_div_etats').style.display='block';
 generer_outils_liste_absence();
 generer_liste_absence();
 encours='oui'; 
}	
