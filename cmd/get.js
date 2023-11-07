// IMPORTO IL MODULO FS fileSystem
const fs = require('fs');

function get(yargs) {
    // CREO IL COMANDO ESEGUIBILE DA LINEA DI COMANDO
    yargs.command({
        // TIPO DI COMANDO
        command: 'get',

        // DESCRIZIONE COMANDO
        describe: 'Ricerca cliente in base al nome',
        builder: {
            nome: {
                describe: 'Nome del cliente da ricercare',
                demandOption: true,
                type: 'string'
            }
        },

        // ESECUZIONE DEL COMANDO
        handler(argv) {
            const ris = getCliente(argv.nome)

            // SEL IL CLIENTE è STATO TROVATO STAMPO
            if (ris.status) {
                console.log('Cliente trovato:\n')
                console.log(ris.cliente)

                // ALTRIMENTI STAMPO
            } else {
                console.log('Cliente non trovato. Forse cercavi:\n')

                // STAMPO I SUGGERIMENTI
                console.log(ris.suggerimenti)
            }
        }
    })
}

// CREO LA FUNZIONE CHE MI PRENDE I CLIENTI
function getCliente(nome) {
    // LEGGO IL FILE clienti.json IN MODO SINCRONO
    const clientiJSON = fs.readFileSync('clienti.json', 'utf-8')

    // FORMATTO I DATI OTTENUTI DA UN OGGETO JSON AD UN OGGETTO JAVASCRIPT
    const clienti = JSON.parse(clientiJSON)

    // CERCO IL CLIENTE IN BASE AL NOME E SE ESISTE
    const cliente = clienti.find(item => item.nome === nome)

    // CREO UN OGGETTO CON RIS CON VARIE CHIAVI
    const ris = { status: false, suggerimenti: '', cliente: null }

    // SE IL CLIENTE CERCATO NON ESISTE
    if (!cliente) {

        // MAPPO L'ARRAY CLIENTI
        clienti.map(clienteItem => {

            // SE LA PRIMA LETTERA DEL CLIENTE COMBACIA CON LA PRIMA LETTERE DEL NOME DEL CLIENTE CERCATO
            if (clienteItem.nome[0] === nome[0]) {
                // CONCATENO LE STRINGHE 
                ris.suggerimenti += `${clienteItem.nome} `
            }
        })
    } else {
        // ALTRIMENTI IMPOSTO STATUS SU TRUE E IL CLIENTE SUL NOME DEL CLIENTE CERCATO
        ris.status = true,
            ris.cliente = cliente
    }

    return ris
}

// ESPORTO LA FUNZIONE GET
module.exports = get;

