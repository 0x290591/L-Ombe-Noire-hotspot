# portal
Portail captif pour Kupiki hotspot

Portail captif basé sur Kupiki hotspot (https://github.com/pihomeserver/Kupiki-Hotspot-Script)

Modifications :
Enregistrement avec uniquement une adresse email puis connexion automatique.
L'utilisateur est ajouté à freeradius et un profil nommé RESTRICTIONS est automatiquement appliqué. (il faut créer le profil freeradius "RESTRICTIONS" à la main)

Pour fonctionner le kupiki-portal-backend doit être patché avec le dossier patch-kupiki-portal-backend.
