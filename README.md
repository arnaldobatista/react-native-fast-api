<a href="https://fast.com"><img src="https://fast.com/assets/new-logo-vert-37861c.svg" alt="fast.com logo" height="120px" /></a>

# React native fast.com API

A speed test using Fast.com for React Native.
Axios is used to make the requests.

## Installation

```bash
$ npm install --save react-native-fast-api
```

## Api usage

Example:

```js
import ApiSpeed from "react-native-fast-api";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const App = () => {
  const [resultTest, setResultTest] = useState("");
  const [statusTest, setStatusTest] = useState(true);

  useEffect(() => {
    calculateDownloadSpeed();
  }, []);

  const calculateDownloadSpeed = () => {
    ApiSpeed.calculateSpeed()
      .then((downloadSpeed) => {
        setResultTest(downloadSpeed);
        setStatusTest(false);
        console.log(downloadSpeed);
      })
      .catch((error) => {
        console.error("Erro ao calcular a velocidade de download", error);
      });
  };

  return (
    <View>
      <Text>Resultado do teste: {resultTest}</Text>
      <Text>Status do teste: {statusTest ? "Em andamento" : "Concluído"}</Text>
    </View>
  );
};

export default App;
```

## Feel free to contribute
