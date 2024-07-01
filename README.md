Description du Projet : Application de Détection de Langue et Résumé Automatique :

Ce repository représente mon projet de fin d'études, où j'ai développé une application utilisant le traitement automatique du langage naturel (NLP) et des techniques basiques de machine learning.

- Détection de Langue :
Pour la détection de langue, j'ai utilisé une base de données provenant de Kaggle contenant des phrases dans plusieurs langues alphabétiques. J'ai implémenté un classifieur naïf Bayes comme modèle.

- Génération de Résumé Automatique :
Pour la génération de résumé automatique, j'ai utilisé le modèle basique TF-IDF qui calcule les fréquences des mots, sans nécessiter de données d'entraînement spécifiques.

- Interface Graphique et Architecture Client-Serveur :
J'ai développé une interface simple en HTML avec Bootstrap CSS. Pour la partie client, j'ai utilisé AJAX, et pour le côté serveur, j'ai mis en œuvre Node.js avec Express. Pour intégrer mes modèles, j'ai utilisé la méthode spawn du module child_process de Node.js pour appeler deux scripts Python qui exécutent les modèles enregistrés au format joblib.

// Un rapport détaillé est inclus pour plus d'informations sur le projet ainsi que la présentation de soutenance PFE-DUT.

