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

preproc_df = preproc_df.drop(['id', 'start_time', 'end_time', 'calculated_amount'], axis=1)

preproc_df.head()


# In[21]:


df_agg = preproc_df.groupby(['name', 'date']).agg('sum').reset_index()
# df_agg.columns = df_agg.columns.to_flat_index()
# df_agg.columns
df_agg['energy'] = np.round(df_agg['energy'],2)
df_agg['amount'] = np.round(df_agg['amount'],2)
df_agg['correct_amount'] = np.round(df_agg['correct_amount'],2)


# In[22]:


df_agg.to_csv('historical.csv',index=False)

