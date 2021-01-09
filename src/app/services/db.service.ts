import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private db: AngularFirestore) {}

  async createCliente(cliente: Cliente) {
    try {
      await this.db
        .collection('clientes')
        .add(cliente)
        .then((response: DocumentReference<Cliente>) => console.log(response));
    } catch {
      throw new Error('não foi possível salvar o cliente');
    }
  }
}
