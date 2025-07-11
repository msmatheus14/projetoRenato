import * as SQLite from 'expo-sqlite'

 const db = SQLite.openDatabaseSync("rn_sqlite")



const iniciarBanco = async () => {

    try 
      {
       
         await db.execAsync(`CREATE TABLE IF NOT EXISTS lugares (id integer primary key autoincrement, latitude real, longitude real)`)
         return db
        

      }
      catch(error){

        console.log(error, 'erro no arquivo de inicialização do banco')
        return false
      }

}

const adicionarLugar = async (latitude, longitude) => {

    const statement = await db.prepareAsync(`

        insert into lugares (latitude, longitude) values ($latitude, $longitude)`)

        
        try {

        

        await statement.executeAsync({$latitude: latitude, $longitude: longitude})

        }
        
        finally {

        await statement.finalizeAsync()
        
        }

}

const retornarLugares = async () => {

    const allRows = await db.getAllAsync (`select * from lugares`)
        
        let results = []

        for (const row of allRows) {

        results.push({id: row.id, latitude: row.latitude, longitude: row.longitude})
        
        }

        return results

}

const apagarLugar = async (id) => {
  
    try {

      const statement = await db.prepareAsync(`delete from lugares where id = $id;`)

      await statement.executeAsync({ $id: id })

      await statement.finalizeAsync()

      alert('Apagado com sucesso!')

      
    } catch (error) {
      
      alert("Erro ao apagar Lugar");
    }

}

module.exports = {iniciarBanco, adicionarLugar, retornarLugares, apagarLugar}