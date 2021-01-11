import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from flask import request, url_for, jsonify
from flask_api import FlaskAPI, status

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

    test_df = train_data.drop("bank_account", axis=1)

    # get the columns for the users data
    user_data_columns = test_df.columns
    user_data = []

    # create DataFrame with correct columns
    for column in req_data["data"]:
        user_data.append(column)
    user_data = [user_data]
    user_data = pd.DataFrame(user_data, columns=user_data_columns)


# ***** As at this point the user_data and test_df DataFrames are the same **********

    # Label Encoding

    from sklearn.preprocessing import LabelEncoder
    # Convert target label to numerical Data
    le = LabelEncoder()
    train_data['bank_account'] = le.fit_transform(train_data['bank_account'])

    # valueEncode = []
    # train_data_copy = train_data.copy()
    # def printEncoderClasses():
    #     from sklearn.preprocessing import LabelEncoder
    #     for col in train_data.columns:
    #         le = LabelEncoder()
    #         train_data_copy[col] = le.fit_transform(train_data[col])
    #         print(le.classes_, train_data_copy[col].unique())

    # printEncoderClasses()

    #  Conversion
    train_data['year_'] = train_data['year']
    test_data['year_'] = test_data['year']
    user_data['year_'] = user_data['year']

    # Convert the following numerical labels from integer to float
    float_array = train_data[['household_size',
                              'age_of_respondent', 'year_']].values.astype(float)
    float_array = test_data[['household_size',
                             'age_of_respondent', 'year_']].values.astype(float)
    float_array = user_data[['household_size',
                             'age_of_respondent', 'year_']].values.astype(float)
    
    user_data["household_size"] = user_data["household_size"].astype(float)
    user_data["age_of_respondent"] = user_data["age_of_respondent"].astype(float)
    user_data["year_"] = user_data["year_"].astype(float)

    # print(user_data.dtypes)
    
    # Data preprocessing
    # convert categorical features to numerical features
    # categorical features to be converted by One Hot Encoding
    train_data['country_'] = train_data['country']
    test_data['country_'] = test_data['country']
    user_data['country_'] = user_data['country']

    categ = ['relationship_with_head', 'marital_status',
             'education_level', 'job_type', 'country_']
    # One Hot Encoding conversion
    train_data = pd.get_dummies(train_data, prefix_sep='_', columns=categ)

    test_data = pd.get_dummies(test_data, prefix_sep='_', columns=categ)

    user_data = pd.get_dummies(user_data, prefix_sep='_', columns=categ)

    # Labelncoder conversion
    train_data['location_type'] = le.fit_transform(train_data['location_type'])
    train_data['cellphone_access'] = le.fit_transform(
        train_data['cellphone_access'])
    train_data['gender_of_respondent'] = le.fit_transform(
        train_data['gender_of_respondent'])

    test_data['location_type'] = le.fit_transform(test_data['location_type'])
    test_data['cellphone_access'] = le.fit_transform(
        test_data['cellphone_access'])
    test_data['gender_of_respondent'] = le.fit_transform(
        test_data['gender_of_respondent'])

    user_data['location_type'] = le.fit_transform(user_data['location_type'])
    user_data['cellphone_access'] = le.fit_transform(
        user_data['cellphone_access'])
    user_data['gender_of_respondent'] = le.fit_transform(
        user_data['gender_of_respondent'])
    
    # Separate training features from target
    X_train = train_data.drop(
        ['year', 'uniqueid', 'bank_account', 'country'], axis=1)
    y_train = train_data['bank_account']

    X_test = test_data.drop(['year', 'uniqueid', 'country'], axis=1)
    user_data = user_data.drop(['year', 'uniqueid', 'country'], axis=1)

    # find the columns in the test data and not in the user data
    columns_not_present = np.setdiff1d(test_data.columns, user_data.columns)
    print(columns_not_present)

    # create a df of zeros for each missing column
    not_present_df = pd.DataFrame(0, index=np.arange(
        len(columns_not_present)), columns=columns_not_present)

    # join the user_df with the zeros df
    user_data = pd.concat([user_data, not_present_df])

    # dropping the extra unneccessary columns
    for missing_column in np.setdiff1d(user_data.columns, X_test.columns):
        user_data.drop(missing_column, axis=1, inplace=True)

    # rescale X_train, X_test and user_data
    # import MinMaxScaler
    from sklearn.preprocessing import MinMaxScaler

    scaler = MinMaxScaler(feature_range=(0, 1))
    X_train_rescaled = scaler.fit_transform(X_train)
    X_test_rescaled = scaler.fit_transform(X_test)
    user_data_rescaled = scaler.fit_transform(user_data)

    # Split train_data
    from sklearn.model_selection import train_test_split

    X_Train, X_val, y_Train, y_val = train_test_split(
        X_train_rescaled, y_train, stratify=y_train, test_size=0.2, random_state=42)

    #import XGBClassifier
    from xgboost import XGBClassifier
    from sklearn.linear_model import LogisticRegression

    my_model = XGBClassifier()

    my_model.fit(X_Train, y_Train)

    # predictions = my_model.predict(X_val)
    predictions = my_model.predict(user_data)

    return ({"Prediction": predictions.tolist()})


if __name__ == "__main__":
    app.run(debug=True, port=5090)
