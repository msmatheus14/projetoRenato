import * as Location from 'expo-location'

const pedirPermissaoLocalizacao = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync()
    
          if (status !== 'granted') {
    
            setErrorMsg('Permissão de localização negada!')
    
            return false
          }else
          {
            let localizacao = await Location.getCurrentPositionAsync({})

            return localizacao
          }

}

const retornarLocalizacaoAtual = async () => {

    let localizacao = await Location.getCurrentPositionAsync({})

    return localizacao

}

module.exports = {pedirPermissaoLocalizacao, retornarLocalizacaoAtual}