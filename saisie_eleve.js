var tsaisie_matricule=new Array();
var tsaisie_numero=new Array();
var tsaisie_code_classe=new Array();
var tsaisie_nom=new Array();
var tsaisie_date_naiss=new Array();
var tsaisie_lieu_naiss=new Array();
var tsaisie_sexe=new Array();
var tsaisie_domicile=new Array();

//var televe=new Array();
var tsexe=new Array();
var tsexe=["M","F"];
var nblig_eleve=2;


function ajouter_ligne_eleve()
 {
  nblig_eleve++;
  tsaisie_matricule[nblig_eleve-1]=""; 
  tsaisie_numero[nblig_eleve-1]="";
  tsaisie_code_classe[nblig_eleve-1]=""; 
  tsaisie_nom[nblig_eleve-1]=""; 
  tsaisie_date_naiss[nblig_eleve-1]=""; 
  tsaisie_lieu_naiss[nblig_eleve-1]=""; 
  tsaisie_sexe[nblig_eleve-1]=""; 
  tsaisie_domicile[nblig_eleve-1]=""; 

  generer_saisie_eleve();
 }
 
function supprimer_ligne_eleve()
 {
	
  if(nblig_eleve>0) 
    { nblig_eleve--;
      generer_saisie_eleve();
    }
 }

function maj_matricule_eleve()
 {
  for(lig=0;lig<nblig_eleve;lig++)
   {
    tsaisie_matricule[lig]=form_eleve.zmatricule[lig].value; 
   }
}

function maj_numero_eleve()
 {
  for(lig=0;lig<nblig_eleve;lig++)
   {
    tsaisie_numero[lig]=form_eleve.znumero[lig].value; 
   }
}

function maj_code_classe_eleve()
 {
  for(lig=0;lig<nblig_eleve;lig++)
   {
    tsaisie_code_classe[lig]=form_eleve.zcode_classe[lig].value; 
   }
}

function maj_nom_eleve()
 {
  for(lig=0;lig<nblig_eleve;lig++)
   {
    tsaisie_nom[lig]=form_eleve.znom[lig].value; 
   }
}

function maj_date_naiss_eleve()
 {
  for(lig=0;lig<nblig_eleve;lig++)
   {
    tsaisie_date_naiss[lig]=form_eleve.zdate_naiss[lig].value; 
   }
}

function maj_lieu_naiss_eleve()
 {
  for(lig=0;lig<nblig_eleve;lig++)
   {
    tsaisie_lieu_naiss[lig]=form_eleve.zlieu_naiss[lig].value; 
   }
}

function maj_sexe_eleve()
 {
  for(lig=0;lig<nblig_eleve;lig++)
   {
    tsaisie_sexe[lig]=form_eleve.zsexe[lig].value; 
   }
}

function maj_domicile_eleve()
 {
  for(lig=0;lig<nblig_eleve;lig++)
   {
    tsaisie_domicile[lig]=form_eleve.zdomicile[lig].value; 
   }
}

function enregistrer_eleve()
 {
  n=televe.length;
  if(nblig_eleve==1&&form_eleve.zmatricule.value!=""&&form_eleve.zcode_classe.value!=""&&form_eleve.znom.value!=""&&form_eleve.zsexe.value!="")
	 televe[n]=form_eleve.zmatricule.value+";"+form_eleve.znumero.value+";"+form_eleve.zcode_classe.value+";"+form_eleve.znom.value+";"+form_eleve.zdate_naiss.value+";"+form_eleve.zlieu_naiss.value+";"+form_eleve.zsexe.value+";"+form_eleve.zdomicile.value;
  else
   {  
    lig=0;  
    for(k=n;k<n+nblig_eleve;k++)
      {
        if(form_eleve.zmatricule[lig].value!=""&&form_eleve.zcode_classe[lig].value!=""&&form_eleve.znom[lig].value!=""&&form_eleve.zsexe[lig].value!="")    
    televe[k]=form_eleve.zmatricule[lig].value+";"+form_eleve.znumero[lig].value+";"+form_eleve.zcode_classe[lig].value+";"+form_eleve.znom[lig].value+";"+form_eleve.zdate_naiss[lig].value+";"+form_eleve.zlieu_naiss[lig].value+";"+form_eleve.zsexe[lig].value+";"+form_eleve.zdomicile[lig].value;
	    lig++;
      }
   }	  
   
 for(k in televe)
  {
	enreg_eleve=televe[k].split(";");
    vmatricule=enreg_eleve[0];
    vnumero=enreg_eleve[1];
    vcode_classe=enreg_eleve[2];
    vnom=enreg_eleve[3];
    vdate_naiss=enreg_eleve[4];	   
	vlieu_naiss=enreg_eleve[5];	   
	vsexe=enreg_eleve[6];	   
	vdomicile=enreg_eleve[7];	   
    trouve="non";
	for(j in televes)
	 {	
       enreg_eleve=televes[j].split(";");
       vmatr=enreg_eleve[0];
       if(vmatr==vmatricule)
	     { 
	//      televes[j]=vmatricule+";"+vnumero+";"+vcode_classe+";"+vnom+";"+vdate_naiss+";"+vlieu_naiss+";"+vsexe+";"+vdomicile;
		  trouve="oui";
		 }
	 }
	if (trouve=="non")
	  {
		n=televes.length;
        televes[n]=vmatricule+";"+vnumero+";"+vcode_classe+";"+vnom+";"+vdate_naiss+";"+vlieu_naiss+";"+vsexe+";"+vdomicile;
	  }	
   }	  
 }

function fermer_saisie_eleve()
{
document.getElementById("id_div_outils").style.display="none";
document.getElementById("id_div_corps").style.display="none";
encours="non";
}
         
function generer_outils_saisie_eleve()
{
  contenu="<span class=outils_gauche>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
 
 contenu+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick=ajouter_ligne_eleve() title='ajouter ligne'><img src='ajouter.png' class=clas_img></a>";
 
 contenu+="&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href='#' onclick=supprimer_ligne_eleve() title='supprimer ligne'><img src='supprimer.png' class=clas_img></a>";
  
  contenu+="&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href='#' onclick=enregistrer_eleve() title='enregistrer'><img src='enregistrer.png' class=clas_img></a></span>";
  
  contenu+="<span class=outils_droite>";
  
  contenu+="<a href='#' onclick=fermer_saisie_eleve() title='fermer'><img src='fermer.png' class=clas_img></a>&nbsp;&nbsp;</span>";

  document.getElementById("id_div_outils").innerHTML=contenu;
}

function generer_saisie_eleve()
{

contenu="<form name=form_eleve>";
contenu+="<table border=1 bgcolor=#DDDDDD width=90% align=center>";
contenu+="<tr><th colspan=8 bgcolor=#DDDDFF><font size=3>Saisie eleve</font></th></tr>";
contenu+="<tr align=center><td width=5%>Matricule</td><td width=5%>Numero</td><td width=10%>Code classe</td><td width=25%>nom</td><td width=10%>Date Naissance</td><td width=20%>Lieu Naissance</td><td width=5%>Sexe</td><td>Domicile</td></tr>";

for(j=0;j<nblig_eleve;j++)
  {
    contenu+="<tr><td><input type=text name=zmatricule value='"+tsaisie_matricule[j]+"'  class=clas_select onchange=maj_matricule_eleve()></td>";
    contenu+="<td><input type=text name=znumero value='"+tsaisie_numero[j]+"'  class=clas_select onchange=maj_numero_eleve()></td>";
    
    contenu+="<td><select name=zcode_classe class=clas_select onclick=maj_code_classe_eleve()>";
    for(k in tclasses)
        {
  		  enreg_classe=tclasses[k].split(";");
          vcode_classe=enreg_classe[0]; 	  
		  vclasse=enreg_classe[1];
          if(tsaisie_code_classe[j]==vcode_classe) contenu+="<option value="+vcode_classe+" selected>"+vclasse+"</option>"; 
             else contenu+="<option value="+vcode_classe+">"+vclasse+"</option>"; 
        }			
    contenu+="</select></td>";

	contenu+="<td><input type=text name=znom value='"+tsaisie_nom[j]+"'  class=clas_select onchange=maj_nom_eleve()></td>";

    contenu+="<td><input type=text name=zdate_naiss value='"+tsaisie_date_naiss[j]+"' class=clas_select onchange=maj_date_naiss_eleve()></td>";

    contenu+="<td><input type=text name=zlieu_naiss value='"+tsaisie_lieu_naiss[j]+"' class=clas_select onchange=maj_lieu_naiss_eleve()></td>";

    contenu+='<td><select name=zsexe class=clas_select onclick=maj_sexe_eleve()>';
    for(k in tsexe)
	     if(tsaisie_sexe[j]==tsexe[k]) contenu+="<option value='"+tsexe[k]+"' selected>"+tsexe[k]+"</option>"; 
         else contenu+="<option value='"+tsexe[k]+"'>"+tsexe[k]+"</option>";
   
    contenu+='</select></td>';
    contenu+="<td><textarea name=zdomicile class=clas_select onchange=maj_domicile_eleve()>"+tsaisie_domicile[j]+"</textarea></td></tr>";
   // contenu+="<td><input type=text name=zdomicile value='"+tsaisie_domicile[j]+"' class=clas_select onchange=maj_domicile_eleve()></td></tr>";
 
  }
contenu+='</table>';
contenu+='</form>';
document.getElementById('id_div_corps').innerHTML=contenu;
}

function saisie_eleve()
{
 for(k=0;k<nblig_eleve;k++)
   {
    tsaisie_matricule[k]=""; 
    tsaisie_numero[k]="";
    tsaisie_code_classe[k]=""; 
	tsaisie_nom[k]=""; 
    tsaisie_date_naiss[k]=""; 
    tsaisie_lieu_naiss[k]=""; 
    tsaisie_sexe[k]=""; 
    tsaisie_domicile[k]=""; 
   }
 masque_div();
 document.getElementById('id_div_corps').style.display='block';
 document.getElementById('id_div_outils').style.display='block';
 generer_outils_saisie_eleve();
 generer_saisie_eleve();
 encours='oui';
}

