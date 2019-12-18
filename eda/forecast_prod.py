#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import pandas as pd


# In[2]:


df = pd.read_csv('data/hacc.csv')
df.head()


# In[3]:


len(df)


# In[4]:


print(df.columns)
df.columns = ['name', 'session_type', 'start_time', 'end_time', 'duration', 'energy', 'amount', 'id', 'port_type', 'payment_mode']
print(df.columns)


# In[5]:


df.dtypes


# In[6]:


df['start_time'] = pd.to_datetime(df['start_time'])
df['end_time'] = pd.to_datetime(df['end_time'])

# Changes the payment amount to a raw float value instead of a string of the form "$X.XX"
df['amount'] = df['amount'].replace('[\$,]', '', regex=True).astype(float)
df.head()


# In[7]:


df[df['duration'].str.contains('-')]['duration']


# ## Data Errors
# Types of errors found:
# 1. Positive energy, Zero amount -- Resolution: ?
# 2. Positive amount, Zero energy -- Resolution: ?

# In[8]:


# Checking for any missing values
missing = df[(df['energy'] == 0) | (df['amount'] == 0)]
print(len(missing))
missing.head()


# In[9]:


# Anyone who charges their car but doesn't pay is a "thief" -- correctable if we just use HECO formula?
# Question: Is this ALWAYS just a data issue or do some people actually get away without paying?
thieves = df[(df['energy'] > 0) & (df['amount'] == 0)]
print(len(thieves))
thieves.head()


# In[10]:


# Anyone who used 0 energy but still paid got "jipped"
jipped = df[(df['energy'] == 0) & (df['amount'] > 0)]
print(len(jipped))
jipped.head()


# In[11]:


dates = df['start_time'].dt.date
df['date'] = dates
df['date']


# In[12]:


df['day_of_week'] = df['start_time'].dt.day_name()
df['day_of_week']


# ## Time of Day
# Noting from his slides:
# 
# Times:
# - On Peak: 5pm - 10pm => 17:00 - 22:00, Daily
# - Mid Day: 9am - 5pm => 9:00 => 17:00, Daily
# - Off Peak: 10pm - 9am => 22:00 - 9:00, Daily
# 
# Cost:
# - On Peak: \$0.57
# - Mid Day: \$0.49
# - Off Peak: \$0.54
# 

# In[13]:


import datetime as dt
start_times = df['start_time'].dt.time
df['on_peak'] = (dt.time(17, 0, 0) <= start_times) & (start_times < dt.time(22, 0, 0))
df['mid_day'] = (dt.time(9, 0, 0) <= start_times) & (start_times < dt.time(17, 0, 0))
df['off_peak'] = (dt.time(22, 0, 0) <= start_times) | (start_times < dt.time(9, 0, 0))
df.head()


# ## Error Checking
# Checking if each columns are in agreement with each other
# 1. Does cost match with the amount of energy for the given time period?

# In[14]:


df['calculated_amount'] = df['energy'] * df['on_peak'] * 0.57 + df['energy'] * df['mid_day'] * 0.49 + df['energy'] * df['off_peak'] * 0.54
df['rounded_calculated_amount'] = np.round(df['calculated_amount'], 2)
correct = df[(df['amount'] == df['rounded_calculated_amount'])]
err = df[~(df['amount'] == df['rounded_calculated_amount'])]
correct.head()


# In[15]:


err[np.abs(err['amount'] - err['rounded_calculated_amount']) == 0.01]#[['amount', 'rounded_calculated_amount', 'calculated_amount']]


# In[16]:


err[np.abs(err['amount'] - err['rounded_calculated_amount']) > 1]


# In[17]:


df = df.rename({'rounded_calculated_amount': 'correct_amount'}, axis=1)
df['error_rounding'] = np.abs(df['amount'] - df['correct_amount']) == 0.01
df['error_calculation'] = np.abs(df['amount'] - df['correct_amount']) > 0.01
df.head()


# In[18]:


df[df['error_rounding']]


# In[19]:


for col in ['session_type', 'port_type', 'payment_mode']:
    df[col] = df[col].astype('category')
df.dtypes


# In[20]:


preproc_df = df.join(pd.get_dummies(df.select_dtypes('category')))
# preproc_df = preproc_df.join(pd.get_dummies(df['name']))

# Drop original categorical columns in favor of the "One Hot Encoding"
preproc_df = preproc_df.drop(df.select_dtypes('category'), axis=1)
# preproc_df['start_time'] = pd.to_timedelta(preproc_df['start_time'])
# preproc_df['end_time'] = pd.to_timedelta(preproc_df['end_time'])
# preproc_df['correct_duration'] = preproc_df['end_time'].dt.total_seconds() - preproc_df['start_time'].dt.total_seconds()

def get_sec(time_str):
    """Get Seconds from time."""
    h, m, s = time_str.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)

preproc_df['correct_duration'] = preproc_df['duration'].apply(lambda x: get_sec(x))

preproc_df = preproc_df.drop(['id', 'start_time', 'end_time', 'duration', 'amount', 'calculated_amount', 'day_of_week'], axis=1)


df_agg = preproc_df.groupby(['name', 'date']).agg('sum').reset_index()
df_agg['day_of_week'] = pd.to_datetime(df_agg['date']).dt.day_name()
df_agg['month'] = pd.to_datetime(df_agg['date']).dt.month_name()

for col in ['day_of_week', 'month']:
    df_agg[col] = df_agg[col].astype('category')
    
df_agg = df_agg.join(pd.get_dummies(df_agg.select_dtypes('category')))
df_agg = df_agg.drop(df_agg.select_dtypes('category'), axis=1)

stations = [g for _, g in df_agg.groupby('name')]

def offset_col_x_days(df, col, days):
    for x in range(1, days):
        df[f'{col}_prev_{7+x}'] = df[col].shift(7+x)
    df = df.dropna().reset_index(drop=True)
    return df

for i in range(len(stations)):
    for col in ['energy', 'on_peak', 'mid_day', 'off_peak', 'error_rounding', 'error_calculation', 'session_type_DEVICE', 'session_type_MOBILE', 'session_type_WEB',
       'port_type_CHADEMO', 'port_type_DCCOMBOTYP1', 'payment_mode_CREDITCARD',
       'payment_mode_RFID']:
        stations[i] = offset_col_x_days(stations[i], col, 7)


# In[27]:


from datetime import timedelta
test_stations = []
for station in stations:
    most_recent_session = station['date'].values[-1]
    
    test_station = pd.DataFrame()
    test_station['date'] = pd.Series([most_recent_session + timedelta(days=x) for x in range(1, 8)])
    for col in ['energy', 'on_peak', 'mid_day', 'off_peak', 'error_rounding', 'error_calculation', 'session_type_DEVICE', 'session_type_MOBILE', 'session_type_WEB',
       'port_type_CHADEMO', 'port_type_DCCOMBOTYP1', 'payment_mode_CREDITCARD',
       'payment_mode_RFID']:
        for x in range(1, 7):
            test_station[f'{col}_prev_{7+x}'] = station[col].shift(7+x).values[-7:]
    test_station = test_station.dropna().reset_index(drop=True)
    test_station['day_of_week'] = pd.to_datetime(test_station['date']).dt.day_name()
    test_station['month'] = pd.to_datetime(test_station['date']).dt.month_name()
    for col in ['day_of_week', 'month']:
        test_station[col] = test_station[col].astype('category')
        
    months = set([
        'month_April',
        'month_August',
        'month_December',
        'month_February',
        'month_January',
        'month_July',
        'month_June',
        'month_March',
        'month_May',
        'month_November',
        'month_October'
    ])
    test_station = test_station.join(pd.get_dummies(test_station.select_dtypes('category')))
    test_station = test_station.drop(test_station.select_dtypes('category'), axis=1)
    months = months - set(test_station.columns)
    months_df = pd.DataFrame()
    for month in months:
        months_df[month] = [0] * 7
    test_station = test_station.join(months_df)
    test_stations.append(test_station)


# In[28]:


test_stations[0]


# In[29]:


from sklearn.ensemble import RandomForestRegressor


def train_model(stations, test_stations, clf):
    """
    Train a Machine Learning Model for the HECO forecasting.

    params:
    - stations: A list of DataFrames with each containing data for a specific charging stations. Model is trained on this data
    - test_stations: Same as stations but for the test data.
    - clf: The Machine Learning classifier to train. Minimally requires a fit() function that takes the training data and the outputs
    """
    y_preds = []
    for X_train, X_test in zip(stations, test_stations):
        y = X_train[['energy', 'error_rounding', 'error_calculation', 'on_peak', 'mid_day', 'off_peak', 'port_type_CHADEMO', 'port_type_DCCOMBOTYP1', 'payment_mode_CREDITCARD',
            'payment_mode_RFID', 'session_type_DEVICE', 'session_type_MOBILE', 'session_type_WEB']]
        
        X_train = X_train.drop(['name', 'date', 'correct_amount', 'correct_duration', 'energy', 'on_peak', 'mid_day', 'off_peak', 'error_rounding', 'error_calculation', 'session_type_DEVICE', 'session_type_MOBILE', 'session_type_WEB',
            'port_type_CHADEMO', 'port_type_DCCOMBOTYP1', 'payment_mode_CREDITCARD',
            'payment_mode_RFID'], axis=1)
        
        X_train = X_train.reindex(sorted(X_train.columns), axis=1)
        
        date_test = X_test['date']
        X_test = X_test.drop(['date'], axis=1)
        X_test = X_test.reindex(sorted(X_test.columns), axis=1)
        
        
        clf.fit(X_train, y)
       
    return y_pred


clf = RandomForestRegressor() 
clf = train_model(stations, test_stations, clf)
y_pred = clf.predict(X_test)
y_preds.append(y_pred)


all_predictions = []
for y_pred in y_preds:
    predictions = [[] for j in range(len(y_pred[0]))]
    # Each date
    for i in range(len(y_pred)):
        # Each field
        for j in range(len(y_pred[i])):
            # Create list of just that field
            predictions[j].append(y_pred[i][j])
    all_predictions.append(predictions)


# In[32]:


all_predictions[0]


# In[ ]:





# In[33]:

def correct_predictions(all_predictions):
    """
    The machine learning model forecasts floating point values for the numerical targets in our ouput.
    However, for the values such as expected energy, amount of people, total revenue, we shouldn't allow
    - Negative Values
    - Floating point values past a certain precision point (2 decimal places for money)
    Thus, we need to correct the floating point values for different cases

    params:
    - all_predictions: A list of matrices that contain the predicted values for each field for each charging station
    """
    for j in range(len(all_predictions)):
        predictions = all_predictions[j]

        # Correct price values to be non-negative
        for i in range(len(predictions[1])):
            predictions[1][i] = 0 if predictions[1][i] < 0 else predictions[1][i] 
        for i in range(len(predictions[2])):
            predictions[2][i] = 0 if predictions[2][i] < 0 else predictions[2][i]

        # Round Energy Values
        predictions[0] = np.round(predictions[0], 2)

        # Correct values that should be whole numbers
        for i in range(1, len(predictions)):
            predictions[i] = np.round(predictions[i])
        all_predictions[j] = predictions
    return all_predictions
    

station_names = ['A','B']
def prepare_csv(all_predictions, station_names):
    """
    The final CSV output that contains labels for each field needs to be prepared from the raw matrices from the ML model
    """
    df_test = pd.DataFrame()
    for predictions, station_name in zip(all_predictions, station_names):
        df = pd.DataFrame({
            'name': [station_name] * len(predictions[0]),
            'date': date_test, 
            'energy': predictions[0], 
            'error_rounding': predictions[1], 
            'error_calculation': predictions[2],
            'on_peak': predictions[3],
            'mid_day': predictions[4],
            'off_peak': predictions[5],
            'port_type_CHADEMO': predictions[6],
            'port_type_DCCOMBOTYP1': predictions[7],
            'payment_mode_CREDITCARD': predictions[8],
            'payment_mode_RFID': predictions[9],
            'session_type_DEVICE': predictions[10], 
            'session_type_MOBILE': predictions[11],
            'session_type_WEB': predictions[12],
        })
        df_test = df_test.append(df)
df_test


# In[37]:


df_test.to_csv('production.csv',index=False)
