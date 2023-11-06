export interface ToDo {
  id:string;
  title:string;
}

export interface Column{
  title: string;
  todos: ToDo[];
  newCard: any;
  showFormAddCard: boolean;
}
