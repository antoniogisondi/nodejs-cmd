/* Utilizziamo yargs che è una libreria Node.js che semplifica la gestione degli argomenti della riga di comando
nei tuoi programmi JavaScript. 
Questa libreria ti consente di definire e analizzare facilmente gli argomenti passati alla tua applicazione 
dalla riga di comando,
rendendo più semplice l'interazione con gli utenti e l'automazione delle tue applicazioni da riga di comando. */
"use strict"

// IL PACCHETTO CHALK NON FUNZIONA POICHE' STO UTILIZZANDO UN MODULO DEPRECATO
// const chalk = require('chalk')

// IMPORTO YARGS PER ESEGUIRE ARGOMENTI TRAMITE LINEA DI COMANDO
const yargs = require('yargs');

// IMPORTO I MODULI CONTENUTI NELLA CARTELLA CMD
const get = require('./cmd/get')
const add = require('./cmd/add')
const del = require('./cmd/del')

// INVOCO LE FUNZIONI CONTENUTE NEI MODULI
get(yargs);
add(yargs);
del(yargs);

// FORMATTAZIONE DELL'OUTPUT
yargs.parse()