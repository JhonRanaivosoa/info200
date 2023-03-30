 
function afficher_examen()
{
   enreg_examen=texamens[iexam].split(';');
   vCode_Examen=enreg_examen[0];
   vDesignation=enreg_examen[1];

   form_examen.zCode_Examen.value=vCode_Examen;
   form_examen.zDesignation.value=vDesignation;
}

function valider_enreg_examen()
{
   if(form_examen.zCode_Examen.value!=""&&form_examen.zDesignation.value!="") 
    texamens[iexam]=form_examen.zCode_Examen.value+';'+form_examen.zDesignation.value;
}

function debut_examen()
 {valider_enreg_examen();
  iexam=0;
  afficher_examen();
 }

function suivant_examen()
{ if (iexam<texamens.length-1)
    {valider_enreg_examen();
     iexam++;
     afficher_examen();
    }
}

function dernier_examen()
 { valider_enreg_examen();
   iexam=texamens.length-1;
   afficher_examen();
 }

function precedent_examen()
{ if (iexam>0)
    {valider_enreg_examen();
     iexam--;
     afficher_examen();
    }
}


function suppr_examen()
{
 oui=confirm("Etes-vous sur de supprimer cet enregistrement ?");
 if(oui)
  {	  
    if (iexam==texamens.length-1) 
     { texamens.pop();
       iexam--;
	   if(iexam==-1) fermer_maj_examen();
       afficher_examen();  
       valider_enreg_examen();
     }
    if (iexam<texamens.length-1) 
     { texamens.splice(iexam,1);
       afficher_examen();  
       valider_enreg_examen();
     }
   }  
}

function ajout_examen() 
  {valider_enreg_examen();
   iexam=texamens.length;
   texamens[iexam]=';;';
   afficher_examen();  
  }

function fermer_liste_maj_examen()
{ 
  document.getElementById("id_entete_liste").style.display='none';
  document.getElementById("id_liste").style.display='none';
}	

function suppr_liste_examen()
{
  if(lig>0)
  { 
    oui=confirm("Etes-vous sur de supprimer tous les enregistrements de cette liste ?");
    if(oui)
       { texamens.splice(0,texamens.length);
         i=0;
		 for(k in tliste_examen) texamens[i++]=tliste_examen[k];
		 afficher_examen();
       }
   }
 }	

function lister_maj_examen()
{valider_enreg_examen();
 document.getElementById('id_liste').style.display='block';
 
 contenu="<table border=1 align=center>";
 contenu+="<tr align=center bgcolor=#DDDDFF><th width=90% colspan=2>Liste des examens</th>";
 contenu+="<td><a href=# title='fermer' onclick=fermer_liste_maj_examen()><img src='fermer.png'  class=clas_img></a></td></tr>";
 
 tliste_examen.splice(0,tliste_examen.length);
 
 contenu+="<tr><th>Code_Examen</th><th>Designation</th><td></td></tr>";
 lig=0;
 for(k in texamens)
 { 
    if(k>=0)
	{	
     enreg_examen=texamens[k].split(';');
     vCode_Examen=enreg_examen[0];
     vDesignation=enreg_examen[1];
     
     vmotcle=(vCode_Examen+vDesignation).toLowerCase(); 
	 vmotcl=vmotcl.toLowerCase(); 
	 tmotcle=vmotcl.split(" ");
	 if(tmotcle[1]==null) tmotcle[1]="";
	 if(vmotcle.indexOf(tmotcle[0])>=0&&vmotcle.indexOf(tmotcle[1])>=0)
      contenu+="<tr><td align=center>"+vCode_Examen+"</td><td align=center>"+vDesignation+"</td><td></td></tr>";
     else tliste_examen[lig++]=texamens[k];
	}
  }
 contenu+="</table>";
 document.getElementById('id_liste').innerHTML=contenu;
}

function valider_examen()
{
 valider_enreg_examen();
 contenu='';
 for(i in texamens)
   {
    contenu+=texamens[i]+";"+'\n';
   }
 contenu=contenu.substring(0,contenu.length-1);
 form_examen.zsave.value=contenu;
 }

function fermer_maj_examen()
{ 
  valider_enreg_examen();
  document.getElementById("id_div_outils").style.display='none';
  document.getElementById("id_div_corps").style.display='none';
  encours='non';
}	
 
function generer_outils_maj_examen()
{
  contenu="<span class=outils_gauche>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=# title='debut' onclick=debut_examen()><img src='debut.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='suivant' onclick=suivant_examen()><img src='suivant.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='precedent' onclick=precedent_examen()><img src='precedent.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='dernier' onclick=dernier_examen()><img src='dernier.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  contenu+="<a href=# title='supprimer' onclick=suppr_examen()><img src='supprimer.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='ajouter' onclick=ajout_examen()><img src='ajouter.png' class=clas_img></a></span>";
  
  
  contenu+="<span class=outils_droite>Rechercher <input type=text name=zmotcle title='Entrer le mot &agrave; rechercher' onchange='vmotcl=this.value;' size=26%>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='rechercher' onclick=lister_maj_examen()><img src='rechercher.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='supprimer' onclick=suppr_liste_examen()><img src='supprimer.png' class=clas_img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  
  contenu+="<a href=# title='fermer' onclick=fermer_maj_examen()><img src='fermer.png'  class=clas_img></a>&nbsp;&nbsp;</span>";
    
 document.getElementById("id_div_outils").innerHTML=contenu;
}
 

function generer_maj_examen()
{
contenu="<form name='form_examen'  method=post action='save.php'>";
contenu+="<table border=0 width=60% class=clas_form>";
contenu+="<tr><td colspan=2 align=center bgcolor=#DDDDFF><b>Mise &agrave; jour Examen</b></td></tr>";
contenu+="<tr><td width=20%>Code_Examen:</td>";
contenu+="<td width=40%><input type=text name=zCode_Examen size=5%></td></tr>";
contenu+="<tr><td>Num en classe:</td>";
contenu+="<td><input type=text name=zDesignation size=30%></td></tr>";


contenu+="<input type=hidden name=zdonnee_source value='ecole/examens.txt'>";
contenu+="<input type=hidden name=zprogramme_source value='index2.php'>";
contenu+="<input type=hidden name=zsave>";
contenu+="</table>";

contenu+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
contenu+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
contenu+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
contenu+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
contenu+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";


contenu+="<div id=id_entete_liste class=clas_entete_liste2>";
contenu+="</div>";

contenu+="<div id=id_liste class=clas_liste>";
contenu+="</div>";

contenu+="</form>";
document.getElementById('id_div_corps').innerHTML=contenu;

document.getElementById('id_entete_liste').style.display='none';
document.getElementById('id_liste').style.display='none';
iexam=0;
//if(texamens.length>0) afficher_examen();
afficher_examen();

}	


function maj_examen()
{ 
  vmotcl="";
  encours="oui";
  masque_div(); 
  document.getElementById('id_div_outils').style.display='block';
  document.getElementById('id_div_corps').style.display='block';
  generer_outils_maj_examen();
  generer_maj_examen();
  encours='oui';
}

