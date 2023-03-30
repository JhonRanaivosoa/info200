var tliste_note=new Array();
var tnote=new Array();
var inote;
var inotes;
//var vmotcl;
//var lig=0;
var oui;
var vcode_clas;
var vcode_exam;
var vcode_mati;

function afficher_note()
{
   enreg_note=tnote[inote].split(';');
   vmatricule=enreg_note[0];
   vcode_matiere=enreg_note[1];
   vcode_examen=enreg_note[2];
   vnote_jour=enreg_note[3];
   vnote_comp=enreg_note[4];
   form_note.zmatricule.value=vmatricule;
   form_note.zcode_matiere.value=vcode_matiere;
   form_note.zcode_examen.value=vcode_examen;
   form_note.znote_jour.value=vnote_jour;
   form_note.znote_comp.value=vnote_comp;
}

function chercher_inotes()
{
  inotes=tnotes.length;
  for(k in tnotes)
  { enreg_note=tnotes[k].split(";");
    vmatricule=enreg_note[0];
	vcode_matiere=enreg_note[1];
	vcode_examen=enreg_note[2];
	if(vmatricule==form_note.zmatricule.value&&vcode_matiere==form_note.zcode_matiere.value&&vcode_examen==form_note.zcode_examen.value) inotes=k;
  }	
}

function valider_enreg_note()
{
  if(form_note.zmatricule.value!=""&&form_note.zcode_matiere.value!=""&&form_note.zcode_examen.value!=""&&form_note.znote_jour.value!=""&&form_note.znote_comp.value!="") 
  { 
    tnote[inote]=form_note.zmatricule.value+';'+form_note.zcode_matiere.value+';'+form_note.zcode_examen.value+';'+form_note.znote_jour.value+';'+form_note.znote_comp.value;
    if(tnote.length>0)
	  { chercher_inotes();
	    tnotes[inotes]=tnote[inote];
	  }	
  }
}

function debut_note()
 {valider_enreg_note();
  inote=0;
  afficher_note();
 }

function suivant_note()
{ if (inote<tnote.length-1)
    {valider_enreg_note();
     inote++;
     afficher_note();
    }
}

function dernier_note()
 { valider_enreg_note();
   inote=tnote.length-1;
   afficher_note();
 }

function precedent_note()
{ if (inote>0)
    {valider_enreg_note();
     inote--;
     afficher_note();
    }
}

function chargement_tnote()
{
 tnote.splice(0,tnote.length);	
 tnote[0]=";;;;;";
 i=0;
 for(k in tnotes)
 {
  enreg_note=tnotes[k].split(";"); 
  vmatricule=enreg_note[0];
  vcode_matiere=enreg_note[1];
  vcode_examen=enreg_note[2];
  for(j in televes)
    {
	 enreg_eleve=televes[j].split(";");
     vmatr=enreg_eleve[0];
     if(vmatricule==vmatr) vcode_classe=enreg_eleve[2];	 
    }

if(vcode_classe==vcode_clas&&vcode_matiere==vcode_mati&&vcode_examen==vcode_exam) {tnote[i]=tnotes[k]; i++; }
  
 }	 
}


function fermer_liste_maj_note()
{
  document.getElementById("id_liste").style.display='none';
}	

function suppr_liste_note()
{
 if(lig>0)
  {
   oui=confirm("Etes-vous sur de supprimer tous les enregistrements de cette liste ?");
   if(oui)
    { tnotes.splice(0,tnotes.length);
      i=0;
      for(k in tliste_note) tnotes[i++]=tliste_note[k];
	  chargement_tnote();
	  afficher_note();
    }
  }
}	

function lister_maj_note()
{valider_enreg_note();
 document.getElementById('id_liste').style.display='block';
 contenu="<table border=1>";
 contenu+="<tr align=center bgcolor=#DDDDFF><th colspan=7>Liste Notes</th>";
 contenu+="<td><a href=# title='fermer' onclick=fermer_liste_maj_note()><img src='fermer.png'  class=clas_img></a></td></tr>";
 tliste_note.splice(0,tliste_note.length);
 contenu+="<tr align=center><td>Matricule</td><td>Nom</td><td>Code Classe</td><td>Code Matiere</td><td>Code Examen</td><td>Note jour.</td><td>Composition</td><td></td></tr>";
 lig=0;
 for(k in tnotes)
 { 
    enreg_note=tnotes[k].split(';');
    vmatricule=enreg_note[0];
	for(j in televes)
	  {
		enreg_eleve=televes[j].split(";");
        vmatr=enreg_eleve[0]; 		
		if(vmatr==vmatricule) {vnom=enreg_eleve[3]; vcode_classe=enreg_eleve[2];}
	  }		
    vcode_matiere=enreg_note[1];
    vcode_examen=enreg_note[2];
    vnote_jour=enreg_note[3];
	vnote_comp=enreg_note[4];
	vmotcle=(vmatricule+vcode_classe+vcode_matiere+vcode_examen).toLowerCase(); 
	vmotcl=vmotcl.toLowerCase(); 
	tmotcle=vmotcl.split(" ");
	if(tmotcle[1]==null) tmotcle[1]="";
	if(tmotcle[2]==null) tmotcle[2]="";
	if (vmotcle.indexOf(tmotcle[0])>=0&&vmotcle.indexOf(tmotcle[1])>=0&&vmotcle.indexOf(tmotcle[2])>=0)
	   contenu+="<tr><td align=center>"+vmatricule+"</td><td>"+vnom+"</td><td align=center>"+vcode_classe+"</td><td align=center>"+vcode_matiere+"</td><td align=center>"+vcode_examen+"</td><td align=center>"+vnote_jour+"</td><td align=center>"+vnote_comp+"</td><td></td></tr>";
    else  {tliste_note[lig++]=tnotes[k]; vcode_clas=vcode_classe; vcode_mati=vcode_matiere; vcode_exam=vcode_examen; }
  }
 contenu+="</table>";
 document.getElementById('id_liste').innerHTML=contenu;
}

function suppr_tnotes()
{
 for(k in tnotes)
   {
     enreg_note=tnotes[k].split(";");
     vmatricule=enreg_note[0];
	 vcode_matiere=enreg_note[1];
	 vcode_examen=enreg_note[2];
	 if(vmatricule==form_note.zmatricule.value&&vcode_matiere==form_note.zcode_matiere.value&&vcode_examen==form_note.zcode_examen.value) tnotes.splice(k,1);
   }	
}

function suppr_note()
{ oui=confirm("Etes-vous sur de supprimer cet enregistrement ?");
  if(oui)
   {	 
    suppr_tnotes();
 
    if (inote==tnote.length-1) 
       { tnote.pop();
         inote--;
		 if(inote==-1) fermer_maj_note()
		 else
		 { afficher_note();  
           valider_enreg_note();
		 } 
       }
    if (inote<tnote.length-1) 
       { tnote.splice(inote,1);
         afficher_note();  
         valider_enreg_note();
       }
   }   
}
   
function ajout_note() 
  {valider_enreg_note();
   inote=tnote.length;
   tnote[inote]=';;;';
   afficher_note();  
  }

function fermer_maj_note()
{ valider_enreg_note();
  document.getElementById("id_div_outils").style.display='none';
  document.getElementById("id_div_corps").style.display='none';
  encours='non';
}	

function generer_outils_maj_note()
{
  contenu="<form name='form_outils_maj_note'>&nbsp;Classe : <select name=zcode_classe onchange='vcode_clas=this.value;valider_enreg_note();generer_outils_maj_note();vcode_mati=form_outils_maj_note.zcode_matiere.value;chargement_tnote();inote=0;afficher_note()'>";
  for(k in tclasses)
        {
          enreg_classe=tclasses[k].split(";"); 
		  vcode_classe=enreg_classe[0];
		  vclasse=enreg_classe[1];
          if(vcode_classe==vcode_clas) contenu+="<option value='"+vcode_classe+"' selected>"+vclasse+"</option>"; 
		  else  contenu+="<option value='"+vcode_classe+"'>"+vclasse+"</option>"; 
        } 
  contenu+="</select>";	

  contenu+="Examen : <select name=zcode_examen onchange='vcode_exam=this.value;valider_enreg_note();chargement_tnote();inote=0;afficher_note()'>";
  for(k in texamens)
        {
         enreg_examen=texamens[k].split(';');
		 vcode_examen=enreg_examen[0];
		 vexamen=enreg_examen[1];
         contenu+="<option value='"+vcode_examen+"'>"+vexamen+"</option>"; 
        } 
  contenu+="</select>";
  
  contenu+="Matiere : <select name=zcode_matiere onchange='vcode_mati=this.value;valider_enreg_note();chargement_tnote();inote=0;afficher_note()'>";
  for(k in tmatieres)
        {
         enreg_matiere=tmatieres[k].split(';');
		 vcode_matiere=enreg_matiere[0];
		 vmatiere=enreg_matiere[1];
         if(vcode_matiere.indexOf(vcode_clas)>=0)	contenu+="<option value='"+vcode_matiere+"'>"+vmatiere+"</option>"; 

        } 
  contenu+="</select>";
  
  contenu+="<a href=# title='debut' onclick=debut_note()><img src='debut.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='suivant' onclick=suivant_note()><img src='suivant.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='precedent' onclick=precedent_note()><img src='precedent.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='dernier' onclick=dernier_note()><img src='dernier.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='supprimer' onclick=suppr_note()><img src='supprimer.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='ajouter' onclick=ajout_note()><img src='ajouter.png' class=clas_img></a>";

  
  contenu+="Rechercher <input type=text name=zmotcle title='Entrer le mot &agrave; rechercher' onchange='vmotcl=this.value;' size=26%>&nbsp;";
   
  contenu+="<a href=# title='rechercher' onclick=lister_maj_note()><img src='rechercher.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='supprimer' onclick=suppr_liste_note()><img src='supprimer.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='fermer' onclick=fermer_maj_note()><img src='fermer.png'  class=clas_img></a>";
   
 document.getElementById("id_div_outils").innerHTML=contenu;
}

function generer_maj_note()
{
contenu="<form name='form_note'>";
contenu+="<table border=0 width=60% class=clas_form>";
contenu+="<tr><td colspan=2 align=center bgcolor=#DDDDFF><b>Mise &agrave; jour note</b></td></tr>";
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

contenu+="<tr><td>Code Matiere :</td>";
contenu+="<td><select name=zcode_matiere>";
for(k in tmatieres)
   {
	enreg_matiere=tmatieres[k].split(";");   
	vcode_matiere=enreg_matiere[0];	
	contenu+="<option value='"+vcode_matiere+"'>"+vcode_matiere+"</option>";
   }
contenu+="</select></td></tr>";

contenu+="<tr><td>Examen :</td>";
contenu+="<td><select name=zcode_examen>";
for(k in texamens)
   {
	enreg_examen=texamens[k].split(";");   
	vcode_examen=enreg_examen[0];	
	vexamen=enreg_examen[1];
	contenu+="<option value='"+vcode_examen+"'>"+vexamen+"</option>";
   }
contenu+="</select></td></tr>";

contenu+="<tr><td>Note journaliere :</td>";
contenu+="<td><input type=text name=znote_jour></td></tr>";

contenu+="<tr><td>Note composition :</td>";
contenu+="<td><input type=text name=znote_comp></td></tr>";

contenu+="</table>";

contenu+="<div id=id_liste class=clas_liste>";
contenu+="</div>";

contenu+="</form>";
document.getElementById('id_div_corps').innerHTML=contenu;
document.getElementById('id_liste').style.display='none';
inote=0;
if(tnote.length>0) afficher_note();
}	

function maj_note()
{
 if(tnotes.length>0)
  { enreg_note=tnotes[0].split(";");
    vmatricule=enreg_note[0];
    for(j in televes)
     {
	  enreg_eleve=televes[j].split(";");
      vmatr=enreg_eleve[0];
      if(vmatricule==vmatr) vcode_clas=enreg_eleve[2];	 
     }
    vcode_mati=enreg_note[1];
    vcode_exam=enreg_note[2];
    chargement_tnote();
  }
 vmotcl="";
 masque_div();
 document.getElementById('id_div_corps').style.display='block';
 document.getElementById('id_div_outils').style.display='block';
 generer_outils_maj_note();
 generer_maj_note();
 encours='oui';
}