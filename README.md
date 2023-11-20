# Student Engagement Analysis: A Comprehensive Indicator Approach

This project aimed to create an indicator to identify active students on a forum. The indicator is based on four sub-indicators: average time spent on the platform, regularity of logins, number of responded messages, and number of shared files. A general indicator was also calculated considering all sub-indicators. The visualization of the indicator allows users to view either the general ranking or rankings based on individual sub-indicators, presented in a table or graphical format. The project provides a comprehensive tool for teachers to understand student engagement on the forum.

## Installation

Before starting, you need to install the necessary dependencies.

For the front-end, use npm:

```bash
npm install
```

For the script, use pip:

```bash
pip install -r requirements.txt
```

Then, you need to enter your database informations in the src.script.py file.

## Usage

To run the script, navigate to the src.script subfolder and run the following command:

```bash
uvicorn script:app --reload
```

To start the front-end server, use the following command:

```bash
npm run start
```
