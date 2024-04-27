from joblib import load
import sys

# Charger la fonction de résumé
summarize = load('summarization_model.joblib')

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python summarize_text.py <text_file>")
        sys.exit(1)

    text_file = sys.argv[1]

    # Lire le contenu du fichier texte
    with open(text_file, "r", encoding="utf-8") as file:
        text = file.read()

    # Utiliser la fonction de résumé pour obtenir le résumé du texte
    summary = summarize(text)

    # Afficher le résumé
    print(summary)
