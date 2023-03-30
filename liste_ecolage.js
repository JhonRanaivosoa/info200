
var tliste_code_classe=new Array();
var vcode_clas;
var vcode_exam;
var vcode_mati;
var vmatr;

function imprimer_liste_ecolage()
{
 document.write("<table border=1 align=center>");
 document.write("<tr align=center bgcolor=#DDDDFF><th colspan=9>Liste ecolage</th></tr>");
 document.write("<tr align=center><td width=5%>Classe</td><td width=12%>Nom</td><td width=3%>Date de paiement</td><td width=3%>Mois</td><td width=3%>Paiement</td></tr>");
 
 for(k in tecolages)
 { 
    enreg_ecolage=tecolages[k].split(';');
    vmatricule=enreg_ecolage[0];
	vcode_classe=tliste_code_classe[vmatricule];
	
	for(j in tclasses)
	 { 
      enreg_classe=tclasses[j].split(";");
	  vcode_cla=enreg_classe[0];
	  if(vcode_cla==vcode_classe) vclasse=enreg_classe[1];
	 } 
	
    vdate_paie=enreg_ecolage[1];
	
	//for(j in tmatieres)
	 { 
     // enreg_matiere=tmatieres[j].split(";");
	 // vcode_mat=enreg_matiere[0];
	 // if(vcode_mat==vdate_paie) {vmatiere=enreg_matiere[1]; vcoef=enreg_matiere[2];}
	 } 
		
    vmois=enreg_ecolage[2];
    for(j in texamens)
       {enreg_examen=texamens[j].split(";");
        vcode_exa=enreg_examen[0];
		if(vcode_exa==vmois) vexamen=enreg_examen[1];
	   }
    
	for(j in televes)
       {enreg_eleve=televes[j].split(";");
        vmat=enreg_eleve[0];
		if(vmat==vmatricule) vnom=enreg_eleve[3];
	   }

    vmontant=enreg_ecolage[3];
	//vecolage_comp=enreg_ecolage[4];
    //vmoyenne=parseInt((vmontant-(-2*vecolage_comp))/3*100)/100;
	//vecolage_def=parseInt(vcoef*vmoyenne*100)/100;
	
	if((vcode_exam=='Tous'||vcode_exam==vmois)&&(vcode_clas=='Tous'||vcode_clas==vcode_classe)&&(vcode_mati=='Tous'||vcode_mati==vdate_paie)&&(vmatr=='Tous'||vmatr==vmatricule))
    document.write("<tr><td align=center>"+vclasse+"</td><td>"+vnom+"</td><td align=center>"+vdate_paie+"</td><td align=center>"+vmois+"</td><td align=center>"+vmontant+"</td></tr>");

  }
 document.write("</table>");
  
 encours="non";
}

function fermer_liste_ecolage()
{
 document.getElementById("id_div_outils").style.display="none";
 document.getElementById("id_div_etats").style.display="none";
 encours="non";
}

function generer_outils_liste_ecolage()
{
 contenu="<span class=outils_gauche2>";
 contenu+="Classe :<select name=zcode_classe onchange='vcode_clas=this.value;generer_outils_liste_ecolage(); generer_liste_ecolage()'>";
 contenu+="<option value='Tous'>Tous</option>"; 
    for(k in tclasses)
        {
          enreg_classe=tclasses[k].split(";"); 
		  vcode_classe=enreg_classe[0];
		  vclasse=enreg_classe[1];
          if(vcode_classe==vcode_clas) contenu+="<option value='"+vcode_classe+"' selected>"+vclasse+"</option>"; 
		  else  contenu+="<option value='"+vcode_classe+"'>"+vclasse+"</option>"; 
        } 
 contenu+="</select>";
 
 contenu+="&nbsp;&nbsp;Nom : <select name=znom onchange='vmatr=this.value;generer_liste_ecolage()'>";
 contenu+="<option value='Tous'>Tous</option>"; 
    for(k in televes)
        {
          enreg_eleve=televes[k].split(';');
		  vmatricule=enreg_eleve[0];
		  vcode_classe=enreg_eleve[2];
		  vnom=enreg_eleve[3];
		  if(vcode_classe==vcode_clas||vcode_clas=='Tous') contenu+="<option value='"+vmatricule+"'>"+vnom+"</option>"; 
        } 
 contenu+="</select>"; 	
 contenu+="&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=imprimer_liste_ecolage() title='imprimer'><img src='imprimer.png'  class=clas_img></a>"; 
 contenu+="</span>";
 contenu+="<span class=outils_droite2>";
 contenu+="<a href=# onclick=fermer_liste_ecolage() title='fermer'><img src='fermer.png'  class=clas_img></a>&nbsp;&nbsp;";
 contenu+="</span>";
 document.getElementById('id_div_outils').innerHTML=contenu;
}

function generer_liste_ecolage()
{
 contenu="<table border=1 align=center width=100%>";
 contenu+="<tr align=center bgcolor=#DDDDFF><th colspan=5>Liste ecolage</th></tr>";
 contenu+="<tr align=center><td width=5%>Classe</td><td width=12%>Nom</td><td width=3%>Date de paiement</td><td width=3%>Mois</td><td width=3%>Montant</td></tr>";
 
 
 for(k in tecolages)
 { 
    enreg_ecolage=tecolages[k].split(';');
    vmatricule=enreg_ecolage[0];
	for(j in televes)
	 { 
      enreg_eleve=televes[j].split(";");
	  vmatri=enreg_eleve[0];
	  if(vmatri==vmatricule) vnom=enreg_eleve[3];
	 } 

	vcode_classe=tliste_code_classe[vmatricule];
	
	for(j in tclasses)
	 { 
      enreg_classe=tclasses[j].split(";");
	  vcode_cla=enreg_classe[0];
	  if(vcode_cla==vcode_classe) vclasse=enreg_classe[1];
	 } 
	

    vdate_paie=enreg_ecolage[1];
			
    vmois=enreg_ecolage[2];
   
    vmontant=enreg_ecolage[3];
	
	if((vcode_clas=='Tous'||vcode_clas==vcode_classe)&&(vmatr=='Tous'||vmatr==vmatricule))
    contenu+="<tr><td align=center>"+vclasse+"</td><td>"+vnom+"</td><td align=center>"+vdate_paie+"</td><td align=center>"+vmois+"</td><td align=center>"+vmontant+"</td></tr>";

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

function liste_ecolage()
{
 charger_tliste_code_classe(); 
 vcode_clas='Tous';
 vcode_exam='Tous';
 vcode_mati='Tous';
 vmatr='Tous';
 masque_div();
 document.getElementById('id_div_etats').style.display='block';
 document.getElementById('id_div_outils').style.display='block';
 generer_outils_liste_ecolage();
 generer_liste_ecolage();	
 encours='oui';
}	
