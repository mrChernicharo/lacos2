import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { Cliente } from '../models/cliente.model';
import { Consulta } from '../models/consulta.model';
import { AppUser } from './auth.service';
import firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private _userConsultasStore: Consulta[];

  constructor(private db: AngularFirestore, private aFAuth: AngularFireAuth) {}

  //********* CONSULTAS **********//

  async storeConsultas(consultas: Consulta[]) {
    // console.log(consultas);
    try {
      consultas.forEach((consulta) => {
        this.db
          .collection('consultas')
          .add(consulta)
          .then((doc) => {
            console.log(doc);
            this.db.doc(`consultas/${doc.id}`).update({ idConsulta: doc.id });
          });
      });
    } catch {
      throw new Error('erro');
    }
  }

  fetchAllConsultas() {
    // console.log('FETCH ALL CONSULTAS');
    return this.db
      .collection('consultas')
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => snap.payload.doc.data() as Consulta);
        }),
        tap((consultas) => {
          console.log(consultas);
        })
      );
  }

  fetchUserConsultas(userId: string) {
    // console.log('FETCH USER CONSULTAS');
    console.log(userId);
    // return of([{}] as Consulta[]);
    return this.db
      .collection('consultas', (ref) =>
        ref.where('idProfissional', '==', userId)
      )
      .snapshotChanges()
      .pipe(
        shareReplay(),
        map((snaps) => {
          return snaps.map((snap) => snap.payload.doc.data() as Consulta);
        }),
        tap((consultas) => {
          this._userConsultasStore = consultas;
          console.log(this._userConsultasStore);
        })
      );
  }
  //********* CLIENTES **********//

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
              // console.log({ id: doc.id, ...doc });
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

  fetchUserClientes(clientesIds: string[]) {
    console.log('DB FETCH USER ' + ' CLIENTES');
    console.log(clientesIds);
  }

  //   const clientIds = this._userConsultasStore.reduce((acc, consulta) => {
  //     acc.push(consulta.idPaciente);
  //     return acc;
  //   }, []);

  //   console.log(clientIds);
  //   const ids = new Set([...clientIds]);
  //   console.log(ids);
  // return this.db
  //   .collection('clientes')
  //   .snapshotChanges()
  //   .pipe(
  //     shareReplay(),
  //     map((snaps) => {
  //       return snaps.map((snap) => {
  //         return snap.payload.doc.data() as Cliente;
  //       });
  //     })
  //   );
  // }

  //********* USER **********//
  async createUser(user: AppUser) {
    // console.log('createUser');
    delete user.token;

    try {
      await this.db
        .collection('users')
        .add(user)
        .then(async (doc: DocumentReference<AppUser>) => {
          //
          await this.db
            .doc(`users/${doc.id}`)
            .update({ id: doc.id })
            .then((response) => {
              //log
              // console.log({ id: doc.id, ...doc });
            });
        });
    } catch {
      throw new Error('não foi possível salvar os dados do usuário');
    }
  }

  getFireUser(user): Observable<any> {
    const fireUserDoc = this.db
      .doc(`users/${user.uid || user.id}`)
      .valueChanges()
      .pipe(
        tap((data) => {
          // console.log('3. RESULTADO DA QUERY');
          // console.log(data);
        })
      );

    // console.log(fireUserDoc);
    return fireUserDoc;
  }

  getUserDoc(user) {
    return this.db.doc(`users/${user.uid || user.id}`);
  }

  // checkUserExists(user: AppUser) {
  //   return this.db
  //     .collection('users', (ref) => ref.where('email', '==', user.email))
  //     .snapshotChanges()
  //     .pipe(
  //       take(1),
  //       map((snaps) => snaps.length > 0),
  //       tap((bool) => console.log(`email in use? ${bool}`))
  //     );
  // }
}
