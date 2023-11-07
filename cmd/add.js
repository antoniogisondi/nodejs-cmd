// IMPORTO IL MODULO FS fileSystem
const fs = require('fs');

function add(yargs) {
    // CREO IL COMANDO ESEGUIBILE DA LINEA DI COMANDO
    yargs.command({
        // TIPO DI COMANDO
        command: 'add',

        // DESCRIZIONE COMANDO
        describe: 'Aggiungi cliente in base al nome',
        builder: {
            nome: {
                describe: 'Nome del cliente da aggiungere',
                demandOption: true,
                type: 'string'
            },
            email: {
                describe: 'Email del cliente da aggiungere',
                demandOption: true,
                type: 'string'
            }
        },

        // ESECUZIONE DEL COMANDO
        handler(argv) {
            addCliente(argv)
        }
    })
}

// CREO LA FUNZIONE CHE CREA IL CLIENTE
function addCliente({ nome, email }) {
    // LEGGO IL FILE DEI CLIENTI
    const clientiJSON = fs.readFileSync('clienti.json', 'utf-8')

    // FORMATTO I DATI OTTENUTI DA UN OGGETO JSON AD UN OGGETTO JAVASCRIPT
    const clienti = JSON.parse(clientiJSON)

    // PUSHO IL NOME E L'EMAIL DENTRO L'ARRAY DI OGGETTI DEI CLIENTI
    clienti.push({ nome, email })

    // LEGGO IL FILE E TRASFORMO IL SECONDO PARAMETRO IN UN OGGETTO JSON
    fs.writeFileSync('clienti.json', JSON.stringify(clienti))

    // STAMPO TUTTI I CLIENTI
    console.log(clienti)
}

// ESPORTO LA FUNZIONE ADD
module.exports = add;