import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedBoolService {

  constructor() { }

  editModeChanged = new EventEmitter<boolean>();

  setEditMode(isEditing: boolean) {
    this.editModeChanged.emit(isEditing);
  }
  
}

