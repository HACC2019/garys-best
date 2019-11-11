#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import pandas as pd


# In[2]:


df = pd.read_csv('data/hacc.csv')
df.head()


# In[3]:


print(df.columns)
df.columns = ['name', 'session_type', 'start_time', 'end_time', 'duration', 'energy', 'amount', 'id', 'port_type', 'payment_mode']
print(df.columns)


# In[4]:


df.dtypes


# In[5]:


df['start_time'] = pd.to_datetime(df['start_time'])
df['end_time'] = pd.to_datetime(df['end_time'])

# Changes the payment amount to a raw float value instead of a string of the form "$X.XX"
df['amount'] = df['amount'].replace('[\$,]', '', regex=True).astype(float)
df.head()


# In[6]:


df[df['duration'].str.contains('-')]['duration']


# ## Data Errors
# Types of errors found:
# 1. Positive energy, Zero amount -- Resolution: ?
# 2. Positive amount, Zero energy -- Resolution: ?

# In[7]:


# Checking for any missing values
missing = df[(df['energy'] == 0) | (df['amount'] == 0)]
print(len(missing))
missing.head()


# In[8]:


# Anyone who charges their car but doesn't pay is a "thief" -- correctable if we just use HECO formula?
# Question: Is this ALWAYS just a data issue or do some people actually get away without paying?
thieves = df[(df['energy'] > 0) & (df['amount'] == 0)]
print(len(thieves))
thieves.head()


# In[9]:


# Anyone who used 0 energy but still paid got "jipped"
jipped = df[(df['energy'] == 0) & (df['amount'] > 0)]
print(len(jipped))
jipped.head()


# In[10]:


dates = df['start_time'].dt.date
df['date'] = dates
df['date']


# In[11]:


df['day_of_week'] = df['start_time'].dt.day_name()
df['day_of_week']


# ## Time of Day
# Noting from his slides:
# Times:
# - On Peak: 5pm - 10pm => 17:00 - 22:00, Daily
# - Mid Day: 9am - 5pm => 9:00 => 17:00, Daily
# - Off Peak: 10pm - 9am => 22:00 - 9:00, Daily
# Cost:
# - On Peak: $0.57
# - Mid Day: $0.49
# - Off Peak: $0.54
# 

# In[12]:


import datetime as dt
start_times = df['start_time'].dt.time
df['on_peak'] = (dt.time(17, 0, 0) <= start_times) & (start_times < dt.time(22, 0, 0))
df['mid_day'] = (dt.time(9, 0, 0) <= start_times) & (start_times < dt.time(17, 0, 0))
df['off_peak'] = (dt.time(22, 0, 0) <= start_times) | (start_times < dt.time(9, 0, 0))
df.head()


# ## Error Checking
# Checking if each columns are in agreement with each other
# 1. Does cost match with the amount of energy for the given time period?

# In[13]:


df['calculated_amount'] = df['energy'] * df['on_peak'] * 0.57 + df['energy'] * df['mid_day'] * 0.49 + df['energy'] * df['off_peak'] * 0.54
df['rounded_calculated_amount'] = np.round(df['calculated_amount'], 2)
correct = df[(df['amount'] == df['rounded_calculated_amount'])]
err = df[~(df['amount'] == df['rounded_calculated_amount'])]
correct.head()


# In[14]:


err[np.abs(err['amount'] - err['rounded_calculated_amount']) == 0.01]#[['amount', 'rounded_calculated_amount', 'calculated_amount']]


# In[15]:


err[np.abs(err['amount'] - err['rounded_calculated_amount']) > 1]


# In[16]:


df = df.rename({'rounded_calculated_amount': 'correct_amount'}, axis=1)
df['error_rounding'] = np.abs(df['amount'] - df['correct_amount']) == 0.01
df['error_calculation'] = np.abs(df['amount'] - df['correct_amount']) > 0.01
df.head()


# In[17]:


for col in ['session_type', 'port_type', 'payment_mode']:
    df[col] = df[col].astype('category')
df.dtypes


# In[18]:


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

preproc_df.head()


# In[30]:


df_agg = preproc_df.groupby(['name', 'date']).agg('sum').reset_index()
# df_agg.columns = df_agg.columns.to_flat_index()
# df_agg.columns
df_agg.head()


# In[32]:


import matplotlib.pyplot as plt


# In[38]:


plt.scatter(df_agg['energy'].shift(-1), df_agg['energy'])


# In[47]:


from pandas.plotting import scatter_matrix
df_temp = pd.DataFrame()
df_temp['energy'] = df_agg['energy']
for x in range(1, 7):
    df_temp[f'energy_prev_{x}'] = df_temp['energy'].shift(x)
scatter_matrix(df_temp[['energy', 'energy_prev_1', 'energy_prev_2', 'energy_prev_3']])
df_temp.dropna().head(10)


# In[65]:


df_agg = preproc_df.groupby(['name', 'date']).agg('sum').reset_index()
# df_agg.columns = df_agg.columns.to_flat_index()
# df_agg.columns

# for x in range(1, 7):
#     df_agg[f'energy_prev_{x}'] = df_agg['energy'].shift(x)
# df_agg = df_agg.dropna()
# df_agg.head()

stations = [g for _, g in df_agg.groupby('name')]

def offset_col_x_days(df, col, days):
    for x in range(1, days):
        df[f'{col}_prev_{x}'] = df[col].shift(x)
    df = df.dropna().reset_index(drop=True)
    return df

for i in range(len(stations)):
    stations[i] = offset_col_x_days(stations[i], 'energy', 7)
stations[0]


# In[67]:

X = stations[0]
y = X['energy']
X = X.drop(['name', 'date', 'energy'], axis=1)
train_test_split = int(len(X) * 0.8)
X_train, X_test = X[:train_test_split], X[train_test_split:]
y_train, y_test = y[:train_test_split], y[train_test_split:]


from autosklearn.regression import AutoSklearnRegressor

automl = AutoSklearnRegressor()
automl.fit(X_train, y_train)

print(automl.show_models())
predictions = automl.predict(X_test)
print("R2 score:", sklearn.metrics.r2_score(y_test, predictions))



