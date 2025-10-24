import json

notebook_json = {
    "cells": [
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "# 🎬 Netflix Content Analytics Notebook\n",
                "AI-assisted strategic insights for Movies & TV Shows (2008–2021)\n",
                "This notebook reproduces the core analytics from the React dashboard using Python (pandas, seaborn, matplotlib)."
            ]
        },
        {
            "cell_type": "code",
            "metadata": {},
            "source": [
                "print('Hello, Netflix Analytics!')"
            ],
            "execution_count": None,
            "outputs": []
        }
    ],
    "metadata": {
        "kernelspec": {
            "display_name": "Python 3",
            "language": "python",
            "name": "python3"
        },
        "language_info": {
            "codemirror_mode": {
                "name": "ipython",
                "version": 3
            },
            "file_extension": ".py",
            "mimetype": "text/x-python",
            "name": "python",
            "nbconvert_exporter": "python",
            "pygments_lexer": "ipython3",
            "version": "3.10"
        }
    },
    "nbformat": 4,
    "nbformat_minor": 5
}

with open(r'c:\Users\udayd\OneDrive\Desktop\Netflix\project\project-Netflix_Analytics JN.ipynb', 'w', encoding='utf-8') as f:
    json.dump(notebook_json, f, indent=1)