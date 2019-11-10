# portal

Patch pour le portail captif kupiki hotspot (https://github.com/pihomeserver/Kupiki-Hotspot-Script)

Ce mod permet de changer la mécanique d'enregistrement et de connexion sur le hotspot. Inscription par e-mail, connexion automatique et application automatique d'un profil freeradius.

Raspberry pi 4 sous raspbian buster et Kupiki-Hotspot-Script V2.1.3 avec configuration par défaut:

1. Créez un profil nommé "RESTRICTIONS" dans freeradius avec vos options.

2. Ajoutez/remplacez le contenu du dossier "patch-kupiki-portal-backend" dans "/home/kupiki/kupiki-portal-backend/app/src/".

3. Supprimez le contenu du dossier "/usr/share/nginx/portal" et ajouter : index.html, js/script.js, js/ChilliLibrary.js, img/background.jpg, img/logo.png et css/style.css.

Maksymilian

![Alt text](https://i.ibb.co/W2ycqgx/screen.jpg)
