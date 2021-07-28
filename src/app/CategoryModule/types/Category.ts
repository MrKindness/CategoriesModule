export interface CategoryServer {
  id: number;
  name: { EN: string; RU: string; RO: string };
  //0 - категория, 1 - товар
  type: 0 | 1;
  parent_id: number;
  photo?: string;
  is_blocked: boolean;
  is_visible: boolean;
  child_type: number;
  order_number: number;
}

export interface CategoryStore {
  categoryServer: CategoryServer;
  ShowSubTree: boolean;
}

export interface CategoryPage {
  categoryStore: CategoryStore;
  children: CategoryPage[];
}
