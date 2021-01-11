import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, shareReplay } from 'rxjs/operators';
import { Cliente } from '../models/cliente.model';
import { Consulta } from '../models/consulta.model';
import { UserAuthData } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  async storeConsultas(consultas: Consulta[]) {
    console.log(consultas);
    try {
      await consultas.forEach((consulta) => {
        this.db
          .collection('consultas')
          .add(consulta)
          .then((response) => console.log(response));
      });
    } catch {
      throw new Error('erro');
    }
  }
  constructor(private db: AngularFirestore) {}

  async createCliente(cliente: Cliente) {
    try {
      await this.db
        .collection('clientes')
        .add(cliente)
        .then(async (doc: DocumentReference<Cliente>) => {
          //
          await this.db
            .doc(`clientes/${doc.id}`)
            .update({ id: doc.id })
            .then((response) => {
              //log
              console.log({ id: doc.id, ...doc });
            });
        });
    } catch {
      throw new Error('não foi possível salvar o cliente');
    }
  }

  fetchAllClientes() {
    return this.db
      .collection('clientes')
      .snapshotChanges()
      .pipe(
        shareReplay(),
        map((snaps) => {
          return snaps.map((snap) => {
            return snap.payload.doc.data() as Cliente;
          });
        })
      );
  }

  async createUser(user: UserAuthData) {
    console.log('createUser');
    delete user.token;
    delete user.isAuth;

    try {
      await this.db
        .collection('users')
        .add(user)
        .then(async (doc: DocumentReference<UserAuthData>) => {
          //
          await this.db
            .doc(`users/${doc.id}`)
            .update({ id: doc.id })
            .then((response) => {
              //log
              console.log({ id: doc.id, ...doc });
            });
        });
    } catch {
      throw new Error('não foi possível salvar o user');
    }
  }
}
