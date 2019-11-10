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

preproc_df.head()


# In[21]:


df_agg = preproc_df.groupby(['name', 'date']).agg('sum').reset_index()
# df_agg.columns = df_agg.columns.to_flat_index()
# df_agg.columns
df_agg.head()


# In[22]:


df_agg.columns


# In[23]:


import matplotlib.pyplot as plt


# In[24]:


plt.scatter(df_agg['energy'].shift(-1), df_agg['energy'])


# In[25]:


from pandas.plotting import scatter_matrix
df_temp = pd.DataFrame()
df_temp['energy'] = df_agg['energy']
for x in range(1, 7):
    df_temp[f'energy_prev_{x}'] = df_temp['energy'].shift(x)
scatter_matrix(df_temp[['energy', 'energy_prev_1', 'energy_prev_2', 'energy_prev_3']])
df_temp.dropna().head(10)


# In[26]:


df_agg = preproc_df.groupby(['name', 'date']).agg('sum').reset_index()
df_agg['day_of_week'] = pd.to_datetime(df_agg['date']).dt.day_name()
df_agg['month'] = pd.to_datetime(df_agg['date']).dt.month_name()

for col in ['day_of_week', 'month']:
    df_agg[col] = df_agg[col].astype('category')
    
df_agg = df_agg.join(pd.get_dummies(df_agg.select_dtypes('category')))
df_agg = df_agg.drop(df_agg.select_dtypes('category'), axis=1)

# df_agg.columns = df_agg.columns.to_flat_index()
# df_agg.columns

# for x in range(1, 7):
#     df_agg[f'energy_prev_{x}'] = df_agg['energy'].shift(x)
# df_agg = df_agg.dropna()
# df_agg.head()

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
stations[0]


# In[27]:


stations[1]['date'][0]


# In[28]:


plt.plot(stations[0]['energy'])
plt.plot(stations[1]['energy'])


# In[29]:


stations[1]


# In[30]:


stations[0]


# In[31]:


X = stations[0]
y = X[['energy', 'error_rounding', 'error_calculation', 'on_peak', 'mid_day', 'off_peak', 'port_type_CHADEMO', 'port_type_DCCOMBOTYP1', 'payment_mode_CREDITCARD',
       'payment_mode_RFID']]
train_test_split = int(len(X) * 0.8)
date_train, date_test = X[:train_test_split]['date'], X[train_test_split:]['date']
X = X.drop(['name', 'date', 'correct_amount', 'correct_duration', 'energy', 'on_peak', 'mid_day', 'off_peak', 'error_rounding', 'error_calculation', 'session_type_DEVICE', 'session_type_MOBILE', 'session_type_WEB',
       'port_type_CHADEMO', 'port_type_DCCOMBOTYP1', 'payment_mode_CREDITCARD',
       'payment_mode_RFID'], axis=1)

X_train, X_test = X[:train_test_split], X[train_test_split:]
y_train, y_test = y[:train_test_split], y[train_test_split:]


# In[32]:


X_train.head()


# In[33]:


X_train.columns


# In[34]:


plt.plot(y_train['energy'])


# In[35]:


from sklearn.tree import DecisionTreeRegressor

clf = DecisionTreeRegressor()
clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)
score = clf.score(X_test, y_test)
plt.scatter(y_pred, y_test)
score


# In[36]:


from sklearn.linear_model import LinearRegression

clf = LinearRegression()
clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)
score = clf.score(X_test, y_test)
plt.scatter(y_pred, y_test)
score


# In[37]:


# from sklearn.utils import check_arrays
def mape(y_true, y_pred): 
#     y_true, y_pred = check_arrays(y_true, y_pred)

    ## Note: does not handle mix 1d representation
    #if _is_1d(y_true): 
    #    y_true, y_pred = _check_1d_array(y_true, y_pred)

    return np.mean(np.abs((y_true - y_pred) / y_true)) * 100

mape(y_test, y_pred)


# In[38]:


sorted(y_pred - y_test)


# In[47]:


y_train


# In[39]:


y_test


# In[40]:


predictions = [[] for j in range(len(y_pred[0]))]
for i in range(len(y_pred)):
    for j in range(len(y_pred[i])):
        predictions[j].append(y_pred[i][j])


# In[41]:


for i in range(len(predictions[1])):
    predictions[1][i] = 0 if predictions[1][i] < 0 else predictions[1][i] 
for i in range(len(predictions[2])):
    predictions[2][i] = 0 if predictions[2][i] < 0 else predictions[2][i]
predictions[0] = np.round(predictions[0], 2)
for i in range(1, len(predictions)):
    predictions[i] = np.round(predictions[i])


# In[42]:


predictions[0]


# In[43]:


y_test['energy']


# In[46]:


df_test = pd.DataFrame({
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
    'payment_mode_RFID': predictions[9]
})
df_test.to_csv('test_run.csv',index=False)

