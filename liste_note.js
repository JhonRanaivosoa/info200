var tliste_code_classe=new Array();
var vcode_clas;
var vcode_exam;
var vcode_mati;
var vmatr;

function fermer_liste_note()
{
 document.getElementById("id_div_etats").innerHTML="";
 encours="non";
}

function generer_outils_liste_note()
{
 contenu="<span class=outils_gauche2>";
 contenu+="<table width=50%>";
 contenu+="<tr><td><a href=# onclick=fermer_liste_note() title='fermer'><img src='fermer.png'  class=clas_img></a>&nbsp;&nbsp;Examen :</td><td><select name=zcode_examen onchange='vcode_exam=this.value;generer_liste_note()'>";
 contenu+="<option value='Tous'>Tous</option>"; 
    for(k in texamens)
        {
		  enreg_examen=texamens[k].split(";");
		  vcode_examen=enreg_examen[0];
		  vexamen=enreg_examen[1];
		  if(vcode_examen==vcode_exam) contenu+="<option value='"+vcode_examen+"' selected>"+vexamen+"</option>"; 
          else contenu+="<option value='"+vcode_examen+"'>"+vexamen+"</option>"; 
        } 
 contenu+="</select></td>";
 
 contenu+="<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Classe :</td><td><select name=zcode_classe onchange='vcode_clas=this.value;generer_outils_liste_note(); generer_liste_note()'>";
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
 
 contenu+="<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mati&egrave;re :</td><td><select name=zcode_matiere onchange='vcode_mati=this.value;generer_liste_note()'>";
 contenu+="<option value='Tous'>Tous</option>";  
  for(k in tmatieres)
        {
        enreg_matiere=tmatieres[k].split(';');
		vcode_matiere=enreg_matiere[0];
		vmatiere=enreg_matiere[1];
		if(vcode_matiere.indexOf(vcode_clas)>=0||vcode_clas=='Tous')	contenu+="<option value='"+vcode_matiere+"'>"+vcode_matiere+"</option>"; 
        } 
 contenu+="</select></td></tr>";
 
 contenu+="<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nom :</td><td><select name=znom onchange='vmatr=this.value;generer_liste_note()'>";
 contenu+="<option value='Tous'>Tous</option>"; 
    for(k in televes)
        {
          enreg_eleve=televes[k].split(';');
		  vmatricule=enreg_eleve[0];
		  vcode_classe=enreg_eleve[2];
		  vnom=enreg_eleve[3];
		  if(vcode_classe==vcode_clas||vcode_clas=='Tous') contenu+="<option value='"+vmatricule+"'>"+vnom+"</option>"; 
        } 
 contenu+="</select></td></tr></table></span>"; 	
 document.getElementById('id_div_etats').innerHTML=contenu;
}

function generer_liste_note()
{
 generer_outils_liste_note();	
 contenu+="<table border=1 align=center>";
 contenu+="<tr align=left bgcolor=#DDDDFF><th colspan=9>&nbsp;Liste Note</th></tr>";
 contenu+="<tr align=center><td width=6%>Examen</td><td width=4%>Classe</td><td width=8%>Mati&egrave;re</td><td width=3%>Coefficient</td><td width=12%>Nom</td><td width=3%>Note jour</td><td width=3%>Composition</td><td width=3%>Moyenne</td><td width=3%>Note D&eacute;f</td></tr>";
 
 for(k in tnotes)
 { 
    enreg_note=tnotes[k].split(';');
    vmatricule=enreg_note[0];

	vcode_classe=tliste_code_classe[vmatricule];
	for(j in tclasses)
	 { 
      enreg_classe=tclasses[j].split(";");
	  vcode_cla=enreg_classe[0];
	  if(vcode_cla==vcode_classe) vclasse=enreg_classe[1];
	 } 
	
    vcode_matiere=enreg_note[1];
	for(j in tmatieres)
	 { 
      enreg_matiere=tmatieres[j].split(";");
	  vcode_mat=enreg_matiere[0];
	  if(vcode_mat==vcode_matiere) {vmatiere=enreg_matiere[1]; vcoef=enreg_matiere[2];}
	 } 
		
    vcode_examen=enreg_note[2];
    for(j in texamens)
       {enreg_examen=texamens[j].split(";");
        vcode_exa=enreg_examen[0];
		if(vcode_exa==vcode_examen) vexamen=enreg_examen[1];
	   }

	for(j in televes)
       {enreg_eleve=televes[j].split(";");
        vmat=enreg_eleve[0];
		if(vmat==vmatricule) vnom=enreg_eleve[3];
	   }

    vnote_jour=enreg_note[3];
	vnote_comp=enreg_note[4];
    vmoyenne=parseInt((vnote_jour-(-2*vnote_comp))/3*100)/100;
	vnote_def=parseInt(vcoef*vmoyenne*100)/100;
	if((vcode_exam=='Tous'||vcode_exam==vcode_examen)&&(vcode_clas=='Tous'||vcode_clas==vcode_classe)&&(vcode_mati=='Tous'||vcode_mati==vcode_matiere)&&(vmatr=='Tous'||vmatr==vmatricule))
    contenu+="<tr><td align=center>"+vexamen+"</td><td align=center>"+vclasse+"</td><td align=center>"+vmatiere+"</td><td align=center>"+vcoef+"</td><td>"+vnom+"</td><td align=center>"+vnote_jour+"</td><td align=center>"+vnote_comp+"</td><td align=center>"+vmoyenne+"</td><td align=center>"+vnote_def+"</td></tr>";
  }
 contenu+="</table>";
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

function liste_note()
{
 charger_tliste_code_classe(); 
 vcode_clas='Tous';
 vcode_exam='Tous';
 vcode_mati='Tous';
 vmatr='Tous';
 masque_div();
 document.getElementById('id_div_etats').style.display='block';
 generer_liste_note();	
 encours='oui';
}	
