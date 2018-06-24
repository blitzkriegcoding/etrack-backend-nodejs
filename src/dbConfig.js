const sqlConfig = {
  userName: process.env.ETRANS_USERNAME,
  password: process.env.ETRANS_PW,
  server: process.env.ETRANS_HOST,
  options: {
      database: process.env.ETRANS_DB,
      encrypt: false,
	    rowCollectionOnDone: true, // Only get row set instead of row by row
	    useColumnNames: true // For easier JSON formatting      
  }
}

module.exports = sqlConfig;