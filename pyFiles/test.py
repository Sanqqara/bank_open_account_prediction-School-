import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Import data
train_data = pd.read_csv('Train_v2.csv')
test_data = pd.read_csv('Test_v2.csv')
print(train_data.columns)

# print('train data shape :', train_data.shape)
# print('test data shape :', test_data.shape)

# Label Encoding

from sklearn.preprocessing import LabelEncoder
# Convert target label to numerical Data
le = LabelEncoder()
train_data['bank_account'] = le.fit_transform(train_data['bank_account'])
train_data.head()

#  Conversion
train_data['year_'] = train_data['year']
test_data['year_'] = test_data['year']
# Convert the following numerical labels from integer to float
float_array = train_data[['household_size', 'age_of_respondent', 'year_']].values.astype(float)
float_array = test_data[['household_size', 'age_of_respondent', 'year_']].values.astype(float)


# Data preprocessing 
# convert categorical features to numerical features
# categorical features to be converted by One Hot Encoding
train_data['country_'] = train_data['country']
test_data['country_'] = test_data['country']

categ = ['relationship_with_head', 'marital_status', 'education_level', 'job_type', 'country_']
# One Hot Encoding conversion
train_data = pd.get_dummies(train_data, prefix_sep='_', columns = categ)

test_data = pd.get_dummies(test_data, prefix_sep='_', columns = categ)

# Labelncoder conversion
train_data['location_type'] = le.fit_transform(train_data['location_type'])
train_data['cellphone_access'] = le.fit_transform(train_data['cellphone_access'])
train_data['gender_of_respondent'] = le.fit_transform(train_data['gender_of_respondent'])


test_data['location_type'] = le.fit_transform(test_data['location_type'])
test_data['cellphone_access'] = le.fit_transform(test_data['cellphone_access'])
test_data['gender_of_respondent'] = le.fit_transform(test_data['gender_of_respondent'])

#Separate training features from target
X_train = train_data.drop(['year', 'uniqueid', 'bank_account', 'country'], axis=1)
y_train = train_data['bank_account']

X_test = test_data.drop(['year', 'uniqueid', 'country'], axis=1)

#rescale X_train and X_test
# import MinMaxScaler
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler(feature_range=(0, 1))
X_train_rescaled = scaler.fit_transform(X_train)
X_test_rescaled = scaler.fit_transform(X_test)


# Split train_data
from sklearn.model_selection import train_test_split

X_Train, X_val, y_Train, y_val = train_test_split(X_train_rescaled, y_train, stratify = y_train, test_size = 0.2, random_state=42)

#import XGBClassifier
from xgboost import XGBClassifier

my_model = XGBClassifier()

my_model.fit(X_Train, y_Train)
# print("My model2....", my_model)


predictions = my_model.predict(X_val)

# print(predictions)
# print(train_data)