const getFullDB = async (event, arg, database) => {
    const queryGetAllRows = async (event, arg) => {
      return new Promise((resolve, reject) => {
        database.all(arg, (err, rows) => {
          if(err) {reject(err)}
          else {resolve(rows)}
        })
      })
    }
    const bla = await queryGetAllRows(event, arg, database)
    return bla
}
const addRowDB = async (event, arg, database) => {
    //console.log(arg)
    const queryAddRow = async (event, arg) => {
        return new Promise((resolve, reject) => {
            database.run(arg[0], arg[1], (err, rows) => {
                if(err) {reject(err)}
                else {resolve(rows)}
            })
        })
    }
    const bla = await queryAddRow(event, arg)
    return bla
}
const loadRowDB = async (event, arg, database) => {
    const queryLoadRow = async (event, arg) => {
        return new Promise((resolve, reject) => {
            database.all(arg[0], arg[1], (err, row) => {
                if(err) {reject(err)}
                else {resolve(row)}
            })
        })
    }
    const bla = await queryLoadRow(event, arg)
    return bla
}
const changeRowDB = async (event, arg, database) => {
    let sql = arg[0]
    let data = arg[1]
    const queryChangeRow = async (event1, arg1) => {
        return new Promise((resolve, reject) => {
            database.run(sql, data, (err, rows) => {
                if(err) {reject(err)}
                else {resolve(rows)}
            })
        })
    }
    const bla = await queryChangeRow(event, data)
    return bla
}

module.exports = { getFullDB, addRowDB, loadRowDB, changeRowDB }