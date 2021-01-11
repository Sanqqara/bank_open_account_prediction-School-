import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from flask import request, url_for, jsonify
from flask_api import FlaskAPI, status
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression

app = FlaskAPI(__name__)


@app.route("/api/test", methods=["POST"])
def printFF():
    return "Hello World..."


@app.route("/api/getPrediction", methods=["POST"])
def getPrediction():
    req_data = request.get_json()

    # Import data
    train_data = pd.read_csv('Train_v2.csv')
    test_data = pd.read_csv('Test_v2.csv')

    train_data = train_data[["country", "year", "location_type", "cellphone_access", "age_of_respondent", "bank_account"]]
    test_data = test_data[["country", "year", "location_type", "cellphone_access", "age_of_respondent"]]


    test_df = train_data.drop("bank_account", axis=1)

    # get the columns for the users data
    user_data_columns = ["country", "year", "location_type", "cellphone_access", "age_of_respondent"]
    user_data = []

    # create DataFrame with correct columns
    for column in req_data["data"]:
        user_data.append(column)
    user_data = [user_data]
    user_data = pd.DataFrame(user_data, columns=user_data_columns)
    # print(user_data)


# ***** As at this point the user_data and test_df DataFrames are the same **********

    # Label Encoding

    from sklearn.preprocessing import LabelEncoder
    # Convert target label to numerical Data
    le = LabelEncoder()
    train_data['bank_account'] = le.fit_transform(train_data['bank_account'])

    le = LabelEncoder()
    train_data["location_type"] = le.fit_transform(train_data["location_type"])

    le = LabelEncoder()
    train_data["country"] = le.fit_transform(train_data["country"])

    le = LabelEncoder()
    train_data["cellphone_access"] = le.fit_transform(train_data["cellphone_access"])
    le = LabelEncoder()

    le = LabelEncoder()
    user_data["location_type"] = le.fit_transform(user_data["location_type"])

    le = LabelEncoder()
    user_data["country"] = le.fit_transform(user_data["country"])

    le = LabelEncoder()
    user_data["cellphone_access"] = le.fit_transform(user_data["cellphone_access"])

    X_train = train_data.drop("bank_account", axis=1)
    y_train = train_data["bank_account"]

    # valueEncode = []
    # train_data_copy = train_data.copy()
    # def printEncoderClasses():
    #     from sklearn.preprocessing import LabelEncoder
    #     for col in train_data.columns:
    #         le = LabelEncoder()
    #         train_data_copy[col] = le.fit_transform(train_data[col])
    #         print(le.classes_, train_data_copy[col].unique())

    # printEncoderClasses()

    model = LogisticRegression()
    model.fit(X_train, y_train)
    predictions = model.predict(user_data)

    return ({"Prediction": predictions.tolist()})


if __name__ == "__main__":
    app.run(debug=True, port=5090)
