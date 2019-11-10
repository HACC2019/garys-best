 from sklearn.tree import DecisionTreeRegressor


def train(X):
    y = X[['energy', 'error_rounding', 'error_calculation', 'on_peak', 'mid_day', 'off_peak', 'port_type_CHADEMO', 'port_type_DCCOMBOTYP1', 'payment_mode_CREDITCARD', 'payment_mode_RFID']]

    model = DecisionTreeRegressor()
    model.fit(X, y)
    return model


def forecast(X, model):
    """
    Multi-variable forecasting for HECO Energy predictions

    Parameters:
        X (pd.DataFrame): DataFrame to forecast values for
        model (sklearn)
    """
    predictions = model.predict(X)

    # All forecasted values should be non-negative. If negative, set at 0
    for i in range(len(predictions)):
        for j in range(len(predictions[i])):
            predictions[i][i] = 0 if predictions[i][j] < 0 else predictions[i][j] 

    # Energy is only reported up to 2 significant figures
    predictions[0] = np.round(predictions[0], 2)

    # All forecasted values besides energy are non-negative integers
    for i in range(1, len(predictions)):
        predictions[i] = np.round(predictions[i])

    # Unpack predictions array into DataFrame
    df = pd.DataFrame({
        'date': X['date'], 
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

    return df


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