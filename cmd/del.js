// IMPORTO IL MODULO FS fileSystem
const fs = require('fs');

function del(yargs) {
    // CREO IL COMANDO ESEGUIBILE DA LINEA DI COMANDO
    yargs.command({
        // TIPO DI COMANDO
        command: 'del',

        // DESCRIZIONE COMANDO
        describe: 'Cancella cliente in base al nome',
        builder: {
            nome: {
                describe: 'Nome del cliente da cancellare',
                demandOption: true,
                type: 'string'
            }
        },

        // ESECUZIONE DEL COMANDO
        handler(argv) {
            delCliente(argv.nome)
        }
    })
}

// CREO LA FUNZIONE CHE CANCELLA IL CLIENTE
function delCliente(nome) {
    // LEGGO IL FILE DEI CLIENTI
    const clientiJSON = fs.readFileSync('clienti.json', 'utf-8')

    // FORMATTO I DATI OTTENUTI DA UN OGGETO JSON AD UN OGGETTO JAVASCRIPT
    const clienti = JSON.parse(clientiJSON)

    // TROVO IL CLIENTE IN INPUT NEL FILE JSON
    const clienteIndex = clienti.findIndex(cliente => cliente.nome === nome)

    // SE L'INDEX DEL CLIENTE IN INPUT è UGUALE A -1 IL CLIENTE NON è STATO TROVATO
    if (clienteIndex === -1) {
        console.log('Il cliente non è stato trovato')
    }

    // RIMUOVO IL CLIENTE IN INPUT
    clienti.splice(clienteIndex, 1)

    // LEGGO IL FILE E TRASFORMO IL SECONDO PARAMETRO IN UN OGGETTO JSON
    fs.writeFileSync('clienti.json', JSON.stringify(clienti))

    // STAMPO TUTTI I CLIENTI
    console.log(clienti)
}

// ESPORTO LA FUNZIONE DEL
module.exports = del;