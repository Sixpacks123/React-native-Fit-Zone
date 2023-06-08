import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Button from './Button';

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    return (
        <View>
            <Text style={{ fontSize: 30 }}>Counter: {count}</Text>
            <Button onPress={increment} title={'+'} />
            <Button onPress={decrement} title={'-'} />
        </View>
    );
}

export default Counter;
